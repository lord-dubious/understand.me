# Understand.me Boilerplate Setup Guide

This document provides comprehensive instructions for setting up the boilerplate foundation for the Understand.me application. This boilerplate includes the minimal setup required before using AI tools like bolt.new for full development. It consolidates all the necessary configurations, package structures, and integration points needed for the application's core functionality.

## 1. Project Structure Overview

The Understand.me application follows a modular architecture with clear separation of concerns. The boilerplate should establish the following directory structure:

```
understand-me/
├── .github/                    # GitHub workflows and templates
├── assets/                     # Static assets (images, fonts, sounds)
│   ├── fonts/
│   ├── images/
│   └── sounds/
├── src/
│   ├── api/                    # API integration layer
│   │   ├── elevenlabs/         # ElevenLabs API integration
│   │   ├── genai/              # Google GenAI integration
│   │   └── supabase/           # Supabase client and queries
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Generic components
│   │   ├── conversation/       # Conversation-specific components
│   │   ├── forms/              # Form components
│   │   └── voice/              # Voice interaction components
│   ├── contexts/               # React contexts for state management
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions and helpers
│   │   ├── ai/                 # AI processing utilities
│   │   ├── audio/              # Audio processing utilities
│   │   └── storage/            # Local storage utilities
│   ├── navigation/             # React Navigation setup
│   ├── screens/                # Application screens
│   │   ├── auth/               # Authentication screens
│   │   ├── onboarding/         # Onboarding screens
│   │   ├── session/            # Session-related screens
│   │   └── settings/           # Settings screens
│   ├── services/               # Business logic services
│   │   ├── auth/               # Authentication service
│   │   ├── conversation/       # Conversation processing service
│   │   ├── mediation/          # Mediation logic service
│   │   └── voice/              # Voice processing service
│   ├── store/                  # State management (if using Redux)
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility functions
├── App.tsx                     # Main application component
├── app.json                    # Expo configuration
├── babel.config.js             # Babel configuration
├── eas.json                    # EAS Build configuration
├── metro.config.js             # Metro bundler configuration
├── package.json                # NPM dependencies
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Project documentation
```

## 2. Core Dependencies

The boilerplate should include the following essential dependencies:

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
    "zustand": "^4.4.7"
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
    "prettier": "^3.1.1"
  }
}
```

## 3. Environment Configuration

Create a `.env` file template with the following variables:

```
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_DEFAULT_VOICE_ID=your_default_voice_id

# Google GenAI Configuration
GOOGLE_GENAI_API_KEY=your_google_genai_api_key

# App Configuration
APP_ENV=development
APP_VERSION=0.1.0
```

Set up `react-native-dotenv` in `babel.config.js`:

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
      'react-native-reanimated/plugin'
    ]
  };
};
```

## 4. ElevenLabs Integration with Expo React Native

Based on the [ElevenLabs Expo React Native documentation](https://elevenlabs.io/docs/cookbooks/conversational-ai/expo-react-native), implement the following core components:

### 4.1. Voice Service Setup

Create a voice service in `src/services/voice/elevenLabsService.ts`:

```typescript
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { ELEVENLABS_API_KEY, ELEVENLABS_DEFAULT_VOICE_ID } from '@env';

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

// Default voice settings
const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.5,
  use_speaker_boost: true
};

/**
 * Generates speech from text using ElevenLabs API
 */
export const generateSpeech = async (
  text: string,
  voiceId: string = ELEVENLABS_DEFAULT_VOICE_ID,
  voiceSettings: VoiceSettings = DEFAULT_VOICE_SETTINGS
): Promise<VoiceResponse> => {
  try {
    // Create a unique filename for this audio
    const fileName = `${Date.now()}.mp3`;
    const fileUri = `${FileSystem.cacheDirectory}elevenlabs_${fileName}`;
    
    // Prepare request to ElevenLabs API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: voiceSettings,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`ElevenLabs API error: ${errorData.detail?.message || response.statusText}`);
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
            reject(new Error('Failed to convert audio to base64'));
          }
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read audio blob'));
      };
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Plays audio from a file URI
 */
export const playAudio = async (fileUri: string): Promise<void> => {
  try {
    const { sound } = await Audio.Sound.createAsync({ uri: fileUri });
    await sound.playAsync();
    
    // Clean up when playback finishes
    sound.setOnPlaybackStatusUpdate(status => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.error('Error playing audio:', error);
    throw error;
  }
};

/**
 * Speaks text using ElevenLabs and returns the sound object
 */
export const speakText = async (
  text: string,
  voiceId?: string,
  voiceSettings?: VoiceSettings
): Promise<Audio.Sound | null> => {
  try {
    const { audioUrl, error } = await generateSpeech(text, voiceId, voiceSettings);
    
    if (error || !audioUrl) {
      throw new Error(error || 'Failed to generate speech');
    }
    
    const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
    await sound.playAsync();
    
    return sound;
  } catch (error) {
    console.error('Error speaking text:', error);
    return null;
  }
};

/**
 * Gets available voices from ElevenLabs API
 */
export const getAvailableVoices = async () => {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
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
```

### 4.2. Voice Component

Create a reusable voice component in `src/components/voice/VoicePlayer.tsx`:

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { speakText } from '../../services/voice/elevenLabsService';

interface VoicePlayerProps {
  text: string;
  voiceId?: string;
  autoPlay?: boolean;
  onPlaybackStart?: () => void;
  onPlaybackComplete?: () => void;
}

export const VoicePlayer: React.FC<VoicePlayerProps> = ({
  text,
  voiceId,
  autoPlay = false,
  onPlaybackStart,
  onPlaybackComplete,
}) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
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
        await sound.unloadAsync();
        setSound(null);
      }

      setIsLoading(true);
      setError(null);
      
      // Notify start of playback
      onPlaybackStart?.();
      
      // Generate and play speech
      const newSound = await speakText(text, voiceId);
      
      if (newSound) {
        setSound(newSound);
        setIsPlaying(true);
        
        // Set up status monitoring
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
            onPlaybackComplete?.();
          }
        });
      } else {
        setError('Failed to generate speech');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#0066CC" />
      ) : isPlaying ? (
        <TouchableOpacity onPress={handleStop} style={styles.button}>
          <Ionicons name="stop" size={24} color="#0066CC" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handlePlay} style={styles.button}>
          <Ionicons name="play" size={24} color="#0066CC" />
        </TouchableOpacity>
      )}
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  button: {
    padding: 8,
  },
  errorText: {
    color: 'red',
    marginLeft: 8,
    fontSize: 12,
  },
});
```

### 4.3. Audio Permission Setup

Create an audio permission hook in `src/hooks/useAudioPermissions.ts`:

```typescript
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export const useAudioPermissions = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        setIsLoading(true);
        
        // Request audio recording permissions
        const { granted: recordingGranted } = await Audio.requestPermissionsAsync();
        
        // Check if cache directory exists and is writable
        const dirInfo = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + 'audio/');
        if (!dirInfo.exists) {
          await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + 'audio/');
        }
        
        // Configure audio mode for playback
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
        
        setHasPermissions(recordingGranted);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get audio permissions');
        setHasPermissions(false);
      } finally {
        setIsLoading(false);
      }
    };

    requestPermissions();
  }, []);

  return { hasPermissions, isLoading, error };
};
```

## 5. Supabase Integration

Set up Supabase client and authentication in `src/api/supabase/supabaseClient.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import * as SecureStore from 'expo-secure-store';

// SecureStore adapter for Supabase storage
const ExpoSecureStoreAdapter = {
  getItem: (key: string): Promise<string | null> => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string): Promise<void> => {
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string): Promise<void> => {
    return SecureStore.deleteItemAsync(key);
  },
};

// Initialize Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Authentication helpers
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  return { session, error };
};
```

## 6. Google GenAI Integration

Set up Google GenAI client in `src/api/genai/genaiClient.ts`:

```typescript
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { GOOGLE_GENAI_API_KEY } from '@env';

// Initialize the Google GenAI client
const genAI = new GoogleGenerativeAI(GOOGLE_GENAI_API_KEY);

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
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
};

/**
 * Generate text response using Google GenAI
 */
export const generateText = async (
  prompt: string,
  options = {}
) => {
  try {
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
      safetySettings,
      generationConfig: {
        ...defaultGenerationConfig,
        ...options,
      },
    });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    return { text, error: null };
  } catch (error) {
    console.error('Error generating text:', error);
    return { 
      text: null, 
      error: error instanceof Error ? error.message : 'Unknown error generating text' 
    };
  }
};

/**
 * Start a chat session with Google GenAI
 */
export const createChatSession = (history = [], options = {}) => {
  try {
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
      safetySettings,
      generationConfig: {
        ...defaultGenerationConfig,
        ...options,
      },
    });

    // Create a chat session
    const chat = model.startChat({
      history,
    });
    
    return { chat, error: null };
  } catch (error) {
    console.error('Error creating chat session:', error);
    return { 
      chat: null, 
      error: error instanceof Error ? error.message : 'Unknown error creating chat' 
    };
  }
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