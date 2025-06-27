import axios from 'axios'
import { supabase } from './supabase'

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const { error: refreshError } = await supabase.auth.refreshSession()
      
      if (refreshError) {
        // Refresh failed, redirect to login
        await supabase.auth.signOut()
        // You might want to redirect to login here
      } else {
        // Retry the original request
        return api.request(error.config)
      }
    }
    
    return Promise.reject(error)
  }
)

// API endpoints
export const authAPI = {
  signUp: (email: string, password: string, name: string) =>
    api.post('/auth/signup', { email, password, name }),
  
  signIn: (email: string, password: string) =>
    api.post('/auth/signin', { email, password }),
  
  signOut: () =>
    api.post('/auth/signout'),
  
  getProfile: () =>
    api.get('/auth/profile')
}

export const sessionAPI = {
  create: (data: {
    title: string
    description: string
    sessionType: string
    participants?: string[]
  }) =>
    api.post('/sessions', data),
  
  getById: (id: string) =>
    api.get(`/sessions/${id}`),
  
  getAll: () =>
    api.get('/sessions'),
  
  addMessage: (sessionId: string, content: string, messageType: string = 'user') =>
    api.post(`/sessions/${sessionId}/messages`, { content, messageType }),
  
  updateStatus: (sessionId: string, status: string) =>
    api.patch(`/sessions/${sessionId}/status`, { status })
}

export const aiAPI = {
  analyzeConflict: (data: {
    description: string
    participants?: any[]
    files?: any[]
  }) =>
    api.post('/ai/analyze-conflict', data),
  
  generateResponse: (data: {
    sessionId: string
    userMessage: string
    context: any
  }) =>
    api.post('/ai/generate-response', data),
  
  analyzeTextEmotions: (text: string) =>
    api.post('/ai/analyze-text-emotions', { text }),
  
  analyzeVoiceEmotions: (audioBase64: string) =>
    api.post('/ai/analyze-voice-emotions', { audioBase64 }),
  
  analyzeFacialEmotions: (imageBase64: string) =>
    api.post('/ai/analyze-facial-emotions', { imageBase64 }),
  
  generateStrategy: (data: {
    analysis: any
    participants: any[]
  }) =>
    api.post('/ai/generate-strategy', data)
}

export const voiceAPI = {
  synthesize: (data: {
    text: string
    voiceId?: string
    emotionalContext?: any
  }) =>
    api.post('/voice/synthesize', data),
  
  transcribe: (audioBase64: string) =>
    api.post('/voice/transcribe', { audioBase64 }),
  
  getVoices: () =>
    api.get('/voice/voices'),
  
  getSettings: (emotionalContext: any) =>
    api.post('/voice/settings', { emotionalContext })
}

export default api
