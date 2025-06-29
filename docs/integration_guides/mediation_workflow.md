# Vercel AI SDK 5-Phase Mediation Workflow Integration Guide

## Overview

This guide provides comprehensive implementation details for the Vercel AI SDK-based 5-phase mediation workflow that powers Udine's conflict resolution capabilities.

## Architecture Overview

```
User Input → ElevenLabs → Vercel AI SDK (Edge Function) → Google GenAI → Response
     ↓           ↓                  ↓                    ↓           ↓
Hume AI ← Emotional Analysis ← Context/Memory ← Action Items
```

## 1. Core Workflow Implementation

### 1.1. Mediation State Definition

```typescript
// server/services/vercelAi/types.ts
export interface MediationState {
  // Session metadata
  sessionId: string;
  currentPhase: 'prepare' | 'express' | 'understand' | 'resolve' | 'heal';
  participants: Participant[];
  
  // Conflict analysis
  conflictAnalysis: {
    summary: string;
    keyIssues: string[];
    underlyingNeeds: string[];
    emotionalFactors: string[];
  };
  
  // Emotional intelligence
  emotionalStates: {
    [participantId: string]: {
      primary: string;
      intensity: number;
      trends: string[];
      recommendations: string[];
    };
  };
  
  // Session progress
  sessionGoals: string[];
  phaseOutputs: {
    [phase: string]: {
      summary: string;
      keyInsights: string[];
      nextSteps: string[];
    };
  };
  
  // Resolution tracking
  actionItems: ActionItem[];
  agreements: Agreement[];
  conversationHistory: Message[];
  
  // Workflow control
  phaseComplete: boolean;
  readyForTransition: boolean;
  requiresIntervention: boolean;
}

export interface Participant {
  id: string;
  name: string;
  role: 'host' | 'participant';
  perspective: string;
  emotionalState: any;
  privacySettings: any;
}

export interface ActionItem {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate?: string;
  status: 'pending' | 'in-progress' | 'completed';
}
```

### 1.2. Client-Side Mediation Workflow
> **Migration Note:** Instead of server-side handlers, call the `chatWithUdine` helper directly in your Expo React Native screens. For example:
```tsx
'use client';
import { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text } from 'react-native';
import { chatWithUdine } from '@/services/ai/chat';

export default function MediationScreen() {
  const [history, setHistory] = useState<{role: 'user' | 'assistant'; content: string}[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (!input) return;
    setLoading(true);
    const response = await chatWithUdine(history, input);
    setHistory([...history, {role: 'user', content: input}, {role: 'assistant', content: response}]);
    setInput('');
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView style={{ flex: 1 }}>
        {history.map((msg, idx) => (
          <Text key={idx} style={{ marginVertical: 4, color: msg.role === 'assistant' ? 'blue' : 'black' }}>
            {msg.role === 'assistant' ? 'Udine: ' : 'You: '}{msg.content}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type your message..."
        style={{ borderWidth: 1, padding: 8, marginBottom: 8 }}
      />
      <Button onPress={handleSend} title={loading ? 'Sending...' : 'Send'} disabled={loading} />
    </View>
  );
}
    this.llm = new ChatGoogleGenerativeAI({
      modelName: "gemini-2.5-flash",
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
      temperature: 0.7,
    });
    
    this.hume = new HumeClient({
      apiKey: process.env.HUME_API_KEY,
    });

    this.memory = new MemorySaver();
    this.workflow = this.buildMediationWorkflow();
  }

  buildMediationWorkflow() {
    const workflow = new StateGraph({
      // Initial state
      sessionId: "",
      currentPhase: "prepare",
      participants: [],
      conflictAnalysis: {},
      emotionalStates: {},
      sessionGoals: [],
      phaseOutputs: {},
      actionItems: [],
      agreements: [],
      conversationHistory: [],
      phaseComplete: false,
      readyForTransition: false,
      requiresIntervention: false
    });

    // Define the 5 phases as nodes
    workflow
      .addNode("prepare", this.preparePhase.bind(this))
      .addNode("express", this.expressPhase.bind(this))
      .addNode("understand", this.understandPhase.bind(this))
      .addNode("resolve", this.resolvePhase.bind(this))
      .addNode("heal", this.healPhase.bind(this))
      .addNode("intervention", this.interventionNode.bind(this))
      .addNode("summary", this.summaryNode.bind(this));

    // Define conditional transitions
    workflow
      .addConditionalEdges("prepare", this.shouldTransition.bind(this), {
        continue: "express",
        intervention: "intervention",
        complete: "summary"
      })
      .addConditionalEdges("express", this.shouldTransition.bind(this), {
        continue: "understand",
        intervention: "intervention",
        back: "prepare"
      })
      .addConditionalEdges("understand", this.shouldTransition.bind(this), {
        continue: "resolve",
        intervention: "intervention",
        back: "express"
      })
      .addConditionalEdges("resolve", this.shouldTransition.bind(this), {
        continue: "heal",
        intervention: "intervention",
        back: "understand"
      })
      .addConditionalEdges("heal", this.shouldTransition.bind(this), {
        complete: "summary",
        intervention: "intervention",
        back: "resolve"
      });

    // Set entry point
    workflow.setEntryPoint("prepare");

    return workflow.compile({ checkpointSaver: this.memory });
  }

  async processMessage(message, sessionId, participantId) {
    try {
      // Analyze emotions first
      const emotions = await this.analyzeEmotions(message);
      
      // Process through workflow
      const result = await this.workflow.invoke({
        message,
        participantId,
        emotions,
        timestamp: new Date().toISOString()
      }, { 
        configurable: { thread_id: sessionId }
      });
      
      return result;
    } catch (error) {
      console.error('Workflow processing error:', error);
      throw error;
    }
  }

  async analyzeEmotions(message) {
    try {
      const emotions = await this.hume.empathicVoice.analyze(message);
      return this.processEmotionalInsights(emotions);
    } catch (error) {
      console.error('Emotion analysis failed:', error);
      return null;
    }
  }

  processEmotionalInsights(emotions) {
    if (!emotions?.predictions?.[0]?.emotions) return null;
    
    const topEmotions = emotions.predictions[0].emotions
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    
    return {
      primary: topEmotions[0]?.name,
      intensity: topEmotions[0]?.score,
      secondary: topEmotions[1]?.name,
      tertiary: topEmotions[2]?.name,
      timestamp: new Date().toISOString(),
      recommendations: this.generateEmotionalRecommendations(topEmotions)
    };
  }

  generateEmotionalRecommendations(emotions) {
    const recommendations = [];
    const primary = emotions[0];
    
    if (primary?.name === 'anger' && primary.score > 0.7) {
      recommendations.push('Consider taking a brief pause to allow emotions to settle');
      recommendations.push('Focus on underlying needs rather than positions');
    } else if (primary?.name === 'sadness' && primary.score > 0.6) {
      recommendations.push('Acknowledge the emotional impact of this situation');
      recommendations.push('Explore what support might be helpful');
    } else if (primary?.name === 'fear' && primary.score > 0.6) {
      recommendations.push('Address concerns about safety and security');
      recommendations.push('Clarify expectations and boundaries');
    }
    
    return recommendations;
  }

  shouldTransition(state) {
    // Determine next action based on state
    if (state.requiresIntervention) {
      return "intervention";
    }
    
    if (state.phaseComplete && state.readyForTransition) {
      if (state.currentPhase === "heal") {
        return "complete";
      }
      return "continue";
    }
    
    // Check for emotional escalation requiring step back
    const highIntensityEmotions = Object.values(state.emotionalStates)
      .some(emotion => emotion.intensity > 0.8);
    
    if (highIntensityEmotions && state.currentPhase !== "prepare") {
      return "back";
    }
    
    return "continue";
  }
}

module.exports = { MediationWorkflow };
```

## 2. Phase Implementation Details

### 2.1. Prepare Phase (I1)

```javascript
async preparePhase(state) {
  const prompt = `You are Udine, beginning the PREPARE phase of mediation.

Current situation:
- Conflict: ${state.conflictAnalysis.summary}
- Participants: ${state.participants.map(p => p.name).join(', ')}
- Key issues: ${state.conflictAnalysis.keyIssues.join(', ')}

Your tasks:
1. Welcome participants warmly
2. Explain the 5-phase mediation process
3. Establish ground rules for respectful communication
4. Set clear session goals based on the conflict analysis
5. Ensure all participants understand and agree to the framework

Tone: Professional, warm, and reassuring. Build trust and set positive expectations.`;

  const response = await this.llm.invoke(prompt);
  
  // Update state
  const updatedState = {
    ...state,
    currentPhase: "prepare",
    phaseOutputs: {
      ...state.phaseOutputs,
      prepare: {
        summary: response.content,
        keyInsights: ["Framework established", "Ground rules agreed"],
        nextSteps: ["Begin perspective sharing in Express phase"]
      }
    },
    phaseComplete: true,
    readyForTransition: true
  };
  
  return updatedState;
}
```

### 2.2. Express Phase (I2)

```javascript
async expressPhase(state) {
  const currentSpeaker = this.determineCurrentSpeaker(state);
  const emotionalContext = this.buildEmotionalContext(state);
  
  const prompt = `You are Udine, facilitating the EXPRESS phase.

Current speaker: ${currentSpeaker}
Emotional context: ${emotionalContext}
Previous messages: ${state.conversationHistory.slice(-3).map(m => `${m.speaker}: ${m.content}`).join('\n')}

Your tasks:
1. Manage turn-taking fairly
2. Encourage each participant to share their perspective fully
3. Validate emotions while maintaining structure
4. Prevent interruptions and ensure respectful dialogue
5. Ask clarifying questions when needed

Guidelines:
- If emotions are high (intensity > 0.7), acknowledge and help regulate
- Ensure each participant gets equal speaking time
- Summarize key points to show understanding

Tone: Empathetic, patient, and encouraging.`;

  const response = await this.llm.invoke(prompt);
  
  return {
    ...state,
    currentPhase: "express",
    phaseOutputs: {
      ...state.phaseOutputs,
      express: {
        summary: response.content,
        keyInsights: this.extractKeyInsights(state.conversationHistory),
        nextSteps: ["Move to understanding and clarification"]
      }
    }
  };
}
```

### 2.3. Understand Phase (I3)

```javascript
async understandPhase(state) {
  const commonGround = this.identifyCommonGround(state);
  const keyDifferences = this.identifyKeyDifferences(state);

  const prompt = `You are Udine, facilitating the UNDERSTAND phase.

Perspectives shared:
${state.participants.map(p => `${p.name}: ${p.perspective}`).join('\n')}

Common ground identified: ${commonGround.join(', ')}
Key differences: ${keyDifferences.join(', ')}

Your tasks:
1. Help clarify each party's underlying needs and interests
2. Highlight areas of agreement and shared values
3. Explore the root causes behind positions
4. Ask probing questions to deepen understanding
5. Reframe conflicts in terms of mutual interests

Focus on moving from positions to interests, and building empathy between participants.`;

  const response = await this.llm.invoke(prompt);

  return {
    ...state,
    currentPhase: "understand",
    phaseOutputs: {
      ...state.phaseOutputs,
      understand: {
        summary: response.content,
        keyInsights: [...commonGround, ...keyDifferences],
        nextSteps: ["Begin collaborative solution generation"]
      }
    }
  };
}
```

### 2.4. Resolve Phase (I4)

```javascript
async resolvePhase(state) {
  const sharedInterests = this.extractSharedInterests(state);

  const prompt = `You are Udine, facilitating the RESOLVE phase.

Shared interests: ${sharedInterests.join(', ')}
Session goals: ${state.sessionGoals.join(', ')}

Your tasks:
1. Guide brainstorming of creative solutions
2. Help evaluate options against shared interests
3. Facilitate negotiation and compromise
4. Create specific, actionable agreements
5. Ensure all parties feel heard in the solution

Generate concrete action items with:
- Clear responsibilities
- Specific timelines
- Measurable outcomes
- Mutual accountability`;

  const response = await this.llm.invoke(prompt);

  // Extract action items from response
  const actionItems = this.extractActionItems(response.content);

  return {
    ...state,
    currentPhase: "resolve",
    actionItems: [...state.actionItems, ...actionItems],
    phaseOutputs: {
      ...state.phaseOutputs,
      resolve: {
        summary: response.content,
        keyInsights: ["Solutions generated", "Agreements reached"],
        nextSteps: ["Focus on relationship healing and future prevention"]
      }
    }
  };
}
```

### 2.5. Heal Phase (I5)

```javascript
async healPhase(state) {
  const relationshipDynamics = this.assessRelationshipHealth(state);

  const prompt = `You are Udine, facilitating the HEAL phase.

Relationship assessment: ${relationshipDynamics}
Agreements reached: ${state.actionItems.map(item => item.title).join(', ')}

Your tasks:
1. Acknowledge the emotional journey and growth
2. Encourage expressions of empathy and understanding
3. Help parties envision positive future interactions
4. Address any remaining emotional wounds
5. Create a foundation for ongoing healthy communication

Focus on:
- Relationship repair and strengthening
- Future conflict prevention
- Emotional closure and healing
- Commitment to ongoing positive interaction`;

  const response = await this.llm.invoke(prompt);

  return {
    ...state,
    currentPhase: "heal",
    phaseComplete: true,
    readyForTransition: true,
    phaseOutputs: {
      ...state.phaseOutputs,
      heal: {
        summary: response.content,
        keyInsights: ["Relationship healing addressed", "Future vision created"],
        nextSteps: ["Complete session with summary and follow-up plan"]
      }
    }
  };
}
```

## 3. Integration with ElevenLabs and Hume AI

### 3.1. Real-time Emotional Adaptation

```javascript
// server/services/langchain/emotionalAdaptation.js
class EmotionalAdaptationService {
  constructor(mediationWorkflow, humeClient) {
    this.workflow = mediationWorkflow;
    this.hume = humeClient;
  }

  async adaptToEmotionalState(state, newEmotions) {
    const adaptationNeeded = this.assessAdaptationNeeds(state, newEmotions);

    if (adaptationNeeded.requiresIntervention) {
      return await this.triggerEmotionalIntervention(state, newEmotions);
    }

    if (adaptationNeeded.adjustTone) {
      return await this.adjustCommunicationTone(state, newEmotions);
    }

    return state;
  }

  assessAdaptationNeeds(state, emotions) {
    const highIntensity = emotions.intensity > 0.8;
    const negativeEmotions = ['anger', 'fear', 'sadness'].includes(emotions.primary);
    const escalation = this.detectEmotionalEscalation(state, emotions);

    return {
      requiresIntervention: highIntensity && negativeEmotions,
      adjustTone: emotions.intensity > 0.6,
      escalation: escalation
    };
  }

  async triggerEmotionalIntervention(state, emotions) {
    const interventionPrompt = `EMOTIONAL INTERVENTION NEEDED

Current emotion: ${emotions.primary} (intensity: ${emotions.intensity})
Recommendations: ${emotions.recommendations.join(', ')}

As Udine, provide immediate emotional support:
1. Acknowledge the strong emotions
2. Validate the person's experience
3. Suggest a brief pause if needed
4. Offer grounding techniques
5. Gently guide back to constructive dialogue

Be especially empathetic and supportive.`;

    const response = await this.workflow.llm.invoke(interventionPrompt);

    return {
      ...state,
      requiresIntervention: true,
      interventionResponse: response.content,
      emotionalStates: {
        ...state.emotionalStates,
        [emotions.participantId]: emotions
      }
    };
  }
}
```

## 4. Testing and Validation

### 4.1. Workflow Testing

```javascript
// server/test/testMediationWorkflow.js
const { MediationWorkflow } = require('../services/langchain/mediationWorkflow');

async function testCompleteWorkflow() {
  const workflow = new MediationWorkflow();
  const sessionId = 'test-session-' + Date.now();

  // Test each phase
  const phases = ['prepare', 'express', 'understand', 'resolve', 'heal'];

  for (const phase of phases) {
    console.log(`Testing ${phase} phase...`);

    const result = await workflow.processMessage(
      `Test message for ${phase} phase`,
      sessionId,
      'test-participant'
    );

    console.log(`✅ ${phase} phase completed:`, result.currentPhase);
  }

  console.log('🎉 Complete workflow test passed');
}

testCompleteWorkflow().catch(console.error);
```

This comprehensive guide provides the foundation for implementing the sophisticated 5-phase mediation workflow using ai-sdk
