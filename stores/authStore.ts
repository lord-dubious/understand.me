import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isSignUp: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  toggleAuthMode: () => void;
  setSignUp: (isSignUp: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isSignUp: true, // Default to sign up for new users
  
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  toggleAuthMode: () => set((state) => ({ isSignUp: !state.isSignUp })),
  setSignUp: (isSignUp) => set({ isSignUp }),
}));