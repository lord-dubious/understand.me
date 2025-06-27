import { create } from 'zustand'
import { sessionAPI } from '../lib/api'

interface Session {
  id: string
  title: string
  description: string
  host_id: string
  session_type: 'joint' | 'same_device' | 'individual'
  status: 'created' | 'active' | 'completed' | 'cancelled'
  current_phase: 'prepare' | 'express' | 'understand' | 'resolve' | 'heal' | null
  conflict_analysis: any | null
  mediation_strategy: any | null
  action_plan: string | null
  created_at: string
  updated_at: string
  completed_at: string | null
  participant_count?: number
}

interface SessionMessage {
  id: string
  session_id: string
  user_id: string | null
  content: string
  message_type: 'user' | 'ai' | 'system'
  emotional_tone: string | null
  file_attachments: any | null
  ai_analysis: any | null
  created_at: string
}

interface SessionState {
  sessions: Session[]
  recentSessions: Session[]
  currentSession: Session | null
  currentMessages: SessionMessage[]
  isLoading: boolean
  error: string | null
}

interface SessionActions {
  fetchSessions: () => Promise<void>
  fetchRecentSessions: () => Promise<void>
  fetchSession: (id: string) => Promise<void>
  createSession: (data: {
    title: string
    description: string
    sessionType: string
    participants?: string[]
  }) => Promise<Session>
  updateSessionStatus: (sessionId: string, status: string) => Promise<void>
  addMessage: (sessionId: string, content: string, messageType?: string) => Promise<void>
  clearCurrentSession: () => void
  setError: (error: string | null) => void
}

export const useSessionStore = create<SessionState & SessionActions>((set, get) => ({
  sessions: [],
  recentSessions: [],
  currentSession: null,
  currentMessages: [],
  isLoading: false,
  error: null,

  fetchSessions: async () => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await sessionAPI.getAll()
      set({ 
        sessions: response.data.sessions,
        isLoading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch sessions',
        isLoading: false 
      })
    }
  },

  fetchRecentSessions: async () => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await sessionAPI.getAll()
      const recentSessions = response.data.sessions
        .sort((a: Session, b: Session) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .slice(0, 5)
      
      set({ 
        recentSessions,
        isLoading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch recent sessions',
        isLoading: false 
      })
    }
  },

  fetchSession: async (id: string) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await sessionAPI.getById(id)
      const session = response.data.session
      
      set({ 
        currentSession: session,
        currentMessages: session.session_messages || [],
        isLoading: false 
      })
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to fetch session',
        isLoading: false 
      })
    }
  },

  createSession: async (data) => {
    set({ isLoading: true, error: null })
    
    try {
      const response = await sessionAPI.create(data)
      const newSession = response.data.session
      
      set(state => ({
        sessions: [newSession, ...state.sessions],
        recentSessions: [newSession, ...state.recentSessions.slice(0, 4)],
        currentSession: newSession,
        isLoading: false
      }))
      
      return newSession
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Failed to create session'
      set({ 
        error: errorMessage,
        isLoading: false 
      })
      throw new Error(errorMessage)
    }
  },

  updateSessionStatus: async (sessionId: string, status: string) => {
    try {
      const response = await sessionAPI.updateStatus(sessionId, status)
      const updatedSession = response.data.session
      
      set(state => ({
        sessions: state.sessions.map(session =>
          session.id === sessionId ? updatedSession : session
        ),
        recentSessions: state.recentSessions.map(session =>
          session.id === sessionId ? updatedSession : session
        ),
        currentSession: state.currentSession?.id === sessionId 
          ? updatedSession 
          : state.currentSession
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to update session status'
      })
      throw error
    }
  },

  addMessage: async (sessionId: string, content: string, messageType = 'user') => {
    try {
      const response = await sessionAPI.addMessage(sessionId, content, messageType)
      const newMessage = response.data.message
      
      set(state => ({
        currentMessages: [...state.currentMessages, newMessage]
      }))
    } catch (error: any) {
      set({ 
        error: error.response?.data?.error || 'Failed to add message'
      })
      throw error
    }
  },

  clearCurrentSession: () => {
    set({
      currentSession: null,
      currentMessages: []
    })
  },

  setError: (error: string | null) => {
    set({ error })
  }
}))
