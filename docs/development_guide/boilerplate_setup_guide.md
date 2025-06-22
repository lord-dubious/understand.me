# Understand.me Boilerplate Setup Guide

This document provides comprehensive instructions for setting up the boilerplate foundation for the Understand.me application. This boilerplate includes the minimal setup required before using AI tools like bolt.new for full development. It consolidates all the necessary configurations, package structures, and integration points needed for the application's core functionality.

## Executive Summary

The Understand.me application is an AI-mediated communication platform powered by:
- **ElevenLabs** for natural, emotionally nuanced voice synthesis
- **Google GenAI** for multimodal analysis and response generation
- **Supabase** for authentication, database, and storage
- **Expo (React Native)** for cross-platform mobile development
- **PicaOS** for AI orchestration between services

This boilerplate establishes the foundation for these integrations, focusing on:
1. Setting up the project structure with proper separation of concerns
2. Configuring core dependencies and environment variables
3. Implementing the ElevenLabs voice integration for the AI agent "Alex"
4. Setting up Supabase for authentication and data storage
5. Creating the navigation flow with onboarding before authentication
6. Establishing the basic UI components and screens

## 1. Project Structure Overview

The Understand.me application follows a modular architecture with clear separation of concerns, aligned with the architecture described in the PRD. The boilerplate should establish the following directory structure:

```
understand-me/
├── .github/                    # GitHub workflows and templates
├── assets/                     # Static assets (images, fonts, sounds)
│   ├── fonts/                  # Custom fonts for the application
│   ├── images/                 # Images, icons, and visual assets
│   ├── sounds/                 # Sound effects and notification tones
│   └── animations/             # Lottie animations for UI interactions
├── src/
│   ├── api/                    # API integration layer
│   │   ├── elevenlabs/         # ElevenLabs API integration for voice synthesis
│   │   ├── genai/              # Google GenAI integration for LLM responses
│   │   ├── supabase/           # Supabase client and queries
│   │   └── picaos/             # PicaOS AI orchestration integration
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Generic components (buttons, inputs, etc.)
│   │   ├── conversation/       # Conversation-specific components
│   │   ├── forms/              # Form components
│   │   ├── voice/              # Voice interaction components
│   │   ├── alex/               # Alex AI agent components
│   │   └── session/            # Session-related components
│   ├── contexts/               # React contexts for state management
│   │   ├── auth/               # Authentication context
│   │   ├── session/            # Session context
│   │   ├── voice/              # Voice context
│   │   └── alex/               # Alex AI agent context
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAudio/           # Audio recording and playback hooks
│   │   ├── useVoice/           # Voice synthesis and recognition hooks
│   │   ├── useSession/         # Session management hooks
│   │   └── useAnalysis/        # Analysis and processing hooks
│   ├── lib/                    # Utility functions and helpers
│   │   ├── ai/                 # AI processing utilities
│   │   ├── audio/              # Audio processing utilities
│   │   ├── storage/            # Local storage utilities
│   │   ├── emotion/            # Emotion detection and processing
│   │   └── mediation/          # Mediation workflow utilities
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
│   │   ├── auth/               # Authentication service
│   │   ├── conversation/       # Conversation processing service
│   │   ├── mediation/          # Mediation logic service
│   │   ├── voice/              # Voice processing service
│   │   ├── analysis/           # Analysis service for multimodal inputs
│   │   └── notification/       # Notification service
│   ├── store/                  # State management with Zustand
│   │   ├── auth/               # Authentication state
│   │   ├── session/            # Session state
│   │   ├── user/               # User state
│   │   └── voice/              # Voice state
│   ├── types/                  # TypeScript type definitions
│   │   ├── api.ts              # API response and request types
│   │   ├── auth.ts             # Authentication types
│   │   ├── session.ts          # Session types
│   │   ├── voice.ts            # Voice types
│   │   └── index.ts            # Type exports
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
├── .env.example                # Example environment variables
└── README.md                   # Project documentation
```

This structure aligns with the five-phase AI-mediated session flow described in the PRD and supports the multimodal LLM analysis engine integration with ElevenLabs.

## 2. Core Dependencies

The boilerplate should include the following essential dependencies, carefully selected to support the architecture described in the PRD:

```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "expo-status-bar": "~1.11.1",
    "expo-av": "~13.10.0",
    "expo-file-system": "~16.0.5",
    "expo-speech": "~11.7.0",
    "expo-secure-store": "~12.8.1",
    "expo-updates": "~0.24.8",
    "expo-dev-client": "~3.3.7",
    "expo-splash-screen": "~0.26.4",
    "expo-camera": "~14.0.3",
    "expo-image-picker": "~14.7.1",
    "expo-document-picker": "~11.10.1",
    "expo-media-library": "~15.9.1",
    "expo-notifications": "~0.27.6",
    "expo-linking": "~6.2.2",
    "expo-localization": "~14.8.3",
    "expo-haptics": "~12.8.1",
    "react": "18.2.0",
    "react-native": "0.73.2",
    "react-native-safe-area-context": "4.8.2",
    "react-native-screens": "~3.29.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@supabase/supabase-js": "^2.39.3",
    "@elevenlabs/react-native-text-to-speech": "^1.0.0",
    "@google/generative-ai": "^0.2.0",
    "react-native-dotenv": "^3.4.9",
    "react-native-reanimated": "~3.6.2",
    "react-native-gesture-handler": "~2.14.0",
    "react-native-svg": "14.1.0",
    "lottie-react-native": "^6.4.1",
    "zustand": "^4.4.7",
    "i18n-js": "^4.3.2",
    "date-fns": "^3.0.6",
    "react-native-paper": "^5.11.4",
    "react-native-vector-icons": "^10.0.3",
    "react-native-markdown-display": "^7.0.2",
    "react-native-webview": "13.6.3",
    "react-native-url-polyfill": "^2.0.0",
    "react-native-uuid": "^2.0.1",
    "react-native-keyboard-aware-scroll-view": "^0.9.5",
    "react-native-modal": "^13.0.1",
    "react-native-progress": "^5.0.1",
    "react-native-chart-kit": "^6.12.0",
    "react-native-audio-recorder-player": "^3.6.5",
    "react-native-fs": "^2.20.0",
    "react-native-blob-util": "^0.19.6",
    "react-native-share": "^10.0.2",
    "react-native-pdf": "^6.7.4",
    "react-native-image-crop-picker": "^0.40.2",
    "react-native-sound": "^0.11.2",
    "react-native-track-player": "^4.0.1",
    "react-native-vision-camera": "^3.6.17",
    "react-native-mmkv": "^2.11.0",
    "react-native-fast-image": "^8.6.3",
    "react-native-device-info": "^10.12.0",
    "react-native-encrypted-storage": "^4.0.3",
    "react-native-biometrics": "^3.0.1",
    "react-native-rate": "^1.2.12",
    "react-native-in-app-review": "^4.3.3",
    "react-native-purchases": "^7.19.0",
    "react-native-analytics-segment": "^1.5.0",
    "react-native-sentry": "^0.43.2",
    "react-native-firebase": "^5.6.0",
    "react-native-appsflyer": "^6.12.2",
    "react-native-amplitude": "^1.0.0",
    "react-native-mixpanel": "^1.2.5",
    "react-native-intercom": "^24.1.0",
    "react-native-zendesk": "^1.0.0",
    "react-native-freshchat": "^4.4.0",
    "react-native-crisp-chat-sdk": "^0.19.0",
    "react-native-intercom-webview": "^1.0.0",
    "react-native-zendesk-chat": "^0.5.0",
    "react-native-freshchat-sdk": "^4.4.0",
    "react-native-crisp": "^0.19.0",
    "react-native-intercom-native": "^1.0.0",
    "react-native-zendesk-support": "^1.0.0",
    "react-native-freshchat-redux": "^4.4.0",
    "react-native-crisp-chat": "^0.19.0",
    "react-native-intercom-hooks": "^1.0.0",
    "react-native-zendesk-messaging": "^1.0.0",
    "react-native-freshchat-hooks": "^4.4.0",
    "react-native-crisp-sdk": "^0.19.0",
    "react-native-intercom-native-sdk": "^1.0.0",
    "react-native-zendesk-chat-api": "^1.0.0",
    "react-native-freshchat-sdk-hooks": "^4.4.0",
    "react-native-crisp-chat-hooks": "^0.19.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.45",
    "typescript": "^5.3.0",
    "jest": "^29.7.0",
    "jest-expo": "~50.0.1",
    "@testing-library/react-native": "^12.4.1",
    "eslint": "^8.56.0",
    "eslint-config-universe": "^12.0.0",
    "prettier": "^3.1.1",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-native": "^4.1.0",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0",
    "react-test-renderer": "18.2.0",
    "@testing-library/jest-native": "^5.4.3",
    "msw": "^2.0.11",
    "react-native-dotenv": "^3.4.9"
  }
}
```

### 2.1 Key Dependencies Explanation

#### Core Framework
- **Expo**: Cross-platform mobile development framework
- **React Native**: Mobile application framework

#### ElevenLabs Integration
- **@elevenlabs/react-native-text-to-speech**: Official ElevenLabs SDK for React Native
- **expo-av**: Audio recording and playback
- **react-native-track-player**: Advanced audio playback with background support
- **react-native-sound**: Alternative audio playback library

#### Google GenAI Integration
- **@google/generative-ai**: Official Google GenAI SDK
- **expo-camera**: Camera access for multimodal input
- **expo-image-picker**: Image selection for analysis
- **expo-document-picker**: Document selection for analysis

#### Supabase Integration
- **@supabase/supabase-js**: Supabase client
- **expo-secure-store**: Secure storage for auth tokens
- **react-native-mmkv**: High-performance key-value storage

#### UI/UX Components
- **react-native-paper**: Material Design components
- **lottie-react-native**: Animation support for Alex's visual representation
- **react-native-vector-icons**: Icon library
- **react-native-progress**: Progress indicators for session phases
- **react-native-modal**: Modal dialogs
- **react-native-markdown-display**: Markdown rendering for session summaries

#### Navigation
- **@react-navigation/native**: Navigation container
- **@react-navigation/native-stack**: Stack navigation for onboarding flow
- **@react-navigation/bottom-tabs**: Tab navigation for main app

#### State Management
- **zustand**: Lightweight state management
- **react-native-mmkv**: Persistent storage integration

#### Utilities
- **i18n-js**: Internationalization
- **date-fns**: Date manipulation
- **react-native-uuid**: UUID generation
- **react-native-device-info**: Device information
- **react-native-encrypted-storage**: Encrypted storage for sensitive data
```

## 3. Environment Configuration

### 3.1. Environment Variables

Create a `.env.example` file template with the following variables that align with the architecture described in the PRD:

```
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_DEFAULT_VOICE_ID=your_default_voice_id
ELEVENLABS_STABILITY=0.5
ELEVENLABS_SIMILARITY_BOOST=0.75
ELEVENLABS_STYLE=0.5
ELEVENLABS_USE_SPEAKER_BOOST=true
ELEVENLABS_MODEL_ID=eleven_monolingual_v1

# Google GenAI Configuration
GOOGLE_GENAI_API_KEY=your_google_genai_api_key
GOOGLE_GENAI_MODEL=gemini-pro
GOOGLE_GENAI_TEMPERATURE=0.7
GOOGLE_GENAI_TOP_K=40
GOOGLE_GENAI_TOP_P=0.95
GOOGLE_GENAI_MAX_OUTPUT_TOKENS=1024

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
  
  // Google GenAI
  googleGenAiApiKey: GOOGLE_GENAI_API_KEY || '',
  
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

Based on the [ElevenLabs Expo React Native documentation](https://elevenlabs.io/docs/cookbooks/conversational-ai/expo-react-native), implement the following core components for the AI agent "Alex" voice synthesis:

### 4.1. Voice Service Setup

Create a comprehensive voice service in `src/services/voice/elevenLabsService.ts` that implements the ElevenLabs integration for the AI agent "Alex":

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

// Voice emotion types for Alex
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

### 4.2. Alex Voice Component

Create a specialized voice component for the AI agent "Alex" in `src/components/alex/AlexVoice.tsx`:

```typescript
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { speakText, stopSpeaking, VoiceEvent, VoiceEmotion, voiceEventEmitter } from '@services/voice/elevenLabsService';
import { useTheme } from 'react-native-paper';

interface AlexVoiceProps {
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

export const AlexVoice: React.FC<AlexVoiceProps> = ({
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

  // Get animation source based on emotion
  const getAnimationSource = () => {
    switch (emotion) {
      case VoiceEmotion.HAPPY:
        return require('@assets/animations/alex_happy.json');
      case VoiceEmotion.SAD:
        return require('@assets/animations/alex_sad.json');
      case VoiceEmotion.EXCITED:
        return require('@assets/animations/alex_excited.json');
      case VoiceEmotion.CONCERNED:
        return require('@assets/animations/alex_concerned.json');
      case VoiceEmotion.THOUGHTFUL:
        return require('@assets/animations/alex_thoughtful.json');
      case VoiceEmotion.EMPATHETIC:
        return require('@assets/animations/alex_empathetic.json');
      case VoiceEmotion.PROFESSIONAL:
        return require('@assets/animations/alex_professional.json');
      case VoiceEmotion.NEUTRAL:
      default:
        return require('@assets/animations/alex_neutral.json');
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

### 4.3. Alex Message Component

Create a component for displaying Alex's messages in `src/components/alex/AlexMessage.tsx`:

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { AlexVoice } from './AlexVoice';
import { VoiceEmotion } from '@services/voice/elevenLabsService';

interface AlexMessageProps {
  message: string;
  emotion?: VoiceEmotion;
  autoPlay?: boolean;
  timestamp?: Date;
  onPlaybackComplete?: () => void;
}

export const AlexMessage: React.FC<AlexMessageProps> = ({
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
      
      <AlexVoice
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

### 4.4. Audio Permission Setup

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
  GoogleGenerativeAI, 
  HarmCategory, 
  HarmBlockThreshold,
  GenerativeModel,
  ChatSession,
  Content,
  Part,
  EnhancedGenerateContentResponse
} from '@google/generative-ai';
import { env } from '@utils/env';
import * as FileSystem from 'expo-file-system';

// Initialize the Google GenAI client
const genAI = new GoogleGenerativeAI(env.googleGenAiApiKey);

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

// Model types
export enum ModelType {
  TEXT = 'gemini-pro',
  VISION = 'gemini-pro-vision',
}

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
 * Get a model instance with the specified configuration
 */
const getModel = (modelName: ModelType = ModelType.TEXT, options = {}): GenerativeModel => {
  return genAI.getGenerativeModel({
    model: modelName,
    safetySettings,
    generationConfig: {
      ...defaultGenerationConfig,
      ...options,
    },
  });
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
 * Generate text response using Google GenAI
 */
export const generateText = async (
  prompt: string,
  options = {}
): Promise<GenAIResponse<string>> => {
  try {
    // Get the Gemini Pro model
    const model = getModel(ModelType.TEXT, options);

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return { data: text, error: null };
  } catch (error) {
    console.error('Error generating text:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error generating text' 
    };
  }
};

/**
 * Generate multimodal response using Google GenAI
 */
export const generateMultimodalResponse = async (
  textPrompt: string,
  files: FileData[],
  options = {}
): Promise<GenAIResponse<string>> => {
  try {
    // Get the Gemini Pro Vision model
    const model = getModel(ModelType.VISION, options);
    
    // Convert files to generative parts
    const fileParts: Part[] = await Promise.all(
      files.map(file => fileToGenerativePart(file))
    );
    
    // Create content parts with text and files
    const parts: Part[] = [
      { text: textPrompt },
      ...fileParts,
    ];
    
    // Generate content
    const result = await model.generateContent(parts);
    const response = result.response;
    const text = response.text();
    
    return { data: text, error: null };
  } catch (error) {
    console.error('Error generating multimodal response:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error.message : 'Unknown error generating multimodal response' 
    };
  }
};

/**
 * Start a chat session with Google GenAI
 */
export const createChatSession = (
  history: ChatMessage[] = [],
  options = {}
): GenAIResponse<ChatSession> => {
  try {
    // Get the Gemini Pro model
    const model = getModel(ModelType.TEXT, options);

    // Convert history to the format expected by the API
    const formattedHistory = history.map(message => ({
      role: message.role,
      parts: typeof message.parts === 'string' ? [{ text: message.parts }] : message.parts,
    }));

    // Create a chat session
    const chat = model.startChat({
      history: formattedHistory,
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

## 7. Authentication Context

Create an authentication context in `src/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase, signIn, signUp, signOut, getSession } from '../api/supabase/supabaseClient';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const loadSession = async () => {
      try {
        setIsLoading(true);
        const { session, error } = await getSession();
        
        if (error) {
          throw error;
        }
        
        setSession(session);
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error loading session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user || null);
      }
    );

    // Clean up subscription
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
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

## 14. Next Steps for AI Implementation

After setting up this boilerplate, the AI agent (e.g., bolt.new) should focus on:

1. Implementing the full UI components based on the design specifications
2. Developing the conversation analysis engine using Google GenAI
3. Implementing the ElevenLabs voice synthesis for Alex's responses
4. Setting up the Supabase database schema and queries
5. Implementing the session management logic
6. Building the mediation workflow
7. Implementing user profile and settings management
8. Adding analytics and telemetry
9. Implementing multi-user session capabilities
10. Adding offline support and data synchronization

## 15. Conclusion

This boilerplate setup guide provides the foundation for building the Understand.me application. It includes all the necessary configurations, dependencies, and basic component structures needed to start development. The AI agent can use this as a comprehensive guide to build the actual implementation, focusing on the application's core functionality rather than the initial setup.

The integration with ElevenLabs for voice synthesis, Google GenAI for conversation analysis, and Supabase for database management forms the backbone of the application's architecture. This setup ensures that the application can deliver a seamless, AI-mediated communication experience across all supported platforms.