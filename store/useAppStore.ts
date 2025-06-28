import { create } from 'zustand';
import { apiService, authHelpers } from '../services/api';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  preferences?: {
    voiceAgent: string;
    emotionalInsights: boolean;
  };
}

interface Session {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'scheduled';
  participants: number;
  createdAt: string;
  currentPhase?: string;
  phases?: {
    current: string;
    completed: string[];
    remaining: string[];
  };
}

interface EmotionalData {
  emotions: {
    primary: string;
    secondary: string[];
    intensity: number;
    confidence: number;
  };
  sentiment: {
    polarity: string;
    score: number;
    confidence: number;
  };
  voiceAnalysis?: {
    tone: string;
    pace: string;
    volume: string;
    stress_indicators: string[];
  };
  timestamp: string;
}

interface Message {
  id: string;
  sessionId: string;
  content: string;
  speaker: string;
  timestamp: string;
  emotionalAnalysis?: any;
  udineResponse?: any;
  type?: 'user' | 'udine' | 'system';
}

// Store interface
interface AppState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;

  // Session state
  currentSession: Session | null;
  sessions: Session[];
  sessionsLoading: boolean;

  // Conversation state
  messages: Message[];
  messagesLoading: boolean;

  // Emotional state
  currentEmotionalData: EmotionalData | null;
  emotionalInsights: any | null;

  // UI state
  activeScreen: 'dashboard' | 'session' | 'profile';
  isUdineActive: boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;

  loadSessions: () => Promise<void>;
  createSession: (title: string, conflictType?: string) => Promise<string | null>;
  selectSession: (sessionId: string) => Promise<void>;
  advancePhase: (newPhase: string) => Promise<void>;

  loadMessages: (sessionId: string) => Promise<void>;
  sendMessage: (message: string, speaker: string) => Promise<void>;
  addMessage: (message: Message) => void;

  updateEmotionalData: (data: EmotionalData) => void;
  loadEmotionalInsights: (sessionId: string) => Promise<void>;

  setActiveScreen: (screen: 'dashboard' | 'session' | 'profile') => void;
  setUdineActive: (active: boolean) => void;
}

// Create store
export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  authLoading: false,

  currentSession: null,
  sessions: [],
  sessionsLoading: false,

  messages: [],
  messagesLoading: false,

  currentEmotionalData: null,
  emotionalInsights: null,

  activeScreen: 'dashboard',
  isUdineActive: false,

  // Auth actions
  login: async (email: string, password: string) => {
    set({ authLoading: true });
    try {
      const response = await authHelpers.loginUser(email, password);
      if (response.success && response.data) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          authLoading: false
        });
        return true;
      } else {
        set({ authLoading: false });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      set({ authLoading: false });
      return false;
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ authLoading: true });
    try {
      const response = await authHelpers.registerUser(email, password, name);
      if (response.success && response.data) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          authLoading: false
        });
        return true;
      } else {
        set({ authLoading: false });
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      set({ authLoading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await authHelpers.logoutUser();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        currentSession: null,
        sessions: [],
        messages: [],
        currentEmotionalData: null,
        emotionalInsights: null,
        activeScreen: 'dashboard',
        isUdineActive: false
      });
    }
  },

  loadUser: async () => {
    try {
      const response = await apiService.getCurrentUser();
      if (response.success && response.data) {
        set({
          user: response.data.user,
          isAuthenticated: true
        });
      }
    } catch (error) {
      console.error('Load user error:', error);
    }
  },

  // Session actions
  loadSessions: async () => {
    set({ sessionsLoading: true });
    try {
      const response = await apiService.getSessions();
      if (response.success && response.data) {
        set({
          sessions: response.data.sessions,
          sessionsLoading: false
        });
      } else {
        set({ sessionsLoading: false });
      }
    } catch (error) {
      console.error('Load sessions error:', error);
      set({ sessionsLoading: false });
    }
  },

  createSession: async (title: string, conflictType: string = 'general') => {
    try {
      const response = await apiService.createSession(title, [], conflictType);
      if (response.success && response.data) {
        const newSession = response.data.session;
        set(state => ({
          sessions: [newSession, ...state.sessions],
          currentSession: newSession
        }));
        return newSession.id;
      }
      return null;
    } catch (error) {
      console.error('Create session error:', error);
      return null;
    }
  },

  selectSession: async (sessionId: string) => {
    try {
      const response = await apiService.getSession(sessionId);
      if (response.success && response.data) {
        set({
          currentSession: response.data.session,
          activeScreen: 'session'
        });
        // Load messages for this session
        get().loadMessages(sessionId);
        get().loadEmotionalInsights(sessionId);
      }
    } catch (error) {
      console.error('Select session error:', error);
    }
  },

  advancePhase: async (newPhase: string) => {
    const { currentSession } = get();
    if (!currentSession) return;

    try {
      const currentPhase = currentSession.phases?.current || 'preparation';
      const response = await apiService.advancePhase(currentSession.id, currentPhase, newPhase);
      
      if (response.success && response.data) {
        set({
          currentSession: {
            ...currentSession,
            ...response.data.session
          }
        });
      }
    } catch (error) {
      console.error('Advance phase error:', error);
    }
  },

  // Message actions
  loadMessages: async (sessionId: string) => {
    set({ messagesLoading: true });
    try {
      const response = await apiService.getMessages(sessionId);
      if (response.success && response.data) {
        set({
          messages: response.data.messages,
          messagesLoading: false
        });
      } else {
        set({ messagesLoading: false });
      }
    } catch (error) {
      console.error('Load messages error:', error);
      set({ messagesLoading: false });
    }
  },

  sendMessage: async (message: string, speaker: string) => {
    const { currentSession } = get();
    if (!currentSession) return;

    try {
      const response = await apiService.sendMessage(
        currentSession.id,
        message,
        speaker,
        get().currentEmotionalData
      );
      
      if (response.success && response.data) {
        get().addMessage(response.data.message);
      }
    } catch (error) {
      console.error('Send message error:', error);
    }
  },

  addMessage: (message: Message) => {
    set(state => ({
      messages: [...state.messages, message]
    }));
  },

  // Emotional actions
  updateEmotionalData: (data: EmotionalData) => {
    set({ currentEmotionalData: data });
  },

  loadEmotionalInsights: async (sessionId: string) => {
    try {
      const response = await apiService.getEmotionalInsights(sessionId);
      if (response.success && response.data) {
        set({ emotionalInsights: response.data.insights });
      }
    } catch (error) {
      console.error('Load emotional insights error:', error);
    }
  },

  // UI actions
  setActiveScreen: (screen: 'dashboard' | 'session' | 'profile') => {
    set({ activeScreen: screen });
  },

  setUdineActive: (active: boolean) => {
    set({ isUdineActive: active });
  }
}));
