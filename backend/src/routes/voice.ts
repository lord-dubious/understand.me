import { Router } from 'express'
import { VoiceService } from '../services/ai/voice-service'
import { logger } from '../utils/logger'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const voiceService = new VoiceService(process.env.ELEVENLABS_API_KEY!)

// Text-to-speech synthesis
router.post('/synthesize', authMiddleware, async (req, res) => {
  try {
    const { text, voiceId, emotionalContext } = req.body

    const audioBuffer = await voiceService.synthesizeSpeech(text, emotionalContext)

    // Convert buffer to base64 for response
    const audioBase64 = audioBuffer.toString('base64')

    res.json({ 
      audioBase64,
      mimeType: 'audio/mpeg',
      duration: Math.ceil(text.length / 10) // Rough estimate
    })
  } catch (error) {
    logger.error('Voice synthesis error:', error)
    res.status(500).json({ error: 'Failed to synthesize speech' })
  }
})

// Speech-to-text transcription
router.post('/transcribe', authMiddleware, async (req, res) => {
  try {
    const { audioBase64 } = req.body

    // Convert base64 to buffer
    const audioBuffer = Buffer.from(audioBase64, 'base64')
    
    // For now, return a placeholder - implement actual transcription
    const transcript = await voiceService.transcribeSpeech(audioBuffer)

    res.json({ 
      transcript,
      confidence: 0.95 // Placeholder confidence score
    })
  } catch (error) {
    logger.error('Voice transcription error:', error)
    res.status(500).json({ error: 'Failed to transcribe speech' })
  }
})

// Get available voices
router.get('/voices', authMiddleware, async (req, res) => {
  try {
    const voices = await voiceService.getAvailableVoices()

    res.json({ voices })
  } catch (error) {
    logger.error('Voice list error:', error)
    res.status(500).json({ error: 'Failed to get available voices' })
  }
})

// Voice settings for emotional context
router.post('/settings', authMiddleware, async (req, res) => {
  try {
    const { emotionalContext } = req.body

    const settings = voiceService.getVoiceSettings(emotionalContext)

    res.json({ settings })
  } catch (error) {
    logger.error('Voice settings error:', error)
    res.status(500).json({ error: 'Failed to get voice settings' })
  }
})

export default router
