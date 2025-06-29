o t# 🚦 Bolt.new Feature-by-Feature Roadmap – Understand.me

A concise, logical progression of features. Each checkpoint forms a **single Bolt.new commit branch** and naturally leads into the next – from first launch → voice mediation.

> Stack: Expo RN (web-first) · Vercel AI SDK (Gemini) · ElevenLabs Udine · Hume AI · Voyage Embeddings

| # | Feature Check-point | UI Component(s) Added / Changed | Packages Introduced |
|---|--------------------|---------------------------------|-----------------------------|
| 1 | **Auth + Profiles** | `AuthScreen`, `ProfileSetupScreen` | `expo-auth-session`, `zustand`, `zod` |
| 2 | **Onboarding + Mic Grant** | `OnboardingCarousel`, mic-permission modal | `expo-permissions`, `@react-native-async-storage/async-storage` |
| 3 | **Turn-Taking Voice Core** | `ConvAiDOMComponent` (Udine mic button) | `@elevenlabs/react`, `expo-av`, `expo-linear-gradient` |
| 4 | **Speech-to-Text Recorder** | – (logic layer only) | `expo-av`, `@ai-sdk/whisper` |
| 5 | **LLM (chatWithUdine)** | – (service) | `ai`, `@ai-sdk/google` |
| 6 | **Chat Interface (Auxiliary)** | `ChatUI` – typed clarifications, image drop-zone (voice remains primary) | `react-native-gesture-handler`, `expo-image-picker`, `@elevenlabs/react` (audio) |
| 7 | **Emotion Overlay** | `EmotionBadge` next to bubbles | `hume` |
| 8 | **Native Client Tools** | (invoked via voice; no new UI) | `expo-battery`, `expo-brightness` |
| 9 | **Knowledge (RAG) Panel** | `SimilarDocsPanel` slide-drawer | `@ai-sdk/voyage` |
| 10 | **Settings & Personalisation** | `SettingsScreen` via React Navigation | `@react-navigation/native`, `@react-native-async-storage/async-storage` |
| 11 | **Offline Cache & PWA** | Offline banner, PWA manifest files | `expo-asset`, `workbox` |
| 12 | **CI + Release** | – (pipeline only) | `expo-cli`, `eas-cli`, GitHub Actions |

## How They Chain Together
1 → 2 → 3: **Authenticated user** finishes onboarding ➜ microphone prompt triggered ➜ ready to talk.

3 → 4 → 5: Voice session captures user speech, converts to text, feeds LLM.

5 → 6: LLM reply streams to chat bubbles & Udine TTS.

6 → 7: Each message triggers emotion overlay for richer UX.

7 → 8: Udine can now execute native tools when user asks.

8 → 9: User can search knowledge base during chat.

9 → 10 → 11: Personalisation & offline support wrap up core UX; export as PWA.

11 → 12: CI ensures builds stay green; releases ship to stores & web preview.

## Acceptance Rule of Thumb
* **Green check** when feature: runs on web + iOS + Android simulators, no ESLint errors, new unit test (if logic).

Keep each branch focused – merge after review, then start next step.

### Package Matrix
| Domain | Package |
|---|---|
| AI SDK | `ai`, `@ai-sdk/google` |
| Voice | `@elevenlabs/react` |
| Emotion | `hume` |
| Embeddings | `@ai-sdk/voyage` |
| State | `zustand` |
| Validation | `zod` |

### Environment Variables
```
GOOGLE_GENAI_API_KEY=...
ELEVENLABS_API_KEY=...
EXPO_PUBLIC_UDINE_AGENT_ID=...
EXPO_PUBLIC_HUME_API_KEY=...
```

Happy building! 🚀
