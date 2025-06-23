# Understand.me Boilerplate Setup Guide

This comprehensive guide provides step-by-step instructions for establishing the foundational boilerplate for the Understand.me application. The boilerplate represents the minimal viable setup required before leveraging AI development tools like bolt.new for accelerated development.

This guide consolidates all essential configurations, package structures, and integration points necessary for the application's core functionality, ensuring a robust foundation for multi-agent AI-mediated communication.

## Executive Summary

Understand.me is a sophisticated AI-mediated communication platform that facilitates meaningful conversations through multiple AI agents. The platform leverages cutting-edge technologies to provide natural, emotionally intelligent interactions:

### Core Technology Stack
- **ElevenLabs** - Advanced voice synthesis with emotional nuance and agent-specific voices
- **Google GenAI (v1.6.0)** - Multimodal analysis using Gemini 2.0 models for natural language processing and intelligent response generation
- **Supabase** - Comprehensive backend services including authentication, real-time database, and secure storage
- **Expo (React Native)** - Cross-platform mobile development with native performance
- **Zustand** - Lightweight state management for React Native applications

### Multi-Agent Architecture
The platform implements a unified agent system where all agents share the same core functionality but differ in personality and presentation. This approach ensures consistent behavior while allowing for personalized user experiences:

- **Udine** - Primary AI assistant (default) - Warm, supportive, and approachable personality
- **Alex** - Alternative personality - Professional mediation specialist tone
- **Maya** - Alternative personality - Energetic coaching specialist approach  
- **Dr. Chen** - Alternative personality - Calm, therapeutic professional demeanor

**Key Architecture Principles:**
- **Unified Functionality**: All agents use the same underlying AI models and capabilities
- **Personality Differentiation**: Agents differ only in voice, visual representation, and conversational tone
- **User Selectable**: Users can choose their preferred agent via settings (defaulting to Udine)
- **Consistent Experience**: Switching agents maintains conversation context and functionality

### Boilerplate Foundation
This setup guide establishes the essential foundation for:
1. **Modular Architecture** - Clean separation of concerns with scalable project structure
2. **Environment Configuration** - Secure API key management and environment-specific settings
3. **Voice Integration** - Multi-agent ElevenLabs implementation with emotional voice synthesis
4. **Agent Management** - Flexible architecture supporting dynamic agent switching and configuration
5. **Authentication Flow** - Supabase-powered user management with secure session handling
6. **Navigation Structure** - Intuitive user journey from onboarding through authenticated experiences
7. **Component Library** - Reusable UI components optimized for agent interactions

## 1. Project Structure Overview

The Understand.me application follows a modular, scalable architecture with clear separation of concerns. This structure is designed to support multi-agent AI interactions while maintaining code organization and developer productivity. The boilerplate establishes the following comprehensive directory structure:

```
understand-me/
├── .github/                    # GitHub workflows and templates
├── assets/                     # Static assets (images, fonts, sounds)
│   ├─��������������� fonts/                  # Custom fonts for the application
│   ├── images/                 # Images, icons, and visual assets
│   ├── sounds/                 # Sound effects and notification tones
│   └── animations/             # Lottie animations for UI interactions
├─��������� src/
│   ├── api/                    # API integration layer
│   │   ├── elevenlabs/         # ElevenLabs API integration for voice synthesis
│   │   ├── genai/              # Google GenAI v1.6.0 integration for LLM responses
│   │   └── supabase/           # Supabase client and queries
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Generic components (buttons, inputs, etc.)
│   │   ├── conversation/       # Conversation-specific components
│   │   ├── forms/              # Form components
│   │   ├── voice/              # Voice interaction components
│   │   ├── agents/             # AI agent components (Udine, Alex, and others)
│   │   └��─ session/            # Session-related components
│   ├── contexts/               # React contexts for state management
│   │   ├── auth/               # Authentication context
│   │   ├── session/            # Session context
│   │   ├── voice/              # Voice context
│   │   └── agents/             # AI agent contexts (Udine, Alex, and others)
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAudio/           # Audio recording and playback hooks
│   │   ├── useVoice/           # Voice synthesis and recognition hooks
│   │   ├── useSession/         # Session management hooks
│   │   └── useAnalysis/        # Analysis and processing hooks
│   ├── lib/                    # Utility functions and helpers
│   │   ├── ai/                 # AI processing utilities
│   │   ├��─ audio/              # Audio processing utilities
│   │   ├── storage/            # Local storage utilities
│   │   ├── emotion/            # Emotion detection and processing
�����������������������������������������������������������������   │   └── mediation/          # Mediation workflow utilities
│   ├── navigation/             # React Navigation setup
│   │   ├── stacks/             # Stack navigators
│   │   ├── tabs/               # Tab navigators
│   │   └── routes.ts           # Route definitions
│   ├── screens/                # Application screens
│   │   ├── auth/               # Authentication screens
│   │   ├── onboarding/         # Onboarding screens (before auth)
│   │   ├── session/            # Session-related screens
│   │   ├── settings/           # Settings screens
│   │   ├── profile/            # User profile screens
│   │   └── assessment/         # Personality assessment screens
│   ├── services/               # Business logic services
���   ��   ��─��� auth/               # Authentication service
���   ���   ���─��� conversation/       # Conversation processing service
│   ��   ├── mediation/          # Mediation logic service
│   │   ├── voice/              # Voice processing service
│   │   ├── analysis/           # Analysis service for multimodal inputs
│   │   └── notification/       # Notification service
│   ├── store/                  # State management with Zustand
│   │   ├── auth/               # Authentication state
│   │   ├── session/            # Session state
│   │   ├── user/               # User state
│   │   └── voice/              # Voice state
│   ├── types/                  # TypeScript type definitions
��   ��   ��─�� api.ts              # API response and request types
│   │   ├── auth.ts             # Authentication types
�����   │   ���─��� session.ts          # Session types
│   │   ���── voice.ts            # Voice types
│   ���   ���─��� index.ts            # Type exports
│   └── utils/                  # Utility functions
│       ├── formatting.ts       # Text and data formatting utilities
│       ├── validation.ts       # Form and data validation
│       ├── permissions.ts      # Permission handling
│       └── analytics.ts        # Analytics utilities
├── App.tsx                     # Main application component
├── app.json                    # Expo configuration
├── babel.config.js             # Babel configuration
├── eas.json                    # EAS Build configuration
├── metro.config.js             # Metro bundler configuration
├── package.json                # NPM dependencies
├── tsconfig.json               # TypeScript configuration
��─�� .env.example                # Example environment variables
└���─ README.md                   # Project documentation
```

This structure aligns with the five-phase AI-mediated session flow described in the PRD and supports the multimodal LLM analysis engine integration with ElevenLabs.

## 2. Core Dependencies

The boilerplate includes carefully curated dependencies organized by functionality to support the multi-agent AI architecture. Each dependency serves a specific purpose in delivering the platform's core capabilities:

### 2.1. Production Dependencies

```json
{
  "dependencies": {
    // Core Framework
    "expo": "~50.0.0",
    "react": "18.2.0",
    "react-native": "0.73.2",
    "expo-status-bar": "~1.11.0",
    
    // AI & Voice Integration
    "@google/genai": "^1.6.0",
    "elevenlabs": "^0.8.1",
    "expo-av": "~14.0.0",
    "expo-speech": "~11.7.0",
    
    // Backend & Authentication
    "@supabase/supabase-js": "^2.38.5",
    "expo-secure-store": "~12.8.0",
    
    // Navigation
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "react-native-safe-area-context": "4.8.2",
    "react-native-screens": "~3.29.0",
    
    // UI Components & Animation
    "@expo/vector-icons": "^14.0.0",
    "react-native-reanimated": "~3.6.2",
    "react-native-gesture-handler": "~2.14.0",
    "react-native-svg": "14.1.0",
    "expo-linear-gradient": "~12.7.0",
    
    // State Management & Storage
    "zustand": "^4.4.7",
    
    // Utilities
    "expo-constants": "~15.4.0",
    "expo-device": "~5.9.0",
    "expo-file-system": "~16.0.0",
    "expo-font": "~11.10.0",
    "expo-notifications": "~0.27.0"
  },
  "devDependencies": {
    // Build & Compilation
    "@babel/core": "^7.23.6",
    "typescript": "^5.3.3",
    "@types/react": "~18.2.45",
    "@types/react-native": "~0.73.0",
    
    // Testing
    "jest": "^29.7.0",
    
    // Code Quality
    "eslint": "^8.56.0",
    "eslint-config-expo": "^7.0.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0"
  }
}
```

### 2.2. Development Dependencies

The development dependencies ensure code quality, testing capabilities, and streamlined development workflow:

- **TypeScript & Babel**: Type safety and modern JavaScript compilation
- **Testing Suite**: Comprehensive testing with Jest and React Native Testing Library
- **Code Quality**: ESLint and Prettier for consistent code formatting and linting
- **Git Hooks**: Husky and lint-staged for pre-commit quality checks

### 2.3. Key Dependencies by Functionality

#### 🤖 AI & Voice Integration
- **@google/genai**: Latest Google GenAI SDK v1.6.0 (Gemini 2.0) for multimodal AI processing
- **elevenlabs**: Official ElevenLabs SDK for advanced voice synthesis
- **expo-av**: Audio recording and playback with microphone permissions
- **expo-speech**: Built-in text-to-speech capabilities

#### 🔐 Backend & Authentication
- **@supabase/supabase-js**: Comprehensive backend client with real-time capabilities
- **expo-secure-store**: Secure token storage for authentication

#### 🎨 UI Components & Animation
- **@expo/vector-icons**: Comprehensive icon library for Expo
- **react-native-reanimated**: High-performance animations
- **react-native-gesture-handler**: Advanced gesture recognition
- **react-native-svg**: SVG support for custom graphics
- **expo-linear-gradient**: Gradient backgrounds and effects

#### 🧭 Navigation & State
- **@react-navigation/native**: Navigation framework
- **@react-navigation/stack**: Stack navigation for screen transitions
- **@react-navigation/bottom-tabs**: Tab-based navigation
- **zustand**: Lightweight state management
- **react-native-safe-area-context**: Safe area handling across devices

#### 🛠️ Development & Utilities
- **expo-constants**: Access to app constants and configuration
- **expo-device**: Device information and capabilities
- **expo-file-system**: File system access and management
- **expo-font**: Custom font loading
- **expo-notifications**: Push notification handling

## 3. Environment Configuration

### 3.1. Environment Variables

The application requires comprehensive environment configuration to support multi-agent AI interactions and secure service integrations. Create a `.env.example` file with the following structure:

```
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# ElevenLabs Configuration - Multi-Agent Voice Synthesis
ELEVENLABS_API_KEY=your_elevenlabs_api_key

# Agent-Specific Voice IDs
ELEVENLABS_UDINE_VOICE_ID=your_udine_voice_id
ELEVENLABS_ALEX_VOICE_ID=your_alex_voice_id
ELEVENLABS_MAYA_VOICE_ID=your_maya_voice_id
ELEVENLABS_DR_CHEN_VOICE_ID=your_dr_chen_voice_id

# Voice Synthesis Settings
ELEVENLABS_STABILITY=0.5
ELEVENLABS_SIMILARITY_BOOST=0.75
ELEVENLABS_STYLE=0.5
ELEVENLABS_USE_SPEAKER_BOOST=true
ELEVENLABS_MODEL_ID=eleven_monolingual_v1

# Google GenAI Configuration - Gemini 2.0 (Configurable Models)
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
GOOGLE_GENAI_DEFAULT_MODEL=gemini-2.0-flash-exp
GOOGLE_GENAI_TEXT_MODEL=gemini-2.0-flash-exp
GOOGLE_GENAI_VISION_MODEL=gemini-2.0-flash-exp
GOOGLE_GENAI_THINKING_MODEL=gemini-2.0-flash-thinking-exp
GOOGLE_GENAI_TEMPERATURE=0.7
GOOGLE_GENAI_TOP_K=40
GOOGLE_GENAI_TOP_P=0.95
GOOGLE_GENAI_MAX_OUTPUT_TOKENS=2048

# Multimodal Configuration
GOOGLE_GENAI_ENABLE_MULTIMODAL=true

# PicaOS Configuration (AI Orchestration)
PICAOS_API_KEY=your_picaos_api_key
PICAOS_PROJECT_ID=your_picaos_project_id

# Upstash Redis Configuration (Caching)
UPSTASH_REDIS_URL=your_upstash_redis_url
UPSTASH_REDIS_TOKEN=your_upstash_redis_token

# Optional Dappier/Nodely Configuration
DAPPIER_API_KEY=your_dappier_api_key
NODELY_API_KEY=your_nodely_api_key

# App Configuration
APP_ENV=development
APP_VERSION=0.1.0
APP_NAME=Understand.me
APP_BUNDLE_ID=com.yourcompany.understandme
APP_PACKAGE_NAME=com.yourcompany.understandme

# Analytics Configuration
SEGMENT_WRITE_KEY=your_segment_write_key
MIXPANEL_TOKEN=your_mixpanel_token
AMPLITUDE_API_KEY=your_amplitude_api_key
FIREBASE_CONFIG=your_firebase_config_json

# Error Reporting
SENTRY_DSN=your_sentry_dsn

# Feature Flags
ENABLE_VOICE_STREAMING=true
ENABLE_MULTIMODAL_INPUT=true
ENABLE_MULTI_USER_SESSIONS=true
ENABLE_OFFLINE_MODE=true
ENABLE_ANALYTICS=true
ENABLE_ERROR_REPORTING=true
ENABLE_PUSH_NOTIFICATIONS=true
ENABLE_IN_APP_PURCHASES=false
ENABLE_DEEP_LINKING=true
```

### 3.2. Babel Configuration

Set up `react-native-dotenv` in `babel.config.js` to properly load environment variables:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true
      }],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@api': './src/api',
            '@components': './src/components',
            '@contexts': './src/contexts',
            '@hooks': './src/hooks',
            '@lib': './src/lib',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@services': './src/services',
            '@store': './src/store',
            '@types': './src/types',
            '@utils': './src/utils',
            '@assets': './assets'
          }
        }
      ]
    ]
  };
};
```

### 3.3. TypeScript Configuration

Create a `tsconfig.json` file with proper path aliases and strict type checking:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@api/*": ["src/api/*"],
      "@components/*": ["src/components/*"],
      "@contexts/*": ["src/contexts/*"],
      "@hooks/*": ["src/hooks/*"],
      "@lib/*": ["src/lib/*"],
      "@navigation/*": ["src/navigation/*"],
      "@screens/*": ["src/screens/*"],
      "@services/*": ["src/services/*"],
      "@store/*": ["src/store/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"],
      "@assets/*": ["assets/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

### 3.4. Environment Utilities

Create a utility file at `src/utils/env.ts` to safely access environment variables:

```typescript
import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  ELEVENLABS_API_KEY,
  ELEVENLABS_DEFAULT_VOICE_ID,
  GOOGLE_GENAI_API_KEY,
  GOOGLE_GENAI_DEFAULT_MODEL,
  GOOGLE_GENAI_TEXT_MODEL,
  GOOGLE_GENAI_VISION_MODEL,
  GOOGLE_GENAI_THINKING_MODEL,
  APP_ENV,
  APP_VERSION,
  // Import other environment variables
} from '@env';

// Environment type
export type Environment = 'development' | 'staging' | 'production';

// Environment configuration
export const env = {
  // App
  appEnv: (APP_ENV || 'development') as Environment,
  appVersion: APP_VERSION || '0.1.0',
  isDev: (APP_ENV || 'development') === 'development',
  isStaging: (APP_ENV || 'development') === 'staging',
  isProd: (APP_ENV || 'development') === 'production',
  
  // Supabase
  supabaseUrl: SUPABASE_URL || '',
  supabaseAnonKey: SUPABASE_ANON_KEY || '',
  
  // ElevenLabs
  elevenLabsApiKey: ELEVENLABS_API_KEY || '',
  elevenLabsDefaultVoiceId: ELEVENLABS_DEFAULT_VOICE_ID || '',
  
  // Google GenAI (Configurable Models)
  googleGenAiApiKey: GOOGLE_GENAI_API_KEY || '',
  googleGenAiDefaultModel: GOOGLE_GENAI_DEFAULT_MODEL || '',
  googleGenAiTextModel: GOOGLE_GENAI_TEXT_MODEL || '',
  googleGenAiVisionModel: GOOGLE_GENAI_VISION_MODEL || '',
  googleGenAiThinkingModel: GOOGLE_GENAI_THINKING_MODEL || '',
  
  // Feature flags
  enableVoiceStreaming: process.env.ENABLE_VOICE_STREAMING === 'true',
  enableMultimodalInput: process.env.ENABLE_MULTIMODAL_INPUT === 'true',
  enableMultiUserSessions: process.env.ENABLE_MULTI_USER_SESSIONS === 'true',
  enableOfflineMode: process.env.ENABLE_OFFLINE_MODE === 'true',
  
  // Helper function to validate required environment variables
  validate: () => {
    const required = [
      { key: 'SUPABASE_URL', value: SUPABASE_URL },
      { key: 'SUPABASE_ANON_KEY', value: SUPABASE_ANON_KEY },
      { key: 'ELEVENLABS_API_KEY', value: ELEVENLABS_API_KEY },
      { key: 'GOOGLE_GENAI_API_KEY', value: GOOGLE_GENAI_API_KEY },
    ];
    
    const missing = required.filter(({ value }) => !value);
    
    if (missing.length > 0) {
      console.error(
        `Missing required environment variables: ${missing.map(({ key }) => key).join(', ')}`
      );
      return false;
    }
    
    return true;
  }
};

// Validate environment variables in development
if (env.isDev) {
  env.validate();
}
```
```

## 4. ElevenLabs Integration with Expo React Native

Based on the [ElevenLabs Expo React Native documentation](https://elevenlabs.io/docs/cookbooks/conversational-ai/expo-react-native), implement the following core components for multiple AI agent voice synthesis:

### 4.1. Voice Service Setup

Create a comprehensive voice service in `src/services/voice/elevenLabsService.ts` that implements the ElevenLabs integration for multiple AI agents:

```typescript
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { env } from '@utils/env';
import { EventEmitter } from 'events';

// Voice settings types
export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}

// Voice response type
interface VoiceResponse {
  audioUrl?: string;
  error?: string;
}

// Voice event types
export enum VoiceEvent {
  START = 'voice_start',
  STOP = 'voice_stop',
  ERROR = 'voice_error',
  FINISH = 'voice_finish',
}

// Voice emotion types for AI agents
export enum VoiceEmotion {
  NEUTRAL = 'neutral',
  HAPPY = 'happy',
  SAD = 'sad',
  EXCITED = 'excited',
  CONCERNED = 'concerned',
  THOUGHTFUL = 'thoughtful',
  EMPATHETIC = 'empathetic',
  PROFESSIONAL = 'professional',
}

// Default voice settings
const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  stability: Number(env.elevenLabsStability) || 0.5,
  similarity_boost: Number(env.elevenLabsSimilarityBoost) || 0.75,
  style: Number(env.elevenLabsStyle) || 0.5,
  use_speaker_boost: env.elevenLabsUseSpeakerBoost !== 'false',
};

// Voice emotion settings map
const EMOTION_SETTINGS: Record<VoiceEmotion, Partial<VoiceSettings>> = {
  [VoiceEmotion.NEUTRAL]: { stability: 0.5, similarity_boost: 0.75, style: 0.5 },
  [VoiceEmotion.HAPPY]: { stability: 0.4, similarity_boost: 0.8, style: 0.7 },
  [VoiceEmotion.SAD]: { stability: 0.6, similarity_boost: 0.7, style: 0.3 },
  [VoiceEmotion.EXCITED]: { stability: 0.3, similarity_boost: 0.9, style: 0.8 },
  [VoiceEmotion.CONCERNED]: { stability: 0.6, similarity_boost: 0.6, style: 0.4 },
  [VoiceEmotion.THOUGHTFUL]: { stability: 0.7, similarity_boost: 0.6, style: 0.5 },
  [VoiceEmotion.EMPATHETIC]: { stability: 0.5, similarity_boost: 0.8, style: 0.6 },
  [VoiceEmotion.PROFESSIONAL]: { stability: 0.8, similarity_boost: 0.5, style: 0.3 },
};

// Create a singleton event emitter for voice events
export const voiceEventEmitter = new EventEmitter();

/**
 * Generates speech from text using ElevenLabs API
 */
export const generateSpeech = async (
  text: string,
  voiceId: string = env.elevenLabsDefaultVoiceId,
  voiceSettings: VoiceSettings = DEFAULT_VOICE_SETTINGS,
  emotion: VoiceEmotion = VoiceEmotion.NEUTRAL
): Promise<VoiceResponse> => {
  try {
    // Emit start event
    voiceEventEmitter.emit(VoiceEvent.START, { text });
    
    // Create a unique filename for this audio
    const fileName = `${Date.now()}.mp3`;
    const fileUri = `${FileSystem.cacheDirectory}elevenlabs_${fileName}`;
    
    // Apply emotion settings if provided
    const emotionSettings = EMOTION_SETTINGS[emotion] || {};
    const mergedSettings = { ...DEFAULT_VOICE_SETTINGS, ...emotionSettings, ...voiceSettings };
    
    // Prepare request to ElevenLabs API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': env.elevenLabsApiKey,
        },
        body: JSON.stringify({
          text,
          model_id: env.elevenLabsModelId || 'eleven_monolingual_v1',
          voice_settings: mergedSettings,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = `ElevenLabs API error: ${errorData.detail?.message || response.statusText}`;
      voiceEventEmitter.emit(VoiceEvent.ERROR, { error: errorMessage });
      throw new Error(errorMessage);
    }

    // Get the audio data as a blob
    const audioBlob = await response.blob();
    
    // Convert blob to base64
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          if (typeof reader.result === 'string') {
            // Extract the base64 data (remove the data URL prefix)
            const base64Data = reader.result.split(',')[1];
            
            // Write the file to the filesystem
            await FileSystem.writeAsStringAsync(fileUri, base64Data, {
              encoding: FileSystem.EncodingType.Base64,
            });
            
            resolve({ audioUrl: fileUri });
          } else {
            const error = new Error('Failed to convert audio to base64');
            voiceEventEmitter.emit(VoiceEvent.ERROR, { error: error.message });
            reject(error);
          }
        } catch (error) {
          voiceEventEmitter.emit(VoiceEvent.ERROR, { 
            error: error instanceof Error ? error.message : 'Unknown error' 
          });
          reject(error);
        }
      };
      
      reader.onerror = () => {
        const error = new Error('Failed to read audio blob');
        voiceEventEmitter.emit(VoiceEvent.ERROR, { error: error.message });
        reject(error);
      };
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    voiceEventEmitter.emit(VoiceEvent.ERROR, { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Plays audio from a file URI
 */
export const playAudio = async (fileUri: string): Promise<Audio.Sound> => {
  try {
    const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
    
    // Set up status monitoring
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        voiceEventEmitter.emit(VoiceEvent.FINISH);
        sound.unloadAsync();
      }
    });
    
    await sound.playAsync();
    return sound;
  } catch (error) {
    console.error('Error playing audio:', error);
    voiceEventEmitter.emit(VoiceEvent.ERROR, { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    throw error;
  }
};

/**
 * Speaks text using ElevenLabs and returns the sound object
 */
export const speakText = async (
  text: string,
  voiceId?: string,
  voiceSettings?: VoiceSettings,
  emotion: VoiceEmotion = VoiceEmotion.NEUTRAL
): Promise<Audio.Sound | null> => {
  try {
    const { audioUrl, error } = await generateSpeech(text, voiceId, voiceSettings, emotion);
    
    if (error || !audioUrl) {
      throw new Error(error || 'Failed to generate speech');
    }
    
    const sound = await playAudio(audioUrl);
    return sound;
  } catch (error) {
    console.error('Error speaking text:', error);
    voiceEventEmitter.emit(VoiceEvent.ERROR, { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    return null;
  }
};

/**
 * Stops currently playing audio
 */
export const stopSpeaking = async (sound: Audio.Sound | null): Promise<void> => {
  if (sound) {
    try {
      await sound.stopAsync();
      await sound.unloadAsync();
      voiceEventEmitter.emit(VoiceEvent.STOP);
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  }
};

/**
 * Gets available voices from ElevenLabs API
 */
export const getAvailableVoices = async () => {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': env.elevenLabsApiKey,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch voices: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.voices;
  } catch (error) {
    console.error('Error fetching voices:', error);
    throw error;
  }
};

/**
 * Gets voice settings for a specific emotion
 */
export const getVoiceSettingsForEmotion = (emotion: VoiceEmotion): VoiceSettings => {
  const emotionSettings = EMOTION_SETTINGS[emotion] || {};
  return { ...DEFAULT_VOICE_SETTINGS, ...emotionSettings };
};

/**
 * Streams text to speech for real-time conversation
 * Note: This requires the streaming API from ElevenLabs
 */
export const streamSpeech = async (
  text: string,
  voiceId: string = env.elevenLabsDefaultVoiceId,
  voiceSettings: VoiceSettings = DEFAULT_VOICE_SETTINGS,
  emotion: VoiceEmotion = VoiceEmotion.NEUTRAL
): Promise<void> => {
  if (!env.enableVoiceStreaming) {
    // Fall back to non-streaming version if streaming is disabled
    await speakText(text, voiceId, voiceSettings, emotion);
    return;
  }
  
  try {
    // Implementation of streaming would go here
    // This is a placeholder for the streaming implementation
    // which would use WebSockets or other streaming methods
    console.log('Streaming not yet implemented, falling back to regular speech');
    await speakText(text, voiceId, voiceSettings, emotion);
  } catch (error) {
    console.error('Error streaming speech:', error);
    voiceEventEmitter.emit(VoiceEvent.ERROR, { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};
```

### 4.2. Agent Voice Component

Create a specialized voice component for AI agents in `src/components/agents/AgentVoice.tsx`:

```typescript
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { speakText, stopSpeaking, VoiceEvent, VoiceEmotion, voiceEventEmitter } from '@services/voice/elevenLabsService';
import { useTheme } from 'react-native-paper';

interface AgentVoiceProps {
  agentId: string;
  agentName: string;
  text: string;
  voiceId?: string;
  autoPlay?: boolean;
  emotion?: VoiceEmotion;
  visualFeedback?: boolean;
  showControls?: boolean;
  onPlaybackStart?: () => void;
  onPlaybackComplete?: () => void;
  onError?: (error: string) => void;
  style?: any;
}

export const AgentVoice: React.FC<AgentVoiceProps> = ({
  agentId,
  agentName,
  text,
  voiceId,
  autoPlay = false,
  emotion = VoiceEmotion.NEUTRAL,
  visualFeedback = true,
  showControls = true,
  onPlaybackStart,
  onPlaybackComplete,
  onError,
  style,
}) => {
  const theme = useTheme();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const animationRef = useRef<LottieView>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animation for visual feedback
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.stopAnimation();
    Animated.timing(pulseAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Get animation source based on emotion and agent
  const getAnimationSource = () => {
    switch (emotion) {
      case VoiceEmotion.HAPPY:
        return require(`@assets/animations/${agentId}_happy.json`);
      case VoiceEmotion.SAD:
        return require(`@assets/animations/${agentId}_sad.json`);
      case VoiceEmotion.EXCITED:
        return require(`@assets/animations/${agentId}_excited.json`);
      case VoiceEmotion.CONCERNED:
        return require(`@assets/animations/${agentId}_concerned.json`);
      case VoiceEmotion.THOUGHTFUL:
        return require(`@assets/animations/${agentId}_thoughtful.json`);
      case VoiceEmotion.EMPATHETIC:
        return require(`@assets/animations/${agentId}_empathetic.json`);
      case VoiceEmotion.PROFESSIONAL:
        return require(`@assets/animations/${agentId}_professional.json`);
      case VoiceEmotion.NEUTRAL:
      default:
        return require(`@assets/animations/${agentId}_neutral.json`);
    }
  };

  // Set up event listeners
  useEffect(() => {
    const startListener = voiceEventEmitter.addListener(
      VoiceEvent.START,
      () => {
        setIsPlaying(true);
        setIsLoading(false);
        if (visualFeedback) {
          startPulseAnimation();
          if (animationRef.current) {
            animationRef.current.play();
          }
        }
        onPlaybackStart?.();
      }
    );

    const stopListener = voiceEventEmitter.addListener(
      VoiceEvent.STOP,
      () => {
        setIsPlaying(false);
        if (visualFeedback) {
          stopPulseAnimation();
          if (animationRef.current) {
            animationRef.current.pause();
          }
        }
      }
    );

    const finishListener = voiceEventEmitter.addListener(
      VoiceEvent.FINISH,
      () => {
        setIsPlaying(false);
        if (visualFeedback) {
          stopPulseAnimation();
          if (animationRef.current) {
            animationRef.current.pause();
          }
        }
        onPlaybackComplete?.();
      }
    );

    const errorListener = voiceEventEmitter.addListener(
      VoiceEvent.ERROR,
      (data) => {
        setIsLoading(false);
        setIsPlaying(false);
        setError(data.error);
        if (visualFeedback) {
          stopPulseAnimation();
          if (animationRef.current) {
            animationRef.current.pause();
          }
        }
        onError?.(data.error);
      }
    );

    return () => {
      startListener.remove();
      stopListener.remove();
      finishListener.remove();
      errorListener.remove();
    };
  }, [visualFeedback, onPlaybackStart, onPlaybackComplete, onError]);

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        stopSpeaking(sound);
      }
    };
  }, [sound]);

  // Auto-play if enabled
  useEffect(() => {
    if (autoPlay && text) {
      handlePlay();
    }
  }, [autoPlay, text]);

  const handlePlay = async () => {
    try {
      // If already playing, stop first
      if (sound) {
        await stopSpeaking(sound);
        setSound(null);
      }

      setIsLoading(true);
      setError(null);
      
      // Generate and play speech
      const newSound = await speakText(text, voiceId, undefined, emotion);
      
      if (newSound) {
        setSound(newSound);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setIsLoading(false);
      setIsPlaying(false);
      onError?.(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleStop = async () => {
    if (sound) {
      await stopSpeaking(sound);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {visualFeedback && (
        <Animated.View
          style={[
            styles.animationContainer,
            { transform: [{ scale: pulseAnim }] }
          ]}
        >
          <LottieView
            ref={animationRef}
            source={getAnimationSource()}
            style={styles.animation}
            loop={isPlaying}
            autoPlay={false}
          />
        </Animated.View>
      )}
      
      {showControls && (
        <View style={styles.controls}>
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.colors.primary} />
          ) : isPlaying ? (
            <TouchableOpacity onPress={handleStop} style={styles.button}>
              <Ionicons name="stop-circle" size={48} color={theme.colors.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handlePlay} style={styles.button}>
              <Ionicons name="play-circle" size={48} color={theme.colors.primary} />
            </TouchableOpacity>
          )}
        </View>
      )}
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  animationContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    fontSize: 12,
    textAlign: 'center',
  },
});
```

### 4.3. Agent Message Component

Create a component for displaying agent messages in `src/components/agents/AgentMessage.tsx`:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { AgentVoice } from './AgentVoice';
import { VoiceEmotion } from '@services/voice/elevenLabsService';

interface AgentMessageProps {
  agentId: string;
  agentName: string;
  message: string;
  emotion?: VoiceEmotion;
  autoPlay?: boolean;
  timestamp?: Date;
  onPlaybackComplete?: () => void;
}

export const AgentMessage: React.FC<AgentMessageProps> = ({
  agentId,
  agentName,
  message,
  emotion = VoiceEmotion.NEUTRAL,
  autoPlay = false,
  timestamp = new Date(),
  onPlaybackComplete,
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer }]}>
        <Card.Content>
          <Text style={[styles.message, { color: theme.colors.onPrimaryContainer }]}>
            {message}
          </Text>
          <Text style={styles.timestamp}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </Card.Content>
      </Card>
      
      <AgentVoice
        agentId={agentId}
        agentName={agentName}
        text={message}
        emotion={emotion}
        autoPlay={autoPlay}
        visualFeedback={true}
        showControls={true}
        onPlaybackComplete={onPlaybackComplete}
        style={styles.voicePlayer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: 'flex-start',
  },
  card: {
    width: '80%',
    borderRadius: 16,
  },
  message: {
    fontSize: 16,
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
    alignSelf: 'flex-end',
  },
  voicePlayer: {
    marginTop: 8,
  },
});
```

### 4.4. Multi-Agent Usage Examples

Here are examples of how to use the agent components with different AI agents:

#### Using with Udine (Default Agent)
```typescript
// Example usage with Udine
<AgentMessage
  agentId="udine"
  agentName="Udine"
  message="Hello! I'm Udine, your AI assistant. How can I help you today?"
  emotion={VoiceEmotion.HAPPY}
  autoPlay={true}
/>

<AgentVoice
  agentId="udine"
  agentName="Udine"
  text="I understand you're feeling frustrated. Let's work through this together."
  emotion={VoiceEmotion.EMPATHETIC}
  autoPlay={false}
  visualFeedback={true}
/>
```

#### Using with Other Agents
```typescript
// Example usage with Alex - a mediation specialist
<AgentMessage
  agentId="alex"
  agentName="Alex"
  message="Hi! I'm Alex, your AI mediator. Let's work through this conflict together."
  emotion={VoiceEmotion.EMPATHETIC}
  autoPlay={true}
/>

// Example usage with Maya - a coaching specialist
<AgentMessage
  agentId="maya"
  agentName="Maya"
  message="Hi there! I'm Maya, your personal coach. Ready to unlock your potential?"
  emotion={VoiceEmotion.EXCITED}
  autoPlay={true}
/>

// Example usage with Dr. Chen - a professional therapist agent
<AgentVoice
  agentId="dr_chen"
  agentName="Dr. Chen"
  text="Let's explore what's behind these feelings in a safe space."
  emotion={VoiceEmotion.PROFESSIONAL}
  autoPlay={false}
  visualFeedback={true}
/>
```

#### Agent Configuration Requirements
The unified agent system requires consistent configuration across all personalities:

**Visual Assets:**
- Animation files: `@assets/animations/{agentId}_{emotion}.json`
  - Example: `udine_happy.json`, `alex_empathetic.json`, `maya_excited.json`
- Avatar images: `@assets/images/agents/{agentId}_avatar.png`

**Voice Configuration:**
- Agent-specific voice IDs in ElevenLabs service
- Consistent voice settings across all agents for uniform quality
- Personality-appropriate voice characteristics (tone, pace, warmth)

**Personality Configuration:**
- Agent-specific system prompts defining personality traits
- Consistent core functionality with personality-specific language patterns
- Unified response templates with personality variations

**Technical Requirements:**
- Unique agent IDs for switching and configuration
- Consistent API interfaces across all agent personalities
- Shared conversation context and memory systems

### 4.5. Modern ElevenLabs Integration (2024 Approach)

Based on the latest ElevenLabs documentation, the recommended approach for cross-platform voice agents uses Expo DOM components. Create `src/components/ConversationalAI.tsx`:

```typescript
import { dom } from 'expo/dom';
import { useEffect, useRef } from 'react';

// Define the DOM component for ElevenLabs Conversational AI
const ConvAIDOMComponent = dom(({ 
  agentId, 
  platform, 
  onToolCall 
}: {
  agentId: string;
  platform: string;
  onToolCall: (toolName: string, args: any) => Promise<any>;
}) => {
  useEffect(() => {
    // Import ElevenLabs Conversational AI SDK
    import('@elevenlabs/conversational-ai').then(({ Conversation }) => {
      const conversation = new Conversation({
        agentId,
        onConnect: () => console.log('Connected to agent:', agentId),
        onDisconnect: () => console.log('Disconnected from agent:', agentId),
        onMessage: (message) => console.log('Agent message:', message),
        onError: (error) => console.error('Conversation error:', error),
      });

      // Start conversation with dynamic variables
      conversation.startSession({
        variables: {
          platform,
          agentPersonality: agentId,
        }
      });
    });
  }, [agentId, platform]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <div id="conversation-container" />
    </div>
  );
});

export default ConvAIDOMComponent;
```

### 4.6. Agent Switching Service

Create a unified agent service in `src/services/AgentService.ts`:

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Agent {
  id: string;
  name: string;
  personality: string;
  voiceId: string;
  avatar: string;
  description: string;
}

export const AVAILABLE_AGENTS: Agent[] = [
  {
    id: 'udine',
    name: 'Udine',
    personality: 'warm_supportive',
    voiceId: process.env.ELEVENLABS_UDINE_VOICE_ID!,
    avatar: require('@assets/images/agents/udine_avatar.png'),
    description: 'Warm, supportive, and approachable AI assistant'
  },
  {
    id: 'alex',
    name: 'Alex',
    personality: 'professional_mediator',
    voiceId: process.env.ELEVENLABS_ALEX_VOICE_ID!,
    avatar: require('@assets/images/agents/alex_avatar.png'),
    description: 'Professional mediation specialist'
  },
  {
    id: 'maya',
    name: 'Maya',
    personality: 'energetic_coach',
    voiceId: process.env.ELEVENLABS_MAYA_VOICE_ID!,
    avatar: require('@assets/images/agents/maya_avatar.png'),
    description: 'Energetic coaching specialist'
  },
  {
    id: 'dr_chen',
    name: 'Dr. Chen',
    personality: 'calm_therapeutic',
    voiceId: process.env.ELEVENLABS_DR_CHEN_VOICE_ID!,
    avatar: require('@assets/images/agents/dr_chen_avatar.png'),
    description: 'Calm, therapeutic professional'
  }
];

interface AgentStore {
  currentAgent: Agent;
  setCurrentAgent: (agent: Agent) => void;
  getAgentById: (id: string) => Agent | undefined;
}

export const useAgentStore = create<AgentStore>()(
  persist(
    (set, get) => ({
      currentAgent: AVAILABLE_AGENTS[0], // Default to Udine
      setCurrentAgent: (agent: Agent) => set({ currentAgent: agent }),
      getAgentById: (id: string) => AVAILABLE_AGENTS.find(agent => agent.id === id),
    }),
    {
      name: 'agent-storage',
    }
  )
);
```

### 4.7. Audio Permission Setup

Create an enhanced audio permission hook in `src/hooks/useAudioPermissions.ts` that handles all necessary permissions for voice interactions:

```typescript
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import * as Notifications from 'expo-notifications';

interface AudioPermissionsState {
  hasRecordingPermissions: boolean;
  hasMediaLibraryPermissions: boolean;
  hasNotificationPermissions: boolean;
  isAudioConfigured: boolean;
  isLoading: boolean;
  error: string | null;
}

export const useAudioPermissions = () => {
  const [state, setState] = useState<AudioPermissionsState>({
    hasRecordingPermissions: false,
    hasMediaLibraryPermissions: false,
    hasNotificationPermissions: false,
    isAudioConfigured: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        // Create audio cache directory if it doesn't exist
        const audioCacheDir = `${FileSystem.cacheDirectory}audio/`;
        const dirInfo = await FileSystem.getInfoAsync(audioCacheDir);
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(audioCacheDir);
        }
        
        // Request audio recording permissions
        const { granted: recordingGranted } = await Audio.requestPermissionsAsync();
        
        // Request media library permissions (for saving recordings)
        const { granted: mediaLibraryGranted } = await MediaLibrary.requestPermissionsAsync();
        
        // Request notification permissions (for audio playback controls)
        let notificationGranted = false;
        if (Platform.OS !== 'web') {
          const { granted } = await Notifications.requestPermissionsAsync({
            ios: {
              allowAlert: true,
              allowBadge: true,
              allowSound: true,
            },
          });
          notificationGranted = granted;
        }
        
        // Configure audio mode for optimal voice interaction
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
        });
        
        setState({
          hasRecordingPermissions: recordingGranted,
          hasMediaLibraryPermissions: mediaLibraryGranted,
          hasNotificationPermissions: notificationGranted,
          isAudioConfigured: true,
          isLoading: false,
          error: null,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to get audio permissions';
        console.error('Audio permissions error:', errorMessage);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      }
    };

    requestPermissions();
    
    // Cleanup function
    return () => {
      // Reset audio mode when component unmounts
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: false,
        staysActiveInBackground: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        shouldDuckAndroid: false,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_MIX_WITH_OTHERS,
        playThroughEarpieceAndroid: false,
      }).catch(err => console.error('Error resetting audio mode:', err));
    };
  }, []);

  // Helper function to request permissions again if needed
  const refreshPermissions = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { granted: recordingGranted } = await Audio.requestPermissionsAsync();
      const { granted: mediaLibraryGranted } = await MediaLibrary.requestPermissionsAsync();
      
      setState(prev => ({
        ...prev,
        hasRecordingPermissions: recordingGranted,
        hasMediaLibraryPermissions: mediaLibraryGranted,
        isLoading: false,
      }));
      
      return recordingGranted && mediaLibraryGranted;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to refresh permissions';
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return false;
    }
  };

  // Check if all required permissions are granted
  const hasAllRequiredPermissions = 
    state.hasRecordingPermissions && 
    state.isAudioConfigured;

  return {
    ...state,
    hasAllRequiredPermissions,
    refreshPermissions,
  };
};
```

## 5. Supabase Integration

### 5.1. Supabase Client Setup

Set up a comprehensive Supabase client with authentication, storage, and database access in `src/api/supabase/supabaseClient.ts`:

```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '@utils/env';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv';

// Create MMKV instance for high-performance storage
export const storage = new MMKV({
  id: 'supabase-storage',
  encryptionKey: 'supabase-storage-key',
});

// Storage adapter based on platform capabilities
const createStorageAdapter = () => {
  // Use SecureStore on native platforms when possible
  if (Platform.OS !== 'web') {
    // Check if keys are too large for SecureStore (which has a size limit)
    // If so, fall back to MMKV
    return {
      getItem: async (key: string): Promise<string | null> => {
        try {
          const value = await SecureStore.getItemAsync(key);
          return value;
        } catch (error) {
          // If the key is too large, try MMKV
          const mmkvValue = storage.getString(key);
          return mmkvValue || null;
        }
      },
      setItem: async (key: string, value: string): Promise<void> => {
        try {
          await SecureStore.setItemAsync(key, value);
        } catch (error) {
          // If the value is too large, use MMKV
          storage.set(key, value);
        }
      },
      removeItem: async (key: string): Promise<void> => {
        try {
          await SecureStore.deleteItemAsync(key);
        } catch (error) {
          storage.delete(key);
        }
      },
    };
  }

  // Use AsyncStorage for web
  return AsyncStorage;
};

// Initialize Supabase client
export const supabase: SupabaseClient = createClient(
  env.supabaseUrl,
  env.supabaseAnonKey,
  {
    auth: {
      storage: createStorageAdapter(),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

// Authentication helpers
export const authService = {
  /**
   * Sign up a new user with email and password
   */
  signUp: async (email: string, password: string, metadata = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    
    return { data, error };
  },

  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { data, error };
  },

  /**
   * Sign in with OAuth provider
   */
  signInWithOAuth: async (provider: 'google' | 'apple' | 'facebook') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'understandme://auth/callback',
      },
    });
    
    return { data, error };
  },

  /**
   * Sign out the current user
   */
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  /**
   * Reset password for a user
   */
  resetPassword: async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'understandme://auth/reset-password',
    });
    return { data, error };
  },

  /**
   * Update user password
   */
  updatePassword: async (password: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    return { data, error };
  },

  /**
   * Update user metadata
   */
  updateUserMetadata: async (metadata: Record<string, any>) => {
    const { data, error } = await supabase.auth.updateUser({
      data: metadata,
    });
    return { data, error };
  },

  /**
   * Get the current user
   */
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },

  /**
   * Get the current session
   */
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  /**
   * Refresh the session
   */
  refreshSession: async () => {
    const { data, error } = await supabase.auth.refreshSession();
    return { data, error };
  },
};

// Database helpers
export const dbService = {
  /**
   * Get user profile data
   */
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    return { data, error };
  },

  /**
   * Update user profile
   */
  updateUserProfile: async (userId: string, updates: Record<string, any>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Create a new session
   */
  createSession: async (sessionData: Record<string, any>) => {
    const { data, error } = await supabase
      .from('sessions')
      .insert(sessionData)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Get session by ID
   */
  getSessionById: async (sessionId: string) => {
    const { data, error } = await supabase
      .from('sessions')
      .select('*, participants(*)')
      .eq('id', sessionId)
      .single();
    
    return { data, error };
  },

  /**
   * Get user's sessions
   */
  getUserSessions: async (userId: string) => {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .or(`host_id.eq.${userId},participants.user_id.eq.${userId}`)
      .order('created_at', { ascending: false });
    
    return { data, error };
  },

  /**
   * Update session
   */
  updateSession: async (sessionId: string, updates: Record<string, any>) => {
    const { data, error } = await supabase
      .from('sessions')
      .update(updates)
      .eq('id', sessionId)
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Add participant to session
   */
  addParticipantToSession: async (sessionId: string, userId: string, role: string) => {
    const { data, error } = await supabase
      .from('participants')
      .insert({
        session_id: sessionId,
        user_id: userId,
        role,
      })
      .select()
      .single();
    
    return { data, error };
  },

  /**
   * Get session messages
   */
  getSessionMessages: async (sessionId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*, user:profiles(*)')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    
    return { data, error };
  },

  /**
   * Add message to session
   */
  addMessageToSession: async (sessionId: string, userId: string, content: string, type: string) => {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        session_id: sessionId,
        user_id: userId,
        content,
        type,
      })
      .select()
      .single();
    
    return { data, error };
  },
};

// Storage helpers
export const storageService = {
  /**
   * Upload file to Supabase Storage
   */
  uploadFile: async (bucket: string, path: string, file: Blob, options = {}) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
        ...options,
      });
    
    return { data, error };
  },

  /**
   * Download file from Supabase Storage
   */
  downloadFile: async (bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);
    
    return { data, error };
  },

  /**
   * Get public URL for a file
   */
  getPublicUrl: (bucket: string, path: string) => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);
    
    return data.publicUrl;
  },

  /**
   * Delete file from Supabase Storage
   */
  deleteFile: async (bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    return { data, error };
  },

  /**
   * List files in a bucket
   */
  listFiles: async (bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path);
    
    return { data, error };
  },
};

// Realtime helpers
export const realtimeService = {
  /**
   * Subscribe to table changes
   */
  subscribeToTable: (
    table: string,
    callback: (payload: any) => void,
    event: 'INSERT' | 'UPDATE' | 'DELETE' | '*' = '*',
    filter = ''
  ) => {
    const channel = supabase
      .channel(`table-changes-${table}`)
      .on(
        'postgres_changes',
        {
          event,
          schema: 'public',
          table,
          filter,
        },
        callback
      )
      .subscribe();
    
    return channel;
  },

  /**
   * Subscribe to session messages
   */
  subscribeToSessionMessages: (sessionId: string, callback: (payload: any) => void) => {
    return realtimeService.subscribeToTable(
      'messages',
      callback,
      'INSERT',
      `session_id=eq.${sessionId}`
    );
  },

  /**
   * Subscribe to session updates
   */
  subscribeToSessionUpdates: (sessionId: string, callback: (payload: any) => void) => {
    return realtimeService.subscribeToTable(
      'sessions',
      callback,
      'UPDATE',
      `id=eq.${sessionId}`
    );
  },

  /**
   * Subscribe to participant updates
   */
  subscribeToParticipantUpdates: (sessionId: string, callback: (payload: any) => void) => {
    return realtimeService.subscribeToTable(
      'participants',
      callback,
      '*',
      `session_id=eq.${sessionId}`
    );
  },
};
```

## 6. Google GenAI Integration

### 6.1. Google GenAI Client Setup

Set up a comprehensive Google GenAI client for the multimodal LLM analysis engine in `src/api/genai/genaiClient.ts`:

```typescript
import { 
  GoogleGenAI, 
  HarmCategory, 
  HarmBlockThreshold,
  Content,
  Part,
  FunctionDeclaration,
  Type
} from '@google/genai';
import { env } from '@utils/env';
import * as FileSystem from 'expo-file-system';

// Initialize the Google GenAI client (new SDK)
const ai = new GoogleGenAI({
  apiKey: env.googleGenAiApiKey,
  apiVersion: 'v1beta' // Use beta for latest Gemini 2.0 features
});

// Safety settings for content generation
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// Default generation config
const defaultGenerationConfig = {
  temperature: Number(env.googleGenAiTemperature) || 0.7,
  topK: Number(env.googleGenAiTopK) || 40,
  topP: Number(env.googleGenAiTopP) || 0.95,
  maxOutputTokens: Number(env.googleGenAiMaxOutputTokens) || 1024,
};

// Model types (configurable via environment)
export enum ModelType {
  TEXT = 'TEXT',
  VISION = 'VISION', 
  THINKING = 'THINKING',
}

// Model mapping from environment variables
const getModelName = (modelType: ModelType): string => {
  switch (modelType) {
    case ModelType.TEXT:
      return env.googleGenAiTextModel || 'gemini-2.0-flash-exp';
    case ModelType.VISION:
      return env.googleGenAiVisionModel || 'gemini-2.0-flash-exp';
    case ModelType.THINKING:
      return env.googleGenAiThinkingModel || 'gemini-2.0-flash-thinking-exp';
    default:
      return env.googleGenAiDefaultModel || 'gemini-2.0-flash-exp';
  }
};

// Response types
export interface GenAIResponse<T> {
  data: T | null;
  error: string | null;
}

// Chat history type
export interface ChatMessage {
  role: 'user' | 'model';
  parts: string | Part[];
}

// File type for multimodal input
export interface FileData {
  uri: string;
  mimeType: string;
}

/**
 * Generate content configuration helper (v1.6.0 API)
 */
const getGenerationConfig = (modelType: ModelType = ModelType.TEXT, options = {}) => {
  return {
    model: getModelName(modelType),
    generationConfig: {
      ...defaultGenerationConfig,
      ...options,
    },
    safetySettings,
  };
};

/**
 * Convert a file to a base64 data URI
 */
const fileToGenerativePart = async (file: FileData): Promise<Part> => {
  try {
    // Read the file as base64
    const base64 = await FileSystem.readAsStringAsync(file.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    
    // Create the data URI
    const dataUri = `data:${file.mimeType};base64,${base64}`;
    
    return {
      inlineData: {
        data: base64,
        mimeType: file.mimeType,
      },
    };
  } catch (error) {
    console.error('Error converting file to generative part:', error);
    throw error;
  }
};

/**
 * Generate text response using Google GenAI (v1.6.0 API)
 */
export const generateText = async (
  prompt: string,
  options = {}
): Promise<GenAIResponse<string>> => {
  try {
    // Get generation configuration
    const config = getGenerationConfig(ModelType.TEXT, options);

    // Generate content using v1.6.0 API pattern
    const response = await ai.models.generateContent({
      model: config.model,
      contents: prompt,
      generationConfig: config.generationConfig,
      safetySettings: config.safetySettings,
    });
    
    return { data: response.text, error: null };
  } catch (error) {
    console.error('Error generating text:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error generating text' 
    };
  }
};

/**
 * Generate multimodal response using Google GenAI (v1.6.0 API)
 */
export const generateMultimodalResponse = async (
  textPrompt: string,
  files: FileData[],
  options = {}
): Promise<GenAIResponse<string>> => {
  try {
    // Get generation configuration for multimodal
    const config = getGenerationConfig(ModelType.VISION, options);
    
    // Convert files to generative parts
    const fileParts: Part[] = await Promise.all(
      files.map(file => fileToGenerativePart(file))
    );
    
    // Create content parts with text and files
    const parts: Part[] = [
      { text: textPrompt },
      ...fileParts,
    ];
    
    // Generate content using v1.6.0 API pattern
    const response = await ai.models.generateContent({
      model: config.model,
      contents: parts,
      generationConfig: config.generationConfig,
      safetySettings: config.safetySettings,
    });
    
    return { data: response.text, error: null };
  } catch (error) {
    console.error('Error generating multimodal response:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error generating multimodal response' 
    };
  }
};

/**
 * Generate streaming text response using Google GenAI (v1.6.0 API)
 */
export const generateTextStream = async function* (
  prompt: string,
  options = {}
): AsyncGenerator<string, void, unknown> {
  try {
    // Get generation configuration
    const config = getGenerationConfig(ModelType.TEXT, options);

    // Generate content stream using v1.6.0 API pattern
    const response = await ai.models.generateContentStream({
      model: config.model,
      contents: prompt,
      generationConfig: config.generationConfig,
      safetySettings: config.safetySettings,
    });
    
    // Yield chunks as they arrive
    for await (const chunk of response) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error('Error generating text stream:', error);
    throw error;
  }
};

/**
 * Start a chat session with Google GenAI (v1.6.0 API)
 */
export const createChatSession = (
  history: ChatMessage[] = [],
  options = {}
): GenAIResponse<any> => {
  try {
    // Get generation configuration
    const config = getGenerationConfig(ModelType.TEXT, options);

    // Convert history to the format expected by the API
    const formattedHistory = history.map(message => ({
      role: message.role,
      parts: typeof message.parts === 'string' ? [{ text: message.parts }] : message.parts,
    }));

    // Create a chat session using v1.6.0 API pattern
    const chat = ai.chats.create({
      model: config.model,
      history: formattedHistory,
      generationConfig: config.generationConfig,
      safetySettings: config.safetySettings,
    });
    
    return { data: chat, error: null };
  } catch (error) {
    console.error('Error creating chat session:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error creating chat' 
    };
  }
};

/**
 * Send a message to an existing chat session
 */
export const sendMessageToChat = async (
  chat: ChatSession,
  message: string | Part[]
): Promise<GenAIResponse<string>> => {
  try {
    const result = await chat.sendMessage(message);
    const response = result.response;
    const text = response.text();
    
    return { data: text, error: null };
  } catch (error) {
    console.error('Error sending message to chat:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error sending message' 
    };
  }
};

/**
 * Stream a response from Google GenAI
 */
export const streamGenerateContent = async (
  prompt: string,
  onStream: (text: string) => void,
  onComplete: (fullText: string) => void,
  onError: (error: string) => void,
  options = {}
): Promise<void> => {
  try {
    // Get the Gemini Pro model
    const model = getModel(ModelType.TEXT, options);
    
    // Generate content with streaming
    const result = await model.generateContentStream(prompt);
    
    let fullText = '';
    
    // Process the stream
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      fullText += chunkText;
      onStream(chunkText);
    }
    
    // Call the complete callback with the full text
    onComplete(fullText);
  } catch (error) {
    console.error('Error streaming content:', error);
    onError(error instanceof Error ? error.message : 'Unknown error streaming content');
  }
};

/**
 * Analyze emotion from text
 */
export const analyzeEmotion = async (text: string): Promise<GenAIResponse<any>> => {
  try {
    const prompt = `
      Analyze the emotional content of the following text and return a JSON object with:
      1. The primary emotion (anger, fear, joy, sadness, surprise, disgust, trust, anticipation)
      2. The intensity of the emotion on a scale of 1-10
      3. Any secondary emotions detected
      4. Key phrases that indicate the emotional state
      
      Text to analyze: "${text}"
      
      Return only the JSON object without any additional text.
    `;
    
    const { data, error } = await generateText(prompt, { temperature: 0.1 });
    
    if (error || !data) {
      return { data: null, error: error || 'Failed to analyze emotion' };
    }
    
    // Parse the JSON response
    try {
      const jsonData = JSON.parse(data);
      return { data: jsonData, error: null };
    } catch (parseError) {
      return { 
        data: null, 
        error: 'Failed to parse emotion analysis result' 
      };
    }
  } catch (error) {
    console.error('Error analyzing emotion:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error analyzing emotion' 
    };
  }
};

/**
 * Analyze conflict patterns in a conversation
 */
export const analyzeConflictPatterns = async (
  conversation: string[]
): Promise<GenAIResponse<any>> => {
  try {
    const conversationText = conversation.join('\n');
    
    const prompt = `
      Analyze the following conversation for conflict patterns and return a JSON object with:
      1. Identified conflict patterns (criticism, contempt, defensiveness, stonewalling)
      2. Communication breakdowns and their causes
      3. Potential resolution pathways
      4. Key phrases that escalated or de-escalated the conflict
      
      Conversation:
      ${conversationText}
      
      Return only the JSON object without any additional text.
    `;
    
    const { data, error } = await generateText(prompt, { temperature: 0.2 });
    
    if (error || !data) {
      return { data: null, error: error || 'Failed to analyze conflict patterns' };
    }
    
    // Parse the JSON response
    try {
      const jsonData = JSON.parse(data);
      return { data: jsonData, error: null };
    } catch (parseError) {
      return { 
        data: null, 
        error: 'Failed to parse conflict analysis result' 
      };
    }
  } catch (error) {
    console.error('Error analyzing conflict patterns:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error analyzing conflict patterns' 
    };
  }
};

/**
 * Generate a session summary
 */
export const generateSessionSummary = async (
  sessionTranscript: string,
  sessionMetadata: any
): Promise<GenAIResponse<any>> => {
  try {
    const prompt = `
      Generate a comprehensive summary of the following mediation session:
      
      Session Type: ${sessionMetadata.type}
      Duration: ${sessionMetadata.duration} minutes
      Participants: ${sessionMetadata.participants.join(', ')}
      
      Transcript:
      ${sessionTranscript}
      
      Please include:
      1. Key points discussed
      2. Areas of agreement and disagreement
      3. Action items and next steps
      4. Emotional dynamics observed
      5. Progress made towards resolution
      
      Format the response as a JSON object with these sections.
    `;
    
    const { data, error } = await generateText(prompt, { temperature: 0.3 });
    
    if (error || !data) {
      return { data: null, error: error || 'Failed to generate session summary' };
    }
    
    // Parse the JSON response
    try {
      const jsonData = JSON.parse(data);
      return { data: jsonData, error: null };
    } catch (parseError) {
      // If JSON parsing fails, return the text as is
      return { data: { summary: data }, error: null };
    }
  } catch (error) {
    console.error('Error generating session summary:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error generating session summary' 
    };
  }
};

/**
 * Generate a response for Alex based on conversation context
 */
export const generateAlexResponse = async (
  userMessage: string,
  conversationHistory: ChatMessage[],
  sessionContext: any,
  emotionalState: any
): Promise<GenAIResponse<string>> => {
  try {
    // Create a chat session with the conversation history
    const { data: chat, error: chatError } = createChatSession(conversationHistory);
    
    if (chatError || !chat) {
      return { data: null, error: chatError || 'Failed to create chat session' };
    }
    
    // Create a system prompt with context
    const systemPrompt = `
      You are Alex, an AI mediator and communication facilitator in the Understand.me application.
      Current session type: ${sessionContext.type}
      Current phase: ${sessionContext.phase}
      Emotional state detected: ${JSON.stringify(emotionalState)}
      
      Your role is to:
      1. Facilitate clear communication
      2. Identify underlying needs and interests
      3. Help parties find common ground
      4. Maintain a calm, empathetic tone
      5. Guide the conversation towards productive outcomes
      
      Respond to the user's message in a natural, conversational way that advances the mediation process.
    `;
    
    // Send the system prompt and user message to the chat
    const { data: response, error: responseError } = await sendMessageToChat(
      chat,
      [
        { text: systemPrompt },
        { text: userMessage }
      ]
    );
    
    if (responseError || !response) {
      return { data: null, error: responseError || 'Failed to generate Alex response' };
    }
    
    return { data: response, error: null };
  } catch (error) {
    console.error('Error generating Alex response:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error generating Alex response' 
    };
  }
};

// Export the main client for direct access if needed
export const genaiClient = {
  genAI,
  getModel,
};
```

## 7. Authentication and Session Management

### 7.1. Authentication Context

Create a comprehensive authentication context in `src/contexts/auth/AuthContext.tsx`:

```typescript
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, authService, dbService } from '@api/supabase/supabaseClient';
import { storage } from '@api/supabase/supabaseClient';
import * as SecureStore from 'expo-secure-store';
import { Alert, Platform } from 'react-native';

// Auth state type
export type AuthState = {
  user: User | null;
  session: Session | null;
  profile: any | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isNewUser: boolean;
  error: string | null;
};

// Auth context type
interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{ error: any, isNewUser: boolean }>;
  signOut: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (password: string) => Promise<{ error: any }>;
  signInWithOAuth: (provider: 'google' | 'apple' | 'facebook') => Promise<{ error: any }>;
  updateProfile: (data: any) => Promise<{ error: any }>;
  refreshSession: () => Promise<{ error: any }>;
  clearError: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial auth state
const initialState: AuthState = {
  user: null,
  session: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  isNewUser: false,
  error: null,
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Load user profile
  const loadUserProfile = useCallback(async (userId: string) => {
    try {
      const { data: profile, error } = await dbService.getUserProfile(userId);
      
      if (error) {
        console.error('Error loading user profile:', error);
        return null;
      }
      
      return profile;
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      return null;
    }
  }, []);

  // Update auth state
  const updateAuthState = useCallback(async (session: Session | null) => {
    try {
      if (!session) {
        setState({
          user: null,
          session: null,
          profile: null,
          isLoading: false,
          isAuthenticated: false,
          isNewUser: false,
          error: null,
        });
        return;
      }
      
      const user = session.user;
      const profile = await loadUserProfile(user.id);
      const isNewUser = !profile;
      
      setState({
        user,
        session,
        profile,
        isLoading: false,
        isAuthenticated: true,
        isNewUser,
        error: null,
      });
      
      // If new user, create profile
      if (isNewUser) {
        await dbService.updateUserProfile(user.id, {
          id: user.id,
          email: user.email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Error updating auth state:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error updating auth state',
      }));
    }
  }, [loadUserProfile]);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true }));
        
        // Check for existing session
        const { session, error } = await authService.getSession();
        
        if (error) {
          throw error;
        }
        
        await updateAuthState(session);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown error initializing auth',
        }));
      }
    };

    initializeAuth();
  }, [updateAuthState]);

  // Set up auth state change listener
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          await updateAuthState(newSession);
        } else if (event === 'SIGNED_OUT') {
          setState({
            user: null,
            session: null,
            profile: null,
            isLoading: false,
            isAuthenticated: false,
            isNewUser: false,
            error: null,
          });
          
          // Clear local storage on sign out
          if (Platform.OS !== 'web') {
            try {
              await SecureStore.deleteItemAsync('supabase-auth');
              storage.clearAll();
            } catch (error) {
              console.error('Error clearing storage on sign out:', error);
            }
          }
        }
      }
    );

    // Clean up subscription
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [updateAuthState]);

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { data, error } = await authService.signIn(email, password);
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error };
      }
      
      await updateAuthState(data.session);
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error signing in';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  };

  // Sign up
  const signUp = async (email: string, password: string, metadata = {}) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { data, error } = await authService.signUp(email, password, metadata);
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error, isNewUser: false };
      }
      
      // If email confirmation is required
      if (!data.session) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false,
          error: null,
        }));
        return { error: null, isNewUser: true };
      }
      
      await updateAuthState(data.session);
      return { error: null, isNewUser: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error signing up';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage, isNewUser: false };
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { error } = await authService.signOut();
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error };
      }
      
      setState({
        user: null,
        session: null,
        profile: null,
        isLoading: false,
        isAuthenticated: false,
        isNewUser: false,
        error: null,
      });
      
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error signing out';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { error } = await authService.resetPassword(email);
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error ? error.message : null 
      }));
      
      return { error };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error resetting password';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  };

  // Update password
  const updatePassword = async (password: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { error } = await authService.updatePassword(password);
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error ? error.message : null 
      }));
      
      return { error };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error updating password';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  };

  // Sign in with OAuth
  const signInWithOAuth = async (provider: 'google' | 'apple' | 'facebook') => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { data, error } = await authService.signInWithOAuth(provider);
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error };
      }
      
      // OAuth sign-in is handled by the auth state change listener
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
      }));
      
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error signing in with OAuth';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  };

  // Update profile
  const updateProfile = async (data: any) => {
    try {
      if (!state.user) {
        return { error: 'User not authenticated' };
      }
      
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { error } = await dbService.updateUserProfile(state.user.id, {
        ...data,
        updated_at: new Date().toISOString(),
      });
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error };
      }
      
      // Reload profile
      const profile = await loadUserProfile(state.user.id);
      
      setState(prev => ({ 
        ...prev, 
        profile,
        isLoading: false,
        error: null,
      }));
      
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error updating profile';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  };

  // Refresh session
  const refreshSession = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { data, error } = await authService.refreshSession();
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error };
      }
      
      await updateAuthState(data.session);
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error refreshing session';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  };

  // Context value
  const value = {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    signInWithOAuth,
    updateProfile,
    refreshSession,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

### 7.2. Session Context

Create a session management context in `src/contexts/session/SessionContext.tsx`:

```typescript
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useAuth } from '@contexts/auth/AuthContext';
import { dbService, realtimeService } from '@api/supabase/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

// Session phase enum
export enum SessionPhase {
  PREPARATION = 'preparation',
  INTRODUCTION = 'introduction',
  EXPLORATION = 'exploration',
  NEGOTIATION = 'negotiation',
  RESOLUTION = 'resolution',
  FOLLOW_UP = 'follow_up',
}

// Session type enum
export enum SessionType {
  PERSONAL_REFLECTION = 'personal_reflection',
  SKILL_DEVELOPMENT = 'skill_development',
  ONE_ON_ONE = 'one_on_one',
  GROUP = 'group',
  TEAM = 'team',
}

// Session state type
export type SessionState = {
  currentSession: any | null;
  sessions: any[];
  participants: any[];
  messages: any[];
  currentPhase: SessionPhase;
  isLoading: boolean;
  isActive: boolean;
  error: string | null;
};

// Session context type
interface SessionContextType extends SessionState {
  createSession: (data: any) => Promise<{ sessionId: string | null, error: any }>;
  joinSession: (sessionId: string) => Promise<{ error: any }>;
  leaveSession: () => Promise<{ error: any }>;
  updateSession: (sessionId: string, updates: any) => Promise<{ error: any }>;
  sendMessage: (content: string, type: string) => Promise<{ messageId: string | null, error: any }>;
  loadUserSessions: () => Promise<{ error: any }>;
  setCurrentPhase: (phase: SessionPhase) => void;
  clearError: () => void;
}

// Create the session context
const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Initial session state
const initialState: SessionState = {
  currentSession: null,
  sessions: [],
  participants: [],
  messages: [],
  currentPhase: SessionPhase.PREPARATION,
  isLoading: false,
  isActive: false,
  error: null,
};

// Session provider component
export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [state, setState] = useState<SessionState>(initialState);
  const [subscriptions, setSubscriptions] = useState<RealtimeChannel[]>([]);

  // Clear error
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  // Set current phase
  const setCurrentPhase = useCallback((phase: SessionPhase) => {
    setState(prev => ({ ...prev, currentPhase: phase }));
    
    // If in an active session, update the session phase
    if (state.currentSession) {
      dbService.updateSession(state.currentSession.id, { current_phase: phase })
        .catch(error => console.error('Error updating session phase:', error));
    }
  }, [state.currentSession]);

  // Load user sessions
  const loadUserSessions = useCallback(async () => {
    if (!user) {
      return { error: 'User not authenticated' };
    }
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { data, error } = await dbService.getUserSessions(user.id);
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error };
      }
      
      setState(prev => ({ 
        ...prev, 
        sessions: data || [],
        isLoading: false,
      }));
      
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error loading sessions';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  }, [user]);

  // Create session
  const createSession = async (data: any) => {
    if (!user) {
      return { sessionId: null, error: 'User not authenticated' };
    }
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const sessionData = {
        ...data,
        host_id: user.id,
        current_phase: SessionPhase.PREPARATION,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      const { data: session, error } = await dbService.createSession(sessionData);
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { sessionId: null, error };
      }
      
      // Add host as participant
      await dbService.addParticipantToSession(session.id, user.id, 'host');
      
      // Set as current session
      await joinSession(session.id);
      
      return { sessionId: session.id, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error creating session';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { sessionId: null, error: errorMessage };
    }
  };

  // Join session
  const joinSession = async (sessionId: string) => {
    if (!user) {
      return { error: 'User not authenticated' };
    }
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Get session details
      const { data: session, error: sessionError } = await dbService.getSessionById(sessionId);
      
      if (sessionError || !session) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: sessionError?.message || 'Session not found' 
        }));
        return { error: sessionError || new Error('Session not found') };
      }
      
      // Get session messages
      const { data: messages, error: messagesError } = await dbService.getSessionMessages(sessionId);
      
      if (messagesError) {
        console.error('Error loading session messages:', messagesError);
      }
      
      // Check if user is already a participant
      const isParticipant = session.participants?.some((p: any) => p.user_id === user.id);
      
      if (!isParticipant) {
        // Add user as participant
        await dbService.addParticipantToSession(sessionId, user.id, 'participant');
      }
      
      // Set up realtime subscriptions
      const messagesSub = realtimeService.subscribeToSessionMessages(
        sessionId,
        (payload) => {
          const newMessage = payload.new;
          setState(prev => ({
            ...prev,
            messages: [...prev.messages, newMessage],
          }));
        }
      );
      
      const sessionSub = realtimeService.subscribeToSessionUpdates(
        sessionId,
        (payload) => {
          const updatedSession = payload.new;
          setState(prev => ({
            ...prev,
            currentSession: updatedSession,
            currentPhase: updatedSession.current_phase,
          }));
        }
      );
      
      const participantsSub = realtimeService.subscribeToParticipantUpdates(
        sessionId,
        async () => {
          // Reload session to get updated participants
          const { data: refreshedSession } = await dbService.getSessionById(sessionId);
          if (refreshedSession) {
            setState(prev => ({
              ...prev,
              participants: refreshedSession.participants || [],
            }));
          }
        }
      );
      
      setSubscriptions([messagesSub, sessionSub, participantsSub]);
      
      setState(prev => ({ 
        ...prev, 
        currentSession: session,
        participants: session.participants || [],
        messages: messages || [],
        currentPhase: session.current_phase || SessionPhase.PREPARATION,
        isLoading: false,
        isActive: true,
        error: null,
      }));
      
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error joining session';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  };

  // Leave session
  const leaveSession = async () => {
    try {
      // Unsubscribe from all channels
      subscriptions.forEach(sub => sub.unsubscribe());
      setSubscriptions([]);
      
      setState(prev => ({
        ...prev,
        currentSession: null,
        participants: [],
        messages: [],
        currentPhase: SessionPhase.PREPARATION,
        isActive: false,
      }));
      
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error leaving session';
      setState(prev => ({ 
        ...prev, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  };

  // Update session
  const updateSession = async (sessionId: string, updates: any) => {
    if (!user) {
      return { error: 'User not authenticated' };
    }
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { error } = await dbService.updateSession(sessionId, {
        ...updates,
        updated_at: new Date().toISOString(),
      });
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { error };
      }
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
      }));
      
      return { error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error updating session';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { error: errorMessage };
    }
  };

  // Send message
  const sendMessage = async (content: string, type: string = 'text') => {
    if (!user || !state.currentSession) {
      return { messageId: null, error: 'No active session' };
    }
    
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      const { data, error } = await dbService.addMessageToSession(
        state.currentSession.id,
        user.id,
        content,
        type
      );
      
      if (error) {
        setState(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: error.message 
        }));
        return { messageId: null, error };
      }
      
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
      }));
      
      return { messageId: data?.id || null, error: null };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error sending message';
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: errorMessage 
      }));
      return { messageId: null, error: errorMessage };
    }
  };

  // Load user sessions on auth change
  useEffect(() => {
    if (isAuthenticated) {
      loadUserSessions();
    } else {
      setState(initialState);
    }
  }, [isAuthenticated, loadUserSessions]);

  // Clean up subscriptions on unmount
  useEffect(() => {
    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [subscriptions]);

  // Context value
  const value = {
    ...state,
    createSession,
    joinSession,
    leaveSession,
    updateSession,
    sendMessage,
    loadUserSessions,
    setCurrentPhase,
    clearError,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

// Session hook
export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
```

## 8. Navigation Setup

Set up the navigation structure in `src/navigation/index.tsx`:

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

// Import screens
// Onboarding screens
import LandingScreen from '../screens/onboarding/LandingScreen';
import ValuePropositionScreen from '../screens/onboarding/ValuePropositionScreen';
import KeyFeaturesScreen from '../screens/onboarding/KeyFeaturesScreen';
import PersonalizationIntroScreen from '../screens/onboarding/PersonalizationIntroScreen';

// Auth screens
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Main app screens
import PersonalityAssessmentScreen from '../screens/onboarding/PersonalityAssessmentScreen';
import TutorialScreen from '../screens/onboarding/TutorialScreen';
import HomeScreen from '../screens/session/HomeScreen';
import NewSessionScreen from '../screens/session/NewSessionScreen';
import SessionDetailScreen from '../screens/session/SessionDetailScreen';
import ProfileScreen from '../screens/settings/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

// Define navigation types
type OnboardingStackParamList = {
  Landing: undefined;
  ValueProposition: undefined;
  KeyFeatures: undefined;
  PersonalizationIntro: undefined;
};

type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

type MainStackParamList = {
  PersonalityAssessment: undefined;
  Tutorial: undefined;
  MainTabs: undefined;
  SessionDetail: { sessionId: string };
  NewSession: undefined;
};

type MainTabsParamList = {
  Home: undefined;
  NewSession: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Create the navigators
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<MainStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabsParamList>();

// Onboarding navigator
const OnboardingNavigator = () => (
  <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
    <OnboardingStack.Screen name="Landing" component={LandingScreen} />
    <OnboardingStack.Screen name="ValueProposition" component={ValuePropositionScreen} />
    <OnboardingStack.Screen name="KeyFeatures" component={KeyFeaturesScreen} />
    <OnboardingStack.Screen name="PersonalizationIntro" component={PersonalizationIntroScreen} />
  </OnboardingStack.Navigator>
);

// Auth navigator
const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

// Main tabs navigator
const MainTabsNavigator = () => (
  <MainTabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'NewSession') {
          iconName = focused ? 'add-circle' : 'add-circle-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        }

        return <Ionicons name={iconName as any} size={size} color={color} />;
      },
    })}
  >
    <MainTabs.Screen name="Home" component={HomeScreen} />
    <MainTabs.Screen name="NewSession" component={NewSessionScreen} />
    <MainTabs.Screen name="Profile" component={ProfileScreen} />
    <MainTabs.Screen name="Settings" component={SettingsScreen} />
  </MainTabs.Navigator>
);

// Main navigator
const MainNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="PersonalityAssessment" component={PersonalityAssessmentScreen} />
    <MainStack.Screen name="Tutorial" component={TutorialScreen} />
    <MainStack.Screen name="MainTabs" component={MainTabsNavigator} />
    <MainStack.Screen name="SessionDetail" component={SessionDetailScreen} />
    <MainStack.Screen name="NewSession" component={NewSessionScreen} />
  </MainStack.Navigator>
);

// Root navigator
export const RootNavigator = () => {
  const { user, isLoading } = useAuth();
  
  // Show loading screen if auth state is being determined
  if (isLoading) {
    return null; // Or a loading screen component
  }

  return (
    <NavigationContainer>
      {user ? <MainNavigator /> : <OnboardingNavigator />}
    </NavigationContainer>
  );
};
```

## 9. App Entry Point

Set up the main App.tsx file:

```typescript
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { RootNavigator } from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootNavigator />
        <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
```

## 10. Expo Configuration

Configure app.json for Expo:

```json
{
  "expo": {
    "name": "Understand.me",
    "slug": "understand-me",
    "version": "0.1.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.understandme",
      "infoPlist": {
        "NSMicrophoneUsageDescription": "This app uses the microphone to record your voice for conversation analysis and mediation.",
        "NSCameraUsageDescription": "This app uses the camera to capture visual cues for enhanced communication analysis."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourcompany.understandme",
      "permissions": [
        "RECORD_AUDIO",
        "CAMERA"
      ]
    },
    "web": {
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      [
        "expo-av",
        {
          "microphonePermission": "Allow Understand.me to access your microphone."
        }
      ]
    ]
  }
}
```

## 11. EAS Build Configuration

Set up eas.json for Expo Application Services:

```json
{
  "cli": {
    "version": ">= 5.9.1"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "APP_ENV": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "APP_ENV": "staging"
      }
    },
    "production": {
      "env": {
        "APP_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

## 12. Placeholder Components

Create placeholder components for each screen to establish the basic structure. For example, create `src/screens/onboarding/LandingScreen.tsx`:

```typescript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProps = NativeStackNavigationProp<any>;

const LandingScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../assets/images/logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
      
      <View style={styles.heroSection}>
        <Text style={styles.headline}>Unlock Clearer Communication</Text>
        <Text style={styles.subheadline}>
          AI-powered mediation to help you understand and be understood.
        </Text>
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('ValueProposition')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.secondaryButtonText}>Skip to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    width: '100%',
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subheadline: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
    paddingHorizontal: 20,
  },
  primaryButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 10,
  },
  secondaryButtonText: {
    color: '#4A90E2',
    fontSize: 14,
  },
});

export default LandingScreen;
```

## 13. Development Workflow

### 13.1. Initial Setup

1. Clone the boilerplate repository
2. Install dependencies: `npm install` or `yarn install`
3. Create a `.env` file with the required environment variables
4. Start the development server: `npx expo start`

### 13.2. Development Commands

- Start development server: `npx expo start`
- Start with clear cache: `npx expo start -c`
- Run on iOS simulator: `npx expo run:ios`
- Run on Android emulator: `npx expo run:android`
- Build preview: `eas build --profile preview`
- Build production: `eas build --profile production`

### 13.3. Testing

- Run tests: `npm test` or `yarn test`
- Run tests with coverage: `npm test -- --coverage`

## 14. Modern Implementation Patterns (2024 Updates)

### 14.1. Supabase Real-Time Integration

Based on 2024 best practices, implement real-time features using Supabase's enhanced real-time capabilities:

```typescript
// src/hooks/useRealtimeSession.ts
import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export const useRealtimeSession = (sessionId: string) => {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const sessionChannel = supabase
      .channel(`session:${sessionId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `session_id=eq.${sessionId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new]);
      })
      .on('presence', { event: 'sync' }, () => {
        console.log('Participants synced');
      })
      .subscribe();

    setChannel(sessionChannel);

    return () => {
      sessionChannel.unsubscribe();
    };
  }, [sessionId]);

  return { messages, channel };
};
```

### 14.2. Enhanced Security Patterns

Implement Row Level Security (RLS) with agent-aware policies:

```sql
-- Enable RLS on sessions table
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Policy for user access to their own sessions
CREATE POLICY "Users can access their own sessions" ON sessions
  FOR ALL USING (
    auth.uid() = host_id OR 
    auth.uid() IN (
      SELECT user_id FROM participants 
      WHERE session_id = sessions.id
    )
  );

-- Policy for agent context access
CREATE POLICY "Agent context access" ON agent_contexts
  FOR ALL USING (
    auth.uid() = user_id AND
    agent_id IN ('udine', 'alex', 'maya', 'dr_chen')
  );
```

## 15. Next Steps for AI Implementation

After setting up this boilerplate, the AI agent (e.g., bolt.new) should focus on:

1. **Modern UI Components** - Implement components using React Native Paper with agent-aware theming
2. **Gemini 2.0 Integration** - Develop conversation analysis using the latest multimodal capabilities
3. **Cross-Platform Voice** - Implement ElevenLabs DOM components for unified voice experience
4. **Agent Switching Logic** - Build seamless agent personality switching with context preservation
5. **Real-Time Features** - Implement Supabase real-time subscriptions for live sessions
6. **Security Implementation** - Set up RLS policies and secure API key management
7. **Multimodal Processing** - Add image, document, and voice input processing
8. **Offline Capabilities** - Implement MMKV-based offline storage and sync
9. **Performance Optimization** - Add caching layers and optimize for mobile performance
10. **Analytics Integration** - Implement privacy-compliant usage analytics

## 16. Conclusion

This comprehensive boilerplate setup guide provides a modern, research-backed foundation for building the Understand.me application. Updated with 2024 best practices, it establishes a robust architecture that supports:

**Unified Multi-Agent System**: All agents (Udine, Alex, Maya, Dr. Chen) share the same core functionality while offering distinct personalities, ensuring consistent behavior with personalized experiences.

**Modern Technology Integration**: 
- ElevenLabs DOM components for cross-platform voice synthesis
- Gemini 2.0 for advanced multimodal AI processing  
- Supabase real-time features with enhanced security
- Expo's latest cross-platform capabilities

**Scalable Architecture**: The modular design supports easy agent switching, personality customization, and future expansion while maintaining code quality and developer productivity.

**Production-Ready Security**: Comprehensive environment configuration, Row Level Security policies, and secure API key management ensure enterprise-grade security from day one.

This foundation enables AI development tools to focus on implementing core functionality rather than infrastructure setup, accelerating the development of sophisticated AI-mediated communication experiences across iOS, Android, and web platforms.
