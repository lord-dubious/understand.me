import { Request, Response, NextFunction } from 'express'
import { supabase } from '../services/supabase'
import { logger } from '../utils/logger'

export interface AuthenticatedRequest extends Request {
  user: {
    id: string
    email: string
    name?: string
  }
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      res.status(401).json({ error: 'No authorization header provided' })
      return
    }

    if (!authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Invalid authorization header format' })
      return
    }

    const token = authHeader.replace('Bearer ', '')

    if (!token) {
      res.status(401).json({ error: 'No token provided' })
      return
    }

    // Verify the token with Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      logger.warn('Invalid token attempt', { error: error?.message })
      res.status(401).json({ error: 'Invalid or expired token' })
      return
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      logger.error('Error fetching user profile:', profileError)
      res.status(500).json({ error: 'Failed to fetch user profile' })
      return
    }

    // Attach user info to request
    ;(req as AuthenticatedRequest).user = {
      id: user.id,
      email: user.email || '',
      name: profile?.name || user.user_metadata?.name
    }

    next()
  } catch (error) {
    logger.error('Auth middleware error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export function optionalAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next()
    return
  }

  // If auth header is present, validate it
  authMiddleware(req, res, next)
}

export function requireRole(roles: string[]) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = (req as AuthenticatedRequest).user

      if (!user) {
        res.status(401).json({ error: 'Authentication required' })
        return
      }

      // Get user role from profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || !profile) {
        res.status(403).json({ error: 'Access denied' })
        return
      }

      if (!roles.includes(profile.role)) {
        res.status(403).json({ error: 'Insufficient permissions' })
        return
      }

      next()
    } catch (error) {
      logger.error('Role check error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export function requireSessionAccess(req: Request, res: Response, next: NextFunction): void {
  // This middleware checks if user has access to a specific session
  // Implementation would check session_participants table
  next()
}
