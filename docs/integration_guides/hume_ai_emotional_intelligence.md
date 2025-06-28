# Hume AI Emotional Intelligence Integration Guide

## Overview

This guide details the integration of Hume AI's emotional intelligence capabilities into Understand.me's conflict resolution platform, providing real-time emotional analysis to enhance Udine's mediation effectiveness.

## Architecture Overview

```
Voice Input → ElevenLabs → Audio Processing → Hume AI Analysis
     ↓             ↓            ↓              ↓
Text Input → NLP Processing → Emotion Detection → Adaptation Engine
     ↓             ↓            ↓              ↓
Udine Response ← LangGraph ← Emotional Context ← Real-time Insights
```

## 1. Core Hume AI Integration

### 1.1. Hume Client Setup

```typescript
// src/services/hume.ts
import { HumeClient } from 'hume';

export class HumeEmotionalIntelligence {
  private client: HumeClient;
  private isInitialized: boolean = false;

  constructor() {
    this.client = new HumeClient({
      apiKey: process.env.EXPO_PUBLIC_HUME_API_KEY || process.env.HUME_API_KEY,
    });
  }

  async initialize() {
    try {
      // Test connection
      await this.client.empathicVoice.getConfigs();
      this.isInitialized = true;
      console.log('✅ Hume AI client initialized successfully');
    } catch (error) {
      console.error('❌ Hume AI initialization failed:', error);
      throw error;
    }
  }

  async analyzeVoiceEmotion(audioBuffer: ArrayBuffer): Promise<EmotionalAnalysis> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const response = await this.client.empathicVoice.analyze({
        audio: audioBuffer,
        models: ['prosody', 'language'],
        transcription: true
      });

      return this.processEmotionalResponse(response);
    } catch (error) {
      console.error('Voice emotion analysis failed:', error);
      return this.createFallbackAnalysis();
    }
  }

  async analyzeTextEmotion(text: string): Promise<EmotionalAnalysis> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const response = await this.client.empathicVoice.analyzeText({
        text: text,
        models: ['language']
      });

      return this.processEmotionalResponse(response);
    } catch (error) {
      console.error('Text emotion analysis failed:', error);
      return this.createFallbackAnalysis();
    }
  }

  private processEmotionalResponse(response: any): EmotionalAnalysis {
    const predictions = response.predictions?.[0];
    if (!predictions?.emotions) {
      return this.createFallbackAnalysis();
    }

    // Sort emotions by confidence score
    const sortedEmotions = predictions.emotions
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 5); // Top 5 emotions

    const primary = sortedEmotions[0];
    const secondary = sortedEmotions[1];

    return {
      primary: {
        emotion: primary.name,
        confidence: primary.score,
        intensity: this.calculateIntensity(primary.score)
      },
      secondary: secondary ? {
        emotion: secondary.name,
        confidence: secondary.score,
        intensity: this.calculateIntensity(secondary.score)
      } : null,
      allEmotions: sortedEmotions.map((e: any) => ({
        emotion: e.name,
        confidence: e.score
      })),
      timestamp: new Date().toISOString(),
      transcription: response.transcription,
      recommendations: this.generateRecommendations(sortedEmotions),
      mediationContext: this.generateMediationContext(sortedEmotions)
    };
  }

  private calculateIntensity(score: number): 'low' | 'medium' | 'high' | 'very_high' {
    if (score >= 0.8) return 'very_high';
    if (score >= 0.6) return 'high';
    if (score >= 0.4) return 'medium';
    return 'low';
  }

  private generateRecommendations(emotions: any[]): string[] {
    const recommendations: string[] = [];
    const primary = emotions[0];

    const emotionStrategies = {
      anger: [
        'Consider taking a brief pause to allow emotions to settle',
        'Focus on underlying needs rather than positions',
        'Use "I" statements to express feelings'
      ],
      sadness: [
        'Acknowledge the emotional impact of this situation',
        'Explore what support might be helpful',
        'Validate the person\'s feelings'
      ],
      fear: [
        'Address concerns about safety and security',
        'Clarify expectations and boundaries',
        'Provide reassurance about the process'
      ],
      joy: [
        'Build on this positive energy',
        'Use this moment to find common ground',
        'Encourage continued engagement'
      ],
      surprise: [
        'Take time to process new information',
        'Ask clarifying questions',
        'Ensure understanding before proceeding'
      ],
      disgust: [
        'Address underlying values conflicts',
        'Explore what feels unacceptable',
        'Find alternative approaches'
      ]
    };

    const strategies = emotionStrategies[primary.name as keyof typeof emotionStrategies];
    if (strategies) {
      recommendations.push(...strategies);
    }

    // Add intensity-based recommendations
    if (primary.score > 0.8) {
      recommendations.push('High emotional intensity detected - consider emotional regulation techniques');
    }

    return recommendations;
  }

  private generateMediationContext(emotions: any[]): MediationContext {
    const primary = emotions[0];
    const isHighIntensity = primary.score > 0.7;
    const isNegativeEmotion = ['anger', 'sadness', 'fear', 'disgust'].includes(primary.name);

    return {
      requiresIntervention: isHighIntensity && isNegativeEmotion,
      suggestedTone: this.suggestTone(emotions),
      phaseRecommendation: this.recommendPhaseAction(emotions),
      communicationStyle: this.recommendCommunicationStyle(emotions)
    };
  }

  private suggestTone(emotions: any[]): string {
    const primary = emotions[0];
    
    const toneMap = {
      anger: 'calm_and_validating',
      sadness: 'empathetic_and_supportive',
      fear: 'reassuring_and_gentle',
      joy: 'warm_and_encouraging',
      surprise: 'patient_and_clarifying',
      disgust: 'respectful_and_understanding'
    };

    return toneMap[primary.name as keyof typeof toneMap] || 'neutral_and_professional';
  }

  private recommendPhaseAction(emotions: any[]): string {
    const primary = emotions[0];
    
    if (primary.score > 0.8 && ['anger', 'fear'].includes(primary.name)) {
      return 'consider_returning_to_prepare_phase';
    }
    
    if (primary.name === 'joy' && primary.score > 0.6) {
      return 'good_time_to_advance_phase';
    }
    
    return 'continue_current_phase';
  }

  private recommendCommunicationStyle(emotions: any[]): string {
    const primary = emotions[0];
    
    if (primary.score > 0.7) {
      return 'slow_and_deliberate';
    }
    
    if (['joy', 'surprise'].includes(primary.name)) {
      return 'engaging_and_interactive';
    }
    
    return 'standard_mediation_pace';
  }

  private createFallbackAnalysis(): EmotionalAnalysis {
    return {
      primary: {
        emotion: 'neutral',
        confidence: 0.5,
        intensity: 'medium'
      },
      secondary: null,
      allEmotions: [{ emotion: 'neutral', confidence: 0.5 }],
      timestamp: new Date().toISOString(),
      transcription: null,
      recommendations: ['Continue with standard mediation approach'],
      mediationContext: {
        requiresIntervention: false,
        suggestedTone: 'neutral_and_professional',
        phaseRecommendation: 'continue_current_phase',
        communicationStyle: 'standard_mediation_pace'
      }
    };
  }
}

// Type definitions
export interface EmotionalAnalysis {
  primary: {
    emotion: string;
    confidence: number;
    intensity: 'low' | 'medium' | 'high' | 'very_high';
  };
  secondary: {
    emotion: string;
    confidence: number;
    intensity: 'low' | 'medium' | 'high' | 'very_high';
  } | null;
  allEmotions: Array<{
    emotion: string;
    confidence: number;
  }>;
  timestamp: string;
  transcription: string | null;
  recommendations: string[];
  mediationContext: MediationContext;
}

export interface MediationContext {
  requiresIntervention: boolean;
  suggestedTone: string;
  phaseRecommendation: string;
  communicationStyle: string;
}
```

## 2. Real-time Emotional Monitoring

### 2.1. Emotion Store (Zustand)

```typescript
// src/stores/emotionStore.ts
import { create } from 'zustand';
import { EmotionalAnalysis } from '../services/hume';

interface EmotionState {
  currentEmotions: { [participantId: string]: EmotionalAnalysis };
  emotionHistory: Array<{
    participantId: string;
    analysis: EmotionalAnalysis;
    timestamp: string;
  }>;
  insights: Array<{
    type: 'trend' | 'escalation' | 'improvement';
    description: string;
    timestamp: string;
    participantId: string;
  }>;
  
  // Actions
  updateEmotions: (participantId: string, analysis: EmotionalAnalysis) => void;
  addInsight: (insight: any) => void;
  getEmotionalTrends: (participantId: string) => any[];
  detectEscalation: () => boolean;
  clearHistory: () => void;
}

export const useEmotionStore = create<EmotionState>((set, get) => ({
  currentEmotions: {},
  emotionHistory: [],
  insights: [],

  updateEmotions: (participantId, analysis) => {
    set(state => {
      const newHistory = [...state.emotionHistory, {
        participantId,
        analysis,
        timestamp: new Date().toISOString()
      }];

      // Keep only last 50 entries per participant
      const trimmedHistory = newHistory.slice(-200);

      // Detect trends and escalations
      const trends = get().getEmotionalTrends(participantId);
      const escalation = get().detectEscalation();

      return {
        currentEmotions: {
          ...state.currentEmotions,
          [participantId]: analysis
        },
        emotionHistory: trimmedHistory,
        insights: escalation ? [
          ...state.insights,
          {
            type: 'escalation',
            description: `Emotional escalation detected for ${participantId}`,
            timestamp: new Date().toISOString(),
            participantId
          }
        ] : state.insights
      };
    });
  },

  addInsight: (insight) => {
    set(state => ({
      insights: [...state.insights, {
        ...insight,
        timestamp: new Date().toISOString()
      }]
    }));
  },

  getEmotionalTrends: (participantId) => {
    const history = get().emotionHistory
      .filter(entry => entry.participantId === participantId)
      .slice(-10); // Last 10 entries

    if (history.length < 3) return [];

    const trends = [];
    for (let i = 2; i < history.length; i++) {
      const current = history[i].analysis.primary;
      const previous = history[i-1].analysis.primary;
      const beforePrevious = history[i-2].analysis.primary;

      // Check for escalating intensity
      if (current.confidence > previous.confidence && 
          previous.confidence > beforePrevious.confidence) {
        trends.push({
          type: 'escalating',
          emotion: current.emotion,
          trend: 'increasing_intensity'
        });
      }

      // Check for emotional shifts
      if (current.emotion !== previous.emotion) {
        trends.push({
          type: 'shift',
          from: previous.emotion,
          to: current.emotion
        });
      }
    }

    return trends;
  },

  detectEscalation: () => {
    const current = get().currentEmotions;
    return Object.values(current).some(analysis => 
      analysis.primary.confidence > 0.8 && 
      ['anger', 'fear'].includes(analysis.primary.emotion)
    );
  },

  clearHistory: () => {
    set({
      currentEmotions: {},
      emotionHistory: [],
      insights: []
    });
  }
}));
```

## 3. UI Components for Emotional Visualization

### 3.1. Emotion Indicator Component

```typescript
// src/components/emotions/EmotionIndicator.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEmotionStore } from '../../stores/emotionStore';

interface EmotionIndicatorProps {
  participantId: string;
  showDetails?: boolean;
}

export const EmotionIndicator: React.FC<EmotionIndicatorProps> = ({
  participantId,
  showDetails = false
}) => {
  const { currentEmotions } = useEmotionStore();
  const analysis = currentEmotions[participantId];

  if (!analysis) {
    return (
      <View style={styles.container}>
        <Text style={styles.neutralText}>😐 Neutral</Text>
      </View>
    );
  }

  const getEmotionEmoji = (emotion: string): string => {
    const emojiMap: { [key: string]: string } = {
      joy: '😊',
      sadness: '😢',
      anger: '😠',
      fear: '😰',
      surprise: '😲',
      disgust: '🤢',
      neutral: '😐'
    };
    return emojiMap[emotion] || '😐';
  };

  const getIntensityColor = (intensity: string): string => {
    const colorMap = {
      low: '#4CAF50',
      medium: '#FF9800',
      high: '#FF5722',
      very_high: '#D32F2F'
    };
    return colorMap[intensity as keyof typeof colorMap] || '#757575';
  };

  return (
    <View style={styles.container}>
      <View style={styles.primaryEmotion}>
        <Text style={styles.emoji}>
          {getEmotionEmoji(analysis.primary.emotion)}
        </Text>
        <Text style={styles.emotionName}>
          {analysis.primary.emotion}
        </Text>
        <View
          style={[
            styles.intensityBar,
            {
              backgroundColor: getIntensityColor(analysis.primary.intensity),
              width: `${analysis.primary.confidence * 100}%`
            }
          ]}
        />
      </View>

      {showDetails && analysis.secondary && (
        <View style={styles.secondaryEmotion}>
          <Text style={styles.secondaryText}>
            {getEmotionEmoji(analysis.secondary.emotion)} {analysis.secondary.emotion}
          </Text>
        </View>
      )}

      {showDetails && analysis.recommendations.length > 0 && (
        <View style={styles.recommendations}>
          <Text style={styles.recommendationTitle}>Recommendations:</Text>
          {analysis.recommendations.slice(0, 2).map((rec, index) => (
            <Text key={index} style={styles.recommendationText}>
              • {rec}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 4,
  },
  primaryEmotion: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
    marginRight: 8,
  },
  emotionName: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
    flex: 1,
  },
  intensityBar: {
    height: 4,
    borderRadius: 2,
    marginLeft: 8,
    minWidth: 20,
  },
  secondaryEmotion: {
    marginBottom: 8,
  },
  secondaryText: {
    fontSize: 14,
    color: '#666',
  },
  recommendations: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#e3f2fd',
    borderRadius: 4,
  },
  recommendationTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976d2',
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 11,
    color: '#1976d2',
    marginBottom: 2,
  },
  neutralText: {
    fontSize: 16,
    color: '#666',
  },
});
```

### 3.2. Emotional Insights Dashboard

```typescript
// src/components/emotions/EmotionInsights.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useEmotionStore } from '../../stores/emotionStore';

export const EmotionInsights: React.FC = () => {
  const { insights, detectEscalation } = useEmotionStore();
  const hasEscalation = detectEscalation();

  const recentInsights = insights.slice(-5).reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emotional Insights</Text>

      {hasEscalation && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>
            ⚠️ Emotional escalation detected - consider intervention
          </Text>
        </View>
      )}

      <ScrollView style={styles.insightsList}>
        {recentInsights.map((insight, index) => (
          <View key={index} style={styles.insightItem}>
            <View style={styles.insightHeader}>
              <Text style={styles.insightType}>
                {insight.type === 'escalation' ? '📈' :
                 insight.type === 'improvement' ? '📉' : '📊'}
                {insight.type.toUpperCase()}
              </Text>
              <Text style={styles.timestamp}>
                {new Date(insight.timestamp).toLocaleTimeString()}
              </Text>
            </View>
            <Text style={styles.insightDescription}>
              {insight.description}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  alertContainer: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  alertText: {
    color: '#856404',
    fontWeight: '600',
  },
  insightsList: {
    flex: 1,
  },
  insightItem: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  insightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  insightType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  timestamp: {
    fontSize: 10,
    color: '#6c757d',
  },
  insightDescription: {
    fontSize: 14,
    color: '#333',
  },
});
```

## 4. Integration with LangGraph Workflow

### 4.1. Emotional Context Provider

```javascript
// server/services/emotionalContextProvider.js
class EmotionalContextProvider {
  constructor(humeService, mediationWorkflow) {
    this.hume = humeService;
    this.workflow = mediationWorkflow;
  }

  async enhanceWorkflowWithEmotions(state, newMessage, participantId) {
    // Analyze emotions in the new message
    const emotionalAnalysis = await this.hume.analyzeTextEmotion(newMessage);

    // Update emotional state
    const updatedEmotionalStates = {
      ...state.emotionalStates,
      [participantId]: emotionalAnalysis
    };

    // Check if intervention is needed
    if (emotionalAnalysis.mediationContext.requiresIntervention) {
      return {
        ...state,
        emotionalStates: updatedEmotionalStates,
        requiresIntervention: true,
        interventionReason: 'emotional_escalation',
        suggestedResponse: await this.generateEmotionalResponse(emotionalAnalysis)
      };
    }

    // Adapt workflow based on emotional context
    const adaptedState = await this.adaptWorkflowToEmotions(state, emotionalAnalysis);

    return {
      ...adaptedState,
      emotionalStates: updatedEmotionalStates
    };
  }

  async generateEmotionalResponse(analysis) {
    const prompt = `Generate an empathetic response for someone experiencing ${analysis.primary.emotion} at ${analysis.primary.intensity} intensity.

Recommendations: ${analysis.recommendations.join(', ')}

The response should:
1. Validate their emotional experience
2. Provide gentle guidance
3. Help regulate the emotion
4. Guide back to constructive dialogue

Keep it brief and supportive.`;

    return await this.workflow.llm.invoke(prompt);
  }

  async adaptWorkflowToEmotions(state, analysis) {
    const { suggestedTone, phaseRecommendation, communicationStyle } = analysis.mediationContext;

    // Adapt current phase based on emotional context
    if (phaseRecommendation === 'consider_returning_to_prepare_phase' &&
        state.currentPhase !== 'prepare') {
      return {
        ...state,
        phaseTransition: 'backward',
        transitionReason: 'emotional_regulation_needed',
        adaptedTone: suggestedTone,
        adaptedCommunicationStyle: communicationStyle
      };
    }

    return {
      ...state,
      adaptedTone: suggestedTone,
      adaptedCommunicationStyle: communicationStyle
    };
  }
}

module.exports = { EmotionalContextProvider };
```

This comprehensive guide provides the foundation for integrating Hume AI's emotional intelligence capabilities into the conflict resolution platform, enabling real-time emotional awareness and adaptive responses.
