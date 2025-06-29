/**
 * AI Orchestration Engine
 * Coordinates AI SDK, Gemini (document analysis only), Hume Expression Measurement, and ElevenLabs
 * Uses LangChain-style orchestration patterns with AI SDK
 */

import { google } from '@ai-sdk/google';
import { generateText, streamText, generateObject } from 'ai';
import { z } from 'zod';
import { humeExpressionMeasurement, HumeExpressionResult } from '../hume/expressionMeasurement';
import { elevenLabsConversationalAI, elevenLabsTTS } from '../elevenlabs/conversationalAI';

// Gemini Models Configuration (ONLY for document analysis)
export const GEMINI_MODELS = {
  DOCUMENT_ANALYSIS: google('gemini-1.5-pro'), // ONLY for document analysis
  CONFLICT_ANALYSIS: google('gemini-1.5-flash'), // For conflict pattern analysis
};

// Orchestration Configuration
export const ORCHESTRATION_CONFIG = {
  maxTokens: 2000,
  temperature: 0.7,
  
  // Gemini is ONLY used for document analysis - NOT conversation
  documentAnalysisPrompt: `You are a specialized document analysis AI. Your ONLY role is to analyze documents and extract key information. You do NOT engage in conversation or mediation.

Analyze documents for:
1. Key information and facts
2. Emotional tone and sentiment
3. Conflict-relevant content
4. Action items and agreements
5. Important quotes and references

Provide structured analysis without conversational elements.`,
  
  conflictAnalysisPrompt: `Analyze the conversation context and provide structured insights for conflict resolution. Focus on:
1. Conflict patterns and triggers
2. Underlying needs and interests  
3. Communication dynamics
4. Resolution opportunities
5. Recommended interventions

Provide actionable analysis for the mediation process.`
};

// Analysis Types
export interface ConflictAnalysis {
  conflictType: 'interpersonal' | 'family' | 'workplace' | 'neighbor' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  triggers: string[];
  underlyingNeeds: string[];
  communicationPatterns: {
    positive: string[];
    negative: string[];
    suggestions: string[];
  };
  resolutionOpportunities: string[];
  recommendedInterventions: string[];
  nextSteps: string[];
}

export interface DocumentAnalysis {
  documentType: string;
  keyPoints: string[];
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';
  actionItems: string[];
  relevantQuotes: string[];
  summary: string;
  conflictRelevance: number; // 0-100
}

export interface OrchestrationContext {
  conversationId: string;
  participantIds: string[];
  conflictType?: string;
  sessionPhase: 'opening' | 'exploration' | 'negotiation' | 'resolution' | 'closing';
  emotionHistory: HumeExpressionResult[];
  documents?: File[];
}

export interface OrchestrationResult {
  emotionAnalysis: HumeExpressionResult;
  conflictAnalysis: ConflictAnalysis;
  documentAnalyses: DocumentAnalysis[];
  recommendations: string[];
  nextActions: string[];
  voiceResponse?: ArrayBuffer; // ElevenLabs TTS output
}

/**
 * AI Orchestration Engine
 * Coordinates all AI services in a LangChain-style pipeline
 */
export class AIOrchestrationEngine {
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize the orchestration engine
   */
  private async initialize() {
    try {
      // Test Gemini models
      await this.testGeminiModels();
      
      // Initialize other services
      console.log('🔄 Initializing AI services...');
      
      this.isInitialized = true;
      console.log('✅ AI Orchestration Engine initialized');
    } catch (error) {
      console.error('❌ Failed to initialize AI Orchestration Engine:', error);
    }
  }

  /**
   * Test Gemini model availability
   */
  private async testGeminiModels() {
    try {
      const testResult = await generateText({
        model: GEMINI_MODELS.CONFLICT_ANALYSIS,
        prompt: 'Test connection',
        maxTokens: 10
      });
      
      if (!testResult.text) {
        throw new Error('Gemini model test failed');
      }
    } catch (error) {
      console.error('Gemini model test failed:', error);
      throw error;
    }
  }

  /**
   * Main orchestration pipeline
   * Coordinates all AI services for comprehensive analysis
   */
  async orchestrate(
    input: {
      text?: string;
      audio?: ArrayBuffer;
      documents?: File[];
    },
    context: OrchestrationContext
  ): Promise<OrchestrationResult> {
    try {
      console.log('🔄 Starting AI orchestration pipeline...');

      // Step 1: Emotion Analysis (Hume Expression Measurement)
      let emotionAnalysis: HumeExpressionResult;
      if (input.audio) {
        emotionAnalysis = await humeExpressionMeasurement.analyzeAudio(input.audio, {
          conversationId: context.conversationId,
          participantId: context.participantIds[0],
          conflictType: context.conflictType,
          sessionPhase: context.sessionPhase
        });
      } else if (input.text) {
        emotionAnalysis = await humeExpressionMeasurement.analyzeText(input.text, {
          conversationId: context.conversationId,
          participantId: context.participantIds[0],
          conflictType: context.conflictType,
          sessionPhase: context.sessionPhase
        });
      } else {
        emotionAnalysis = await humeExpressionMeasurement.analyzeText('No input provided');
      }

      // Step 2: Document Analysis (Gemini - ONLY for documents)
      const documentAnalyses: DocumentAnalysis[] = [];
      if (input.documents && input.documents.length > 0) {
        for (const document of input.documents) {
          const analysis = await this.analyzeDocument(document);
          documentAnalyses.push(analysis);
        }
      }

      // Step 3: Conflict Analysis (Gemini - for conflict patterns)
      const conflictAnalysis = await this.analyzeConflict(
        input.text || 'Audio input provided',
        emotionAnalysis,
        documentAnalyses,
        context
      );

      // Step 4: Generate Recommendations
      const recommendations = await this.generateRecommendations(
        emotionAnalysis,
        conflictAnalysis,
        documentAnalyses,
        context
      );

      // Step 5: Determine Next Actions
      const nextActions = await this.determineNextActions(
        emotionAnalysis,
        conflictAnalysis,
        context
      );

      // Step 6: Generate Voice Response (ElevenLabs TTS)
      let voiceResponse: ArrayBuffer | undefined;
      if (recommendations.length > 0) {
        try {
          const responseText = recommendations[0]; // Use first recommendation for voice
          voiceResponse = await elevenLabsTTS.textToSpeech(responseText);
        } catch (error) {
          console.warn('Voice response generation failed:', error);
        }
      }

      console.log('✅ AI orchestration pipeline completed');

      return {
        emotionAnalysis,
        conflictAnalysis,
        documentAnalyses,
        recommendations,
        nextActions,
        voiceResponse
      };
    } catch (error) {
      console.error('❌ AI orchestration failed:', error);
      throw error;
    }
  }

  /**
   * Analyze documents using Gemini (ONLY for document analysis)
   */
  async analyzeDocument(document: File): Promise<DocumentAnalysis> {
    try {
      // Convert file to base64 for Gemini
      const arrayBuffer = await document.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');
      
      const result = await generateObject({
        model: GEMINI_MODELS.DOCUMENT_ANALYSIS,
        system: ORCHESTRATION_CONFIG.documentAnalysisPrompt,
        prompt: `Analyze this document for conflict resolution context:`,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Document: ${document.name}`
              },
              {
                type: 'file',
                data: base64,
                mimeType: document.type
              }
            ]
          }
        ],
        schema: z.object({
          documentType: z.string(),
          keyPoints: z.array(z.string()),
          sentiment: z.enum(['positive', 'negative', 'neutral', 'mixed']),
          actionItems: z.array(z.string()),
          relevantQuotes: z.array(z.string()),
          summary: z.string(),
          conflictRelevance: z.number().min(0).max(100)
        })
      });

      return result.object;
    } catch (error) {
      console.error('Document analysis failed:', error);
      return {
        documentType: 'unknown',
        keyPoints: ['Analysis failed'],
        sentiment: 'neutral',
        actionItems: [],
        relevantQuotes: [],
        summary: 'Document analysis unavailable',
        conflictRelevance: 0
      };
    }
  }

  /**
   * Analyze conflict patterns using Gemini
   */
  async analyzeConflict(
    text: string,
    emotionAnalysis: HumeExpressionResult,
    documentAnalyses: DocumentAnalysis[],
    context: OrchestrationContext
  ): Promise<ConflictAnalysis> {
    try {
      const contextInfo = {
        text,
        emotions: emotionAnalysis,
        documents: documentAnalyses,
        sessionPhase: context.sessionPhase,
        participantCount: context.participantIds.length,
        emotionHistory: context.emotionHistory.slice(-5) // Last 5 emotion analyses
      };

      const result = await generateObject({
        model: GEMINI_MODELS.CONFLICT_ANALYSIS,
        system: ORCHESTRATION_CONFIG.conflictAnalysisPrompt,
        prompt: `Analyze this conflict situation:

Context: ${JSON.stringify(contextInfo, null, 2)}

Provide comprehensive conflict analysis.`,
        schema: z.object({
          conflictType: z.enum(['interpersonal', 'family', 'workplace', 'neighbor', 'other']),
          severity: z.enum(['low', 'medium', 'high', 'critical']),
          triggers: z.array(z.string()),
          underlyingNeeds: z.array(z.string()),
          communicationPatterns: z.object({
            positive: z.array(z.string()),
            negative: z.array(z.string()),
            suggestions: z.array(z.string())
          }),
          resolutionOpportunities: z.array(z.string()),
          recommendedInterventions: z.array(z.string()),
          nextSteps: z.array(z.string())
        })
      });

      return result.object;
    } catch (error) {
      console.error('Conflict analysis failed:', error);
      return {
        conflictType: 'other',
        severity: 'medium',
        triggers: ['Analysis unavailable'],
        underlyingNeeds: ['Unknown'],
        communicationPatterns: {
          positive: [],
          negative: [],
          suggestions: ['Improve communication']
        },
        resolutionOpportunities: [],
        recommendedInterventions: ['Continue dialogue'],
        nextSteps: ['Gather more information']
      };
    }
  }

  /**
   * Generate personalized recommendations
   */
  async generateRecommendations(
    emotionAnalysis: HumeExpressionResult,
    conflictAnalysis: ConflictAnalysis,
    documentAnalyses: DocumentAnalysis[],
    context: OrchestrationContext
  ): Promise<string[]> {
    try {
      const analysisContext = {
        emotions: emotionAnalysis,
        conflict: conflictAnalysis,
        documents: documentAnalyses,
        sessionPhase: context.sessionPhase
      };

      const result = await generateText({
        model: GEMINI_MODELS.CONFLICT_ANALYSIS,
        prompt: `Based on this analysis, generate 3-5 specific recommendations:

Analysis: ${JSON.stringify(analysisContext, null, 2)}

Each recommendation should be:
1. Specific and actionable
2. Appropriate for the current emotional state
3. Aligned with conflict resolution best practices
4. Feasible to implement

Format as a simple list.`,
        maxTokens: 500
      });

      return result.text
        .split('\n')
        .filter(line => line.trim().length > 0)
        .map(line => line.replace(/^\d+\.\s*/, '').trim())
        .slice(0, 5);
    } catch (error) {
      console.error('Recommendation generation failed:', error);
      return [
        'Take a moment to breathe and center yourself',
        'Focus on understanding the other person\'s perspective',
        'Express your needs clearly and respectfully'
      ];
    }
  }

  /**
   * Determine next actions for the mediation process
   */
  async determineNextActions(
    emotionAnalysis: HumeExpressionResult,
    conflictAnalysis: ConflictAnalysis,
    context: OrchestrationContext
  ): Promise<string[]> {
    const actions: string[] = [];

    // Emotion-based actions
    if (emotionAnalysis.conflictLevel > 70) {
      actions.push('de-escalate');
      actions.push('pause-session');
    } else if (emotionAnalysis.resolutionPotential > 70) {
      actions.push('explore-solutions');
      actions.push('build-agreement');
    }

    // Conflict severity actions
    if (conflictAnalysis.severity === 'critical') {
      actions.push('emergency-intervention');
    } else if (conflictAnalysis.severity === 'high') {
      actions.push('structured-mediation');
    }

    // Session phase actions
    switch (context.sessionPhase) {
      case 'opening':
        actions.push('establish-ground-rules');
        actions.push('clarify-goals');
        break;
      case 'exploration':
        actions.push('facilitate-sharing');
        actions.push('identify-needs');
        break;
      case 'negotiation':
        actions.push('generate-options');
        actions.push('evaluate-solutions');
        break;
      case 'resolution':
        actions.push('finalize-agreement');
        actions.push('plan-follow-up');
        break;
      case 'closing':
        actions.push('summarize-outcomes');
        actions.push('schedule-check-in');
        break;
    }

    return [...new Set(actions)]; // Remove duplicates
  }

  /**
   * Stream orchestration for real-time processing
   */
  async streamOrchestration(
    textStream: AsyncIterable<string>,
    context: OrchestrationContext
  ): Promise<AsyncIterable<{
    emotionAnalysis?: HumeExpressionResult;
    partialRecommendations?: string[];
  }>> {
    const self = this;
    
    return {
      async *[Symbol.asyncIterator]() {
        let accumulatedText = '';
        
        for await (const chunk of textStream) {
          accumulatedText += chunk;
          
          // Analyze every few sentences
          if (accumulatedText.split('.').length >= 2) {
            try {
              const emotionAnalysis = await humeExpressionMeasurement.analyzeText(
                accumulatedText,
                {
                  conversationId: context.conversationId,
                  participantId: context.participantIds[0],
                  sessionPhase: context.sessionPhase
                }
              );

              const partialRecommendations = emotionAnalysis.recommendations;

              yield {
                emotionAnalysis,
                partialRecommendations
              };
            } catch (error) {
              console.error('Stream orchestration error:', error);
            }
            
            accumulatedText = ''; // Reset for next chunk
          }
        }
      }
    };
  }

  /**
   * Check if engine is ready
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Get engine status
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      humeAvailable: humeExpressionMeasurement.isAvailable(),
      elevenLabsAvailable: elevenLabsConversationalAI.getStatus().isInitialized,
      geminiAvailable: {
        documentAnalysis: !!GEMINI_MODELS.DOCUMENT_ANALYSIS,
        conflictAnalysis: !!GEMINI_MODELS.CONFLICT_ANALYSIS
      }
    };
  }
}

// Export singleton instance
export const aiOrchestrationEngine = new AIOrchestrationEngine();
export default aiOrchestrationEngine;
