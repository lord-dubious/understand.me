// API service for Understand.me
// Handles all communication with the Express/Node.js backend

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Authentication endpoints
  async login(email: string, password: string) {
    return this.request<{ user: any; token: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string) {
    return this.request<{ user: any; token: string }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request<{ user: any }>('/api/auth/me');
  }

  // Session endpoints
  async createSession(title: string, participants: string[], conflictType: string) {
    return this.request<{ session: any }>('/api/sessions/create', {
      method: 'POST',
      body: JSON.stringify({ title, participants, conflictType }),
    });
  }

  async getSession(sessionId: string) {
    return this.request<{ session: any }>(`/api/sessions/${sessionId}`);
  }

  async getSessions() {
    return this.request<{ sessions: any[] }>('/api/sessions');
  }

  async joinSession(sessionId: string, userId: string) {
    return this.request<{ session: any }>(`/api/sessions/${sessionId}/join`, {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  async advancePhase(sessionId: string, currentPhase: string, nextPhase: string) {
    return this.request<{ session: any }>(`/api/sessions/${sessionId}/advance-phase`, {
      method: 'POST',
      body: JSON.stringify({ currentPhase, nextPhase }),
    });
  }

  // Conversation endpoints
  async sendMessage(sessionId: string, message: string, speaker: string, emotionalContext?: any) {
    return this.request<{ message: any }>('/api/conversations/message', {
      method: 'POST',
      body: JSON.stringify({ sessionId, message, speaker, emotionalContext }),
    });
  }

  async getMessages(sessionId: string, limit: number = 50, offset: number = 0) {
    return this.request<{ messages: any[]; pagination: any }>(
      `/api/conversations/${sessionId}/messages?limit=${limit}&offset=${offset}`
    );
  }

  async getUdineResponse(sessionId: string, context: any, phase: string, participants: any[]) {
    return this.request<{ response: any }>('/api/conversations/udine-response', {
      method: 'POST',
      body: JSON.stringify({ sessionId, context, phase, participants }),
    });
  }

  async analyzeConflict(sessionId: string, messages: any[], participants: any[]) {
    return this.request<{ analysis: any }>('/api/conversations/analyze-conflict', {
      method: 'POST',
      body: JSON.stringify({ sessionId, messages, participants }),
    });
  }

  // Emotional analysis endpoints
  async analyzeEmotions(audioData?: any, text?: string, sessionId?: string) {
    return this.request<{ analysis: any }>('/api/emotions/analyze', {
      method: 'POST',
      body: JSON.stringify({ audioData, text, sessionId }),
    });
  }

  async getEmotionalInsights(sessionId: string) {
    return this.request<{ insights: any }>(`/api/emotions/session/${sessionId}/insights`);
  }

  async requestEmotionalIntervention(
    sessionId: string, 
    emotionalState: any, 
    intensity: number, 
    participants: any[]
  ) {
    return this.request<{ intervention: any }>('/api/emotions/intervention', {
      method: 'POST',
      body: JSON.stringify({ sessionId, emotionalState, intensity, participants }),
    });
  }

  async getEmotionalPatterns(userId: string) {
    return this.request<{ patterns: any }>(`/api/emotions/patterns/${userId}`);
  }

  // Health check
  async healthCheck() {
    return this.request<{ status: string; timestamp: string; uptime: number }>('/health');
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Export types for use in components
export type { ApiResponse };

// Helper functions for common operations
export const authHelpers = {
  async loginUser(email: string, password: string) {
    const response = await apiService.login(email, password);
    if (response.success && response.data?.token) {
      apiService.setAuthToken(response.data.token);
      // TODO: Store token in secure storage
    }
    return response;
  },

  async logoutUser() {
    const response = await apiService.logout();
    apiService.clearAuthToken();
    // TODO: Remove token from secure storage
    return response;
  },

  async registerUser(email: string, password: string, name: string) {
    const response = await apiService.register(email, password, name);
    if (response.success && response.data?.token) {
      apiService.setAuthToken(response.data.token);
      // TODO: Store token in secure storage
    }
    return response;
  }
};

export const sessionHelpers = {
  async startNewSession(title: string, conflictType: string = 'general') {
    // TODO: Get current user ID
    const participants = ['current_user']; // Placeholder
    return apiService.createSession(title, participants, conflictType);
  },

  async continueSession(sessionId: string) {
    return apiService.getSession(sessionId);
  }
};

export const emotionHelpers = {
  async processVoiceInput(audioData: any, sessionId: string) {
    return apiService.analyzeEmotions(audioData, undefined, sessionId);
  },

  async processTextInput(text: string, sessionId: string) {
    return apiService.analyzeEmotions(undefined, text, sessionId);
  }
};
