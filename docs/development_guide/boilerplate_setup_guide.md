# Boilerplate Setup Guide

This guide provides step-by-step instructions for setting up the understand.me boilerplate with ElevenLabs integration, native functionality, and Supabase backend.

## 1. Prerequisites

Before starting, ensure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g @expo/cli`)
- ElevenLabs API key
- Supabase project credentials

## 2. Project Setup

### 2.1. Install Dependencies

```bash
npm install @supabase/supabase-js
npm install expo-secure-store
npm install react-native-mmkv
npm install @react-native-async-storage/async-storage
npm install expo-brightness
npm install expo-av
```

### 2.2. Environment Configuration

Create a `.env` file in your project root:

```env
ELEVENLABS_API_KEY=your_elevenlabs_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 3. ElevenLabs Integration

### 3.1. ConvAI Component

Create `src/components/ConvAI.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Conversation } from '@11labs/client';

interface ConvAIProps {
  agentId: string;
  platform: 'ios' | 'android' | 'web';
  onBrightnessChange?: (brightness: number) => void;
  onVolumeChange?: (volume: number) => void;
}

export const ConvAI: React.FC<ConvAIProps> = ({
  agentId,
  platform,
  onBrightnessChange,
  onVolumeChange,
}) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initializeConversation = async () => {
      try {
        const conv = await Conversation.startSession({
          agentId,
          clientTools: {
            setBrightness: {
              description: 'Set device brightness level',
              parameters: {
                type: 'object',
                properties: {
                  brightness: {
                    type: 'number',
                    description: 'Brightness level between 0 and 1',
                  },
                },
                required: ['brightness'],
              },
              handler: ({ brightness }: { brightness: number }) => {
                onBrightnessChange?.(brightness);
                return `Brightness set to ${Math.round(brightness * 100)}%`;
              },
            },
            setVolume: {
              description: 'Set device volume level',
              parameters: {
                type: 'object',
                properties: {
                  volume: {
                    type: 'number',
                    description: 'Volume level between 0 and 1',
                  },
                },
                required: ['volume'],
              },
              handler: ({ volume }: { volume: number }) => {
                onVolumeChange?.(volume);
                return `Volume set to ${Math.round(volume * 100)}%`;
              },
            },
          },
          overrides: {
            agent: {
              firstMessage: `Hello! I'm here to help you with your conversation on ${platform}. How can I assist you today?`,
            },
          },
        });

        setConversation(conv);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to initialize conversation:', error);
      }
    };

    initializeConversation();

    return () => {
      conversation?.endSession();
    };
  }, [agentId, platform]);

  return (
    <View style={styles.container}>
      <Text style={styles.status}>
        {isConnected ? 'Connected' : 'Connecting...'}
      </Text>
      {/* Add your conversation UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
```

### 3.2. Native Tools Implementation

Create `src/utils/tools.ts`:

```typescript
import * as Brightness from 'expo-brightness';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export const setBrightness = async (level: number): Promise<void> => {
  if (Platform.OS !== 'web') {
    try {
      await Brightness.setBrightnessAsync(level);
    } catch (error) {
      console.error('Failed to set brightness:', error);
    }
  }
};

export const setVolume = async (level: number): Promise<void> => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    
    // Note: Volume control varies by platform
    // This is a basic implementation
    console.log(`Setting volume to ${level}`);
  } catch (error) {
    console.error('Failed to set volume:', error);
  }
};
```

### 3.3. Prebuild Configuration

Add to your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": [
      "expo-brightness",
      "expo-av"
    ],
    "ios": {
      "infoPlist": {
        "NSMicrophoneUsageDescription": "This app needs access to microphone for voice conversations."
      }
    },
    "android": {
      "permissions": [
        "android.permission.RECORD_AUDIO",
        "android.permission.WRITE_SETTINGS"
      ]
    }
  }
}
```

## 4. Multi-Agent Usage Examples

Here are examples of how to use the agent components with different AI agents:

### 4.1. Using with Udine (Default Agent)

```typescript
// Example usage with Udine
<ConvAI
  agentId="udine-agent-id"
  platform={Platform.OS as 'ios' | 'android' | 'web'}
  onBrightnessChange={handleBrightnessChange}
  onVolumeChange={handleVolumeChange}
/>
```

### 4.2. Using with Alex (Mediator Agent)

```typescript
// Example usage with Alex
<ConvAI
  agentId="alex-agent-id"
  platform={Platform.OS as 'ios' | 'android' | 'web'}
  onBrightnessChange={handleBrightnessChange}
  onVolumeChange={handleVolumeChange}
/>
```

### 4.3. Using with Maya (Emotional Intelligence Agent)

```typescript
// Example usage with Maya
<ConvAI
  agentId="maya-agent-id"
  platform={Platform.OS as 'ios' | 'android' | 'web'}
  onBrightnessChange={handleBrightnessChange}
  onVolumeChange={handleVolumeChange}
/>
```

### 4.4. Using with Dr. Chen (Professional Counselor Agent)

```typescript
// Example usage with Dr. Chen
<ConvAI
  agentId="dr-chen-agent-id"
  platform={Platform.OS as 'ios' | 'android' | 'web'}
  onBrightnessChange={handleBrightnessChange}
  onVolumeChange={handleVolumeChange}
/>
```

### 4.5. ElevenLabs Agent Configuration

In your ElevenLabs dashboard:

1. **Create Conversational AI Agents** for each character:
   - **Udine**: Warm, supportive assistant voice
   - **Alex**: Professional, calm mediator voice  
   - **Maya**: Emotionally intelligent, empathetic voice
   - **Dr. Chen**: Authoritative, professional counselor voice

2. **Set First Message** with platform variable:
```
Hello! I'm [Agent Name] and I'm here to help you with your conversation on {{platform}}. How can I assist you today?
```

3. **Configure System Prompt** with platform awareness:
```
You are [Agent Name], an AI assistant specialized in [role]. You are currently running on {{platform}} platform. Adapt your responses accordingly and use the available client tools when appropriate.
```

4. **Add Client Tools** for each agent:
   - `setBrightness`: For adjusting device brightness
   - `setVolume`: For adjusting device volume

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
          // If the key is too large, use MMKV
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
  } else {
    // Web platform - use AsyncStorage
    return {
      getItem: async (key: string): Promise<string | null> => {
        return await AsyncStorage.getItem(key);
      },
      setItem: async (key: string, value: string): Promise<void> => {
        await AsyncStorage.setItem(key, value);
      },
      removeItem: async (key: string): Promise<void> => {
        await AsyncStorage.removeItem(key);
      },
    };
  }
};

// Initialize Supabase client
const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: createStorageAdapter(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper functions for common operations
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

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};
```

### 5.2. Database Schema

Create the following tables in your Supabase database:

```sql
-- Users table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Conversations table
CREATE TABLE public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  participants UUID[] NOT NULL,
  agent_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view conversations they participate in" ON public.conversations
  FOR SELECT USING (auth.uid() = ANY(participants));

CREATE POLICY "Users can view messages in their conversations" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.conversations 
      WHERE id = conversation_id 
      AND auth.uid() = ANY(participants)
    )
  );
```

## 6. Usage Examples

### 6.1. Basic Implementation

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import { ConvAI } from '@/components/ConvAI';
import { setBrightness, setVolume } from '@/utils/tools';
import { supabase, getCurrentUser } from '@/api/supabase/supabaseClient';

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState('udine-agent-id');

  useEffect(() => {
    // Check for existing session
    getCurrentUser().then(setUser);

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleBrightnessChange = async (brightness: number) => {
    await setBrightness(brightness);
  };

  const handleVolumeChange = async (volume: number) => {
    await setVolume(volume);
  };

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please sign in to continue</Text>
        {/* Add your authentication UI here */}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ConvAI
        agentId={selectedAgent}
        platform={Platform.OS as 'ios' | 'android' | 'web'}
        onBrightnessChange={handleBrightnessChange}
        onVolumeChange={handleVolumeChange}
      />
    </View>
  );
}
```

## 7. Development Tips

### 7.1. Testing on Different Platforms

- **iOS**: Use Expo Go app or build with `expo run:ios`
- **Android**: Use Expo Go app or build with `expo run:android`
- **Web**: Run with `expo start --web`

### 7.2. Debugging

- Enable remote debugging in Expo Dev Tools
- Use React Native Debugger for advanced debugging
- Check ElevenLabs dashboard for conversation logs
- Monitor Supabase logs for database operations

### 7.3. Performance Optimization

- Use MMKV for high-performance local storage
- Implement proper error handling for network operations
- Cache frequently accessed data
- Optimize audio streaming for better performance

## 8. Deployment

### 8.1. Build Configuration

Update your `app.json` for production:

```json
{
  "expo": {
    "name": "Understand.me",
    "slug": "understand-me",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.understandme"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yourcompany.understandme"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### 8.2. Environment Variables

Set up environment variables for production:

- `ELEVENLABS_API_KEY`: Your production ElevenLabs API key
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key

### 8.3. Build Commands

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for web
expo build:web
```

## 9. Troubleshooting

### 9.1. Common Issues

**ElevenLabs Connection Issues:**
- Verify API key is correct
- Check network connectivity
- Ensure agent ID exists in your ElevenLabs dashboard

**Supabase Authentication Issues:**
- Verify Supabase URL and keys
- Check RLS policies
- Ensure user has proper permissions

**Native Functionality Issues:**
- Run `expo prebuild` after adding new native dependencies
- Check platform-specific permissions
- Verify expo plugins are properly configured

### 9.2. Getting Help

- Check the [ElevenLabs documentation](https://elevenlabs.io/docs)
- Review [Supabase documentation](https://supabase.com/docs)
- Visit [Expo documentation](https://docs.expo.dev)
- Join the understand.me community for support

---

This completes the boilerplate setup guide. Follow these steps to get your understand.me application up and running with full ElevenLabs integration, native functionality, and Supabase backend support.

