import axios from 'axios'
import { logger } from '../../utils/logger'
import { EmotionalContext } from './analysis-engine'

export interface VoiceSettings {
  stability: number
  similarity_boost: number
  style?: number
  use_speaker_boost?: boolean
}

export interface Voice {
  voice_id: string
  name: string
  category: string
  description?: string
  preview_url?: string
  available_for_tiers?: string[]
}

export interface SynthesisOptions {
  voice_id?: string
  model_id?: string
  voice_settings?: VoiceSettings
  pronunciation_dictionary_locators?: any[]
}

export class VoiceService {
  private apiKey: string
  private baseUrl = 'https://api.elevenlabs.io/v1'
  private defaultVoiceId = 'pNInz6obpgDQGcFmaJgB' // Adam voice
  
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async synthesizeSpeech(
    text: string,
    emotionalContext?: EmotionalContext,
    voiceId?: string
  ): Promise<Buffer> {
    try {
      const voice = voiceId || this.defaultVoiceId
      const voiceSettings = this.getVoiceSettings(emotionalContext)
      
      const response = await axios.post(
        `${this.baseUrl}/text-to-speech/${voice}`,
        {
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: voiceSettings
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.apiKey
          },
          responseType: 'arraybuffer'
        }
      )

      logger.info('Speech synthesized successfully', {
        textLength: text.length,
        voiceId: voice,
        emotionalTone: emotionalContext?.tone
      })

      return Buffer.from(response.data)
    } catch (error) {
      logger.error('Error synthesizing speech:', error)
      throw new Error('Failed to synthesize speech')
    }
  }

  async transcribeSpeech(audioBuffer: Buffer): Promise<string> {
    try {
      // Note: ElevenLabs doesn't provide STT, so this would integrate with another service
      // For now, return a placeholder implementation
      // In production, integrate with Google Speech-to-Text, Whisper, or similar
      
      logger.info('Speech transcription requested', {
        audioSize: audioBuffer.length
      })

      // Placeholder implementation
      return "Transcription would be implemented with Google Speech-to-Text or Whisper API"
    } catch (error) {
      logger.error('Error transcribing speech:', error)
      throw new Error('Failed to transcribe speech')
    }
  }

  async getAvailableVoices(): Promise<Voice[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      })

      const voices = response.data.voices.map((voice: any) => ({
        voice_id: voice.voice_id,
        name: voice.name,
        category: voice.category,
        description: voice.description,
        preview_url: voice.preview_url,
        available_for_tiers: voice.available_for_tiers
      }))

      logger.info('Retrieved available voices', { count: voices.length })
      return voices
    } catch (error) {
      logger.error('Error getting available voices:', error)
      throw new Error('Failed to get available voices')
    }
  }

  getVoiceSettings(emotionalContext?: EmotionalContext): VoiceSettings {
    if (!emotionalContext) {
      return {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.0,
        use_speaker_boost: true
      }
    }

    const { tone, intensity, supportLevel } = emotionalContext
    
    // Adjust settings based on emotional context
    let stability = 0.5
    let similarity_boost = 0.75
    let style = 0.0

    switch (tone) {
      case 'calming':
        stability = 0.8 // More stable for calming effect
        similarity_boost = 0.6
        style = 0.2
        break
      case 'encouraging':
        stability = 0.4 // Less stable for more energy
        similarity_boost = 0.8
        style = 0.6
        break
      case 'serious':
        stability = 0.9 // Very stable for serious tone
        similarity_boost = 0.9
        style = 0.1
        break
      case 'neutral':
      default:
        stability = 0.5
        similarity_boost = 0.75
        style = 0.0
        break
    }

    // Adjust based on intensity (1-10 scale)
    const intensityFactor = intensity / 10
    style = Math.min(style + (intensityFactor * 0.3), 1.0)
    
    // Adjust based on support level
    if (supportLevel === 'high') {
      stability += 0.1
      similarity_boost += 0.1
    } else if (supportLevel === 'low') {
      stability -= 0.1
      similarity_boost -= 0.1
    }

    // Ensure values are within valid ranges
    stability = Math.max(0, Math.min(1, stability))
    similarity_boost = Math.max(0, Math.min(1, similarity_boost))
    style = Math.max(0, Math.min(1, style))

    return {
      stability,
      similarity_boost,
      style,
      use_speaker_boost: true
    }
  }

  async cloneVoice(name: string, audioFiles: Buffer[], description?: string): Promise<string> {
    try {
      const formData = new FormData()
      formData.append('name', name)
      
      if (description) {
        formData.append('description', description)
      }

      // Add audio files
      audioFiles.forEach((audioBuffer, index) => {
        formData.append('files', new Blob([audioBuffer]), `sample_${index}.wav`)
      })

      const response = await axios.post(`${this.baseUrl}/voices/add`, formData, {
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'multipart/form-data'
        }
      })

      const voiceId = response.data.voice_id
      
      logger.info('Voice cloned successfully', {
        voiceId,
        name,
        samplesCount: audioFiles.length
      })

      return voiceId
    } catch (error) {
      logger.error('Error cloning voice:', error)
      throw new Error('Failed to clone voice')
    }
  }

  async deleteVoice(voiceId: string): Promise<void> {
    try {
      await axios.delete(`${this.baseUrl}/voices/${voiceId}`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      })

      logger.info('Voice deleted successfully', { voiceId })
    } catch (error) {
      logger.error('Error deleting voice:', error)
      throw new Error('Failed to delete voice')
    }
  }

  async getVoiceSettings(voiceId: string): Promise<VoiceSettings> {
    try {
      const response = await axios.get(`${this.baseUrl}/voices/${voiceId}/settings`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      })

      return response.data
    } catch (error) {
      logger.error('Error getting voice settings:', error)
      throw new Error('Failed to get voice settings')
    }
  }

  async updateVoiceSettings(voiceId: string, settings: VoiceSettings): Promise<void> {
    try {
      await axios.post(`${this.baseUrl}/voices/${voiceId}/settings/edit`, settings, {
        headers: {
          'xi-api-key': this.apiKey,
          'Content-Type': 'application/json'
        }
      })

      logger.info('Voice settings updated successfully', { voiceId, settings })
    } catch (error) {
      logger.error('Error updating voice settings:', error)
      throw new Error('Failed to update voice settings')
    }
  }
}
