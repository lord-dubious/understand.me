# Understand.me - Product Requirements Document (PRD)

## 1. Executive Summary

### 1.1. Product Vision
"Understand.me" is an AI-mediated communication platform that helps users navigate difficult conversations and resolve conflicts through structured, emotionally intelligent dialogue. The platform features "Udine," an AI voice agent that facilitates understanding between participants using advanced emotional intelligence and natural turn-taking conversation.

### 1.2. Simplified Architecture
**Development Environment**: bolt.new optimized
**Deployment**: Netlify free tier
**Frontend**: Expo (React Native) - Mobile + Web
**Backend**: Express.js/Node.js (traditional server, not serverless)
**Database**: PostgreSQL (via Netlify-compatible provider)
**AI Orchestration**: LangChain JS with LangGraph agents
**Voice Agent**: Udine (ElevenLabs turn-taking AI)
**Emotional Intelligence**: Hume AI integration

### 1.3. Core AI Stack
- **Google GenAI 1.5.0**: Primary LLM for conversation analysis and response generation
- **LangChain JS**: AI orchestration with community plugins for workflow management
- **Hume AI**: Emotional intelligence analysis and real-time emotion detection
- **ElevenLabs**: Turn-taking conversational AI with Udine voice personality

### 1.4. Key Differentiators
- **Turn-taking AI conversations** that feel natural and responsive
- **Real-time emotional intelligence** analysis and adaptation
- **Cross-platform compatibility** (mobile and web from single codebase)
- **Simplified architecture** optimized for rapid development and deployment

## 2. Technical Architecture

### 2.1. System Overview
```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                      │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Mobile App    │  │    Web App      │  │   Admin     │  │
│  │   (Expo)        │  │   (Expo Web)    │  │   Panel     │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Express.js Backend                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   API Routes    │  │   Auth Service  │  │  WebSocket  │  │
│  │                 │  │                 │  │   Server    │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      AI Services                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   LangChain JS  │  │   Google GenAI  │  │   Hume AI   │  │
│  │  (Orchestration)│  │     (LLM)       │  │ (Emotions)  │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │   ElevenLabs    │  │   PostgreSQL    │                   │
│  │ (Voice/Udine)   │  │   (Database)    │                   │
│  └─────────────────┘  └─────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### 2.2. ElevenLabs Integration
Following the [Expo + ElevenLabs guide](https://expo.dev/blog/how-to-build-universal-app-voice-agents-with-expo-and-elevenlabs), the integration provides:

**Turn-Taking Conversation:**
- Natural conversation flow with automatic turn detection
- Real-time voice processing and response generation
- Seamless integration with Expo's audio capabilities

**Udine Voice Agent:**
- Single, consistent voice personality across all interactions
- Emotional tone adaptation based on Hume AI analysis
- Context-aware responses powered by LangChain JS orchestration

### 2.3. Data Flow Architecture
```
User Voice Input → ElevenLabs → LangChain JS → Google GenAI
                                     ↓
Hume AI (Emotion) ← Express.js API ← Response Generation
                                     ↓
PostgreSQL ← Session Storage → WebSocket → Client Update
```

## 3. Core Features & User Stories

### 3.1. User Authentication & Profiles
**As a user, I want to:**
- Sign up with email/password or social login
- Create a personality profile through guided assessment
- Manage my privacy settings and data preferences
- Access my conversation history and insights

### 3.2. AI Voice Agent (Udine)
**As a user, I want to:**
- Have natural turn-taking conversations with Udine
- Receive emotionally appropriate responses based on my current state
- Get real-time guidance during difficult conversations
- Feel heard and understood by the AI mediator

### 3.3. Session Management
**As a host, I want to:**
- Create new conversation sessions with clear objectives
- Invite participants via email or shareable links
- Configure session settings (privacy, recording, etc.)
- Monitor participant responses and session status

**As a participant, I want to:**
- Join sessions easily with invitation codes/links
- Understand the session context before participating
- Control my privacy settings within sessions
- Provide feedback on the mediation process

### 3.4. Five-Phase Conversation Flow
**Phase 1: Prepare**
- Udine helps participants articulate their perspectives
- Emotional state assessment via Hume AI
- Context gathering and goal setting

**Phase 2: Express**
- Structured sharing of viewpoints
- Active listening facilitation by Udine
- Real-time emotional monitoring and adaptation

**Phase 3: Understand**
- Perspective-taking exercises guided by AI
- Clarification of underlying needs and concerns
- Empathy building through structured dialogue

**Phase 4: Resolve**
- Collaborative solution generation
- Option evaluation with AI assistance
- Agreement drafting and refinement

**Phase 5: Heal**
- Relationship repair and future planning
- Commitment establishment
- Follow-up scheduling and accountability

### 3.5. Emotional Intelligence Integration
**Hume AI Integration:**
- Real-time emotion detection from voice and text
- Emotional state tracking throughout conversations
- Adaptive response generation based on emotional context
- Emotional insights and patterns for personal growth

## 4. Technical Implementation

### 4.1. Frontend Development (Expo)
**Mobile & Web Application:**
```typescript
// Core dependencies for Understand.me
"expo": "~51.0.0",
"react-native": "0.74.0",
"@elevenlabs/react": "^0.8.0",        // Latest React SDK with turn-taking
"@elevenlabs/client": "^0.8.0",       // Core ElevenLabs client
"@google/genai": "^1.5.0",            // Google GenAI 1.5.0 (correct package)
"@langchain/core": "^0.3.0",          // LangChain core abstractions
"@langchain/community": "^0.3.0",     // Community integrations
"@langchain/google-genai": "^0.1.0",  // Google GenAI LangChain integration
"@langchain/langgraph": "^0.2.0",     // Agent orchestration and state
"hume": "^0.9.0",                     // Hume AI emotional intelligence
"zustand": "^4.5.5",                  // State management
"zod": "^3.23.8"                      // Schema validation
```

**Key Components:**
- ElevenLabs turn-taking conversation components
- Real-time emotional state visualization from Hume AI
- LangGraph agent orchestration interface
- Cross-platform navigation with Zustand state management
- Voice interaction UI with conversation flow indicators

### 4.2. Backend Development (Express.js)
**Server Architecture:**
```javascript
// Core Express.js setup with correct packages
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/genai');
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { createReactAgent } = require('@langchain/langgraph/prebuilt');
const { MemorySaver } = require('@langchain/langgraph');
const { HumeClient } = require('hume');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/emotions', emotionRoutes);
app.use('/api/ai', aiOrchestrationRoutes);
```

**Database Schema (PostgreSQL):**
```sql
-- Users and authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  profile JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Conversation sessions
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'pending',
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Session participants
CREATE TABLE participants (
  session_id UUID REFERENCES sessions(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR DEFAULT 'participant',
  status VARCHAR DEFAULT 'invited',
  PRIMARY KEY (session_id, user_id)
);

-- Conversation messages and analysis
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id),
  user_id UUID REFERENCES users(id),
  content TEXT,
  emotion_data JSONB,
  ai_analysis JSONB,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

### 4.3. AI Service Integration
**LangChain JS Orchestration:**
```javascript
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumeClient } from "hume";

class ConversationOrchestrator {
  constructor() {
    this.llm = new ChatGoogleGenerativeAI({
      modelName: "gemini-1.5-pro",
      apiKey: process.env.GOOGLE_GENAI_API_KEY
    });
    this.hume = new HumeClient({
      apiKey: process.env.HUME_API_KEY
    });
  }

  async processConversationTurn(userInput, sessionContext) {
    // 1. Analyze emotions with Hume AI
    const emotions = await this.hume.expressionMeasurement
      .batch.startInferenceJob({
        text: [userInput]
      });

    // 2. Generate contextual response with Google GenAI
    const response = await this.llm.invoke([
      { role: "system", content: this.buildSystemPrompt(sessionContext, emotions) },
      { role: "user", content: userInput }
    ]);

    // 3. Return structured response for ElevenLabs
    return {
      text: response.content,
      emotions: emotions,
      voiceSettings: this.adaptVoiceToEmotion(emotions)
    };
  }
}
```

## 5. Development Workflow for bolt.new

### 5.1. Project Structure
```
understand-me/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Main application screens
│   ├── services/           # API and external service integrations
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   └── types/              # TypeScript type definitions
├── server/
│   ├── routes/             # Express.js API routes
│   ├── middleware/         # Custom middleware
│   ├── services/           # Backend business logic
│   └── database/           # Database schemas and migrations
├── docs/                   # Documentation
└── package.json
```

### 5.2. Environment Variables
```bash
# AI Services
GOOGLE_GENAI_API_KEY=your_google_genai_key
ELEVENLABS_API_KEY=your_elevenlabs_key
HUME_API_KEY=your_hume_api_key

# Database
DATABASE_URL=postgresql://user:pass@host:port/dbname

# Authentication
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Application
NODE_ENV=development
PORT=3000
```

### 5.3. Development Commands
```bash
# Install dependencies
npm install

# Start development server (backend)
npm run dev:server

# Start Expo development (frontend)
npm run dev:expo

# Run both concurrently
npm run dev

# Build for production
npm run build

# Deploy to Netlify
npm run deploy
```

## 6. Deployment on Netlify

### 6.1. Netlify Configuration
**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[functions]
  directory = "server"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 6.2. Database Options for Netlify
**Recommended: Neon PostgreSQL**
- Free tier available
- Serverless PostgreSQL
- Easy integration with Netlify
- Automatic scaling

**Alternative: Supabase**
- PostgreSQL with additional features
- Built-in authentication
- Real-time subscriptions
- Free tier available

## 7. Success Metrics & KPIs

### 7.1. User Engagement
- Session completion rate (target: >80%)
- User retention (7-day, 30-day)
- Average session duration
- Repeat usage frequency

### 7.2. AI Performance
- Conversation quality ratings
- Emotional accuracy (Hume AI)
- Response relevance scores
- Turn-taking effectiveness

### 7.3. Technical Performance
- API response times (<500ms)
- Voice processing latency (<2s)
- System uptime (>99.5%)
- Error rates (<1%)

## 8. Next Steps

### 8.1. Immediate Actions
1. Set up bolt.new development environment
2. Create basic Express.js server structure
3. Implement ElevenLabs integration following Expo guide
4. Set up PostgreSQL database schema
5. Create basic Expo app with voice components

### 8.2. Development Phases
**Phase 1 (Weeks 1-2): Foundation**
- Basic authentication system
- Database setup and migrations
- ElevenLabs voice integration
- Simple conversation flow

**Phase 2 (Weeks 3-4): AI Integration**
- Google GenAI integration
- LangChain JS orchestration
- Hume AI emotional analysis
- Five-phase conversation logic

**Phase 3 (Weeks 5-6): Polish & Deploy**
- UI/UX refinements
- Testing and optimization
- Netlify deployment setup
- Documentation completion

This PRD provides a clear, actionable roadmap for developing Understand.me with a simplified, maintainable architecture optimized for bolt.new development and Netlify deployment.

### 1.5. Application Architecture with ElevenLabs Integration

The "Understand.me" application is built on a modern, serverless architecture that leverages several key technologies to deliver a seamless, cross-platform experience. This section provides an overview of the complete application architecture with a focus on the ElevenLabs voice integration.

#### 1.5.1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      Client Application                          │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Expo (React   │  │  State Management│  │  UI Components  │  │
│  │     Native)     │  │    (Zustand)    │  │   (React Native)│  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │           │
│  ┌────────┴────────┐  ┌────────┴────────┐  ┌────────┴────────┐  │
│  │  Voice Services │  │  Session Manager│  │  Authentication │  │
│  │  (ElevenLabs)   │  │                │  │    (Supabase)   │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
└───────────┼────────────────────┼────────────────────┼───────────┘
            │                    │                    │
┌───────────┼────────────────────┼────────────────────┼───────────┐
│           │                    │                    │           │
│  ┌────────┴────────┐  ┌────────┴────────┐  ┌────────┴────────┐  │
│  │  PicaOS (AI     │  │  Supabase       │  │  Upstash Redis  │  │
│  │  Orchestration) │  │  (Database/Auth)│  │    (Caching)    │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │           │
│  ┌────────┴────────┐  ┌────────┴────────┐  ┌────────┴────────┐  │
│  │  Google GenAI   │  │  Supabase       │  │  Supabase       │  │
│  │    (LLM)        │  │  Storage        │  │  Edge Functions │  │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘  │
│           │                    │                    │           │
│  ┌────────┴────────┐  ┌────────┴────────┐  ┌────────┴────────┐  │
│  │  ElevenLabs API │  │  Supabase       │  │  Dappier/Nodely │  │
│  │  (Voice)        │  │  Realtime       │  │  (Optional)     │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                  │
│                      Backend Services                            │
└─────────────────────────────────────────────────────────────────┘
```

#### 1.5.2. Key Components

1. **Client Application:**
   * **Expo (React Native):** Cross-platform mobile framework that allows the application to run on iOS, Android, and potentially web.
   * **State Management:** Zustand for lightweight, flexible state management across the application.
   * **UI Components:** Custom React Native components following the design system.
   * **Voice Services:** Integration with ElevenLabs for voice synthesis and recognition.
   * **Session Manager:** Handles the creation, configuration, and state management of mediation sessions.
   * **Authentication:** Client-side authentication using Supabase Auth.

2. **Backend Services:**
   * **PicaOS:** AI orchestration layer that coordinates between different AI services.
   * **Supabase:** Provides database, authentication, storage, and realtime capabilities.
   * **Upstash Redis:** High-performance caching for frequently accessed data and voice responses.
   * **Google GenAI:** Large language model for generating AI responses and analysis.
   * **ElevenLabs API:** Voice synthesis for the AI agent "Alex".
   * **Supabase Edge Functions:** Serverless functions for backend logic.
   * **Dappier/Nodely:** Optional services for specialized data handling and workflows.

#### 1.5.3. ElevenLabs Integration Flow

The following diagram illustrates the flow of data for voice interactions using ElevenLabs:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  User Input │     │ Expo App    │     │ PicaOS      │
│  (Voice)    │────▶│ (React      │────▶│ (AI         │
│             │     │  Native)    │     │ Orchestration)
└─────────────┘     └─────────────┘     └──────┬──────┘
                                                │
                                                ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  User       │     │ Expo App    │     │ ElevenLabs  │
│  (Hears     │◀────│ (Audio      │◀────│ API         │
│   Response) │     │  Playback)  │     │ (TTS)       │
└─────────────┘     └─────────────┘     └──────▲──────┘
                                                │
                                                │
                                         ┌──────┴──────┐
                                         │ Google GenAI│
                                         │ (Response   │
                                         │  Generation)│
                                         └─────────────┘
```

1. **User Voice Input:**
   * User speaks into the device microphone.
   * Expo app captures audio using `expo-av`.
   * Audio is sent to PicaOS for processing.

2. **Speech Processing:**
   * PicaOS sends audio to Google GenAI for speech-to-text conversion.
   * The transcribed text is analyzed for intent and context.
   * Google GenAI generates an appropriate response script.

3. **Voice Synthesis:**
   * PicaOS sends the response script to ElevenLabs API.
   * ElevenLabs synthesizes the text into natural-sounding speech.
   * The audio response is returned to the Expo app.

4. **Audio Playback:**
   * Expo app plays the audio response using `expo-av`.
   * User hears Alex's voice response.
   * The conversation continues with the next user input.

#### 1.5.4. Data Flow and Storage

1. **User Data:**
   * User profiles and authentication data stored in Supabase.
   * User preferences and settings cached in Upstash Redis for quick access.

2. **Session Data:**
   * Session configurations and metadata stored in Supabase.
   * Active session state maintained in Supabase Realtime for multi-participant synchronization.
   * Session transcripts and summaries stored in Supabase for future reference.

3. **Voice Data:**
   * Temporary audio recordings processed in memory and not persisted unless explicitly required.
   * Frequently used voice responses cached in Upstash Redis to reduce API calls.
   * Voice configuration preferences stored in user profiles.

4. **Multimedia Files:**
   * User-uploaded files stored in Supabase Storage.
   * File metadata and references stored in Supabase database.
   * File analysis results cached for quick access during sessions.

### 1.6. Application Development Roadmap

The development of the "Understand.me" application will follow a structured approach to ensure all components are properly integrated and tested. This roadmap provides a high-level overview of the development process from initial setup to final deployment.

#### 1.6.1. Phase 1: Project Setup and Infrastructure (Weeks 1-2)

1. **Environment Setup:**
   * Create Expo project with TypeScript template
   * Configure development environments for iOS, Android, and web
   * Set up version control and CI/CD pipelines
   * Configure linting and code formatting tools

2. **Backend Infrastructure:**
   * Set up Supabase project and database schema
   * Configure authentication services
   * Set up storage buckets for multimedia files
   * Implement basic API endpoints and test connectivity

3. **AI Service Integration:**
   * Set up Google GenAI integration
   * Configure ElevenLabs API access
   * Create initial AI orchestration layer with PicaOS
   * Test basic AI functionality (text generation, voice synthesis)

#### 1.6.2. Phase 2: Core Functionality Development (Weeks 3-6)

1. **Authentication and User Management:**
   * Implement sign-up and login flows
   * Create user profile management
   * Set up social login integrations
   * Implement password reset and account recovery

2. **Voice Agent Implementation:**
   * Develop ElevenLabs integration using Expo DOM components
   * Create voice input/output components
   * Implement voice recording and playback functionality
   * Set up voice caching and optimization

3. **Session Management:**
   * Create session creation and configuration screens
   * Implement participant invitation system
   * Develop session joining functionality
   * Create session state management

4. **AI Mediation Core:**
   * Implement the five-phase mediation flow
   * Create context analysis functionality
   * Develop real-time transcription and analysis
   * Implement AI guidance and intervention logic

#### 1.6.3. Phase 3: Advanced Features and Refinement (Weeks 7-10)

1. **Multimedia Handling:**
   * Implement file upload and management
   * Create document preview functionality
   * Develop image and video handling
   * Implement AI analysis of multimedia content

2. **Real-time Communication:**
   * Set up Supabase Realtime for live updates
   * Implement notification system
   * Create real-time session state synchronization
   * Develop multi-participant interaction flows

3. **Personal Growth Module:**
   * Create insights generation and tracking
   * Implement progress visualization
   * Develop resource recommendation system
   * Create goal setting and tracking functionality

4. **Post-Session Workflows:**
   * Implement summary generation
   * Create review and approval flows
   * Develop digital sign-off functionality
   * Implement follow-up scheduling

#### 1.6.4. Phase 4: Testing, Optimization, and Launch (Weeks 11-12)

1. **Comprehensive Testing:**
   * Conduct unit and integration testing
   * Perform cross-platform compatibility testing
   * Execute performance and load testing
   * Conduct user acceptance testing

2. **Optimization:**
   * Optimize application performance
   * Reduce API costs through caching and batching
   * Improve voice quality and latency
   * Enhance offline capabilities

3. **Documentation and Training:**
   * Complete developer documentation
   * Create user guides and tutorials
   * Prepare training materials for hosts/mediators
   * Document API endpoints and integration points

4. **Launch Preparation:**
   * Finalize app store listings
   * Prepare marketing materials
   * Set up analytics and monitoring
   * Configure production environment

#### 1.6.5. Post-Launch Support and Iteration (Ongoing)

1. **Monitoring and Maintenance:**
   * Monitor application performance and usage
   * Track API costs and optimize as needed
   * Address bugs and issues
   * Perform regular security updates

2. **User Feedback and Iteration:**
   * Collect and analyze user feedback
   * Prioritize feature requests and enhancements
   * Implement iterative improvements
   * Conduct A/B testing for new features

3. **Expansion and Enhancement:**
   * Develop additional AI capabilities
   * Expand language support
   * Create enterprise integration options
   * Develop advanced analytics and reporting

## 2. User Personas & Roles (Functional Focus)

This section summarizes the key user personas and their primary functional goals within the "Understand.me" application. Detailed persona descriptions are available in the Research & Strategy Report and TPKB Part 2.

### 2.1. Harriet (The Host/Mediator/Facilitator)
*   **FR-PER-HOS-001:** Must be able to create new sessions.
*   **FR-PER-HOS-002:** Must be able to provide detailed context for a session, including text descriptions and multimedia file uploads (documents, images, audio, video).
*   **FR-PER-HOS-003:** Must be able to review AI-generated analysis of the provided session context.
*   **FR-PER-HOS-004:** Must be able to configure session types, choosing from templates or customizing settings (e.g., duration, features like Q&A, polls, anonymity, transcription, translation).
*   **FR-PER-HOS-005:** Must be able to define specific goals and communication rules for a session.
*   **FR-PER-HOS-006:** Must be able to invite participants to a session (e.g., via email, shareable link) and manage participant roles.
*   **FR-PER-HOS-007:** Must be able to track participant invitation statuses (accepted, declined, pending).
*   **FR-PER-HOS-008:** Must be able to initiate and lead an AI-mediated session through its five phases.
*   **FR-PER-HOS-009:** Must be able to utilize in-session AI guidance and moderation tools provided by Alex.
*   **FR-PER-HOS-010:** Must receive and review AI-generated post-session summaries and action plans.
*   **FR-PER-HOS-011:** Must be able to manage the review and approval process for session summaries with participants.
*   **FR-PER-HOS-012:** Must be able to digitally sign off on final session summaries.
*   **FR-PER-HOS-013:** Must be able to schedule follow-up check-in sessions.
*   **FR-PER-HOS-014:** Must be able to access personal growth insights and track communication skill development related to hosting.

### 2.2. Paul (The Participant)
*   **FR-PER-PAR-001:** Must be able to join a session using a unique session code or an invitation link.
*   **FR-PER-PAR-002:** Must be able to view detailed invitation information, including context and files shared by the Host.
*   **FR-PER-PAR-003:** Must be able to accept or decline session invitations, optionally providing a reason for declining.
*   **FR-PER-PAR-004:** Must be able (if requested by the Host) to provide their perspective on the session topic before it begins, including text and multimedia file uploads.
*   **FR-PER-PAR-005:** Must be able to configure personal privacy settings related to data usage and visibility in sessions.
*   **FR-PER-PAR-006:** Must be able to actively participate in all five phases of an AI-mediated session, including expressing their views (via voice or text) and engaging in understanding and resolution activities.
*   **FR-PER-PAR-007:** Must be able to understand and follow Alex's guidance and the established session rules.
*   **FR-PER-PAR-008:** Must be able to review and (if required) approve or suggest changes to post-session summaries.
*   **FR-PER-PAR-009:** Must be able to digitally sign off on final session summaries if required.
*   **FR-PER-PAR-010:** Must be able to provide feedback on the session and AI mediation.
*   **FR-PER-PAR-011:** Must be able to access personal growth insights related to their participation.

### 2.3. Individual User (Self-Reflection/Personal Growth)
*   **FR-PER-IND-001:** Must be able to use the application for personal, private use without necessarily inviting other participants (e.g., for voice journaling, practicing communication, self-reflection).
*   **FR-PER-IND-002:** Must be able to get live transcription of their spoken input in this solo mode.
*   **FR-PER-IND-003:** Must be able to receive AI-driven analysis and insights on their personal input (similar to conflict description analysis but for self-reflection).
*   **FR-PER-IND-004:** Must be able to access all features of the Personal Growth & Tracking Module (insights, badges, resources, conflict prevention advice) based on their solo usage and any participated sessions.
*   **FR-PER-IND-005:** Must have strong privacy assurances for their solo usage data.

## 3. System-Wide Functional Requirements

This section details functional requirements that apply across multiple features or define core system capabilities.

### 3.0. AI Engine Technical Implementation

This section outlines the technical implementation details for the core AI components of the "Understand.me" application, including the multimodal LLM analysis engine and the ElevenLabs voice integration.

### 3.0.A. Multimodal LLM Analysis Engine

The multimodal LLM analysis engine is the cognitive core of the "Understand.me" application, enabling sophisticated understanding and analysis of communication patterns, emotional states, and conflict dynamics. This section details the technical implementation of this engine.

#### 3.0.A.1. Multimodal Input Processing Architecture

*   **FR-SYS-AI-001:** The system must process and analyze multiple input modalities, including text, voice, images, and documents.
    *   **Frontend Development Outline:**
        *   Implement input capture components for each modality (text input, voice recording via `expo-av`, image capture via `expo-image-picker`, document upload via `expo-document-picker`).
        *   Create preprocessing pipelines for each modality to optimize data before sending to the backend.
        *   Implement UI components to display analysis results and insights.
        *   Create visualization components for emotional analysis, communication patterns, and conflict dynamics.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS/Edge Function:** Orchestrates the processing of multimodal inputs, routing each to appropriate analysis services.
        *   **Google GenAI:** Provides multimodal LLM capabilities for analyzing text, images, and transcribed audio.
        *   **Specialized Services:** Integrate with specialized services for specific analysis tasks (e.g., voice tone analysis, facial expression recognition).
        *   **Supabase Database:** Stores analysis results, patterns, and insights for future reference and learning.
    *   **Key Technical Considerations/Challenges:**
        *   Efficient handling of large multimedia files.
        *   Synchronization of analysis across different modalities.
        *   Latency management for real-time analysis.
        *   Privacy and security considerations for sensitive data.

#### 3.0.A.2. Emotional Intelligence and Sentiment Analysis

*   **FR-SYS-AI-002:** The system must detect and analyze emotional states, sentiment, and underlying tensions from verbal and non-verbal cues.
    *   **Frontend Development Outline:**
        *   Create UI components to visualize emotional states and sentiment analysis.
        *   Implement real-time feedback mechanisms for emotional insights.
        *   Develop user interfaces for emotional trend visualization over time.
    *   **Backend/Serverless Development Outline:**
        *   **Text Analysis:** Use Google GenAI to analyze text for sentiment, emotional states, and communication patterns.
        *   **Voice Analysis:** Process audio to detect emotional cues in voice tone, pace, and volume.
        *   **Image Analysis:** Analyze facial expressions and body language in uploaded images or video frames.
        *   **Multimodal Fusion:** Combine insights from different modalities to form a comprehensive emotional understanding.
    *   **Key Technical Considerations/Challenges:**
        *   Accuracy of emotional detection across different cultures and contexts.
        *   Handling ambiguous or mixed emotional signals.
        *   Adapting to individual baseline emotional expressions.
        *   Ethical considerations in emotional analysis and feedback.

#### 3.0.A.3. Conflict Pattern Recognition and Resolution Strategies

*   **FR-SYS-AI-003:** The system must identify common conflict patterns, communication breakdowns, and potential resolution pathways.
    *   **Frontend Development Outline:**
        *   Create visualizations of identified conflict patterns.
        *   Implement UI for suggested resolution strategies.
        *   Develop interactive components for exploring different resolution approaches.
    *   **Backend/Serverless Development Outline:**
        *   **Pattern Recognition:** Use Google GenAI to identify common conflict patterns from conversation transcripts and context.
        *   **Resolution Database:** Maintain a database of effective resolution strategies for different conflict types.
        *   **Strategy Generation:** Generate personalized resolution strategies based on identified patterns and participant profiles.
        *   **Effectiveness Tracking:** Monitor and learn from the effectiveness of suggested strategies over time.
    *   **Key Technical Considerations/Challenges:**
        *   Building a comprehensive database of conflict patterns and resolution strategies.
        *   Personalizing strategies to specific contexts and relationships.
        *   Balancing automated suggestions with human agency and creativity.
        *   Ethical considerations in conflict intervention.

#### 3.0.A.4. Lightweight Analysis Methods

*   **FR-SYS-AI-004:** The system must implement lightweight analysis methods for real-time processing and offline capabilities.
    *   **Frontend Development Outline:**
        *   Implement client-side analysis for basic sentiment detection and keyword extraction.
        *   Create efficient data structures for storing and processing conversation history on-device.
        *   Develop UI components that can function with limited backend connectivity.
    *   **Backend/Serverless Development Outline:**
        *   **Edge Processing:** Deploy lightweight models to edge functions for faster processing.
        *   **Progressive Analysis:** Implement tiered analysis approach, starting with lightweight methods and progressively applying more sophisticated analysis as needed.
        *   **Caching Strategies:** Cache common patterns and responses to reduce processing requirements.
        *   **Offline Mode:** Provide basic functionality when full backend services are unavailable.
    *   **Key Technical Considerations/Challenges:**
        *   Balancing accuracy with processing efficiency.
        *   Managing model size for edge deployment.
        *   Synchronizing offline analysis with cloud-based insights when connectivity is restored.
        *   Providing meaningful value even with limited processing capabilities.

#### 3.0.A.5. Implementation Architecture

The multimodal LLM analysis engine is implemented using a layered architecture that combines specialized models with a central orchestration layer:

```
┌─────────────────────────────────────────────────────────────┐
│                  Multimodal Input Layer                      │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐  │
│  │   Text   │   │  Voice   │   │  Image   │   │ Document │  │
│  │  Input   │   │  Input   │   │  Input   │   │  Input   │  │
│  └────┬─────┘   └────┬─────┘   └────┬─────┘   └────┬─────┘  │
└───────┼───────────────┼───────────────┼───────────────┼─────┘
         │               │               │               │
┌────────┼───────────────┼───────────────┼───────────────┼────┐
│        │               │               │               │    │
│  ┌─────▼──────┐  ┌─────▼──────┐  ┌─────▼──────┐  ┌────▼───┐ │
│  │    Text    │  │   Voice    │  │   Image    │  │Document│ │
│  │  Analysis  │  │  Analysis  │  │  Analysis  │  │Analysis│ │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └────┬───┘ │
│        │               │               │               │    │
│        └───────────────┼───────────────┼───────────────┘    │
│                        │               │                    │
│  ┌────────────────────▼───────────────▼──────────────────┐  │
│  │                 Fusion Layer                          │  │
│  │   (Combines insights from different modalities)       │  │
│  └────────────────────────┬───────────────────────────────┘  │
│                           │                                  │
│  ┌────────────────────────▼───────────────────────────────┐  │
│  │              Contextual Understanding                  │  │
│  │  (Incorporates session history, participant profiles)  │  │
│  └────────────────────────┬───────────────────────────────┘  │
│                           │                                  │
│  ┌────────────────────────▼───────────────────────────────┐  │
│  │                 Strategy Generation                    │  │
│  │   (Produces guidance, interventions, summaries)        │  │
│  └────────────────────────┬───────────────────────────────┘  │
│                           │                                  │
│                 Analysis Engine Core                         │
└────────────────────────────┬──────────────────────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────────┐
│                    Integration Layer                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │   ElevenLabs    │  │    UI/UX        │  │   Database      ││
│  │  Voice Synthesis│  │   Components    │  │   Storage       ││
│  └─────────────────┘  └─────────────────┘  └─────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

#### 3.0.A.6. Implementation with Vercel AI SDK

The multimodal LLM analysis engine can be efficiently implemented using the Vercel AI SDK, which provides a unified interface for working with various AI models and services. This approach offers several advantages:

1. **Unified API:** The AI SDK provides a consistent interface for working with different LLM providers.
2. **Streaming Responses:** Built-in support for streaming responses, which is crucial for real-time conversation.
3. **Cross-Platform Support:** Works across different platforms, including React Native through libraries like `react-native-ai`.
4. **Integration with ElevenLabs:** The AI SDK has built-in support for ElevenLabs integration.
5. **TypeScript Support:** Strong typing for better development experience and fewer runtime errors.

Here's how to implement the core of the multimodal analysis engine using the Vercel AI SDK:

```typescript
// services/aiEngine.ts

import { createAI, createStreamableUI, getMutableAIState } from 'ai/rsc';
import { nanoid } from 'nanoid';
import { createElevenLabsStream } from '@ai-sdk/elevenlabs';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google GenAI for multimodal processing
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);
const multimodalModel = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

// Define the AI state interface
interface AIState {
  messages: {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt: Date;
  }[];
  sessionContext: {
    sessionId: string;
    sessionType: string;
    participantIds: string[];
    conflictType?: string;
    emotionalStates?: Record<string, any>;
  };
  analysis: {
    emotionalStates: Record<string, any>;
    communicationPatterns: Record<string, any>;
    conflictAnalysis: Record<string, any>;
    resolutionProgress: number;
  };
}

// Create the AI engine
export const AI = createAI<AIState>({
  initialAIState: {
    messages: [],
    sessionContext: {
      sessionId: '',
      sessionType: '',
      participantIds: [],
    },
    analysis: {
      emotionalStates: {},
      communicationPatterns: {},
      conflictAnalysis: {},
      resolutionProgress: 0,
    },
  },
  actions: {
    submitUserInput: async (userInput: {
      text?: string;
      audioUrl?: string;
      imageUrls?: string[];
      documentUrls?: string[];
    }) => {
      const aiState = getMutableAIState<AIState>();
      const currentState = aiState.get();
      
      // Add user message to the state
      if (userInput.text) {
        aiState.update({
          ...currentState,
          messages: [
            ...currentState.messages,
            {
              id: nanoid(),
              role: 'user',
              content: userInput.text,
              createdAt: new Date(),
            },
          ],
        });
      }
      
      // Process multimodal input
      const analysisResult = await performMultimodalAnalysis(userInput, currentState.sessionContext);
      
      // Update analysis in the state
      aiState.update({
        ...aiState.get(),
        analysis: analysisResult,
      });
      
      // Generate response based on analysis
      const responseText = await generateResponse(analysisResult, aiState.get().sessionContext);
      
      // Determine emotional tone for voice
      const emotionalState = determineResponseEmotion(analysisResult);
      
      // Add assistant message to the state
      aiState.update({
        ...aiState.get(),
        messages: [
          ...aiState.get().messages,
          {
            id: nanoid(),
            role: 'assistant',
            content: responseText,
            createdAt: new Date(),
          },
        ],
      });
      
      // Generate voice response with ElevenLabs
      const voiceStream = await createElevenLabsStream({
        model: 'eleven_monolingual_v1',
        voiceId: getVoiceIdForEmotion(emotionalState),
        input: responseText,
        voiceSettings: getVoiceSettingsForEmotion(emotionalState),
      });
      
      return createStreamableUI(
        <div className="ai-response">
          <p>{responseText}</p>
          <audio src={URL.createObjectURL(voiceStream)} controls autoPlay />
        </div>
      );
    },
    
    updateSessionContext: async (sessionContext: Partial<AIState['sessionContext']>) => {
      const aiState = getMutableAIState<AIState>();
      
      aiState.update({
        ...aiState.get(),
        sessionContext: {
          ...aiState.get().sessionContext,
          ...sessionContext,
        },
      });
      
      return 'Session context updated';
    },
  },
});

// Helper functions for multimodal analysis
async function performMultimodalAnalysis(
  input: {
    text?: string;
    audioUrl?: string;
    imageUrls?: string[];
    documentUrls?: string[];
  },
  sessionContext: AIState['sessionContext']
) {
  // Process text input
  let textAnalysis = null;
  if (input.text) {
    textAnalysis = await analyzeText(input.text, sessionContext);
  }
  
  // Process audio input (voice tone analysis)
  let audioAnalysis = null;
  if (input.audioUrl) {
    audioAnalysis = await analyzeAudio(input.audioUrl);
  }
  
  // Process image input
  let imageAnalysis = null;
  if (input.imageUrls && input.imageUrls.length > 0) {
    imageAnalysis = await analyzeImages(input.imageUrls);
  }
  
  // Process document input
  let documentAnalysis = null;
  if (input.documentUrls && input.documentUrls.length > 0) {
    documentAnalysis = await analyzeDocuments(input.documentUrls);
  }
  
  // Combine all analyses
  return fusionLayer(textAnalysis, audioAnalysis, imageAnalysis, documentAnalysis, sessionContext);
}

// Function to analyze text using Google GenAI
async function analyzeText(text: string, context: any) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `
    Analyze the following text from a conversation:
    "${text}"
    
    Context:
    ${JSON.stringify(context)}
    
    Provide analysis of:
    1. Emotional states expressed
    2. Communication patterns
    3. Potential conflict indicators
    4. Level of understanding between participants
    
    Format the response as JSON.
  `;
  
  const result = await model.generateContent(prompt);
  const textAnalysis = JSON.parse(result.response.text());
  return textAnalysis;
}

// Function to analyze images using Google GenAI Vision
async function analyzeImages(imageUrls: string[]) {
  const imageContents = await Promise.all(
    imageUrls.map(async (url) => {
      const response = await fetch(url);
      const blob = await response.blob();
      return {
        inlineData: {
          data: await blobToBase64(blob),
          mimeType: blob.type,
        },
      };
    })
  );
  
  const prompt = `
    Analyze these images for:
    1. Facial expressions and emotions
    2. Body language
    3. Environmental context
    4. Any visible text or documents
    
    Format the response as JSON.
  `;
  
  const result = await multimodalModel.generateContent([prompt, ...imageContents]);
  const imageAnalysis = JSON.parse(result.response.text());
  return imageAnalysis;
}

// Helper function to convert blob to base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Other helper functions would be implemented similarly

// Get voice ID based on emotional state
function getVoiceIdForEmotion(emotion: string): string {
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

// Get voice settings based on emotional state
function getVoiceSettingsForEmotion(emotion: string) {
  switch (emotion) {
    case 'empathetic':
      return {
        stability: 0.75,
        similarityBoost: 0.6,
        style: 0.3,
        speakingRate: 0.9,
      };
    case 'assertive':
      return {
        stability: 0.4,
        similarityBoost: 0.8,
        style: 0.5,
        speakingRate: 1.1,
      };
    case 'neutral':
    default:
      return {
        stability: 0.5,
        similarityBoost: 0.75,
        style: 0.0,
        speakingRate: 1.0,
      };
  }
}
```

This implementation leverages the Vercel AI SDK to create a streamlined, efficient multimodal analysis engine that integrates seamlessly with ElevenLabs for voice synthesis. The AI SDK's streaming capabilities ensure that responses are delivered in real-time, enhancing the conversational experience.

For React Native integration, the `react-native-ai` library can be used to connect to this backend implementation, providing a cross-platform solution that works on iOS, Android, and web.

#### 3.0.A.6.1. React Native Integration with AI SDK and ElevenLabs

To implement the multimodal LLM analysis engine in a React Native application with Expo, we can use the following approach:

```typescript
// components/AIMediator.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useAI } from '../hooks/useAI';

interface AIMediator {
  sessionId: string;
  sessionType: string;
  participantIds: string[];
}

export default function AIMediator({ sessionId, sessionType, participantIds }: AIMediator) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);
  
  // Initialize AI context
  const { submitUserInput, updateSessionContext, analysis } = useAI();
  
  // Initialize session context
  useEffect(() => {
    const initSession = async () => {
      await updateSessionContext({
        sessionId,
        sessionType,
        participantIds,
      });
    };
    
    initSession();
  }, [sessionId, sessionType, participantIds]);
  
  // Request permissions
  useEffect(() => {
    const requestPermissions = async () => {
      const { status: audioStatus } = await Audio.requestPermissionsAsync();
      const { status: imageStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (audioStatus !== 'granted' || imageStatus !== 'granted' || cameraStatus !== 'granted') {
        alert('Permissions are required for full functionality');
      }
    };
    
    requestPermissions();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);
  
  // Start recording
  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });
      
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };
  
  // Stop recording and process audio
  const stopRecording = async () => {
    if (!recording) return;
    
    setIsRecording(false);
    setIsProcessing(true);
    
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      if (uri) {
        // Upload audio file to backend for processing
        const audioUrl = await uploadAudioFile(uri);
        
        // Submit audio for analysis
        const response = await submitUserInput({
          audioUrl,
        });
        
        // Add response to messages
        setMessages(prev => [...prev, response]);
        
        // Play response audio
        if (response.audioUrl) {
          setAudioUrl(response.audioUrl);
          await playResponseAudio(response.audioUrl);
        }
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    } finally {
      setRecording(null);
      setIsProcessing(false);
    }
  };
  
  // Upload audio file to backend
  const uploadAudioFile = async (uri: string): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: 'audio/m4a',
        name: 'recording.m4a',
      } as any);
      
      const response = await fetch('https://your-api-endpoint.com/upload-audio', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Failed to upload audio:', error);
      throw error;
    }
  };
  
  // Play response audio
  const playResponseAudio = async (url: string) => {
    try {
      // Download audio file if it's a remote URL
      const fileUri = `${FileSystem.cacheDirectory}response-${Date.now()}.mp3`;
      await FileSystem.downloadAsync(url, fileUri);
      
      // Load and play the sound
      const { sound } = await Audio.Sound.createAsync(
        { uri: fileUri },
        { shouldPlay: true }
      );
      
      soundRef.current = sound;
      
      // Unload sound when finished playing
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Failed to play audio:', error);
    }
  };
  
  // Pick image for analysis
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setIsProcessing(true);
        
        // Upload image file
        const imageUrl = await uploadImageFile(result.assets[0].uri);
        
        // Submit image for analysis
        const response = await submitUserInput({
          imageUrls: [imageUrl],
        });
        
        // Add response to messages
        setMessages(prev => [...prev, response]);
        
        // Play response audio
        if (response.audioUrl) {
          setAudioUrl(response.audioUrl);
          await playResponseAudio(response.audioUrl);
        }
        
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Failed to pick image:', error);
      setIsProcessing(false);
    }
  };
  
  // Upload image file to backend
  const uploadImageFile = async (uri: string): Promise<string> => {
    // Similar implementation to uploadAudioFile
    return 'https://example.com/uploaded-image.jpg';
  };
  
  // Pick document for analysis
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'text/plain'],
        copyToCacheDirectory: true,
      });
      
      if (result.type === 'success') {
        setIsProcessing(true);
        
        // Upload document file
        const documentUrl = await uploadDocumentFile(result.uri);
        
        // Submit document for analysis
        const response = await submitUserInput({
          documentUrls: [documentUrl],
        });
        
        // Add response to messages
        setMessages(prev => [...prev, response]);
        
        // Play response audio
        if (response.audioUrl) {
          setAudioUrl(response.audioUrl);
          await playResponseAudio(response.audioUrl);
        }
        
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Failed to pick document:', error);
      setIsProcessing(false);
    }
  };
  
  // Upload document file to backend
  const uploadDocumentFile = async (uri: string): Promise<string> => {
    // Similar implementation to uploadAudioFile
    return 'https://example.com/uploaded-document.pdf';
  };
  
  // Submit text input
  const submitText = async (text: string) => {
    if (!text.trim()) return;
    
    setIsProcessing(true);
    
    try {
      // Submit text for analysis
      const response = await submitUserInput({
        text,
      });
      
      // Add response to messages
      setMessages(prev => [...prev, response]);
      
      // Play response audio
      if (response.audioUrl) {
        setAudioUrl(response.audioUrl);
        await playResponseAudio(response.audioUrl);
      }
    } catch (error) {
      console.error('Failed to submit text:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <View style={styles.container}>
      {/* Display messages */}
      <View style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={styles.messageItem}>
            <Text style={styles.messageSender}>
              {msg.role === 'assistant' ? 'Alex' : 'You'}:
            </Text>
            <Text style={styles.messageContent}>{msg.content}</Text>
          </View>
        ))}
      </View>
      
      {/* Analysis insights (optional) */}
      {analysis && Object.keys(analysis.emotionalStates).length > 0 && (
        <View style={styles.analysisContainer}>
          <Text style={styles.analysisTitle}>Insights:</Text>
          <Text style={styles.analysisText}>
            Emotional state: {Object.values(analysis.emotionalStates)[0]?.primaryEmotion || 'neutral'}
          </Text>
          <Text style={styles.analysisText}>
            Conflict level: {analysis.conflictAnalysis?.escalationLevel || 0}/5
          </Text>
        </View>
      )}
      
      {/* Input controls */}
      <View style={styles.controlsContainer}>
        {isProcessing ? (
          <ActivityIndicator size="large" color="#3B82F6" />
        ) : (
          <>
            <TouchableOpacity
              style={[styles.recordButton, isRecording && styles.recordingButton]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <Text style={styles.buttonText}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.mediaButtonsContainer}>
              <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
                <Text style={styles.mediaButtonText}>Image</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.mediaButton} onPress={pickDocument}>
                <Text style={styles.mediaButtonText}>Document</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  messageItem: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#4B5563',
  },
  messageContent: {
    color: '#1F2937',
  },
  analysisContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },
  analysisTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1E40AF',
  },
  analysisText: {
    color: '#1E3A8A',
    marginBottom: 4,
  },
  controlsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  recordButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginBottom: 16,
    width: '80%',
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mediaButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  mediaButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  mediaButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
```

This React Native component provides a complete interface for interacting with the multimodal LLM analysis engine, allowing users to:

1. Record voice input for analysis
2. Upload images for visual analysis
3. Upload documents for content analysis
4. Submit text input directly
5. Receive AI responses with voice synthesis via ElevenLabs
6. View analysis insights about emotional states and conflict dynamics

The component integrates with the AI SDK backend through a custom hook (`useAI`), which would handle the communication with the server-side implementation of the Vercel AI SDK.

#### 3.0.A.7. Sample Implementation of Multimodal Analysis

The following code snippet demonstrates how the multimodal analysis engine processes different types of input:

```typescript
// services/multimodalAnalysis.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from './supabaseClient';
import { processAudio } from './audioProcessing';
import { processImage } from './imageProcessing';
import { processDocument } from './documentProcessing';

// Initialize Google GenAI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

interface AnalysisInput {
  text?: string;
  audioUrl?: string;
  imageUrls?: string[];
  documentUrls?: string[];
  sessionContext: {
    sessionId: string;
    participantIds: string[];
    sessionType: string;
    previousInteractions?: any[];
  };
}

interface AnalysisResult {
  emotionalStates: {
    [participantId: string]: {
      primaryEmotion: string;
      secondaryEmotions: string[];
      intensity: number;
      confidence: number;
    };
  };
  communicationPatterns: {
    dominantSpeaker: string | null;
    interruptionCount: number;
    turnTakingBalance: number;
    listeningQuality: number;
  };
  conflictAnalysis: {
    conflictType: string;
    rootCauses: string[];
    escalationLevel: number;
    suggestedApproaches: string[];
  };
  resolutionProgress: number;
  nextSteps: {
    recommendedAction: string;
    alternativeActions: string[];
    rationale: string;
  };
}

export async function performMultimodalAnalysis(
  input: AnalysisInput
): Promise<AnalysisResult> {
  try {
    // Process each modality in parallel
    const [textAnalysis, audioAnalysis, imageAnalysis, documentAnalysis] = 
      await Promise.all([
        input.text ? analyzeText(input.text, input.sessionContext) : null,
        input.audioUrl ? processAudio(input.audioUrl) : null,
        input.imageUrls?.length ? Promise.all(input.imageUrls.map(url => processImage(url))) : null,
        input.documentUrls?.length ? Promise.all(input.documentUrls.map(url => processDocument(url))) : null,
      ]);
    
    // Fusion layer - combine insights from different modalities
    const fusedAnalysis = fusionLayer(
      textAnalysis, 
      audioAnalysis, 
      imageAnalysis, 
      documentAnalysis,
      input.sessionContext
    );
    
    // Generate strategies based on fused analysis
    const strategies = await generateStrategies(fusedAnalysis, input.sessionContext);
    
    // Store analysis results for future reference
    await storeAnalysisResults(fusedAnalysis, strategies, input.sessionContext.sessionId);
    
    return {
      ...fusedAnalysis,
      ...strategies
    };
  } catch (error) {
    console.error('Error in multimodal analysis:', error);
    throw new Error('Failed to complete multimodal analysis');
  }
}

async function analyzeText(text: string, context: any) {
  // Use Google GenAI for text analysis
  const prompt = `
    Analyze the following text from a conversation:
    "${text}"
    
    Context:
    ${JSON.stringify(context)}
    
    Provide analysis of:
    1. Emotional states expressed
    2. Communication patterns
    3. Potential conflict indicators
    4. Level of understanding between participants
    
    Format the response as JSON.
  `;
  
  const result = await model.generateContent(prompt);
  const textAnalysis = JSON.parse(result.response.text());
  return textAnalysis;
}

function fusionLayer(textAnalysis: any, audioAnalysis: any, imageAnalysis: any, documentAnalysis: any, context: any) {
  // Combine insights from different modalities with weighted importance
  // This is a simplified example - actual implementation would be more sophisticated
  
  const emotionalStates = {};
  const communicationPatterns = {
    dominantSpeaker: null,
    interruptionCount: 0,
    turnTakingBalance: 0,
    listeningQuality: 0
  };
  
  // Combine emotional analysis from text and voice
  if (textAnalysis?.emotions && audioAnalysis?.voiceEmotions) {
    // Weighted combination of text and voice emotional analysis
    // Voice emotions might be more reliable for certain emotions
    // Text analysis might be better for complex emotional states
  }
  
  // Add insights from images (facial expressions, body language)
  if (imageAnalysis) {
    // Incorporate facial expression analysis
    // Consider body language cues
  }
  
  // Add context from documents
  if (documentAnalysis) {
    // Extract relevant background information
    // Identify potential topics of contention
  }
  
  // Consider session history and participant profiles from context
  
  return {
    emotionalStates,
    communicationPatterns,
    conflictAnalysis: {
      conflictType: '',
      rootCauses: [],
      escalationLevel: 0,
      suggestedApproaches: []
    },
    resolutionProgress: 0
  };
}

async function generateStrategies(analysis: any, context: any) {
  // Generate intervention strategies based on analysis
  const prompt = `
    Based on the following analysis of a conversation:
    ${JSON.stringify(analysis)}
    
    And this context:
    ${JSON.stringify(context)}
    
    Generate:
    1. The most appropriate next action for the AI mediator
    2. Alternative approaches that could be considered
    3. Rationale for the recommended action
    
    Format the response as JSON.
  `;
  
  const result = await model.generateContent(prompt);
  const strategies = JSON.parse(result.response.text());
  
  return {
    nextSteps: {
      recommendedAction: strategies.recommendedAction,
      alternativeActions: strategies.alternativeActions,
      rationale: strategies.rationale
    }
  };
}

async function storeAnalysisResults(analysis: any, strategies: any, sessionId: string) {
  // Store results in Supabase for future reference and learning
  const { error } = await supabase
    .from('session_analysis')
    .insert({
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      analysis_data: analysis,
      strategies: strategies
    });
  
  if (error) {
    console.error('Error storing analysis results:', error);
  }
}
```

### 3.0.B. ElevenLabs Voice Integration Technical Implementation

The ElevenLabs voice integration is a critical component of the "Understand.me" application, providing the voice capabilities for the AI agent "Alex." This section outlines the technical implementation details for developers.

#### 3.0.B.1. Integration Between Multimodal LLM and ElevenLabs

The seamless integration between the multimodal LLM analysis engine and ElevenLabs voice synthesis is crucial for creating a natural, emotionally intelligent AI mediator. This integration enables "Alex" to not only understand the content and context of conversations but also respond with appropriate emotional tone and cadence.

*   **FR-SYS-VOICE-000:** The system must seamlessly integrate the multimodal LLM analysis engine with ElevenLabs voice synthesis.
    *   **Frontend Development Outline:**
        *   Create a unified interface that coordinates between analysis results and voice output.
        *   Implement UI components that reflect the emotional state of "Alex" during voice synthesis.
        *   Develop feedback mechanisms to indicate when analysis is being processed and voice is being generated.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS Orchestration:** Coordinate the flow of data between the multimodal analysis engine and ElevenLabs.
        *   **Emotional Mapping Service:** Translate emotional analysis into appropriate voice parameters for ElevenLabs.
        *   **Response Generation Pipeline:** Generate text responses based on analysis and optimize them for voice synthesis.
    *   **Key Technical Considerations/Challenges:**
        *   Ensuring consistent emotional tone between analysis and voice output.
        *   Minimizing latency in the end-to-end process from analysis to voice output.
        *   Handling edge cases where emotional analysis might be ambiguous or complex.

The following diagram illustrates the integration flow between the multimodal LLM analysis engine and ElevenLabs:

```
┌─────────────────────────────────────────────────────────────────┐
│                  Multimodal Analysis Engine                      │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Analysis Results                             │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Emotional     │  │  Communication   │  │    Conflict     │  │
│  │    States       │  │    Patterns     │  │    Analysis     │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Response Generation                           │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │    Content      │  │   Emotional     │  │   Linguistic     │  │
│  │   Generation    │  │    Mapping      │  │   Optimization   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ElevenLabs Parameters                         │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │    Voice ID     │  │    Stability    │  │  Similarity     │  │
│  │    Selection    │  │     Setting     │  │     Boost       │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐                       │
│  │     Style       │  │   Speaking      │                       │
│  │    Parameter    │  │      Rate       │                       │
│  └─────────────────┘  └─────────────────┘                       │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ElevenLabs API Call                           │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Voice Output to User                          │
└─────────────────────────────────────────────────────────────────┘
```

The integration code between the multimodal analysis engine and ElevenLabs might look like this:

```typescript
// services/voiceResponseGenerator.ts

import { performMultimodalAnalysis } from './multimodalAnalysis';
import { generateVoiceResponse } from './elevenLabsService';
import { emotionToVoiceMapper } from './emotionMapping';

interface ResponseInput {
  text?: string;
  audioUrl?: string;
  imageUrls?: string[];
  documentUrls?: string[];
  sessionContext: {
    sessionId: string;
    participantIds: string[];
    sessionType: string;
    previousInteractions?: any[];
  };
}

interface VoiceResponseResult {
  responseText: string;
  audioUrl: string;
  emotionalState: string;
  voiceParameters: {
    voiceId: string;
    stability: number;
    similarityBoost: number;
    style: number;
    speakingRate: number;
  };
}

export async function generateAIResponse(
  input: ResponseInput
): Promise<VoiceResponseResult> {
  try {
    // Step 1: Perform multimodal analysis
    const analysisResult = await performMultimodalAnalysis(input);
    
    // Step 2: Generate appropriate text response based on analysis
    const responseText = await generateTextResponse(analysisResult, input.sessionContext);
    
    // Step 3: Determine appropriate emotional tone for response
    const emotionalState = determineResponseEmotion(analysisResult);
    
    // Step 4: Map emotional state to voice parameters
    const voiceParameters = emotionToVoiceMapper(emotionalState);
    
    // Step 5: Generate voice response using ElevenLabs
    const audioUrl = await generateVoiceResponse(responseText, voiceParameters);
    
    return {
      responseText,
      audioUrl,
      emotionalState,
      voiceParameters
    };
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate AI response');
  }
}

async function generateTextResponse(analysisResult: any, sessionContext: any) {
  // Generate appropriate text response based on analysis
  // This could use Google GenAI or other LLM
  
  const responseStrategy = analysisResult.nextSteps.recommendedAction;
  
  // Different response strategies based on analysis
  switch (responseStrategy) {
    case 'ask_clarifying_question':
      return generateClarifyingQuestion(analysisResult);
    case 'summarize_perspectives':
      return generatePerspectiveSummary(analysisResult);
    case 'suggest_resolution':
      return generateResolutionSuggestion(analysisResult);
    case 'acknowledge_emotion':
      return generateEmotionalAcknowledgment(analysisResult);
    case 'redirect_conversation':
      return generateRedirection(analysisResult);
    default:
      return generateGenericResponse(analysisResult);
  }
}

function determineResponseEmotion(analysisResult: any) {
  // Determine appropriate emotional tone for response
  // Based on participant emotional states and conflict analysis
  
  const participantEmotions = Object.values(analysisResult.emotionalStates);
  const conflictLevel = analysisResult.conflictAnalysis.escalationLevel;
  
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

// Helper functions for different response types
function generateClarifyingQuestion(analysis: any) {
  // Generate a clarifying question based on analysis
  return `I notice there might be some uncertainty about ${analysis.conflictAnalysis.rootCauses[0]}. Could you help me understand more about that?`;
}

function generatePerspectiveSummary(analysis: any) {
  // Generate a summary of different perspectives
  return `I'm hearing different perspectives here. On one hand, there's a view that... On the other hand, there's a perspective that...`;
}

function generateResolutionSuggestion(analysis: any) {
  // Generate a suggestion for resolution
  return `Based on what I'm hearing, one possible way forward might be to ${analysis.conflictAnalysis.suggestedApproaches[0]}. How does that sound?`;
}

function generateEmotionalAcknowledgment(analysis: any) {
  // Generate an acknowledgment of emotions
  const primaryEmotion = Object.values(analysis.emotionalStates)[0].primaryEmotion;
  return `I can hear that this situation is causing some ${primaryEmotion}. That's completely understandable given the circumstances.`;
}

function generateRedirection(analysis: any) {
  // Generate a redirection to more productive discussion
  return `I wonder if it might be helpful to shift our focus to ${analysis.conflictAnalysis.suggestedApproaches[0]}?`;
}

function generateGenericResponse(analysis: any) {
  // Generate a generic response
  return `Thank you for sharing that. Let's continue exploring this together.`;
}
```

#### 3.0.B.2. ElevenLabs Integration Architecture

*   **FR-SYS-VOICE-001:** The system must integrate with ElevenLabs API for high-quality voice synthesis.
    *   **Frontend Development Outline:**
        *   Implement voice playback using `expo-av` Audio component.
        *   Create a voice service wrapper that handles communication with the backend for voice synthesis requests.
        *   Implement caching mechanisms for frequently used voice responses to reduce latency and API costs.
        *   Handle playback states (loading, playing, paused, error) with appropriate UI feedback.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS/Edge Function:** Handles communication with ElevenLabs API, sending text scripts and receiving audio data.
        *   **Upstash Redis:** Optionally cache common voice responses to improve performance and reduce API costs.
        *   **Supabase Storage:** Store generated audio files temporarily or permanently as needed.
    *   **Key Technical Considerations/Challenges:**
        *   Latency management for real-time conversation flow.
        *   Bandwidth optimization for mobile networks.
        *   API usage monitoring and cost control.
        *   Fallback mechanisms for offline or error scenarios.

#### 3.0.2. Expo Integration with ElevenLabs

*   **FR-SYS-VOICE-002:** The system must implement cross-platform voice capabilities using Expo's DOM components architecture.
    *   **Frontend Development Outline:**
        *   Utilize Expo DOM components with the `use dom` directive to enable web technologies in the native app.
        *   Implement the ElevenLabs React SDK within DOM components for voice synthesis.
        *   Configure proper permissions for microphone access in `app.json` for iOS and Android.
        *   Create a voice interaction component that handles both voice input and output.
    *   **Backend/Serverless Development Outline:**
        *   Ensure backend services support the requirements of the Expo DOM components architecture.
        *   Implement appropriate CORS and security configurations for API endpoints.
    *   **Key Technical Considerations/Challenges:**
        *   Cross-platform consistency in voice quality and interaction.
        *   Proper handling of microphone permissions across platforms.
        *   Performance optimization for DOM components in native environments.

#### 3.0.3. Implementation Steps for ElevenLabs with Expo

1. **Project Setup:**
   * Create a new Expo project using `npx create-expo-app@latest --template blank-typescript`.
   * Configure microphone permissions in `app.json` for iOS and Android.
   * Install required dependencies:
     ```bash
npx expo install @elevenlabs/react
     npx expo install expo-dev-client
     npx expo install react-native-webview
     npx expo install react-dom react-native-web @expo/metro-runtime
     npx expo install expo-av
