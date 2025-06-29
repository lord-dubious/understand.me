# 🚀 Build Guide: Understand.me with Expo & Vercel AI SDK (Bolt.new)

A beginner-friendly, feature-by-feature guide to build the Understand.me mobile app using Expo React Native and Vercel AI SDK. All database content is omitted—you'll handle storage separately as you go.

## 📂 Project Structure (Baseline)
```
understand-me/
├── app.json                # Expo config (permissions, bundle IDs)
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript settings
├── src/
│   ├── App.tsx             # Entry point
│   ├── components/
│   │   ├── ChatUI.tsx      # Chat interface (message list + input)
│   │   └── ConvAI.tsx      # Voice agent button component
│   ├── services/
│   │   ├── ai/
│   │   │   ├── chat.ts     # chatWithUdine helper (LLM orchestration)
│   │   │   └── rag.ts      # RAG utilities (embed + search)
│   │   └── hume.ts         # Emotional intelligence service
│   └── utils/
│       └── chunker.ts      # Text splitting helper
└── assets/
    └── icon.png            # App icon
```

---

## 1. Create & Configure Expo Project

```bash
npx create-expo-app@latest --template blank-typescript understand-me
cd understand-me
```

### app.json: Microphone Permissions
```json
{
  "expo": {
    "ios": { "infoPlist": { "NSMicrophoneUsageDescription": "Need mic for voice chat." } },
    "android": { "permissions": ["RECORD_AUDIO"] }
  }
}
```

---

## 2. Install Dependencies

```bash
# Core & web support
npx expo install react-native-web react-dom @expo/metro-runtime

# Conversational AI & Voice
npx expo install ai @ai-sdk/google @ai-sdk/voyage @ai-sdk/langchain
npx expo install @elevenlabs/react react-native-webview expo-dev-client

# Emotional Intelligence
npx expo install hume

# State & utils
npm install zustand zod
```

> **Note:** We use the `ai` package for LLM calls (Google Gemini) and `@ai-sdk/voyage` for embeddings.

---

## 3. chatWithUdine (LLM Orchestration)

**File:** `src/services/ai/chat.ts`
```ts
import { generateText } from 'ai'
import { google } from '@ai-sdk/google'

export async function chatWithUdine(
  history: { role: 'user' | 'assistant'; content: string }[],
  message: string
): Promise<string> {
  const { text } = await generateText({
    model: google.chat('gemini-2.5-flash'),
    system: 'You are Udine, a conflict-resolution specialist.',
    prompt: [...history, { role: 'user', content: message }]
  })
  return text
}
```
> **Explanation:** Calls the Gemini chat model; `history` maintains context for turn-taking.

---

## 4. Chat UI Component

**File:** `src/components/ChatUI.tsx`
```tsx
import { useState } from 'react'
import { View, Text, TextInput, Button, ScrollView } from 'react-native'
import { chatWithUdine } from '@/services/ai/chat'

export default function ChatUI() {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')

  const send = async () => {
    const response = await chatWithUdine(history, input)
    setHistory([...history, { role: 'user', content: input }, { role: 'assistant', content: response }])
    setInput('')
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>{history.map((m,i)=><Text key={i}>{m.role==='assistant'?'Udine:':'You:'}{m.content}</Text>)}</ScrollView>
      <TextInput value={input} onChangeText={setInput} placeholder="Type…" />
      <Button title="Send" onPress={send} />
    </View>
  )
}
```
> **Explanation:** Simple message list + input + send button wired to `chatWithUdine()`.

---

## 5. RAG Utilities (Embeddings & Search)

**File:** `src/services/ai/rag.ts`
```ts
import { embedMany, cosineSimilarity } from '@ai-sdk/voyage'
import { splitOnToken } from '@/utils/chunker'

let embeddings: number[][] = []
let chunks: string[] = []

export async function loadCorpus(texts: string[]) {
  chunks = texts.flatMap(t => splitOnToken(t, 500))
  embeddings = await embedMany({ model: 'voyage-embed', inputs: chunks })
}

export async function findSimilar(query: string, topK = 3) {
  const qEmb = (await embedMany({ model: 'voyage-embed', inputs: [query] }))[0]
  return chunks
    .map((c,i) => ({ chunk: c, score: cosineSimilarity(qEmb, embeddings[i]) }))
    .sort((a,b) => b.score - a.score)
    .slice(0, topK)
}
```
> **Explanation:** Splits text into 500-token chunks, computes embeddings, and retrieves top-K similar passages.

---

## 6. Emotional Intelligence Service

**File:** `src/services/hume.ts`
```ts
import { HumeClient } from 'hume'

export class HumeService {
  private client = new HumeClient({ apiKey: process.env.EXPO_PUBLIC_HUME_API_KEY })

  async analyzeText(text: string) {
    const resp = await this.client.empathicVoice.analyzeText({ text, models: ['language'] })
    return resp
  }
}
```
> **Explanation:** Wraps HumeClient to analyze text/emotion; call `analyzeText()` when you need real-time insights.

---

## 7. Voice Agent Component

**File:** `src/components/ConvAI.tsx`
```tsx
import { Pressable, View, StyleSheet } from 'react-native'
import { Mic } from 'lucide-react-native'
import { conversation } from 'ai' // or custom hook if using @elevenlabs/react

export default function ConvAI() {
  return (
    <Pressable style={styles.btn} onPress={() => {/* start voice session */}}>
      <View><Mic size={32} /></View>
    </Pressable>
  )
}
```
> **Explanation:** Ties microphone button to your voice-session logic (not detailed here).

---

## 8. Run & Test

```bash
npx expo start --tunnel
```

- Open on iOS Simulator / Android emulator / web.
- Test text chat, voice agent, RAG search, and emotion analysis.

✍️ Happy building! Use this guide in Bolt.new by running each step feature-by-feature and pasting the code into your editor.
