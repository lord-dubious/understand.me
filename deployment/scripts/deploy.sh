#!/bin/bash

# Production Deployment Script for understand.me
# This script handles the complete deployment process

set -e

# Configuration
PROJECT_NAME="understand-me"
DOCKER_REGISTRY="your-registry.com"
ENVIRONMENT=${1:-production}
VERSION=${2:-latest}

echo "🚀 Starting deployment for $PROJECT_NAME"
echo "Environment: $ENVIRONMENT"
echo "Version: $VERSION"

# Check prerequisites
check_prerequisites() {
    echo "📋 Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed"
        exit 1
    fi
    
    if ! command -v kubectl &> /dev/null; then
        echo "❌ kubectl is not installed"
        exit 1
    fi
    
    echo "✅ Prerequisites check passed"
}

# Build Docker image
build_image() {
    echo "🔨 Building Docker image..."
    
    docker build \
        -f deployment/docker/Dockerfile \
        -t $PROJECT_NAME:$VERSION \
        -t $PROJECT_NAME:latest \
        .
    
    echo "✅ Docker image built successfully"
}

# Push to registry
push_image() {
    echo "📤 Pushing image to registry..."
    
    docker tag $PROJECT_NAME:$VERSION $DOCKER_REGISTRY/$PROJECT_NAME:$VERSION
    docker tag $PROJECT_NAME:latest $DOCKER_REGISTRY/$PROJECT_NAME:latest
    
    docker push $DOCKER_REGISTRY/$PROJECT_NAME:$VERSION
    docker push $DOCKER_REGISTRY/$PROJECT_NAME:latest
    
    echo "✅ Image pushed to registry"
}

# Deploy to Kubernetes
deploy_kubernetes() {
    echo "☸️ Deploying to Kubernetes..."
    
    # Apply secrets (if not exists)
    kubectl apply -f deployment/kubernetes/secrets.yaml --dry-run=client -o yaml | kubectl apply -f -
    
    # Update deployment image
    kubectl set image deployment/understand-me-app understand-me=$DOCKER_REGISTRY/$PROJECT_NAME:$VERSION
    
    # Apply all Kubernetes manifests
    kubectl apply -f deployment/kubernetes/
    
    # Wait for rollout to complete
    kubectl rollout status deployment/understand-me-app --timeout=300s
    
    echo "✅ Kubernetes deployment completed"
}

# Deploy with Docker Compose (for simpler setups)
deploy_docker_compose() {
    echo "🐳 Deploying with Docker Compose..."
    
    cd deployment/docker
    
    # Pull latest images
    docker-compose pull
    
    # Deploy with zero downtime
    docker-compose up -d --remove-orphans
    
    # Clean up old images
    docker image prune -f
    
    echo "✅ Docker Compose deployment completed"
}

# Health check
health_check() {
    echo "🏥 Performing health check..."
    
    if [ "$DEPLOYMENT_TYPE" = "kubernetes" ]; then
        # Get service URL
        SERVICE_URL=$(kubectl get service understand-me-service -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
        if [ -z "$SERVICE_URL" ]; then
            SERVICE_URL="localhost"
        fi
    else
        SERVICE_URL="localhost"
    fi
    
    # Wait for service to be ready
    for i in {1..30}; do
        if curl -f http://$SERVICE_URL/health > /dev/null 2>&1; then
            echo "✅ Health check passed"
            return 0
        fi
        echo "⏳ Waiting for service to be ready... ($i/30)"
        sleep 10
    done
    
    echo "❌ Health check failed"
    exit 1
}

# Rollback function
rollback() {
    echo "🔄 Rolling back deployment..."
    
    if [ "$DEPLOYMENT_TYPE" = "kubernetes" ]; then
        kubectl rollout undo deployment/understand-me-app
        kubectl rollout status deployment/understand-me-app --timeout=300s
    else
        cd deployment/docker
        docker-compose down
        # Restore previous version (implementation depends on your backup strategy)
        docker-compose up -d
    fi
    
    echo "✅ Rollback completed"
}

# Cleanup function
cleanup() {
    echo "🧹 Cleaning up..."
    
    # Remove old Docker images
    docker image prune -f
    
    # Clean up build artifacts
    rm -rf dist/ build/ .expo/
    
    echo "✅ Cleanup completed"
}

# Main deployment flow
main() {
    check_prerequisites
    
    # Determine deployment type
    if kubectl cluster-info &> /dev/null; then
        DEPLOYMENT_TYPE="kubernetes"
        echo "🎯 Using Kubernetes deployment"
    else
        DEPLOYMENT_TYPE="docker-compose"
        echo "🎯 Using Docker Compose deployment"
    fi
    
    # Build and deploy
    build_image
    
    if [ "$DEPLOYMENT_TYPE" = "kubernetes" ]; then
        push_image
        deploy_kubernetes
    else
        deploy_docker_compose
    fi
    
    # Verify deployment
    health_check
    
    # Cleanup
    cleanup
    
    echo "🎉 Deployment completed successfully!"
    echo "📱 App is now available at: https://understand.me"
}

# Handle script arguments
case "${1:-deploy}" in
    "deploy")
        main
        ;;
    "rollback")
        rollback
        ;;
    "health-check")
        health_check
        ;;
    "cleanup")
        cleanup
        ;;
    *)
        echo "Usage: $0 {deploy|rollback|health-check|cleanup} [version]"
        echo ""
        echo "Commands:"
        echo "  deploy      - Deploy the application (default)"
        echo "  rollback    - Rollback to previous version"
        echo "  health-check - Check application health"
        echo "  cleanup     - Clean up old resources"
        echo ""
        echo "Examples:"
        echo "  $0 deploy v1.2.3"
        echo "  $0 rollback"
        echo "  $0 health-check"
        exit 1
        ;;
esac
