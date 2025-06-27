import { Router } from 'express'
import { supabase } from '../services/supabase'
import { ConflictAnalysisEngine } from '../services/ai/analysis-engine'
import { logger } from '../utils/logger'
import { authMiddleware } from '../middleware/auth'

const router = Router()
const analysisEngine = new ConflictAnalysisEngine(
  process.env.GOOGLE_GENAI_API_KEY!,
  process.env.HUME_API_KEY!
)

// Create new session
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, sessionType, participants } = req.body
    const userId = req.user.id

    // Analyze conflict with emotions
    const analysis = await analysisEngine.analyzeConflictWithEmotions({
      description,
      participants: participants || []
    })

    // Create session in database
    const { data: session, error } = await supabase
      .from('sessions')
      .insert({
        title,
        description,
        host_id: userId,
        session_type: sessionType,
        conflict_analysis: analysis,
        status: 'created'
      })
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.status(201).json({ session, analysis })
  } catch (error) {
    logger.error('Session creation error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get session by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const { data: session, error } = await supabase
      .from('sessions')
      .select(`
        *,
        session_participants(*),
        session_messages(*),
        session_files(*)
      `)
      .eq('id', id)
      .or(`host_id.eq.${userId},session_participants.user_id.eq.${userId}`)
      .single()

    if (error || !session) {
      return res.status(404).json({ error: 'Session not found' })
    }

    res.json({ session })
  } catch (error) {
    logger.error('Session fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user's sessions
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id

    const { data: sessions, error } = await supabase
      .from('sessions')
      .select(`
        *,
        session_participants(*)
      `)
      .or(`host_id.eq.${userId},session_participants.user_id.eq.${userId}`)
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ sessions })
  } catch (error) {
    logger.error('Sessions fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add message to session
router.post('/:id/messages', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    const { content, messageType = 'user' } = req.body
    const userId = req.user.id

    const { data: message, error } = await supabase
      .from('session_messages')
      .insert({
        session_id: id,
        user_id: userId,
        content,
        message_type: messageType
      })
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.status(201).json({ message })
  } catch (error) {
    logger.error('Message creation error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update session status
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const userId = req.user.id

    const { data: session, error } = await supabase
      .from('sessions')
      .update({ status })
      .eq('id', id)
      .eq('host_id', userId)
      .select()
      .single()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ session })
  } catch (error) {
    logger.error('Session update error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
