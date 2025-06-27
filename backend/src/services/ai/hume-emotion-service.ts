import { HumeApi, HumeClient } from 'hume'
import { logger } from '../../utils/logger'

export interface EmotionScore {
  name: string
  score: number
}

export interface EmotionAnalysis {
  emotions: EmotionScore[]
  dominantEmotion: string
  emotionalIntensity: number
  valence: 'positive' | 'negative' | 'neutral'
  arousal: 'high' | 'medium' | 'low'
  confidence: number
}

export interface EmotionalInsights {
  summary: string
  recommendations: string[]
  riskFactors: string[]
  strengths: string[]
  interventionSuggestions: string[]
}

export class HumeEmotionService {
  private client: HumeClient
  
  constructor(apiKey: string) {
    this.client = new HumeClient({
      apiKey
    })
  }

  async analyzeTextEmotions(text: string): Promise<EmotionAnalysis> {
    try {
      const response = await this.client.expressionMeasurement.batch.startInferenceJob({
        models: {
          language: {
            granularity: 'sentence'
          }
        },
        transcription: {
          language: 'en'
        },
        text: [text]
      })

      // Wait for job completion and get results
      const jobId = response.jobId
      const results = await this.waitForJobCompletion(jobId)
      
      if (!results || !results.predictions || results.predictions.length === 0) {
        throw new Error('No emotion predictions returned')
      }

      const emotions = results.predictions[0].models.language.groupedPredictions[0].predictions[0].emotions
      
      return this.processEmotionResults(emotions)
    } catch (error) {
      logger.error('Error analyzing text emotions:', error)
      throw new Error('Failed to analyze text emotions')
    }
  }

  async analyzeVoiceEmotions(audioBase64: string): Promise<EmotionAnalysis> {
    try {
      // Convert base64 to buffer
      const audioBuffer = Buffer.from(audioBase64, 'base64')
      
      const response = await this.client.expressionMeasurement.batch.startInferenceJob({
        models: {
          prosody: {
            granularity: 'utterance'
          }
        },
        files: [{
          filename: 'audio.wav',
          data: audioBuffer
        }]
      })

      const jobId = response.jobId
      const results = await this.waitForJobCompletion(jobId)
      
      if (!results || !results.predictions || results.predictions.length === 0) {
        throw new Error('No emotion predictions returned')
      }

      const emotions = results.predictions[0].models.prosody.groupedPredictions[0].predictions[0].emotions
      
      return this.processEmotionResults(emotions)
    } catch (error) {
      logger.error('Error analyzing voice emotions:', error)
      throw new Error('Failed to analyze voice emotions')
    }
  }

  async analyzeFacialEmotions(imageBase64: string): Promise<EmotionAnalysis> {
    try {
      // Convert base64 to buffer
      const imageBuffer = Buffer.from(imageBase64, 'base64')
      
      const response = await this.client.expressionMeasurement.batch.startInferenceJob({
        models: {
          face: {
            facs: {},
            descriptions: {},
            identification: {}
          }
        },
        files: [{
          filename: 'image.jpg',
          data: imageBuffer
        }]
      })

      const jobId = response.jobId
      const results = await this.waitForJobCompletion(jobId)
      
      if (!results || !results.predictions || results.predictions.length === 0) {
        throw new Error('No emotion predictions returned')
      }

      const emotions = results.predictions[0].models.face.groupedPredictions[0].predictions[0].emotions
      
      return this.processEmotionResults(emotions)
    } catch (error) {
      logger.error('Error analyzing facial emotions:', error)
      throw new Error('Failed to analyze facial emotions')
    }
  }

  generateEmotionalInsights(analysis: EmotionAnalysis): EmotionalInsights {
    const { emotions, dominantEmotion, emotionalIntensity, valence } = analysis
    
    // Generate summary
    const summary = this.generateEmotionalSummary(dominantEmotion, emotionalIntensity, valence)
    
    // Generate recommendations based on emotional state
    const recommendations = this.generateRecommendations(emotions, dominantEmotion, valence)
    
    // Identify risk factors
    const riskFactors = this.identifyRiskFactors(emotions, emotionalIntensity)
    
    // Identify strengths
    const strengths = this.identifyStrengths(emotions, valence)
    
    // Generate intervention suggestions
    const interventionSuggestions = this.generateInterventions(dominantEmotion, emotionalIntensity)
    
    return {
      summary,
      recommendations,
      riskFactors,
      strengths,
      interventionSuggestions
    }
  }

  private async waitForJobCompletion(jobId: string, maxAttempts: number = 30): Promise<any> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const status = await this.client.expressionMeasurement.batch.getJobDetails(jobId)
        
        if (status.state.status === 'COMPLETED') {
          return await this.client.expressionMeasurement.batch.getJobPredictions(jobId)
        } else if (status.state.status === 'FAILED') {
          throw new Error(`Job failed: ${status.state.message}`)
        }
        
        // Wait 2 seconds before next attempt
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (error) {
        logger.error(`Attempt ${attempt + 1} failed:`, error)
        if (attempt === maxAttempts - 1) {
          throw error
        }
      }
    }
    
    throw new Error('Job completion timeout')
  }

  private processEmotionResults(emotions: any[]): EmotionAnalysis {
    const emotionScores: EmotionScore[] = emotions.map(emotion => ({
      name: emotion.name,
      score: emotion.score
    }))

    // Sort by score to find dominant emotion
    const sortedEmotions = emotionScores.sort((a, b) => b.score - a.score)
    const dominantEmotion = sortedEmotions[0].name
    const emotionalIntensity = sortedEmotions[0].score

    // Calculate valence (positive/negative/neutral)
    const valence = this.calculateValence(emotionScores)
    
    // Calculate arousal (high/medium/low)
    const arousal = this.calculateArousal(emotionScores)
    
    // Calculate confidence based on score distribution
    const confidence = this.calculateConfidence(sortedEmotions)

    return {
      emotions: emotionScores,
      dominantEmotion,
      emotionalIntensity,
      valence,
      arousal,
      confidence
    }
  }

  private calculateValence(emotions: EmotionScore[]): 'positive' | 'negative' | 'neutral' {
    const positiveEmotions = ['joy', 'amusement', 'love', 'admiration', 'approval', 'caring', 'excitement', 'gratitude', 'hope', 'optimism', 'pride', 'relief']
    const negativeEmotions = ['anger', 'annoyance', 'disappointment', 'disapproval', 'disgust', 'embarrassment', 'fear', 'grief', 'nervousness', 'remorse', 'sadness']
    
    let positiveScore = 0
    let negativeScore = 0
    
    emotions.forEach(emotion => {
      if (positiveEmotions.includes(emotion.name)) {
        positiveScore += emotion.score
      } else if (negativeEmotions.includes(emotion.name)) {
        negativeScore += emotion.score
      }
    })
    
    const difference = Math.abs(positiveScore - negativeScore)
    if (difference < 0.1) return 'neutral'
    return positiveScore > negativeScore ? 'positive' : 'negative'
  }

  private calculateArousal(emotions: EmotionScore[]): 'high' | 'medium' | 'low' {
    const highArousalEmotions = ['anger', 'excitement', 'fear', 'surprise', 'joy']
    const lowArousalEmotions = ['sadness', 'calmness', 'contentment', 'boredom']
    
    let highArousalScore = 0
    let lowArousalScore = 0
    
    emotions.forEach(emotion => {
      if (highArousalEmotions.includes(emotion.name)) {
        highArousalScore += emotion.score
      } else if (lowArousalEmotions.includes(emotion.name)) {
        lowArousalScore += emotion.score
      }
    })
    
    if (highArousalScore > 0.6) return 'high'
    if (lowArousalScore > 0.6) return 'low'
    return 'medium'
  }

  private calculateConfidence(sortedEmotions: EmotionScore[]): number {
    if (sortedEmotions.length < 2) return sortedEmotions[0]?.score || 0
    
    const topScore = sortedEmotions[0].score
    const secondScore = sortedEmotions[1].score
    const difference = topScore - secondScore
    
    // Higher difference means higher confidence
    return Math.min(topScore + difference, 1.0)
  }

  private generateEmotionalSummary(dominantEmotion: string, intensity: number, valence: string): string {
    const intensityLevel = intensity > 0.7 ? 'high' : intensity > 0.4 ? 'moderate' : 'low'
    return `The dominant emotion detected is ${dominantEmotion} with ${intensityLevel} intensity. Overall emotional valence is ${valence}.`
  }

  private generateRecommendations(emotions: EmotionScore[], dominantEmotion: string, valence: string): string[] {
    const recommendations: string[] = []
    
    if (valence === 'negative') {
      recommendations.push('Consider using calming techniques and empathetic responses')
      recommendations.push('Focus on validation and emotional safety')
    }
    
    if (dominantEmotion === 'anger') {
      recommendations.push('Allow time for emotional regulation before proceeding')
      recommendations.push('Use de-escalation techniques')
    }
    
    if (dominantEmotion === 'sadness') {
      recommendations.push('Provide emotional support and understanding')
      recommendations.push('Focus on hope and positive outcomes')
    }
    
    return recommendations
  }

  private identifyRiskFactors(emotions: EmotionScore[], intensity: number): string[] {
    const riskFactors: string[] = []
    
    if (intensity > 0.8) {
      riskFactors.push('High emotional intensity may lead to escalation')
    }
    
    const angerScore = emotions.find(e => e.name === 'anger')?.score || 0
    if (angerScore > 0.6) {
      riskFactors.push('Elevated anger levels detected')
    }
    
    const fearScore = emotions.find(e => e.name === 'fear')?.score || 0
    if (fearScore > 0.5) {
      riskFactors.push('Fear may inhibit open communication')
    }
    
    return riskFactors
  }

  private identifyStrengths(emotions: EmotionScore[], valence: string): string[] {
    const strengths: string[] = []
    
    if (valence === 'positive') {
      strengths.push('Positive emotional climate supports constructive dialogue')
    }
    
    const hopeScore = emotions.find(e => e.name === 'hope')?.score || 0
    if (hopeScore > 0.4) {
      strengths.push('Presence of hope indicates openness to resolution')
    }
    
    const caringScore = emotions.find(e => e.name === 'caring')?.score || 0
    if (caringScore > 0.3) {
      strengths.push('Caring emotions suggest investment in relationship')
    }
    
    return strengths
  }

  private generateInterventions(dominantEmotion: string, intensity: number): string[] {
    const interventions: string[] = []
    
    if (intensity > 0.7) {
      interventions.push('Implement breathing exercises or brief pause')
    }
    
    switch (dominantEmotion) {
      case 'anger':
        interventions.push('Use reflective listening and validation')
        interventions.push('Encourage expression of underlying needs')
        break
      case 'sadness':
        interventions.push('Provide emotional support and reassurance')
        interventions.push('Focus on strengths and positive aspects')
        break
      case 'fear':
        interventions.push('Create safety and predictability')
        interventions.push('Address concerns directly and honestly')
        break
      default:
        interventions.push('Continue with standard mediation process')
    }
    
    return interventions
  }
}
