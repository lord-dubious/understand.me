# Part 2: Comprehensive Feature Breakdown

## Introduction

This part of the Technical Product Knowledge Base (TPKB) provides a detailed technical breakdown of each major feature and user flow within the "Understand.me" application. Its purpose is to offer developers and architects a clear understanding of:

*   The specific technical requirements and acceptance criteria for each feature.
*   The division of responsibilities across the various services in our stack (Expo App, PicaOS, Supabase, Google GenAI, ElevenLabs, Dappier, Nodely, Upstash Redis, Sentry).
*   The key algorithms, complex logic, and data transformations involved.

This section complements Part 6 of the Developer's Guide (Feature Implementation Guide) by focusing more on the "what" and "why" from a technical requirements and service interaction perspective, whereas Part 6 focuses more on the "how-to-implement."

## Feature Breakdown Outline

The following sections will detail the technical aspects for each major feature area, mirroring the structure of the Developer's Guide Part 6 for consistency.

### 2.1. Onboarding Process
    *   **Feature:** User Sign-Up/Login
        *   **User Story/Goal:** [Placeholder]
        *   **UI Reference:** [Placeholder]
        *   **Technical Requirements & Acceptance Criteria:** [Placeholder]
        *   **Service Breakdown & Responsibilities:** [Placeholder]
        *   **Key Algorithms/Complex Logic:** [Placeholder]
    *   **Feature:** Conversational Personality Assessment - **See 2.X. Example 1 for full detail**
    *   **Feature:** Interactive Platform Tutorial
        *   **User Story/Goal:** [Placeholder]
        *   **UI Reference:** [Placeholder]
        *   **Technical Requirements & Acceptance Criteria:** [Placeholder]
        *   **Service Breakdown & Responsibilities:** [Placeholder]
        *   **Key Algorithms/Complex Logic:** [Placeholder]

### 2.2. Host Path - Session Creation & Setup
    *   **Feature:** Describe Conflict (including multimedia analysis) - **See 2.Y. Example 2 for full detail**
    *   **Feature:** AI Problem Analysis Review
        *   **User Story/Goal:** [Placeholder]
        *   **UI Reference:** [Placeholder]
        *   **Technical Requirements & Acceptance Criteria:** [Placeholder]
        *   **Service Breakdown & Responsibilities:** [Placeholder]
        *   **Key Algorithms/Complex Logic:** [Placeholder]
    *   **Feature:** Configure Session Type
        *   **User Story/Goal:** [Placeholder]
        *   **UI Reference:** [Placeholder]
        *   **Technical Requirements & Acceptance Criteria:** [Placeholder]
        *   **Service Breakdown & Responsibilities:** [Placeholder]
        *   **Key Algorithms/Complex Logic:** [Placeholder]
    *   **Feature:** Add Participants & Send Invitations
        *   **User Story/Goal:** [Placeholder]
        *   **UI Reference:** [Placeholder]
        *   **Technical Requirements & Acceptance Criteria:** [Placeholder]
        *   **Service Breakdown & Responsibilities:** [Placeholder]
        *   **Key Algorithms/Complex Logic:** [Placeholder]
    *   **Feature:** Track Invitation Status
        *   **User Story/Goal:** [Placeholder]
        *   **UI Reference:** [Placeholder]
        *   **Technical Requirements & Acceptance Criteria:** [Placeholder]
        *   **Service Breakdown & Responsibilities:** [Placeholder]
        *   **Key Algorithms/Complex Logic:** [Placeholder]

### 2.3. Participant Path - Joining Session
    *   **Feature:** Enter Session Code
        *   [Placeholder for full breakdown]
    *   **Feature:** Receive Detailed Invitation
        *   [Placeholder for full breakdown]
    *   **Feature:** Accept or Decline Invitation
        *   [Placeholder for full breakdown]
    *   **Feature:** Provide Your Perspective
        *   [Placeholder for full breakdown]
    *   **Feature:** Configure Privacy Settings
        *   [Placeholder for full breakdown]

### 2.4. Pre-Session Preparation (Converged Path)
    *   **Feature:** AI Synthesizes All Inputs & Dynamic Adaptation
        *   [Placeholder for full breakdown]
    *   **Feature:** Establish Session Goals & Rules
        *   [Placeholder for full breakdown]
    *   **Feature:** Same-Device Setup
        *   [Placeholder for full breakdown]

### 2.5. AI-Mediated Session Core (The Five Phases)
    *   **Feature:** Common Session Interface Logic
        *   [Placeholder for full breakdown]
    *   **Feature:** Phase 1: Prepare - **See 2.Z. Example 3 for full detail (Express Phase, implying Prepare is a precursor)**
        *   [Placeholder for full breakdown, focusing on technical aspects beyond Express Phase example]
    *   **Feature:** Phase 2: Express - **See 2.Z. Example 3 for full detail**
    *   **Feature:** Phase 3: Understand
        *   [Placeholder for full breakdown]
    *   **Feature:** Phase 4: Resolve
        *   [Placeholder for full breakdown]
    *   **Feature:** Phase 5: Heal
        *   [Placeholder for full breakdown]

### 2.6. Post-Session Activities
    *   **Feature:** AI Generates Summary & Action Plan
        *   [Placeholder for full breakdown]
    *   **Feature:** Participants Review & Approve Summary
        *   [Placeholder for full breakdown]
    *   **Feature:** Digital Sign-off
        *   [Placeholder for full breakdown]
    *   **Feature:** Session Evaluation & Feedback
        *   [Placeholder for full breakdown]
    *   **Feature:** Schedule Follow-up Check-ins
        *   [Placeholder for full breakdown]

### 2.7. Growth & Tracking Module
    *   **Feature:** Personal Growth Insights
        *   [Placeholder for full breakdown]
    *   **Feature:** Achievement Badges & Progress
        *   [Placeholder for full breakdown]
    *   **Feature:** Recommended Resources
        *   [Placeholder for full breakdown]
    *   **Feature:** Future Conflict Prevention Insights
        *   [Placeholder for full breakdown]

---
## 2.X. Example 1: Conversational Personality Assessment (from Onboarding Process)

*   **Feature Name & User Story/Goal:**
    *   **Name:** Conversational Personality Assessment.
    *   **User Story/Goal:** As a new user, I want to answer a few simple questions in a conversational way so that "Understand.me" (and Alex) can better understand my communication preferences and tailor its guidance and analysis for me.
*   **UI Reference:** UI Development Guide - Part 2, Section 2.3.
*   **Technical Requirements & Acceptance Criteria:**
    1.  System must present a sequence of questions to the user in a chat-like interface.
    2.  User must be able to respond via text input or voice input.
    3.  Voice input must be transcribed to text before processing.
    4.  System (Alex, via PicaOS/Google GenAI) must generate relevant follow-up questions or statements based on user responses.
    5.  User preferences derived from answers must be stored persistently against their profile.
    6.  The assessment flow must have a clear start and end.
    7.  Users must be able to skip or postpone the assessment.
    8.  Alex's voice must be synthesized by ElevenLabs based on the generated script.
    9.  The process should feel interactive and not like a standard form.
*   **Service Breakdown & Responsibilities:**
    *   **Expo App:**
        *   Renders chat UI (bubbles, input area, mic button - Component 10.1, 10.2, 10.8).
        *   Manages local UI state (current question, conversation history).
        *   Captures text input or audio input (`expo-av`).
        *   Sends user responses (text or audio data/reference) to PicaOS.
        *   Receives next question script, Alex voice URL, and control flags (e.g., `isComplete`) from PicaOS.
        *   Plays Alex's voice (`expo-av` - Component 10.2).
    *   **PicaOS (AI Orchestration):**
        *   Receives user input from Expo app.
        *   If audio, orchestrates STT (e.g., calls Google GenAI STT).
        *   Maintains current state of user's assessment progress (could cache in Upstash Redis for multi-turn conversations).
        *   Constructs prompts for Google GenAI (LLM) including conversation history and user's latest response to get analysis and script for Alex's next turn.
        *   Stores extracted/derived preferences temporarily or sends to Supabase Edge Function for storage.
        *   Sends Alex's text script to ElevenLabs for TTS.
        *   Returns structured response (next question, Alex script, voice URL, completion status) to Expo app.
        *   On completion, may trigger a final GenAI call to summarize preferences and updates Supabase.
    *   **Supabase:**
        *   **Auth:** Provides `user_id`.
        *   **Database (`profiles` table):** Stores derived `preferred_communication_style` (JSONB) for the user.
    *   **Google GenAI SDK:**
        *   Provides STT for voice input (if PicaOS uses it).
        *   Provides LLM for analyzing user responses, determining next question, and generating Alex's script.
    *   **ElevenLabs API:** Generates Alex's voice from the script provided by PicaOS.
    *   **Upstash Redis (via PicaOS):** Potentially caches intermediate assessment state or user responses during the conversation to optimize multi-turn interactions with PicaOS.
    *   **Dappier/Nodely:** Not directly involved in this specific feature, unless assessment data was to be made verifiable (Dappier) or stored decentrally (Nodely), which is not a primary requirement here.
    *   **Sentry:** Monitors errors in Expo app, PicaOS, and any Supabase Edge Functions involved.
*   **Key Algorithms/Complex Logic:**
    *   **PicaOS:** Logic for managing the question flow (fixed sequence or dynamic based on GenAI). Prompt engineering for Google GenAI to elicit desired analysis and script. State management for the conversation.
    *   **Google GenAI:** Natural language understanding of user's free-form answers. Logic for determining appropriate follow-up questions/prompts. Script generation for Alex.

---
## 2.Y. Example 2: Describe Conflict (including multimedia analysis)

*   **Feature Name & User Story/Goal:**
    *   **Name:** Describe Conflict & Context.
    *   **User Story/Goal:** As a Host, I want to describe the conflict or session topic using text and optionally upload relevant documents, images, or short audio/video clips so that the AI (Alex) can analyze the context and help prepare for a productive session.
*   **UI Reference:** UI Development Guide - Part 4, Section 4.1.
*   **Technical Requirements & Acceptance Criteria:**
    1.  Host must be able to input a session title and a multi-line text description.
    2.  Host must be able to select and upload multiple files of supported types (PDF, DOCX, JPG, PNG, MP3, MP4 - defined in Component 10.3).
    3.  Files must be uploaded to secure storage (Supabase Storage).
    4.  Text and references to uploaded files must be sent to PicaOS for analysis.
    5.  PicaOS must be ableto retrieve file content from storage for analysis.
    6.  PicaOS must use Google GenAI (text, STT, vision models as appropriate) to analyze all provided inputs.
    7.  Initial session record must be created in Supabase.
    8.  User must receive confirmation of submission and indication that analysis is proceeding.
*   **Service Breakdown & Responsibilities:**
    *   **Expo App:**
        *   Renders input fields (`<TextInput>`) for title/description (Component 10.8).
        *   Handles file selection using `expo-document-picker`, `expo-image-picker` (Component 10.3).
        *   Manages file upload directly to Supabase Storage (Dev Guide 3.5). Displays upload progress.
        *   Collects text inputs and file storage references.
        *   Sends data to PicaOS endpoint for initiating conflict description and analysis.
        *   Navigates to AI Problem Analysis Review screen (UI Guide 4.2) upon receiving confirmation from PicaOS.
    *   **PicaOS (AI Orchestration):**
        *   Receives text data and file references from Expo app.
        *   Creates initial `sessions` record and associated `session_files` records in Supabase DB.
        *   Orchestrates AI analysis:
            *   For text: Sends to Google GenAI LLM.
            *   For documents: Retrieves from Supabase Storage, extracts text (e.g., using a library or GenAI utility), sends to Google GenAI LLM.
            *   For images: Retrieves from Supabase Storage, sends to Google GenAI Vision model.
            *   For audio/video: Retrieves from Supabase Storage, uses Google GenAI STT (or ElevenLabs STT if preferred for specific audio quality/nuance) to transcribe, then sends transcript to LLM.
            *   PicaOS might use Upstash Redis to cache results of file transcriptions or initial analyses if files are large or analysis is slow, to avoid re-processing if the submission process is interrupted and retried.
        *   Stores structured analysis results (themes, sentiment, etc.) in Supabase (e.g., `sessions.ai_synthesis_summary` or related tables).
        *   Notifies Expo app when analysis is ready (or provides initial confirmation and later update via polling/realtime).
    *   **Supabase:**
        *   **Storage:** Stores uploaded multimedia files.
        *   **Database:** Stores `sessions` record, `session_files` records, and later the AI analysis results.
    *   **Google GenAI SDK:** Provides LLM for text analysis, Vision model for image analysis, STT for audio/video transcription.
    *   **Nodely (Optional - Future):** If a host uploads a file that is deemed critical evidence and needs immutable, decentralized storage, PicaOS or a Supabase Edge Function could later trigger Nodely to pin this file (from Supabase Storage) to IPFS. The IPFS CID would then be stored in `session_files`.
    *   **Dappier:** Not directly involved in this feature, unless specific external datasets were needed via Dappier for RAG to understand the conflict context, which is less likely for initial description.
    *   **Sentry:** Monitors errors in Expo app, PicaOS, and any Supabase Edge Functions.
*   **Key Algorithms/Complex Logic:**
    *   **PicaOS:** Logic to handle different file types, dispatch to appropriate Google GenAI models, aggregate results, and structure them for storage and display. Error handling for failed file processing or analysis.
    *   **Google GenAI:** Multi-modal analysis capabilities.

---
## 2.Z. Example 3: Express Phase (from AI-Mediated Session Core)

*   **Feature Name & User Story/Goal:**
    *   **Name:** Express Phase.
    *   **User Story/Goal:** As a session participant, I want to have a dedicated and uninterrupted turn to express my perspective using voice or text, and optionally share a file, so that my viewpoint is clearly captured and understood by others and the AI mediator.
*   **UI Reference:** UI Development Guide - Part 7, Section 7.3.
*   **Technical Requirements & Acceptance Criteria:**
    1.  System (PicaOS) must manage a speaking order for participants.
    2.  Expo app must clearly indicate whose turn it is and who is next.
    3.  Active speaker must be able to provide input via voice (transcribed in real-time) or text.
    4.  Active speaker must be able to attach/share a file during their turn.
    5.  For Same-Device Mode (Component 10.4), the "tap-to-talk" mechanism must correctly attribute speech to the selected user on the shared device.
    6.  All spoken/typed contributions must be stored in Supabase (`session_messages`) with correct speaker attribution and timestamp.
    7.  Alex (PicaOS/GenAI) must monitor for interruptions and gently enforce the "one speaker at a time" rule.
    8.  Alex may provide time management cues if applicable.
    9.  Listeners see the real-time transcript.
*   **Service Breakdown & Responsibilities:**
    *   **Expo App:**
        *   Displays current speaker, next speaker, and speaking order (data from PicaOS via `sessionStore`).
        *   Manages UI for active speaker (highlighting, input enabled) vs. listeners.
        *   Handles Same-Device "tap-to-talk" logic (Component 10.4), ensuring correct `profile_id` is sent with input.
        *   Captures voice input (`expo-av` - Component 10.1) and sends audio chunks to PicaOS for real-time STT.
        *   Captures text input (`<TextInput>` - Component 10.8) and sends to PicaOS.
        *   Handles file selection (`expo-document-picker`/`expo-image-picker` - Component 10.3) and upload to Supabase Storage, then sends file reference to PicaOS.
        *   Receives and displays real-time transcript updates (from Supabase Realtime via PicaOS).
        *   Displays Alex's guidance/interventions (from PicaOS).
    *   **PicaOS (AI Orchestration):**
        *   Manages session state: current phase (`Express`), speaking order, active speaker, timers. This state could be backed by Upstash Redis for resilience.
        *   Receives audio from Expo app -> Google GenAI STT (or ElevenLabs STT).
        *   Receives text/transcript or file reference from Expo app.
        *   Constructs `session_messages` payload (with `session_id`, `profile_id`, `content`, `message_type`) and instructs Supabase Edge Function (or uses service key directly if PicaOS is secure backend) to insert into Supabase DB. This insert triggers Supabase Realtime updates for all clients.
        *   Monitors conversation flow (via GenAI analysis of incoming messages) for interruptions or significant deviations from rules/goals.
        *   Prompts Google GenAI for Alex's intervention scripts (e.g., time reminders, rule enforcement) and sends to ElevenLabs for TTS, then to Expo app.
    *   **Supabase:**
        *   **Database:** Stores `session_messages`, `session_files`. Updates `session_participants` (e.g., `last_spoke_at`).
        *   **Realtime:** Broadcasts new `session_messages` to all subscribed clients.
        *   **Storage:** Stores any files shared during this phase.
    *   **Google GenAI SDK:** Provides STT (if used by PicaOS), and LLM for analyzing flow/generating Alex's intervention scripts.
    *   **ElevenLabs API:** Voices Alex's interventions.
    *   **Upstash Redis (via PicaOS):** Caching current session state, speaking order, or frequently used Alex prompts for this phase.
    *   **Dappier/Nodely:** Unlikely to be directly involved in the core Express phase logic unless a shared file comes from/goes to IPFS via Nodely, or Dappier provides real-time data that a user refers to during their turn.
    *   **Sentry:** Monitors errors in all services.
*   **Key Algorithms/Complex Logic:**
    *   **PicaOS:** Turn management queue. Logic for detecting interruptions or end-of-turn (could be based on silence detection from STT, explicit "done" action, or GenAI understanding semantic completion). Prompt engineering for Alex's interventions.
    *   **Expo App (Same-Device):** Accurately capturing which of the co-located users initiated the "tap-to-talk" and associating their input with their correct `profile_id`.

---
