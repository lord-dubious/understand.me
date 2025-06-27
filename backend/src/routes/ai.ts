import { Router } from 'express'
import { ConflictAnalysisEngine } from '../services/ai/analysis-engine'
import { HumeEmotionService } from '../services/ai/hume-emotion-service'
import { logger } from '../utils/logger'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const analysisEngine = new ConflictAnalysisEngine(
  process.env.GOOGLE_GENAI_API_KEY!,
  process.env.HUME_API_KEY!
)
const emotionService = new HumeEmotionService(process.env.HUME_API_KEY!)

// Analyze conflict description
router.post('/analyze-conflict', authMiddleware, async (req, res) => {
  try {
    const { description, participants, files } = req.body

    const analysis = await analysisEngine.analyzeConflictWithEmotions({
      description,
      participants: participants || [],
      fileAnalysis: files ? 'Files provided for analysis' : undefined
    })

    res.json({ analysis })
  } catch (error) {
    logger.error('Conflict analysis error:', error)
    res.status(500).json({ error: 'Failed to analyze conflict' })
  }
})

// Generate AI response for session
router.post('/generate-response', authMiddleware, async (req, res) => {
  try {
    const { sessionId, userMessage, context } = req.body

    const response = await analysisEngine.generateResponse(userMessage, context)

    res.json({ response })
  } catch (error) {
    logger.error('AI response generation error:', error)
    res.status(500).json({ error: 'Failed to generate AI response' })
  }
})

// Analyze text emotions
router.post('/analyze-text-emotions', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body

    const emotions = await emotionService.analyzeTextEmotions(text)
    const insights = emotionService.generateEmotionalInsights(emotions)

    res.json({ emotions, insights })
  } catch (error) {
    logger.error('Text emotion analysis error:', error)
    res.status(500).json({ error: 'Failed to analyze text emotions' })
  }
})

// Analyze voice emotions
router.post('/analyze-voice-emotions', authMiddleware, async (req, res) => {
  try {
    const { audioBase64 } = req.body

    const emotions = await emotionService.analyzeVoiceEmotions(audioBase64)
    const insights = emotionService.generateEmotionalInsights(emotions)

    res.json({ emotions, insights })
  } catch (error) {
    logger.error('Voice emotion analysis error:', error)
    res.status(500).json({ error: 'Failed to analyze voice emotions' })
  }
})

// Analyze facial emotions
router.post('/analyze-facial-emotions', authMiddleware, async (req, res) => {
  try {
    const { imageBase64 } = req.body

    const emotions = await emotionService.analyzeFacialEmotions(imageBase64)
    const insights = emotionService.generateEmotionalInsights(emotions)

    res.json({ emotions, insights })
  } catch (error) {
    logger.error('Facial emotion analysis error:', error)
    res.status(500).json({ error: 'Failed to analyze facial emotions' })
  }
})

// Generate mediation strategy
router.post('/generate-strategy', authMiddleware, async (req, res) => {
  try {
    const { analysis, participants } = req.body

    const strategy = await analysisEngine.generateMediationStrategy(analysis, participants)

    res.json({ strategy })
  } catch (error) {
    logger.error('Strategy generation error:', error)
    res.status(500).json({ error: 'Failed to generate mediation strategy' })
  }
})

export default router
