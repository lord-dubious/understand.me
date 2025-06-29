# 📁 Updated File Map – Understand.me (Client-Only Expo Project)

```
understand.me/
├── App.tsx                     # Root – mounts navigation + providers
├── app.json                    # Expo config (icons, mic permission, etc.)
├── components/
│   ├── ConvAiDOMComponent.tsx  # Udine mic button + turn-taking hook
│   ├── ChatUI.tsx              # Auxiliary typed chat & image drop zone
│   ├── EmotionBadge.tsx        # Small emotion dot component
│   └── SimilarDocsPanel.tsx    # RAG drawer
├── hooks/
│   ├── useRecorder.ts          # Speech recorder (WAV)
│   └── useEmotion.ts           # Stream Hume emotion state
├── screens/
│   ├── Home.tsx                # Combines ConvAiDOMComponent + ChatUI
│   └── Settings.tsx            # Voice, theme, gap duration settings
├── services/
│   ├── ai/
│   │   ├── chat.ts             # chatWithUdine (Gemini stream)
│   │   ├── rag.ts              # ingestFile, ragRetrieve helpers
│   │   ├── stt.ts              # speechToText wrapper
│   │   └── tools.ts            # Battery, brightness, flash exec
│   └── hume.ts                 # Hume SDK wrapper
├── stores/
│   └── useConversationStore.ts # Zustand store – message history
├── utils/
│   ├── chunker.ts              # Text chunk util (800/200)
│   └── tools.ts                # Expo Battery/Brightness helpers
├── docs/                       # Architecture & guides (markdown)
│   ├── bolt-feature-roadmap.md
│   ├── analysis-engine-orchestration.md
│   └── … (other up-to-date docs)
└── storage/                    # Runtime user corpora (IndexedDB / FS)
```

> No `/server` directory – all orchestration happens client-side via Vercel AI SDK streams.

### Key NPM Packages by Domain
| Domain | Package |
|--------|---------|
| AI Core | `ai`, `@ai-sdk/google` |
| Embeddings | `@ai-sdk/voyage` |
| Speech-to-Text | `@ai-sdk/whisper` (or Google Speech) |
| Voice (TTS) | `@elevenlabs/react` |
| Emotion | `hume` |
| State | `zustand`, `immer` |
| Validation | `zod` |
| Images | `expo-image-picker` |

### Environment Variables
```
GOOGLE_GENAI_API_KEY=
ELEVENLABS_API_KEY=
EXPO_PUBLIC_UDINE_AGENT_ID=
EXPO_PUBLIC_HUME_API_KEY=
```
