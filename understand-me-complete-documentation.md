# Understand.me: Complete Platform Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [UX/UI Design Specifications](#uxui-design-specifications)
3. [Technical Architecture](#technical-architecture)
4. [Implementation Roadmap](#implementation-roadmap)
5. [Team Structure & Resources](#team-structure--resources)

---

## Project Overview

**Understand.me** is an AI-mediated conflict resolution Progressive Web Application (PWA) that helps users navigate interpersonal disputes through structured, AI-guided sessions. The platform supports both individual coaching and joint mediation sessions, with a unique focus on same-device interactions for intimate conflicts.

### Core Vision & Value Proposition

- **Primary Goal**: Provide accessible, AI-mediated conflict resolution that fosters understanding and promotes personal growth
- **Target Users**: Individuals seeking structured conflict resolution (couples, family members, colleagues, friends)
- **Platform Type**: Progressive Web Application (PWA) with offline capabilities
- **Key Differentiator**: Dynamic AI adaptation based on personality assessment and real-time emotional analysis

### Key Features

#### Core Functionality
- **AI-Powered Conflict Analysis**: Google GenAI SDK for intelligent conflict understanding
- **Voice Integration**: ElevenLabs API for natural voice interactions
- **Five-Phase Mediation**: Structured approach (Prepare, Express, Understand, Resolve, Heal)
- **Same-Device Sessions**: Unique shared-screen experience for intimate conflicts
- **Real-time Communication**: WebSocket-based live sessions
- **Personality Assessment**: Comprehensive user profiling for personalized mediation

#### Advanced Features
- **Emotional State Tracking**: Real-time emotion detection and adaptation
- **Growth Analytics**: Personal development insights and achievement tracking
- **Multi-Participant Sessions**: Support for complex group conflicts
- **Privacy-First Design**: End-to-end encryption and data minimization
- **Accessibility Compliance**: WCAG 2.1 AA standards with voice alternatives

---

## UX/UI Design Specifications

### User Personas & Key Journeys

#### Primary Personas

1. **The Host** - Initiates conflict resolution sessions
   - Needs clear guidance on describing issues effectively
   - Wants control over session configuration and participant management
   - Seeks assurance that AI can analyze problems competently

2. **The Participant** - Joins sessions initiated by others
   - Needs clear context about the issue and session format
   - Wants transparency about the mediation process
   - Requires control over privacy settings and fair treatment

3. **The Individual User** - Uses platform for self-reflection and coaching
   - Seeks personal growth and conflict prevention insights
   - Wants private, judgment-free environment for exploration

### Core User Flows & Screen Requirements

#### 1. Discovery & Authentication Flow

##### Landing Page
- **Purpose**: Introduce platform value proposition and build trust
- **Key Elements**:
  - Clear headline explaining AI-mediated conflict resolution
  - Trust indicators (testimonials, privacy statements, AI explanation)
  - Primary CTA: "Start Resolving Conflicts" / "Get Started"
  - Secondary CTA: "Learn More" / "How It Works"
- **Design Considerations**: Clean, calming color palette; professional yet approachable tone

##### Sign-Up/Login Screen
- **Authentication Options**:
  - Email/password registration
  - Social login options (Google, Apple)
  - "Lazy registration" option to explore before full commitment
- **Required Fields**: Name, Email, Username, Password
- **Optional Fields**: Location, Gender (for personalization)
- **Design Pattern**: Progressive disclosure, minimal friction

#### 2. AI-Powered Onboarding Flow

##### Personality Assessment Screen
- **Format**: 15-20 interactive questions
- **Categories**:
  - Communication style preferences
  - Conflict resolution approach
  - Values and behavioral patterns
  - Emotional processing style
- **UI Pattern**: Card-based interface with progress indicator
- **Interaction**: Swipe/tap to answer, visual feedback for selections

##### Platform Tutorial
- **Content**: Interactive walkthrough of key features
- **Format**: Guided tour with tooltips and highlights
- **Personalization**: Adapt based on personality assessment results
- **Completion**: Achievement badge for finishing onboarding

#### 3. Main Dashboard

##### Dashboard Layout
- **Primary Actions**:
  - "Start New Session" (prominent CTA)
  - "Join Session" (session code input)
  - "View Session History"
  - "Personal Growth" tab
- **Status Indicators**:
  - Pending invitations
  - Scheduled follow-ups
  - Achievement badges
- **Quick Access**: Recent sessions, recommended resources

#### 4. Host Flow Screens

##### Conflict Description Interface
- **Input Methods**:
  - Text input with guided prompts
  - Voice input option (future enhancement)
  - Structured form with categories
- **AI Assistance**: Real-time suggestions and clarifying questions
- **Privacy Controls**: Visibility settings for sensitive information

##### AI Problem Analysis Review
- **Display**: AI-generated summary of the conflict
- **Interaction**: Edit/refine summary before proceeding
- **Validation**: Confirm accuracy and completeness
- **Visual Design**: Clear typography hierarchy, easy scanning

##### Session Configuration
- **Session Types**:
  - Joint Session (multiple participants)
  - Same-Device Session (shared screen)
  - Individual Session (coaching mode)
- **Settings**:
  - Duration preferences
  - Privacy levels
  - Notification preferences
- **Participant Management**: Add/remove participants, set roles

#### 5. Session Interface Design

##### Same-Device Session UI
- **Critical Requirements**:
  - **Tap-to-Talk Interface**: Clear visual indication of active speaker
  - **User Identification**: Color-coded avatars/bubbles for each participant
  - **Turn Management**: Visual cues for whose turn to speak
  - **Input Switching**: Seamless transition between participants
- **Visual Design**:
  - Split-screen or alternating layouts
  - High contrast for clear user distinction
  - Large touch targets for easy interaction

##### Five-Phase Mediation Interface
1. **Prepare Phase**: Goal setting and rule establishment
2. **Express Phase**: Structured sharing with AI moderation
3. **Understand Phase**: AI-guided perspective exploration
4. **Resolve Phase**: Solution brainstorming and agreement building
5. **Heal Phase**: Relationship repair and future planning

**Design Elements**:
- Phase progress indicator
- AI mediator avatar/presence
- Achievement badges for phase completion
- Emotional state indicators (optional)

### Design System Specifications

#### Color Palette
```
Calming Blues:
- Primary Blue: #2563EB (Trust, stability)
- Light Blue: #DBEAFE (Background, calm)
- Dark Blue: #1E40AF (Text, authority)

Peaceful Greens:
- Primary Green: #059669 (Growth, harmony)
- Light Green: #D1FAE5 (Success states)
- Dark Green: #047857 (Confirmation actions)

Warm Neutrals:
- Warm Gray: #6B7280 (Secondary text)
- Light Gray: #F9FAFB (Backgrounds)
- Dark Gray: #374151 (Primary text)

Accent Colors:
- Warm Orange: #F59E0B (Positive actions, achievements)
- Soft Yellow: #FEF3C7 (Highlights, notifications)
- Muted Red: #DC2626 (Alerts, urgent actions)
```

#### Typography System
```
Primary Font: Inter (Web-safe, highly legible)
- Headings: Inter, 600-700 weight
- Body: Inter, 400-500 weight
- Captions: Inter, 400 weight

Font Sizes (Mobile-first):
- H1: 24px / 1.5rem (32px desktop)
- H2: 20px / 1.25rem (28px desktop)
- H3: 18px / 1.125rem (24px desktop)
- Body: 16px / 1rem (16px desktop)
- Small: 14px / 0.875rem (14px desktop)
- Caption: 12px / 0.75rem (12px desktop)
```

### Component Library Requirements

#### Core Components

1. **AI Chat Interface**
   - Message bubbles with AI/user distinction
   - Typing indicators
   - Voice input controls
   - Emoji/reaction support

2. **Progress Indicators**
   - Session phase tracker
   - Assessment completion
   - Goal achievement meters

3. **User Identification System**
   - Avatar selection/customization
   - Color-coding for multi-user scenarios
   - Role indicators (Host/Participant)

4. **Voice Interface Components**
   - Recording controls with visual feedback
   - Audio playback controls
   - Quality indicators
   - Fallback text alternatives

### Accessibility & PWA Considerations

#### Accessibility Requirements
- **WCAG 2.1 AA Compliance**: Color contrast, keyboard navigation, screen reader support
- **Voice Interface**: Alternative input methods for accessibility
- **Text Scaling**: Support for user font size preferences
- **Motor Accessibility**: Large touch targets, gesture alternatives

#### PWA Features
- **Offline Capability**: Core functionality available without internet
- **App-like Experience**: Full-screen mode, splash screen
- **Push Notifications**: Session reminders, invitation alerts
- **Installation**: Add to home screen functionality

---

## Technical Architecture

### Technology Stack

#### Frontend
- **Framework**: Next.js 14+ with TypeScript
- **UI Library**: React 18+ with Tailwind CSS
- **State Management**: Zustand or Redux Toolkit
- **PWA Features**: Workbox for service workers and caching
- **Real-time**: Socket.io client for live sessions
- **Voice**: Web Speech API + ElevenLabs integration

#### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Next.js API routes or Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js or Auth0
- **Real-time**: Socket.io server
- **File Storage**: AWS S3 or Cloudinary for audio files

#### AI & Voice Services
- **LLM**: Google Generative AI SDK (@google/generative-ai)
- **Voice Synthesis**: ElevenLabs API
- **Speech-to-Text**: Web Speech API (primary) + Google Speech-to-Text (fallback)
- **NLP**: Google Cloud Natural Language API (sentiment analysis)

### Core Architecture Components

#### 1. AI Decision Engine

##### Google GenAI Integration
```typescript
interface AIDecisionEngine {
  analyzeConflict(description: string, context: UserContext): Promise<ConflictAnalysis>
  generateMediationStrategy(participants: Participant[], conflictType: string): Promise<MediationPlan>
  adaptSessionFlow(currentPhase: SessionPhase, emotionalState: EmotionalContext): Promise<NextAction>
  generateResponse(userInput: string, sessionContext: SessionContext): Promise<AIResponse>
}

interface SessionContext {
  sessionId: string
  currentPhase: 'prepare' | 'express' | 'understand' | 'resolve' | 'heal'
  participants: Participant[]
  conflictSummary: string
  emotionalStates: EmotionalState[]
  previousInteractions: Interaction[]
  personalityProfiles: PersonalityProfile[]
}
```

#### 2. Voice Integration (ElevenLabs)

##### Voice Service Architecture
```typescript
interface VoiceService {
  synthesizeSpeech(text: string, voiceId: string): Promise<AudioBuffer>
  transcribeSpeech(audioBlob: Blob): Promise<string>
  getAvailableVoices(): Promise<Voice[]>
  cloneVoice(audioSamples: Blob[]): Promise<string>
}

interface VoiceConfig {
  voiceId: string
  stability: number
  similarityBoost: number
  style: number
  speakingRate: number
}
```

#### 3. Database Schema (Prisma)

```prisma
model User {
  id                String              @id @default(cuid())
  email             String              @unique
  username          String              @unique
  name              String
  personalityProfile PersonalityProfile?
  hostedSessions    Session[]           @relation("HostedSessions")
  participatedSessions SessionParticipant[]
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
}

model Session {
  id                String              @id @default(cuid())
  hostId            String
  host              User                @relation("HostedSessions", fields: [hostId], references: [id])
  title             String
  description       String
  conflictSummary   String?
  sessionType       SessionType
  status            SessionStatus
  currentPhase      SessionPhase?
  participants      SessionParticipant[]
  messages          SessionMessage[]
  aiAnalysis        Json?
  actionPlan        String?
  createdAt         DateTime            @default(now())
  updatedAt         DateTime            @updatedAt
  completedAt       DateTime?
}

enum SessionType {
  JOINT
  SAME_DEVICE
  INDIVIDUAL
}

enum SessionPhase {
  PREPARE
  EXPRESS
  UNDERSTAND
  RESOLVE
  HEAL
}
```

#### 4. Real-time Communication System

##### WebSocket Architecture
```typescript
interface SocketEvents {
  'session:join': (sessionId: string, userId: string) => void
  'session:message': (message: SessionMessage) => void
  'session:phase-change': (newPhase: SessionPhase) => void
  'session:user-typing': (userId: string, isTyping: boolean) => void
  'session:emotional-state': (userId: string, state: EmotionalState) => void
  'session:ai-processing': (isProcessing: boolean) => void
}
```

### Security & Privacy Architecture

#### Data Protection
- **Encryption**: AES-256 encryption for sensitive data at rest
- **Transport Security**: TLS 1.3 for all API communications
- **Authentication**: JWT tokens with refresh token rotation
- **Authorization**: Role-based access control (RBAC)
- **Data Retention**: Configurable retention policies for session data

#### Privacy Controls
- **Anonymization**: Option to anonymize session data after completion
- **Consent Management**: Granular consent for data usage and AI training
- **Right to Deletion**: Complete data removal on user request
- **Audit Logging**: Comprehensive logs for compliance and debugging

---

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-8)
- **Database Setup**: Prisma schema, migrations, seed data
- **Authentication System**: NextAuth with email/password + social login
- **Basic AI Integration**: Google GenAI for conflict analysis
- **Frontend Core**: Next.js setup, design system, responsive layout
- **API Foundation**: Core API routes and session management

### Phase 2: Core Mediation (Weeks 9-16)
- **Advanced AI Capabilities**: Personality assessment, emotion detection
- **Five-Phase Mediation**: Complete mediation engine implementation
- **Real-time Communication**: Socket.io for live sessions
- **Session Management**: Multi-participant support, invitations, history

### Phase 3: Voice Integration (Weeks 17-24)
- **ElevenLabs Integration**: Text-to-speech and voice synthesis
- **Audio Processing**: Real-time audio analysis and quality monitoring
- **Voice UI**: Recording interface, playback controls, accessibility
- **Speech Recognition**: Web Speech API integration with fallbacks

### Phase 4: Advanced Features (Weeks 25-32)
- **Same-Device Sessions**: Tap-to-talk interface and user switching
- **Growth & Analytics**: Personal insights, achievement system
- **Advanced AI**: Cultural adaptation, personality matching
- **Privacy & Security**: End-to-end encryption, consent management

### Phase 5: Production & Scale (Weeks 33-40)
- **Performance Optimization**: Caching, load balancing, database optimization
- **Monitoring & Observability**: Error tracking, performance monitoring
- **Production Deployment**: CI/CD pipeline, environment management
- **Quality Assurance**: Comprehensive testing, load testing, security testing

---

## Team Structure & Resources

### Core Team Roles

#### Technical Leadership
- **Tech Lead**: Architecture decisions, code review, technical mentoring
- **Skills**: Full-stack development, system design, team leadership

#### Development Team
- **Frontend Developers (2)**: React/Next.js, UI components, responsive design
- **Backend Developers (2)**: API development, database design, real-time features
- **AI/ML Specialist**: AI model integration, prompt engineering, bias detection
- **DevOps Engineer**: Infrastructure, CI/CD, monitoring, security

#### Quality Assurance
- **QA Engineer**: Test strategy, automated testing, performance testing
- **Skills**: Playwright, Jest, load testing, security testing

### Success Metrics & KPIs

#### Technical Performance
- **Response Time**: API responses < 200ms (95th percentile)
- **Uptime**: 99.9% availability
- **AI Performance**: Response quality > 4.0/5.0, accuracy > 85%
- **Voice Performance**: Transcription accuracy > 95%, synthesis quality > 4.0/5.0

#### User Experience
- **Session Completion**: > 80% completion rate
- **User Satisfaction**: > 4.2/5.0 overall satisfaction
- **Time to Value**: First successful session < 15 minutes
- **Return Rate**: > 60% return within 30 days

---

## Detailed Implementation Examples

### ElevenLabs Voice Integration Implementation

```typescript
import { ElevenLabsAPI } from 'elevenlabs-api'

class ElevenLabsService {
  private client: ElevenLabsAPI
  private defaultVoiceId = 'pNInz6obpgDQGcFmaJgB' // Adam voice

  constructor(apiKey: string) {
    this.client = new ElevenLabsAPI({ apiKey })
  }

  async synthesizeSpeech(
    text: string,
    voiceConfig: VoiceConfig = this.getDefaultConfig()
  ): Promise<ArrayBuffer> {
    try {
      const audio = await this.client.textToSpeech(voiceConfig.voiceId, {
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: voiceConfig.stability,
          similarity_boost: voiceConfig.similarityBoost,
          style: voiceConfig.style,
          use_speaker_boost: true
        }
      })

      return audio
    } catch (error) {
      console.error('ElevenLabs synthesis error:', error)
      throw new Error('Voice synthesis failed')
    }
  }

  async synthesizeSpeechWithEmotion(
    text: string,
    baseVoiceId: string,
    emotionalState: EmotionalState
  ): Promise<AudioBuffer> {
    const voiceSettings = this.mapEmotionToVoiceSettings(emotionalState)

    const audio = await this.client.textToSpeech(baseVoiceId, {
      text: this.preprocessTextForEmotion(text, emotionalState),
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: voiceSettings.stability,
        similarity_boost: voiceSettings.similarityBoost,
        style: voiceSettings.style,
        use_speaker_boost: true
      }
    })

    return await this.enhanceAudioEmotion(audio, emotionalState)
  }

  private mapEmotionToVoiceSettings(emotion: EmotionalState): VoiceSettings {
    const { valence, arousal, dominance } = emotion

    return {
      stability: Math.max(0.1, Math.min(0.9, 0.5 + (dominance - 0.5) * 0.4)),
      similarityBoost: Math.max(0.1, Math.min(0.9, 0.75 + (valence - 0.5) * 0.2)),
      style: Math.max(0.1, Math.min(0.9, arousal * 0.8))
    }
  }
}
```

### Google GenAI Decision Engine Implementation

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai'

class ConflictResolutionAI {
  private genAI: GoogleGenerativeAI
  private model: any

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
  }

  async analyzeConflict(description: string, userContext: UserContext): Promise<ConflictAnalysis> {
    const prompt = this.buildConflictAnalysisPrompt(description, userContext)

    const result = await this.model.generateContent(prompt)
    const response = result.response.text()

    return this.parseConflictAnalysis(response)
  }

  async generateMediationResponse(
    userInput: string,
    sessionContext: SessionContext
  ): Promise<MediationResponse> {
    const prompt = this.buildMediationPrompt(userInput, sessionContext)

    const result = await this.model.generateContent(prompt)
    const response = result.response.text()

    return {
      text: response,
      emotionalTone: await this.analyzeEmotionalTone(response),
      suggestedActions: await this.extractActions(response),
      phaseRecommendation: this.assessPhaseTransition(sessionContext, response)
    }
  }

  private buildConflictAnalysisPrompt(description: string, context: UserContext): string {
    return `
      As an expert conflict resolution mediator, analyze this conflict:

      Conflict Description: "${description}"

      User Context:
      - Communication Style: ${context.personalityProfile?.communicationStyle}
      - Previous Conflicts: ${context.conflictHistory?.length || 0}
      - Emotional State: ${context.currentEmotionalState}

      Provide analysis in this JSON format:
      {
        "conflictType": "relationship|workplace|family|friendship|other",
        "severity": "low|medium|high|critical",
        "emotionalIntensity": 1-10,
        "keyIssues": ["issue1", "issue2"],
        "suggestedApproach": "facilitative|evaluative|transformative",
        "estimatedSessions": number,
        "riskFactors": ["factor1", "factor2"],
        "strengths": ["strength1", "strength2"]
      }
    `
  }

  private buildMediationPrompt(input: string, context: SessionContext): string {
    return `
      You are an AI mediator in a ${context.currentPhase} phase of conflict resolution.

      Current Context:
      - Session Phase: ${context.currentPhase}
      - Participants: ${context.participants.length}
      - Conflict Type: ${context.conflictSummary}
      - Previous Messages: ${context.previousInteractions.slice(-3).map(i => i.content).join('; ')}

      User Input: "${input}"

      Respond as a skilled mediator would, considering:
      1. The current phase objectives
      2. Emotional states of participants
      3. Progress toward resolution
      4. Need for phase transition

      Keep responses empathetic, neutral, and constructive. Length: 1-3 sentences.
    `
  }
}
```

### Real-time Session Management

```typescript
class AdvancedSocketManager {
  private io: Server
  private sessionStates: Map<string, SessionState>
  private aiProcessor: ConflictResolutionAI
  private emotionTracker: EmotionalStateTracker

  constructor(server: any) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"]
      },
      transports: ['websocket', 'polling']
    })

    this.setupAdvancedEventHandlers()
  }

  private setupAdvancedEventHandlers() {
    this.io.on('connection', (socket) => {
      socket.on('session:join-enhanced', async (data) => {
        await this.handleEnhancedSessionJoin(socket, data)
      })

      socket.on('message:send-advanced', async (data) => {
        await this.handleAdvancedMessage(socket, data)
      })

      socket.on('emotion:update', async (data) => {
        await this.handleEmotionalStateUpdate(socket, data)
      })

      socket.on('ai:request-intervention', async (data) => {
        await this.handleAIIntervention(socket, data)
      })
    })
  }

  private async handleAdvancedMessage(
    socket: Socket,
    data: AdvancedMessageData
  ) {
    const { sessionId, userId, content, type, emotionalContext } = data

    // Process message through AI pipeline
    const aiAnalysis = await this.aiProcessor.analyzeMessage(content, {
      sessionId,
      userId,
      emotionalContext
    })

    // Update session state
    const sessionState = this.sessionStates.get(sessionId)
    if (sessionState) {
      sessionState.messages.push({
        id: generateId(),
        userId,
        content,
        type,
        emotionalAnalysis: aiAnalysis.emotionalAnalysis,
        timestamp: new Date()
      })

      // Check if AI intervention is needed
      if (aiAnalysis.interventionRecommended) {
        const aiResponse = await this.generateAIIntervention(sessionState, aiAnalysis)

        this.io.to(sessionId).emit('ai:intervention', {
          response: aiResponse,
          reason: aiAnalysis.interventionReason,
          urgency: aiAnalysis.urgencyLevel
        })
      }

      // Broadcast message to all participants
      this.io.to(sessionId).emit('message:received', {
        message: {
          id: generateId(),
          userId,
          content,
          type,
          timestamp: new Date()
        },
        sessionState: this.sanitizeSessionState(sessionState),
        emotionalClimate: sessionState.emotionalClimate
      })
    }
  }
}
```

## Testing Strategy

### AI Model Testing Framework

```typescript
class AIModelTester {
  private testDatasets: Map<string, TestDataset>
  private benchmarkScenarios: ConflictScenario[]

  async testConflictAnalysisAccuracy(): Promise<TestResults> {
    const testCases = this.testDatasets.get('conflict-analysis')
    const results: TestResult[] = []

    for (const testCase of testCases.cases) {
      const aiAnalysis = await this.aiProcessor.analyzeConflict(
        testCase.input.description,
        testCase.input.context
      )

      const accuracy = this.calculateAccuracy(aiAnalysis, testCase.expectedOutput)

      results.push({
        testId: testCase.id,
        accuracy,
        latency: aiAnalysis.processingTime,
        confidence: aiAnalysis.confidence,
        passed: accuracy >= 0.8
      })
    }

    return {
      overallAccuracy: this.calculateOverallAccuracy(results),
      passRate: results.filter(r => r.passed).length / results.length,
      averageLatency: this.calculateAverageLatency(results),
      detailedResults: results
    }
  }

  async testBiasDetection(): Promise<BiasTestResults> {
    const biasTestCases = [
      ...this.generateGenderBiasTests(),
      ...this.generateCulturalBiasTests(),
      ...this.generateAgeBiasTests()
    ]

    const results: BiasTestResult[] = []

    for (const testCase of biasTestCases) {
      const response1 = await this.aiProcessor.generateResponse(
        testCase.scenario1,
        testCase.context
      )

      const response2 = await this.aiProcessor.generateResponse(
        testCase.scenario2,
        testCase.context
      )

      const biasScore = this.calculateBiasScore(response1, response2, testCase.type)

      results.push({
        testId: testCase.id,
        biasType: testCase.type,
        biasScore,
        acceptable: biasScore < 0.2,
        scenario1: testCase.scenario1,
        scenario2: testCase.scenario2,
        response1: response1.text,
        response2: response2.text
      })
    }

    return {
      overallBiasScore: this.calculateOverallBias(results),
      biasBreakdown: this.groupBiasByType(results),
      failedTests: results.filter(r => !r.acceptable),
      recommendations: this.generateBiasRecommendations(results)
    }
  }
}
```

## Deployment Configuration

### Docker Configuration

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: understand-me-app
  labels:
    app: understand-me
spec:
  replicas: 3
  selector:
    matchLabels:
      app: understand-me
  template:
    metadata:
      labels:
        app: understand-me
    spec:
      containers:
      - name: app
        image: understand-me:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        - name: GOOGLE_AI_API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: google-ai-key
        - name: ELEVENLABS_API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: elevenlabs-key
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
```

This comprehensive documentation provides everything needed to build the Understand.me platform, from detailed design specifications to complete technical implementation guides. The documentation is structured to support both immediate development needs and long-term platform evolution.
