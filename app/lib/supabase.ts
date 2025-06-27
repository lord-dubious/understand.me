import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

// Custom storage adapter for different platforms
const createStorageAdapter = () => {
  if (Platform.OS === 'web') {
    // Use localStorage for web
    return {
      getItem: (key: string) => {
        if (typeof localStorage === 'undefined') return null
        return localStorage.getItem(key)
      },
      setItem: (key: string, value: string) => {
        if (typeof localStorage === 'undefined') return
        localStorage.setItem(key, value)
      },
      removeItem: (key: string) => {
        if (typeof localStorage === 'undefined') return
        localStorage.removeItem(key)
      }
    }
  } else {
    // Use SecureStore for native platforms
    return {
      getItem: (key: string) => SecureStore.getItemAsync(key),
      setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
      removeItem: (key: string) => SecureStore.deleteItemAsync(key)
    }
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: createStorageAdapter(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          username: string | null
          name: string | null
          avatar_url: string | null
          personality_profile: any | null
          communication_style: string | null
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username?: string | null
          name?: string | null
          avatar_url?: string | null
          personality_profile?: any | null
          communication_style?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string | null
          name?: string | null
          avatar_url?: string | null
          personality_profile?: any | null
          communication_style?: string | null
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sessions: {
        Row: {
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
        }
        Insert: {
          id?: string
          title: string
          description: string
          host_id: string
          session_type: 'joint' | 'same_device' | 'individual'
          status?: 'created' | 'active' | 'completed' | 'cancelled'
          current_phase?: 'prepare' | 'express' | 'understand' | 'resolve' | 'heal' | null
          conflict_analysis?: any | null
          mediation_strategy?: any | null
          action_plan?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          host_id?: string
          session_type?: 'joint' | 'same_device' | 'individual'
          status?: 'created' | 'active' | 'completed' | 'cancelled'
          current_phase?: 'prepare' | 'express' | 'understand' | 'resolve' | 'heal' | null
          conflict_analysis?: any | null
          mediation_strategy?: any | null
          action_plan?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      session_participants: {
        Row: {
          id: string
          session_id: string
          user_id: string | null
          role: 'host' | 'participant'
          status: 'invited' | 'accepted' | 'declined' | 'active'
          joined_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_id?: string | null
          role: 'host' | 'participant'
          status?: 'invited' | 'accepted' | 'declined' | 'active'
          joined_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string | null
          role?: 'host' | 'participant'
          status?: 'invited' | 'accepted' | 'declined' | 'active'
          joined_at?: string | null
          created_at?: string
        }
      }
      session_messages: {
        Row: {
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
        Insert: {
          id?: string
          session_id: string
          user_id?: string | null
          content: string
          message_type: 'user' | 'ai' | 'system'
          emotional_tone?: string | null
          file_attachments?: any | null
          ai_analysis?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_id?: string | null
          content?: string
          message_type?: 'user' | 'ai' | 'system'
          emotional_tone?: string | null
          file_attachments?: any | null
          ai_analysis?: any | null
          created_at?: string
        }
      }
      session_files: {
        Row: {
          id: string
          session_id: string
          uploaded_by: string | null
          filename: string
          original_name: string
          mime_type: string
          file_size: number
          storage_path: string
          ai_analysis: string | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          uploaded_by?: string | null
          filename: string
          original_name: string
          mime_type: string
          file_size: number
          storage_path: string
          ai_analysis?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          uploaded_by?: string | null
          filename?: string
          original_name?: string
          mime_type?: string
          file_size?: number
          storage_path?: string
          ai_analysis?: string | null
          created_at?: string
        }
      }
      growth_insights: {
        Row: {
          id: string
          user_id: string
          category: string
          insight: string
          evidence: any | null
          priority: 'high' | 'medium' | 'low'
          status: 'new' | 'acknowledged' | 'working_on' | 'achieved'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category: string
          insight: string
          evidence?: any | null
          priority: 'high' | 'medium' | 'low'
          status?: 'new' | 'acknowledged' | 'working_on' | 'achieved'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category?: string
          insight?: string
          evidence?: any | null
          priority?: 'high' | 'medium' | 'low'
          status?: 'new' | 'acknowledged' | 'working_on' | 'achieved'
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          title: string
          description: string
          icon_url: string | null
          earned_at: string
          session_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          title: string
          description: string
          icon_url?: string | null
          earned_at?: string
          session_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          title?: string
          description?: string
          icon_url?: string | null
          earned_at?: string
          session_id?: string | null
        }
      }
    }
  }
}
