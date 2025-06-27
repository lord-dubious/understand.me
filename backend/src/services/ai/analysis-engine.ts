import { GoogleGenerativeAI } from '@google/generative-ai'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { PromptTemplate } from 'langchain/prompts'
import { LLMChain } from 'langchain/chains'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { logger } from '../../utils/logger'

export interface ConflictInput {
  description: string
  participants: Participant[]
  fileAnalysis?: string
  context?: any
}

export interface Participant {
  id: string
  name: string
  personalityProfile?: PersonalityProfile
  communicationStyle?: string
}

export interface PersonalityProfile {
  communicationStyle: 'direct' | 'diplomatic' | 'expressive' | 'analytical'
  conflictApproach: 'collaborative' | 'competitive' | 'accommodating' | 'avoiding' | 'compromising'
  emotionalProcessing: 'internal' | 'external' | 'mixed'
  decisionMaking: 'logical' | 'intuitive' | 'consensus' | 'authoritative'
  values: string[]
  strengths: string[]
  growthAreas: string[]
}

export interface ConflictAnalysis {
  conflictType: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  emotionalIntensity: number
  keyIssues: string[]
  suggestedApproach: string
  riskFactors: string[]
  strengths: string[]
  confidence: number
  emotionalInsights?: string[]
}

export interface MediationStrategy {
  goals: string[]
  phaseGuidance: Record<string, string>
  interventionStrategies: string[]
  successMetrics: string[]
  adaptations: Record<string, any>
}

export interface SessionContext {
  sessionId: string
  currentPhase: 'prepare' | 'express' | 'understand' | 'resolve' | 'heal'
  participants: Participant[]
  conflictSummary: string
  previousMessages: any[]
  emotionalClimate?: string
  progressScore?: number
}

export interface AIResponse {
  text: string
  emotionalTone?: string
  nextAction?: string
  phaseTransition?: string
  shouldSpeak: boolean
  emotionalContext?: EmotionalContext
}

export interface EmotionalContext {
  tone: 'calming' | 'encouraging' | 'neutral' | 'serious'
  intensity: number
  supportLevel: 'high' | 'medium' | 'low'
}

export class ConflictAnalysisEngine {
  private genAI: GoogleGenerativeAI
  private chatModel: ChatGoogleGenerativeAI
  
  constructor(genAiApiKey: string, humeApiKey: string) {
    this.genAI = new GoogleGenerativeAI(genAiApiKey)
    this.chatModel = new ChatGoogleGenerativeAI({
      modelName: 'gemini-1.5-pro',
      temperature: 0.3,
      apiKey: genAiApiKey
    })
  }

  async analyzeConflictWithEmotions(input: ConflictInput): Promise<ConflictAnalysis> {
    try {
      const parser = StructuredOutputParser.fromNamesAndDescriptions({
        conflictType: "Type of conflict (relationship, workplace, family, etc.)",
        severity: "Severity level (low, medium, high, critical)",
        emotionalIntensity: "Emotional intensity score (1-10)",
        keyIssues: "Array of key issues identified",
        suggestedApproach: "Recommended mediation approach",
        riskFactors: "Potential risk factors to monitor",
        strengths: "Positive aspects to build upon",
        confidence: "AI confidence in analysis (0-1)",
        emotionalInsights: "Key emotional patterns detected"
      })

      const prompt = PromptTemplate.fromTemplate(`
        Analyze this conflict description as an expert mediator with emotional intelligence:
        
        Description: {description}
        Context Files: {fileAnalysis}
        Participant Info: {participantContext}
        
        Provide a thorough analysis considering:
        1. The nature and root causes of the conflict
        2. Emotional dynamics and intensity levels
        3. Communication patterns and barriers
        4. Potential risks and positive elements
        5. Recommended mediation approach
        
        {format_instructions}
      `)

      const chain = new LLMChain({
        llm: this.chatModel,
        prompt,
        outputParser: parser
      })

      const result = await chain.call({
        description: input.description,
        fileAnalysis: input.fileAnalysis || 'None provided',
        participantContext: JSON.stringify(input.participants),
        format_instructions: parser.getFormatInstructions()
      })

      logger.info('Enhanced conflict analysis completed', { 
        conflictType: result.conflictType,
        severity: result.severity 
      })

      return result as ConflictAnalysis
    } catch (error) {
      logger.error('Error in enhanced conflict analysis:', error)
      throw new Error('Failed to analyze conflict with emotions')
    }
  }

  async generateMediationStrategy(
    analysis: ConflictAnalysis,
    participants: Participant[]
  ): Promise<MediationStrategy> {
    try {
      const prompt = PromptTemplate.fromTemplate(`
        Create a personalized mediation strategy based on:
        
        Conflict Analysis: {analysis}
        Participants: {participants}
        
        Generate a comprehensive strategy including:
        1. Clear session goals and objectives
        2. Phase-specific guidance for each of the 5 phases (Prepare, Express, Understand, Resolve, Heal)
        3. Intervention strategies for different scenarios
        4. Success metrics and evaluation criteria
        5. Adaptations based on participant personalities and communication styles
        
        Format as JSON with clear structure.
      `)

      const chain = new LLMChain({
        llm: this.chatModel,
        prompt
      })

      const result = await chain.call({
        analysis: JSON.stringify(analysis),
        participants: JSON.stringify(participants)
      })

      const strategy = JSON.parse(result.text)
      
      logger.info('Mediation strategy generated', { 
        goalsCount: strategy.goals?.length,
        strategiesCount: strategy.interventionStrategies?.length 
      })

      return strategy
    } catch (error) {
      logger.error('Error generating mediation strategy:', error)
      throw new Error('Failed to generate mediation strategy')
    }
  }

  async generateResponse(
    userInput: string,
    context: SessionContext
  ): Promise<AIResponse> {
    try {
      const prompt = PromptTemplate.fromTemplate(`
        You are an expert AI mediator facilitating a conflict resolution session.
        
        Current Context:
        - Session Phase: {currentPhase}
        - Participants: {participants}
        - Conflict Summary: {conflictSummary}
        - Recent Messages: {recentMessages}
        - Emotional Climate: {emotionalClimate}
        - Progress Score: {progressScore}/10
        
        User Input: "{userInput}"
        
        Generate an appropriate response that:
        1. Acknowledges the input empathetically
        2. Advances the mediation process
        3. Maintains emotional safety
        4. Encourages constructive dialogue
        5. Considers the current phase objectives
        
        Respond with JSON containing:
        - text: Your response (1-3 sentences)
        - emotionalTone: The tone to use (calming, encouraging, neutral, serious)
        - nextAction: Suggested next step (optional)
        - phaseTransition: If phase should change (optional)
        - shouldSpeak: Whether this should be spoken aloud (boolean)
      `)

      const chain = new LLMChain({
        llm: this.chatModel,
        prompt
      })

      const result = await chain.call({
        currentPhase: context.currentPhase,
        participants: JSON.stringify(context.participants),
        conflictSummary: context.conflictSummary,
        recentMessages: JSON.stringify(context.previousMessages.slice(-3)),
        emotionalClimate: context.emotionalClimate || 'neutral',
        progressScore: context.progressScore || 5,
        userInput
      })

      const response = JSON.parse(result.text)
      
      logger.info('AI response generated', { 
        phase: context.currentPhase,
        tone: response.emotionalTone,
        shouldSpeak: response.shouldSpeak
      })

      return {
        ...response,
        emotionalContext: {
          tone: response.emotionalTone || 'neutral',
          intensity: this.calculateEmotionalIntensity(response.emotionalTone),
          supportLevel: this.calculateSupportLevel(context.currentPhase)
        }
      }
    } catch (error) {
      logger.error('Error generating AI response:', error)
      throw new Error('Failed to generate AI response')
    }
  }

  private calculateEmotionalIntensity(tone: string): number {
    const intensityMap: Record<string, number> = {
      'calming': 3,
      'encouraging': 6,
      'neutral': 5,
      'serious': 8
    }
    return intensityMap[tone] || 5
  }

  private calculateSupportLevel(phase: string): 'high' | 'medium' | 'low' {
    const supportMap: Record<string, 'high' | 'medium' | 'low'> = {
      'prepare': 'high',
      'express': 'high',
      'understand': 'medium',
      'resolve': 'medium',
      'heal': 'high'
    }
    return supportMap[phase] || 'medium'
  }
}
