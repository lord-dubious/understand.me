const express = require('express');
const router = express.Router();

// POST /api/sessions/create
router.post('/create', async (req, res) => {
  try {
    const { title, participants, conflictType } = req.body;
    
    // TODO: Integrate with LangChain conflict analysis
    const sessionId = 'session_' + Date.now();
    
    res.json({
      success: true,
      session: {
        id: sessionId,
        title: title,
        participants: participants,
        conflictType: conflictType,
        status: 'created',
        phases: {
          current: 'preparation',
          completed: [],
          remaining: ['preparation', 'exploration', 'understanding', 'resolution', 'healing']
        },
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Session creation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create session'
    });
  }
});

// GET /api/sessions/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Retrieve session from database
    res.json({
      success: true,
      session: {
        id: id,
        title: 'Demo Conflict Resolution Session',
        participants: ['user1', 'user2'],
        conflictType: 'interpersonal',
        status: 'active',
        phases: {
          current: 'exploration',
          completed: ['preparation'],
          remaining: ['understanding', 'resolution', 'healing']
        },
        udineAgent: {
          active: true,
          voice: 'udine',
          currentPhase: 'exploration'
        },
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Session retrieval error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve session'
    });
  }
});

// POST /api/sessions/:id/join
router.post('/:id/join', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    
    // TODO: Add user to session
    res.json({
      success: true,
      message: 'Successfully joined session',
      session: {
        id: id,
        status: 'active',
        userRole: 'participant'
      }
    });
  } catch (error) {
    console.error('Session join error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to join session'
    });
  }
});

// POST /api/sessions/:id/advance-phase
router.post('/:id/advance-phase', async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPhase, nextPhase } = req.body;
    
    // TODO: Integrate with LangGraph workflow
    res.json({
      success: true,
      session: {
        id: id,
        phases: {
          current: nextPhase,
          completed: ['preparation', currentPhase],
          remaining: ['understanding', 'resolution', 'healing'].filter(p => p !== nextPhase)
        },
        udineAgent: {
          phaseTransition: true,
          message: `Moving to ${nextPhase} phase`
        }
      }
    });
  } catch (error) {
    console.error('Phase advancement error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to advance phase'
    });
  }
});

// GET /api/sessions
router.get('/', async (req, res) => {
  try {
    // TODO: Get user's sessions from database
    res.json({
      success: true,
      sessions: [
        {
          id: 'session_123',
          title: 'Family Communication Session',
          status: 'completed',
          participants: 2,
          createdAt: new Date().toISOString()
        },
        {
          id: 'session_124',
          title: 'Workplace Conflict Resolution',
          status: 'active',
          participants: 3,
          createdAt: new Date().toISOString()
        }
      ]
    });
  } catch (error) {
    console.error('Sessions list error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve sessions'
    });
  }
});

module.exports = router;
