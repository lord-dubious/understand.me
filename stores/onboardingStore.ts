import { create } from 'zustand';

interface PersonalityAnswer {
  question: string;
  answer: string;
}

interface OnboardingState {
  // User details
  name: string;
  email: string;
  
  // Personality assessment
  personalityAnswers: PersonalityAnswer[];
  currentQuestionIndex: number;
  
  // Flow state
  isVoiceActive: boolean;
  currentStep: 'greeting' | 'name' | 'email' | 'password' | 'personality' | 'complete';
  
  // Actions
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  addPersonalityAnswer: (question: string, answer: string) => void;
  setCurrentStep: (step: OnboardingState['currentStep']) => void;
  setVoiceActive: (active: boolean) => void;
  nextQuestion: () => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set, get) => ({
  name: '',
  email: '',
  personalityAnswers: [],
  currentQuestionIndex: 0,
  isVoiceActive: false,
  currentStep: 'greeting',
  
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  
  addPersonalityAnswer: (question, answer) => set((state) => ({
    personalityAnswers: [...state.personalityAnswers, { question, answer }]
  })),
  
  setCurrentStep: (currentStep) => set({ currentStep }),
  setVoiceActive: (isVoiceActive) => set({ isVoiceActive }),
  
  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1
  })),
  
  reset: () => set({
    name: '',
    email: '',
    personalityAnswers: [],
    currentQuestionIndex: 0,
    isVoiceActive: false,
    currentStep: 'greeting'
  })
}));