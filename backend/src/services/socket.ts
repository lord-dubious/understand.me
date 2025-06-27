import { Server as SocketIOServer } from 'socket.io'
import { logger } from '../utils/logger'
import { supabase } from './supabase'

interface SessionRoom {
  sessionId: string
  participants: Set<string>
  currentPhase: string
  emotionalClimate: string
}

const sessionRooms = new Map<string, SessionRoom>()

export function setupSocketHandlers(io: SocketIOServer) {
  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`)

    // Join session room
    socket.on('join-session', async (data: { sessionId: string; userId: string }) => {
      try {
        const { sessionId, userId } = data

        // Verify user has access to session
        const { data: session, error } = await supabase
          .from('sessions')
          .select('*')
          .eq('id', sessionId)
          .or(`host_id.eq.${userId},session_participants.user_id.eq.${userId}`)
          .single()

        if (error || !session) {
          socket.emit('error', { message: 'Session not found or access denied' })
          return
        }

        // Join the room
        socket.join(sessionId)
        socket.data.sessionId = sessionId
        socket.data.userId = userId

        // Update session room tracking
        if (!sessionRooms.has(sessionId)) {
          sessionRooms.set(sessionId, {
            sessionId,
            participants: new Set(),
            currentPhase: session.current_phase || 'prepare',
            emotionalClimate: 'neutral'
          })
        }

        const room = sessionRooms.get(sessionId)!
        room.participants.add(userId)

        // Notify other participants
        socket.to(sessionId).emit('participant-joined', {
          userId,
          participantCount: room.participants.size
        })

        socket.emit('session-joined', {
          sessionId,
          currentPhase: room.currentPhase,
          participantCount: room.participants.size
        })

        logger.info(`User ${userId} joined session ${sessionId}`)
      } catch (error) {
        logger.error('Join session error:', error)
        socket.emit('error', { message: 'Failed to join session' })
      }
    })

    // Leave session room
    socket.on('leave-session', () => {
      const { sessionId, userId } = socket.data

      if (sessionId && userId) {
        socket.leave(sessionId)

        const room = sessionRooms.get(sessionId)
        if (room) {
          room.participants.delete(userId)
          
          if (room.participants.size === 0) {
            sessionRooms.delete(sessionId)
          } else {
            socket.to(sessionId).emit('participant-left', {
              userId,
              participantCount: room.participants.size
            })
          }
        }

        logger.info(`User ${userId} left session ${sessionId}`)
      }
    })

    // Send message in session
    socket.on('send-message', async (data: {
      content: string
      messageType: 'user' | 'ai' | 'system'
      emotionalTone?: string
    }) => {
      try {
        const { sessionId, userId } = socket.data
        const { content, messageType, emotionalTone } = data

        if (!sessionId || !userId) {
          socket.emit('error', { message: 'Not in a session' })
          return
        }

        // Save message to database
        const { data: message, error } = await supabase
          .from('session_messages')
          .insert({
            session_id: sessionId,
            user_id: messageType === 'user' ? userId : null,
            content,
            message_type: messageType,
            emotional_tone: emotionalTone
          })
          .select()
          .single()

        if (error) {
          socket.emit('error', { message: 'Failed to save message' })
          return
        }

        // Broadcast message to all participants in the session
        io.to(sessionId).emit('new-message', message)

        logger.info(`Message sent in session ${sessionId} by ${userId}`)
      } catch (error) {
        logger.error('Send message error:', error)
        socket.emit('error', { message: 'Failed to send message' })
      }
    })

    // Update session phase
    socket.on('update-phase', async (data: { newPhase: string }) => {
      try {
        const { sessionId, userId } = socket.data
        const { newPhase } = data

        if (!sessionId || !userId) {
          socket.emit('error', { message: 'Not in a session' })
          return
        }

        // Update session phase in database
        const { error } = await supabase
          .from('sessions')
          .update({ current_phase: newPhase as any })
          .eq('id', sessionId)
          .eq('host_id', userId) // Only host can update phase

        if (error) {
          socket.emit('error', { message: 'Failed to update phase' })
          return
        }

        // Update room tracking
        const room = sessionRooms.get(sessionId)
        if (room) {
          room.currentPhase = newPhase
        }

        // Broadcast phase change to all participants
        io.to(sessionId).emit('phase-updated', {
          newPhase,
          updatedBy: userId
        })

        logger.info(`Session ${sessionId} phase updated to ${newPhase} by ${userId}`)
      } catch (error) {
        logger.error('Update phase error:', error)
        socket.emit('error', { message: 'Failed to update phase' })
      }
    })

    // Update emotional climate
    socket.on('update-emotional-climate', (data: { climate: string }) => {
      const { sessionId } = socket.data
      const { climate } = data

      if (!sessionId) {
        socket.emit('error', { message: 'Not in a session' })
        return
      }

      const room = sessionRooms.get(sessionId)
      if (room) {
        room.emotionalClimate = climate

        // Broadcast emotional climate update
        io.to(sessionId).emit('emotional-climate-updated', {
          climate,
          timestamp: new Date().toISOString()
        })
      }
    })

    // Handle typing indicators
    socket.on('typing-start', () => {
      const { sessionId, userId } = socket.data
      if (sessionId && userId) {
        socket.to(sessionId).emit('user-typing', { userId })
      }
    })

    socket.on('typing-stop', () => {
      const { sessionId, userId } = socket.data
      if (sessionId && userId) {
        socket.to(sessionId).emit('user-stopped-typing', { userId })
      }
    })

    // Handle disconnection
    socket.on('disconnect', () => {
      const { sessionId, userId } = socket.data

      if (sessionId && userId) {
        const room = sessionRooms.get(sessionId)
        if (room) {
          room.participants.delete(userId)
          
          if (room.participants.size === 0) {
            sessionRooms.delete(sessionId)
          } else {
            socket.to(sessionId).emit('participant-disconnected', {
              userId,
              participantCount: room.participants.size
            })
          }
        }
      }

      logger.info(`Client disconnected: ${socket.id}`)
    })
  })
}
