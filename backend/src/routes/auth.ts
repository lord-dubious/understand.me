import { Router } from 'express'
import { supabase } from '../services/supabase'
import { logger } from '../utils/logger'

const router = Router()

// Sign up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.status(201).json({ user: data.user })
  } catch (error) {
    logger.error('Signup error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Sign in
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ user: data.user, session: data.session })
  } catch (error) {
    logger.error('Signin error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Sign out
router.post('/signout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return res.status(400).json({ error: error.message })
    }

    res.json({ message: 'Signed out successfully' })
  } catch (error) {
    logger.error('Signout error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' })
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    // Get profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      return res.status(404).json({ error: 'Profile not found' })
    }

    res.json({ user, profile })
  } catch (error) {
    logger.error('Profile fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
