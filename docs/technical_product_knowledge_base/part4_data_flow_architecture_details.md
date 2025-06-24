# Part 4: Data Flow Architecture Details

## Introduction

Understanding the flow of data is critical in a distributed, serverless architecture like "Understand.me." This part of the Technical Product Knowledge Base (TPKB) provides detailed diagrams and explanations for key complex features, illustrating how data moves between the Expo (React Native) mobile app, PicaOS (AI Orchestration), Supabase (BaaS), and other integrated services (Google GenAI, ElevenLabs, Dappier, Nodely, Upstash Redis).

These data flows aim to clarify:
*   The sequence of operations for specific user actions or system processes.
*   The responsibilities of each service at each step.
*   The conceptual data schemas or payloads being exchanged.
*   Significant data transformations or processing logic.

A clear grasp of these flows is essential for developers to debug issues, implement new functionalities consistently, and understand the system's overall behavior.

---

## Data Flow 1: Conversational Personality Assessment (UI Guide 2.3, Dev Guide 6.X/6.1.4)

**Goal:** To capture user's communication preferences through a guided, conversational interaction with Alex and store these preferences.

**Mermaid Sequence Diagram:**

```mermaid
sequenceDiagram
    participant ExpoApp as Expo App (Frontend)
    participant PicaOS as PicaOS (AI Orchestrator)
    participant GoogleGenAI as Google GenAI (LLM & STT)
    participant ElevenLabs as ElevenLabs API (TTS)
    participant SupabaseDB as Supabase DB (Profiles)
    participant UpstashRedis as Upstash Redis (Cache - Optional)

    ExpoApp->>PicaOS: POST /assessment/start (userId)
    PicaOS-->>GoogleGenAI: Generate first question script for Alex
    GoogleGenAI-->>PicaOS: Alex script & first question data
    PicaOS-->>ElevenLabs: Synthesize Alex script (voice)
    ElevenLabs-->>PicaOS: Alex voice audio URL/data
    PicaOS-->>ExpoApp: { firstQuestion, alexScript, alexVoiceUrl }

    loop Assessment In Progress
        ExpoApp->>PicaOS: POST /assessment/submit_answer (userId, questionId, userAnswerTextOrAudioRef, history)
        PicaOS->>GoogleGenAI: (If audio) STT userAnswerAudioRef
        GoogleGenAI-->>PicaOS: (If audio) userAnswerText
        PicaOS->>SupabaseDB: Store/update partial preferences in profiles.preferred_communication_style (JSONB)
        PicaOS->>UpstashRedis: (Optional) Cache intermediate assessment state
        PicaOS->>GoogleGenAI: Analyze answer, get next question & Alex script (with history)
        GoogleGenAI-->>PicaOS: { nextQuestion?, alexScript, isComplete }
        PicaOS-->>ElevenLabs: Synthesize Alex script
        ElevenLabs-->>PicaOS: Alex voice audio URL/data
        PicaOS-->>ExpoApp: { nextQuestion?, alexScript, alexVoiceUrl, isComplete }
        alt if isComplete is true
            PicaOS->>GoogleGenAI: (Optional) Final summary of preferences
            GoogleGenAI-->>PicaOS: Preference summary
            PicaOS->>SupabaseDB: Update profiles.preferred_communication_style with final/summarized data
            PicaOS->>UpstashRedis: (Optional) Clear cached assessment state
        end
    end
```

**Textual Explanation:**

1.  **Initiation (Expo App -> PicaOS):**
    *   User navigates to the assessment screen. Expo app sends a request to PicaOS (e.g., `POST /assessment/start`) with the `userId`.
    *   **Payload:** `{ userId: string }`
2.  **First Question Generation (PicaOS -> Google GenAI -> ElevenLabs -> PicaOS -> ExpoApp):**
    *   PicaOS requests the initial assessment question and Alex's introductory script from Google GenAI.
    *   Google GenAI returns the script and question data.
    *   PicaOS sends the script to ElevenLabs for voice synthesis.
    *   PicaOS returns the first question details, Alex's text script, and the voice audio URL to the Expo app.
    *   **Payload (PicaOS to ExpoApp):** `{ question: { id: 'q1', text: '...', options: [...] }, alexScript: "Hi...", alexVoiceUrl: "..." }`
3.  **User Response Loop (Expo App -> PicaOS -> ... -> ExpoApp):**
    *   **User Input (Expo App):** User provides an answer (text or voice). Voice is recorded using `expo-av`.
    *   **Submit Answer (Expo App to PicaOS):** App sends `userId`, `questionId`, the answer (text or audio reference like a Supabase Storage path if uploaded first for STT), and conversation history to PicaOS (e.g., `POST /assessment/submit_answer`).
        *   **Payload:** `{ userId: string, questionId: string, answerText?: string, answerAudioRef?: string, history: [{speaker: 'user'|'alex', text: string}] }`
    *   **PicaOS Orchestration:**
        *   **STT (if audio):** If `answerAudioRef` is present, PicaOS retrieves audio and sends to Google GenAI STT.
        *   **Store Partial Preference:** PicaOS updates the `profiles.preferred_communication_style` JSONB field in Supabase with the latest understood preference from the answer. This could be an incremental update.
        *   **Cache State (Optional):** PicaOS might cache the current assessment state (e.g., current question, history) in Upstash Redis for resilience or to manage stateless PicaOS instances.
        *   **Next Step from GenAI:** PicaOS sends the (transcribed) answer and conversation history to Google GenAI, prompting for analysis, the next question/statement from Alex, and whether the assessment is complete.
        *   **Voice Synthesis:** PicaOS gets Alex's new script voiced by ElevenLabs.
    *   **Response to Expo App:** PicaOS returns `{ nextQuestion?: { id: 'q2', ... }, alexScript: "...", alexVoiceUrl: "...", isComplete: boolean }`.
    *   **UI Update:** Expo app displays Alex's response and the next question.
4.  **Assessment Completion:**
    *   When Google GenAI (via PicaOS) indicates `isComplete: true`:
        *   PicaOS may perform a final call to Google GenAI to get a consolidated summary of all preferences.
        *   PicaOS makes a final update to `profiles.preferred_communication_style` in Supabase with the complete/summarized assessment data.
        *   PicaOS may clear any cached assessment state from Upstash Redis.
        *   Expo app navigates to the next onboarding step (e.g., Interactive Tutorial).

---

## Data Flow 2: Real-time AI-Mediated Session Message (with RAG) (UI Guide Part 7)

**Goal:** To process a user's message during a live session, potentially augment Alex's response with external knowledge via Dappier (RAG), and broadcast the message and Alex's response to all participants in real-time.

**Mermaid Sequence Diagram:**

```mermaid
sequenceDiagram
    participant UserApp as Expo App (User A)
    participant OtherUsersApp as Expo App (Other Participants)
    participant SupabaseRT as Supabase Realtime
    participant SupabaseDB as Supabase DB (session_messages)
    participant PicaOS as PicaOS (AI Orchestrator)
    participant Dappier as Dappier (RAG Service)
    participant GoogleGenAI as Google GenAI (LLM & STT)
    participant ElevenLabs as ElevenLabs API (TTS)
    participant UpstashRedis as Upstash Redis (Cache)

    UserApp->>PicaOS: POST /session/{id}/message (text or audioRef)
    PicaOS->>GoogleGenAI: (If audio) STT audioRef
    GoogleGenAI-->>PicaOS: Transcript
    PicaOS->>SupabaseDB: INSERT into session_messages (user_message, speaker_id)
    SupabaseDB-->>SupabaseRT: New message event
    SupabaseRT-->>UserApp: Realtime: User A's message
    SupabaseRT-->>OtherUsersApp: Realtime: User A's message

    PicaOS->>UpstashRedis: GET cached_context_for_alex_response (Optional)
    alt Cache Miss or Stale for RAG context
        PicaOS->>Dappier: Query for RAG context based on user_message/session_history
        Dappier-->>PicaOS: Relevant documents/context
        PicaOS->>UpstashRedis: SET cached_context_for_alex_response (Optional)
    end
    PicaOS->>GoogleGenAI: Generate Alex script (with user_message, history, RAG_context?)
    GoogleGenAI-->>PicaOS: Alex script
    PicaOS->>UpstashRedis: GET cached_alex_voice (Optional, for common phrases)
    alt Voice Cache Miss
        PicaOS->>ElevenLabs: Synthesize Alex script
        ElevenLabs-->>PicaOS: Alex voice audio URL/data
        PicaOS->>UpstashRedis: SET cached_alex_voice (Optional)
    end
    PicaOS->>SupabaseDB: INSERT into session_messages (alex_message, "Alex" as speaker)
    SupabaseDB-->>SupabaseRT: New message event (Alex's message)
    SupabaseRT-->>UserApp: Realtime: Alex's message & voice
    SupabaseRT-->>OtherUsersApp: Realtime: Alex's message & voice
```

**Textual Explanation:**

1.  **User Sends Message (Expo App -> PicaOS):**
    *   Participant A speaks (audio captured by `expo-av`, sent as chunks or reference) or types a message (`<TextInput>`).
    *   Expo app sends this to PicaOS: `POST /session/{sessionId}/message`
    *   **Payload:** `{ userId: string, textPayload?: string, audioReference?: string, currentPhase: string, sessionHistorySummary?: string }`
2.  **PicaOS: Initial Processing & User Message Persistence:**
    *   **STT (if audio):** PicaOS sends audio data/reference to Google GenAI STT.
    *   **Store User Message:** PicaOS takes the transcribed text (or original typed text) and instructs Supabase (directly or via Edge Function) to insert it into `session_messages`.
        *   **Data:** `{ session_id, profile_id (speaker), message_type: 'user_speech_transcript' | 'user_typed_message', content: string }`
3.  **Supabase Realtime Broadcast (User Message):**
    *   The insert into `session_messages` triggers Supabase Realtime.
    *   All subscribed clients (User A's app, Other Participants' apps) receive the new message.
    *   Expo apps update their local message list (`<FlatList>`) to display User A's message.
4.  **PicaOS: Alex's Response Formulation (RAG & LLM):**
    *   **Context Retrieval (Dappier RAG - Optional):**
        *   PicaOS analyzes User A's message and recent conversation history (potentially cached in Upstash Redis or fetched from Supabase).
        *   If the context suggests a need for external information (as per session type or specific keywords), PicaOS queries Dappier with relevant search terms.
        *   Dappier returns relevant document chunks/information. This retrieved context could be cached in Upstash Redis by PicaOS if the query is likely to repeat.
    *   **Prompt Construction:** PicaOS constructs a prompt for Google GenAI (LLM) including:
        *   User A's message.
        *   Relevant conversation history (summarized if long).
        *   Retrieved context from Dappier (if any).
        *   Current session phase, goals, rules.
        *   Participant personality profiles (if relevant for tailoring Alex's response style).
        *   Instructions for Alex's role (e.g., "clarify," "summarize," "mediate," "check for understanding").
    *   **Google GenAI Call:** PicaOS sends the prompt to Google GenAI.
    *   Google GenAI returns Alex's scripted response (text).
5.  **PicaOS: Alex's Voice Synthesis & Message Persistence:**
    *   **Voice Caching (Optional):** PicaOS checks Upstash Redis for a cached audio URL for this exact script (if it's a common phrase).
    *   **ElevenLabs TTS:** If not cached or stale, PicaOS sends the script to ElevenLabs. ElevenLabs returns audio URL/data. PicaOS caches this if appropriate.
    *   **Store Alex's Message:** PicaOS instructs Supabase to insert Alex's message (text and voice URL) into `session_messages`.
        *   **Data:** `{ session_id, profile_id: 'alex_ai_id', message_type: 'alex_guidance', content: string, voice_url: string }`
6.  **Supabase Realtime Broadcast (Alex's Message):**
    *   The insert of Alex's message triggers Supabase Realtime.
    *   All subscribed clients receive Alex's message.
    *   Expo apps update their UI to display Alex's text and play the audio via `expo-av` (Component 10.2).

---

## Data Flow 3: Multimedia File Analysis & Contextualization (UI Guide 4.1, 4.2, 7.1.D)

**Goal:** To allow a host to upload a multimedia file, have it analyzed by AI, and the analysis results made available for session preparation and referenced during the live session.

**Mermaid Sequence Diagram:**

```mermaid
sequenceDiagram
    participant ExpoApp as Expo App (Host)
    participant SupabaseStorage as Supabase Storage
    participant SupabaseDB as Supabase DB (sessions, session_files)
    participant PicaOS as PicaOS (AI Orchestrator)
    participant GoogleGenAI as Google GenAI (Vision/STT/LLM)
    participant Nodely as Nodely (IPFS - Optional)
    participant UpstashRedis as Upstash Redis (Cache - Optional)

    ExpoApp->>SupabaseStorage: Upload file (image.jpg)
    SupabaseStorage-->>ExpoApp: Return storage_path (e.g., "user_uuid/image.jpg")

    ExpoApp->>PicaOS: POST /session/add_file_for_analysis (sessionId, file_name, storage_path, file_type)
    PicaOS->>SupabaseDB: INSERT into session_files (sessionId, uploader_id, file_name, storage_path, file_type)
    PicaOS-->>ExpoApp: { fileId, status: "pending_analysis" }

    PicaOS->>SupabaseStorage: Download file binary using storage_path
    SupabaseStorage-->>PicaOS: File binary

    alt File is Image
        PicaOS->>GoogleGenAI: Analyze image (Vision API)
        GoogleGenAI-->>PicaOS: Image description/labels/text
        PicaOS->>SupabaseDB: UPDATE session_files SET ai_analysis_snippet = description WHERE id = fileId
        PicaOS->>UpstashRedis: Cache analysis_snippet (Optional)
    else File is Audio/Video
        PicaOS->>GoogleGenAI: Transcribe audio/video (STT API)
        GoogleGenAI-->>PicaOS: Transcript
        PicaOS->>GoogleGenAI: Summarize/analyze transcript (LLM API)
        GoogleGenAI-->>PicaOS: Transcript analysis/summary
        PicaOS->>SupabaseDB: UPDATE session_files SET ai_analysis_snippet = analysis, transcript = full_transcript WHERE id = fileId
        PicaOS->>UpstashRedis: Cache analysis_snippet (Optional)
    else File is Document (PDF, DOCX)
        PicaOS->>GoogleGenAI: Extract text & summarize/analyze (LLM with document handling)
        GoogleGenAI-->>PicaOS: Document analysis/summary
        PicaOS->>SupabaseDB: UPDATE session_files SET ai_analysis_snippet = analysis WHERE id = fileId
        PicaOS->>UpstashRedis: Cache analysis_snippet (Optional)
    end

    PicaOS->>ExpoApp: (Via Realtime/Polling) Notify analysis complete for fileId

    opt Later - Critical File Pinning
        PicaOS->>Nodely: Pin file (from Supabase Storage or binary) to IPFS
        Nodely-->>PicaOS: IPFS CID
        PicaOS->>SupabaseDB: UPDATE session_files SET ipfs_cid = CID WHERE id = fileId
    end
```

**Textual Explanation:**

1.  **File Upload (Expo App to Supabase Storage - Component 10.3):**
    *   Host selects a file using `expo-document-picker` or `expo-image-picker`.
    *   Expo app uploads the file directly to a designated Supabase Storage bucket.
    *   **Payload:** File binary.
    *   Supabase Storage returns a unique `storage_path`.
2.  **Inform PicaOS & Initial Record (Expo App to PicaOS):**
    *   Expo app sends file metadata (including `storage_path`, original `file_name`, `file_type`) and the relevant `session_id` (or prospective session ID if conflict description stage) to PicaOS (e.g., `POST /session/add_file_for_analysis`).
    *   **Payload:** `{ sessionId: string, fileName: string, storagePath: string, fileType: string, uploaderId: string }`
    *   PicaOS creates a record in `session_files` table in Supabase, linking the file to the session and uploader, storing its path and type. Initially, `ai_analysis_snippet` might be null.
    *   PicaOS returns a `fileId` and status (e.g., "pending_analysis") to the Expo app.
3.  **PicaOS: File Retrieval & AI Analysis Orchestration:**
    *   PicaOS (can be an asynchronous process triggered by the previous step) retrieves the file binary from Supabase Storage using the `storage_path`.
    *   **Content-Specific Analysis (PicaOS -> Google GenAI):**
        *   **Images:** PicaOS sends image binary to Google GenAI Vision model for description, object detection, or text extraction.
        *   **Audio/Video:** PicaOS sends audio/video to Google GenAI STT (or ElevenLabs STT) for transcription. The transcript may then be sent to a GenAI LLM for summarization or key point extraction.
        *   **Documents (PDF, DOCX):** PicaOS sends the document (or extracted text via a utility) to a Google GenAI LLM capable of document understanding/summarization.
    *   Google GenAI returns the structured analysis (e.g., description, labels, transcript, summary) to PicaOS.
4.  **PicaOS: Store & Cache Analysis:**
    *   PicaOS updates the corresponding `session_files` record in Supabase with the `ai_analysis_snippet` and full transcript if applicable.
    *   PicaOS may cache this `ai_analysis_snippet` in Upstash Redis using a key like `file_analysis:{fileId}` for quick retrieval by the Expo app when displaying file details or by PicaOS itself during broader session synthesis.
5.  **Notification of Completion (PicaOS to Expo App):**
    *   PicaOS notifies the Expo app (e.g., via Supabase Realtime subscription on `session_files` or a specific notification channel) that analysis for `fileId` is complete.
    *   Expo app can then update its UI to show the snippet or indicate readiness for review (e.g., in UI Guide 4.2).
6.  **Contextual Use In-Session (UI Guide 7.1.D):**
    *   During a live session, if Alex or a user refers to this file, PicaOS can quickly fetch the `ai_analysis_snippet` (from Redis or Supabase) and provide it to Google GenAI as part of the context for generating Alex's next response, or display it in the AI Panel.
7.  **Optional IPFS Pinning (PicaOS -> Nodely -> Supabase):**
    *   At a later stage (e.g., if file is deemed critical evidence or part of a final agreement), PicaOS or a Supabase Edge Function can retrieve the file from Supabase Storage and use Nodely to pin it to IPFS.
    *   The returned IPFS CID is then updated in the `session_files.ipfs_cid` field in Supabase. Retrieval for display in Expo would then use a Nodely/IPFS gateway URL.
