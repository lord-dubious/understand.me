/**
 * Core type definitions for the multi-agent system
 * Supports multiple AI agents with different personas, voices, and behaviors
 */

export interface AgentPersona {
  name: string;
  displayName: string;
  description: string;
  personality: {
    traits: string[];
    communicationStyle: 'formal' | 'casual' | 'empathetic' | 'professional' | 'friendly';
    expertise: string[];
  };
  appearance: {
    avatar: string;
    animations: {
      idle: string;
      speaking: string;
      listening: string;
      thinking: string;
      happy: string;
      concerned: string;
      empathetic: string;
    };
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
}

export interface AgentVoiceConfig {
  provider: 'elevenlabs' | 'google' | 'azure';
  voiceId: string;
  settings: {
    stability: number;
    similarityBoost: number;
    style: number;
    useSpeakerBoost: boolean;
  };
  emotions: {
    [key: string]: {
      voiceId?: string;
      settings?: Partial<AgentVoiceConfig['settings']>;
    };
  };
}

export interface AgentCapabilities {
  canMediate: boolean;
  canAnalyze: boolean;
  canCoach: boolean;
  canTranslate: boolean;
  supportedLanguages: string[];
  specializations: string[];
}

export interface AgentPromptTemplates {
  systemPrompt: string;
  mediationPrompt: string;
  analysisPrompt: string;
  coachingPrompt: string;
  errorHandling: string;
  greeting: string;
  farewell: string;
}

export interface AgentConfiguration {
  id: string;
  version: string;
  persona: AgentPersona;
  voice: AgentVoiceConfig;
  capabilities: AgentCapabilities;
  prompts: AgentPromptTemplates;
  metadata: {
    created: string;
    updated: string;
    author: string;
    tags: string[];
  };
}

export interface AgentState {
  id: string;
  isActive: boolean;
  currentEmotion: string;
  conversationContext: any[];
  sessionData: {
    sessionId?: string;
    participants?: string[];
    phase?: string;
  };
}

export interface AgentMessage {
  id: string;
  agentId: string;
  content: string;
  type: 'text' | 'voice' | 'action';
  emotion: string;
  timestamp: Date;
  metadata?: {
    voiceUrl?: string;
    duration?: number;
    confidence?: number;
  };
}

export interface AgentResponse {
  message: AgentMessage;
  actions?: AgentAction[];
  nextState?: Partial<AgentState>;
}

export interface AgentAction {
  type: 'ui_update' | 'navigation' | 'external_call' | 'state_change';
  payload: any;
}

export interface AgentRegistry {
  [agentId: string]: AgentConfiguration;
}

export interface AgentManager {
  loadAgent(agentId: string): Promise<AgentConfiguration>;
  activateAgent(agentId: string): Promise<void>;
  deactivateAgent(agentId: string): Promise<void>;
  getActiveAgent(): AgentConfiguration | null;
  getAllAgents(): AgentRegistry;
  processMessage(message: string, context?: any): Promise<AgentResponse>;
  switchAgent(fromAgentId: string, toAgentId: string): Promise<void>;
}

