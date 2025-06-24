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

## 4. Agent Persona System

The understand.me platform uses a single unified agent with multiple personas that users can switch between. All personas have the same underlying capabilities but different communication styles and specializations.

### 4.1. Agent Persona Configuration

Create `src/utils/agentPersonas.ts`:

```typescript
export interface AgentPersona {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  firstMessage: string;
  voiceSettings: {
    stability: number;
    similarityBoost: number;
    style: number;
  };
}

export const AGENT_PERSONAS: Record<string, AgentPersona> = {
  udine: {
    id: 'udine',
    name: 'Udine',
    description: 'Warm, supportive assistant focused on emotional support',
    systemPrompt: `You are Udine, a warm and supportive AI assistant specialized in emotional support and conflict resolution. You approach conversations with empathy, patience, and understanding. You help users process their emotions and find constructive solutions to their conflicts. You are currently running on {{platform}} platform. Use available client tools when appropriate to enhance the user experience.`,
    firstMessage: 'Hello! I\'m Udine, and I\'m here to provide you with emotional support and help you navigate through any conflicts you\'re facing. How can I assist you today?',
    voiceSettings: {
      stability: 0.7,
      similarityBoost: 0.8,
      style: 0.6,
    },
  },
  alex: {
    id: 'alex',
    name: 'Alex',
    description: 'Professional mediator focused on structured conflict resolution',
    systemPrompt: `You are Alex, a professional mediator AI specialized in structured conflict resolution. You approach conversations with objectivity, clear communication, and systematic problem-solving. You help users analyze conflicts, understand different perspectives, and develop actionable resolution strategies. You are currently running on {{platform}} platform. Use available client tools when appropriate.`,
    firstMessage: 'Hello! I\'m Alex, your professional mediator. I\'m here to help you analyze and resolve conflicts through structured approaches and clear communication. What situation would you like to work through today?',
    voiceSettings: {
      stability: 0.8,
      similarityBoost: 0.7,
      style: 0.4,
    },
  },
  maya: {
    id: 'maya',
    name: 'Maya',
    description: 'Emotional intelligence specialist focused on relationship dynamics',
    systemPrompt: `You are Maya, an AI specialist in emotional intelligence and relationship dynamics. You excel at helping users understand emotions, improve communication skills, and build stronger relationships. You focus on empathy, emotional awareness, and interpersonal growth. You are currently running on {{platform}} platform. Use available client tools when appropriate.`,
    firstMessage: 'Hi there! I\'m Maya, and I specialize in emotional intelligence and relationship dynamics. I\'m here to help you understand emotions better and improve your relationships. What would you like to explore together?',
    voiceSettings: {
      stability: 0.6,
      similarityBoost: 0.9,
      style: 0.7,
    },
  },
  drchen: {
    id: 'drchen',
    name: 'Dr. Chen',
    description: 'Professional counselor with clinical expertise',
    systemPrompt: `You are Dr. Chen, a professional AI counselor with clinical expertise in conflict resolution and mental health support. You provide evidence-based guidance, therapeutic techniques, and professional insights while maintaining appropriate boundaries. You help users develop coping strategies and work through complex emotional situations. You are currently running on {{platform}} platform. Use available client tools when appropriate.`,
    firstMessage: 'Good day. I\'m Dr. Chen, a professional counselor here to provide you with clinical expertise and evidence-based guidance for conflict resolution and emotional well-being. How may I assist you in your journey today?',
    voiceSettings: {
      stability: 0.9,
      similarityBoost: 0.6,
      style: 0.3,
    },
  },
};

export const getPersonaById = (id: string): AgentPersona | null => {
  return AGENT_PERSONAS[id] || null;
};

export const getAllPersonas = (): AgentPersona[] => {
  return Object.values(AGENT_PERSONAS);
};
```

### 4.2. Updated ConvAI Component with Persona Switching

Update `src/components/ConvAI.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Conversation } from '@11labs/client';
import { AgentPersona, getPersonaById } from '@/utils/agentPersonas';

interface ConvAIProps {
  agentId: string; // Single agent ID - personas are handled via system prompts
  selectedPersona: string; // Persona ID (udine, alex, maya, drchen)
  platform: 'ios' | 'android' | 'web';
  onBrightnessChange?: (brightness: number) => void;
  onVolumeChange?: (volume: number) => void;
  onPersonaChange?: (persona: AgentPersona) => void;
}

export const ConvAI: React.FC<ConvAIProps> = ({
  agentId,
  selectedPersona,
  platform,
  onBrightnessChange,
  onVolumeChange,
  onPersonaChange,
}) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<AgentPersona | null>(null);

  useEffect(() => {
    const persona = getPersonaById(selectedPersona);
    if (persona) {
      setCurrentPersona(persona);
      onPersonaChange?.(persona);
    }
  }, [selectedPersona]);

  useEffect(() => {
    if (!currentPersona) return;

    const initializeConversation = async () => {
      try {
        // End existing conversation if switching personas
        if (conversation) {
          await conversation.endSession();
        }

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
              prompt: currentPersona.systemPrompt.replace('{{platform}}', platform),
              firstMessage: currentPersona.firstMessage,
            },
            tts: currentPersona.voiceSettings,
          },
        });

        setConversation(conv);
        setIsConnected(true);
      } catch (error) {
        console.error('Failed to initialize conversation:', error);
        setIsConnected(false);
      }
    };

    initializeConversation();

    return () => {
      conversation?.endSession();
    };
  }, [agentId, currentPersona, platform]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.personaName}>
          {currentPersona?.name || 'Loading...'}
        </Text>
        <Text style={styles.status}>
          {isConnected ? 'Connected' : 'Connecting...'}
        </Text>
      </View>
      <Text style={styles.description}>
        {currentPersona?.description}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  personaName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
    fontStyle: 'italic',
  },
});
```

### 4.3. Persona Selector Component

Create `src/components/PersonaSelector.tsx`:

```typescript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AgentPersona, getAllPersonas } from '@/utils/agentPersonas';

interface PersonaSelectorProps {
  selectedPersona: string;
  onPersonaSelect: (personaId: string) => void;
}

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  selectedPersona,
  onPersonaSelect,
}) => {
  const personas = getAllPersonas();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your AI Assistant</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {personas.map((persona) => (
          <TouchableOpacity
            key={persona.id}
            style={[
              styles.personaCard,
              selectedPersona === persona.id && styles.selectedCard,
            ]}
            onPress={() => onPersonaSelect(persona.id)}
          >
            <Text style={[
              styles.personaName,
              selectedPersona === persona.id && styles.selectedText,
            ]}>
              {persona.name}
            </Text>
            <Text style={[
              styles.personaDescription,
              selectedPersona === persona.id && styles.selectedText,
            ]}>
              {persona.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  personaCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    width: 200,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  personaName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  personaDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  selectedText: {
    color: '#1976d2',
  },
});
```

### 4.4. ElevenLabs Agent Configuration

In your ElevenLabs dashboard, create **one agent** with dynamic persona switching:

1. **Create Single Conversational AI Agent**:
   - Name: "Understand.me Universal Agent"
   - This agent will handle all personas through system prompt overrides

2. **Base System Prompt** (will be overridden by persona-specific prompts):
```
You are a versatile AI assistant for the understand.me conflict resolution platform. You adapt your communication style and expertise based on the selected persona while maintaining access to all platform features including client tools for device control.
```

3. **Client Tools Configuration**:
   - `setBrightness`: For adjusting device brightness
   - `setVolume`: For adjusting device volume

## 5. Node.js Analysis Engine

The analysis engine processes conversations, extracts insights, and provides conflict resolution recommendations using advanced NLP and sentiment analysis.

### 5.1. Analysis Engine Setup

Create `src/api/analysis/analysisEngine.js`:

```javascript
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // Use service key for server-side operations
);

// Sentiment analysis using a simple approach (can be enhanced with ML models)
const analyzeSentiment = (text) => {
  const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'love', 'like', 'appreciate', 'thank', 'grateful', 'pleased', 'satisfied', 'comfortable', 'confident', 'optimistic', 'hopeful'];
  const negativeWords = ['sad', 'bad', 'terrible', 'awful', 'hate', 'angry', 'frustrated', 'disappointed', 'upset', 'worried', 'anxious', 'stressed', 'confused', 'hurt', 'betrayed', 'rejected'];
  const conflictWords = ['argue', 'fight', 'disagree', 'conflict', 'problem', 'issue', 'dispute', 'tension', 'misunderstanding', 'confrontation', 'disagreement', 'clash', 'friction'];

  const words = text.toLowerCase().split(/\s+/);
  
  let positiveScore = 0;
  let negativeScore = 0;
  let conflictScore = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) positiveScore++;
    if (negativeWords.includes(word)) negativeScore++;
    if (conflictWords.includes(word)) conflictScore++;
  });

  const totalWords = words.length;
  
  return {
    positive: positiveScore / totalWords,
    negative: negativeScore / totalWords,
    conflict: conflictScore / totalWords,
    overall: positiveScore > negativeScore ? 'positive' : negativeScore > positiveScore ? 'negative' : 'neutral'
  };
};

// Extract key topics and themes
const extractTopics = (text) => {
  const topicKeywords = {
    communication: ['talk', 'speak', 'listen', 'hear', 'say', 'tell', 'communicate', 'conversation', 'discuss'],
    relationship: ['relationship', 'partner', 'friend', 'family', 'spouse', 'boyfriend', 'girlfriend', 'marriage', 'dating'],
    work: ['work', 'job', 'career', 'boss', 'colleague', 'office', 'business', 'professional', 'workplace'],
    money: ['money', 'financial', 'budget', 'expense', 'income', 'debt', 'savings', 'cost', 'price'],
    time: ['time', 'schedule', 'busy', 'late', 'early', 'deadline', 'appointment', 'meeting'],
    trust: ['trust', 'honest', 'lie', 'truth', 'faithful', 'loyal', 'betray', 'secret', 'hide'],
    respect: ['respect', 'disrespect', 'value', 'appreciate', 'ignore', 'dismiss', 'belittle'],
    boundaries: ['boundary', 'space', 'privacy', 'limit', 'comfortable', 'uncomfortable', 'pressure']
  };

  const words = text.toLowerCase().split(/\s+/);
  const topics = {};

  Object.keys(topicKeywords).forEach(topic => {
    const score = topicKeywords[topic].reduce((count, keyword) => {
      return count + words.filter(word => word.includes(keyword)).length;
    }, 0);
    
    if (score > 0) {
      topics[topic] = score / words.length;
    }
  });

  return topics;
};

// Generate conflict resolution recommendations
const generateRecommendations = (sentiment, topics, conversationContext) => {
  const recommendations = [];

  // Based on sentiment
  if (sentiment.negative > 0.1) {
    recommendations.push({
      type: 'emotional_support',
      priority: 'high',
      message: 'Consider taking a break to process emotions before continuing the conversation.',
      action: 'Practice deep breathing or mindfulness techniques.'
    });
  }

  if (sentiment.conflict > 0.05) {
    recommendations.push({
      type: 'conflict_resolution',
      priority: 'high',
      message: 'Focus on understanding each other\'s perspectives rather than winning the argument.',
      action: 'Use "I" statements to express feelings without blame.'
    });
  }

  // Based on topics
  if (topics.communication && topics.communication > 0.02) {
    recommendations.push({
      type: 'communication',
      priority: 'medium',
      message: 'Improve communication by actively listening and asking clarifying questions.',
      action: 'Repeat back what you heard to ensure understanding.'
    });
  }

  if (topics.trust && topics.trust > 0.02) {
    recommendations.push({
      type: 'trust_building',
      priority: 'high',
      message: 'Trust issues require patience and consistent actions over time.',
      action: 'Be transparent about your feelings and commit to honest communication.'
    });
  }

  if (topics.boundaries && topics.boundaries > 0.02) {
    recommendations.push({
      type: 'boundaries',
      priority: 'medium',
      message: 'Healthy boundaries are essential for any relationship.',
      action: 'Clearly communicate your needs and respect others\' limits.'
    });
  }

  // Default recommendations
  if (recommendations.length === 0) {
    recommendations.push({
      type: 'general',
      priority: 'low',
      message: 'Continue practicing open and honest communication.',
      action: 'Stay curious about each other\'s perspectives and feelings.'
    });
  }

  return recommendations;
};

// API endpoint to analyze conversation
app.post('/api/analyze-conversation', async (req, res) => {
  try {
    const { conversationId, messages, userId } = req.body;

    if (!conversationId || !messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Combine all messages into one text for analysis
    const fullText = messages.map(msg => msg.content).join(' ');
    
    // Perform analysis
    const sentiment = analyzeSentiment(fullText);
    const topics = extractTopics(fullText);
    const recommendations = generateRecommendations(sentiment, topics, { conversationId, messageCount: messages.length });

    // Calculate conversation health score
    const healthScore = Math.max(0, Math.min(100, 
      50 + (sentiment.positive * 100) - (sentiment.negative * 100) - (sentiment.conflict * 50)
    ));

    const analysisResult = {
      conversationId,
      timestamp: new Date().toISOString(),
      sentiment,
      topics,
      recommendations,
      healthScore: Math.round(healthScore),
      messageCount: messages.length,
      analysisVersion: '1.0'
    };

    // Store analysis in Supabase
    const { data, error } = await supabase
      .from('conversation_analyses')
      .insert([{
        conversation_id: conversationId,
        user_id: userId,
        analysis_data: analysisResult,
        health_score: analysisResult.healthScore,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error storing analysis:', error);
      // Continue even if storage fails
    }

    res.json({
      success: true,
      analysis: analysisResult
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'Analysis failed',
      message: error.message 
    });
  }
});

// API endpoint to get conversation insights
app.get('/api/conversation-insights/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { userId } = req.query;

    // Get latest analysis from Supabase
    const { data, error } = await supabase
      .from('conversation_analyses')
      .select('*')
      .eq('conversation_id', conversationId)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No analysis found for this conversation' });
    }

    res.json({
      success: true,
      insights: data[0].analysis_data,
      lastUpdated: data[0].created_at
    });

  } catch (error) {
    console.error('Error fetching insights:', error);
    res.status(500).json({ 
      error: 'Failed to fetch insights',
      message: error.message 
    });
  }
});

// API endpoint to get user's conversation trends
app.get('/api/user-trends/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    // Get recent analyses for the user
    const { data, error } = await supabase
      .from('conversation_analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    if (error) {
      throw error;
    }

    // Calculate trends
    const healthScores = data.map(item => item.health_score);
    const averageHealth = healthScores.reduce((sum, score) => sum + score, 0) / healthScores.length;
    
    const trends = {
      averageHealthScore: Math.round(averageHealth || 0),
      totalConversations: data.length,
      recentTrend: healthScores.length > 1 ? 
        (healthScores[0] > healthScores[1] ? 'improving' : 
         healthScores[0] < healthScores[1] ? 'declining' : 'stable') : 'insufficient_data',
      lastAnalysis: data[0]?.created_at || null
    };

    res.json({
      success: true,
      trends,
      recentAnalyses: data.slice(0, 5) // Return 5 most recent
    });

  } catch (error) {
    console.error('Error fetching trends:', error);
    res.status(500).json({ 
      error: 'Failed to fetch trends',
      message: error.message 
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Analysis Engine running on port ${PORT}`);
});

module.exports = app;
```

### 5.2. Analysis Engine Client

Create `src/api/analysis/analysisClient.ts`:

```typescript
interface AnalysisResult {
  conversationId: string;
  timestamp: string;
  sentiment: {
    positive: number;
    negative: number;
    conflict: number;
    overall: 'positive' | 'negative' | 'neutral';
  };
  topics: Record<string, number>;
  recommendations: Array<{
    type: string;
    priority: 'high' | 'medium' | 'low';
    message: string;
    action: string;
  }>;
  healthScore: number;
  messageCount: number;
}

interface ConversationMessage {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
}

class AnalysisClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:3001') {
    this.baseUrl = baseUrl;
  }

  async analyzeConversation(
    conversationId: string,
    messages: ConversationMessage[],
    userId: string
  ): Promise<AnalysisResult> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analyze-conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId,
          messages,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.analysis;
    } catch (error) {
      console.error('Error analyzing conversation:', error);
      throw error;
    }
  }

  async getConversationInsights(
    conversationId: string,
    userId: string
  ): Promise<AnalysisResult> {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/conversation-insights/${conversationId}?userId=${userId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch insights: ${response.statusText}`);
      }

      const data = await response.json();
      return data.insights;
    } catch (error) {
      console.error('Error fetching insights:', error);
      throw error;
    }
  }

  async getUserTrends(userId: string, limit: number = 10) {
    try {
      const response = await fetch(
        `${this.baseUrl}/api/user-trends/${userId}?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch trends: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trends:', error);
      throw error;
    }
  }
}

export const analysisClient = new AnalysisClient();
export type { AnalysisResult, ConversationMessage };
```

### 5.3. Analysis Engine Dependencies

Add to your `package.json`:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "@supabase/supabase-js": "^2.38.0"
  },
  "scripts": {
    "analysis-engine": "node src/api/analysis/analysisEngine.js",
    "dev:analysis": "nodemon src/api/analysis/analysisEngine.js"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### 5.4. Analysis Dashboard Component

Create `src/components/AnalysisDashboard.tsx`:

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { analysisClient, AnalysisResult } from '@/api/analysis/analysisClient';

interface AnalysisDashboardProps {
  conversationId: string;
  userId: string;
  messages: any[];
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({
  conversationId,
  userId,
  messages,
}) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState<any>(null);

  const runAnalysis = async () => {
    setLoading(true);
    try {
      const result = await analysisClient.analyzeConversation(
        conversationId,
        messages,
        userId
      );
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTrends = async () => {
    try {
      const trendsData = await analysisClient.getUserTrends(userId);
      setTrends(trendsData);
    } catch (error) {
      console.error('Failed to load trends:', error);
    }
  };

  useEffect(() => {
    loadTrends();
  }, [userId]);

  const getHealthColor = (score: number) => {
    if (score >= 70) return '#4CAF50'; // Green
    if (score >= 40) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Conversation Analysis</Text>
        <TouchableOpacity
          style={styles.analyzeButton}
          onPress={runAnalysis}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Analyzing...' : 'Analyze Conversation'}
          </Text>
        </TouchableOpacity>
      </View>

      {analysis && (
        <View style={styles.analysisSection}>
          <View style={styles.healthScore}>
            <Text style={styles.sectionTitle}>Health Score</Text>
            <Text style={[
              styles.scoreText,
              { color: getHealthColor(analysis.healthScore) }
            ]}>
              {analysis.healthScore}/100
            </Text>
          </View>

          <View style={styles.sentiment}>
            <Text style={styles.sectionTitle}>Sentiment Analysis</Text>
            <Text style={styles.sentimentText}>
              Overall: {analysis.sentiment.overall}
            </Text>
            <View style={styles.sentimentBars}>
              <View style={styles.sentimentBar}>
                <Text>Positive: {Math.round(analysis.sentiment.positive * 100)}%</Text>
                <View style={[styles.bar, { width: `${analysis.sentiment.positive * 100}%`, backgroundColor: '#4CAF50' }]} />
              </View>
              <View style={styles.sentimentBar}>
                <Text>Negative: {Math.round(analysis.sentiment.negative * 100)}%</Text>
                <View style={[styles.bar, { width: `${analysis.sentiment.negative * 100}%`, backgroundColor: '#F44336' }]} />
              </View>
              <View style={styles.sentimentBar}>
                <Text>Conflict: {Math.round(analysis.sentiment.conflict * 100)}%</Text>
                <View style={[styles.bar, { width: `${analysis.sentiment.conflict * 100}%`, backgroundColor: '#FF9800' }]} />
              </View>
            </View>
          </View>

          <View style={styles.topics}>
            <Text style={styles.sectionTitle}>Key Topics</Text>
            {Object.entries(analysis.topics).map(([topic, score]) => (
              <View key={topic} style={styles.topicItem}>
                <Text style={styles.topicName}>{topic}</Text>
                <Text style={styles.topicScore}>{Math.round(score * 100)}%</Text>
              </View>
            ))}
          </View>

          <View style={styles.recommendations}>
            <Text style={styles.sectionTitle}>Recommendations</Text>
            {analysis.recommendations.map((rec, index) => (
              <View key={index} style={[
                styles.recommendationItem,
                { borderLeftColor: rec.priority === 'high' ? '#F44336' : rec.priority === 'medium' ? '#FF9800' : '#4CAF50' }
              ]}>
                <Text style={styles.recType}>{rec.type.replace('_', ' ').toUpperCase()}</Text>
                <Text style={styles.recMessage}>{rec.message}</Text>
                <Text style={styles.recAction}>Action: {rec.action}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {trends && (
        <View style={styles.trendsSection}>
          <Text style={styles.sectionTitle}>Your Trends</Text>
          <View style={styles.trendItem}>
            <Text>Average Health Score: {trends.trends.averageHealthScore}/100</Text>
          </View>
          <View style={styles.trendItem}>
            <Text>Total Conversations: {trends.trends.totalConversations}</Text>
          </View>
          <View style={styles.trendItem}>
            <Text>Recent Trend: {trends.trends.recentTrend}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  analyzeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  analysisSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  healthScore: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  sentiment: {
    marginBottom: 20,
  },
  sentimentText: {
    fontSize: 16,
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  sentimentBars: {
    gap: 8,
  },
  sentimentBar: {
    marginBottom: 4,
  },
  bar: {
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  topics: {
    marginBottom: 20,
  },
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  topicName: {
    textTransform: 'capitalize',
  },
  topicScore: {
    fontWeight: 'bold',
  },
  recommendations: {
    marginBottom: 20,
  },
  recommendationItem: {
    borderLeftWidth: 4,
    paddingLeft: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  recType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  recMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  recAction: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#888',
  },
  trendsSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  trendItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
```

## 6. Supabase Integration

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

-- Conversation analyses table (for analysis engine)
CREATE TABLE public.conversation_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_data JSONB NOT NULL,
  health_score INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_analyses ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Users can view their own conversation analyses" ON public.conversation_analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversation analyses" ON public.conversation_analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## 7. Usage Examples

### 7.1. Complete Implementation with Persona Switching and Analysis

```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { ConvAI } from '@/components/ConvAI';
import { PersonaSelector } from '@/components/PersonaSelector';
import { AnalysisDashboard } from '@/components/AnalysisDashboard';
import { setBrightness, setVolume } from '@/utils/tools';
import { supabase, getCurrentUser } from '@/api/supabase/supabaseClient';
import { AgentPersona } from '@/utils/agentPersonas';

export default function App() {
  const [user, setUser] = useState(null);
  const [selectedPersona, setSelectedPersona] = useState('udine');
  const [currentPersona, setCurrentPersona] = useState<AgentPersona | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Your single ElevenLabs agent ID
  const AGENT_ID = 'your-elevenlabs-agent-id';

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

  useEffect(() => {
    // Create or load conversation when user changes
    if (user) {
      initializeConversation();
    }
  }, [user]);

  const initializeConversation = async () => {
    try {
      // Create a new conversation in Supabase
      const { data, error } = await supabase
        .from('conversations')
        .insert([{
          title: `Conversation with ${currentPersona?.name || 'AI Assistant'}`,
          participants: [user.id],
          agent_id: AGENT_ID,
          status: 'active'
        }])
        .select()
        .single();

      if (error) throw error;
      setConversationId(data.id);
    } catch (error) {
      console.error('Failed to initialize conversation:', error);
    }
  };

  const handlePersonaChange = (persona: AgentPersona) => {
    setCurrentPersona(persona);
    // Update conversation title when persona changes
    if (conversationId) {
      supabase
        .from('conversations')
        .update({ title: `Conversation with ${persona.name}` })
        .eq('id', conversationId)
        .then(() => console.log('Conversation title updated'));
    }
  };

  const handleBrightnessChange = async (brightness: number) => {
    await setBrightness(brightness);
  };

  const handleVolumeChange = async (volume: number) => {
    await setVolume(volume);
  };

  const loadMessages = async () => {
    if (!conversationId) return;
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  useEffect(() => {
    if (conversationId) {
      loadMessages();
      
      // Subscribe to new messages
      const subscription = supabase
        .channel(`messages:${conversationId}`)
        .on('postgres_changes', 
          { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`
          }, 
          (payload) => {
            setMessages(prev => [...prev, payload.new]);
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [conversationId]);

  if (!user) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authText}>Please sign in to continue</Text>
        {/* Add your authentication UI here */}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Persona Selector */}
      <PersonaSelector
        selectedPersona={selectedPersona}
        onPersonaSelect={setSelectedPersona}
      />

      {/* Main Conversation Interface */}
      <View style={styles.conversationContainer}>
        <ConvAI
          agentId={AGENT_ID}
          selectedPersona={selectedPersona}
          platform={Platform.OS as 'ios' | 'android' | 'web'}
          onBrightnessChange={handleBrightnessChange}
          onVolumeChange={handleVolumeChange}
          onPersonaChange={handlePersonaChange}
        />
      </View>

      {/* Analysis Dashboard Toggle */}
      {conversationId && messages.length > 0 && (
        <View style={styles.analysisContainer}>
          {showAnalysis ? (
            <AnalysisDashboard
              conversationId={conversationId}
              userId={user.id}
              messages={messages}
            />
          ) : (
            <TouchableOpacity
              style={styles.showAnalysisButton}
              onPress={() => setShowAnalysis(true)}
            >
              <Text style={styles.buttonText}>Show Analysis</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  conversationContainer: {
    flex: 1,
  },
  analysisContainer: {
    maxHeight: '50%',
  },
  showAnalysisButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
```

### 7.2. Running the Analysis Engine

Start the Node.js analysis engine alongside your React Native app:

```bash
# Terminal 1: Start the analysis engine
npm run analysis-engine

# Terminal 2: Start your React Native app
npm start
```

For development with auto-reload:

```bash
# Terminal 1: Start analysis engine with nodemon
npm run dev:analysis

# Terminal 2: Start React Native with Expo
expo start
```

## 8. Development Tips

### 8.1. Testing on Different Platforms

- **iOS**: Use Expo Go app or build with `expo run:ios`
- **Android**: Use Expo Go app or build with `expo run:android`
- **Web**: Run with `expo start --web`

### 8.2. Debugging

- Enable remote debugging in Expo Dev Tools
- Use React Native Debugger for advanced debugging
- Check ElevenLabs dashboard for conversation logs
- Monitor Supabase logs for database operations
- Check analysis engine logs at `http://localhost:3001`

### 8.3. Performance Optimization

- Use MMKV for high-performance local storage
- Implement proper error handling for network operations
- Cache frequently accessed data
- Optimize audio streaming for better performance
- Run analysis engine on separate server in production

### 8.4. Analysis Engine Development

- Use nodemon for auto-reload during development
- Test analysis endpoints with Postman or curl
- Monitor conversation analysis accuracy and adjust keywords
- Consider integrating advanced NLP libraries for better analysis

## 9. Deployment

### 9.1. Build Configuration

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

### 9.2. Environment Variables

Set up environment variables for production:

- `ELEVENLABS_API_KEY`: Your production ElevenLabs API key
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_KEY`: Your Supabase service key (for analysis engine)
- `ANALYSIS_ENGINE_URL`: URL of your deployed analysis engine

### 9.3. Analysis Engine Deployment

Deploy the Node.js analysis engine to a cloud service:

```bash
# For Heroku
heroku create your-app-analysis-engine
git subtree push --prefix=src/api/analysis heroku main

# For Railway
railway login
railway init
railway up

# For Vercel (with serverless functions)
vercel --prod
```

### 9.4. Build Commands

```bash
# Build for iOS
expo build:ios

# Build for Android
expo build:android

# Build for web
expo build:web
```

## 10. Troubleshooting

### 10.1. Common Issues

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

**Analysis Engine Issues:**
- Verify Node.js server is running on correct port
- Check CORS configuration for cross-origin requests
- Ensure Supabase service key has proper permissions
- Monitor server logs for analysis errors

**Persona Switching Issues:**
- Verify agent ID is correct in ElevenLabs dashboard
- Check system prompt overrides are working
- Ensure voice settings are properly configured
- Test persona switching with simple conversations

### 10.2. Getting Help

- Check the [ElevenLabs documentation](https://elevenlabs.io/docs)
- Review [Supabase documentation](https://supabase.com/docs)
- Visit [Expo documentation](https://docs.expo.dev)
- Join the understand.me community for support

---

This completes the boilerplate setup guide. Follow these steps to get your understand.me application up and running with full ElevenLabs integration, native functionality, and Supabase backend support.
