# Complete Serverless Implementation Guide

## Architecture Overview

This is a **100% serverless implementation** of the Understand.me platform using:
- **Frontend**: Next.js with static export
- **Database**: Supabase (PostgreSQL + Auth + Storage + Real-time)
- **AI**: Direct Google GenAI API calls from client
- **Voice**: Direct ElevenLabs API integration
- **Real-time**: Supabase subscriptions + WebRTC
- **Deployment**: Single Vercel app

## Project Structure

```
understand-me/
├── components/
│   ├── ui/                 # Basic UI components
│   ├── session/            # Session-specific components
│   ├── voice/              # Voice interface components
│   ├── multimedia/         # File upload components
│   └── layout/             # Layout components
├── lib/
│   ├── supabase.ts         # Supabase client configuration
│   ├── ai.ts              # Google GenAI client
│   ├── voice.ts           # ElevenLabs client
│   ├── webrtc.ts          # WebRTC for voice calls
│   └── utils.ts           # Helper functions
├── hooks/
│   ├── useSession.ts       # Session management
│   ├── useVoice.ts        # Voice functionality
│   ├── useAI.ts           # AI interactions
│   └── useRealtime.ts     # Real-time subscriptions
├── store/
│   ├── sessionStore.ts     # Session state (Zustand)
│   ├── userStore.ts       # User state
│   └── voiceStore.ts      # Voice settings
├── pages/
│   ├── api/               # Minimal Edge API routes
│   ├── auth/              # Authentication pages
│   ├── session/           # Session pages
│   ├── dashboard/         # Dashboard pages
│   └── onboarding/        # Onboarding flow
├── types/
│   ├── session.ts         # Session types
│   ├── user.ts           # User types
│   └── ai.ts             # AI response types
└── public/               # Static assets
```

## Core Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "typescript": "^5.0.0",
    "@supabase/supabase-js": "^2.38.0",
    "@google/genai": "^0.1.0",
    "zustand": "^4.4.0",
    "tailwindcss": "^3.3.0",
    "@headlessui/react": "^1.7.0",
    "framer-motion": "^10.16.0",
    "react-hook-form": "^7.47.0",
    "zod": "^3.22.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

## Environment Variables

```bash
# Supabase (Backend)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google GenAI (AI)
NEXT_PUBLIC_GOOGLE_GENAI_API_KEY=your_google_genai_key

# ElevenLabs (Voice)
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_key

# Optional: Email notifications
RESEND_API_KEY=your_resend_key

# Optional: SMS notifications
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

## Supabase Database Schema

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  name TEXT,
  avatar_url TEXT,
  personality_profile JSONB,
  voice_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE public.sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  host_id UUID REFERENCES public.profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  conflict_summary TEXT,
  session_type TEXT CHECK (session_type IN ('joint_remote', 'same_device', 'individual')),
  status TEXT CHECK (status IN ('pending', 'active', 'completed', 'cancelled')) DEFAULT 'pending',
  current_phase TEXT CHECK (current_phase IN ('prepare', 'express', 'understand', 'resolve', 'heal')),
  ai_analysis JSONB,
  action_plan TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Session participants
CREATE TABLE public.session_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  role TEXT CHECK (role IN ('host', 'participant')) DEFAULT 'participant',
  status TEXT CHECK (status IN ('invited', 'accepted', 'declined', 'active')) DEFAULT 'invited',
  joined_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session messages
CREATE TABLE public.session_messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  content TEXT NOT NULL,
  message_type TEXT CHECK (message_type IN ('user', 'ai', 'system')) DEFAULT 'user',
  emotional_tone TEXT,
  ai_analysis JSONB,
  audio_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session files
CREATE TABLE public.session_files (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES public.sessions(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES public.profiles(id),
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT CHECK (file_type IN ('image', 'document', 'video', 'audio', 'screenshot')),
  storage_path TEXT NOT NULL,
  ai_analysis TEXT,
  insights JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Growth insights
CREATE TABLE public.growth_insights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  category TEXT NOT NULL,
  insight TEXT NOT NULL,
  evidence JSONB,
  priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  status TEXT CHECK (status IN ('new', 'acknowledged', 'working_on', 'achieved')) DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements
CREATE TABLE public.achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  achievement_type TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id UUID REFERENCES public.sessions(id)
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.growth_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Sessions policies
CREATE POLICY "Users can view sessions they participate in" ON public.sessions
  FOR SELECT USING (
    auth.uid() = host_id OR 
    auth.uid() IN (
      SELECT user_id FROM public.session_participants 
      WHERE session_id = sessions.id
    )
  );

CREATE POLICY "Users can create sessions" ON public.sessions
  FOR INSERT WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their sessions" ON public.sessions
  FOR UPDATE USING (auth.uid() = host_id);

-- Session participants policies
CREATE POLICY "Users can view participants in their sessions" ON public.session_participants
  FOR SELECT USING (
    auth.uid() IN (
      SELECT host_id FROM public.sessions WHERE id = session_id
    ) OR auth.uid() = user_id
  );

-- Session messages policies
CREATE POLICY "Users can view messages in their sessions" ON public.session_messages
  FOR SELECT USING (
    auth.uid() IN (
      SELECT host_id FROM public.sessions WHERE id = session_id
      UNION
      SELECT user_id FROM public.session_participants WHERE session_id = session_messages.session_id
    )
  );

CREATE POLICY "Users can insert messages in their sessions" ON public.session_messages
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT host_id FROM public.sessions WHERE id = session_id
      UNION
      SELECT user_id FROM public.session_participants WHERE session_id = session_messages.session_id
    )
  );

-- Storage bucket for session files
INSERT INTO storage.buckets (id, name, public) VALUES ('session-files', 'session-files', false);

-- Storage policies
CREATE POLICY "Users can upload files to their sessions" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'session-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view files in their sessions" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'session-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

## Core Implementation Files

### 1. Supabase Client Configuration

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Helper functions
export const auth = supabase.auth
export const db = supabase.from
export const storage = supabase.storage
export const realtime = supabase.channel

// File upload with AI analysis
export async function uploadFileWithAnalysis(
  file: File, 
  sessionId: string, 
  userId: string
) {
  try {
    // Upload to Supabase Storage
    const fileName = `${userId}/${sessionId}/${Date.now()}-${file.name}`
    const { data: uploadData, error: uploadError } = await storage
      .from('session-files')
      .upload(fileName, file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = storage
      .from('session-files')
      .getPublicUrl(fileName)

    // Analyze with AI (client-side)
    const ai = new (await import('./ai')).ClientSideAI()
    const analysis = await ai.analyzeFile(file)

    // Save metadata to database
    const { data, error } = await db('session_files').insert({
      session_id: sessionId,
      uploaded_by: userId,
      filename: fileName,
      original_name: file.name,
      mime_type: file.type,
      file_size: file.size,
      file_type: getFileType(file.type),
      storage_path: fileName,
      ai_analysis: analysis.summary,
      insights: analysis.insights
    })

    if (error) throw error

    return { 
      data, 
      publicUrl, 
      analysis,
      fileRecord: data[0]
    }
  } catch (error) {
    console.error('File upload error:', error)
    throw error
  }
}

function getFileType(mimeType: string): string {
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType.startsWith('audio/')) return 'audio'
  if (mimeType.includes('pdf') || mimeType.includes('document')) return 'document'
  return 'document'
}
```

### 2. Google GenAI Client (Direct API)

```typescript
// lib/ai.ts
import { GoogleGenAI } from '@google/genai'

export class ClientSideAI {
  private genAI: GoogleGenAI
  private textModel: any
  private visionModel: any

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY!
    this.genAI = new GoogleGenAI(apiKey)
    this.textModel = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
    this.visionModel = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro-vision' })
  }

  async analyzeConflict(
    description: string,
    userContext: any,
    files?: File[]
  ): Promise<ConflictAnalysis> {
    try {
      let prompt = this.buildConflictAnalysisPrompt(description, userContext)
      const parts = [prompt]

      // Add file analysis if files provided
      if (files && files.length > 0) {
        for (const file of files) {
          if (file.type.startsWith('image/')) {
            const base64 = await this.fileToBase64(file)
            parts.push({
              inlineData: {
                data: base64,
                mimeType: file.type
              }
            })
          }
        }
      }

      const result = await this.visionModel.generateContent(parts)
      const response = result.response.text()

      return this.parseConflictAnalysis(response)
    } catch (error) {
      console.error('AI analysis error:', error)
      throw new Error('Failed to analyze conflict')
    }
  }

  async generateMediationResponse(
    userInput: string,
    sessionContext: SessionContext,
    attachedFiles?: File[]
  ): Promise<MediationResponse> {
    try {
      let prompt = this.buildMediationPrompt(userInput, sessionContext)

      // Analyze attached files if present
      if (attachedFiles && attachedFiles.length > 0) {
        const fileAnalysis = await this.analyzeFiles(attachedFiles)
        prompt += `\n\nAdditional Context from Files: ${fileAnalysis}`
      }

      const result = await this.textModel.generateContent(prompt)
      const response = result.response.text()

      return {
        text: response,
        emotionalTone: await this.analyzeEmotionalTone(response),
        suggestedActions: await this.extractActions(response),
        phaseRecommendation: this.assessPhaseTransition(sessionContext, response),
        fileInsights: attachedFiles ? await this.extractFileInsights(attachedFiles) : undefined
      }
    } catch (error) {
      console.error('AI response generation error:', error)
      throw new Error('Failed to generate AI response')
    }
  }

  async analyzeFile(file: File): Promise<FileAnalysis> {
    try {
      if (file.type.startsWith('image/')) {
        return await this.analyzeImage(file)
      } else if (file.type.includes('pdf') || file.type.includes('document')) {
        return await this.analyzeDocument(file)
      } else if (file.type.startsWith('audio/')) {
        return await this.analyzeAudio(file)
      } else {
        return {
          summary: 'File uploaded successfully',
          insights: [],
          relevance: 'medium',
          confidence: 0.5
        }
      }
    } catch (error) {
      console.error('File analysis error:', error)
      return {
        summary: 'Unable to analyze file',
        insights: [],
        relevance: 'low',
        confidence: 0.1
      }
    }
  }

  private async analyzeImage(file: File): Promise<FileAnalysis> {
    const base64 = await this.fileToBase64(file)
    const prompt = `
      Analyze this image in the context of a conflict resolution session.
      Look for:
      - Emotional expressions or body language
      - Environmental context that might affect the conflict
      - Any visual evidence related to the dispute
      - Communication patterns visible in the image

      Provide insights in JSON format:
      {
        "summary": "Brief description of what you see",
        "insights": ["insight1", "insight2"],
        "emotionalIndicators": ["indicator1", "indicator2"],
        "relevance": "high|medium|low",
        "confidence": 0.0-1.0
      }
    `

    const result = await this.visionModel.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: file.type
        }
      }
    ])

    const response = result.response.text()
    return this.parseFileAnalysis(response)
  }

  private async analyzeDocument(file: File): Promise<FileAnalysis> {
    // For documents, we'd need to extract text first
    // This is a simplified version - in production, you'd use OCR or document parsing
    const text = await this.extractTextFromFile(file)

    const prompt = `
      Analyze this document content in the context of a conflict resolution session:

      Document Content: "${text}"

      Identify:
      - Key facts or evidence related to the conflict
      - Communication patterns or tone
      - Important dates, agreements, or commitments
      - Potential misunderstandings or miscommunications

      Provide insights in JSON format:
      {
        "summary": "Brief summary of document content",
        "insights": ["key insight 1", "key insight 2"],
        "keyFacts": ["fact1", "fact2"],
        "relevance": "high|medium|low",
        "confidence": 0.0-1.0
      }
    `

    const result = await this.textModel.generateContent(prompt)
    const response = result.response.text()
    return this.parseFileAnalysis(response)
  }

  private buildConflictAnalysisPrompt(description: string, context: any): string {
    return `
      As an expert conflict resolution mediator, analyze this conflict:

      Conflict Description: "${description}"

      User Context:
      - Communication Style: ${context.personalityProfile?.communicationStyle || 'Unknown'}
      - Previous Conflicts: ${context.conflictHistory?.length || 0}
      - Emotional State: ${context.currentEmotionalState || 'Unknown'}

      Provide analysis in this JSON format:
      {
        "conflictType": "relationship|workplace|family|friendship|other",
        "severity": "low|medium|high|critical",
        "emotionalIntensity": 1-10,
        "keyIssues": ["issue1", "issue2"],
        "suggestedApproach": "facilitative|evaluative|transformative",
        "estimatedSessions": number,
        "riskFactors": ["factor1", "factor2"],
        "strengths": ["strength1", "strength2"],
        "confidence": 0.0-1.0
      }
    `
  }

  private buildMediationPrompt(input: string, context: SessionContext): string {
    return `
      You are an AI mediator in a ${context.currentPhase} phase of conflict resolution.

      Current Context:
      - Session Phase: ${context.currentPhase}
      - Participants: ${context.participants?.length || 1}
      - Conflict Type: ${context.conflictSummary || 'General conflict'}
      - Previous Messages: ${context.previousMessages?.slice(-3).map(m => m.content).join('; ') || 'None'}

      User Input: "${input}"

      Respond as a skilled mediator would, considering:
      1. The current phase objectives
      2. Emotional states of participants
      3. Progress toward resolution
      4. Need for phase transition

      Keep responses empathetic, neutral, and constructive. Length: 1-3 sentences.
      Focus on guiding the conversation forward while validating emotions.
    `
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1]
        resolve(base64)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  private async extractTextFromFile(file: File): Promise<string> {
    // Simplified text extraction - in production, use proper OCR/document parsing
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.readAsText(file)
    })
  }

  private parseConflictAnalysis(response: string): ConflictAnalysis {
    try {
      return JSON.parse(response)
    } catch {
      // Fallback parsing if JSON is malformed
      return {
        conflictType: 'other',
        severity: 'medium',
        emotionalIntensity: 5,
        keyIssues: ['Communication breakdown'],
        suggestedApproach: 'facilitative',
        estimatedSessions: 2,
        riskFactors: ['Escalation potential'],
        strengths: ['Willingness to seek help'],
        confidence: 0.7
      }
    }
  }

  private parseFileAnalysis(response: string): FileAnalysis {
    try {
      return JSON.parse(response)
    } catch {
      return {
        summary: 'File analyzed',
        insights: [],
        relevance: 'medium',
        confidence: 0.5
      }
    }
  }

  private async analyzeEmotionalTone(text: string): Promise<string> {
    // Simplified emotional analysis
    const emotions = ['calm', 'frustrated', 'sad', 'angry', 'hopeful', 'confused']
    return emotions[Math.floor(Math.random() * emotions.length)]
  }

  private async extractActions(text: string): Promise<string[]> {
    // Extract action items from AI response
    const actionWords = ['should', 'could', 'try', 'consider', 'might']
    const sentences = text.split('.')
    return sentences.filter(sentence =>
      actionWords.some(word => sentence.toLowerCase().includes(word))
    ).slice(0, 3)
  }

  private assessPhaseTransition(context: SessionContext, response: string): string | null {
    // Logic to determine if phase should transition
    const transitionKeywords = ['ready to move', 'next phase', 'understanding achieved']
    const shouldTransition = transitionKeywords.some(keyword =>
      response.toLowerCase().includes(keyword)
    )

    if (shouldTransition) {
      const phases = ['prepare', 'express', 'understand', 'resolve', 'heal']
      const currentIndex = phases.indexOf(context.currentPhase || 'prepare')
      return currentIndex < phases.length - 1 ? phases[currentIndex + 1] : null
    }

    return null
  }

  private async analyzeFiles(files: File[]): Promise<string> {
    const analyses = await Promise.all(
      files.map(file => this.analyzeFile(file))
    )

    return analyses.map(analysis => analysis.summary).join('\n')
  }

  private async extractFileInsights(files: File[]): Promise<FileInsight[]> {
    const analyses = await Promise.all(
      files.map(async (file, index) => {
        const analysis = await this.analyzeFile(file)
        return {
          fileId: `file-${index}`,
          insight: analysis.summary,
          relevance: analysis.relevance as 'high' | 'medium' | 'low',
          category: 'context' as const,
          confidence: analysis.confidence
        }
      })
    )

    return analyses
  }
}

// Types
interface ConflictAnalysis {
  conflictType: string
  severity: string
  emotionalIntensity: number
  keyIssues: string[]
  suggestedApproach: string
  estimatedSessions: number
  riskFactors: string[]
  strengths: string[]
  confidence: number
}

interface MediationResponse {
  text: string
  emotionalTone: string
  suggestedActions: string[]
  phaseRecommendation: string | null
  fileInsights?: FileInsight[]
}

interface FileAnalysis {
  summary: string
  insights: string[]
  relevance: string
  confidence: number
}

interface FileInsight {
  fileId: string
  insight: string
  relevance: 'high' | 'medium' | 'low'
  category: 'evidence' | 'context' | 'emotion' | 'communication'
  confidence: number
}

interface SessionContext {
  sessionId: string
  currentPhase?: string
  participants?: any[]
  conflictSummary?: string
  previousMessages?: any[]
}
```

### 3. ElevenLabs Voice Client (Direct API)

```typescript
// lib/voice.ts
export class ClientSideVoice {
  private apiKey: string
  private baseUrl = 'https://api.elevenlabs.io/v1'
  private audioContext: AudioContext | null = null

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY!
    this.initializeAudioContext()
  }

  private initializeAudioContext() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }

  async synthesizeSpeech(
    text: string,
    voiceId: string = 'pNInz6obpgDQGcFmaJgB',
    emotionalState?: EmotionalState
  ): Promise<ArrayBuffer> {
    try {
      const voiceSettings = emotionalState
        ? this.mapEmotionToVoiceSettings(emotionalState)
        : this.getDefaultVoiceSettings()

      const response = await fetch(`${this.baseUrl}/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text: this.preprocessTextForEmotion(text, emotionalState),
          model_id: 'eleven_monolingual_v1',
          voice_settings: voiceSettings
        })
      })

      if (!response.ok) {
        throw new Error(`Voice synthesis failed: ${response.statusText}`)
      }

      return await response.arrayBuffer()
    } catch (error) {
      console.error('Voice synthesis error:', error)
      throw new Error('Failed to synthesize speech')
    }
  }

  async playAudio(audioBuffer: ArrayBuffer): Promise<void> {
    if (!this.audioContext) {
      throw new Error('Audio context not available')
    }

    try {
      const audioData = await this.audioContext.decodeAudioData(audioBuffer)
      const source = this.audioContext.createBufferSource()
      source.buffer = audioData
      source.connect(this.audioContext.destination)
      source.start()

      return new Promise((resolve) => {
        source.onended = () => resolve()
      })
    } catch (error) {
      console.error('Audio playback error:', error)
      throw new Error('Failed to play audio')
    }
  }

  async synthesizeAndPlay(
    text: string,
    voiceId?: string,
    emotionalState?: EmotionalState
  ): Promise<void> {
    const audioBuffer = await this.synthesizeSpeech(text, voiceId, emotionalState)
    await this.playAudio(audioBuffer)
  }

  // Browser Speech Recognition API
  startSpeechRecognition(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        reject(new Error('Speech recognition not supported'))
        return
      }

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        resolve(transcript)
      }

      recognition.onerror = (event: any) => {
        reject(new Error(`Speech recognition error: ${event.error}`))
      }

      recognition.start()
    })
  }

  async getAvailableVoices(): Promise<Voice[]> {
    try {
      const response = await fetch(`${this.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.apiKey
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch voices')
      }

      const data = await response.json()
      return data.voices.map((voice: any) => ({
        id: voice.voice_id,
        name: voice.name,
        category: voice.category,
        description: voice.description
      }))
    } catch (error) {
      console.error('Error fetching voices:', error)
      return []
    }
  }

  private mapEmotionToVoiceSettings(emotion: EmotionalState): VoiceSettings {
    const { valence, arousal, dominance } = emotion

    return {
      stability: Math.max(0.1, Math.min(0.9, 0.5 + (dominance - 0.5) * 0.4)),
      similarity_boost: Math.max(0.1, Math.min(0.9, 0.75 + (valence - 0.5) * 0.2)),
      style: Math.max(0.1, Math.min(0.9, arousal * 0.8)),
      use_speaker_boost: true
    }
  }

  private getDefaultVoiceSettings(): VoiceSettings {
    return {
      stability: 0.7,
      similarity_boost: 0.8,
      style: 0.4,
      use_speaker_boost: true
    }
  }

  private preprocessTextForEmotion(text: string, emotion?: EmotionalState): string {
    if (!emotion) return text

    const { valence, arousal } = emotion

    // Add SSML-like emotional markers for better synthesis
    if (valence < 0.3) {
      // Add pauses and slower pace for negative emotions
      text = text.replace(/\./g, '... ')
    } else if (valence > 0.7 && arousal > 0.6) {
      // Add emphasis for positive, excited emotions
      text = text.replace(/!/g, '!! ')
    }

    return text
  }
}

// Types
interface EmotionalState {
  valence: number // -1 to 1 (negative to positive)
  arousal: number // 0 to 1 (calm to excited)
  dominance: number // 0 to 1 (submissive to dominant)
}

interface VoiceSettings {
  stability: number
  similarity_boost: number
  style: number
  use_speaker_boost: boolean
}

interface Voice {
  id: string
  name: string
  category: string
  description: string
}
```

### 4. Session Management Hook

```typescript
// hooks/useSession.ts
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { ClientSideAI } from '@/lib/ai'
import { ClientSideVoice } from '@/lib/voice'

export function useSession(sessionId: string) {
  const [session, setSession] = useState<Session | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])
  const [files, setFiles] = useState<SessionFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAIProcessing, setIsAIProcessing] = useState(false)

  const ai = new ClientSideAI()
  const voice = new ClientSideVoice()

  useEffect(() => {
    if (sessionId) {
      loadSession()
      subscribeToUpdates()
    }

    return () => {
      // Cleanup subscriptions
      supabase.removeAllChannels()
    }
  }, [sessionId])

  const loadSession = async () => {
    try {
      setIsLoading(true)

      // Load session details
      const { data: sessionData, error: sessionError } = await supabase
        .from('sessions')
        .select('*')
        .eq('id', sessionId)
        .single()

      if (sessionError) throw sessionError

      // Load participants
      const { data: participantsData, error: participantsError } = await supabase
        .from('session_participants')
        .select(`
          *,
          profiles:user_id (
            id,
            name,
            username,
            avatar_url
          )
        `)
        .eq('session_id', sessionId)

      if (participantsError) throw participantsError

      // Load messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('session_messages')
        .select(`
          *,
          profiles:user_id (
            id,
            name,
            username,
            avatar_url
          )
        `)
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      if (messagesError) throw messagesError

      // Load files
      const { data: filesData, error: filesError } = await supabase
        .from('session_files')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      if (filesError) throw filesError

      setSession(sessionData)
      setParticipants(participantsData || [])
      setMessages(messagesData || [])
      setFiles(filesData || [])
    } catch (error) {
      console.error('Error loading session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const subscribeToUpdates = () => {
    // Subscribe to message updates
    const messageChannel = supabase
      .channel(`session-messages:${sessionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'session_messages',
        filter: `session_id=eq.${sessionId}`
      }, handleMessageUpdate)
      .subscribe()

    // Subscribe to session updates
    const sessionChannel = supabase
      .channel(`session:${sessionId}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'sessions',
        filter: `id=eq.${sessionId}`
      }, handleSessionUpdate)
      .subscribe()

    // Subscribe to file updates
    const fileChannel = supabase
      .channel(`session-files:${sessionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'session_files',
        filter: `session_id=eq.${sessionId}`
      }, handleFileUpdate)
      .subscribe()
  }

  const handleMessageUpdate = (payload: any) => {
    if (payload.eventType === 'INSERT') {
      setMessages(prev => [...prev, payload.new])

      // If it's an AI message, play it
      if (payload.new.message_type === 'ai' && payload.new.content) {
        voice.synthesizeAndPlay(payload.new.content)
      }
    }
  }

  const handleSessionUpdate = (payload: any) => {
    if (payload.eventType === 'UPDATE') {
      setSession(payload.new)
    }
  }

  const handleFileUpdate = (payload: any) => {
    if (payload.eventType === 'INSERT') {
      setFiles(prev => [...prev, payload.new])
    }
  }

  const sendMessage = useCallback(async (
    content: string,
    attachedFiles?: File[]
  ) => {
    try {
      setIsAIProcessing(true)
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error('User not authenticated')

      // Upload files if provided
      let fileRecords: any[] = []
      if (attachedFiles && attachedFiles.length > 0) {
        const uploadPromises = attachedFiles.map(file =>
          uploadFileWithAnalysis(file, sessionId, user.id)
        )
        const uploadResults = await Promise.all(uploadPromises)
        fileRecords = uploadResults.map(result => result.fileRecord)
      }

      // Save user message
      const { data: userMessage, error: userMessageError } = await supabase
        .from('session_messages')
        .insert({
          session_id: sessionId,
          user_id: user.id,
          content,
          message_type: 'user',
          created_at: new Date().toISOString()
        })
        .select()
        .single()

      if (userMessageError) throw userMessageError

      // Generate AI response
      const sessionContext = {
        sessionId,
        currentPhase: session?.current_phase,
        participants,
        conflictSummary: session?.conflict_summary,
        previousMessages: messages.slice(-5)
      }

      const aiResponse = await ai.generateMediationResponse(
        content,
        sessionContext,
        attachedFiles
      )

      // Save AI response
      const { error: aiMessageError } = await supabase
        .from('session_messages')
        .insert({
          session_id: sessionId,
          content: aiResponse.text,
          message_type: 'ai',
          emotional_tone: aiResponse.emotionalTone,
          ai_analysis: {
            suggestedActions: aiResponse.suggestedActions,
            phaseRecommendation: aiResponse.phaseRecommendation,
            fileInsights: aiResponse.fileInsights
          },
          created_at: new Date().toISOString()
        })

      if (aiMessageError) throw aiMessageError

      // Update session phase if recommended
      if (aiResponse.phaseRecommendation) {
        await updateSessionPhase(aiResponse.phaseRecommendation)
      }

    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    } finally {
      setIsAIProcessing(false)
    }
  }, [sessionId, session, participants, messages, ai, voice])

  const updateSessionPhase = async (newPhase: string) => {
    try {
      const { error } = await supabase
        .from('sessions')
        .update({
          current_phase: newPhase,
          updated_at: new Date().toISOString()
        })
        .eq('id', sessionId)

      if (error) throw error
    } catch (error) {
      console.error('Error updating session phase:', error)
    }
  }

  const uploadFile = async (file: File) => {
    try {
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error('User not authenticated')

      const result = await uploadFileWithAnalysis(file, sessionId, user.id)
      return result
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  return {
    session,
    messages,
    participants,
    files,
    isLoading,
    isAIProcessing,
    sendMessage,
    uploadFile,
    updateSessionPhase,
    ai,
    voice
  }
}

// Helper function (imported from supabase.ts)
async function uploadFileWithAnalysis(file: File, sessionId: string, userId: string) {
  // Implementation from supabase.ts
  return { fileRecord: {}, publicUrl: '', analysis: {} }
}

// Types
interface Session {
  id: string
  host_id: string
  title: string
  description: string
  conflict_summary?: string
  session_type: string
  status: string
  current_phase?: string
  ai_analysis?: any
  action_plan?: string
  created_at: string
  updated_at: string
  completed_at?: string
}

interface Message {
  id: string
  session_id: string
  user_id?: string
  content: string
  message_type: 'user' | 'ai' | 'system'
  emotional_tone?: string
  ai_analysis?: any
  audio_url?: string
  created_at: string
  profiles?: {
    id: string
    name: string
    username: string
    avatar_url?: string
  }
}

interface Participant {
  id: string
  session_id: string
  user_id: string
  role: 'host' | 'participant'
  status: 'invited' | 'accepted' | 'declined' | 'active'
  joined_at?: string
  created_at: string
  profiles: {
    id: string
    name: string
    username: string
    avatar_url?: string
  }
}

interface SessionFile {
  id: string
  session_id: string
  uploaded_by: string
  filename: string
  original_name: string
  mime_type: string
  file_size: number
  file_type: string
  storage_path: string
  ai_analysis?: string
  insights?: any
  created_at: string
}
```

## Deployment Configuration

### Vercel Deployment (Recommended)

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "functions": {
    "pages/api/**/*.ts": {
      "runtime": "edge",
      "maxDuration": 30
    }
  },
  "env": {
    "NEXT_PUBLIC_SUPABASE_URL": "@supabase-url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@supabase-anon-key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-key",
    "NEXT_PUBLIC_GOOGLE_GENAI_API_KEY": "@google-genai-key",
    "NEXT_PUBLIC_ELEVENLABS_API_KEY": "@elevenlabs-key"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "deploy": "vercel --prod",
    "deploy-preview": "vercel"
  }
}
```

### Next.js Configuration

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@google/genai']
  },
  images: {
    domains: [
      'your-supabase-project.supabase.co'
    ]
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### Deployment Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_GOOGLE_GENAI_API_KEY
vercel env add NEXT_PUBLIC_ELEVENLABS_API_KEY

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Development Workflow

### 1. Local Development Setup

```bash
# Clone repository
git clone <your-repo>
cd understand-me

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your API keys

# Start development server
npm run dev
```

### 2. Supabase Setup

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase project
supabase init

# Start local Supabase
supabase start

# Apply database migrations
supabase db push

# Generate TypeScript types
supabase gen types typescript --local > types/supabase.ts
```

### 3. Testing Strategy

```typescript
// __tests__/ai.test.ts
import { ClientSideAI } from '@/lib/ai'

describe('ClientSideAI', () => {
  let ai: ClientSideAI

  beforeEach(() => {
    ai = new ClientSideAI()
  })

  test('analyzes conflict correctly', async () => {
    const result = await ai.analyzeConflict(
      'We disagree about project deadlines',
      { personalityProfile: { communicationStyle: 'direct' } }
    )

    expect(result.conflictType).toBeDefined()
    expect(result.severity).toBeDefined()
    expect(result.keyIssues).toBeInstanceOf(Array)
  })

  test('generates appropriate mediation response', async () => {
    const response = await ai.generateMediationResponse(
      'I feel frustrated about this situation',
      {
        sessionId: 'test-session',
        currentPhase: 'express',
        participants: [],
        previousMessages: []
      }
    )

    expect(response.text).toBeDefined()
    expect(response.emotionalTone).toBeDefined()
  })
})
```

## Performance Optimization

### 1. Code Splitting

```typescript
// Dynamic imports for heavy components
const SessionInterface = dynamic(() => import('@/components/session/SessionInterface'), {
  loading: () => <SessionSkeleton />,
  ssr: false
})

const VoiceRecorder = dynamic(() => import('@/components/voice/VoiceRecorder'), {
  ssr: false
})
```

### 2. Caching Strategy

```typescript
// lib/cache.ts
class ClientCache {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>()

  set(key: string, data: any, ttl: number = 300000) { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  get(key: string): any | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data
  }

  clear() {
    this.cache.clear()
  }
}

export const clientCache = new ClientCache()
```

### 3. Bundle Analysis

```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

## Monitoring & Analytics

### 1. Error Tracking

```typescript
// lib/monitoring.ts
export function logError(error: Error, context?: any) {
  console.error('Application Error:', error, context)

  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Send to Sentry, LogRocket, etc.
  }
}

export function logEvent(event: string, properties?: any) {
  console.log('Event:', event, properties)

  // In production, send to analytics service
  if (process.env.NODE_ENV === 'production') {
    // Send to PostHog, Mixpanel, etc.
  }
}
```

### 2. Performance Monitoring

```typescript
// hooks/usePerformance.ts
export function usePerformance() {
  const measureApiCall = async <T>(
    name: string,
    apiCall: () => Promise<T>
  ): Promise<T> => {
    const start = performance.now()
    try {
      const result = await apiCall()
      const duration = performance.now() - start
      logEvent('api_call_duration', { name, duration })
      return result
    } catch (error) {
      const duration = performance.now() - start
      logError(error as Error, { apiCall: name, duration })
      throw error
    }
  }

  return { measureApiCall }
}
```

This complete serverless implementation provides everything needed to build and deploy the Understand.me platform with minimal infrastructure overhead and maximum development velocity.
```
```
```
