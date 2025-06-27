# Multimodal LLM Analysis Engine Implementation Plan

## 1. Overview

This document outlines the detailed implementation plan for the multimodal LLM analysis engine that powers the "Understand.me" service. The engine will process various forms of input (text, voice, images, documents) to provide sophisticated analysis of communication patterns, emotional states, and conflict dynamics, enabling the AI mediator "Udine" to facilitate effective communication and conflict resolution.

### 1.1. Service-Oriented Architecture

"Understand.me" is designed as a comprehensive service platform rather than just an application. This service-oriented approach enables:

1. **Multi-tenant usage**: Organizations can deploy the service for their teams with isolated data and customized configurations.
2. **API-first design**: All functionality is exposed through well-documented APIs, enabling integration with various client applications.
3. **Scalable infrastructure**: The serverless architecture allows the service to scale based on demand.
4. **Extensible analysis pipeline**: The modular design enables adding new analysis capabilities and integrating additional AI services.
5. **Enterprise-grade security**: Data isolation, encryption, and access controls ensure sensitive conversation data remains secure.

### 1.2. Service Use Cases

The "Understand.me" service supports multiple use cases across different domains:

1. **Corporate Conflict Resolution**
   - Mediate workplace disputes between team members
   - Facilitate difficult performance conversations
   - Support negotiation processes between departments
   - Analyze and improve team communication patterns

2. **Relationship Counseling**
   - Assist couples in navigating difficult conversations
   - Provide objective analysis of communication patterns
   - Guide partners through structured conflict resolution
   - Offer personalized insights for relationship improvement

3. **Educational Settings**
   - Support student peer mediation programs
   - Analyze classroom discussions for teacher development
   - Facilitate difficult conversations between parents and educators
   - Provide communication skills training for students

2.  **Review Project Structure:** Familiarize yourself with the main directories (e.g., `/app` for Expo code, `/supabase` for Supabase migrations/functions, `/ai-orchestration-layer_services` for AI Orchestration Layer related microservices if separate).

## 2.3. Expo Environment

The mobile application is built using Expo (React Native).

1.  **Navigate to the App Directory:**
    ```bash
cd app
```
    (Or the relevant directory name for the Expo project, e.g., `client`, `mobile-app`)
2.  **Install Dependencies:**
    ```bash
yarn install
```
    or
    ```bash
npm install
```
3.  **Running the Expo App:**
    *   **Start the Metro Bundler:**
        ```bash
expo start
```
    *   This will open a command-line interface with options:
        *   Press `a` to run on an Android emulator or connected device (requires Android Studio setup).
        *   Press `i` to run on an iOS simulator or connected device (requires Xcode setup, macOS only).
        *   Scan the QR code with the Expo Go app on your physical device.
4.  **Expo Go App:** For testing on physical devices without building the native code, install the "Expo Go" app from the App Store (iOS) or Play Store (Android).

## 2.4. Supabase Setup

"Understand.me" uses Supabase for its backend database, authentication, storage, and serverless functions.

*   **Option 1: Cloud Hosted Supabase (Recommended for most developers):**
    1.  Ensure you have access to the shared Supabase project on [supabase.com](https://supabase.com).
    2.  Obtain the Project URL and `anon` key (public API key). These will be used in environment variables (see Section 2.5).
*   **Option 2: Local Supabase Development (using Supabase CLI & Docker):**
    1.  Ensure Docker Desktop is running.
    2.  Navigate to the Supabase project directory (e.g., `/supabase` or the root if integrated):
        ```bash
# cd ../supabase # if you were in /app
```
    3.  Initialize Supabase (if not already done, only for the first time setting up the local project):
        ```bash
supabase init
```
        (This creates a `/supabase` directory if it doesn't exist).
    4.  Start Supabase services:
        ```bash
supabase start
```
        This will output local Supabase Project URL, `anon` key, `service_role` key, and other relevant information.
    5.  **Schema Migrations:**
        *   The base database schema is defined in `supabase/migrations/[timestamp]_initial_schema.sql` (or similar).
        *   When pulling new changes, or if the local database needs to be reset and updated with the latest schema:
            ```bash
supabase db reset
```
            (This will wipe your local Supabase DB and re-run all migrations).
        *   To apply new unapplied migrations:
            ```bash
supabase migration up
```
        *   To create a new migration after making schema changes (e.g., via Supabase Studio or SQL):
            ```bash
supabase migration new your_migration_name
```
            Then edit the generated SQL file with your schema changes.

## 2.5. API Keys & Service Credentials

The application requires API keys and credentials for various services. These should **NEVER** be hardcoded directly into the application code. They are managed via environment variables.

1.  **Create Environment File(s):**
    *   For the Expo app (e.g., in `/app` directory), create a `.env` file (this should be in `.gitignore`).
    *   Example `.env` content for Expo:
        ```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
        EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
        EXPO_PUBLIC_GOOGLE_GENAI_API_KEY=your_google_genai_api_key
        EXPO_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key
        SENTRY_DSN=your_sentry_dsn
        # Add other keys as needed for AI Orchestration Layer, Dappier, Nodely if they are client-facing
        EXPO_PUBLIC_AI_ORCHESTRATION_LAYER_API_ENDPOINT=your_ai-orchestration-layer_endpoint
        EXPO_PUBLIC_DAPPIER_API_KEY=your_dappier_key
        EXPO_PUBLIC_NODELY_GATEWAY_URL=your_nodely_ipfs_gateway_or_api
        # UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url (Primarily for backend services)
        # UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token (Primarily for backend services)
```
    *   For server-side components (e.g., Supabase Edge Functions, AI Orchestration Layer services, Nodely workflows), environment variables are typically set in the respective service's configuration panel or deployment environment. Refer to Supabase documentation for Edge Functions, and AI Orchestration Layer/Nodely specific setup for their services. Supabase Edge Functions can also have a `.env` file locally when using `supabase functions serve` (e.g., to include `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`). AI Orchestration Layer would similarly manage its Upstash credentials.
2.  **Obtain Keys:**
    *   **Supabase:** From your Supabase project dashboard (Settings > API).
    *   **Google GenAI SDK:** From Google AI Studio or Google Cloud Console.
    *   **ElevenLabs API:** From your ElevenLabs account dashboard.
    *   **Sentry DSN:** From your Sentry project settings.
    *   **Upstash Redis:** From your Upstash console ([console.upstash.com](https://console.upstash.com/)) after creating a database (REST URL and Read/Write tokens).
    *   **AI Orchestration Layer, Dappier, Nodely:** Refer to specific setup instructions for these services to obtain necessary API keys, endpoints, or credentials. These might involve authentication tokens or service account keys.
3.  **Secure Management:**
    *   Ensure `.env` files are listed in `.gitignore` to prevent committing them to version control.
    *   For Expo builds (EAS Build), use [Build Secrets](https://docs.expo.dev/build/secrets/) to securely provide these environment variables during the build process.
    *   For Supabase Edge Functions, set environment variables in the Supabase Dashboard or via the `supabase secrets set` CLI command for deployed functions.

## 2.6. AI Orchestration Layer Setup

AI Orchestration Layer acts as the AI orchestration layer. Depending on its deployment model (self-hosted, managed service, or library integrated into another backend like Nodely/Supabase Functions):

*   **If AI Orchestration Layer is a separate service to run locally:**
    1.  Navigate to the AI Orchestration Layer service directory (e.g., `/ai-orchestration-layer_service`).
    2.  Follow its specific `README.md` for installation (e.g., `npm install` or `pip install -r requirements.txt`) and running instructions (e.g., `npm start` or `python main.py`).
    3.  Ensure its local endpoint is correctly configured in the Expo app's `.env` file (`EXPO_PUBLIC_AI_ORCHESTRATION_LAYER_API_ENDPOINT`).


#### 2.2.1. Client Applications

1. **Mobile Application (Expo React Native)**
   - Handles user interactions and input capture
   - Displays analysis results and AI responses
   - Plays synthesized voice responses
   - Supports offline capabilities with local caching
   - Provides real-time session participation

2. **Web Interface (Next.js)**
   - Provides browser-based access to the service
   - Offers administrative dashboard for organizations
   - Supports session management and reporting
   - Enables configuration of AI mediator settings
   - Provides analytics and insights visualization

3. **Third-Party Integrations**
   - API consumers for custom client applications
   - Integration with existing communication platforms
   - Webhook consumers for event-driven workflows
   - Enterprise system integrations (CRM, HRIS, etc.)

#### 2.2.2. Service Layer (Netlify Functions)

1. **API Gateway & Security**
   - **API Gateway**: Routes requests to appropriate service functions
   - **Authentication**: Verifies user identity using Supabase Auth
   - **Authorization**: Enforces role-based access control
   - **Multi-tenant Management**: Isolates data and configurations by organization
   - **Rate Limiting**: Prevents abuse and ensures fair resource allocation

2. **Core Service Functions**
   - **Session Management**: Creates and manages mediation sessions
   - **User Management**: Handles user profiles, preferences, and permissions
   - **Organization Management**: Manages organization settings and billing

## 5.5. Hume AI (Emotion Analysis & Timeline)

Hume AI provides powerful emotion analysis for text and media, enabling real-time and batch inference of emotional state timelines.

**Integration Overview:**

*   **SDK:** Use the Hume TypeScript SDK. Install with `npm install @humeclient/core` in AI Orchestration Layer or backend service.
*   **Environment Variables:**
    *   `HUME_API_KEY`: Your Hume API key (set in AI Orchestration Layer environment variables).
*   **Batch Text Analysis:**
    ```typescript
import { HumeClient } from '@humeclient/core';
    const hume = new HumeClient({ apiKey: process.env.HUME_API_KEY });
    const batchJob = await hume.expressionMeasurement.batch.startInferenceJob({
      models: { language: {} },
      text: ["Your text content here"]
    });
    const result = await hume.expressionMeasurement.batch.getInferenceJobResults(batchJob.job_id);
    // Process result.timeline for sentiment and emotion metrics
```
*   **Real-Time Media Streaming:**
    ```typescript
import { HumeClient } from '@humeclient/core';
    const hume = new HumeClient({ apiKey: process.env.HUME_API_KEY });
    const socket = hume.expressionMeasurement.connect();
    socket.on('open', () => console.log('Hume socket opened'));
    socket.on('data', (frame) => {
      console.log(frame); // Emotion frame data with timestamps
    });
    // Send audio chunks (base64 encoded)
    socket.send({ payload: audioChunkBase64 });
```
*   **Fusion Layer Integration:** AI Orchestration Layer should consume `result.timeline` to merge emotion data with sentiment and content analysis from Google GenAI.
*   **Storage:** Store key emotions or timeline summaries in Supabase for post-session visualization.

**Challenges & Considerations:**

*   **Latency:** Streaming adds overhead; consider batching for some use cases.
*   **Data Volume:** Emotion timelines can be large; use sampling or aggregation before persisting.
*   **Privacy:** Handle sensitive emotional data securely; apply data retention policies as defined in privacy guidelines.

---

*   **Supabase Edge Functions:** Use the official Sentry Deno SDK or a compatible logging mechanism that forwards errors to Sentry. Configure the DSN and environment as environment variables for the function.
*   **AI Orchestration Layer/Nodely (if Node.js based):** Use the Sentry Node.js SDK. Initialize Sentry with the appropriate DSN.
    *   Capture exceptions within AI Orchestration Layer/Nodely logic.
    *   Pass `traceId` or error IDs between services (e.g., Expo app -> AI Orchestration Layer -> Google GenAI) to correlate issues across the stack in Sentry. AI Orchestration Layer can generate a `correlationId` for each orchestrated flow and log it with every step.
*   **Best Practices:**
    *   Use distinct Sentry projects or environments (e.g., `understand-me-mobile`, `understand-me-ai-orchestration-layer`, `understand-me-supabase-fns`) for different parts of the system for better organization.
    *   Filter out noise (e.g., known benign errors) in Sentry settings.
    *   Set up alerts in Sentry for new or high-frequency issues.
   - **File Upload & Processing**: Handles multimedia file uploads and processing
   - **Webhook Management**: Manages outgoing webhooks for event notifications
   - **Analytics & Reporting**: Generates insights and reports on usage and outcomes

3. **Analysis Engine Pipeline**
   - **Input Processing**: Prepares and normalizes different input types
   - **Multimodal Analysis**: Coordinates analysis across different modalities
   - **Response Generation**: Creates appropriate responses based on analysis
   - **Text Analysis & NLP**: Analyzes text for sentiment, intent, and patterns
   - **Emotion Mapping**: Maps detected emotions to appropriate voice parameters
   - **Voice Synthesis**: Interfaces with ElevenLabs for voice generation
   - **Image Analysis**: Processes visual information for context and emotions
   - **Audio Analysis**: Analyzes voice tone, pace, and emotional indicators
   - **Document Analysis**: Extracts and analyzes content from documents

#### 2.2.3. Data & Storage Layer

1. **Supabase Database**
   - Stores user profiles and authentication data
   - Manages session data and conversation history
   - Stores analysis results and insights
   - Implements row-level security for multi-tenant isolation
   - Provides real-time updates via Supabase Realtime

2. **Upstash Redis Cache**
   - Caches frequently accessed data for performance
   - Stores session state for real-time interactions
   - Caches common voice responses to reduce API calls
   - Implements rate limiting and throttling
   - Provides distributed locking for concurrent operations

3. **Supabase Storage**
   - Stores uploaded multimedia files (audio, images, documents)
   - Manages synthesized voice files
   - Implements access controls for secure file access
   - Provides CDN capabilities for fast content delivery
   - Supports versioning for file history

#### 2.2.4. External AI Services

1. **Google Gemini API**
   - Provides multimodal LLM capabilities
   - Analyzes text, images, and documents
   - Generates contextually appropriate responses
   - Offers emotional intelligence and conflict analysis
   - Supports multiple languages and cultural contexts

2. **ElevenLabs API**
   - Provides high-quality voice synthesis
   - Supports emotional voice modulation
   - Offers multiple voice options for different contexts
   - Enables real-time streaming of synthesized speech
   - Supports voice cloning for personalized experiences

3. **Additional AI Services**
   - Specialized emotion detection services
   - Cultural and linguistic analysis tools
   - Domain-specific analysis models
   - Bias detection and mitigation services
   - Privacy-preserving AI processing

## 3. Detailed Implementation Specifications

### 3.1. Multi-tenant Service Architecture

#### 3.1.1. Project Structure

```
/
├── netlify.toml                # Netlify configuration
├── package.json                # Project dependencies
├── netlify/
│   └── functions/
│       ├── api/                # API Gateway functions
│       │   ├── v1.ts           # API v1 entry point
│       │   └── webhooks.ts     # Webhook handlers
│       │
│       ├── auth/               # Authentication functions
│       │   ├── verify.ts       # Token verification
│       │   ├── roles.ts        # Role management
│       │   └── tenant.ts       # Tenant isolation
│       │
│       ├── core/               # Core service functions
│       │   ├── users.ts        # User management
│       │   ├── organizations.ts # Organization management
│       │   ├── sessions.ts     # Session management
│       │   ├── upload.ts       # File upload handler
│       │   └── analytics.ts    # Analytics and reporting
│       │
│       ├── analysis/           # Analysis engine functions
│       │   ├── analyze.ts      # Main analysis coordinator
│       │   ├── text.ts         # Text analysis function
│       │   ├── audio.ts        # Audio analysis function
│       │   ├── image.ts        # Image analysis function
│       │   ├── document.ts     # Document analysis function
│       │   └── fusion.ts       # Multimodal fusion function
│       │
│       ├── generation/         # Response generation functions
│       │   ├── generate.ts     # Main generation coordinator
│       │   ├── strategy.ts     # Response strategy function
│       │   ├── text.ts         # Text generation function
│       │   └── voice.ts        # Voice synthesis function
│       │
│       └── utils/              # Shared utilities
│           ├── supabase.ts     # Supabase client
│           ├── gemini.ts       # Google Gemini client
│           ├── elevenlabs.ts   # ElevenLabs client
│           ├── cache.ts        # Redis cache client
│           ├── rate-limit.ts   # Rate limiting utilities
│           └── types.ts        # Shared type definitions
│
├── src/
│   ├── lib/                    # Core library code
│   │   ├── analysis/           # Analysis modules
│   │   │   ├── text-analysis.ts    # Text analysis module
│   │   │   ├── audio-analysis.ts   # Audio analysis module
│   │   │   ├── image-analysis.ts   # Image analysis module
│   │   │   ├── document-analysis.ts # Document analysis module
│   │   │   └── fusion.ts           # Multimodal fusion module
│   │   │
│   │   ├── response/           # Response generation modules
│   │   │   ├── strategy-generator.ts # Response strategy generator
│   │   │   ├── text-generator.ts    # Text response generator
│   │   │   └── emotion-mapper.ts    # Emotion to voice parameter mapper
│   │   │
│   │   ├── ai/                 # AI service integrations
│   │   │   ├── gemini/         # Google Gemini integration
│   │   │   │   ├── client.ts   # Gemini client
│   │   │   │   ├── prompts.ts  # Prompt templates
│   │   │   │   └── models.ts   # Model configurations
│   │   │   │
│   │   │   └── elevenlabs/     # ElevenLabs integration
│   │   │       ├── client.ts   # ElevenLabs client
│   │   │       ├── voices.ts   # Voice configurations
│   │   │       └── streaming.ts # Streaming implementation
│   │   │
│   │   ├── multi-tenant/       # Multi-tenant utilities
│   │   │   ├── tenant.ts       # Tenant context management
│   │   │   ├── isolation.ts    # Data isolation utilities
│   │   │   └── billing.ts      # Usage tracking and billing
│   │   │
│   │   └── utils/              # Shared utilities
│   │       ├── validation.ts   # Input validation
│   │       ├── security.ts     # Security utilities
│   │       ├── logging.ts      # Logging utilities
│   │       └── errors.ts       # Error handling
│   │
│   └── schemas/                # Database and API schemas
│       ├── database.ts         # Database schema definitions
│       ├── api.ts              # API schema definitions
│       └── validation.ts       # Input validation schemas
│
├── migrations/                 # Database migrations
│   ├── 001_initial_schema.sql  # Initial schema migration
│   ├── 002_multi_tenant.sql    # Multi-tenant support
│   └── 003_analytics.sql       # Analytics tables
│
└── tests/                      # Test suite
    ├── unit/                   # Unit tests
    ├── integration/            # Integration tests
    └── e2e/                    # End-to-end tests
```

This project structure is designed to support a multi-tenant service architecture with clear separation of concerns and modular components. The organization facilitates:

1. **API Versioning**: Separate API versions can be maintained without breaking changes.
2. **Function Isolation**: Each function has a specific responsibility, making the system easier to maintain.
3. **Multi-tenant Support**: Dedicated modules for tenant isolation and management.
4. **Scalability**: Functions can be deployed and scaled independently.
5. **Testing**: Clear structure for unit, integration, and end-to-end tests.

#### 3.1.2. Netlify Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "public"
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
  external_node_modules = ["@google/generative-ai", "@supabase/supabase-js"]

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[dev]
  command = "npm run dev"
  port = 8888
  targetPort = 3000
```

### 3.2. Multi-tenant API Implementation

#### 3.2.1. API Gateway with Tenant Isolation

```typescript
// netlify/functions/api/v1.ts
import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import { verifyToken } from '../auth/verify';
import { getTenantContext } from '../auth/tenant';
import { applyRateLimit } from '../utils/rate-limit';
import { logRequest, logError } from '../utils/logging';
import { ApiError, errorResponse } from '../utils/errors';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handler: Handler = async (event, context) => {
  // Start request logging
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  logRequest(requestId, event);
  
  try {
    // Extract the path from the URL
    const path = event.path.replace(/^\/api\/v1\//, '');
    
    // Apply rate limiting based on IP or API key
    const apiKey = event.headers['x-api-key'];
    const clientIp = event.headers['client-ip'] || event.headers['x-forwarded-for'];
    const rateLimitKey = apiKey || clientIp;
    
    const rateLimitResult = await applyRateLimit(rateLimitKey);
    if (!rateLimitResult.success) {
      return {
        statusCode: 429,
        body: JSON.stringify({ 
          error: 'Too many requests',
          retryAfter: rateLimitResult.retryAfter
        }),
        headers: {
          'Retry-After': rateLimitResult.retryAfter.toString()
        }
      };
    }
    
    // Verify authentication
    const authHeader = event.headers.authorization;
    if (!authHeader && !apiKey) {
      throw new ApiError('Unauthorized', 401);
    }
    
    // Authenticate using JWT or API key
    let userId, organizationId;
    
    if (authHeader) {
      // JWT authentication
      const token = authHeader.replace('Bearer ', '');
      const authResult = await verifyToken(token);
      
      if (!authResult.success) {
        throw new ApiError('Invalid token', 401);
      }
      
      userId = authResult.userId;
      organizationId = authResult.organizationId;
    } else if (apiKey) {
      // API key authentication
      const { data: apiKeyData, error: apiKeyError } = await supabase
        .from('api_keys')
        .select('user_id, organization_id, permissions, rate_limit')
        .eq('key', apiKey)
        .eq('active', true)
        .single();
      
      if (apiKeyError || !apiKeyData) {
        throw new ApiError('Invalid API key', 401);
      }
      
      // Check if API key has expired
      const now = new Date();
      if (apiKeyData.expires_at && new Date(apiKeyData.expires_at) < now) {
        throw new ApiError('Expired API key', 401);
      }
      
      userId = apiKeyData.user_id;
      organizationId = apiKeyData.organization_id;
      
      // Check if API key has permission for this endpoint
      if (apiKeyData.permissions && !hasPermission(apiKeyData.permissions, path)) {
        throw new ApiError('Insufficient permissions', 403);
      }
    }
    
    // Get tenant context
    const tenantContext = await getTenantContext(organizationId);
    
    // Add tenant and user context to headers for downstream functions
    const contextHeaders = {
      'Content-Type': 'application/json',
      'x-request-id': requestId,
      'x-user-id': userId,
      'x-organization-id': organizationId,
      'x-tenant-context': JSON.stringify(tenantContext)
    };
    
    // Route to appropriate handler based on path
    switch (path) {
      case 'analysis/analyze': {
        // Forward to analyze function
        const response = await fetch(`${process.env.URL}/.netlify/functions/analysis/analyze`, {
          method: event.httpMethod,
          headers: contextHeaders,
          body: event.body,
        });
        
        return {
          statusCode: response.status,
          body: await response.text(),
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
      
      case 'generation/generate': {
        // Forward to generate function
        const response = await fetch(`${process.env.URL}/.netlify/functions/generation/generate`, {
          method: event.httpMethod,
          headers: contextHeaders,
          body: event.body,
        });
        
        return {
          statusCode: response.status,
          body: await response.text(),
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
      
      case 'generation/voice': {
        // Forward to voice synthesis function
        const response = await fetch(`${process.env.URL}/.netlify/functions/generation/voice`, {
          method: event.httpMethod,
          headers: contextHeaders,
          body: event.body,
        });
        
        return {
          statusCode: response.status,
          body: await response.text(),
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
      
      case 'core/upload': {
        // Forward to upload function
        const response = await fetch(`${process.env.URL}/.netlify/functions/core/upload`, {
          method: event.httpMethod,
          headers: {
            ...contextHeaders,
            'Content-Type': event.headers['content-type'],
          },
          body: event.body,
        });
        
        return {
          statusCode: response.status,
          body: await response.text(),
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
      
      case 'core/sessions': {
        // Forward to sessions management function
        const response = await fetch(`${process.env.URL}/.netlify/functions/core/sessions`, {
          method: event.httpMethod,
          headers: contextHeaders,
          body: event.body,
        });
        
        return {
          statusCode: response.status,
          body: await response.text(),
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
      
      case 'core/analytics': {
        // Forward to analytics function
        const response = await fetch(`${process.env.URL}/.netlify/functions/core/analytics`, {
          method: event.httpMethod,
          headers: contextHeaders,
          body: event.body,
        });
        
        return {
          statusCode: response.status,
          body: await response.text(),
          headers: {
            'Content-Type': 'application/json'
          }
        };
      }
      
      default:
        throw new ApiError('Not found', 404);
    }
  } catch (error) {
    // Log error
    logError(requestId, error);
    
    // Return appropriate error response
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }
    
    return errorResponse('Internal server error', 500);
  }
};

// Helper function to check if API key has permission for the endpoint
function hasPermission(permissions: string[], path: string): boolean {
  // Simple permission check - can be expanded for more granular control
  if (permissions.includes('*')) {
    return true;
  }
  
  const pathParts = path.split('/');
  const resourceType = pathParts[0];
  
  return permissions.includes(resourceType);
}
```

#### 3.2.2. Multimodal Analysis Function with Multi-User Support

```typescript
// netlify/functions/analysis/analyze.ts
import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import { 
  analyzeText, 
  analyzeAudio, 
  analyzeImage, 
  analyzeDocument,
  fusionLayer
} from '../../../src/lib/analysis';
import { getTenantConfig } from '../../../src/lib/multi-tenant/tenant';
import { trackUsage } from '../../../src/lib/multi-tenant/billing';
import { validateAnalysisInput } from '../../../src/lib/utils/validation';
import { logOperation, logError } from '../../../src/lib/utils/logging';
import { AnalysisInput, AnalysisResult, TenantContext } from '../../../src/lib/utils/types';
import { ApiError, errorResponse } from '../../../src/lib/utils/errors';

// Initialize clients
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export const handler: Handler = async (event, context) => {
  // Extract request context
  const requestId = event.headers['x-request-id'];
  const userId = event.headers['x-user-id'];
  const organizationId = event.headers['x-organization-id'];
  const tenantContextStr = event.headers['x-tenant-context'];
  
  if (!requestId || !userId || !organizationId || !tenantContextStr) {
    return errorResponse('Missing required headers', 400);
  }
  
  try {
    // Parse tenant context
    const tenantContext: TenantContext = JSON.parse(tenantContextStr);
    
    // Get tenant-specific configuration
    const tenantConfig = await getTenantConfig(tenantContext);
    
    // Parse and validate input
    const input: AnalysisInput = JSON.parse(event.body || '{}');
    const validationResult = validateAnalysisInput(input);
    
    if (!validationResult.valid) {
      return errorResponse(`Invalid input: ${validationResult.errors.join(', ')}`, 400);
    }
    
    // Check if analysis is cached (for identical inputs)
    const cacheKey = generateCacheKey(input, organizationId);
    const cachedResult = await redis.get(cacheKey);
    
    if (cachedResult && tenantConfig.enableCaching) {
      // Log cache hit
      logOperation(requestId, 'analysis_cache_hit', { organizationId });
      
      // Track usage (cached requests might be charged differently)
      await trackUsage(organizationId, 'analysis', 'cached', {
        userId,
        sessionId: input.sessionContext.sessionId,
        modalitiesUsed: getModalitiesUsed(input)
      });
      
      return {
        statusCode: 200,
        body: JSON.stringify(cachedResult),
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'HIT'
        }
      };
    }
    
    // Log analysis operation start
    logOperation(requestId, 'analysis_started', { 
      organizationId,
      sessionId: input.sessionContext.sessionId,
      modalitiesUsed: getModalitiesUsed(input)
    });
    
    // Process each modality in parallel with tenant-specific configurations
    const [textAnalysis, audioAnalysis, imageAnalysis, documentAnalysis] = 
      await Promise.all([
        input.text ? analyzeText(
          input.text, 
          input.sessionContext, 
          genAI, 
          tenantConfig.textAnalysis
        ) : null,
        
        input.audioUrl ? analyzeAudio(
          input.audioUrl, 
          supabase, 
          tenantConfig.audioAnalysis
        ) : null,
        
        input.imageUrls?.length ? Promise.all(input.imageUrls.map(url => 
          analyzeImage(
            url, 
            genAI, 
            supabase, 
            tenantConfig.imageAnalysis
          )
        )) : null,
        
        input.documentUrls?.length ? Promise.all(input.documentUrls.map(url => 
          analyzeDocument(
            url, 
            genAI, 
            supabase, 
            tenantConfig.documentAnalysis
          )
        )) : null,
      ]);
    
    // Combine analyses using fusion layer with tenant-specific weights
    const fusedAnalysis = fusionLayer(
      textAnalysis, 
      audioAnalysis, 
      imageAnalysis, 
      documentAnalysis,
      input.sessionContext,
      tenantConfig.fusionWeights
    );
    
    // Store analysis results in Supabase with tenant isolation
    await supabase
      .from('session_analysis')
      .insert({
        session_id: input.sessionContext.sessionId,
        user_id: userId,
        organization_id: organizationId,
        timestamp: new Date().toISOString(),
        analysis_data: fusedAnalysis,
        modalities_used: getModalitiesUsed(input),
        request_id: requestId
      });
    
    // Cache the result if caching is enabled
    if (tenantConfig.enableCaching) {
      // Cache expiration based on tenant configuration
      const cacheExpiration = tenantConfig.cacheTTL || 3600; // Default 1 hour
      await redis.set(cacheKey, fusedAnalysis, { ex: cacheExpiration });
    }
    
    // Track usage for billing
    await trackUsage(organizationId, 'analysis', 'full', {
      userId,
      sessionId: input.sessionContext.sessionId,
      modalitiesUsed: getModalitiesUsed(input),
      tokensUsed: calculateTokensUsed(input, fusedAnalysis)
    });
    
    // Log analysis operation completion
    logOperation(requestId, 'analysis_completed', { 
      organizationId,
      sessionId: input.sessionContext.sessionId,
      duration: Date.now() - parseInt(requestId.split('_')[1])
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(fusedAnalysis),
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'MISS'
      }
    };
  } catch (error) {
    // Log error
    logError(requestId, error);
    
    // Track failed operation for monitoring
    try {
      await trackUsage(organizationId, 'analysis', 'error', {
        userId,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
    } catch (trackingError) {
      // Silently fail tracking errors to ensure main error is returned
      console.error('Failed to track error:', trackingError);
    }
    
    // Return appropriate error response
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }
    
    return errorResponse('Analysis failed', 500);
  }
};

// Helper function to generate cache key
function generateCacheKey(input: AnalysisInput, organizationId: string): string {
  // Create a deterministic hash of the input for caching
  const inputHash = JSON.stringify({
    text: input.text,
    audioUrl: input.audioUrl,
    imageUrls: input.imageUrls,
    documentUrls: input.documentUrls,
    sessionContext: {
      sessionId: input.sessionContext.sessionId,
      sessionType: input.sessionContext.sessionType,
      // Exclude timestamps or other changing values
    }
  });
  
  // Include organization ID to ensure tenant isolation in cache
  return `analysis:${organizationId}:${Buffer.from(inputHash).toString('base64')}`;
}

// Helper function to determine which modalities were used
function getModalitiesUsed(input: AnalysisInput): string[] {
  const modalities = [];
  
  if (input.text) modalities.push('text');
  if (input.audioUrl) modalities.push('audio');
  if (input.imageUrls?.length) modalities.push('image');
  if (input.documentUrls?.length) modalities.push('document');
  
  return modalities;
}

// Helper function to calculate tokens used for billing
function calculateTokensUsed(input: AnalysisInput, analysis: any): number {
  // Simplified token calculation - would be more sophisticated in production
  let tokenCount = 0;
  
  // Estimate input tokens
  if (input.text) {
    tokenCount += Math.ceil(input.text.length / 4); // Rough estimate
  }
  
  // Add fixed costs for other modalities
  if (input.audioUrl) tokenCount += 1000; // Placeholder value
  if (input.imageUrls?.length) tokenCount += input.imageUrls.length * 1500; // Placeholder value
  if (input.documentUrls?.length) tokenCount += input.documentUrls.length * 2000; // Placeholder value
  
  // Add output tokens (rough estimate based on JSON size)
  const outputSize = JSON.stringify(analysis).length;
  tokenCount += Math.ceil(outputSize / 4);
  
  return tokenCount;
}
```

#### 3.2.3. Response Generation Function with Multi-User Support

```typescript
// netlify/functions/generation/generate.ts
import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import { 
  generateTextResponse,
  determineResponseEmotion,
  personalizeResponse
} from '../../../src/lib/response';
import { getTenantConfig } from '../../../src/lib/multi-tenant/tenant';
import { trackUsage } from '../../../src/lib/multi-tenant/billing';
import { validateResponseInput } from '../../../src/lib/utils/validation';
import { logOperation, logError } from '../../../src/lib/utils/logging';
import { ResponseInput, ResponseResult, TenantContext } from '../../../src/lib/utils/types';
import { ApiError, errorResponse } from '../../../src/lib/utils/errors';

// Initialize clients
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export const handler: Handler = async (event, context) => {
  // Extract request context
  const requestId = event.headers['x-request-id'];
  const userId = event.headers['x-user-id'];
  const organizationId = event.headers['x-organization-id'];
  const tenantContextStr = event.headers['x-tenant-context'];
  
  if (!requestId || !userId || !organizationId || !tenantContextStr) {
    return errorResponse('Missing required headers', 400);
  }
  
  try {
    // Parse tenant context
    const tenantContext: TenantContext = JSON.parse(tenantContextStr);
    
    // Get tenant-specific configuration
    const tenantConfig = await getTenantConfig(tenantContext);
    
    // Parse and validate input
    const input: ResponseInput = JSON.parse(event.body || '{}');
    const validationResult = validateResponseInput(input);
    
    if (!validationResult.valid) {
      return errorResponse(`Invalid input: ${validationResult.errors.join(', ')}`, 400);
    }
    
    // Check if response is cached (for identical inputs)
    const cacheKey = generateResponseCacheKey(input, organizationId);
    const cachedResult = await redis.get(cacheKey);
    
    if (cachedResult && tenantConfig.enableCaching) {
      // Log cache hit
      logOperation(requestId, 'response_generation_cache_hit', { organizationId });
      
      // Track usage (cached requests might be charged differently)
      await trackUsage(organizationId, 'response_generation', 'cached', {
        userId,
        sessionId: input.sessionContext.sessionId
      });
      
      return {
        statusCode: 200,
        body: JSON.stringify(cachedResult),
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'HIT'
        }
      };
    }
    
    // Log response generation operation start
    logOperation(requestId, 'response_generation_started', { 
      organizationId,
      sessionId: input.sessionContext.sessionId
    });
    
    // Get user preferences for personalization
    const { data: userPreferences } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    // Get session history for context
    const { data: sessionHistory } = await supabase
      .from('session_messages')
      .select('*')
      .eq('session_id', input.sessionContext.sessionId)
      .order('timestamp', { ascending: true })
      .limit(tenantConfig.responseGeneration?.contextWindowSize || 10);
    
    // Generate text response based on analysis with tenant-specific configuration
    const responseText = await generateTextResponse(
      input.analysis,
      input.sessionContext,
      genAI,
      {
        model: tenantConfig.responseGeneration?.model || 'gemini-pro',
        temperature: tenantConfig.responseGeneration?.temperature || 0.7,
        maxTokens: tenantConfig.responseGeneration?.maxTokens || 1000,
        sessionHistory: sessionHistory || [],
        userPreferences: userPreferences || {}
      }
    );
    
    // Determine emotional tone for response
    const emotionalState = determineResponseEmotion(
      input.analysis,
      tenantConfig.emotionMapping
    );
    
    // Personalize response based on user preferences and session context
    const personalizedResponse = await personalizeResponse(
      responseText,
      emotionalState,
      userPreferences,
      input.sessionContext,
      tenantConfig.personalization
    );
    
    // Prepare result
    const result = {
      responseText: personalizedResponse,
      emotionalState,
      responseId: `resp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    };
    
    // Store response in Supabase with tenant isolation
    await supabase
      .from('session_messages')
      .insert({
        session_id: input.sessionContext.sessionId,
        user_id: userId,
        organization_id: organizationId,
        role: 'assistant',
        content: personalizedResponse,
        emotional_state: emotionalState,
        timestamp: new Date().toISOString(),
        request_id: requestId,
        response_id: result.responseId
      });
    
    // Cache the result if caching is enabled
    if (tenantConfig.enableCaching) {
      // Cache expiration based on tenant configuration
      const cacheExpiration = tenantConfig.cacheTTL || 3600; // Default 1 hour
      await redis.set(cacheKey, result, { ex: cacheExpiration });
    }
    
    // Track usage for billing
    await trackUsage(organizationId, 'response_generation', 'full', {
      userId,
      sessionId: input.sessionContext.sessionId,
      tokensUsed: calculateResponseTokensUsed(input, personalizedResponse)
    });
    
    // Log response generation operation completion
    logOperation(requestId, 'response_generation_completed', { 
      organizationId,
      sessionId: input.sessionContext.sessionId,
      duration: Date.now() - parseInt(requestId.split('_')[1]),
      responseId: result.responseId
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'MISS'
      }
    };
  } catch (error) {
    // Log error
    logError(requestId, error);
    
    // Track failed operation for monitoring
    try {
      await trackUsage(organizationId, 'response_generation', 'error', {
        userId,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
    } catch (trackingError) {
      // Silently fail tracking errors to ensure main error is returned
      console.error('Failed to track error:', trackingError);
    }
    
    // Return appropriate error response
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }
    
    return errorResponse('Response generation failed', 500);
  }
};

// Helper function to generate cache key
function generateResponseCacheKey(input: ResponseInput, organizationId: string): string {
  // Create a deterministic hash of the input for caching
  const inputHash = JSON.stringify({
    analysis: input.analysis,
    sessionContext: {
      sessionId: input.sessionContext.sessionId,
      sessionType: input.sessionContext.sessionType,
      // Exclude timestamps or other changing values
    }
  });
  
  // Include organization ID to ensure tenant isolation in cache
  return `response:${organizationId}:${Buffer.from(inputHash).toString('base64')}`;
}

// Helper function to calculate tokens used for billing
function calculateResponseTokensUsed(input: ResponseInput, response: string): number {
  // Simplified token calculation - would be more sophisticated in production
  let tokenCount = 0;
  
  // Estimate input tokens (analysis JSON)
  const analysisSize = JSON.stringify(input.analysis).length;
  tokenCount += Math.ceil(analysisSize / 4);
  
  // Add session context tokens
  const contextSize = JSON.stringify(input.sessionContext).length;
  tokenCount += Math.ceil(contextSize / 4);
  
  // Add output tokens (response text)
  tokenCount += Math.ceil(response.length / 4);
  
  return tokenCount;
}
```

#### 3.2.4. ElevenLabs Voice Synthesis Function with Multi-User Support

```typescript
// netlify/functions/generation/voice.ts
import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { createClient } from '@supabase/supabase-js';
import { Redis } from '@upstash/redis';
import { 
  getVoiceIdForEmotion, 
  getVoiceSettingsForEmotion,
  optimizeTextForSpeech
} from '../../../src/lib/response';
import { getTenantConfig } from '../../../src/lib/multi-tenant/tenant';
import { trackUsage } from '../../../src/lib/multi-tenant/billing';
import { validateVoiceSynthesisInput } from '../../../src/lib/utils/validation';
import { logOperation, logError } from '../../../src/lib/utils/logging';
import { streamElevenLabsResponse } from '../../../src/lib/ai/elevenlabs/streaming';
import { VoiceSynthesisInput, TenantContext } from '../../../src/lib/utils/types';
import { ApiError, errorResponse } from '../../../src/lib/utils/errors';

// Initialize clients
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export const handler: Handler = async (event, context) => {
  // Extract request context
  const requestId = event.headers['x-request-id'];
  const userId = event.headers['x-user-id'];
  const organizationId = event.headers['x-organization-id'];
  const tenantContextStr = event.headers['x-tenant-context'];
  
  if (!requestId || !userId || !organizationId || !tenantContextStr) {
    return errorResponse('Missing required headers', 400);
  }
  
  try {
    // Parse tenant context
    const tenantContext: TenantContext = JSON.parse(tenantContextStr);
    
    // Get tenant-specific configuration
    const tenantConfig = await getTenantConfig(tenantContext);
    
    // Parse and validate input
    const input: VoiceSynthesisInput = JSON.parse(event.body || '{}');
    const validationResult = validateVoiceSynthesisInput(input);
    
    if (!validationResult.valid) {
      return errorResponse(`Invalid input: ${validationResult.errors.join(', ')}`, 400);
    }
    
    // Check if voice synthesis is cached (for identical inputs)
    const cacheKey = generateVoiceCacheKey(input, organizationId);
    const cachedResult = await redis.get(cacheKey);
    
    if (cachedResult && tenantConfig.enableCaching) {
      // Log cache hit
      logOperation(requestId, 'voice_synthesis_cache_hit', { organizationId });
      
      // Track usage (cached requests might be charged differently)
      await trackUsage(organizationId, 'voice_synthesis', 'cached', {
        userId,
        sessionId: input.sessionContext.sessionId,
        responseId: input.responseId
      });
      
      return {
        statusCode: 200,
        body: JSON.stringify(cachedResult),
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'HIT'
        }
      };
    }
    
    // Log voice synthesis operation start
    logOperation(requestId, 'voice_synthesis_started', { 
      organizationId,
      sessionId: input.sessionContext.sessionId,
      responseId: input.responseId
    });
    
    // Get user voice preferences
    const { data: userVoicePreferences } = await supabase
      .from('user_voice_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    // Get organization voice settings
    const { data: orgVoiceSettings } = await supabase
      .from('organization_settings')
      .select('voice_settings')
      .eq('organization_id', organizationId)
      .single();
    
    // Determine voice ID and settings based on emotional state and preferences
    let voiceId = getVoiceIdForEmotion(
      input.emotionalState,
      tenantConfig.voiceSynthesis?.voices || {}
    );
    
    // Override with user preferences if available
    if (userVoicePreferences?.preferred_voice_id) {
      voiceId = userVoicePreferences.preferred_voice_id;
    }
    
    // Get voice settings with tenant-specific configurations
    let voiceSettings = getVoiceSettingsForEmotion(
      input.emotionalState,
      tenantConfig.voiceSynthesis?.emotionSettings || {}
    );
    
    // Apply user-specific voice settings if available
    if (userVoicePreferences?.voice_settings) {
      voiceSettings = {
        ...voiceSettings,
        ...userVoicePreferences.voice_settings
      };
    }
    
    // Optimize text for speech synthesis
    const optimizedText = await optimizeTextForSpeech(
      input.text,
      input.emotionalState,
      tenantConfig.voiceSynthesis?.textOptimization || {}
    );
    
    // Determine ElevenLabs model based on tenant configuration
    const modelId = tenantConfig.voiceSynthesis?.model || 'eleven_monolingual_v1';
    
    // Determine if streaming is enabled
    const streamingEnabled = tenantConfig.voiceSynthesis?.enableStreaming || false;
    
    let audioUrl;
    
    if (streamingEnabled && input.streamResponse) {
      // Use streaming API for real-time voice synthesis
      const streamResponse = await streamElevenLabsResponse({
        text: optimizedText,
        voiceId,
        modelId,
        voiceSettings,
        apiKey: process.env.ELEVENLABS_API_KEY!,
        outputFormat: 'mp3',
        optimizeStreamingLatency: tenantConfig.voiceSynthesis?.optimizeLatency || false
      });
      
      // Store streaming session information
      const streamingSessionId = `stream_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      
      await redis.set(`streaming:${streamingSessionId}`, {
        userId,
        organizationId,
        sessionId: input.sessionContext.sessionId,
        responseId: input.responseId,
        startTime: Date.now(),
        status: 'active'
      }, { ex: 3600 }); // Expire after 1 hour
      
      // Return streaming session information
      return {
        statusCode: 200,
        body: JSON.stringify({
          streamingUrl: `${process.env.STREAMING_ENDPOINT}/voice/${streamingSessionId}`,
          streamingSessionId,
          contentType: 'audio/mpeg'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
    } else {
      // Use standard API for complete voice synthesis
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': process.env.ELEVENLABS_API_KEY!,
            'User-Agent': `Understand.me/${process.env.APP_VERSION || '1.0.0'}`
          },
          body: JSON.stringify({
            text: optimizedText,
            model_id: modelId,
            voice_settings: voiceSettings,
          }),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          `ElevenLabs API error: ${response.statusText}`,
          response.status,
          errorData
        );
      }
      
      // Get audio data
      const audioBuffer = await response.buffer();
      
      // Generate unique filename with organization isolation
      const fileName = `voice_${organizationId}_${Date.now()}.mp3`;
      const filePath = `organizations/${organizationId}/voices/${input.sessionContext.sessionId}/${fileName}`;
      
      // Upload to Supabase Storage with tenant isolation
      const { data, error } = await supabase.storage
        .from('audio')
        .upload(filePath, audioBuffer, {
          contentType: 'audio/mpeg',
          cacheControl: '3600',
        });
      
      if (error) {
        throw new ApiError(`Supabase Storage error: ${error.message}`, 500);
      }
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('audio')
        .getPublicUrl(filePath);
      
      audioUrl = publicUrl;
    }
    
    // Update session message with audio URL
    await supabase
      .from('session_messages')
      .update({ 
        audio_url: audioUrl,
        voice_id: voiceId,
        voice_settings: voiceSettings,
        voice_model: modelId
      })
      .match({ 
        response_id: input.responseId,
        organization_id: organizationId
      });
    
    // Prepare result
    const result = {
      audioUrl,
      voiceId,
      duration: estimateAudioDuration(optimizedText, voiceSettings.speakingRate || 1.0)
    };
    
    // Cache the result if caching is enabled
    if (tenantConfig.enableCaching) {
      // Cache expiration based on tenant configuration
      const cacheExpiration = tenantConfig.cacheTTL || 3600; // Default 1 hour
      await redis.set(cacheKey, result, { ex: cacheExpiration });
    }
    
    // Track usage for billing
    await trackUsage(organizationId, 'voice_synthesis', 'full', {
      userId,
      sessionId: input.sessionContext.sessionId,
      responseId: input.responseId,
      characterCount: optimizedText.length,
      voiceId,
      modelId
    });
    
    // Log voice synthesis operation completion
    logOperation(requestId, 'voice_synthesis_completed', { 
      organizationId,
      sessionId: input.sessionContext.sessionId,
      responseId: input.responseId,
      duration: Date.now() - parseInt(requestId.split('_')[1]),
      audioUrl
    });
    
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'MISS'
      }
    };
  } catch (error) {
    // Log error
    logError(requestId, error);
    
    // Track failed operation for monitoring
    try {
      await trackUsage(organizationId, 'voice_synthesis', 'error', {
        userId,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      });
    } catch (trackingError) {
      // Silently fail tracking errors to ensure main error is returned
      console.error('Failed to track error:', trackingError);
    }
    
    // Return appropriate error response
    if (error instanceof ApiError) {
      return errorResponse(error.message, error.statusCode);
    }
    
    return errorResponse('Voice synthesis failed', 500);
  }
};

// Helper function to generate cache key
function generateVoiceCacheKey(input: VoiceSynthesisInput, organizationId: string): string {
  // Create a deterministic hash of the input for caching
  const inputHash = JSON.stringify({
    text: input.text,
    emotionalState: input.emotionalState,
    responseId: input.responseId,
    sessionContext: {
      sessionId: input.sessionContext.sessionId,
      sessionType: input.sessionContext.sessionType,
    }
  });
  
  // Include organization ID to ensure tenant isolation in cache
  return `voice:${organizationId}:${Buffer.from(inputHash).toString('base64')}`;
}

// Helper function to estimate audio duration based on text length and speaking rate
function estimateAudioDuration(text: string, speakingRate: number): number {
  // Average speaking rate is about 150 words per minute
  // Adjust based on the speaking rate parameter
  const wordCount = text.split(/\s+/).length;
  const wordsPerSecond = (150 / 60) * speakingRate;
  
  // Add a small buffer for pauses and natural speech patterns
  return Math.ceil((wordCount / wordsPerSecond) * 1.1);
}
```

#### 3.2.5. ElevenLabs Streaming Implementation

```typescript
// src/lib/ai/elevenlabs/streaming.ts
import fetch from 'node-fetch';
import { Readable } from 'stream';

interface StreamOptions {
  text: string;
  voiceId: string;
  modelId: string;
  voiceSettings: any;
  apiKey: string;
  outputFormat?: 'mp3' | 'pcm' | 'ulaw';
  optimizeStreamingLatency?: boolean;
}

export async function streamElevenLabsResponse(options: StreamOptions): Promise<Readable> {
  const {
    text,
    voiceId,
    modelId,
    voiceSettings,
    apiKey,
    outputFormat = 'mp3',
    optimizeStreamingLatency = false
  } = options;
  
  // Configure streaming options
  const streamingOptions = {
    text,
    model_id: modelId,
    voice_settings: voiceSettings,
    output_format: outputFormat,
    optimize_streaming_latency: optimizeStreamingLatency ? 4 : 0 // 0-4, higher means lower latency but potentially lower quality
  };
  
  // Call ElevenLabs streaming API
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
        'User-Agent': `Understand.me/${process.env.APP_VERSION || '1.0.0'}`
      },
      body: JSON.stringify(streamingOptions)
    }
  );
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`ElevenLabs streaming API error: ${response.status} ${response.statusText} - ${errorText}`);
  }
  
  // Create a readable stream from the response body
  const responseStream = response.body as any;
  
  // Create a pass-through stream to handle the response
  const outputStream = new Readable({
    read() {}
  });
  
  // Pipe the response stream to our output stream
  responseStream.on('data', (chunk: Buffer) => {
    outputStream.push(chunk);
  });
  
  responseStream.on('end', () => {
    outputStream.push(null);
  });
  
  responseStream.on('error', (err: Error) => {
    outputStream.emit('error', err);
    outputStream.push(null);
  });
  
  return outputStream;
}

// Function to handle streaming response in Netlify Edge Functions
export async function handleStreamingRequest(
  streamingSessionId: string,
  redis: any,
  supabase: any
): Promise<Response> {
  // Get streaming session information
  const sessionInfo = await redis.get(`streaming:${streamingSessionId}`);
  
  if (!sessionInfo) {
    return new Response('Streaming session not found', { status: 404 });
  }
  
  // Get the response message to synthesize
  const { data: message } = await supabase
    .from('session_messages')
    .select('*')
    .eq('response_id', sessionInfo.responseId)
    .single();
  
  if (!message) {
    return new Response('Message not found', { status: 404 });
  }
  
  // Get organization voice settings
  const { data: orgSettings } = await supabase
    .from('organization_settings')
    .select('voice_settings')
    .eq('organization_id', sessionInfo.organizationId)
    .single();
  
  // Get user voice preferences
  const { data: userVoicePreferences } = await supabase
    .from('user_voice_preferences')
    .select('*')
    .eq('user_id', sessionInfo.userId)
    .single();
  
  // Determine voice ID and settings
  const voiceId = userVoicePreferences?.preferred_voice_id || 
                 orgSettings?.voice_settings?.default_voice_id ||
                 'EXAVITQu4vr4xnSDxMaL'; // Default voice
  
  const voiceSettings = {
    ...(orgSettings?.voice_settings?.default_settings || {}),
    ...(userVoicePreferences?.voice_settings || {})
  };
  
  // Create streaming response
  try {
    const stream = await streamElevenLabsResponse({
      text: message.content,
      voiceId,
      modelId: 'eleven_monolingual_v1',
      voiceSettings,
      apiKey: process.env.ELEVENLABS_API_KEY!,
      outputFormat: 'mp3',
      optimizeStreamingLatency: true
    });
    
    // Create a TransformStream to handle the streaming response
    const { readable, writable } = new TransformStream();
    
    // Pipe the stream to the TransformStream
    stream.on('data', async (chunk: Buffer) => {
      const writer = writable.getWriter();
      await writer.write(chunk);
      writer.releaseLock();
    });
    
    stream.on('end', async () => {
      const writer = writable.getWriter();
      await writer.close();
    });
    
    stream.on('error', async (err: Error) => {
      console.error('Streaming error:', err);
      const writer = writable.getWriter();
      await writer.abort(err);
    });
    
    // Update streaming session status
    await redis.set(`streaming:${streamingSessionId}`, {
      ...sessionInfo,
      status: 'streaming',
      lastActivity: Date.now()
    }, { ex: 3600 });
    
    // Return the streaming response
    return new Response(readable, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });
  } catch (error) {
    console.error('Error creating streaming response:', error);
    
    // Update streaming session status
    await redis.set(`streaming:${streamingSessionId}`, {
      ...sessionInfo,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      lastActivity: Date.now()
    }, { ex: 3600 });
    
    return new Response('Error creating streaming response', { status: 500 });
  }
}
```

#### 3.2.5. File Upload Handler

```typescript
// netlify/functions/upload.ts
import { Handler } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';
import multipart from 'parse-multipart-data';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export const handler: Handler = async (event, context) => {
  try {
    // Verify user ID from API Gateway
    const userId = event.headers['x-user-id'];
    if (!userId) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }
    
    // Parse multipart form data
    const contentType = event.headers['content-type'];
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid content type' }),
      };
    }
    
    const boundary = contentType.split('boundary=')[1];
    const parts = multipart.parse(Buffer.from(event.body!, 'base64'), boundary);
    
    if (parts.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'No file found' }),
      };
    }
    
    const file = parts[0];
    const sessionId = parts.find(p => p.name === 'sessionId')?.data.toString() || 'default';
    const fileType = parts.find(p => p.name === 'fileType')?.data.toString() || 'unknown';
    
    // Determine storage bucket and path based on file type
    let bucket = 'media';
    let folder = 'unknown';
    
    if (fileType.includes('audio')) {
      bucket = 'audio';
      folder = 'recordings';
    } else if (fileType.includes('image')) {
      bucket = 'images';
      folder = 'uploads';
    } else if (fileType.includes('application/pdf') || fileType.includes('text')) {
      bucket = 'documents';
      folder = 'uploads';
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.filename || 'file'}`;
    const filePath = `${folder}/${sessionId}/${fileName}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file.data, {
        contentType: file.type,
        cacheControl: '3600',
      });
    
    if (error) {
      throw new Error(`Supabase Storage error: ${error.message}`);
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);
    
    // Store file metadata in database
    await supabase
      .from('media_files')
      .insert({
        user_id: userId,
        session_id: sessionId,
        file_type: fileType,
        file_name: fileName,
        file_path: filePath,
        bucket: bucket,
        public_url: publicUrl,
        created_at: new Date().toISOString(),
      });
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        url: publicUrl,
        fileType,
        fileName,
      }),
    };
  } catch (error) {
    console.error('File upload error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'File upload failed' }),
    };
  }
};
```

### 3.3. Core Analysis Implementation

#### 3.3.1. Text Analysis Module

```typescript
// src/lib/analysis/text-analysis.ts
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';
import { SessionContext } from '../../utils/types';

export async function analyzeText(
  text: string,
  context: SessionContext,
  genAI: GoogleGenerativeAI
): Promise<any> {
  // Get the model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  // Create prompt for text analysis
  const prompt = `
    Analyze the following text from a conversation:
    "${text}"
    
    Context:
    ${JSON.stringify(context)}
    
    Provide detailed analysis of:
    1. Emotional states expressed (primary and secondary emotions, intensity, confidence)
    2. Communication patterns (dominance, interruptions, turn-taking, listening quality)
    3. Potential conflict indicators (type, root causes, escalation level)
    4. Level of understanding between participants
    5. Power dynamics and relationship indicators
    
    Format the response as JSON with the following structure:
    {
      "emotionalStates": {
        "[participantId]": {
          "primaryEmotion": string,
          "secondaryEmotions": string[],
          "intensity": number (0-1),
          "confidence": number (0-1)
        }
      },
      "communicationPatterns": {
        "dominantSpeaker": string | null,
        "interruptionCount": number,
        "turnTakingBalance": number (0-1),
        "listeningQuality": number (0-1)
      },
      "conflictAnalysis": {
        "conflictType": string,
        "rootCauses": string[],
        "escalationLevel": number (0-5),
        "suggestedApproaches": string[]
      },
      "understandingLevel": number (0-1),
      "powerDynamics": {
        "powerImbalance": boolean,
        "dominantParticipant": string | null,
        "submissiveParticipant": string | null
      }
    }
  `;
  
  // Generate analysis
  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  
  try {
    // Parse JSON response
    return JSON.parse(responseText);
  } catch (error) {
    console.error('Error parsing text analysis response:', error);
    throw new Error('Failed to parse text analysis response');
  }
}
```

#### 3.3.2. Audio Analysis Module

```typescript
// src/lib/analysis/audio-analysis.ts
import { SupabaseClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

export async function analyzeAudio(
  audioUrl: string,
  supabase: SupabaseClient
): Promise<any> {
  try {
    // Download audio file from Supabase Storage
    const response = await fetch(audioUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }
    
    const audioBuffer = await response.buffer();
    
    // For voice tone analysis, we would typically use a specialized service
    // Here we'll use a simplified approach for demonstration
    
    // 1. Convert audio to text using Google Speech-to-Text API
    // This would be implemented with the appropriate API call
    
    // 2. Analyze voice characteristics (pitch, pace, volume, etc.)
    // This would be implemented with the appropriate audio processing
    
    // For now, return a placeholder result
    return {
      voiceEmotions: {
        primaryEmotion: 'neutral',
        secondaryEmotions: [],
        intensity: 0.5,
        confidence: 0.7
      },
      voiceCharacteristics: {
        pitch: 'medium',
        pace: 'moderate',
        volume: 'medium',
        clarity: 0.8
      },
      speechPatterns: {
        hesitations: 2,
        fillerWords: 3,
        toneVariation: 0.6
      }
    };
  } catch (error) {
    console.error('Audio analysis error:', error);
    throw new Error('Audio analysis failed');
  }
}
```

#### 3.3.3. Image Analysis Module

```typescript
// src/lib/analysis/image-analysis.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SupabaseClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';

export async function analyzeImage(
  imageUrl: string,
  genAI: GoogleGenerativeAI,
  supabase: SupabaseClient
): Promise<any> {
  try {
    // Download image from Supabase Storage
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const imageBuffer = await response.buffer();
    
    // Convert buffer to base64
    const base64Image = imageBuffer.toString('base64');
    const mimeType = response.headers.get('content-type') || 'image/jpeg';
    
    // Initialize Gemini Pro Vision model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    // Create prompt for image analysis
    const prompt = `
      Analyze this image for:
      1. Facial expressions and emotions of people present
      2. Body language and posture
      3. Environmental context and setting
      4. Any visible text or documents
      5. Overall mood and atmosphere
      
      Format the response as JSON with the following structure:
      {
        "people": [
          {
            "facialExpression": string,
            "emotion": string,
            "bodyLanguage": string,
            "posture": string
          }
        ],
        "environment": {
          "setting": string,
          "context": string,
          "mood": string
        },
        "visibleText": string | null,
        "overallImpression": string
      }
    `;
    
    // Generate analysis
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: mimeType
        }
      }
    ]);
    
    const responseText = result.response.text();
    
    try {
      // Parse JSON response
      return JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing image analysis response:', error);
      throw new Error('Failed to parse image analysis response');
    }
  } catch (error) {
    console.error('Image analysis error:', error);
    throw new Error('Image analysis failed');
  }
}
```

#### 3.3.4. Document Analysis Module

```typescript
// src/lib/analysis/document-analysis.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SupabaseClient } from '@supabase/supabase-js';
import fetch from 'node-fetch';
import * as pdf from 'pdf-parse';

export async function analyzeDocument(
  documentUrl: string,
  genAI: GoogleGenerativeAI,
  supabase: SupabaseClient
): Promise<any> {
  try {
    // Download document from Supabase Storage
    const response = await fetch(documentUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch document: ${response.statusText}`);
    }
    
    const documentBuffer = await response.buffer();
    const contentType = response.headers.get('content-type') || '';
    
    // Extract text from document based on content type
    let documentText = '';
    
    if (contentType.includes('pdf')) {
      // Parse PDF
      const data = await pdf(documentBuffer);
      documentText = data.text;
    } else if (contentType.includes('text')) {
      // Plain text
      documentText = documentBuffer.toString('utf-8');
    } else {
      throw new Error(`Unsupported document type: ${contentType}`);
    }
    
    // Initialize Gemini Pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Create prompt for document analysis
    const prompt = `
      Analyze the following document content:
      "${documentText.substring(0, 10000)}" ${documentText.length > 10000 ? '... (truncated)' : ''}
      
      Provide analysis of:
      1. Main topics and themes
      2. Key points and arguments
      3. Emotional tone and sentiment
      4. Potential areas of conflict or disagreement
      5. Relevant context for understanding
      
      Format the response as JSON with the following structure:
      {
        "topics": string[],
        "keyPoints": string[],
        "emotionalTone": {
          "primary": string,
          "intensity": number (0-1)
        },
        "potentialConflictAreas": string[],
        "relevantContext": string
      }
    `;
    
    // Generate analysis
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    try {
      // Parse JSON response
      return JSON.parse(responseText);
    } catch (error) {
      console.error('Error parsing document analysis response:', error);
      throw new Error('Failed to parse document analysis response');
    }
  } catch (error) {
    console.error('Document analysis error:', error);
    throw new Error('Document analysis failed');
  }
}
```

#### 3.3.5. Fusion Layer Module

```typescript
// src/lib/analysis/fusion.ts
import { SessionContext } from '../../utils/types';

export function fusionLayer(
  textAnalysis: any | null,
  audioAnalysis: any | null,
  imageAnalysis: any[] | null,
  documentAnalysis: any[] | null,
  sessionContext: SessionContext
): any {
  // Initialize result structure
  const result = {
    emotionalStates: {},
    communicationPatterns: {
      dominantSpeaker: null,
      interruptionCount: 0,
      turnTakingBalance: 0.5,
      listeningQuality: 0.5
    },
    conflictAnalysis: {
      conflictType: '',
      rootCauses: [],
      escalationLevel: 0,
      suggestedApproaches: []
    },
    resolutionProgress: 0,
    contextualFactors: {
      environment: {},
      documentContext: [],
      visualContext: {}
    }
  };
  
  // Combine text analysis (highest weight for emotional and conflict analysis)
  if (textAnalysis) {
    // Merge emotional states
    result.emotionalStates = textAnalysis.emotionalStates || {};
    
    // Merge communication patterns
    if (textAnalysis.communicationPatterns) {
      result.communicationPatterns = {
        ...result.communicationPatterns,
        ...textAnalysis.communicationPatterns
      };
    }
    
    // Merge conflict analysis
    if (textAnalysis.conflictAnalysis) {
      result.conflictAnalysis = {
        ...result.conflictAnalysis,
        ...textAnalysis.conflictAnalysis
      };
    }
  }
  
  // Enhance with audio analysis (voice tone provides important emotional cues)
  if (audioAnalysis) {
    // Enhance emotional states with voice emotion data
    if (audioAnalysis.voiceEmotions) {
      // For each participant, adjust emotional intensity based on voice
      Object.keys(result.emotionalStates).forEach(participantId => {
        const textEmotion = result.emotionalStates[participantId];
        const voiceEmotion = audioAnalysis.voiceEmotions;
        
        // If voice emotion is different from text emotion, it might indicate
        // sarcasm, irony, or hidden emotions
        if (textEmotion.primaryEmotion !== voiceEmotion.primaryEmotion) {
          // Add secondary emotion from voice
          textEmotion.secondaryEmotions = [
            ...textEmotion.secondaryEmotions,
            voiceEmotion.primaryEmotion
          ];
          
          // Adjust confidence based on discrepancy
          textEmotion.confidence = Math.min(
            textEmotion.confidence,
            voiceEmotion.confidence
          );
        } else {
          // If emotions match, increase confidence
          textEmotion.confidence = Math.min(
            1,
            textEmotion.confidence + 0.1
          );
        }
      });
    }
    
    // Enhance communication patterns with speech patterns
    if (audioAnalysis.speechPatterns) {
      result.communicationPatterns.listeningQuality = 
        (result.communicationPatterns.listeningQuality + 
         (1 - audioAnalysis.speechPatterns.hesitations / 10)) / 2;
    }
  }
  
  // Add context from images
  if (imageAnalysis && imageAnalysis.length > 0) {
    // Combine all image analyses
    const combinedImageAnalysis = {
      people: [],
      environment: {},
      visibleText: [],
      overallImpression: []
    };
    
    imageAnalysis.forEach(analysis => {
      if (analysis.people) {
        combinedImageAnalysis.people = [
          ...combinedImageAnalysis.people,
          ...analysis.people
        ];
      }
      
      if (analysis.environment) {
        combinedImageAnalysis.environment = {
          ...combinedImageAnalysis.environment,
          ...analysis.environment
        };
      }
      
      if (analysis.visibleText) {
        combinedImageAnalysis.visibleText.push(analysis.visibleText);
      }
      
      if (analysis.overallImpression) {
        combinedImageAnalysis.overallImpression.push(analysis.overallImpression);
      }
    });
    
    // Add to contextual factors
    result.contextualFactors.visualContext = combinedImageAnalysis;
    
    // Use image analysis to enhance emotional understanding
    if (combinedImageAnalysis.people.length > 0) {
      // For simplicity, assume the first person in the image is the participant
      const personInImage = combinedImageAnalysis.people[0];
      
      // If we have participant IDs, try to match
      if (sessionContext.participantIds.length > 0) {
        const participantId = sessionContext.participantIds[0];
        
        // If we already have emotional state for this participant, enhance it
        if (result.emotionalStates[participantId]) {
          // Add visual emotion as secondary if different
          if (personInImage.emotion && 
              personInImage.emotion !== result.emotionalStates[participantId].primaryEmotion) {
            result.emotionalStates[participantId].secondaryEmotions.push(personInImage.emotion);
          }
        } else {
          // Create new emotional state from image
          result.emotionalStates[participantId] = {
            primaryEmotion: personInImage.emotion || 'neutral',
            secondaryEmotions: [],
            intensity: 0.5,
            confidence: 0.4 // Lower confidence for image-only emotion detection
          };
        }
      }
    }
  }
  
  // Add context from documents
  if (documentAnalysis && documentAnalysis.length > 0) {
    // Extract key points and potential conflict areas from all documents
    const allKeyPoints = [];
    const allConflictAreas = [];
    
    documentAnalysis.forEach(analysis => {
      if (analysis.keyPoints) {
        allKeyPoints.push(...analysis.keyPoints);
      }
      
      if (analysis.potentialConflictAreas) {
        allConflictAreas.push(...analysis.potentialConflictAreas);
      }
    });
    
    // Add to contextual factors
    result.contextualFactors.documentContext = {
      keyPoints: allKeyPoints,
      potentialConflictAreas: allConflictAreas
    };
    
    // Enhance conflict analysis with document insights
    if (allConflictAreas.length > 0) {
      // Add unique root causes from documents
      const existingCauses = new Set(result.conflictAnalysis.rootCauses);
      allConflictAreas.forEach(area => {
        if (!existingCauses.has(area)) {
          result.conflictAnalysis.rootCauses.push(area);
        }
      });
    }
  }
  
  // Calculate resolution progress based on conflict analysis
  if (result.conflictAnalysis.escalationLevel !== undefined) {
    // Simple inverse relationship: higher escalation = lower resolution
    result.resolutionProgress = Math.max(
      0,
      1 - (result.conflictAnalysis.escalationLevel / 5)
    );
  }
  
  return result;
}
```

### 3.4. Response Generation Implementation

#### 3.4.1. Text Response Generator

```typescript
// src/lib/response/text-generator.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SessionContext } from '../../utils/types';

export async function generateTextResponse(
  analysis: any,
  sessionContext: SessionContext,
  genAI: GoogleGenerativeAI
): Promise<string> {
  // Determine appropriate response strategy based on analysis
  const responseStrategy = determineResponseStrategy(analysis);
  
  // Initialize Gemini Pro model
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  // Create prompt based on response strategy
  let prompt = '';
  
  switch (responseStrategy) {
    case 'ask_clarifying_question':
      prompt = createClarifyingQuestionPrompt(analysis, sessionContext);
      break;
    case 'summarize_perspectives':
      prompt = createPerspectiveSummaryPrompt(analysis, sessionContext);
      break;
    case 'suggest_resolution':
      prompt = createResolutionSuggestionPrompt(analysis, sessionContext);
      break;
    case 'acknowledge_emotion':
      prompt = createEmotionalAcknowledgmentPrompt(analysis, sessionContext);
      break;
    case 'redirect_conversation':
      prompt = createRedirectionPrompt(analysis, sessionContext);
      break;
    default:
      prompt = createGenericResponsePrompt(analysis, sessionContext);
  }
  
  // Generate response
  const result = await model.generateContent(prompt);
  return result.response.text();
}

function determineResponseStrategy(analysis: any): string {
  // Determine the most appropriate response strategy based on analysis
  
  // If conflict escalation is high, prioritize emotional acknowledgment
  if (analysis.conflictAnalysis?.escalationLevel > 3) {
    return 'acknowledge_emotion';
  }
  
  // If there are unclear root causes, ask clarifying questions
  if (analysis.conflictAnalysis?.rootCauses?.length === 0 || 
      analysis.conflictAnalysis?.rootCauses?.includes('unclear')) {
    return 'ask_clarifying_question';
  }
  
  // If there are multiple perspectives, summarize them
  if (Object.keys(analysis.emotionalStates || {}).length > 1) {
    return 'summarize_perspectives';
  }
  
  // If resolution progress is high, suggest concrete resolution
  if (analysis.resolutionProgress > 0.7) {
    return 'suggest_resolution';
  }
  
  // If conversation seems stuck, redirect
  if (analysis.communicationPatterns?.turnTakingBalance < 0.3) {
    return 'redirect_conversation';
  }
  
  // Default to generic response
  return 'generic_response';
}

function createClarifyingQuestionPrompt(analysis: any, context: SessionContext): string {
  return `
    You are Udine, an AI mediator helping with a conversation.
    
    Based on the following analysis of the conversation:
    ${JSON.stringify(analysis, null, 2)}
    
    Session context:
    ${JSON.stringify(context, null, 2)}
    
    Generate a thoughtful, empathetic clarifying question to better understand the root causes of the conflict or misunderstanding.
    
    Your response should:
    1. Acknowledge what you've understood so far
    2. Identify a specific area that needs clarification
    3. Ask an open-ended question that encourages elaboration
    4. Use a warm, non-judgmental tone
    
    Respond in first person as Udine, with ONLY the response text (no explanations or JSON).
  `;
}

// Similar functions for other response strategies...

function createGenericResponsePrompt(analysis: any, context: SessionContext): string {
  return `
    You are Udine, an AI mediator helping with a conversation.
    
    Based on the following analysis of the conversation:
    ${JSON.stringify(analysis, null, 2)}
    
    Session context:
    ${JSON.stringify(context, null, 2)}
    
    Generate a thoughtful, empathetic response that acknowledges what has been shared and gently moves the conversation forward.
    
    Your response should:
    1. Acknowledge what you've understood so far
    2. Express empathy for any emotions expressed
    3. Offer a gentle prompt to continue the conversation
    4. Use a warm, supportive tone
    
    Respond in first person as Udine, with ONLY the response text (no explanations or JSON).
  `;
}
```

#### 3.4.2. Emotion to Voice Mapper

```typescript
// src/lib/response/emotion-mapper.ts

export function determineResponseEmotion(analysis: any): string {
  // Determine appropriate emotional tone for response
  
  // Get participant emotions
  const participantEmotions = Object.values(analysis.emotionalStates || {});
  
  // Get conflict level
  const conflictLevel = analysis.conflictAnalysis?.escalationLevel || 0;
  
  // Check for high emotional intensity
  const highIntensityEmotions = participantEmotions.filter(
    (emotion: any) => emotion.intensity > 0.7
  );
  
  if (highIntensityEmotions.length > 0) {
    // If participants are highly emotional, respond with calm, empathetic tone
    return 'empathetic';
  } else if (conflictLevel > 3) {
    // If conflict is escalated but emotions aren't intense, use assertive tone
    return 'assertive';
  } else {
    // Default balanced tone
    return 'neutral';
  }
}

export function getVoiceIdForEmotion(emotion: string): string {
  // Map emotional state to ElevenLabs voice ID
  switch (emotion) {
    case 'empathetic':
      return 'pNInz6obpgDQGcFmaJgB'; // Example voice ID for empathetic tone
    case 'assertive':
      return 'VR6AewLTigWG4xSOukaG'; // Example voice ID for assertive tone
    case 'neutral':
    default:
      return 'EXAVITQu4vr4xnSDxMaL'; // Example voice ID for neutral tone
  }
}

export function getVoiceSettingsForEmotion(emotion: string): any {
  // Map emotional state to ElevenLabs voice settings
  switch (emotion) {
    case 'empathetic':
      return {
        stability: 0.75,
        similarityBoost: 0.6,
        style: 0.3,
        speakingRate: 0.9
      };
    case 'assertive':
      return {
        stability: 0.4,
        similarityBoost: 0.8,
        style: 0.5,
        speakingRate: 1.1
      };
    case 'neutral':
    default:
      return {
        stability: 0.5,
        similarityBoost: 0.75,
        style: 0.0,
        speakingRate: 1.0
      };
  }
}
```

### 3.5. Database Schema

```sql
-- Supabase Database Schema

-- Users table (managed by Supabase Auth)
-- auth.users

-- User profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  session_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Session participants
CREATE TABLE session_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  role TEXT NOT NULL DEFAULT 'participant',
  status TEXT NOT NULL DEFAULT 'pending',
  joined_at TIMESTAMP WITH TIME ZONE,
  left_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- Session messages
CREATE TABLE session_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  emotional_state TEXT,
  audio_url TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session analysis
CREATE TABLE session_analysis (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  analysis_data JSONB NOT NULL
);

-- Media files
CREATE TABLE media_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  session_id UUID REFERENCES sessions(id),
  file_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  bucket TEXT NOT NULL,
  public_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session summaries
CREATE TABLE session_summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES sessions(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES auth.users(id)
);

-- RLS Policies
-- (These would be implemented in Supabase)
```

### 3.6. Hume AI Integration

This section describes how to integrate Hume AI's Expression Measurement for both streaming media and static document analysis into the analysis engine.

#### 3.6.1. File Structure
Add two new modules under `src/lib/analysis`:
```text
src/lib/analysis/humeExpressionWS.ts
src/lib/analysis/humeBatchAnalysis.ts
```

#### 3.6.2. Streaming Media Analysis
Create `humeExpressionWS.ts`:
```typescript
import { HumeClient } from 'hume';
import * as fs from 'fs';

const hume = new HumeClient({ apiKey: process.env.HUME_API_KEY! });

export interface EmotionFrame {
	timestamp: number;
	emotions: Record<string, number>;
}

export async function measureExpressions(filePath: string): Promise<EmotionFrame[]> {
	const socket = hume.expressionMeasurement.connect();
	await socket.tillSocketOpen();

	const data = await fs.promises.readFile(filePath);
	const chunkSize = 64 * 1024; // 64KB
	for (let i = 0; i < data.length; i += chunkSize) {
		const chunk = data.slice(i, i + chunkSize);
		socket.send({ payload: chunk.toString('base64') });
	}
	// signal end
	socket.send({ endOfStream: true });

	const frames: EmotionFrame[] = [];
	for await (const msg of socket) {
		if (msg.type === 'expression_frame') frames.push(msg.data as EmotionFrame);
	}
	return frames;
}
```

#### 3.6.3. Static Document Analysis
Create `humeBatchAnalysis.ts`:
```typescript
import { HumeClient } from 'hume';

const hume = new HumeClient({ apiKey: process.env.HUME_API_KEY! });

export async function analyzeDocumentText(text: string) {
	const job = await hume.expressionMeasurement.batch.startInferenceJob({
		models: { language: {} },
		text: [text],
	});
	await job.awaitCompletion();
	return hume.expressionMeasurement.batch.getJobPredictions(job.jobId);
}
```

#### 3.6.4. Engine Wiring
In `src/lib/analysis/analyze.ts` or equivalent, import and call:
```typescript
import { measureExpressions } from './humeExpressionWS';
import { analyzeDocumentText } from './humeBatchAnalysis';

async function performMultimodalAnalysis(input, context) {
	const [,, humeVoice, humeDoc] = await Promise.all([
		// ... existing
		input.audioFile && measureExpressions(input.audioFile),
		input.documentText && analyzeDocumentText(input.documentText),
	]);
	// pass these into fusion layer
}
```

#### 3.6.5. Configuration
* Ensure `HUME_API_KEY` in `.env`
* Optionally set `HUME_SECRET_KEY` for private endpoints

## 4. Integration with Client Application

### 4.1. React Native API Client

```typescript
// Client-side API client for React Native

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API base URL
const API_URL = 'https://your-netlify-site.netlify.app/api';

// Get auth token
async function getAuthToken() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
}

// API client
export const apiClient = {
  // Analyze input
  async analyze(input) {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(input)
    });
    
    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  // Generate response
  async generateResponse(input) {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_URL}/generate-response`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(input)
    });
    
    if (!response.ok) {
      throw new Error(`Response generation failed: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  // Synthesize voice
  async synthesizeVoice(input) {
    const token = await getAuthToken();
    
    const response = await fetch(`${API_URL}/synthesize-voice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(input)
    });
    
    if (!response.ok) {
      throw new Error(`Voice synthesis failed: ${response.statusText}`);
    }
    
    return response.json();
  },
  
  // Upload file
  async uploadFile(file, sessionId, fileType) {
    const token = await getAuthToken();
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sessionId', sessionId);
    formData.append('fileType', fileType);
    
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error(`File upload failed: ${response.statusText}`);
    }
    
    return response.json();
  }
};
```

### 4.2. React Native Custom Hook

```typescript
// hooks/useAI.ts
import { useState, useCallback } from 'react';
import { apiClient } from '../api/client';

export function useAI() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<any | null>(null);
  
  // Submit user input for analysis and response
  const submitUserInput = useCallback(async (input) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Step 1: Analyze input
      const analysisResult = await apiClient.analyze(input);
      setAnalysis(analysisResult);
      
      // Step 2: Generate response based on analysis
      const responseResult = await apiClient.generateResponse({
        analysis: analysisResult,
        sessionContext: input.sessionContext
      });
      
      // Step 3: Synthesize voice
      const voiceResult = await apiClient.synthesizeVoice({
        text: responseResult.responseText,
        emotionalState: responseResult.emotionalState,
        sessionContext: input.sessionContext
      });
      
      // Return combined result
      return {
        content: responseResult.responseText,
        audioUrl: voiceResult.audioUrl,
        role: 'assistant',
        emotionalState: responseResult.emotionalState
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }, []);
  
  // Update session context
  const updateSessionContext = useCallback(async (sessionContext) => {
    // This would typically update the session context in the client state
    // and potentially sync with the backend
    return sessionContext;
  }, []);
  
  return {
    isProcessing,
    error,
    analysis,
    submitUserInput,
    updateSessionContext
  };
}
```

## 5. Deployment and Environment Setup

### 5.1. Netlify Configuration

#### 5.1.1. Environment Variables

```
# Netlify Environment Variables

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
SUPABASE_ANON_KEY=your-anon-key

# Google Gemini API
GOOGLE_GENAI_API_KEY=your-gemini-api-key

# ElevenLabs
ELEVENLABS_API_KEY=your-elevenlabs-api-key

# Other
NODE_VERSION=18
```

#### 5.1.2. Build Settings

```
# Build command
npm run build

# Publish directory
public

# Functions directory
netlify/functions
```

### 5.2. Supabase Setup

1. Create a new Supabase project
2. Set up database tables according to the schema
3. Configure storage buckets:
   - `audio` - For voice recordings and synthesized speech
   - `images` - For uploaded images
   - `documents` - For uploaded documents
   - `media` - For other media files
4. Configure authentication:
   - Enable email/password authentication
   - Set up OAuth providers if needed
   - Configure email templates
5. Set up Row Level Security (RLS) policies for all tables
6. Generate and save API keys for use in Netlify environment variables

### 5.3. ElevenLabs Setup

1. Create an ElevenLabs account
2. Generate an API key
3. Explore available voices and select appropriate ones for different emotional states
4. Test voice synthesis with different parameters to find optimal settings
5. Save the API key for use in Netlify environment variables

### 5.4. Google Gemini API Setup

1. Create a Google Cloud account if not already available
2. Enable the Gemini API
3. Generate an API key
4. Test the API with different models (Gemini Pro, Gemini Pro Vision)
5. Save the API key for use in Netlify environment variables

## 6. Testing and Validation

### 6.1. Unit Tests

Implement unit tests for each core module:

1. Text analysis
2. Audio analysis
3. Image analysis
4. Document analysis
5. Fusion layer
6. Response generation
7. Voice synthesis

### 6.2. Integration Tests

Test the integration between components:

1. Analysis pipeline (input → analysis → response → voice)
2. File upload and processing
3. Authentication and authorization
4. Database operations

### 6.3. End-to-End Tests

Test complete user flows:

1. User authentication
2. Session creation and configuration
3. Participant invitation and joining
4. Multimodal input processing
5. AI-mediated conversation
6. Session summary generation

### 6.4. Performance Testing

Evaluate system performance:

1. Response time for analysis requests
2. Voice synthesis latency
3. File upload and processing speed
4. Concurrent user handling

## 7. Implementation Timeline

### 7.1. Phase 1: Core Infrastructure (Weeks 1-2)

1. Set up Netlify project and serverless functions
2. Configure Supabase database and storage
3. Implement authentication and user management
4. Create basic API endpoints

### 7.2. Phase 2: Analysis Engine (Weeks 3-4)

1. Implement text analysis with Google Gemini
2. Implement image analysis with Google Gemini Vision
3. Implement document analysis
4. Develop fusion layer for multimodal integration

### 7.3. Phase 3: Response Generation (Weeks 5-6)

1. Implement response strategy determination
2. Create response generation with Google Gemini
3. Develop emotion mapping for voice synthesis
4. Integrate with ElevenLabs for voice output

### 7.4. Phase 4: Client Integration (Weeks 7-8)

1. Develop React Native API client
2. Create custom hooks for AI integration
3. Implement file upload and media handling
4. Build UI components for interaction

### 7.5. Phase 5: Testing and Optimization (Weeks 9-10)

1. Implement comprehensive testing
2. Optimize performance and reduce latency
3. Enhance error handling and fallback mechanisms
4. Implement monitoring and logging

## 8. Conclusion

This implementation plan provides a comprehensive roadmap for developing the multimodal LLM analysis engine for the "Understand.me" application. By leveraging Netlify serverless functions, Supabase, Google Gemini API, and ElevenLabs, we can create a sophisticated AI mediator capable of understanding and responding to various forms of input with natural, emotionally appropriate voice synthesis.

The modular architecture allows for flexibility and scalability, while the integration with React Native ensures a seamless cross-platform experience. The detailed specifications and code examples provide a solid foundation for implementation, enabling developers to build a robust and effective analysis engine that powers the core functionality of the application.