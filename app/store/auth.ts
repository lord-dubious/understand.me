import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface Profile {
  id: string
  email: string
  name: string | null
  username: string | null
  avatar_url: string | null
  personality_profile: any | null
  communication_style: string | null
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

interface AuthState {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  hasCompletedOnboarding: boolean
}

interface AuthActions {
  initialize: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  completeOnboarding: (personalityProfile: any, communicationStyle: string) => Promise<void>
  refreshProfile: () => Promise<void>
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  hasCompletedOnboarding: false,

  initialize: async () => {
    try {
      // Get initial session
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error)
        set({ isLoading: false })
        return
      }

      if (session?.user) {
        // Get user profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profileError) {
          console.error('Error fetching profile:', profileError)
        }

        set({
          user: session.user,
          session,
          profile,
          hasCompletedOnboarding: profile?.onboarding_completed || false,
          isLoading: false
        })
      } else {
        set({ isLoading: false })
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          set({
            user: session.user,
            session,
            profile,
            hasCompletedOnboarding: profile?.onboarding_completed || false
          })
        } else if (event === 'SIGNED_OUT') {
          set({
            user: null,
            session: null,
            profile: null,
            hasCompletedOnboarding: false
          })
        }
      })
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({ isLoading: false })
    }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw new Error(error.message)
    }

    // Profile will be loaded by the auth state change listener
  },

  signUp: async (email: string, password: string, name: string) => {
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
      throw new Error(error.message)
    }

    // Create profile record
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          name,
          onboarding_completed: false
        })

      if (profileError) {
        console.error('Error creating profile:', profileError)
      }
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      throw new Error(error.message)
    }

    set({
      user: null,
      session: null,
      profile: null,
      hasCompletedOnboarding: false
    })
  },

  updateProfile: async (updates: Partial<Profile>) => {
    const { user } = get()
    
    if (!user) {
      throw new Error('No authenticated user')
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    set({ profile: data })
  },

  completeOnboarding: async (personalityProfile: any, communicationStyle: string) => {
    const { user } = get()
    
    if (!user) {
      throw new Error('No authenticated user')
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({
        personality_profile: personalityProfile,
        communication_style: communicationStyle,
        onboarding_completed: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    set({ 
      profile: data,
      hasCompletedOnboarding: true
    })
  },

  refreshProfile: async () => {
    const { user } = get()
    
    if (!user) {
      return
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error refreshing profile:', error)
      return
    }

    set({ 
      profile,
      hasCompletedOnboarding: profile?.onboarding_completed || false
    })
  }
}))
