# 🛠️ Bolt.new Mega Build Guide – Understand.me (Udine / ElevenLabs / Vercel AI SDK)

This is the **ultra-granular**, feature-by-feature sequence to build the full client-only application. Each step can be its own Bolt.new commit branch. Follow in order; skip anything you already finished.

> Authoritative stack: **Expo RN (web-first)** · **Vercel AI SDK** · **Google Gemini** · **ElevenLabs Udine (turn-taking)** · **Hume AI** · **Voyage Embeddings**

---
## 00 Prerequisites
* **bolt.new workspace** ready (GitHub repo connected)
* Node >= 20, `npm i -g expo-cli`
* Environment vars in Bolt UI → *Secrets* panel:
  ```bash
  GOOGLE_GENAI_API_KEY=…
  ELEVENLABS_API_KEY=…
  EXPO_PUBLIC_UDINE_AGENT_ID=…
  EXPO_PUBLIC_HUME_API_KEY=…
  ```

---
## 01 Project Bootstrap
1. `npx create-expo-app@latest --template blank-typescript .`
2. Commit default screen runs on **web + iOS + Android**.

---
## 02 TS Strict + ESLint
* `expo install eslint @react-native/eslint-config`  
* Add `"strict": true`, `"noUncheckedIndexedAccess": true` to `tsconfig.json`.
* ESLint script: `"lint": "eslint --ext .ts,.tsx src"`.

---
## 03 Brand Assets
* Add `assets/icon.png`, `assets/splash-icon.png`, `assets/adaptive-icon.png`.
* Update `app.json` → `expo.icon`, `expo.splash.image`.

---
## 04 Audio & Mic Permissions
* `expo install expo-av expo-permissions`
* In `app.json`:
  ```jsonc
  "ios": { "infoPlist": { "NSMicrophoneUsageDescription": "Needed for voice chat" } },
  "android": { "permissions": ["RECORD_AUDIO"] }
  ```

---
## 05 Speech-to-Text Recorder (STT input)
> Recordings feed the **analysis engine** – not only TTS.

* `expo install expo-media-library`
* Create `hooks/useRecorder.ts`.
  ```ts
  import { Audio } from 'expo-av';
  export function useRecorder() {
    // start(), stop() -> returns WAV blob
  }
  ```
* Store blob in `zustand` store `conversation.voiceBuffer`.

---
## 06 STT Service (Whisper or Google Speech)
* `npm i @ai-sdk/whisper`  (fallback: call Google Cloud Speech REST).
* `services/ai/stt.ts` – `speechToText(blob): Promise<string>`.
* Unit-test with prerecorded sample.

---
## 07 ElevenLabs Turn-Taking Session
* `expo install @elevenlabs/react react-native-webview expo-dev-client`
* `components/ConvAiDOMComponent.tsx` → already created; extend:
  * pass `onStartTurn` / `onEndTurn` to update recording state.
  * On `onEndTurn`, feed recorded blob into `speechToText()` then `chatWithUdine()`.

---
## 08 TTS Playback (Assistant replies)
* Inside DOM component, play reply via ElevenLabs streaming.
* Latency budget target **<400 ms** from end-turn to audio start.

---
## 09 Conversation State (Zustand)
* `npm i zustand immer`.
* `stores/useConversationStore.ts` holding `history`, `pushUser(text)`, `pushAssistant(text)`.

---
## 10 LLM Orchestration – chatWithUdine
* `services/ai/chat.ts` (done) – add `tools: { voiceBuffer }` param if needed.
* Stream tokens for fast UI update.

---
## 11 Chat UI
* `components/ChatUI.tsx` – already basic; enhance with streaming cursor, avatar bubbles, auto-scroll.

---
## 12 Emotion Overlay (Hume)
* `services/hume.ts` wrapper.
* `hooks/useEmotion.ts` – poll last assistant text → `HumeService.analyzeText()`.
* Overlay dot on each message with emotion color.

---
## 13 Native Client Tools
* `utils/tools.ts` (battery, brightness, flash).
* Inject into `conversation.startSession({ clientTools })`.

---
## 14 Embeddings Corpus Loader
* UI modal allowing user to drop `.txt` or paste documents.
* Call `loadCorpus(texts)` in `rag.ts`.

---
## 15 RAG Search Panel
* `components/SimilarDocs.tsx` – queries `findSimilar(query)` each keystroke.
* Show highlight previews.

---
## 16 Settings Screen
* `npm i @react-navigation/native @react-navigation/stack`
* Screen to tweak:
  * Udine voice id
  * “Silence gap ms” (turn-taking)
  * Brightness flash duration
* Persist with `@react-native-async-storage/async-storage`.

---
## 17 Theme / Dark Mode
* Use `expo install nativewind` (Tailwind RN).  
* Provide light/dark tokens.

---
## 18 Offline Cache
* Save last 20 messages + embeddings in `AsyncStorage`.
* Display banner when offline.

---
## 19 PWA Optimisation
* `expo export:web`
* Add `manifest.json` icons, service-worker.

---
## 20 CI & Quality Gates
* GitHub Actions → run `npm run lint` + `expo export:web`.
* Upload web artifact to Vercel Preview.

---
## 21 Release Channels
* `eas build --profile preview` (iOS & Android).  
* Configure OTA updates.

---
## 22 User Analytics (Optional)
* `npm i expo-analytics-amplitude`.
* Track `turn_duration_ms`, `emotion_change_count`.

---
## 23 Polish & Ship ✨
* Run through checklist in `docs/documentation_validation_checklist.md`.
* Tag v1.0.0.

---
## Appendix – Package Versions
```jsonc
"ai": "^1.x",
"@ai-sdk/google": "^0.1",
"@ai-sdk/whisper": "^0.1",
"@ai-sdk/voyage": "^0.1",
"@elevenlabs/react": "^0.8",
"hume": "^0.9",
"expo-av": "~14.x",
"expo-permissions": "~14.x"
```
