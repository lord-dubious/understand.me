/**
 * Base Agent class that provides common functionality for all AI agents
 * This serves as the foundation for specific agent implementations
 */

import { 
  AgentConfiguration, 
  AgentState, 
  AgentMessage, 
  AgentResponse, 
  AgentAction 
} from '../../types/agent';

export abstract class BaseAgent {
  protected config: AgentConfiguration;
  protected state: AgentState;

  constructor(config: AgentConfiguration) {
    this.config = config;
    this.state = {
      id: config.id,
      isActive: false,
      currentEmotion: 'neutral',
      conversationContext: [],
      sessionData: {}
    };
  }

  // Getters for agent properties
  get id(): string {
    return this.config.id;
  }

  get name(): string {
    return this.config.persona.name;
  }

  get displayName(): string {
    return this.config.persona.displayName;
  }

  get isActive(): boolean {
    return this.state.isActive;
  }

  get currentEmotion(): string {
    return this.state.currentEmotion;
  }

  // Core agent lifecycle methods
  async activate(): Promise<void> {
    this.state.isActive = true;
    await this.onActivate();
  }

  async deactivate(): Promise<void> {
    this.state.isActive = false;
    await this.onDeactivate();
  }

  // Abstract methods that must be implemented by specific agents
  protected abstract onActivate(): Promise<void>;
  protected abstract onDeactivate(): Promise<void>;
  public abstract processMessage(message: string, context?: any): Promise<AgentResponse>;

  // Common utility methods
  protected createMessage(content: string, type: 'text' | 'voice' | 'action' = 'text'): AgentMessage {
    return {
      id: this.generateMessageId(),
      agentId: this.config.id,
      content,
      type,
      emotion: this.state.currentEmotion,
      timestamp: new Date()
    };
  }

  protected createResponse(message: AgentMessage, actions?: AgentAction[]): AgentResponse {
    return {
      message,
      actions,
      nextState: { ...this.state }
    };
  }

  protected updateEmotion(emotion: string): void {
    if (this.config.voice.emotions[emotion]) {
      this.state.currentEmotion = emotion;
    }
  }

  protected addToContext(message: string, role: 'user' | 'agent' = 'user'): void {
    this.state.conversationContext.push({
      role,
      content: message,
      timestamp: new Date()
    });

    // Keep context manageable (last 20 messages)
    if (this.state.conversationContext.length > 20) {
      this.state.conversationContext = this.state.conversationContext.slice(-20);
    }
  }

  protected getSystemPrompt(): string {
    return this.config.prompts.systemPrompt
      .replace('{agentName}', this.config.persona.displayName)
      .replace('{personality}', this.config.persona.personality.traits.join(', '))
      .replace('{communicationStyle}', this.config.persona.personality.communicationStyle)
      .replace('{expertise}', this.config.persona.personality.expertise.join(', '));
  }

  protected getMediationPrompt(): string {
    return this.config.prompts.mediationPrompt;
  }

  protected getAnalysisPrompt(): string {
    return this.config.prompts.analysisPrompt;
  }

  protected getCoachingPrompt(): string {
    return this.config.prompts.coachingPrompt;
  }

  protected generateMessageId(): string {
    return `${this.config.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Voice synthesis helper
  protected async synthesizeVoice(text: string, emotion?: string): Promise<string | null> {
    try {
      const voiceConfig = emotion && this.config.voice.emotions[emotion] 
        ? { ...this.config.voice, ...this.config.voice.emotions[emotion] }
        : this.config.voice;

      // This would integrate with the actual voice service
      // For now, return a placeholder URL
      return `voice://synthesized/${this.config.id}/${encodeURIComponent(text)}`;
    } catch (error) {
      console.error(`Voice synthesis failed for agent ${this.config.id}:`, error);
      return null;
    }
  }

  // Session management
  updateSessionData(sessionData: Partial<AgentState['sessionData']>): void {
    this.state.sessionData = { ...this.state.sessionData, ...sessionData };
  }

  getSessionData(): AgentState['sessionData'] {
    return this.state.sessionData;
  }

  // Configuration access
  getConfiguration(): AgentConfiguration {
    return { ...this.config };
  }

  getPersona() {
    return this.config.persona;
  }

  getCapabilities() {
    return this.config.capabilities;
  }

  getVoiceConfig() {
    return this.config.voice;
  }
}

