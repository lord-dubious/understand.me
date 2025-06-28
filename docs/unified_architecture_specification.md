# Understand.me - Unified Architecture Specification

## **Executive Summary**

This document unifies all conflicting documentation and establishes the definitive architecture for Understand.me - an AI-mediated conflict resolution platform built for bolt.new development and Netlify deployment.

## **1. Definitive Technology Stack**

### **Frontend (Expo React Native)**
```json
{
  "expo": "~51.0.0",
  "react": "18.2.0",
  "react-native": "0.74.0",
  "react-native-web": "~0.19.10",
  "zustand": "^4.5.5"
}
```

### **Backend (Express.js/Node.js)**
```json
{
  "express": "^4.19.2",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5",
  "pg": "^8.11.5"
}
```

### **AI Orchestration Stack**
```json
{
  "@google/genai": "^1.5.0",
  "@langchain/core": "^0.3.0",
  "@langchain/google-genai": "^0.1.0",
  "@langchain/langgraph": "^0.2.0",
  "@langchain/community": "^0.3.0",
  "@langchain/textsplitters": "^0.1.0",
  "langchain": "^0.3.0"
}
```

### **Voice & Emotional Intelligence**
```json
{
  "@elevenlabs/react": "^0.8.0",
  "@elevenlabs/client": "^0.8.0",
  "hume": "^0.9.0"
}
```

## **2. Core Architecture Principles**

### **2.1. AI Agent System**
- **Primary Agent**: Udine (warm, supportive conflict resolution specialist)
- **Voice Integration**: ElevenLabs turn-taking conversations
- **Emotional Intelligence**: Hume AI real-time analysis
- **Orchestration**: LangGraph 5-phase mediation workflow

### **2.2. 5-Phase Mediation Workflow**
1. **Prepare** - Set context & framework (I1)
2. **Express** - Guided turn-taking for perspectives (I2)
3. **Understand** - Clarify positions & find common ground (I3)
4. **Resolve** - Brainstorm solutions & create agreements (I4)
5. **Heal** - Relationship repair & forward movement (I5)

### **2.3. Data Flow Architecture**
```
User Voice → ElevenLabs → LangGraph → Google GenAI
     ↓           ↓           ↓           ↓
Hume AI ← Emotional Analysis ← Context ← Response
     ↓           ↓           ↓           ↓
PostgreSQL ← Session State ← Memory ← Action Items
```

## **3. Project Structure (bolt.new Optimized)**

```
understand-me/
├── src/                           # Frontend (Expo)
│   ├── components/
│   │   ├── voice/                 # ElevenLabs integration
│   │   ├── mediation/             # 5-phase UI components
│   │   ├── emotions/              # Hume AI visualization
│   │   └── common/                # Shared UI components
│   ├── screens/
│   │   ├── onboarding/            # AI-powered onboarding
│   │   ├── host/                  # Host path (F1-F10)
│   │   ├── participant/           # Participant path (G1-G8)
│   │   ├── session/               # 5-phase mediation (I1-I5)
│   │   └── growth/                # Growth tracking (K1-K5)
│   ├── services/
│   │   ├── elevenlabs.ts          # Voice conversation service
│   │   ├── hume.ts                # Emotional analysis service
│   │   ├── api.ts                 # Backend API client
│   │   └── storage.ts             # Local state management
│   ├── stores/                    # Zustand stores
│   │   ├── conversationStore.ts   # Session state
│   │   ├── userStore.ts           # User profile & preferences
│   │   └── emotionStore.ts        # Emotional analysis data
│   └── types/
│       ├── mediation.ts           # 5-phase workflow types
│       ├── voice.ts               # ElevenLabs types
│       └── emotions.ts            # Hume AI types
├── server/                        # Backend (Express.js)
│   ├── routes/
│   │   ├── auth.js                # Authentication
│   │   ├── sessions.js            # Session management
│   │   ├── mediation.js           # 5-phase workflow API
│   │   └── ai.js                  # LangChain orchestration
│   ├── services/
│   │   ├── langchain/             # LangGraph workflows
│   │   │   ├── mediationWorkflow.js
│   │   │   ├── analysisChains.js
│   │   │   └── memoryManager.js
│   │   ├── googleGenAI.js         # Google GenAI integration
│   │   ├── humeAI.js              # Emotional intelligence
│   │   └── database.js            # PostgreSQL operations
│   ├── middleware/
│   │   ├── auth.js                # JWT authentication
│   │   ├── validation.js          # Request validation
│   │   └── errorHandler.js        # Error handling
│   └── models/
│       ├── User.js                # User model
│       ├── Session.js             # Session model
│       └── Message.js             # Message model
├── docs/                          # Unified documentation
│   ├── development_guide/         # Updated UI guides
│   ├── integration_guides/        # LangChain & Hume AI
│   └── api_documentation/         # Backend API docs
└── package.json                   # Unified dependencies
```

## **4. Key Integration Patterns**

### **4.1. ElevenLabs Turn-Taking Integration**
```typescript
// src/services/elevenlabs.ts
import { Conversation } from '@elevenlabs/react';

export const useUdineConversation = () => {
  const startMediationSession = async (sessionConfig) => {
    return await Conversation.startSession({
      agentId: process.env.EXPO_PUBLIC_UDINE_AGENT_ID,
      onMessage: handleMediationMessage,
      onTurnChange: handleTurnChange,
      onEmotionDetected: handleEmotionChange
    });
  };
};
```

### **4.2. LangGraph Mediation Workflow**
```javascript
// server/services/langchain/mediationWorkflow.js
import { StateGraph, MemorySaver } from "@langchain/langgraph";

const mediationWorkflow = new StateGraph({
  currentPhase: "prepare",
  participants: [],
  conflictAnalysis: {},
  emotionalStates: {},
  sessionGoals: [],
  actionItems: []
});
```

### **4.3. Hume AI Emotional Analysis**
```typescript
// src/services/hume.ts
import { HumeClient } from 'hume';

export const analyzeEmotionalState = async (audioData) => {
  const emotions = await hume.empathicVoice.analyze(audioData);
  return processEmotionalInsights(emotions);
};
```

## **5. Environment Configuration**

### **5.1. Frontend (.env)**
```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_UDINE_AGENT_ID=your_elevenlabs_agent_id
EXPO_PUBLIC_HUME_API_KEY=your_hume_api_key
```

### **5.2. Backend (.env)**
```bash
DATABASE_URL=postgresql://user:pass@host:port/dbname
GOOGLE_GENAI_API_KEY=your_google_genai_key
ELEVENLABS_API_KEY=your_elevenlabs_key
HUME_API_KEY=your_hume_api_key
JWT_SECRET=your_jwt_secret
PORT=3000
```

## **6. Deployment Architecture**

### **6.1. Netlify Configuration**
```toml
# netlify.toml
[build]
  command = "npm run build"
  functions = "server"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

This unified specification resolves all documentation conflicts and provides the definitive architecture for Understand.me development.
