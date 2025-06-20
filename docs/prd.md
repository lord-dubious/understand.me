# Understand.me - Product Requirements Document (PRD)

## 1. Introduction

### 1.1. Purpose
This Product Requirements Document (PRD) defines the functional requirements for the "Understand.me" mobile application. It serves as a foundational guide for the development team, product managers, and QA testers to ensure the delivered product aligns with the intended features and user needs. This document focuses on *what* the system should do. The *how* (technical implementation) is detailed in the Developer's Guide and Technical Product Knowledge Base.

### 1.2. Product Overview
"Understand.me" is an AI-mediated mobile application designed to enhance communication, facilitate understanding, and guide users through structured conversational processes. Its core is "Alex," an AI voice agent that acts as a facilitator, analyst, coach, and mediator. The application supports various interaction types, from personal reflection and skill development to complex, multi-participant mediated sessions. It aims to create clearer, more empathetic, and productive interactions by leveraging advanced AI for transcription, translation, analysis, and guidance. The platform is built using a serverless-first architecture with Expo (React Native) for the mobile frontend, and a backend stack including Supabase, PicaOS (AI orchestration), Google GenAI, ElevenLabs, Upstash Redis, and potentially Dappier and Nodely for specialized data handling and workflows.

### 1.3. Scope
This PRD covers the **functional requirements** of the "Understand.me" mobile application. This includes:
*   User authentication and management.
*   Core capabilities of the AI agent "Alex."
*   Onboarding processes for new users.
*   Functionality for hosts to create, configure, and manage sessions.
*   Functionality for participants to join and engage in sessions.
*   The five-phase AI-mediated session flow.
*   Post-session summary generation, review, and sign-off.
*   The personal growth and tracking module.
*   Multimedia handling (upload, display, analysis context).
*   Real-time interactions and notifications.

Non-functional requirements (performance, security, reliability, usability, maintainability) are detailed in relevant sections of the Developer's Guide and Technical Product Knowledge Base. UI/UX design specifics are detailed in the UI Development Guide.

### 1.4. References
This PRD should be read in conjunction with the following project documents:
*   `Understand-me_ AI-Mediated Conflict Resolution Platform - Research & Strategy Report.txt` (Conceptual reference for market, user needs, and strategy)
*   `understand_me_mermaid_flow updated.mermaid` (Overall application user flow)
*   `docs/development_guide/README.md` (UI Development Guide - for UI/UX specifics)
*   `docs/developer_guide/README.md` (Developer's Guide - for technical implementation details)
*   `docs/technical_product_knowledge_base/README.md` (Technical Product Knowledge Base - for deep technical synthesis)

## 2. User Personas & Roles (Functional Focus)

This section summarizes the key user personas and their primary functional goals within the "Understand.me" application. Detailed persona descriptions are available in the Research & Strategy Report and TPKB Part 2.

### 2.1. Harriet (The Host/Mediator/Facilitator)
*   **FR-PER-HOS-001:** Must be able to create new sessions.
*   **FR-PER-HOS-002:** Must be able to provide detailed context for a session, including text descriptions and multimedia file uploads (documents, images, audio, video).
*   **FR-PER-HOS-003:** Must be able to review AI-generated analysis of the provided session context.
*   **FR-PER-HOS-004:** Must be able to configure session types, choosing from templates or customizing settings (e.g., duration, features like Q&A, polls, anonymity, transcription, translation).
*   **FR-PER-HOS-005:** Must be able to define specific goals and communication rules for a session.
*   **FR-PER-HOS-006:** Must be able to invite participants to a session (e.g., via email, shareable link) and manage participant roles.
*   **FR-PER-HOS-007:** Must be able to track participant invitation statuses (accepted, declined, pending).
*   **FR-PER-HOS-008:** Must be able to initiate and lead an AI-mediated session through its five phases.
*   **FR-PER-HOS-009:** Must be able to utilize in-session AI guidance and moderation tools provided by Alex.
*   **FR-PER-HOS-010:** Must receive and review AI-generated post-session summaries and action plans.
*   **FR-PER-HOS-011:** Must be able to manage the review and approval process for session summaries with participants.
*   **FR-PER-HOS-012:** Must be able to digitally sign off on final session summaries.
*   **FR-PER-HOS-013:** Must be able to schedule follow-up check-in sessions.
*   **FR-PER-HOS-014:** Must be able to access personal growth insights and track communication skill development related to hosting.

### 2.2. Paul (The Participant)
*   **FR-PER-PAR-001:** Must be able to join a session using a unique session code or an invitation link.
*   **FR-PER-PAR-002:** Must be able to view detailed invitation information, including context and files shared by the Host.
*   **FR-PER-PAR-003:** Must be able to accept or decline session invitations, optionally providing a reason for declining.
*   **FR-PER-PAR-004:** Must be able (if requested by the Host) to provide their perspective on the session topic before it begins, including text and multimedia file uploads.
*   **FR-PER-PAR-005:** Must be able to configure personal privacy settings related to data usage and visibility in sessions.
*   **FR-PER-PAR-006:** Must be able to actively participate in all five phases of an AI-mediated session, including expressing their views (via voice or text) and engaging in understanding and resolution activities.
*   **FR-PER-PAR-007:** Must be able to understand and follow Alex's guidance and the established session rules.
*   **FR-PER-PAR-008:** Must be able to review and (if required) approve or suggest changes to post-session summaries.
*   **FR-PER-PAR-009:** Must be able to digitally sign off on final session summaries if required.
*   **FR-PER-PAR-010:** Must be able to provide feedback on the session and AI mediation.
*   **FR-PER-PAR-011:** Must be able to access personal growth insights related to their participation.

### 2.3. Individual User (Self-Reflection/Personal Growth)
*   **FR-PER-IND-001:** Must be able to use the application for personal, private use without necessarily inviting other participants (e.g., for voice journaling, practicing communication, self-reflection).
*   **FR-PER-IND-002:** Must be able to get live transcription of their spoken input in this solo mode.
*   **FR-PER-IND-003:** Must be able to receive AI-driven analysis and insights on their personal input (similar to conflict description analysis but for self-reflection).
*   **FR-PER-IND-004:** Must be able to access all features of the Personal Growth & Tracking Module (insights, badges, resources, conflict prevention advice) based on their solo usage and any participated sessions.
*   **FR-PER-IND-005:** Must have strong privacy assurances for their solo usage data.

## 3. System-Wide Functional Requirements

This section details functional requirements that apply across multiple features or define core system capabilities.

### 3.1. Authentication & User Management
*   **FR-SYS-AUTH-001:** The system must allow users to sign up using an email address and password.
    *   **Frontend Development Outline:**
        *   Utilize UI components from UIDG Part 2 (Sign-Up screen) and Part 10 (Form Elements).
        *   Implement client-side validation (email format, password strength) as per Component 10.8.
        *   Call `authService.ts` function for sign-up, passing email, password, and any other required profile info (e.g., full name).
        *   Handle loading states while request is in progress.
        *   Display success or error messages (Component 10.6 - Toasts/Snackbars or inline).
        *   On success, update global state (Zustand `userStore`) with user session and profile.
        *   Navigate to the next step in onboarding (e.g., Personality Assessment).
    *   **Backend/Serverless Development Outline:**
        *   **Supabase Auth:** Directly handles `signUp()` request. Creates user in `auth.users` table.
        *   **Supabase Database (Trigger/Function):** A PostgreSQL trigger on `auth.users` table (on insert) calls a database function to create a corresponding entry in the `public.profiles` table, populating `id` (from `auth.uid()`) and `email`, `full_name` (from `raw_user_meta_data` if provided in options during sign-up). (Dev Guide 3.2).
        *   **(Optional) PicaOS/Nodely:** If a post-signup welcome flow is complex (e.g., sending a series of emails, setting up other services), the Supabase Function above might send an event to PicaOS (or a Nodely workflow) to orchestrate these steps.
    *   **Key Technical Considerations/Challenges:**
        *   Secure password handling (Supabase Auth manages this).
        *   Ensuring reliable profile creation in `public.profiles` immediately after `auth.users` creation.
        *   Clear error messaging for existing email addresses or weak passwords.
        *   Potential Upstash Redis caching for new user profile if fetched immediately after sign-up for quick app personalization.
*   **FR-SYS-AUTH-002:** The system must allow existing users to log in using their email and password.
    *   **Frontend Development Outline:**
        *   Login screen UI (UIDG 2.2, Component 10.8) with `<TextInput>` for email/password.
        *   Call `authService.ts` function for `signInWithPassword`.
        *   Handle loading/error states (Toasts - Component 10.6).
        *   On success, update Zustand `userStore`, fetch profile (potentially from Upstash Redis cache first, then Supabase via PicaOS/Edge Function), and navigate to Main Dashboard.
    *   **Backend/Serverless Development Outline:**
        *   **Supabase Auth:** Handles `signInWithPassword()` directly, validates credentials, issues JWT.
        *   **(Optional) PicaOS/Edge Function for Profile Caching:** If profile data is cached in Upstash Redis, this function would be called by the app post-login to get profile data quickly.
    *   **Key Technical Considerations/Challenges:**
        *   Secure password handling (Supabase).
        *   Error messaging for incorrect credentials.
        *   Session management (Supabase JS client).
*   **FR-SYS-AUTH-003:** The system must support social logins (e.g., Google, Apple).
    *   **Frontend Development Outline:**
        *   UI buttons for social providers on Login/Sign-Up screens (UIDG 2.2).
        *   Use `expo-auth-session` for generic OAuth providers (Google) or `expo-apple-authentication` for Apple Sign-In.
        *   Retrieve ID token from the provider.
        *   Call `supabase.auth.signInWithIdToken()` or `supabase.auth.signInWithOAuth()` via `authService.ts`.
        *   Handle callback URLs and errors.
        *   On success, update `userStore` and navigate.
    *   **Backend/Serverless Development Outline:**
        *   **Supabase Auth:** Handles OAuth flow and token validation with configured providers. Creates user in `auth.users` if they don't exist. Trigger creates profile in `public.profiles`.
        *   **(Optional) Dappier/PicaOS:** If using DIDs, PicaOS might orchestrate linking the social login to a Dappier-managed DID.
    *   **Key Technical Considerations/Challenges:**
        *   Correct configuration of OAuth providers in Supabase and Expo app (bundle IDs, redirect URIs).
        *   Handling different social provider responses and error codes.
        *   Linking social accounts to existing email/password accounts if necessary (Supabase supports this).
*   **FR-SYS-AUTH-004:** The system must provide a secure password reset mechanism for users who have forgotten their password.
    *   **Frontend Development Outline:**
        *   "Forgot Password" screen with `<TextInput>` for email (UIDG 2.2).
        *   Call `authService.ts` function which uses `supabase.auth.resetPasswordForEmail()`.
        *   Display confirmation/error messages.
        *   Handle incoming deep link for password reset (e.g., `understandmeapp://reset-password?token=...`).
        *   New password input screen with validation (Component 10.8). Call `supabase.auth.updateUser()` with the new password.
    *   **Backend/Serverless Development Outline:**
        *   **Supabase Auth:** Handles sending password reset email (template configurable in Supabase dashboard) and verifying reset tokens.
    *   **Key Technical Considerations/Challenges:**
        *   Secure token handling for password reset.
        *   Deep linking setup for a seamless user experience back into the app.
*   **FR-SYS-AUTH-005:** Upon first sign-up, the system must create a user profile and link it to their authentication credentials.
    *   **Frontend Development Outline:** Mostly handled by backend; client may fetch profile data after sign-up confirmation to populate `userStore`.
    *   **Backend/Serverless Development Outline:**
        *   **Supabase Database (Trigger/Function):** As detailed in FR-SYS-AUTH-001, a PostgreSQL trigger on `auth.users` (on insert) calls a database function. This function reads `NEW.id` (user_id), `NEW.email`, `NEW.raw_user_meta_data ->> 'full_name'` and inserts these into `public.profiles`.
    *   **Key Technical Considerations/Challenges:**
        *   Ensuring the trigger and function are robust and handle potential errors during profile creation.
        *   Atomicity (user creation and profile creation should succeed or fail together; Supabase triggers operate within the same transaction).
*   **FR-SYS-AUTH-006:** The system must manage user sessions securely, maintaining login state across app uses until explicit logout or session expiry.
    *   **Frontend Development Outline:**
        *   Supabase JS client handles secure storage of JWTs in `AsyncStorage` (React Native).
        *   On app start, `authService.ts` calls `supabase.auth.getSession()` to check for an active session.
        *   `supabase.auth.onAuthStateChange` listener updates `userStore` and navigates user appropriately.
        *   Implement logout functionality (`supabase.auth.signOut()`).
    *   **Backend/Serverless Development Outline:**
        *   **Supabase Auth:** Manages JWT issuance, expiry, and refresh tokens.
    *   **Key Technical Considerations/Challenges:**
        *   Handling token refresh scenarios gracefully.
        *   Secure storage on device (handled by Supabase client).
        *   Clearing all user-related state and cache on logout.
*   **FR-SYS-AUTH-007:** The system must allow users to update their basic profile information (e.g., full name, avatar).
    *   **Frontend Development Outline:**
        *   Profile editing screen (UIDG - likely Part of Settings) with form elements (Component 10.8).
        *   Uses `expo-image-picker` for avatar selection (Component 10.3).
        *   Uploads new avatar to Supabase Storage (Component 10.3), gets URL.
        *   Submits updated profile data (name, new avatar URL) to Supabase via `profileService.ts`.
    *   **Backend/Serverless Development Outline:**
        *   **Supabase DB (`profiles` table):** Handles `UPDATE` operation. RLS policies ensure users can only update their own profile (Dev Guide 3.2).
        *   **Supabase Storage:** Stores avatar images.
    *   **Key Technical Considerations/Challenges:**
        *   Image upload process (size limits, formats, progress).
        *   Deleting old avatar from storage if a new one is uploaded.
        *   Refreshing profile data in the app and potentially in Upstash Redis cache after update.
*   **FR-SYS-AUTH-008:** The system must allow users to manage their privacy and notification preferences.
    *   **Frontend Development Outline:**
        *   Settings screens (UIDG - likely Part of Settings) for privacy (UIDG 5.5) and notifications.
        *   Uses `<Switch>` components, Pickers, etc. (Component 10.8).
        *   Saves preferences to Supabase `profiles` table or a dedicated `user_preferences` table via `profileService.ts` or `settingsService.ts`.
    *   **Backend/Serverless Development Outline:**
        *   **Supabase DB:** Stores these preferences. RLS ensures users manage only their own.
        *   **PicaOS/Edge Functions:** Must read and respect these preferences when processing data or sending notifications.
    *   **Key Technical Considerations/Challenges:**
        *   Ensuring all relevant backend processes (PicaOS, notification dispatchers) correctly access and honor these user preferences.
*   **FR-SYS-AUTH-009:** (Optional, if Dappier DID is used) The system may allow users to link or authenticate via a Decentralized Identifier.
    *   **Frontend Development Outline:**
        *   UI elements for Dappier-based login/linking on Sign-Up/Login screens.
        *   Interaction with Dappier SDK or web flow for DID authentication.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Orchestrates the DID authentication flow with Dappier.
        *   **Dappier:** Provides DID services.
        *   **Supabase Auth/DB:** Stores the link between the Supabase user ID and the user's DID.
    *   **Key Technical Considerations/Challenges:**
        *   Complexity of DID integration and user experience.
        *   Securely managing DID-related data.

### 3.2. AI Agent 'Alex's' Core Functional Capabilities
*   **FR-SYS-ALEX-001:** Alex must be able to provide real-time transcription of spoken user input during sessions.
    *   **Frontend Development Outline:**
        *   Uses `expo-av` (Component 10.1) to capture audio chunks.
        *   Streams audio data (or references if large chunks are pre-uploaded to a temporary PicaOS endpoint) to PicaOS via WebSocket or resumable HTTP uploads for low latency.
        *   Receives transcript segments from PicaOS (via Supabase Realtime or WebSocket).
        *   Appends transcript segments to the live transcript UI (UIDG 7.1.C).
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Receives audio. Forwards to Google GenAI STT API (streaming if possible).
        *   **Google GenAI STT:** Performs speech-to-text.
        *   **PicaOS:** Receives transcript segments. Inserts them into `session_messages` table in Supabase (which then broadcasts via Realtime).
    *   **Key Technical Considerations/Challenges:**
        *   Minimizing latency for real-time feel (audio capture -> PicaOS -> STT -> PicaOS -> Supabase -> Realtime -> UI).
        *   Handling network interruptions during audio streaming or transcript delivery.
        *   Accuracy of STT, especially with multiple speakers or background noise (PicaOS might apply noise reduction filters via a library or PicaOS itself if it has such capabilities).
        *   Cost of streaming STT services.
*   **FR-SYS-ALEX-002:** Alex must be able to synthesize text scripts into natural-sounding voice output.
    *   **Frontend Development Outline:**
        *   Receives Alex's text script and audio URL/data from PicaOS.
        *   Displays text in Alex's chat bubble (Component 10.2).
        *   Plays audio using `expo-av` (Component 10.2), managing playback states (play, pause, stop, loading).
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Sends text script (generated by Google GenAI) to ElevenLabs API.
        *   **ElevenLabs:** Synthesizes speech, returns audio stream/file.
        *   **PicaOS:** Provides audio URL (e.g., from temporary Supabase Storage if PicaOS caches it there) or streams audio data to Expo app. May cache common phrases/audio in Upstash Redis (Dev Guide 4.5, TPKB 5.1).
    *   **Key Technical Considerations/Challenges:**
        *   TTS latency; PicaOS might pre-fetch/cache audio for anticipated common phrases.
        *   Cost of ElevenLabs API calls.
        *   Ensuring high-quality, natural voice output that aligns with Alex's persona.
        *   Buffering and smooth playback of audio in the Expo app.
*   **FR-SYS-ALEX-003:** Alex's voice output must support configurable emotional nuances based on context (as orchestrated by PicaOS).
    *   **Frontend Development Outline:** No direct frontend change beyond playing the audio received. The "emotion" is embedded in the audio by the backend.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Determines desired emotion based on context (from GenAI LLM analysis of session state or specific instruction in Alex's script).
        *   Modifies request to ElevenLabs API by adjusting `voice_settings` (stability, similarity, style) or selecting different pre-configured voice IDs for Alex if available (TPKB 5.1, Dev Guide 5.1). PicaOS might maintain a mapping of emotional states to preferred ElevenLabs settings.
    *   **Key Technical Considerations/Challenges:**
        *   Mapping abstract emotional states (e.g., empathetic, assertive) to concrete ElevenLabs API parameters effectively.
        *   Avoiding uncanny valley or inappropriate emotional expressions by Alex.
        *   Increased complexity in PicaOS logic to determine and apply appropriate emotional styling to TTS requests.
*   **FR-SYS-ALEX-004:** Alex must be able to guide users through pre-defined conversational flows (e.g., Personality Assessment, Session Phases).
    *   **Frontend Development Outline:**
        *   Displays Alex's prompts (text/voice) received from PicaOS.
        *   Provides UI for user responses (text input, voice input via Component 10.1, selection buttons - Component 10.8).
        *   Sends user responses to PicaOS.
        *   Updates UI (e.g., next question, phase change indication) based on PicaOS directives.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Manages state of the conversational flow (e.g., current question ID, current session phase, user progress through a flow). This state could be cached in Upstash Redis for multi-turn flows.
        *   Uses Google GenAI (LLM) with flow logic/scripts (potentially stored in Supabase or PicaOS config) to determine the next prompt/action based on user response and current state.
    *   **Key Technical Considerations/Challenges:**
        *   Designing robust and flexible conversational flow definitions (e.g., state machines, decision trees for PicaOS to execute).
        *   Managing flow state effectively in PicaOS, especially for multi-user sessions.
        *   Handling unexpected user inputs or attempts to deviate from the defined flow.
*   **FR-SYS-ALEX-005:** Alex (via PicaOS) must be able to analyze textual and multimedia input (provided by users or retrieved via Dappier RAG) to identify themes, sentiments, and key points.
    *   **(Already detailed in previous turn - FR-SYS-ALEX-005)**
*   **FR-SYS-ALEX-006:** Alex must be able to generate summaries of discussions, sessions, and user inputs.
    *   **Frontend Development Outline:**
        *   Expo app requests a summary from PicaOS for a given context (e.g., end of session, specific part of discussion, pre-session input synthesis).
        *   Displays the AI-generated summary text (potentially formatted with markdown or simple HTML via `react-native-render-html` or custom text styling).
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Receives summary request. Gathers relevant text/transcripts from Supabase (`session_messages`, `sessions.description_context`, `session_participants.perspective_text`) or ongoing session context (potentially from Upstash Redis cache).
        *   Constructs prompt for Google GenAI (LLM) to generate a summary of specified length/focus (e.g., "Summarize the key points from participant A's expression phase," "Generate a concise overall session summary including decisions and action items").
        *   (Optional) Caches generated summary in Upstash Redis if the source text is unlikely to change and summary is frequently requested (e.g., pre-session synthesis for host).
        *   Returns summary text to Expo app. Stores it in Supabase if it's a formal session summary (e.g., `sessions.generated_summary_json`).
    *   **Key Technical Considerations/Challenges:**
        *   Effective prompt engineering for different types of summaries.
        *   Managing context window for GenAI if summarizing long discussions (PicaOS might need to do chunking and iterative summarization).
        *   Latency for summary generation. PicaOS may do this asynchronously for long summaries and notify app upon completion via Supabase Realtime or polling.
*   **FR-SYS-ALEX-007:** Alex must be able to suggest session goals, rules, and discussion points based on initial context.
    *   **Frontend Development Outline:**
        *   On relevant screens (e.g., Configure Session Type - UIDG 4.3, Establish Goals & Rules - UIDG 6.2), Expo app requests suggestions from PicaOS.
        *   Displays suggestions as editable lists (`<FlatList>` with `<TextInput>`).
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Receives request with session context (e.g., conflict description analysis from Screen 4.2, selected session type).
        *   Queries Google GenAI (LLM) with a prompt to suggest relevant goals, rules, or discussion points based on the input and session type. Could also pull from a predefined template library in Supabase and have GenAI customize them.
        *   Returns a list of suggestions to Expo app.
    *   **Key Technical Considerations/Challenges:**
        *   Quality and relevance of AI-suggested items.
        *   Allowing easy user modification and addition to suggestions.
        *   Balancing AI suggestions with predefined templates.
*   **FR-SYS-ALEX-008:** Alex must be able to manage speaking turns and enforce time limits during structured session phases.
    *   **Frontend Development Outline:**
        *   Expo app UI visually indicates current speaker, next speaker, and time remaining (UIDG 7.1, 7.3), based on data from PicaOS (via `sessionStore` updated by Realtime/API calls).
        *   Handles tap-to-talk for same-device mode (Component 10.4).
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Maintains speaking order (e.g., in a list in its session state, potentially backed by Upstash Redis) and timers.
        *   Sends signals/updates to Expo app (via Supabase Realtime or direct API response) to update UI for turn changes.
        *   If time limits are breached for a speaker, or if interruptions occur (detected by analyzing incoming `session_messages` for multiple speakers in short succession), PicaOS scripts Alex to provide a polite intervention (text/voice).
    *   **Key Technical Considerations/Challenges:**
        *   Accurate synchronization of timers and turn state across clients and PicaOS, especially with potential network latencies.
        *   Fairness in turn allocation and graceful handling of speaker transitions.
        *   Reliable detection of interruptions for intervention.
*   **FR-SYS-ALEX-009:** Alex must be able to provide personalized growth insights and recommend learning resources based on user interaction history.
    *   **Frontend Development Outline:**
        *   Growth Hub screens (UIDG Part 9) display insights, badges, resources fetched from PicaOS/Supabase.
        *   Uses charts (`react-native-svg-charts`), lists (`<FlatList>`), styled cards (`<View>`).
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS or Supabase Edge Function (Scheduled or Triggered post-session):**
            *   Analyzes user data from `session_messages`, `growth_insights`, `profiles` (with consent) using Google GenAI (LLM) to identify communication patterns (clarity, sentiment, filler words, etc.) and generate new insights/recommendations.
            *   (Optional) Dappier could provide anonymized benchmark data for comparison if users opt-in to share data in such a way, which PicaOS would factor into insights.
        *   Stores these in `growth_insights` table and potentially a `recommended_resources_for_user` table in Supabase.
        *   Upstash Redis can cache frequently accessed insights or resource lists for a user.
    *   **Key Technical Considerations/Challenges:**
        *   Ensuring user privacy and explicit consent for data analysis for growth features.
        *   Quality, actionability, and positive framing of AI-generated insights.
        *   Scalability of batch analysis processes if done periodically for many users.
        *   Personalization of resource recommendations.
*   **FR-SYS-ALEX-010:** Alex must be able to identify and suggest proactive conflict prevention strategies based on observed patterns.
    *   **Frontend Development Outline:**
        *   Displays conflict prevention insights in Growth Hub (UIDG 9.4) as `<Text>` in styled `<View>` cards.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS or Supabase Edge Function (Scheduled/Triggered):** Similar to FR-SYS-ALEX-009, but focuses on identifying recurring negative communication patterns from a user's past sessions (or across anonymized sessions if Dappier is involved and consent given).
        *   Uses Google GenAI (LLM) to suggest preventative strategies based on these patterns.
        *   Stores insights in a dedicated table or as a specific type in `growth_insights` in Supabase.
    *   **Key Technical Considerations/Challenges:**
        *   Ethical considerations of identifying "negative" patterns and ensuring advice is constructive and not discouraging.
        *   Accuracy in identifying patterns that genuinely lead to conflict.
        *   Potential for insights to be based on complex, multi-session analysis (PicaOS orchestration).
*   **FR-SYS-ALEX-011:** Alex must offer contextual help and explanations about application features and processes.
    *   **Frontend Development Outline:**
        *   Help icons (`<TouchableOpacity>` with `<Image>`) or "Ask Alex" buttons throughout the app.
        *   Opens a chat modal (Component 10.7) with Alex or an informational display area.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Receives help request with context (e.g., current screen name, feature in question) from Expo app.
        *   Uses Google GenAI (LLM), possibly with RAG via Dappier on a knowledge base of app documentation (UIDG, Dev Guide, TPKB), to generate helpful explanations.
        *   (Optional) Upstash Redis caches answers to common help questions, keyed by context/query.
    *   **Key Technical Considerations/Challenges:**
        *   Maintaining an up-to-date knowledge base for RAG if used.
        *   Ensuring Alex's help is genuinely useful, concise for mobile, and context-aware.
        *   Handling cases where Alex cannot find a relevant answer.

### 3.3. Multimedia Handling
*   **FR-SYS-MM-001:** The system must allow users (Hosts and Participants where appropriate) to upload multimedia files (defined types: PDF, DOCX, JPG, PNG, MP3, MP4) as contextual material.
    *   **Frontend Development Outline:**
        *   Uses `expo-document-picker` for documents and `expo-image-picker` for images/videos (Component 10.3).
        *   Handles file selection, displays previews locally if possible (e.g., `<Image>` for selected images).
        *   Uploads file directly to Supabase Storage using the Supabase JS client (Dev Guide 3.5).
        *   Manages and displays upload progress (`<ActivityIndicator>` or custom progress bar - Component 10.3).
    *   **Backend/Serverless Development Outline:**
        *   **Supabase Storage:** Securely stores the files. Bucket policies and RLS on `session_files` table control access.
    *   **Key Technical Considerations/Challenges:**
        *   Maximum file size limits defined by Supabase Storage and client-side checks.
        *   Supported file types enforced client-side and potentially server-side (e.g., via Edge Function on storage event).
        *   Secure and resumable upload process, especially for larger files on mobile networks.
        *   Network error handling during upload.
*   **FR-SYS-MM-002:** Uploaded multimedia files must be securely stored (Supabase Storage).
    *   **Frontend Development Outline:** Not directly involved in storage security beyond authenticating the user for upload via Supabase client.
    *   **Backend/Serverless Development Outline:**
        *   **Supabase Storage:** Provides secure, S3-backed storage. Access controlled by PostgreSQL functions in bucket policies and RLS on associated metadata tables (e.g., `session_files`).
    *   **Key Technical Considerations/Challenges:**
        *   Correct and robust configuration of Supabase Storage bucket policies and RLS on `session_files`.
        *   Regularly review access policies.
*   **FR-SYS-MM-003:** The system must allow relevant users to view or play back uploaded multimedia files within the app (e.g., PDF preview, image display, audio/video playback using `expo-av`).
    *   **Frontend Development Outline:**
        *   For images: Use React Native `<Image>` component with a public or signed URL from Supabase Storage.
        *   For PDFs: Use a library like `react-native-pdf` or `WebView` with the file URL.
        *   For audio/video: Use `expo-av` `Audio.Sound` or `Video` component (Component 10.3).
        *   File access URLs obtained from `session_files` table (which might contain Supabase Storage paths or IPFS CIDs if Nodely is used). If IPFS, construct gateway URL.
    *   **Backend/Serverless Development Outline:**
        *   **Supabase Storage:** Provides public or signed URLs for file access.
        *   **(Optional) Nodely:** If file is on IPFS, provides gateway URL or client retrieves via CID.
    *   **Key Technical Considerations/Challenges:**
        *   Handling various file types and providing appropriate native viewers/players.
        *   Performance for streaming/displaying large files.
        *   Secure URL generation and expiry if using signed URLs from Supabase for private files.
        *   Caching media files on device using `expo-file-system` for offline access or performance.
*   **FR-SYS-MM-004:** The AI (via PicaOS/Google GenAI) must be able to process the content of uploaded multimedia files (text extraction from docs, STT for audio/video, image analysis) for contextual understanding.
    *   **Frontend Development Outline:** Responsible for uploading the file (FR-SYS-MM-001) and providing its reference (storage path or IPFS CID) to PicaOS when requesting analysis.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Receives file reference. Downloads file content from Supabase Storage (or Nodely/IPFS).
        *   Dispatches content to appropriate Google GenAI model:
            *   Text from PDFs/DOCX (using utility like `pdf-parse` or a GenAI model capable of document ingestion) -> LLM.
            *   Images -> Vision API.
            *   Audio/Video -> STT API (transcript then to LLM if needed for further understanding).
        *   Stores analysis results (e.g., summaries, key points, descriptions) in Supabase (`session_files.ai_analysis_snippet` or similar).
    *   **Key Technical Considerations/Challenges:**
        *   PicaOS managing different processing pipelines for different MIME types.
        *   Cost and latency of AI analysis for various media types.
        *   Error handling for unsupported file contents or AI analysis failures.
        *   Security of handling file content in PicaOS and during transit to GenAI.
*   **FR-SYS-MM-005:** (Optional, if Nodely IPFS is used) The system must allow for designated files (e.g., final session summaries) to be pinned to IPFS for decentralized, immutable storage, and be retrievable via an IPFS gateway.
    *   **Frontend Development Outline:**
        *   UI for host to designate a file for IPFS pinning (e.g., a button on a finalized summary screen).
        *   When displaying IPFS files, construct URL using `ipfs_cid` and configured Nodely/public gateway.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS or Supabase Edge Function:** Receives request to pin a file.
        *   Retrieves file from Supabase Storage.
        *   Interacts with Nodely API/SDK to pin the file to IPFS (Dev Guide 3.5, TPKB 5.3).
        *   Stores returned IPFS CID in Supabase (`session_files.ipfs_cid` or `sessions.final_summary_ipfs_cid`).
    *   **Key Technical Considerations/Challenges:**
        *   Security of Nodely API key.
        *   Cost of IPFS pinning/storage via Nodely.
        *   Ensuring successful pinning and CID retrieval; handling failures.
        *   User understanding of IPFS implications (permanence, public accessibility if not client-side encrypted before upload).
*   **FR-SYS-MM-006:** The system must clearly indicate file upload progress and handle upload errors gracefully.
    *   **Frontend Development Outline:**
        *   Use Supabase client's upload progress events or `expo-file-system` progress events if chunking uploads.
        *   Display `<ActivityIndicator>` or custom progress bar UI (Component 10.3).
        *   Show clear error messages (Toasts - Component 10.6) for failed uploads (e.g., network error, file too large, type not supported).
    *   **Backend/Serverless Development Outline:** Not directly involved in client-side progress indication but ensures robust upload endpoints in Supabase Storage and clear error responses from PicaOS if it proxies uploads.
    *   **Key Technical Considerations/Challenges:**
        *   Handling large file uploads and potential network interruptions reliably on mobile.
        *   Providing accurate and user-friendly progress feedback.
        *   Implementing resumable uploads if feasible for very large files.

### 3.4. Real-time Interactions
*   **FR-SYS-RT-001:** The system must provide real-time transcription display to all relevant participants during an active session.
    *   **Frontend Development Outline:**
        *   Subscribes to Supabase Realtime channel for `session_messages` filtered by the current `session_id` (Dev Guide 3.4).
        *   Optimized `<FlatList>` to render incoming transcript messages efficiently (UIDG 7.1.C).
        *   Manages local state to append new messages and handle scrolling.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** After STT (via Google GenAI or ElevenLabs), PicaOS (or an Edge Function called by PicaOS) inserts transcript segments into the `session_messages` table in Supabase.
        *   **Supabase Realtime:** Broadcasts these new row inserts to all subscribed clients on the specific session channel.
    *   **Key Technical Considerations/Challenges:**
        *   Minimizing end-to-end latency (speech -> STT -> PicaOS -> DB -> Realtime -> UI). Target <500ms for good experience.
        *   Handling message ordering and potential out-of-order delivery or duplicates if network conditions are poor (though Supabase Realtime aims for consistency). Timestamps are crucial.
        *   Scalability of Supabase Realtime connections for many concurrent sessions and users. (Supabase handles this scaling).
        *   Efficiently rendering updates in the `<FlatList>` to prevent UI jank.
*   **FR-SYS-RT-002:** The system must update the UI of all participants in real-time when new messages (user or Alex) are added to the session.
    *   **(Largely covered by FR-SYS-RT-001 logic, as Alex's messages are also stored in `session_messages` and broadcast via Supabase Realtime).**
    *   **Frontend Development Outline:** Differentiate styling for user messages vs. Alex messages in the `<FlatList>`.
    *   **Backend/Serverless Development Outline:** PicaOS ensures Alex's messages (text and voice URL) are inserted into `session_messages` with proper speaker attribution ("Alex").
*   **FR-SYS-RT-003:** The system must reflect changes in participant invitation status (accepted, declined) in real-time for the Host.
    *   **Frontend Development Outline:**
        *   Host's "Track Invitation Status" screen (UIDG 4.5) subscribes to Supabase Realtime changes on the `session_participants` table, filtered by the relevant `session_id`.
        *   Updates local list/UI (e.g., participant card style or status icon) when `invitation_status` changes for any participant.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS or Supabase Edge Function:** Updates the `session_participants.invitation_status` in the Supabase DB when a participant accepts or declines an invitation (see FR-FLOW-PPJ-004).
        *   **Supabase Realtime:** Broadcasts these row changes to subscribed hosts.
    *   **Key Technical Considerations/Challenges:**
        *   Ensuring RLS policies for Realtime subscriptions are correctly configured so hosts only receive updates for participants in *their* sessions.
*   **FR-SYS-RT-004:** The system must provide real-time updates for collaborative features if any are introduced (e.g., shared notes, polls).
    *   **Frontend Development Outline:**
        *   Similar Realtime subscription pattern for the relevant data table (e.g., `session_polls`, `shared_notes`) filtered by `session_id`.
        *   UI components for these features update based on received Realtime events (new poll, vote cast, note edited).
    *   **Backend/Serverless Development Outline:**
        *   Backend logic (PicaOS or Edge Function) inserts/updates data in the collaborative feature's table.
        *   **Supabase Realtime:** Broadcasts these changes.
    *   **Key Technical Considerations/Challenges:**
        *   Designing appropriate data models and RLS for new collaborative features.
        *   Handling potential conflicts if multiple users attempt to edit the same collaborative data simultaneously (e.g., using CRDTs or optimistic locking if necessary, though likely overkill for simple polls/notes). Supabase's row-level updates can help.
*   **FR-SYS-RT-005:** (Optional, if Dappier is used) The system may consume real-time data feeds from Dappier to inform PicaOS/Alex during a session.
    *   **Frontend Development Outline:** UI elements might be updated if Alex's behavior or presented information changes due to Dappier feeds. The app receives such updates via PicaOS through Supabase Realtime or direct PicaOS messages.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:** Subscribes to Dappier real-time APIs (e.g., WebSockets, Server-Sent Events).
        *   Processes incoming Dappier events. Updates its internal session context (potentially cached in Upstash Redis).
        *   If the Dappier event necessitates an AI intervention or information for users, PicaOS triggers Alex (via Google GenAI for script, then ElevenLabs for voice) or sends a data update to the Expo app via Supabase Realtime.
    *   **Key Technical Considerations/Challenges:**
        *   Reliability, security, and latency of Dappier data streams.
        *   PicaOS logic to filter, interpret, and act upon Dappier events meaningfully within the session context.
        *   Mapping Dappier events to relevant session participants or contexts.

### 3.5. Notifications
*   **FR-SYS-NOTIF-001:** The system must send notifications to users for key events (e.g., session invitations, reminders for scheduled sessions, summary ready for review, participant responses).
    *   **Frontend Development Outline:**
        *   Expo app requests push notification permission using `expo-notifications` during onboarding or when relevant features are accessed.
        *   Sends the obtained Expo Push Token to the backend (e.g., PicaOS or a Supabase Edge Function) to be stored with the user's `profiles` record.
        *   Displays in-app notifications (Toasts/Modals - Component 10.6) when app is in foreground.
        *   Handles incoming push notifications when app is in background/killed (e.g., navigate to specific screen - UIDG for deep linking).
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS or Supabase Edge Functions (triggered by DB events, PicaOS logic, or direct API calls):**
            *   Identifies target users for the notification.
            *   Retrieves user notification preferences and push tokens from `profiles` table.
            *   Constructs notification payload (title, body, data for deep linking).
            *   **For Push Notifications:** Uses `expo-server-sdk-node` (if backend is Node.js like PicaOS/Nodely) or makes HTTPS requests to Expo's push API to send notifications, using stored Expo Push Tokens.
            *   **For Email Notifications:** Uses Supabase Auth's built-in email sending capabilities (for auth-related emails like password reset, email verification) or integrates with a third-party email service (e.g., SendGrid, AWS SES) via an Edge Function or Nodely workflow for other types of email notifications.
            *   **For In-App (Realtime-based):** Inserts a record into a user-specific `notifications` table in Supabase, which the client app subscribes to via Supabase Realtime for live updates.
    *   **Key Technical Considerations/Challenges:**
        *   Managing user push tokens securely and handling expired/invalid tokens.
        *   Handling different notification channels (push, email, in-app) and user preferences for each.
        *   Ensuring reliable delivery of critical notifications.
        *   Implementing robust deep linking from push/email notifications into the correct screen/context within the Expo app.
        *   Rate limiting for sending notifications to avoid spamming.
        *   Localization of notification content.
*   **FR-SYS-NOTIF-002:** Notifications must be deliverable via multiple channels (in-app alerts/badges, push notifications via `expo-notifications`, email).
    *   **(Largely covered by FR-SYS-NOTIF-001 development outlines).**
    *   **Frontend Development Outline (Badges):** UI components (e.g., on a Bell icon or Tab icon) display a count based on unread notifications fetched from the `notifications` table or a summary field in the `profiles` table.
    *   **Backend/Serverless Development Outline (Badges):** When a new notification relevant for a badge is created, update the unread count for the user in Supabase.
*   **FR-SYS-NOTIF-003:** Users must be able to configure their notification preferences.
    *   **Frontend Development Outline:**
        *   Settings screen (UIDG) with `<Switch>` components or Pickers for different notification types/events (e.g., "New Session Invite: Email [Y/N], Push [Y/N]").
        *   Saves preferences to `profiles` table or a dedicated `user_notification_preferences` table in Supabase via `profileService.ts` or PicaOS.
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS/Edge Functions:** Must check user's notification preferences from Supabase DB before attempting to send any notification via any channel.
        *   **Supabase DB:** Stores notification preferences.
    *   **Key Technical Considerations/Challenges:**
        *   Designing a granular yet user-friendly set of notification preferences.
        *   Ensuring all notification-triggering logic across the backend correctly accesses and respects these preferences.
*   **FR-SYS-NOTIF-004:** In-app notifications (Toasts/Snackbars) must be used for transient, non-critical feedback.
    *   **Frontend Development Outline:**
        *   Implement a global Toast/Snackbar component (Component 10.6), possibly using a library like `react-native-toast-message`. This component can be triggered via a context API or global state (Zustand).
        *   Triggered by various client-side app events (e.g., successful save, minor error, information tip from Alex).
    *   **Backend/Serverless Development Outline:** Not directly involved in triggering client-side Toasts unless via a Supabase Realtime message that the client specifically interprets as a command to show a Toast (less common for transient feedback).
    *   **Key Technical Considerations/Challenges:**
        *   Timing, duration, and frequency of Toasts to avoid overwhelming or annoying the user.
        *   Ensuring Toasts are accessible (e.g., screen readers announce them).
        *   Consistent styling and positioning of Toasts.
*   **FR-SYS-NOTIF-005:** Modal alerts must be used for critical information requiring immediate user attention.
    *   **Frontend Development Outline:**
        *   Implement a global Modal alert component (Component 10.7) or use React Native's built-in `Alert` API for simple native alerts.
        *   Triggered for critical events (e.g., session start reminder if app is open, permission requests that block functionality, critical errors requiring user action).
    *   **Backend/Serverless Development Outline:** Backend might send a specific Realtime message type or API response that the client interprets as a critical alert requiring a Modal display. PicaOS might script Alex to instruct the user about the modal's content.
    *   **Key Technical Considerations/Challenges:**
        *   Ensuring modals are used sparingly and only for truly critical information that requires immediate user focus and action.
        *   Accessibility of modals (focus trapping, screen reader announcements, keyboard (if applicable) navigation).
        *   Clear action buttons (e.g., "OK," "Cancel," "Join Now") within the modal.

## 4. User Flow Functional Requirements (Mapped to Mermaid Diagram)

This section details functional requirements associated with specific user flows, referencing the UI Development Guide (UIDG) for screen details and the Mermaid diagram for flow context.

### 4.1. Onboarding Process (UIDG Part 2; Mermaid A, B, E, F)
*   **FR-FLOW-OB-001 (Welcome/Landing - UIDG 2.1):** The system must display a welcome screen with options to "Get Started" (Sign Up) or "Login."
    *   ### Frontend Development Outline
        *   Implement the Welcome screen as per UIDG 2.1.
        *   Use React Native components (`<View>`, `<Text>`, `<TouchableOpacity>`, `<Image>`) for layout, branding, and buttons.
        *   Style elements using StyleSheet or NativeWind, adhering to global styles defined in UIDG Part 1.
        *   Navigation:
            *   "Get Started" button navigates to the Sign-Up screen (UIDG 2.2).
            *   "Login" button navigates to the Login screen (UIDG 2.2).
        *   Ensure screen is responsive and adapts to different device sizes and orientations as per UIDG 1.7.
    *   ### Backend/Serverless Development Outline
        *   No direct backend interaction is required for displaying the static Welcome/Landing screen.
        *   (Optional) PicaOS/Supabase Edge Function could be called if there's a need to fetch dynamic configuration (e.g., A/B testing different welcome messages, though unlikely for this screen).
    *   ### Key Technical Considerations/Challenges
        *   **Initial Load Performance:** Optimize image assets and component rendering for fast initial display, as this is the first screen users see.
        *   **Clarity of Options:** Ensure "Get Started" and "Login" are clearly distinct and guide users appropriately.
        *   **Accessibility:** Ensure buttons and text are accessible (WCAG 2.1 AA, UIDG 1.6), with proper labels and touch target sizes.
*   **FR-FLOW-OB-002 (Sign-Up - UIDG 2.2):** The system must allow a new user to create an account using email/password or social providers (fulfills FR-SYS-AUTH-001, FR-SYS-AUTH-003).
    *   ### Frontend Development Outline
        *   Implement the Sign-Up screen UI as per UIDG 2.2, using form elements from Component 10.8 (e.g., `<TextInput>` for email, password, name).
        *   Include buttons for social sign-up (Google, Apple) as per Component 10.8.
        *   Client-side validation for input fields (email format, password strength, required fields).
        *   On form submission (email/password):
            *   Call `authService.signUp(email, password, name)` which internally calls `supabase.auth.signUp()` (Ref: FR-SYS-AUTH-001).
            *   Provide options for profile data like `full_name` to be stored in `raw_user_meta_data`.
        *   For social sign-up:
            *   Trigger OAuth flow using `expo-auth-session` or `expo-apple-authentication` (Ref: FR-SYS-AUTH-003).
            *   Call `authService.signInWithSocialProvider(provider, token)` which internally calls `supabase.auth.signInWithOAuth()` or `supabase.auth.signInWithIdToken()`.
        *   Handle loading states (e.g., display `<ActivityIndicator>`).
        *   Display success/error messages using Toasts/Snackbars (Component 10.6) or inline messages.
        *   **Onboarding Context:** Upon successful sign-up and profile creation (confirmed by `authService` and `userStore` update):
            *   Navigate user to the Conversational Personality Assessment screen (UIDG 2.3).
            *   Update global state (e.g., Zustand `onboardingStore`) to track that sign-up is complete.
    *   ### Backend/Serverless Development Outline
        *   Core authentication and profile creation handled by Supabase Auth and DB triggers as detailed in FR-SYS-AUTH-001 and FR-SYS-AUTH-005.
        *   **Onboarding Context:**
            *   (Optional) A Supabase Edge Function or PicaOS workflow could be triggered post-profile creation specifically for new user onboarding. This might involve:
                *   Logging an "onboarding_started" event.
                *   Preparing initial state for the personality assessment if needed by PicaOS.
                *   Sending a welcome email via a service like SendGrid if not handled by Supabase's default auth emails (Developer Guide 5.x).
            *   Upstash Redis might be used by PicaOS to temporarily cache the new user's ID or basic profile if an immediate complex orchestration flow is initiated post-signup.
    *   ### Key Technical Considerations/Challenges
        *   **Reference System-Wide FRs:** Primary technical considerations are covered in FR-SYS-AUTH-001, FR-SYS-AUTH-003, FR-SYS-AUTH-005.
        *   **Seamless Transition:** Ensure a smooth and clear navigation flow from sign-up to the personality assessment.
        *   **Error Handling:** Provide user-friendly error messages for common issues like "email already exists" or weak password, specific to the sign-up context.
        *   **State Management:** Reliably update user and onboarding state (Zustand) to reflect successful sign-up and guide subsequent navigation.
        *   **Social Sign-Up Configuration:** Correct setup of OAuth credentials and callback URLs in Supabase and Expo app is critical.
*   **FR-FLOW-OB-003 (Login - UIDG 2.2):** The system must allow an existing user to log into their account (fulfills FR-SYS-AUTH-002, FR-SYS-AUTH-003).
    *   ### Frontend Development Outline
        *   Implement the Login screen UI as per UIDG 2.2, using form elements from Component 10.8.
        *   Include buttons for social login (Google, Apple).
        *   Client-side validation for input fields.
        *   On form submission (email/password):
            *   Call `authService.signInWithEmailPassword(email, password)` which internally calls `supabase.auth.signInWithPassword()` (Ref: FR-SYS-AUTH-002).
        *   For social login:
            *   Trigger OAuth flow (Ref: FR-SYS-AUTH-003).
            *   Call `authService.signInWithSocialProvider(provider, token)`.
        *   Handle loading states and display success/error messages.
        *   **Onboarding Context:** Upon successful login:
            *   Fetch user profile, including `onboarding_status` (custom field in `profiles` table, e.g., `{ assessment_complete: false, tutorial_skipped: true }`).
            *   If `onboarding_status` indicates pending steps (e.g., assessment not done and not skipped, tutorial not done and not skipped):
                *   Navigate to the relevant onboarding screen (e.g., UIDG 2.3 Personality Assessment or UIDG 2.4 Platform Tutorial).
            *   Else (onboarding is complete or explicitly skipped):
                *   Navigate to the Main Dashboard (UIDG 3.1).
    *   ### Backend/Serverless Development Outline
        *   Core authentication handled by Supabase Auth as detailed in FR-SYS-AUTH-002 and FR-SYS-AUTH-003.
        *   **Onboarding Context:**
            *   A Supabase Edge Function or PicaOS endpoint might be called by the client post-login to fetch/confirm the `onboarding_status` from the `profiles` table if this logic is not directly handled by `profileService.ts`. This function ensures the client has the latest status for routing.
            *   Upstash Redis could cache the `onboarding_status` for quick retrieval post-login.
    *   ### Key Technical Considerations/Challenges
        *   **Reference System-Wide FRs:** Primary technical considerations are covered in FR-SYS-AUTH-002, FR-SYS-AUTH-003.
        *   **Redirection Logic:** Implementing robust client-side logic to check `onboarding_status` and route users correctly (either to pending onboarding steps or the main app dashboard).
        *   **Profile Data for Onboarding Status:** Ensuring the `profiles` table in Supabase has a clear schema for `onboarding_status` (e.g., JSONB field like `{'assessment_status': 'pending/completed/skipped', 'tutorial_status': 'pending/completed/skipped'}`).
        *   **User Experience:** Avoid disorienting the user if they are redirected to an onboarding step after logging in. Clear messaging might be needed.
*   **FR-FLOW-OB-004 (Conversational Personality Assessment - UIDG 2.3):**
    *   **FR-FLOW-OB-004.1:** The system (Alex) must present a sequence of questions to new users in a conversational format.
        *   **Frontend Development Outline:**
            *   Expo app displays chat interface (UIDG 2.3, Component 10.2 for Alex's avatar/speech bubbles).
            *   Manages conversation history in local state (e.g., Zustand `assessmentStore`).
            *   On load or after user response, calls PicaOS `/assessment/next_step` endpoint.
            *   Displays Alex's question script and quick reply options (if any) received from PicaOS.
            *   Plays Alex's voice using `expo-av` (Component 10.2).
            *   Provides text input (`<TextInput>`) and voice input button (`<TouchableOpacity>` for Component 10.1).
        *   **Backend/Serverless Development Outline:**
            *   **PicaOS:**
                *   Receives current state (e.g., last question answered, conversation history) from Expo app.
                *   Uses Google GenAI (LLM) with a predefined question bank/logic to determine the next question and Alex's script. Prompt includes conversation history for contextual follow-ups.
                *   (Optional) Caches common question scripts or introductory phrases in Upstash Redis.
                *   Sends Alex's script to ElevenLabs for TTS.
                *   Returns `{ questionId, questionText, alexScript, alexVoiceUrl, options?, isComplete }` to Expo app.
            *   **Google GenAI:** Generates conversational flow and Alex's script based on PicaOS prompts.
            *   **ElevenLabs:** Provides TTS.
            *   **Supabase (`profiles` table):** User preferences derived from answers are stored here by PicaOS as the assessment progresses or at the end.
        *   **Key Technical Considerations/Challenges:**
            *   Designing engaging and effective question sequences (content for GenAI prompts).
            *   Managing conversation state between PicaOS and Expo app across multiple turns.
            *   Latency for GenAI response generation and ElevenLabs TTS. PicaOS might pre-fetch next likely questions/audio if flow is somewhat predictable.
            *   Handling user desire to go back or change previous answers (if allowed).
    *   **FR-FLOW-OB-004.2:** Users must be able to respond to assessment questions via text or voice input.
        *   ### Frontend Development Outline
            *   Utilize text input component (`<TextInput>`) for typed responses as part of the chat interface (UIDG 2.3).
            *   Implement voice input using `expo-av` for audio capture, and a "record" button (Component 10.1).
            *   Manage microphone permissions using `expo-av` permission requests.
            *   Display visual feedback during voice recording (e.g., waveform or mic icon animation).
            *   On text submission or voice input completion:
                *   Send the text string or audio data (e.g., base64 encoded string or blob uploaded to a temporary PicaOS endpoint) to PicaOS `/assessment/submit_response` endpoint along with `assessment_id` and `question_id`.
                *   Disable input while PicaOS is processing.
                *   Update local chat history with user's response.
        *   ### Backend/Serverless Development Outline
            *   **PicaOS:**
                *   Receives response data from Expo app.
                *   If audio data is received:
                    *   Streams/sends audio to Google GenAI STT API (as per FR-SYS-ALEX-001) to get transcribed text.
                    *   Handles potential STT errors (e.g., poor audio quality, no speech detected).
                *   Once text is available (either direct or from STT):
                    *   Logs the user's textual response against the `question_id` within the current assessment state (potentially cached in Upstash Redis or associated with a PicaOS session object).
                    *   Triggers the logic to determine the next question (as per FR-FLOW-OB-004.1's backend logic), providing the user's current response as input to GenAI for contextual conversation.
            *   **Google GenAI STT:** Converts voice input to text.
        *   ### Key Technical Considerations/Challenges
            *   **Voice Input Quality:** Managing background noise, varying accents for STT accuracy. Provide user guidance on clear speech.
            *   **STT Latency:** Minimize delay between voice input completion and Alex's next response.
            *   **Error Handling:** Gracefully handle STT failures or if user provides empty/unintelligible input. Alex might prompt user to try again.
            *   **Security of Audio Data:** If audio is uploaded, ensure secure transit and temporary storage.
            *   **Input Validation:** Basic validation on text input (e.g., length limits) if necessary.
    *   **FR-FLOW-OB-004.3:** The system must store user preferences derived from this assessment in their profile (see FR-DATA-PROF-002).
        *   ### Frontend Development Outline
            *   No direct frontend UI for this specific action, as it's a backend process triggered by assessment completion or reaching a milestone.
            *   The client might receive a confirmation from PicaOS that the assessment is complete and preferences are saved, then navigate to the next step (e.g., Tutorial or Dashboard).
        *   ### Backend/Serverless Development Outline
            *   **PicaOS:**
                *   Maintains the accumulated responses from the user throughout the assessment (e.g., in an Upstash Redis cache associated with the `assessment_id` or PicaOS session).
                *   Upon receiving an `isComplete` signal from the GenAI assessment flow (or a user action like "Finish Assessment"):
                    *   Retrieves all user responses for the assessment.
                    *   Processes these responses (potentially using another GenAI prompt) to derive storable user preferences (e.g., communication style tags, preferred interaction modes, topics of interest for growth module). Example: if user consistently chooses direct answers, a preference flag `comm_style: direct` might be set.
                    *   Calls a Supabase Edge Function or interacts directly with Supabase DB (via `profileService.ts` if PicaOS is Node.js based) to update the `user.profiles` table (or a related `user_preferences` table), merging these derived preferences. (Fulfills FR-DATA-PROF-002).
            *   **Google GenAI (LLM):** May be used by PicaOS to interpret the collection of answers and suggest structured preference data.
            *   **Supabase DB:** Stores the derived preferences in the `profiles` table (e.g., in a JSONB column `assessment_preferences`).
        *   ### Key Technical Considerations/Challenges
            *   **Preference Derivation Logic:** Designing effective GenAI prompts or PicaOS logic to accurately convert conversational inputs into meaningful, structured preference data.
            *   **Data Privacy:** Ensure that stored preferences are handled according to privacy policies and user consent.
            *   **Scalability:** If preference derivation is complex, ensure PicaOS can handle it efficiently, especially if many users complete assessments concurrently.
            *   **Atomicity:** If multiple preferences are updated, ensure the update to Supabase is atomic.
    *   **FR-FLOW-OB-004.4:** Users must be able to skip or postpone the assessment.
        *   ### Frontend Development Outline
            *   Display "Skip Assessment" or "Do Later" buttons on the personality assessment screen (UIDG 2.3).
            *   On tap:
                *   Optionally, show a confirmation modal (Component 10.7) asking if the user is sure, explaining briefly what they'd miss (e.g., personalized tips from Alex).
                *   If confirmed, call `onboardingService.skipAssessment()` or `onboardingService.postponeAssessment()`.
                *   Navigate to the next step in the onboarding flow (e.g., Interactive Platform Tutorial - UIDG 2.4, or Main Dashboard if tutorial is also skippable/done).
                *   Update local state (Zustand `onboardingStore`) to reflect this choice.
        *   ### Backend/Serverless Development Outline
            *   **PicaOS or Supabase Edge Function (via `onboardingService.ts`):**
                *   Receives the "skip" or "postpone" signal for the assessment from the client.
                *   Updates the `onboarding_status` field in the user's `profiles` table in Supabase (e.g., `assessment_status: 'skipped'` or `assessment_status: 'postponed'`).
            *   **Supabase DB:** Stores the updated `onboarding_status`.
        *   ### Key Technical Considerations/Challenges
            *   **Impact of Skipping:** Clearly define how skipping the assessment affects downstream personalization by Alex and in the Growth Hub. The app should function gracefully but perhaps with less tailored advice.
            *   **Prompts to Complete Later:** If postponed, implement a mechanism to remind or prompt the user to complete the assessment later (e.g., a card on the Main Dashboard or a setting).
            *   **User Experience:** Ensure the skip/postpone options are visible but don't overshadow the primary path of completing the assessment.
*   **FR-FLOW-OB-005 (Interactive Platform Tutorial - UIDG 2.4):**
    *   **FR-FLOW-OB-005.1:** The system (Alex) must offer new users an interactive tutorial of core platform features.
        *   ### Frontend Development Outline
            *   Implement a screen or modal (UIDG 2.4) that presents the tutorial offer.
            *   Display Alex's avatar (Component 10.2) and a text bubble with Alex's introductory script for the tutorial.
            *   Play Alex's voice for the introduction using `expo-av` (Component 10.2).
            *   Provide clear "Start Tutorial" and "Skip Tutorial" buttons (Component 10.8).
            *   If "Start Tutorial" is pressed, navigate to the first step of the interactive tutorial flow.
            *   If "Skip Tutorial" is pressed, call `onboardingService.skipTutorial()` and navigate to the Main Dashboard (UIDG 3.1) or the next required onboarding step if any.
        *   ### Backend/Serverless Development Outline
            *   **PicaOS:**
                *   Provides the initial script for Alex's tutorial offer (e.g., "Welcome! I can show you around..."). This script is generated via Google GenAI.
                *   Sends this script to ElevenLabs for TTS.
                *   Returns Alex's script and voice URL to the Expo app.
            *   **(If "Skip Tutorial" is chosen):** PicaOS or a Supabase Edge Function (via `onboardingService.ts`) updates the `onboarding_status` in `profiles` table to `tutorial_status: 'skipped'`.
            *   **Google GenAI/ElevenLabs:** Provide script and voice.
        *   ### Key Technical Considerations/Challenges
            *   **Engaging Offer:** Alex's script and the UI presentation should be engaging to encourage users to take the tutorial.
            *   **Clarity of Choice:** Ensure "Start" and "Skip" options are clear.
            *   **Loading Alex's Intro:** Minimize delay in Alex's voice/text presentation for the offer.
    *   **FR-FLOW-OB-005.2:** The tutorial must allow users to try out key actions in a simulated or guided environment.
        *   ### Frontend Development Outline
            *   Develop a sequence of UI screens/overlays/modals that constitute the tutorial steps (UIDG 2.4). Each step focuses on a core feature (e.g., initiating a session, using the tap-to-talk button, finding the growth hub).
            *   For each step:
                *   Alex (text/voice) provides instructions (Component 10.2).
                *   Highlight relevant UI elements the user needs to interact with (e.g., using a temporary spotlight effect or animated pointer).
                *   User performs a simulated action (e.g., taps a highlighted button, inputs mock text into a field).
                *   Client-side logic validates the action or simulates the expected outcome (e.g., showing a "message sent" confirmation in a mock chat).
                *   Provide "Next" / "Previous" buttons to navigate tutorial steps.
            *   Utilize components from UIDG Part 10 where appropriate (e.g., mock form elements, buttons).
        *   ### Backend/Serverless Development Outline
            *   **PicaOS:**
                *   Defines the structure and content of the tutorial steps (e.g., sequence of features to cover, Alex's script for each step, expected user interactions). This could be a JSON configuration managed by PicaOS.
                *   For each step, PicaOS provides Alex's script (via GenAI) and voice (via ElevenLabs) to the Expo app.
                *   Minimal backend interaction for *simulated* user actions within the tutorial. The primary role is serving the tutorial flow and content.
                *   (Optional) PicaOS could receive signals from the client as the user completes each step, to track tutorial progress at a granular level if needed, potentially caching this progress in Upstash Redis.
        *   ### Key Technical Considerations/Challenges
            *   **Simulation Fidelity:** Balancing realistic simulation with simplicity. Avoid making the tutorial overly complex or requiring actual backend calls for mock actions.
            *   **User Guidance:** Clear and concise instructions from Alex. Effective visual cues to guide user attention.
            *   **Step Management:** Robust client-side logic to manage tutorial state (current step, completed steps).
            *   **Flexibility:** Allow users to easily navigate between tutorial steps if they want to revisit something.
            *   **Content Authoring:** Creating and maintaining the tutorial steps and Alex's scripts in PicaOS.
    *   **FR-FLOW-OB-005.3:** The system must track tutorial completion status for a user (see FR-DATA-PROF-003).
        *   ### Frontend Development Outline
            *   When the user successfully completes the final step of the tutorial:
                *   Call `onboardingService.completeTutorial()`.
                *   Display a congratulatory message from Alex.
                *   Navigate to the Main Dashboard (UIDG 3.1).
                *   Update local state (Zustand `onboardingStore`) to reflect tutorial completion.
        *   ### Backend/Serverless Development Outline
            *   **PicaOS or Supabase Edge Function (via `onboardingService.ts`):**
                *   Receives the "tutorial_completed" signal from the client.
                *   Updates the `onboarding_status` field in the user's `profiles` table in Supabase to `tutorial_status: 'completed'` (fulfills FR-DATA-PROF-003).
            *   **Supabase DB:** Stores the updated `onboarding_status`.
        *   ### Key Technical Considerations/Challenges
            *   **Definition of "Completion":** Clearly define what constitutes tutorial completion (e.g., reaching the last step, successfully performing a minimum set of actions).
            *   **Reliable Status Update:** Ensure the completion status is reliably saved to the backend.
            *   **Handling Partial Completion:** If users can exit midway, decide if partial progress is saved or if they restart the tutorial. If saved, this FR's backend logic becomes more complex (see PicaOS optional point in 5.2).
    *   **FR-FLOW-OB-005.4:** Users must be able to skip or exit the tutorial at any time.
        *   ### Frontend Development Outline
            *   Provide a persistent "Skip Tutorial" or "Exit Tutorial" button throughout all tutorial steps (UIDG 2.4).
            *   On tap:
                *   Optionally, show a confirmation modal (Component 10.7).
                *   If "Skip" (from the initial offer or early step) or "Exit" (from a mid-tutorial step) is confirmed:
                    *   Call `onboardingService.skipTutorial()` or `onboardingService.exitTutorial()`.
                    *   Navigate to the Main Dashboard (UIDG 3.1).
                    *   Update local state (Zustand `onboardingStore`).
        *   ### Backend/Serverless Development Outline
            *   **PicaOS or Supabase Edge Function (via `onboardingService.ts`):**
                *   Receives the "skip" or "exit" signal.
                *   If the tutorial was skipped before any significant progress, update `onboarding_status` in `profiles` to `tutorial_status: 'skipped'`.
                *   If exited midway, the backend might record `tutorial_status: 'incomplete'` or `tutorial_status: 'exited_at_step_X'` if granular tracking is implemented. Otherwise, it might also be marked as 'skipped' to simplify.
            *   **Supabase DB:** Stores the updated status.
        *   ### Key Technical Considerations/Challenges
            *   **User Experience:** Ensure skipping/exiting is easy and doesn't lead to data loss if the tutorial involved any (even mock) data entry.
            *   **Resuming Tutorial:** If a user exits midway, consider if and how they can resume the tutorial from where they left off (adds complexity to state management on both client and backend). For simplicity, exiting might mean they'd have to restart it or it's considered skipped.
            *   **Clarity of Options:** Distinguish between "skipping" the entire tutorial from the outset versus "exiting" an in-progress tutorial.
*   **FR-FLOW-OB-004 (Conversational Personality Assessment - UIDG 2.3):**
    *   **FR-FLOW-OB-004.1:** The system (Alex) must present a sequence of questions to new users in a conversational format.
        *   **Frontend Development Outline:**
            *   Expo app displays chat interface (UIDG 2.3, Component 10.2 for Alex's avatar/speech bubbles).
            *   Manages conversation history in local state (e.g., Zustand `assessmentStore`).
            *   On load or after user response, calls PicaOS `/assessment/next_step` endpoint.
            *   Displays Alex's question script and quick reply options (if any) received from PicaOS.
            *   Plays Alex's voice using `expo-av` (Component 10.2).
            *   Provides text input (`<TextInput>`) and voice input button (`<TouchableOpacity>` for Component 10.1).
        *   **Backend/Serverless Development Outline:**
            *   **PicaOS:**
                *   Receives current state (e.g., last question answered, conversation history) from Expo app.
                *   Uses Google GenAI (LLM) with a predefined question bank/logic to determine the next question and Alex's script. Prompt includes conversation history for contextual follow-ups.
                *   (Optional) Caches common question scripts or introductory phrases in Upstash Redis.
                *   Sends Alex's script to ElevenLabs for TTS.
                *   Returns `{ questionId, questionText, alexScript, alexVoiceUrl, options?, isComplete }` to Expo app.
            *   **Google GenAI:** Generates conversational flow and Alex's script based on PicaOS prompts.
            *   **ElevenLabs:** Provides TTS.
            *   **Supabase (`profiles` table):** User preferences derived from answers are stored here by PicaOS as the assessment progresses or at the end.
        *   **Key Technical Considerations/Challenges:**
            *   Designing engaging and effective question sequences (content for GenAI prompts).
            *   Managing conversation state between PicaOS and Expo app across multiple turns.
            *   Latency for GenAI response generation and ElevenLabs TTS. PicaOS might pre-fetch next likely questions/audio if flow is somewhat predictable.
            *   Handling user desire to go back or change previous answers (if allowed).
    *   **FR-FLOW-OB-004.2:** Users must be able to respond to assessment questions via text or voice input.
    *   **FR-FLOW-OB-004.3:** The system must store user preferences derived from this assessment in their profile (see FR-DATA-PROF-002).
    *   **FR-FLOW-OB-004.4:** Users must be able to skip or postpone the assessment.
*   **FR-FLOW-OB-005 (Interactive Platform Tutorial - UIDG 2.4):**
    *   **FR-FLOW-OB-005.1:** The system (Alex) must offer new users an interactive tutorial of core platform features.
    *   **FR-FLOW-OB-005.2:** The tutorial must allow users to try out key actions in a simulated or guided environment.
    *   **FR-FLOW-OB-005.3:** The system must track tutorial completion status for a user (see FR-DATA-PROF-003).
    *   **FR-FLOW-OB-005.4:** Users must be able to skip or exit the tutorial at any time.

### 4.2. Main Dashboard & Core Navigation (UIDG Part 3)
*   **FR-FLOW-DASH-001 (Main Dashboard Display - UIDG 3.1):** Upon successful login, the system must display a personalized dashboard screen.
    *   ### Frontend Development Outline
        *   Implement the Main Dashboard screen structure as per UIDG 3.1.
        *   Utilize React Navigation's Bottom Tab Navigator for primary navigation, with the Dashboard as one of the main tabs (UIDG 1.5).
        *   The screen should fetch and display personalized data after login and `userStore` (Zustand) hydration.
        *   Display a personalized greeting (e.g., "Good morning, [User Name]!") using data from `userStore.profile`.
        *   Layout should be adaptive to various screen sizes (UIDG 1.7).
        *   Incorporate an area for Alex's contextual greeting/tip (UIDG 3.1.C).
    *   ### Backend/Serverless Development Outline
        *   **User Profile Data:** Supabase `profiles` table (already populated at login) provides the user's name for personalization. No new backend calls are strictly needed just to display the screen structure if profile data is already in the client's state.
        *   **PicaOS/Alex's Greeting:**
            *   An initial greeting or tip from Alex might be fetched on dashboard load.
            *   Expo app calls a PicaOS endpoint (e.g., `/dashboard/alex_greeting`).
            *   PicaOS uses Google GenAI to generate a contextually relevant greeting or a general helpful tip (e.g., based on time of day, user's recent activity if available and consented, or a generic tip).
            *   PicaOS sends script to ElevenLabs for TTS.
            *   Returns Alex's script and voice URL to the app.
            *   Upstash Redis can cache generic tips or greeting templates to reduce GenAI calls.
    *   ### Key Technical Considerations/Challenges
        *   **Performance:** Dashboard should load quickly post-login. Optimize data fetching for personalized content.
        *   **State Management:** Ensure `userStore` is correctly populated before the dashboard attempts to render personalized elements.
        *   **Alex's Greeting Latency:** If Alex's greeting is dynamic and fetched live, manage potential latency. Consider a placeholder or loading state for Alex's content area.
        *   **Navigation Context:** Ensure the Bottom Tab Navigator is correctly initialized and the Dashboard tab is active.
*   **FR-FLOW-DASH-002 (Dashboard Content - UIDG 3.1):** The dashboard must provide quick actions (e.g., start/join session), an overview of recent activity/sessions, and contextual insights or tips from Alex.
    *   ### Frontend Development Outline
        *   **Quick Actions (UIDG 3.1.B):**
            *   Implement prominent buttons for "Start New Session" (navigates to UIDG 4.1 Describe Conflict) and "Join Session" (navigates to UIDG 5.1 Enter Session Code).
            *   Style buttons as per Component 10.8 (Primary Actions).
        *   **Recent Activity/Sessions (UIDG 3.1.D):**
            *   Implement a section to display a summary of recent sessions (e.g., titles, dates of last 2-3 sessions).
            *   Use a `<FlatList>` to render session summary cards. Each card is touchable and navigates to the respective session's detail/summary view (UIDG 3.2 / UIDG 8.1).
            *   Fetch data from `sessionService.getRecentSessions()`.
            *   Display a "View All Sessions" link navigating to the full Session History screen (UIDG 3.2).
        *   **Alex's Contextual Insights/Tips (UIDG 3.1.C):**
            *   Display Alex's avatar and a speech bubble (Component 10.2).
            *   Content is fetched as described in FR-FLOW-DASH-001 (Backend). This could be expanded to include more dynamic insights if PicaOS backend logic supports it (e.g., "You have an upcoming session today!").
            *   Play Alex's voice if available.
    *   ### Backend/Serverless Development Outline
        *   **Recent Sessions Data:**
            *   **Supabase Edge Function or Direct Supabase Query (via `sessionService.ts`):**
                *   Fetches a list of recent sessions for the logged-in user from the `sessions` table.
                *   Query should filter by `user_id` (for sessions they hosted or participated in), order by `created_at` or `last_accessed_at` descending, and limit the count (e.g., 3-5).
                *   Returns essential data for display (e.g., `session_id`, `title`, `date`, `role_in_session`).
            *   **Upstash Redis:** Session list for the dashboard could be cached in Redis, invalidated when a new session is created/joined by the user or an existing session is completed/updated. (Dev Guide 3.6, TPKB 3.6).
        *   **Alex's Contextual Insights (PicaOS):**
            *   Beyond a simple greeting, PicaOS could check for upcoming scheduled sessions for the user (from Supabase `sessions` table) or retrieve a "tip of the day" related to communication skills (from a GenAI prompt or a curated list in Supabase).
            *   This logic resides in the PicaOS `/dashboard/alex_greeting_or_insight` endpoint.
    *   ### Key Technical Considerations/Challenges
        *   **Data Aggregation for Dashboard:** Efficiently querying and potentially caching the data needed for "Recent Activity" and Alex's insights.
        *   **Personalization:** Ensuring Alex's tips become more personalized over time as the system learns more (with consent) about the user's goals or common interaction patterns (links to Growth Hub FR-SYS-ALEX-009).
        *   **UI Layout:** Balancing information density with a clean, uncluttered look on the dashboard.
        *   **Empty States:** Design for when a new user has no recent sessions. Provide clear calls to action.
*   **FR-FLOW-DASH-003 (Navigation - UIDG 1.5):** The system must provide intuitive mobile navigation (e.g., bottom tab bar) allowing access to main application sections: Dashboard, Sessions/History, Growth Hub, and Settings.
    *   ### Frontend Development Outline
        *   Implement primary navigation using React Navigation's Bottom Tab Navigator as specified in UIDG 1.5.A.
        *   Tabs include:
            *   **Dashboard:** (Default tab) Navigates to the Main Dashboard screen (UIDG 3.1). Icon: e.g., Home.
            *   **Sessions:** Navigates to the Session History screen (UIDG 3.2). Icon: e.g., List/Calendar.
            *   **Growth Hub:** Navigates to the Personal Growth Dashboard (UIDG 3.3 / UIDG Part 9). Icon: e.g., Brain/Chart.
            *   **Settings:** Navigates to a main Settings screen (UIDG - typically part of overall structure, may use Stack Navigator from here). Icon: e.g., Gear.
        *   Each tab should have a clear icon and label (UIDG 1.5.A).
        *   Ensure active tab is visually distinct.
        *   Secondary navigation within sections (e.g., from Session History list to a specific Session Detail) will use Stack Navigators (UIDG 1.5.A).
    *   ### Backend/Serverless Development Outline
        *   No direct backend interaction is required for implementing the client-side navigation structure itself.
        *   Backend provides data for the screens that each tab navigates to.
    *   ### Key Technical Considerations/Challenges
        *   **Navigation Library:** Correct and efficient setup of React Navigation library.
        *   **Iconography & Labels:** Choosing clear, universally understood icons and concise labels for tabs (UIDG 1.5.A).
        *   **Accessibility:** Ensure tabs are accessible via screen readers (VoiceOver, TalkBack), with proper roles and labels. Touch targets should be adequate.
        *   **State Preservation:** Preserve navigation state when switching tabs or when the app is backgrounded/reopened, where appropriate (React Navigation often handles this).
        *   **Performance:** Smooth transitions between tabs.
*   **FR-FLOW-DASH-004 (Session History Access - UIDG 3.2):** From the dashboard or main navigation, users must be able to access a list of their past and upcoming sessions.
    *   ### Frontend Development Outline
        *   Implement the Session History screen (UIDG 3.2).
        *   Accessed via the "Sessions" tab in the Bottom Tab Navigator.
        *   May include filter/sort options (e.g., by date, status: upcoming/past, role: host/participant).
        *   Use a `<FlatList>` to display session items. Each item should be a tappable card showing key info (title, date, user's role, status).
        *   Tapping a session card navigates to its detailed view (e.g., Session Summary for past sessions - UIDG 8.1, or a pre-session lobby for upcoming ones).
        *   Implement "pull-to-refresh" functionality for the list.
        *   Handle empty state (no sessions) and loading/error states.
        *   Calls `sessionService.getAllSessions(filters)` to fetch data.
    *   ### Backend/Serverless Development Outline
        *   **Supabase Edge Function or Direct Supabase Query (via `sessionService.ts`):**
            *   Fetches all sessions associated with the logged-in user (hosted or participated).
            *   Joins `sessions` with `session_participants` table to determine user's involvement.
            *   Supports pagination if the list can be very long.
            *   Supports filtering parameters passed from the client (e.g., `status=['completed', 'cancelled']`, `role='host'`).
            *   Sorts results (e.g., by `session_date` descending).
        *   **Upstash Redis:**
            *   Could cache paginated lists of session history for users, invalidated on changes to sessions they are part of. (TPKB 3.6).
            *   Careful cache key design to include filter/sort parameters if caching filtered views.
    *   ### Key Technical Considerations/Challenges
        *   **Query Optimization:** Efficiently querying sessions, especially with filters and pagination, as the number of sessions grows.
        *   **Data Synchronization:** Ensuring the session list is up-to-date, possibly using Supabase Realtime to refresh parts of the list or indicate new sessions if the screen is active.
        *   **Scalability:** Handling potentially large lists of sessions per user with pagination.
        *   **Filter/Sort UI:** Implementing user-friendly filter and sort controls.
*   **FR-FLOW-DASH-005 (Growth Hub Access - UIDG 3.3):** From the dashboard or main navigation, users must be able to access their Personal Growth Dashboard.
    *   ### Frontend Development Outline
        *   Implement the Personal Growth Dashboard screen (UIDG 3.3, detailed in UIDG Part 9).
        *   Accessed via the "Growth Hub" tab in the Bottom Tab Navigator.
        *   Screen will display various components like:
            *   AI-generated insights summary (UIDG 9.1)
            *   Achievement badges and progress (UIDG 9.2)
            *   Links to recommended resources (UIDG 9.3)
            *   Conflict prevention insights (UIDG 9.4)
        *   Data for these components is fetched from PicaOS/Supabase via dedicated service calls (e.g., `growthService.getInsights()`, `growthService.getBadges()`).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS & Supabase (as per FR-SYS-ALEX-009, FR-SYS-ALEX-010, and Dev Guide Part 6.7):**
            *   PicaOS orchestrates GenAI analysis of user interaction data (with consent) stored in Supabase (`session_messages`, `feedback`) to generate insights.
            *   Results (insights, badge achievements, resource recommendations) are stored in Supabase tables like `growth_insights`, `user_badges`, `recommended_resources_for_user`.
            *   Supabase Edge Functions or direct queries (via `growthService.ts`) retrieve this data for the Growth Hub screen.
            *   Upstash Redis can cache user-specific growth data, especially if insights generation is periodic rather than real-time.
    *   ### Key Technical Considerations/Challenges
        *   **Data Privacy & Consent:** Critical to ensure user consent is obtained and respected for analyzing their data for growth insights.
        *   **Quality of Insights:** AI-generated insights must be meaningful, actionable, and positively framed.
        *   **Data Aggregation for Growth Hub:** Complex data processing might be needed on the backend by PicaOS to generate these insights.
        *   **UI for Growth Data:** Effectively visualizing progress, badges, and textual insights in an engaging way.
        *   **Performance:** Loading various data points for the Growth Hub efficiently.

### 4.3. Host Path - Session Creation & Setup (UIDG Part 4; Mermaid O-AC)
*   **FR-FLOW-HPS-001 (Describe Conflict - UIDG 4.1):** The system must allow a Host to input a session title, a detailed text description of the context, and upload multiple multimedia files (images, documents, audio, video) to support the description (fulfills FR-PER-HOS-002, FR-SYS-MM-001).
    *   ### Frontend Development Outline
        *   Implement the "Describe Conflict" screen UI as per UIDG 4.1.
        *   Use `<TextInput>` for session title (UIDG 4.1.A) and multi-line text description (UIDG 4.1.B).
        *   Implement multimedia file upload functionality (UIDG 4.1.C) using `expo-document-picker` for documents/audio and `expo-image-picker` for images/video, as detailed in Component 10.3.
        *   Display selected files with options to remove them before submission. Show upload progress (Component 10.3, FR-SYS-MM-006).
        *   Alex's guidance (text/voice) on providing good context can be displayed (UIDG 4.1.D, Component 10.2).
        *   "Next" button to submit the data, which calls `sessionService.createInitialSessionContext()`.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives session title, description text, and an array of file references (e.g., Supabase Storage paths post-upload by client).
            *   Creates a new record in the `sessions` table in Supabase with `host_id = current_user_id`, `title`, `description_context`, `status = 'draft'` or `'context_gathering'`.
            *   For each uploaded file reference, creates an entry in the `session_files` table, linking it to the new `session_id` and storing `file_path`, `file_type`, `uploader_id`.
            *   (Fulfills FR-DATA-SESS-001, FR-DATA-SESS-004).
            *   This initial data (text and file references) will be used by PicaOS for subsequent AI analysis (FR-FLOW-HPS-002, FR-SYS-MM-004, FR-FLOW-HPS-001.1).
        *   **Supabase Storage:** Securely stores the uploaded multimedia files (as per FR-SYS-MM-001, FR-SYS-MM-002). Client uploads files directly to Supabase storage and provides URLs/paths to the backend.
        *   **PicaOS for Alex's guidance:** Provides script/voice for Alex's tips on this screen if dynamic.
    *   ### Key Technical Considerations/Challenges
        *   **Multimedia Uploads:** Managing multiple file uploads, types, size limits, and error handling (covered by FR-SYS-MM-001, FR-SYS-MM-006).
        *   **Data Integrity:** Ensuring session record and all associated file records are created successfully in Supabase. Use transactions if multiple DB operations are done in a single backend function.
        *   **User Experience:** Providing clear feedback on submission success or failure. Managing loading states while data is submitted.
        *   **Content Moderation (Future):** For text or multimedia, consider if any automated content moderation/filtering is needed before AI processing, though not explicitly in scope now.
*   **FR-FLOW-HPS-001.1 (New FR):** System must enable AI (via PicaOS) to analyze uploaded image files for emotional cues or contextual objects relevant to the conflict description.
    *   **Frontend Development Outline:**
        *   Expo app uses `expo-image-picker` to select image(s) (Component 10.3).
        *   Uploads image(s) to Supabase Storage (Dev Guide 3.5, TPKB 2.Y).
        *   Sends file reference (storage path) along with other conflict data to PicaOS `/session/initiate_conflict_description` endpoint.
        *   Later, on AI Problem Analysis Review screen (UIDG 4.2), displays any image-specific insights returned by PicaOS (e.g., identified objects, sentiment inferred from image context if GenAI supports this).
    *   **Backend/Serverless Development Outline:**
        *   **PicaOS:**
            *   Receives file reference (storage path) for the image from Expo app.
            *   Downloads the image binary from Supabase Storage.
            *   Sends the image binary to Google GenAI Vision model.
            *   Prompt for GenAI Vision: "Analyze this image for objects, settings, or any apparent human emotional expressions relevant to a conflict description. Provide a brief textual summary of findings."
            *   Receives structured JSON output from GenAI (e.g., `{ objects: ["desk", "computer"], setting: "office", inferred_emotion_cues: ["tense posture"] }` or a textual description).
            *   Stores this analysis snippet in `session_files.ai_analysis_snippet` or incorporates it into the overall `sessions.ai_synthesis_summary` in Supabase.
            *   (Optional) Caches this analysis in Upstash Redis keyed by image hash or `file_id`.
        *   **Google GenAI (Vision):** Processes image, returns analysis.
        *   **Supabase Storage:** Stores the image file.
        *   **Supabase DB:** Stores reference to file and its AI analysis snippet.
    *   **Key Technical Considerations/Challenges:**
        *   Accuracy and potential biases of AI image analysis for emotional cues (must be presented cautiously, as AI inference, not fact).
        *   Cost of Vision API calls.
        *   Handling different image formats and sizes.
        *   Integrating image analysis results meaningfully with text analysis for a holistic understanding.
        *   Latency of image analysis; PicaOS might do this asynchronously after initial conflict submission, updating the analysis view later.
*   **FR-FLOW-HPS-002 (AI Problem Analysis Review - UIDG 4.2):** The system must present AI-generated analysis (themes, sentiments, potential divergences, suggested talking points) derived from the "Describe Conflict" inputs to the Host for review (fulfills FR-PER-HOS-003).
    *   ### Frontend Development Outline
        *   Implement the "AI Problem Analysis Review" screen UI as per UIDG 4.2.
        *   Display the AI-generated analysis received from PicaOS (UIDG 4.2.A). This may include:
            *   Key themes identified (e.g., as a list of strings).
            *   Overall sentiment analysis (e.g., "neutral," "tense," with rationale).
            *   Potential areas of divergence or misunderstanding.
            *   Suggested talking points or questions for the Host to consider.
            *   Snippets from uploaded multimedia analysis (e.g., description of relevant image content - FR-FLOW-HPS-001.1, key phrases from audio STT).
        *   Use clear visual hierarchy to present different aspects of the analysis (e.g., cards, expandable sections).
        *   Alex (text/voice) can provide a brief overview or explanation of how to interpret the analysis (UIDG 4.2.B, Component 10.2).
        *   Provide UI elements for Host to give feedback on the analysis (see FR-FLOW-HPS-003).
        *   "Next" button to proceed to session configuration (UIDG 4.3).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Receives a request for analysis, referencing the `session_id` created in FR-FLOW-HPS-001.
            *   Retrieves the session's title, description text, and references to any uploaded files from Supabase (`sessions` and `session_files` tables).
            *   For text data: Sends to Google GenAI (LLM) with prompts designed to extract themes, sentiment, divergences, and suggest talking points (FR-SYS-ALEX-005).
            *   For multimedia data:
                *   If not already done (e.g., image analysis in FR-FLOW-HPS-001.1), PicaOS triggers analysis of other multimedia (e.g., text extraction from documents, STT from audio - FR-SYS-MM-004).
                *   Key findings from multimedia analysis are incorporated into the overall synthesis for the GenAI LLM.
            *   PicaOS combines these analyses into a structured JSON object.
            *   Stores this structured analysis in Supabase (e.g., `sessions.ai_initial_analysis_json`) (fulfills FR-DATA-SESS-005).
            *   Returns the analysis JSON to the Expo app.
            *   Upstash Redis might cache the generated analysis for a short period to avoid re-computation if the user revisits the screen quickly.
        *   **Google GenAI (LLM, Vision, STT):** Provide core AI processing capabilities.
        *   **Supabase DB:** Stores session data and the AI analysis results.
    *   ### Key Technical Considerations/Challenges
        *   **AI Analysis Quality:** Ensuring the AI analysis is relevant, accurate, and genuinely helpful to the Host. Requires careful prompt engineering for PicaOS.
        *   **Presentation of Complex Info:** Designing a UI that presents potentially complex AI analysis in an understandable and actionable way for non-technical Hosts.
        *   **Latency of Analysis:** Comprehensive analysis of text and multiple media files can be time-consuming. Manage Host expectations with loading indicators. Consider asynchronous processing where PicaOS notifies the client when analysis is ready if it takes too long for synchronous request/response.
        *   **Cost of AI Operations:** Multiple GenAI calls (LLM, Vision, STT) can be costly. Optimize PicaOS orchestration to minimize redundant calls or use less expensive models where appropriate.
        *   **Error Handling:** Gracefully handle cases where AI analysis might fail for some inputs or returns unexpected results.
*   **FR-FLOW-HPS-003 (Host Feedback on Analysis - UIDG 4.2):** The Host must be able to provide feedback (e.g., rate usefulness, suggest edits, dismiss) on the AI-generated analysis.
    *   ### Frontend Development Outline
        *   Implement UI elements for feedback on the "AI Problem Analysis Review" screen (UIDG 4.2.C). This could include:
            *   Thumbs up/down buttons for overall usefulness.
            *   A star rating component.
            *   An optional text input field for specific comments or suggested edits on the analysis.
            *   Buttons to "Dismiss" or "Ignore" specific parts of the analysis if it's presented in sections.
        *   When feedback is submitted, call `sessionService.submitAIAnalysisFeedback()` with `session_id`, `analysis_item_id` (if applicable), rating, and comments.
        *   Provide visual confirmation that feedback has been submitted (e.g., Toast - Component 10.6).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS or Supabase Edge Function (via `sessionService.ts`):**
            *   Receives the feedback data (session_id, rating, comments, etc.).
            *   Stores this feedback in a dedicated table in Supabase (e.g., `ai_analysis_feedback`) linked to the `session_id` and potentially the specific analysis version or item. (Fulfills FR-DATA-FEED-001 indirectly, as this is feedback on AI, not session itself).
            *   This feedback is valuable for future PicaOS/GenAI model tuning and prompt refinement. It might be periodically reviewed or used in automated fine-tuning pipelines if set up.
        *   **Supabase DB:** Stores the feedback data.
    *   ### Key Technical Considerations/Challenges
        *   **Actionable Feedback:** Designing feedback mechanisms that provide genuinely useful data for improving the AI analysis.
        *   **Granularity of Feedback:** Deciding whether feedback is on the overall analysis or on specific identified themes/points. Granular feedback is more complex to implement but more useful.
        *   **Data Storage for Feedback:** Structuring the `ai_analysis_feedback` table to effectively store and query the feedback.
        *   **Non-Intrusive UI:** Feedback mechanisms should be available but not overly intrusive to the Host's primary goal of setting up the session.
        *   **No Immediate Impact:** Clarify to the user that this feedback is for system improvement and likely won't change the current analysis in real-time (unless "suggest edits" is a feature that PicaOS tries to incorporate immediately, which is more advanced).
*   **FR-FLOW-HPS-004 (Configure Session Type - UIDG 4.3):** The system must allow the Host to select a session type from predefined templates or define a custom session, and configure parameters such as duration, enabled features (e.g., Q&A, polls, anonymity settings), transcription, and translation options (fulfills FR-PER-HOS-004).
    *   ### Frontend Development Outline
        *   Implement the "Configure Session Type" screen UI as per UIDG 4.3.
        *   Allow selection from predefined session templates (e.g., "Team Conflict," "Feedback Session," "Personal Reflection") - (UIDG 4.3.A). Templates could be displayed in a `<FlatList>` of cards.
        *   If "Custom Session" is chosen, or for editing a template, provide UI elements (Component 10.8 - Switches, Sliders, Pickers) to configure parameters (UIDG 4.3.B):
            *   Session duration (e.g., time picker or input).
            *   Enabled features: Q&A (`<Switch>`), Polls (`<Switch>`), Anonymity settings (Picker or Radio buttons).
            *   Transcription: On/Off (`<Switch>`). If on, language selection (Picker).
            *   Translation: On/Off (`<Switch>`). If on, target language(s) selection (Multi-select Picker).
        *   Alex (text/voice) can offer recommendations for session types or configurations based on the initial conflict description (UIDG 4.3.C, Component 10.2).
        *   "Next" button saves configuration and proceeds to Define Goals/Rules (UIDG 6.2) or Add Participants (UIDG 4.4).
        *   Calls `sessionService.configureSession(sessionId, configurationDetails)`.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `session_id` and configuration details from the client.
            *   Updates the corresponding record in the `sessions` table in Supabase with the chosen `session_type`, `duration_minutes`, `feature_flags` (JSONB for Q&A, polls, anonymity), `transcription_settings` (JSONB for language), `translation_settings` (JSONB for target languages).
            *   (Fulfills FR-DATA-SESS-001 for these fields).
        *   **Supabase DB:**
            *   `sessions` table stores the configuration.
            *   A `session_templates` table might exist to store predefined template configurations, which PicaOS can retrieve and suggest to the client, or the client might have them embedded.
        *   **PicaOS for Alex's recommendations:**
            *   If Alex provides recommendations, PicaOS receives the initial conflict analysis (from FR-FLOW-HPS-002).
            *   Uses Google GenAI (LLM) to suggest suitable session templates or specific configurations based on this analysis.
            *   Returns suggestions (template IDs, specific settings) to the client.
    *   ### Key Technical Considerations/Challenges
        *   **Template Management:** Defining and managing session templates (either in PicaOS config or Supabase `session_templates` table).
        *   **Complexity of Configuration:** Balancing comprehensive configuration options with a user-friendly interface. Avoid overwhelming the Host.
        *   **Storing Configurations:** Using JSONB in Supabase for `feature_flags` and `transcription/translation_settings` provides flexibility but requires careful client-side handling.
        *   **AI Recommendations for Configuration:** Ensuring Alex's suggestions are relevant and helpful, not just generic.
        *   **Dependencies:** Some features might depend on others (e.g., translation might require transcription to be enabled). UI should handle such dependencies.
*   **FR-FLOW-HPS-005 (Define Goals & Rules - UIDG 6.2):** The system must allow the Host to establish specific session goals and communication rules, with Alex providing suggestions based on the session context and type (fulfills FR-PER-HOS-005).
    *   ### Frontend Development Outline
        *   Implement the "Define Goals & Rules" screen UI as per UIDG 6.2 (though part of Host Path setup, it shares UI with a pre-session step).
        *   Provide `<TextInput>` fields for Hosts to define or edit session goals and communication rules (UIDG 6.2.A, 6.2.B). These could be lists where new items can be added.
        *   Display AI-suggested goals/rules from Alex (PicaOS) as a list of selectable or editable items (UIDG 6.2.C, Component 10.2 for Alex's presentation). Host can accept, reject, or modify these suggestions.
        *   "Next" button saves goals/rules and proceeds to Add Participants (UIDG 4.4) or next relevant step.
        *   Calls `sessionService.setGoalsAndRules(sessionId, goals, rules)`.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `session_id`, a list of goals (text strings), and a list of rules (text strings).
            *   Updates the `sessions` table record for the given `session_id`, storing goals in `session_goals` (e.g., JSONB array of strings) and rules in `session_rules` (e.g., JSONB array of strings).
            *   (Fulfills FR-DATA-SESS-001 for these fields).
        *   **PicaOS for Alex's suggestions (FR-SYS-ALEX-007):**
            *   If not already fetched or if context has changed (e.g., after session type configuration):
                *   PicaOS takes `session_id` (to get context like AI analysis from FR-FLOW-HPS-002 and configured session type from FR-FLOW-HPS-004).
                *   Uses Google GenAI (LLM) to generate suggested goals and rules based on this context.
                *   Returns these suggestions to the client for display.
        *   **Supabase DB:** Stores goals and rules in the `sessions` table.
    *   ### Key Technical Considerations/Challenges
        *   **AI Suggestion Quality:** Ensuring Alex's suggested goals/rules are relevant to the conflict description and selected session type.
        *   **User Interface for Lists:** Providing an intuitive UI for adding, editing, and deleting items in lists of goals and rules, and for interacting with AI suggestions.
        *   **Flexibility vs. Structure:** Allowing free-text entry for goals/rules offers flexibility but might be harder for AI to process later if needed. For now, storing as arrays of strings is fine.
        *   **Saving Data:** Efficiently saving potentially multiple text entries to the database.
*   **FR-FLOW-HPS-006 (Add Participants - UIDG 4.4):** The system must enable the Host to add participants by entering email addresses or selecting from device contacts.
    *   ### Frontend Development Outline
        *   Implement the "Add Participants" screen UI as per UIDG 4.4.A.
        *   Provide a `<TextInput>` field for entering email addresses. Validate email format client-side.
        *   Allow adding multiple emails, displaying them as a list of "pills" or tags, with an option to remove individual emails.
        *   Implement a button to access device contacts using `expo-contacts` API.
            *   Request necessary permissions (`Contacts.requestPermissionsAsync()`).
            *   Display a contact picker interface. Allow searching/selecting multiple contacts.
            *   Retrieve email addresses from selected contacts.
        *   Display a list of added participants (email or name from contacts).
    *   ### Backend/Serverless Development Outline
        *   This FR is primarily frontend. The collected participant emails/details are typically passed to a later FR (like FR-FLOW-HPS-009 Send Invitations) or temporarily stored in client-side state (e.g., Zustand `sessionSetupStore`) before being finalized.
        *   No direct backend calls are made solely for adding emails to a list on the client, unless there's a feature to check if an email already corresponds to an existing "Understand.me" user to pre-fill their name/avatar (see Considerations).
    *   ### Key Technical Considerations/Challenges
        *   **Contact Permissions:** Gracefully handling contact permission requests and denial.
        *   **Contact Data:** Parsing contact data (which can be complex and vary across devices/OS versions) to reliably extract email addresses.
        *   **Duplicate Entries:** Preventing duplicate email entries in the list.
        *   **UI for Large Lists:** If many participants can be added, ensure the UI remains usable (e.g., scrollable list of added participants).
        *   **(Optional) Existing User Check:**
            *   **Frontend:** After an email is added, could call a PicaOS/Edge Function.
            *   **Backend:** PicaOS/Edge Function checks if email exists in `profiles` table. Returns basic public profile info if found (name, avatar URL). This can enhance the participant list UI. Requires careful privacy consideration (don't reveal too much info about existing users to someone just typing emails).
*   **FR-FLOW-HPS-007 (Assign Participant Roles - UIDG 4.4):** The system must allow the Host to assign roles (e.g., speaker, observer) to invited participants if the session type supports it.
    *   ### Frontend Development Outline
        *   On the "Add Participants" screen (UIDG 4.4.B) or a subsequent step, if the selected session type (from FR-FLOW-HPS-004) supports roles:
            *   For each added participant, display a dropdown/picker (Component 10.8) to assign a role.
            *   Available roles (e.g., "Speaker," "Observer," "Contributor") would be dependent on the session type's configuration.
            *   Default role could be "Participant" or "Speaker."
        *   Store the assigned role locally with the participant's details before final submission.
    *   ### Backend/Serverless Development Outline
        *   Similar to FR-FLOW-HPS-006, this is primarily frontend data collection at this stage.
        *   The assigned roles are stored with participant details when invitations are formally processed by the backend (e.g., FR-FLOW-HPS-009).
        *   **PicaOS/Supabase:** The `session_types` table (or PicaOS configuration) should define available roles for each session type. This information might be fetched by the client when configuring the session type to populate the role assignment dropdowns dynamically.
    *   ### Key Technical Considerations/Challenges
        *   **Role Definitions:** Clearly defining available roles and their permissions/capabilities within a session. These definitions would be used by PicaOS during a session to manage interactions.
        *   **Dynamic UI:** The UI for role assignment might only appear if the chosen session type has role differentiation.
        *   **Default Roles:** Sensible default role assignment to simplify Host's task.
        *   **Storing Roles:** The `session_participants` table in Supabase will need a `role` column (e.g., text or enum type).
*   **FR-FLOW-HPS-008 (Customize Invitation - UIDG 4.4):** The system must allow the Host to customize the invitation message sent to participants (fulfills FR-PER-HOS-006).
    *   ### Frontend Development Outline
        *   Implement a multi-line `<TextInput>` field on the "Add Participants" or a dedicated "Customize Invitation" screen (UIDG 4.4.C) for the Host to write a custom message.
        *   Provide a preview of the default invitation text, which Alex might help generate.
        *   The custom message should be stored in the client-side state (e.g., Zustand `sessionSetupStore.invitationMessage`) before being sent to the backend with the participant list.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS for Alex's suggestion (Optional):**
            *   PicaOS, using Google GenAI, could generate a default/suggested invitation message based on the session title, description, and type. This would be fetched by the client to pre-fill the custom message field.
        *   The custom message itself is persisted when the invitations are actually created/sent (see FR-FLOW-HPS-009). The `sessions` table or `session_invitations` table might have a column for `custom_invite_message`.
    *   ### Key Technical Considerations/Challenges
        *   **Message Length:** Consider reasonable length limits for the custom message.
        *   **Placeholders:** Potentially allow placeholders in the custom message (e.g., `{{participant_name}}`, `{{session_title}}`) that the backend would populate when sending individual emails, though this adds complexity. For phase 1, a single custom message for all is simpler.
        *   **UI for Preview:** Clearly show the Host how their custom message fits into the overall invitation.
        *   **Security:** Sanitize any HTML or script content if rich text editing is ever allowed (currently plain text is assumed).
*   **FR-FLOW-HPS-009 (Send Invitations - UIDG 4.4):** The system must send invitations to added participants via email and/or in-app notifications.
    *   ### Frontend Development Outline
        *   After participant emails are added (FR-FLOW-HPS-006), roles assigned (FR-FLOW-HPS-007), and message customized (FR-FLOW-HPS-008), a "Send Invitations" button (UIDG 4.4.D) triggers this action.
        *   Display loading state while backend processes invitations.
        *   On success, navigate to Track Invitation Status screen (UIDG 4.5) or show a success Toast (Component 10.6).
        *   On failure, show an error Toast.
        *   Client calls `sessionService.sendInvitations(sessionId, participantsList, customMessage)`.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `session_id`, list of participant objects (each with `email`, `role`), and the `custom_invite_message`.
            *   For each participant in the list:
                *   Check if a user with this email already exists in `public.profiles`.
                *   Create a record in `session_participants` table linking `session_id`, `user_id` (if existing user) or `invited_email` (if new), `role`, `invitation_status = 'pending'`, `invitation_token` (generate a unique token).
                *   (Fulfills FR-DATA-SESS-002).
                *   If the invited email corresponds to an existing user:
                    *   Send an in-app notification (FR-SYS-NOTIF-001, FR-SYS-NOTIF-002): Create a record in `notifications` table for the target user, which they receive via Realtime. Notification includes `session_id`, Host name, and a deep link.
                    *   Optionally, also send an email notification if user preferences allow.
                *   If the invited email is for a new user (or existing user who prefers email):
                    *   Send an email invitation. Email content includes session details, custom message from Host, and a unique link containing the `invitation_token` (e.g., `understandmeapp://join?token=UNIQUE_TOKEN`). (FR-SYS-NOTIF-001). This can be done via a Supabase Edge Function calling an email provider like SendGrid.
            *   Update `sessions.status` to `'invitations_sent'` or similar.
        *   **Supabase DB:** Stores `session_participants` records, `invitation_token`.
        *   **Notification System (Supabase Edge Function / PicaOS + Email Provider):** Handles actual dispatch of emails and creation of in-app notification records.
    *   ### Key Technical Considerations/Challenges
        *   **Invitation Tokens:** Generating secure, unique, and time-limited (optional) invitation tokens.
        *   **Email Delivery:** Reliable email sending via a third-party service (e.g., SendGrid, AWS SES) to avoid spam filters. Requires HTML email template design.
        *   **Deep Linking:** Ensuring deep links in emails correctly open the app and navigate to the invitation acceptance flow, passing the token.
        *   **In-App Notification Reliability:** Ensuring existing users receive in-app notifications promptly.
        *   **Error Handling & Retries:** Handling failures in sending individual invitations (e.g., invalid email address) and potentially retrying.
        *   **Scalability:** If a Host invites many participants, process invitations asynchronously to avoid client timeout. PicaOS can manage this queue.
        *   **Idempotency:** Ensure sending invitations again doesn't create duplicate `session_participants` records if some were already processed; use unique constraints on `(session_id, user_id)` and `(session_id, invited_email)`.
*   **FR-FLOW-HPS-010 (Get Shareable Link - UIDG 4.4):** The system must provide an option for the Host to get a unique, shareable link for the session.
    *   ### Frontend Development Outline
        *   Implement a "Get Shareable Link" button or icon on the "Add Participants" screen (UIDG 4.4.E) or "Track Invitation Status" screen (UIDG 4.5).
        *   On tap, call `sessionService.getShareableLink(sessionId)`.
        *   On success, display the link. Provide a "Copy to Clipboard" button (`Clipboard.setStringAsync()` from `expo-clipboard`).
        *   Show a Toast confirmation (Component 10.6) when link is copied.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `session_id`.
            *   Generates a unique, persistent shareable link for the session. This link should ideally not be one of the single-use invitation tokens for specific emails, but rather a general link to the session that might lead to a "Request to Join" flow if the user isn't already invited, or directly to the session if they are already an accepted participant.
            *   Alternatively, the link could be a simpler deep link like `understandmeapp://session?id=SESSION_ID`. The `sessions` table should have a unique, shareable `session_code` (human-friendly) or rely on the UUID `id`.
            *   The backend needs to ensure that when this link is used, it correctly routes the user (see FR-FLOW-PPJ-001, FR-FLOW-PPJ-002).
            *   If a new `shareable_session_token` is generated, it should be stored in the `sessions` table.
        *   **Supabase DB:** `sessions` table might store a `shareable_token` or rely on `session_code` / `id`.
    *   ### Key Technical Considerations/Challenges
        *   **Link Uniqueness & Security:** Ensure the link is unique per session. If it's a general link not tied to a specific invited email, consider the security implications (anyone with the link can attempt to join). This might necessitate a "Host Approval" step for users joining via a general shareable link if they aren't on the explicit invite list.
        *   **Deep Linking Robustness:** The deep link must reliably open the app and navigate to the correct session context.
        *   **User Experience for Link Recipient:** What the recipient sees when they open this link (e.g., session info, join button, request access button). This is covered in Participant Path FRs.
*   **FR-FLOW-HPS-011 (Track Invitation Status - UIDG 4.5):** The system must allow the Host to view the status of sent invitations (pending, accepted, declined) in real-time (fulfills FR-PER-HOS-007, FR-SYS-RT-003).
    *   ### Frontend Development Outline
        *   Implement the "Track Invitation Status" screen UI as per UIDG 4.5.
        *   Display a list (`<FlatList>`) of invited participants. Each item shows:
            *   Participant's email or name (if known).
            *   Assigned role (if applicable).
            *   Invitation status: "Pending," "Accepted," "Declined" (UIDG 4.5.A). This status is updated in real-time.
            *   UI elements for managing invitations (see FR-FLOW-HPS-012).
        *   Subscribe to Supabase Realtime updates on the `session_participants` table for the current `session_id` to reflect status changes live (as per FR-SYS-RT-003).
        *   `useEffect` hook to fetch initial participant list and statuses via `sessionService.getParticipantStatuses(sessionId)`.
        *   Handle loading and empty states.
    *   ### Backend/Serverless Development Outline
        *   **Supabase DB (`session_participants` table):** This table is the source of truth. It's updated when:
            *   Invitations are sent (`status = 'pending'`) - FR-FLOW-HPS-009.
            *   A participant accepts/declines (`status = 'accepted'/'declined'`) - FR-FLOW-PPJ-004.
        *   **Supabase Realtime (FR-SYS-RT-003):**
            *   The client subscribes to changes on `session_participants` filtered by `session_id`.
            *   When a participant's `invitation_status` is updated in the DB (by backend logic responding to participant actions), Realtime broadcasts this change to the subscribed Host client.
        *   **Supabase Edge Function (for initial fetch via `sessionService.ts`):**
            *   Fetches all records from `session_participants` for the given `session_id`.
            *   May join with `profiles` table to get participant names/avatars if they are existing users.
    *   ### Key Technical Considerations/Challenges
        *   **Real-time Updates:** Efficiently handling Realtime updates in the `<FlatList>` to avoid UI jank, especially with many participants. Keyed list items are crucial.
        *   **RLS for Realtime:** Ensure Row Level Security policies for Supabase Realtime are correctly configured so Hosts only receive updates for participants in *their* sessions (Dev Guide 3.4).
        *   **Initial Data Load:** Efficiently fetching the initial list of participants and their statuses.
        *   **Clarity of Statuses:** Using clear visual indicators (icons, colors) for different statuses.
*   **FR-FLOW-HPS-012 (Manage Invitations - UIDG 4.5):** The system must allow the Host to resend invitations or edit participant details for pending invitations.
    *   ### Frontend Development Outline
        *   On the "Track Invitation Status" screen (UIDG 4.5), for each participant with "Pending" status:
            *   Provide a "Resend Invitation" button/icon (UIDG 4.5.B).
            *   Provide an "Edit Details" button/icon (UIDG 4.5.C) - this might allow editing email or role.
            *   Provide a "Cancel Invitation" button/icon.
        *   **Resend Invitation:**
            *   On tap, show confirmation modal. If confirmed, call `sessionService.resendInvitation(sessionId, participantId)`.
            *   Show Toast feedback (Component 10.6).
        *   **Edit Details:**
            *   Opens a modal or navigates to a small editing screen pre-filled with participant's current email/role.
            *   Host makes changes and submits. Call `sessionService.editPendingInvitation(sessionId, participantId, newDetails)`.
        *   **Cancel Invitation:**
            *   On tap, show confirmation modal. If confirmed, call `sessionService.cancelInvitation(sessionId, participantId)`.
            *   UI updates to remove participant or mark as "Cancelled".
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   **Resend Invitation:**
                *   Receives `session_id` and `session_participant_id`.
                *   Retrieves participant's details (email, existing token) from `session_participants`.
                *   Triggers the email sending logic again (similar to FR-FLOW-HPS-009), possibly with a new token or reusing existing if still valid. Indicate it's a reminder.
            *   **Edit Details:**
                *   Receives `session_id`, `session_participant_id`, and `newDetails` (e.g., `newEmail`, `newRole`).
                *   Updates the corresponding record in `session_participants` table *only if status is still 'pending'*.
                *   If email is changed, may need to invalidate old token, generate a new one, and send a new invitation to the new email.
            *   **Cancel Invitation:**
                *   Receives `session_id` and `session_participant_id`.
                *   Updates `session_participants.invitation_status` to `'cancelled'` or deletes the record (soft delete preferred).
                *   This change will be broadcast via Supabase Realtime, updating Host's UI.
        *   **Supabase DB:** `session_participants` table is updated.
    *   ### Key Technical Considerations/Challenges
        *   **State Management:** Ensure that actions are only available for "Pending" invitations.
        *   **Security for Edits:** If editing email, this essentially creates a new invitation. Ensure this doesn't bypass any security or create orphaned tokens.
        *   **Idempotency for Resend:** Resending multiple times should not cause issues.
        *   **Audit Trail (Optional):** For more complex scenarios, might want an audit trail of invitation changes, though likely overkill for now.
        *   **User Experience:** Clear confirmation modals for destructive actions like cancelling an invitation.

### 4.4. Participant Path - Joining Session (UIDG Part 5; Mermaid P, AE-AI)
*   **FR-FLOW-PPJ-001 (Join via Code - UIDG 5.1):** The system must allow a participant to join a session by entering a valid, unique session code (fulfills FR-PER-PAR-001).
    *   ### Frontend Development Outline
        *   Implement the "Enter Session Code" screen UI as per UIDG 5.1.
        *   Provide a `<TextInput>` for the user to enter the session code (UIDG 5.1.A).
        *   Include a "Join" or "Submit" button (Component 10.8).
        *   On submit, call `sessionService.joinSessionByCode(sessionCode)`.
        *   Handle loading states (e.g., `<ActivityIndicator>`).
        *   On success (valid code, session found, user is either already invited or session is public/allows joining by code): Navigate to View Invitation Details (FR-FLOW-PPJ-003) or directly to session if appropriate.
        *   On failure (invalid code, session not found, not authorized): Display an error message (Toast - Component 10.6 or inline).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives the `session_code` from the client.
            *   Queries the `sessions` table in Supabase to find a session with a matching `session_code` (or other designated shareable ID).
            *   **Validation:**
                *   If no session found, return "not found" error.
                *   Check session status (e.g., must be `'invitations_sent'` or `'active'`).
                *   **Authorization:**
                    *   Check if the current user (if logged in) is already listed in `session_participants` for this session. If so, proceed.
                    *   If the session allows joining via a general code (public session or specific setting), and the user is not yet a participant, add them to `session_participants` with `invitation_status = 'accepted_via_code'` and a default role.
                    *   If the session is private and requires explicit invitation, and the user is not on the list, return "not authorized" error.
            *   If valid and authorized, return session details (similar to what's needed for FR-FLOW-PPJ-003) and participant status.
        *   **Supabase DB:** `sessions` table needs a queryable `session_code` field (indexed). `session_participants` table stores participant associations.
    *   ### Key Technical Considerations/Challenges
        *   **Session Code Uniqueness & Format:** Ensure `session_code` is unique and user-friendly (e.g., 6-8 alphanumeric characters, case-insensitive).
        *   **Security:** Prevent unauthorized access to sessions. The logic for who can join via code (anyone vs. only pre-invited) is critical.
        *   **Error Handling:** Clear error messages for invalid codes, non-existent sessions, or access denial.
        *   **Race Conditions:** If multiple users try to join a limited-slot public session via code simultaneously (less likely for this app's model but a general consideration for "join by code" systems).
*   **FR-FLOW-PPJ-002 (Join via Invitation Link - UIDG 5.2):** The system must allow a participant to access session details by opening a unique invitation link.
    *   ### Frontend Development Outline
        *   Configure deep linking for the Expo app to handle URLs like `understandmeapp://join?token=UNIQUE_TOKEN` or `https://understand.me/join?token=UNIQUE_TOKEN` (UIDG 5.2).
        *   When the app is opened via such a link, parse the `invitation_token` from the URL.
        *   Call `sessionService.getSessionDetailsByToken(invitationToken)`.
        *   Handle loading states.
        *   On success (valid token, session found): Navigate to View Invitation Details (FR-FLOW-PPJ-003), passing the fetched session and participant data.
        *   On failure (invalid token, session not found): Display an error message (e.g., "Invalid or expired invitation link") and guide user (e.g., to login or enter code screen).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives the `invitation_token`.
            *   Queries the `session_participants` table in Supabase to find a record with a matching `invitation_token`.
            *   **Validation:**
                *   If no record found, return "invalid token" error.
                *   Check if token has expired (if `invitation_token_expires_at` is implemented).
                *   Check current `invitation_status` (e.g., if already 'accepted' or 'declined', handle appropriately - perhaps show status or allow re-acceptance if declined).
            *   If valid, retrieve associated `session_id` and participant details (`user_id` if known, `invited_email`, `role`).
            *   Fetch full session details from the `sessions` table (title, description, host info by joining with `profiles`, associated `session_files`).
            *   Return all necessary data for FR-FLOW-PPJ-003. If the `user_id` in `session_participants` is null but `invited_email` matches the currently logged-in user's email, update `session_participants.user_id` to link them.
        *   **Supabase DB:** `session_participants` table stores `invitation_token` (indexed) and potentially `invitation_token_expires_at`.
    *   ### Key Technical Considerations/Challenges
        *   **Deep Linking Implementation:** Correctly configuring manifest files (iOS and Android) and using React Navigation's deep linking features. Thorough testing on both platforms is crucial.
        *   **Token Security & Expiry:** Ensuring invitation tokens are secure and managing their lifecycle (e.g., expiry, one-time use if desired after acceptance).
        *   **User Matching:** If a user opens a link but is not logged in, or logged in as a different user than the one associated with `invited_email`:
            *   If not logged in: Prompt to login/signup. After login, re-validate token against their now-known email.
            *   If logged in as different user: Inform them the invitation is for a different email and prompt to switch accounts or that they cannot accept.
        *   **Error Handling:** Clear messages for various error states (token invalid, expired, session cancelled).
*   **FR-FLOW-PPJ-003 (View Invitation Details - UIDG 5.2):** The system must display comprehensive session details from the invitation, including title, host, date/time, host's message, and any shared files (fulfills FR-PER-PAR-002).
    *   ### Frontend Development Outline
        *   Implement the "View Invitation Details" screen UI as per UIDG 5.2.
        *   This screen receives session data (fetched via token in FR-FLOW-PPJ-002 or code in FR-FLOW-PPJ-001) as navigation params or from a state store.
        *   Display:
            *   Session Title (UIDG 5.2.A)
            *   Host Name (and avatar if available) (UIDG 5.2.B)
            *   Scheduled Date/Time (UIDG 5.2.C)
            *   Host's custom invitation message (UIDG 5.2.D)
            *   List of shared multimedia files (UIDG 5.2.E). Each file should be viewable/playable as per FR-SYS-MM-003 (e.g., tap to open image, PDF, play audio/video). Use Component 10.3 for multimedia display.
        *   Provide "Accept" and "Decline" buttons (UIDG 5.3.A, covered by FR-FLOW-PPJ-004).
        *   If user is not logged in, some details might be shown, but "Accept/Decline" would require login/signup first.
    *   ### Backend/Serverless Development Outline
        *   Backend data provision is handled by the preceding FRs (FR-FLOW-PPJ-001 or FR-FLOW-PPJ-002). This FR is primarily about the client consuming and displaying that data.
        *   PicaOS/Edge Function (as part of `getSessionDetailsByToken` or `joinSessionByCode`):
            *   Ensures all necessary data fields (session title, description, host name from `profiles` table, custom message, file list with names/types/URLs from `session_files` and Supabase Storage) are included in the response to the client.
            *   For file URLs, generate signed URLs from Supabase Storage if files are private.
    *   ### Key Technical Considerations/Challenges
        *   **Data Presentation:** Clearly and concisely presenting all session information.
        *   **Multimedia File Handling:** Efficiently listing and providing access to view/play various multimedia types (as per FR-SYS-MM-003 and Component 10.3).
        *   **User Authentication State:** Handling scenarios where the user views this screen while logged out (e.g., from a web link) and needs to log in/sign up before they can accept/decline.
        *   **Host Information:** Displaying Host's name (and potentially avatar) requires joining `sessions` with `profiles` table on `host_id`.
*   **FR-FLOW-PPJ-004 (Accept/Decline Invitation - UIDG 5.3):** The system must allow a participant to accept or decline the session invitation. An optional reason for declining can be provided (fulfills FR-PER-PAR-003).
    *   ### Frontend Development Outline
        *   Implement "Accept" and "Decline" buttons on the "View Invitation Details" screen (UIDG 5.3.A).
        *   **Accept:**
            *   On tap, call `sessionService.acceptInvitation(invitationTokenOrParticipantId)`.
            *   On success, navigate to the next appropriate screen, which could be "Provide Perspective" (UIDG 5.4) if requested by Host, or a "Waiting for Session to Start" screen, or directly to the session if it's live and joinable.
            *   Show success Toast (Component 10.6).
        *   **Decline:**
            *   On tap, optionally show a modal (Component 10.7) allowing user to provide a reason for declining (UIDG 5.3.B - `<TextInput>`).
            *   Call `sessionService.declineInvitation(invitationTokenOrParticipantId, reason)`.
            *   On success, navigate to a confirmation screen or back to the main dashboard. Show Toast.
        *   Handle loading states for both actions.
        *   If user is not logged in, these buttons should first trigger login/signup flow.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   **Accept Invitation:**
                *   Receives `invitationTokenOrParticipantId` (if using participant ID, ensure current user is authorized).
                *   Validates the token or participant ID, finds the `session_participants` record.
                *   Updates `session_participants.invitation_status` to `'accepted'`.
                *   Updates `session_participants.user_id` to the current user's ID if it was null (e.g. user was invited via email but not registered yet).
                *   Returns success status and any relevant next step info (e.g., "perspective_required: true").
            *   **Decline Invitation:**
                *   Receives `invitationTokenOrParticipantId` and optional `reason`.
                *   Validates token/ID.
                *   Updates `session_participants.invitation_status` to `'declined'` and stores `decline_reason`.
                *   Returns success status.
            *   These status updates will trigger Realtime updates to the Host (FR-SYS-RT-003).
        *   **Supabase DB:** `session_participants` table is updated.
    *   ### Key Technical Considerations/Challenges
        *   **Authentication Requirement:** Ensure user is authenticated before they can accept/decline. The frontend flow needs to handle login/signup if needed, then resume the accept/decline action.
        *   **Token/ID Management:** Securely manage and validate the identifier used for accepting/declining.
        *   **State Transitions:** Correctly update participant status and ensure this is reflected for the Host in real-time.
        *   **Idempotency:** If a user tries to accept/decline multiple times, the system should handle it gracefully (e.g., no error if already in that state, or allow changing from declined to accepted if business logic permits).
*   **FR-FLOW-PPJ-005 (Provide Perspective - UIDG 5.4):** If requested by the host, the system must allow an accepted participant to submit their perspective on the session topic, including text and multimedia file uploads (fulfills FR-PER-PAR-004, FR-SYS-MM-001).
    *   ### Frontend Development Outline
        *   Implement the "Provide Your Perspective" screen UI as per UIDG 5.4.
        *   This screen is typically shown after "Accept Invitation" if the session configuration (fetched with invitation details) indicates `participant_perspective_required: true`.
        *   Provide a multi-line `<TextInput>` for the participant to enter their textual perspective (UIDG 5.4.A).
        *   Include multimedia upload functionality (UIDG 5.4.B) similar to FR-FLOW-HPS-001 (Component 10.3, `expo-document-picker`, `expo-image-picker`).
        *   Alex (text/voice) may offer guidance on what kind of information is helpful to share (UIDG 5.4.C, Component 10.2).
        *   "Submit Perspective" button: Calls `sessionService.submitParticipantPerspective(participantId, perspectiveText, fileList)`.
        *   "Skip for Now" button (if allowed by session config): Navigates to a waiting screen.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `session_participant_id` (identifying the participant's record in `session_participants`), `perspectiveText`, and an array of file references (Supabase Storage paths post-upload by client).
            *   Updates the `session_participants` record for the given participant, storing `perspective_text` and `perspective_submitted_at`.
            *   For each uploaded file, creates/updates entries in `session_files` linking them to this `session_participant_id` (or the `session_id` but with participant attribution) and the `session_id`. This reuses FR-SYS-MM-001 logic but attributes files to participant's perspective.
            *   (Fulfills FR-DATA-SESS-002 for these fields).
            *   This data will be used by PicaOS for pre-session synthesis (FR-FLOW-PREP-001).
        *   **Supabase Storage:** Stores uploaded multimedia files.
        *   **PicaOS for Alex's guidance:** Provides script/voice for Alex's tips.
    *   ### Key Technical Considerations/Challenges
        *   **Conditional Display:** This screen should only be shown if the Host configured the session to require participant perspectives.
        *   **Multimedia Uploads:** Same considerations as FR-FLOW-HPS-001 (file types, size, progress, errors - FR-SYS-MM-001, FR-SYS-MM-006).
        *   **Data Association:** Correctly associating submitted text and files with the specific participant's record for that session.
        *   **Deadline for Submission (Optional):** If there's a deadline before the session starts, UI should indicate this. Backend might prevent submission after deadline.
        *   **Editing Submitted Perspective (Optional):** Whether participants can edit their perspective after submitting it (adds complexity). For V1, likely submit-once.
*   **FR-FLOW-PPJ-006 (Configure Privacy Settings - UIDG 5.5):** Before their first session or when settings are updated, the system must allow a participant to configure personal privacy settings related to data usage, profile visibility, and AI analysis (fulfills FR-PER-PAR-005).
    *   ### Frontend Development Outline
        *   Implement the "Configure Privacy Settings" screen UI as per UIDG 5.5.
        *   This screen might be part of onboarding for new users, or accessed from User Settings, or shown contextually before their first session if not yet configured.
        *   Provide UI elements (e.g., `<Switch>` components, detailed explanations - Component 10.8) for settings like:
            *   Data usage for AI model training (Opt-in/Opt-out) (UIDG 5.5.A).
            *   Profile visibility to other participants (e.g., show full name, show avatar) (UIDG 5.5.B).
            *   Consent for specific types of AI analysis on their contributions (UIDG 5.5.C).
        *   Alex (text/voice) may explain each setting clearly (UIDG 5.5.D, Component 10.2).
        *   "Save Settings" button: Calls `userService.updatePrivacySettings(settings)`.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `userService.ts`):**
            *   Receives the privacy settings object from the client for the current user.
            *   Updates the user's record in the `profiles` table in Supabase, storing these preferences (e.g., in a JSONB column `privacy_settings` or individual boolean/enum columns).
            *   (Fulfills FR-DATA-PROF-005).
            *   PicaOS and other backend services (e.g., GenAI data processing pipelines) MUST query and respect these settings before processing user data or making it visible.
        *   **Supabase DB:** `profiles` table stores the privacy settings.
    *   ### Key Technical Considerations/Challenges
        *   **Clarity of Settings:** Privacy settings must be explained in simple, unambiguous language so users understand what they are consenting to.
        *   **Granularity vs. Simplicity:** Balancing the need for granular control with ease of understanding. Too many options can be overwhelming.
        *   **Enforcement:** Rigorously ensuring all backend processes (especially AI data handling and PicaOS orchestrations) check and adhere to these user preferences. This is a critical trust and compliance point.
        *   **Default Settings:** Define sensible, privacy-preserving default settings.
        *   **Accessibility of Settings:** Users should be able to easily find and change these settings at any time, not just during onboarding or pre-session.
        *   **Auditability (Future):** For compliance, logging changes to privacy settings might be considered.

### 4.5. Pre-Session Preparation (Converged Path) (UIDG Part 6; Mermaid AJ-AP)
*   **FR-FLOW-PREP-001 (AI Synthesizes Inputs - UIDG 6.1):** The system (PicaOS/GenAI) must synthesize the Host's description and any submitted Participant perspectives, including analysis of associated multimedia files, into a consolidated overview for the Host.
    *   ### Frontend Development Outline
        *   This is primarily a backend process. The frontend (Host's client) might display a loading indicator or message like "Alex is preparing a synthesis..." if this process is triggered actively by the Host and takes time.
        *   The results of this synthesis are displayed in FR-FLOW-PREP-002.
        *   The trigger for this might be after the Host indicates they have finished setup, or after a certain number of participants have submitted perspectives, or a scheduled time before the session.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Orchestrates the synthesis process. This can be triggered by various events (e.g., Host finalizes initial setup, participant submits perspective, scheduled job X minutes before session start).
            *   Retrieves all relevant data for the session from Supabase:
                *   Host's description context (`sessions.description_context`).
                *   All `session_participants.perspective_text` for those who submitted.
                *   References to all `session_files` associated with the session (Host's and Participants'), along with any existing AI analysis snippets for these files (e.g., image analysis from FR-FLOW-HPS-001.1, other multimedia analysis from FR-SYS-MM-004).
            *   Constructs a comprehensive prompt for Google GenAI (LLM). This prompt will instruct GenAI to:
                *   Summarize the Host's main points.
                *   Summarize each participant's perspective.
                *   Identify common themes across all inputs.
                *   Highlight key differences or potential areas of conflict/misunderstanding.
                *   Analyze sentiment (overall and potentially per participant).
                *   Incorporate relevant snippets or summaries from multimedia file analyses.
                *   Suggest adaptations or focus areas for the upcoming session based on this synthesis.
            *   Sends this comprehensive data and prompt to Google GenAI.
            *   Receives the structured synthesis from GenAI.
            *   Stores this synthesis in the `sessions` table (e.g., `sessions.ai_pre_session_synthesis_json`) (fulfills FR-DATA-SESS-005).
        *   **Google GenAI (LLM):** Performs the complex synthesis task based on PicaOS's prompt.
        *   **Supabase DB:** Stores all source data and the resulting synthesis.
        *   **Upstash Redis:** Could cache parts of the input data (e.g., multimedia analysis snippets) if frequently re-used by PicaOS during this process.
    *   ### Key Technical Considerations/Challenges
        *   **Complexity of AI Prompt:** Crafting a robust GenAI prompt that can handle varied inputs (multiple participants, missing perspectives, diverse multimedia) and produce a consistently useful synthesis is challenging.
        *   **Data Aggregation:** PicaOS needs to efficiently gather all required text and file analysis data.
        *   **Context Window Limits for GenAI:** The combined text from all perspectives and file analyses might exceed GenAI context window. PicaOS may need to employ strategies like:
            *   Summarizing individual perspectives/files first, then synthesizing summaries.
            *   Iterative synthesis if the volume of data is very large.
        *   **Latency:** This can be a computationally intensive AI task. Manage Host expectations. This process is likely asynchronous; PicaOS might notify the Host (e.g., via in-app notification or email through FR-SYS-NOTIF-001) when the synthesis is ready for review.
        *   **Cost:** Potentially large GenAI calls can be expensive. Optimize data sent to GenAI.
        *   **Partial Information:** Handling cases where some participants haven't submitted perspectives yet. The synthesis should note this.
*   **FR-FLOW-PREP-002 (Host Reviews Synthesis - UIDG 6.1):** The Host must be able to review the AI-generated synthesis, which includes identified common themes, areas of divergence, sentiment analysis, and suggested session adaptations.
    *   ### Frontend Development Outline
        *   Implement the "Review AI Synthesis" screen UI as per UIDG 6.1.
        *   Fetch the `sessions.ai_pre_session_synthesis_json` data (generated by FR-FLOW-PREP-001) via `sessionService.getPreSessionSynthesis(sessionId)`.
        *   Display the structured synthesis in a clear, digestible format (UIDG 6.1.A):
            *   Common themes (e.g., bullet points, cards).
            *   Areas of divergence (e.g., side-by-side comparison of conflicting points if possible, or highlighted statements).
            *   Overall sentiment and brief rationale.
            *   Suggested session adaptations or focus areas from Alex/AI.
        *   Alex (text/voice) may provide guidance on how to interpret and use this synthesis (UIDG 6.1.B, Component 10.2).
        *   Provide UI elements for Host to give feedback on this synthesis (similar to FR-FLOW-HPS-003, but for this specific synthesis product).
        *   "Next" button to proceed to establishing final goals/rules (FR-FLOW-PREP-003).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Primarily serves the stored `sessions.ai_pre_session_synthesis_json` data to the client.
            *   If feedback on this synthesis is submitted by the Host:
                *   Store this feedback in a dedicated table (e.g., `ai_synthesis_feedback`) linked to the `session_id` and synthesis version/timestamp. This is for ongoing AI model improvement.
        *   **Supabase DB:** Stores the synthesis JSON.
    *   ### Key Technical Considerations/Challenges
        *   **Data Presentation:** Crucial to present the potentially dense synthesis in an easily scannable and actionable format for the Host. UI should use accordions, expandable sections, or tabs if data is extensive.
        *   **Actionability:** The synthesis should empower the Host to make informed decisions about session goals, rules, and facilitation strategy.
        *   **Loading Large JSON:** Ensure efficient fetching and parsing of the synthesis JSON, which might be large.
        *   **Feedback Loop:** Capturing Host feedback on the quality and usefulness of this synthesis is important for refining PicaOS prompts and GenAI performance.
*   **FR-FLOW-PREP-003 (Host Establishes Final Goals & Rules - UIDG 6.2):** Based on the synthesis and AI suggestions, the Host must be able to define, edit, and confirm the final session goals and communication rules.
    *   ### Frontend Development Outline
        *   Implement the "Establish Final Goals & Rules" screen UI as per UIDG 6.2. This screen is similar to FR-FLOW-HPS-005 but is used *after* the AI synthesis is available.
        *   Display current goals and rules (potentially pre-filled from FR-FLOW-HPS-005 if this is an update, or blank if first time). Use editable lists of `<TextInput>` fields (UIDG 6.2.A, 6.2.B).
        *   Display AI suggestions for goals/rules (UIDG 6.2.C), which PicaOS now generates based on the comprehensive synthesis from FR-FLOW-PREP-001. Host can accept, reject, or modify these.
        *   Alex (text/voice) may explain why certain goals/rules are suggested based on the synthesis (Component 10.2).
        *   "Confirm Goals & Rules" button: Calls `sessionService.setFinalGoalsAndRules(sessionId, goals, rules)`.
        *   Navigation to next step (e.g., Share Goals/Rules - FR-FLOW-PREP-004, or to a pre-session lobby/waiting screen).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `session_id`, final list of goals, and final list of rules.
            *   Updates the `sessions` table, storing/overwriting `session_goals` and `session_rules` with these finalized versions (as per FR-FLOW-HPS-005 backend).
        *   **PicaOS for Alex's suggestions (FR-SYS-ALEX-007):**
            *   PicaOS uses the `sessions.ai_pre_session_synthesis_json` (from FR-FLOW-PREP-001) as input to Google GenAI (LLM) to generate more targeted and refined suggestions for goals and rules than in FR-FLOW-HPS-005.
            *   Returns these refined suggestions to the client.
        *   **Supabase DB:** `sessions` table's `session_goals` and `session_rules` fields are updated.
    *   ### Key Technical Considerations/Challenges
        *   **Refined AI Suggestions:** The key difference from FR-FLOW-HPS-005 is that AI suggestions here are based on a much richer, synthesized understanding of all parties' inputs. This should lead to higher quality suggestions.
        *   **UI for Modifying Lists:** User-friendly UI for editing, adding, deleting, and reordering goals/rules, and incorporating AI suggestions.
        *   **Persistence:** Ensuring the finalized goals and rules are correctly saved and will be used when the session starts.
*   **FR-FLOW-PREP-004 (Host Shares Goals/Rules - UIDG 6.2):** The system must allow the Host to optionally share the finalized goals and rules with participants before the session begins.
    *   ### Frontend Development Outline
        *   Implement a "Share Goals & Rules with Participants" option (e.g., a `<Switch>` or Checkbox - Component 10.8) on the "Establish Final Goals & Rules" screen (UIDG 6.2.D) or as a subsequent confirmation step.
        *   If the Host opts to share:
            *   Client calls `sessionService.shareGoalsAndRules(sessionId)`.
            *   Display a Toast confirmation (Component 10.6).
        *   This action doesn't block navigation to the next step (e.g., pre-session lobby or waiting for session start).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `session_id`.
            *   Retrieves the finalized `session_goals` and `session_rules` from the `sessions` table.
            *   Retrieves the list of accepted participants for this session from `session_participants` table.
            *   For each accepted participant:
                *   Send an in-app notification (FR-SYS-NOTIF-001): Create a record in `notifications` table for the target user. Notification content includes a message like "The Host has shared the goals and rules for session [Session Title]" and a way to view them (e.g., deep link to a screen showing goals/rules, or include them directly in notification data).
                *   Optionally, send an email notification if user preferences allow and if this is a significant update.
            *   Update a flag in the `sessions` table, e.g., `goals_rules_shared_at = NOW()`, for informational purposes.
    *   ### Key Technical Considerations/Challenges
        *   **Notification Content:** Deciding how much detail of goals/rules to include in the notification itself versus linking to a screen in the app.
        *   **Timing of Sharing:** When this option is presented to the Host and when notifications are sent (immediately vs. scheduled closer to session).
        *   **Participant Experience:** How participants view the shared goals/rules (e.g., a dedicated screen, part of the pre-session lobby).
        *   **Avoiding Notification Spam:** If goals/rules are updated and re-shared, consider if new notifications are needed or if the previous ones are sufficient/updated.
*   **FR-FLOW-PREP-005 (Same-Device Setup Initiation - UIDG 6.3):** The system must allow a user (typically Host) to initiate same-device mode for a session and specify the number of local participants.
    *   ### Frontend Development Outline
        *   Implement the "Same-Device Setup Initiation" screen UI as per UIDG 6.3.A.
        *   This screen is typically accessed by the Host from a pre-session lobby or session management screen.
        *   Provide an option (e.g., a Button) "Start Same-Device Mode".
        *   If selected, prompt the Host to enter the number of local participants (e.g., using a `<TextInput type="numeric">` or a Stepper component - Component 10.8).
        *   "Continue" button calls `sessionService.initiateSameDeviceMode(sessionId, numberOfLocalParticipants)`.
        *   Navigate to the Same-Device User Identification screen (FR-FLOW-PREP-006).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `session_id` and `numberOfLocalParticipants`.
            *   Updates the `sessions` table for the given `session_id` to set `mode = 'same_device'` and store `num_local_participants`.
            *   May also create placeholder records in `session_participants` for local users if they need to be tracked distinctly (e.g., `local_user_1`, `local_user_2`) with a special role or flag. Alternatively, local participant details are only managed client-side until they speak.
        *   **Supabase DB:** `sessions` table updated. Potentially `session_participants` table as well.
    *   ### Key Technical Considerations/Challenges
        *   **Mode Switching:** If a session was previously set for remote participants, initiating same-device mode might involve UI changes or notifications to any already joined remote users (complex, likely for a later version. V1 might assume mode is set once).
        *   **Participant Count:** Validate the number of local participants (e.g., must be >= 1).
        *   **Data Model for Local Users:** Decide how local, non-registered participants are represented in `session_participants` if at all, versus just temporary client-side state for speaker attribution. For same-device tap-to-talk, a client-side list of names might be sufficient initially.
*   **FR-FLOW-PREP-006 (Same-Device User Identification - UIDG 6.3):** Each local participant on a shared device must be able to enter their name for speaker attribution.
    *   ### Frontend Development Outline
        *   Implement the "Same-Device User Identification" screen UI as per UIDG 6.3.B.
        *   Dynamically display a number of `<TextInput>` fields based on `numberOfLocalParticipants` set in FR-FLOW-PREP-005.
        *   Each input field allows a local participant to enter their name (e.g., "User 1: [Name Input]", "User 2: [Name Input]").
        *   Alex (text/voice) can guide this process (e.g., "Please pass the device around so each person can enter their name.").
        *   Store these names in a client-side array (e.g., Zustand `sameDeviceStore.localParticipantNames`).
        *   "Continue" button proceeds to the next step (Mini-Assessment if needed, or Tap-to-Talk Training).
    *   ### Backend/Serverless Development Outline
        *   No direct backend interaction is required for this step if names are only used for client-side speaker attribution during the session.
        *   If these local names need to be stored more permanently (e.g., if they might be linked to full profiles later, or if PicaOS needs to know them for some advanced same-device specific AI logic), then the list of names could be sent to PicaOS/Supabase Edge Function to update the placeholder `session_participants` records or a JSON field in the `sessions` table. This is less likely for V1.
    *   ### Key Technical Considerations/Challenges
        *   **UI for Dynamic Inputs:** Generating the correct number of input fields and managing their state.
        *   **Clarity of Instruction:** Ensuring users understand to pass the device.
        *   **Name Uniqueness (Local):** Decide if local names need to be unique within the session. Client-side validation can check for this if required.
        *   **Persistence of Names:** For V1, these names might just be for the current session's UI. If they need to persist beyond the session or be used in reports, backend storage is needed.
*   **FR-FLOW-PREP-007 (Same-Device Mini-Assessment - UIDG 6.3):** If a local participant on a shared device is new or lacks assessment data, the system must provide a brief, sequential conversational personality assessment for them.
    *   ### Frontend Development Outline
        *   Implement the "Same-Device Mini-Assessment" UI as per UIDG 6.3.C.
        *   This flow is triggered sequentially for each local participant identified in FR-FLOW-PREP-006 *if* they are determined to be "new" (i.e., not a registered user or no existing assessment data linked to their provided name, if such linking is attempted).
        *   The UI will be similar to the main Conversational Personality Assessment (FR-FLOW-OB-004), presenting Alex's questions (text/voice) and allowing text/voice responses for the current local participant.
        *   Indicate clearly whose turn it is for the assessment (e.g., "Alex is now talking to [Local Participant Name]").
        *   Store assessment responses locally (e.g., Zustand `sameDeviceStore.localParticipantAssessments[index]`).
        *   Allow skipping the assessment for an individual local participant.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Provides the question sequence and Alex's scripts/voice for the mini-assessment (similar to FR-FLOW-OB-004.1 but potentially a shorter version).
            *   Receives responses (text or STT from voice) for each local participant.
            *   **Data Storage:** This is a key decision.
                *   **Option 1 (Ephemeral):** Assessment results for local, non-registered users are only used by PicaOS/GenAI *during the upcoming session* for dynamic adaptation and not stored long-term against a persistent profile. The results might be cached in Upstash Redis by PicaOS for the session's duration.
                *   **Option 2 (Link to Host/Session):** Assessment results could be stored in a JSON field in `session_participants` (if placeholder records were made) or `sessions` table, associated with the local participant's entered name and the session_id. This makes them retrievable if the same local user joins another session *hosted by the same Host* who might remember them, but doesn't create full profiles.
                *   Creating full, separate user profiles for anonymous local participants is generally not desirable without explicit sign-up.
        *   **Google GenAI/ElevenLabs:** Provide questions, scripts, and voice.
    *   ### Key Technical Considerations/Challenges
        *   **Identifying "New" Local Users:** How to determine if a local participant needs the assessment. If names are the only identifier, it's unreliable for knowing if they've used the app before. The simplest approach is to offer it to all local participants in same-device mode or make it optional.
        *   **Assessment Length:** Mini-assessment should be significantly shorter than the full onboarding assessment.
        *   **Data Privacy for Local Users:** Be transparent about how their assessment responses will be used and stored, even if ephemerally for the session.
        *   **User Experience:** Smoothly transitioning the device and assessment context from one local participant to the next.
        *   **Skipping:** Allowing individual local users to skip their assessment without disrupting the flow for others.
*   **FR-FLOW-PREP-008 (Same-Device Tap-to-Talk Training - UIDG 6.3):** The system must guide all users on the shared device through an interactive training on the tap-to-talk mechanism.
    *   ### Frontend Development Outline
        *   Implement the "Same-Device Tap-to-Talk Training" UI as per UIDG 6.3.D and Component 10.4.
        *   This is an interactive tutorial step. Alex (text/voice) explains the tap-to-talk mechanism:
            *   How to select their name from a list/carousel of local participants.
            *   How to tap and hold the microphone button to speak.
            *   How to release to stop recording.
            *   Visual cues during recording (e.g., mic icon changes, timer).
        *   The UI presents a mock microphone button and a list of the entered local participant names.
        *   Each local participant takes a turn:
            *   Selects their name.
            *   Taps and holds the mock microphone, says a short phrase.
            *   Releases. The app gives feedback (e.g., "Great! Alex heard you, [Participant Name].").
        *   Alex guides each user through this.
        *   "Finish Training" button appears after all local participants have successfully tried it.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Provides Alex's scripts/voice for guiding the training.
            *   Does not need to process audio for this training, as it's purely a client-side UI/interaction drill.
        *   **Google GenAI/ElevenLabs:** Provide scripts/voice for Alex.
    *   ### Key Technical Considerations/Challenges
        *   **Clear Instructions:** Alex's guidance must be very clear and simple for users who might be new to this interaction model.
        *   **Interactive Feedback:** Providing immediate and positive feedback on the client-side when users correctly perform the tap-to-talk actions.
        *   **Turn Management for Training:** Ensuring each local participant gets a chance to try it.
        *   **Error Simulation (Optional):** Could simulate common errors (e.g., not holding long enough) and Alex provides corrective tips, but this might overcomplicate V1.
        *   **Component Reusability:** The tap-to-talk UI (Component 10.4) used here should be the same one used during the actual session.

### 4.6. AI-Mediated Session Core (The Five Phases) (UIDG Part 7; Mermaid AX-BE)
*   **FR-FLOW-SESS-C001 (Common: Display Session Info - UIDG 7.1):** The system must persistently display current session title, current phase, and relevant timers.
    *   ### Frontend Development Outline
        *   Implement a persistent header or status bar area within the main session interface (UIDG 7.1.A).
        *   Display:
            *   Session Title: Fetched from `sessionStore.currentSession.title`.
            *   Current Phase: Fetched from `sessionStore.currentPhase` (e.g., "Express Phase"). This is updated by PicaOS directives.
            *   Relevant Timers:
                *   Overall session timer (optional, if sessions are time-bound).
                *   Current phase timer (e.g., "Express Phase ends in 10:32").
                *   Individual speaking turn timer (during Express Phase - UIDG 7.3.C).
        *   Timers should update in real-time based on data from PicaOS (received via Realtime or API calls and stored in Zustand `sessionStore`).
        *   Use `<Text>` components for display, styled for clarity.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Manages session state, including current phase and associated timers (FR-SYS-ALEX-008).
            *   Sends updates to the client via Supabase Realtime (or polled API calls) when phase changes or timers are initiated/updated. Example Realtime message: `{ type: 'PHASE_UPDATE', phase: 'Express', duration_seconds: 600 }` or `{ type: 'TURN_TIMER_UPDATE', user_id: 'xxx', remaining_seconds: 120 }`.
            *   Persists current phase and potentially remaining time in `sessions` table or a PicaOS-managed cache (Upstash Redis) for resilience.
        *   **Supabase DB:** `sessions` table stores overall session configuration like title. `session_state_cache` (or similar in Redis) might store dynamic state like current phase timer values if PicaOS needs to persist them beyond its own memory.
    *   ### Key Technical Considerations/Challenges
        *   **Real-time Timer Synchronization:** Ensuring timers are reasonably synchronized across all participants and with PicaOS master state, accounting for network latency. PicaOS is the source of truth.
        *   **Timer Accuracy:** Client-side timers should be driven by server-sent target end times or durations to avoid drift due to client performance.
        *   **UI Clarity:** Displaying multiple timers without cluttering the UI. Prioritize the most relevant timer for the current context.
        *   **State Management:** Client needs to efficiently update UI from timer events pushed by PicaOS.
*   **FR-FLOW-SESS-C002 (Common: Alex's Presence - UIDG 7.1):** Alex's avatar and text guidance must be present and contextually relevant throughout all phases.
    *   ### Frontend Development Outline
        *   Implement Alex's avatar and speech bubble UI (Component 10.2) as a persistent element in the session interface (UIDG 7.1.B).
        *   Alex's text script is received from PicaOS (via Realtime or API calls) and displayed in the speech bubble.
        *   If voice output is available for Alex's script (URL provided by PicaOS), play it using `expo-av` (Component 10.2). Manage playback states (play, pause, stop, loading indicator for audio).
        *   The content of Alex's guidance (script and voice) will change based on the current session phase, user actions, or PicaOS-driven interventions.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Core logic for determining Alex's script based on session state (current phase, user inputs, timers, etc.) resides in PicaOS (FR-SYS-ALEX-004).
            *   PicaOS constructs scripts for Alex (potentially using Google GenAI for dynamic, context-aware messages).
            *   Sends scripts to ElevenLabs for TTS (FR-SYS-ALEX-002), possibly with emotional nuances (FR-SYS-ALEX-003).
            *   PicaOS sends `{ alexScript: "...", alexVoiceUrl: "...", emotion_suggestion: "empathetic" }` object to clients via Supabase Realtime (e.g., as part of a general `SESSION_UI_UPDATE` message type or a specific `ALEX_MESSAGE` type).
        *   **Google GenAI/ElevenLabs:** Provide scripting and TTS capabilities.
        *   **Upstash Redis:** PicaOS may cache common Alex phrases/audio URLs to reduce latency and API calls.
    *   ### Key Technical Considerations/Challenges
        *   **Contextual Relevance:** Ensuring Alex's guidance is always relevant to the current point in the session is a primary challenge for PicaOS logic and GenAI prompt design.
        *   **Minimizing Latency:** Alex's spoken guidance should ideally have low latency after a triggering event. Pre-fetching or caching common responses is key.
        *   **Natural Interaction:** Balancing proactive guidance from Alex with avoiding being overly intrusive or chatty. User testing will be important.
        *   **Voice Variety/Emotion:** Effectively using ElevenLabs' emotional nuance capabilities to make Alex more engaging (FR-SYS-ALEX-003).
        *   **Error Handling:** What Alex says if its backend logic encounters an error.
*   **FR-FLOW-SESS-C003 (Common: Real-time Transcript - UIDG 7.1):** The system must display a real-time, scrollable transcript of spoken and typed contributions, with speaker attribution.
    *   ### Frontend Development Outline
        *   Implement a scrollable transcript area as a central part of the session UI (UIDG 7.1.C).
        *   Use an optimized `<FlatList>` or similar component to render transcript entries.
        *   Each entry displays:
            *   Speaker's name (or "You" for self, or local participant name in same-device mode).
            *   Timestamp (optional, or on hover/tap).
            *   The transcribed text content.
        *   Subscribe to Supabase Realtime channel for new `session_messages` for the current `session_id` (as per FR-SYS-RT-001).
        *   Append new messages to the list, maintaining scroll position (auto-scroll for new messages unless user has scrolled up).
        *   Style entries differently for current user, other users, and Alex for readability.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   When user speaks (remote mode): Receives audio via `expo-av` stream (FR-SYS-ALEX-001), sends to Google GenAI STT. The resulting transcript segment is then inserted into `session_messages` by PicaOS.
            *   When user speaks (same-device mode via tap-to-talk Component 10.4): Client sends audio and selected speaker name to PicaOS. PicaOS -> STT -> `session_messages` with correct speaker name.
            *   When user types text (FR-FLOW-SESS-C005): Client sends text and speaker to PicaOS. PicaOS inserts into `session_messages`.
            *   When Alex speaks (FR-FLOW-SESS-C002): PicaOS inserts Alex's script into `session_messages`.
        *   **Supabase DB:** `session_messages` table stores all transcript entries, including `session_id`, `user_id` (or `local_participant_name`), `speaker_type` ('user' or 'alex'), `message_text`, `timestamp`. (Fulfills FR-DATA-SESS-003).
        *   **Supabase Realtime:** Broadcasts new inserts on `session_messages` to all subscribed clients in the session (FR-SYS-RT-001).
    *   ### Key Technical Considerations/Challenges
        *   **Real-time Performance:** Efficiently rendering new transcript messages and maintaining smooth scrolling in the `<FlatList>` is critical. Virtualization is key.
        *   **Speaker Attribution:** Reliably attributing text to the correct speaker, especially in same-device mode (depends on client sending correct speaker name with audio).
        *   **Message Ordering:** Ensuring messages appear in the correct chronological order, even with potential minor network latency variations (Supabase Realtime helps, but client might need to sort by timestamp if strict order is occasionally off).
        *   **Transcript Accuracy (STT):** Quality of STT from Google GenAI directly impacts transcript usefulness.
        *   **Scroll Management:** User-friendly auto-scrolling that pauses when the user manually scrolls up to review history.
        *   **Accessibility:** Ensure transcript is accessible to screen readers.
*   **FR-FLOW-SESS-C004 (Common: Multimedia Context Access - UIDG 7.1):** Participants must be able to access relevant, previously uploaded multimedia files during the session.
    *   ### Frontend Development Outline
        *   Implement a UI element (e.g., a button/icon for "Shared Files" or "Contextual Materials") in the session interface (UIDG 7.1.D).
        *   Tapping this opens a modal or a side panel (Component 10.7 or new screen) displaying a list of multimedia files shared by the Host (FR-FLOW-HPS-001) or participants (FR-FLOW-PPJ-005, FR-FLOW-SESS-P2-003).
        *   Each file entry should show filename, type (icon), and uploader (Host/participant name).
        *   Tapping a file allows viewing/playback as per FR-SYS-MM-003 (using `react-native-pdf`, `expo-av` `<Image>`, etc. - Component 10.3).
        *   Fetch list of files via `sessionService.getSessionFiles(sessionId)`.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `session_id`.
            *   Queries `session_files` table, joining with `profiles` (for uploader name if registered user) or using `session_participants.local_name` if available for uploader.
            *   Returns a list of file objects including `file_name`, `file_type`, `uploader_name`, and secure Supabase Storage URL (signed URL if private).
            *   (Optionally) If Nodely/IPFS is used for some files, return IPFS CID and gateway link (FR-SYS-MM-005).
        *   **Supabase DB:** `session_files` table stores metadata.
        *   **Supabase Storage:** Hosts the files.
    *   ### Key Technical Considerations/Challenges
        *   **Access Control:** Ensure only files intended for sharing within this session are listed. RLS on `session_files` is key.
        *   **File Viewing/Playback:** Integrating viewers/players for various supported multimedia types within the app (FR-SYS-MM-003).
        *   **Performance:** Efficiently loading the list of files and handling large file streaming/display without impacting session performance.
        *   **UI for File List:** Clear and intuitive UI for browsing and accessing files, especially if the list is long.
*   **FR-FLOW-SESS-C005 (Common: Text Input - UIDG 7.1):** Participants must be able to contribute via text input at appropriate times.
    *   ### Frontend Development Outline
        *   Implement a `<TextInput>` field and "Send" button within the session interface (UIDG 7.1.E).
        *   This may be always visible or shown contextually (e.g., during user's speaking turn, or if voice input fails, or if session rules allow text contributions anytime).
        *   When text is submitted:
            *   Client sends the text message and current speaker identifier (user_id or local_participant_name) to PicaOS via `sessionService.sendTextMessage(sessionId, messageText, speakerId)`.
            *   The message is added to the local transcript UI optimistically (or waits for Realtime echo).
            *   Clear the TextInput field.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `sessionId`, `messageText`, and `speakerId`.
            *   Validates that the user is allowed to send a text message at this time (based on session phase, turn management rules enforced by PicaOS).
            *   If allowed, PicaOS inserts the message into the `session_messages` table in Supabase, with `speaker_id` and `message_text`.
            *   This insert will be broadcast by Supabase Realtime to all clients, including the sender, for transcript update (FR-SYS-RT-001, FR-FLOW-SESS-C003).
        *   **Supabase DB:** `session_messages` table stores the text message.
    *   ### Key Technical Considerations/Challenges
        *   **Input Authorization:** PicaOS must enforce when text input is allowed (e.g., only during user's turn in Express phase, or freely in a brainstorming phase). Unauthorized messages should be rejected.
        *   **Real-time Display:** Ensure text messages appear promptly in all participants' transcripts.
        *   **Accessibility:** Ensure text input field and send button are accessible.
        *   **Integration with Voice:** How text input interplays with voice input (e.g., if a user can switch modes). Is text input a primary mode or a fallback/alternative?
*   **FR-FLOW-SESS-C006 (Common: Same-Device Controls - UIDG 7.1):** If in same-device mode, specific tap-to-talk and turn management UI must be active and functional.
    *   ### Frontend Development Outline
        *   Implement the Same-Device Mode UI elements as per UIDG 7.1.F and Component 10.4.
        *   This includes:
            *   A clear indicator that the session is in "Same-Device Mode."
            *   A participant selector (e.g., dropdown, carousel of names entered in FR-FLOW-PREP-006) allowing the current person holding the device to identify themselves before speaking.
            *   The tap-to-talk microphone button (Component 10.4.A).
            *   Visual feedback during recording (mic animation, timer - Component 10.4.B).
            *   Display of whose turn it is, if turn-taking is enforced by Alex/PicaOS.
        *   When tap-to-talk is used:
            *   Capture audio via `expo-av`.
            *   Send audio data along with the selected `local_participant_name` to PicaOS for STT and processing (as per FR-FLOW-SESS-C003 backend).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Receives audio stream + `local_participant_name` from client.
            *   Performs STT via Google GenAI.
            *   Inserts transcript into `session_messages` attributing it to the `local_participant_name` (and `user_id` of the Host who initiated same-device mode, for session association).
            *   Manages speaking turns if applicable for the current phase, using `local_participant_name` for turn allocation.
        *   **Supabase DB:** `session_messages.local_participant_name` column might be used to store the speaker's entered name for same-device contributions. `session_messages.user_id` would still point to the Host or primary logged-in user on the device.
    *   ### Key Technical Considerations/Challenges
        *   **Speaker Identification:** Critical that the correct local participant name is selected before speaking for accurate attribution in transcript and for Alex's understanding of who said what.
        *   **UI for Name Selection:** Easy and quick way for users to select their name before speaking.
        *   **Turn Management Cues:** If PicaOS enforces turns, UI must clearly show whose turn it is and who is currently selected/speaking.
        *   **Audio Quality:** Same-device mode might be prone to more ambient noise or users speaking at different distances from the microphone.
        *   **No Separate Logins:** Same-device mode assumes local participants don't have separate logins. All data is associated with the primary user's session but attributed via names.
*   **FR-FLOW-SESS-P1-001 (Prepare: Welcome & Review - UIDG 7.2):** Alex must welcome participants and reiterate agreed-upon session goals and rules.
    *   ### Frontend Development Outline
        *   Implement the "Prepare Phase" UI as per UIDG 7.2.
        *   On phase start (signaled by PicaOS), display Alex's welcome message (text/voice) (UIDG 7.2.A, Component 10.2).
        *   Display the session goals and rules (fetched from `sessionStore.currentSession.goals` and `sessionStore.currentSession.rules`) in a read-only format (UIDG 7.2.B). This data was finalized in FR-FLOW-PREP-003.
        *   Include a "Ready" or "Acknowledge" button for FR-FLOW-SESS-P1-002.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Initiates the "Prepare" phase.
            *   Constructs Alex's welcome script (e.g., "Welcome everyone to the session on [Session Title]! Let's quickly review our goals and rules.").
            *   Sends script to ElevenLabs for TTS.
            *   Sends Alex's message (script, voice URL) and phase update to clients via Supabase Realtime: `{ type: 'PHASE_UPDATE', phase: 'Prepare', alexMessage: { script: "...", voiceUrl: "..." }, goals: [...], rules: [...] }`. The goals and rules are pulled from the `sessions` table.
        *   **Supabase DB:** `sessions` table contains `session_goals` and `session_rules`.
    *   ### Key Technical Considerations/Challenges
        *   **Smooth Transition:** Ensure a smooth UI transition into the Prepare phase.
        *   **Clarity of Goals/Rules:** Display goals and rules clearly. If extensive, use a scrollable view.
        *   **Alex's Delivery:** Welcome message should be warm and set a positive tone.
*   **FR-FLOW-SESS-P1-002 (Prepare: Readiness Confirmation - UIDG 7.2):** Participants must be able to signal their readiness to start the session.
    *   ### Frontend Development Outline
        *   Provide a "Ready" or "Acknowledge" button on the Prepare Phase screen (UIDG 7.2.C).
        *   Button might initially be disabled until Alex finishes speaking or after a short delay.
        *   On tap, client sends a readiness signal to PicaOS: `sessionService.signalReadiness(sessionId, userId)`.
        *   The button might change state to "Waiting for others..." after being pressed.
        *   UI should display how many participants are ready / total (e.g., "3/5 participants ready"). This info is received from PicaOS via Realtime.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Receives readiness signal (`sessionId`, `userId`) from a client.
            *   Updates internal state/cache (e.g., Upstash Redis set for `session:<id>:ready_users`) to track who has signaled readiness.
            *   Broadcasts updated readiness count to all clients via Supabase Realtime: `{ type: 'READINESS_UPDATE', ready_count: X, total_participants: Y }`.
            *   When `ready_count` equals `total_participants` (or a quorum, or after a timeout if Host can override):
                *   PicaOS automatically transitions the session to the next phase (Express Phase).
                *   Sends new phase update message: `{ type: 'PHASE_UPDATE', phase: 'Express', ... }`.
        *   **Upstash Redis (Optional):** Can store the set of ready users for a session for quick checks by PicaOS.
        *   **Supabase DB:** `session_participants` table could have a `is_ready_for_express` boolean flag, updated by PicaOS.
    *   ### Key Technical Considerations/Challenges
        *   **Synchronization:** Ensuring all participants see a consistent readiness count.
        *   **Transition Logic:** PicaOS needs robust logic to determine when to move to the next phase (all ready, quorum, Host override).
        *   **Host Override (Optional):** Should the Host be able to manually advance the phase if not all participants signal readiness after a certain time? This adds complexity.
        *   **Visual Feedback:** Clear UI indication of who is ready and who is still pending, if detailed view is desired (more complex than just counts).
*   **FR-FLOW-SESS-P2-001 (Express: Turn Management - UIDG 7.3):** Alex must manage speaking turns, ensuring each participant has a dedicated opportunity to express their perspective.
    *   ### Frontend Development Outline
        *   Implement the "Express Phase" UI as per UIDG 7.3.
        *   Display whose turn it is currently (e.g., "Speaking: [Participant Name]" or "[Local Participant Name]") based on PicaOS signals (UIDG 7.3.A).
        *   Display the speaking turn timer for the current speaker (UIDG 7.3.C), driven by PicaOS signals (FR-FLOW-SESS-C001).
        *   For remote users: Enable microphone input (Component 10.1) only for the participant whose turn it is. Other participants' mics are disabled.
        *   For same-device mode: The participant selector (FR-FLOW-SESS-C006, Component 10.4) is used. PicaOS signals whose turn it is; users should select their name before tapping to talk. UI might highlight the name of the person whose turn PicaOS indicates.
        *   Alex (text/voice) announces whose turn it is to speak (UIDG 7.3.B).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Manages the speaking order (e.g., round-robin, Host-defined, or dynamically adjusted based on personality assessment data for balance).
            *   Determines current speaker and remaining time for their turn (FR-SYS-ALEX-008).
            *   Sends Realtime messages to all clients: `{ type: 'TURN_UPDATE', current_speaker_id: 'xxx', current_speaker_name: 'Yyy', turn_ends_at: <timestamp> }`.
            *   When a turn ends (timer expires or user signals done): PicaOS selects the next speaker and sends a new `TURN_UPDATE`.
            *   If a user tries to speak out of turn (PicaOS detects audio from unexpected `user_id` or `local_participant_name`), PicaOS can script Alex to gently intervene (e.g., "Let's allow [Current Speaker] to finish their thoughts.").
        *   **Upstash Redis:** PicaOS can use Redis to store the speaking queue/order and current turn state for distributed consistency if PicaOS itself is distributed or needs persistence.
    *   ### Key Technical Considerations/Challenges
        *   **Turn Logic:** Implementing fair and flexible turn-taking logic in PicaOS.
        *   **Real-time Signaling:** Low-latency signaling of turn changes to all clients.
        *   **Muting/Unmuting (Remote):** Reliably controlling microphone access for remote participants based on whose turn it is.
        *   **Same-Device Coordination:** Clearly guiding users in same-device mode to select their name and respect turns. PicaOS relies on the client sending the correct `local_participant_name` with audio.
        *   **Interruption Handling:** Gracefully managing interruptions or users speaking over each other, with Alex's intervention.
*   **FR-FLOW-SESS-P2-002 (Express: Input Capture - UIDG 7.3):** The system must capture the active speaker's input (voice via STT, or text) and add it to the transcript.
    *   ### Frontend Development Outline
        *   **Voice Input (Remote user, their turn):**
            *   Use `expo-av` to capture audio (Component 10.1).
            *   Stream audio data to PicaOS for STT (FR-SYS-ALEX-001).
            *   Visual feedback during recording (e.g., mic icon, waveform).
        *   **Voice Input (Same-Device user, their turn after selecting name):**
            *   Use tap-to-talk component (Component 10.4).
            *   Client captures audio via `expo-av`.
            *   Sends audio data and selected `local_participant_name` to PicaOS.
        *   **Text Input (if allowed by PicaOS rules for current turn/phase):**
            *   Use text input field and send button (FR-FLOW-SESS-C005, UIDG 7.1.E).
            *   Sends text message with speaker ID to PicaOS.
        *   Transcript display is handled by FR-FLOW-SESS-C003.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Receives audio data (with `user_id` for remote, or `user_id` of Host + `local_participant_name` for same-device) or text data (with `user_id` or `local_participant_name`).
            *   **For Audio:** Forwards to Google GenAI STT (FR-SYS-ALEX-001).
            *   Once text is available (either from STT or direct text input):
                *   Validates that the input is from the current designated speaker (as per `TURN_UPDATE` from PicaOS).
                *   If valid, inserts the message into `session_messages` table in Supabase, including speaker identifiers and timestamp (FR-DATA-SESS-003).
            *   The insert into `session_messages` triggers Realtime broadcast for transcript update (FR-FLOW-SESS-C003).
        *   **Google GenAI STT:** Performs speech-to-text.
        *   **Supabase DB:** Stores the message in `session_messages`.
    *   ### Key Technical Considerations/Challenges
        *   **STT Accuracy & Latency:** As with all voice input.
        *   **Speaker Attribution:** Correctly associating the captured input with the designated speaker, especially crucial in same-device mode.
        *   **Input Validation:** PicaOS must validate that input is coming from the participant whose turn it is. Out-of-turn inputs might be discarded or handled with an Alex intervention.
        *   **Network Issues:** Handling potential interruptions in audio streaming or text message delivery. Resumable uploads or client-side queuing with retries might be needed for robustness.
        *   **Data Integrity:** Ensuring `session_messages` accurately reflects who said what and when.
*   **FR-FLOW-SESS-P2-003 (Express: File Sharing - UIDG 7.3):** The active speaker must be able to share relevant multimedia files during their turn, which are then added to the session's context.
    *   ### Frontend Development Outline
        *   Provide a "Share File" button/icon for the active speaker (UIDG 7.3.D). This button is enabled only for the user whose turn it is.
        *   Uses `expo-document-picker` / `expo-image-picker` for file selection (Component 10.3), similar to FR-SYS-MM-001.
        *   Client uploads selected file(s) directly to Supabase Storage.
        *   Displays upload progress (Component 10.3, FR-SYS-MM-006).
        *   On successful upload, client sends file metadata (Supabase Storage path, file type, name, uploader ID) to PicaOS: `sessionService.shareFileInSession(sessionId, fileDetails)`.
        *   PicaOS then informs other participants about the new file via a Realtime message, and it becomes available in the "Shared Files" list (FR-FLOW-SESS-C004).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `sessionId` and `fileDetails` (storage path, type, name, uploader_id which is the current speaker).
            *   Validates that the uploader is the current active speaker.
            *   Creates a new record in `session_files` table, linking file to `session_id`, `uploader_id` (user_id of speaker), `file_path`, `file_type`. (Fulfills FR-DATA-SESS-004).
            *   PicaOS sends a Realtime message to all clients: `{ type: 'NEW_FILE_SHARED', file: { name: "...", type: "...", uploaderName: "..." } }`. This prompts clients to refresh their shared file list (FR-FLOW-SESS-C004) or dynamically add to it.
            *   (Optional) PicaOS triggers asynchronous AI analysis of the newly shared file (FR-SYS-MM-004), and the results/snippets might be sent as another Realtime update or be available if Alex refers to the file later.
        *   **Supabase Storage:** Stores the uploaded file.
        *   **Supabase DB:** `session_files` table updated.
    *   ### Key Technical Considerations/Challenges
        *   **Upload Authorization:** Ensure only the active speaker can upload files.
        *   **Real-time Notification of New Files:** All participants should be made aware of newly shared files promptly.
        *   **Concurrent Uploads:** If multiple files can be shared, handle concurrent uploads and updates to the shared file list.
        *   **AI Analysis Trigger:** If new files are analyzed by AI mid-session, managing the workflow and how/when analysis results are presented without disrupting session flow.
        *   **Storage Management:** Same considerations as other file uploads (size, type, security).
*   **FR-FLOW-SESS-P3-001 (Understand: AI Summaries & Mapping - UIDG 7.4):** Alex (PicaOS/GenAI) must provide summaries of expressed perspectives, highlighting key themes, alignments, and divergences.
    *   ### Frontend Development Outline
        *   Implement the "Understand Phase" UI as per UIDG 7.4.
        *   When PicaOS signals the start of this phase and provides the AI summary:
            *   Display Alex's introduction to the summary (text/voice) (UIDG 7.4.A, Component 10.2).
            *   Render the AI-generated summary, which may include (UIDG 7.4.B):
                *   Key themes from the Express phase (e.g., bullet points).
                *   Areas of alignment between participants.
                *   Areas of divergence or differing perspectives.
                *   Visual aids like simple charts or diagrams if feasible and provided by PicaOS (e.g., a basic sentiment distribution). This is an advanced feature.
            *   The summary should be presented clearly, possibly in sections or expandable cards.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   At the end of the Express phase (or when triggered by Host/timer), PicaOS gathers all `session_messages` (transcripts) from the Express phase from Supabase DB.
            *   Constructs a prompt for Google GenAI (LLM) to:
                *   Summarize each participant's expressed points.
                *   Identify common themes across all participants.
                *   Highlight significant agreements.
                *   Pinpoint key differences or misunderstandings.
                *   (Advanced) Suggest a visual mapping if the GenAI model can output structured data for simple charts (e.g., sentiment scores per theme).
            *   (FR-SYS-ALEX-005, FR-SYS-ALEX-006).
            *   Receives the structured summary from GenAI.
            *   Stores this summary in `session_insights` table (or similar) in Supabase, linked to the `session_id` and `phase='Understand'`.
            *   Sends a Realtime message to clients: `{ type: 'PHASE_UPDATE', phase: 'Understand', alexMessage: { script: "...", voiceUrl: "..." }, understandingSummary: { themes: [...], alignments: [...], divergences: [...] } }`.
        *   **Google GenAI (LLM):** Performs the summarization and analysis.
        *   **Supabase DB:** Stores `session_messages` (source) and the generated `session_insights`.
    *   ### Key Technical Considerations/Challenges
        *   **Quality of AI Summary:** This is paramount. The summary must be accurate, neutral, and insightful. Requires sophisticated prompt engineering for GenAI by PicaOS.
        *   **Presentation of Information:** Displaying the summary in a way that is easy to grasp and facilitates understanding, not confusion. Avoid overwhelming users with too much text.
        *   **Handling Large Transcripts:** If the Express phase was long, the amount of text to summarize could be substantial, potentially hitting GenAI context limits. PicaOS might need to summarize in chunks or use advanced techniques.
        *   **Latency:** Generating this summary can take time. Manage user expectations. PicaOS might send a "Alex is preparing a summary..." message first.
        *   **Neutrality:** AI must avoid taking sides or misinterpreting perspectives.
*   **FR-FLOW-SESS-P3-002 (Understand: Clarification - UIDG 7.4):** Participants must be able to ask clarifying questions; Alex facilitates this process.
    *   ### Frontend Development Outline
        *   Provide a mechanism for participants to ask clarifying questions about the AI summary or others' expressed points (UIDG 7.4.C). This could be:
            *   A dedicated "Ask Alex a Question" button.
            *   An ability to select a part of the summary or transcript and attach a question to it.
            *   Using the standard text/voice input, with Alex understanding it's a clarification question based on phase context.
        *   Alex's response (from PicaOS) is displayed in the transcript area and/or Alex's speech bubble.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Receives user's question (text or STT from voice).
            *   Uses Google GenAI (LLM) to understand the question in context of the summary and transcript.
            *   GenAI crafts an answer. This might involve:
                *   Rephrasing parts of the summary for clarity.
                *   Pointing to specific parts of the transcript.
                *   If the question is for another participant, Alex might say, "[Questioner Name] has a question for [Target Participant Name]: '[Question text]'. [Target Participant Name], would you like to clarify?" Then PicaOS manages this sub-dialogue.
            *   (FR-SYS-ALEX-011 for general contextual help, applied here specifically).
            *   Sends Alex's response (text/voice) back to clients via Realtime.
            *   All Q&A is logged in `session_messages`.
        *   **Google GenAI (LLM):** Understands questions, generates clarifying answers, or scripts Alex to facilitate participant-to-participant clarification.
        *   **Supabase DB:** Stores Q&A in `session_messages`.
    *   ### Key Technical Considerations/Challenges
        *   **Contextual Understanding by AI:** Alex/GenAI needs to accurately understand what the clarification question refers to (which part of summary or whose statement).
        *   **Facilitation Logic:** If Alex facilitates participant-to-participant clarification, PicaOS needs logic to manage this sub-flow (e.g., giving the targeted participant a chance to respond).
        *   **Avoiding New Arguments:** Alex should guide clarification towards understanding, not re-opening debate prematurely. The Resolve phase is for debate/solutions.
        *   **Clarity of Alex's Answers:** Alex's responses must be genuinely clarifying.
*   **FR-FLOW-SESS-P4-001 (Resolve: Brainstorming - UIDG 7.5):** Alex must guide participants through brainstorming potential solutions to identified issues.
    *   ### Frontend Development Outline
        *   Implement the "Resolve Phase - Brainstorming" UI as per UIDG 7.5.
        *   Alex (text/voice) introduces the brainstorming activity, possibly focusing on issues identified in the Understand phase (UIDG 7.5.A, Component 10.2).
        *   Participants can suggest solutions using voice or text input (UIDG 7.5.B, FR-FLOW-SESS-C003, FR-FLOW-SESS-C005).
        *   Suggested solutions appear in the transcript/chat area.
        *   (Optional) A dedicated "Ideas" list UI element could collect all explicitly brainstormed solutions for easier review, separate from general chat.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Manages the transition to the Resolve phase, specifically the brainstorming sub-phase.
            *   Scripts Alex's introduction to brainstorming, potentially using GenAI to frame the activity based on prior phase outputs.
            *   Monitors incoming `session_messages`. If PicaOS has an "Idea Collection" mode enabled:
                *   Uses GenAI (LLM) to identify messages that represent potential solutions or ideas (e.g., looking for phrases like "What if we...", "We could try...", "A solution might be...").
                *   Stores these identified ideas in a structured way in Supabase (e.g., `session_ideas` table linked to `session_id`, with fields for `idea_text`, `proposer_id`, `status = 'brainstormed'`).
                *   (Alternatively, for simpler V1, all messages in this phase are considered part of brainstorming, and solution identification happens later or manually by users).
            *   PicaOS may manage turns more loosely in this phase to encourage free flow of ideas, or enforce timed individual brainstorming turns.
        *   **Google GenAI (LLM):** Helps Alex introduce brainstorming, and can optionally identify solution-oriented messages.
        *   **Supabase DB:** `session_messages` stores all raw input. `session_ideas` (optional) stores identified solutions.
    *   ### Key Technical Considerations/Challenges
        *   **Idea Identification (AI):** If relying on AI to pick out ideas from the transcript, its accuracy is key. It might miss some or flag non-ideas. Clear user actions (e.g., "/idea" command or button) might be more reliable for explicit idea submission.
        *   **Structuring Brainstorming:** Deciding how structured the brainstorming should be (e.g., open floor vs. timed turns). PicaOS needs to support the chosen structure.
        *   **UI for Ideas:** If a separate "Ideas" list is used, keeping it synchronized with the conversation flow and ensuring it's easy to add to and review.
        *   **Encouraging Participation:** Alex's role in encouraging all participants to contribute ideas.
*   **FR-FLOW-SESS-P4-002 (Resolve: Solution Evaluation - UIDG 7.5):** Alex must facilitate the evaluation of proposed solutions (e.g., discussing pros/cons).
    *   ### Frontend Development Outline
        *   UI for displaying proposed solutions (from FR-FLOW-SESS-P4-001, possibly from a `session_ideas` list or identified from transcript) (UIDG 7.5.C).
        *   Alex (text/voice) guides the discussion for each solution, perhaps prompting for pros, cons, and general discussion (UIDG 7.5.D).
        *   Participants discuss each solution using voice/text input.
        *   (Optional) UI elements for participants to formally list "Pros" and "Cons" for a selected solution, which could be stored structuredly.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Manages the solution evaluation sub-phase. Alex might introduce one solution at a time from the `session_ideas` list or from its analysis of brainstormed messages.
            *   Scripts Alex's prompts for evaluation (e.g., "Let's discuss the idea of [Idea X]. What are some potential benefits? What are some drawbacks?").
            *   Monitors discussion. PicaOS could use GenAI (LLM) to:
                *   Summarize pros and cons discussed for each solution from the transcript.
                *   Store these structured pros/cons in `session_ideas.pros_cons_summary` (JSONB) or a related table.
            *   Manages turns if structured evaluation is desired, or allows more open discussion.
        *   **Google GenAI (LLM):** Helps Alex prompt for evaluation and can summarize discussed pros/cons.
        *   **Supabase DB:** `session_ideas` table might be updated with summaries of evaluations. All discussion is in `session_messages`.
    *   ### Key Technical Considerations/Challenges
        *   **Focusing Discussion:** Alex needs to keep the discussion focused on evaluating the current solution.
        *   **Summarizing Pros/Cons (AI):** Accurately extracting and summarizing pros and cons from a free-flowing discussion is challenging for AI. Explicit user input for pros/cons might be more reliable.
        *   **UI for Evaluation:** If displaying multiple solutions and their evaluations, the UI needs to be clear and organized.
        *   **Moving Between Solutions:** Logic for when to move from evaluating one solution to the next (e.g., after a time limit, by Host decision, by participant consensus).
*   **FR-FLOW-SESS-P4-003 (Resolve: Agreement Tracking - UIDG 7.5):** The system must allow participants to indicate agreement on solutions, and Alex must track these points of consensus and identify actionable steps.
    *   ### Frontend Development Outline
        *   For each proposed solution being discussed/finalized:
            *   Provide UI elements (e.g., "Agree" button, checkbox, or a polling mechanism) for participants to indicate their agreement (UIDG 7.5.E).
        *   Alex (text/voice) prompts users to indicate agreement and summarizes the level of consensus.
        *   Display a list of agreed-upon solutions and any identified actionable steps (UIDG 7.5.F).
        *   Client sends agreement signals to PicaOS: `sessionService.signalAgreement(sessionId, ideaId, userId, isAgreed)`.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Receives agreement signals for a specific `ideaId` from participants.
            *   Updates the status of the idea in `session_ideas.agreement_count` or a related `session_idea_votes` table.
            *   Monitors agreement levels. If a predefined threshold is met (e.g., majority, unanimity - configurable by session type), PicaOS marks the idea as "agreed_upon" in `session_ideas.status`.
            *   PicaOS uses GenAI (LLM) to:
                *   Identify actionable steps from the discussion around agreed solutions (e.g., "Who will do what by when?").
                *   Prompt users to confirm these action items.
            *   Stores confirmed action items in `session_action_items` table (linked to `session_id`, `idea_id`, with fields for `action_text`, `assigned_to_user_id`, `due_date`).
            *   Sends Realtime updates to clients about agreement counts and confirmed action items.
        *   **Google GenAI (LLM):** Helps identify and formulate actionable steps.
        *   **Supabase DB:** `session_ideas` updated with agreement status/count. `session_action_items` table stores actionable steps.
    *   ### Key Technical Considerations/Challenges
        *   **Agreement Mechanism:** Designing a clear and simple UI for indicating agreement. Polling could be complex; simple "I agree" buttons per item might be better.
        *   **Defining Consensus:** How is consensus defined for a given session (e.g., simple majority, all must agree)? This could be a session setting. PicaOS needs to check against this.
        *   **Action Item Identification (AI):** Reliably extracting clear, actionable steps from discussion is a sophisticated AI task. May require Alex to explicitly ask "What's the action item here?" and "Who will take responsibility?"
        *   **Assigning Action Items:** UI for assigning owners and potentially due dates for action items.
*   **FR-FLOW-SESS-P5-001 (Heal: Reflection - UIDG 7.6):** Alex must guide participants to reflect on the session process and outcomes.
    *   ### Frontend Development Outline
        *   Implement the "Heal Phase - Reflection" UI as per UIDG 7.6.
        *   Alex (text/voice) initiates the reflection, prompting users to think about the session process, what went well, and what could be improved for future interactions (UIDG 7.6.A, Component 10.2).
        *   Participants can share their reflections via voice or text input (UIDG 7.6.B). These are added to the transcript.
        *   (Optional) Alex might ask specific questions like "How are you feeling about the outcome?" or "What's one thing you learned?".
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Manages transition to Heal phase, reflection sub-phase.
            *   Scripts Alex's reflection prompts using GenAI, possibly tailored by session events or outcomes if PicaOS tracked them (e.g., if session was contentious, prompts might focus on de-escalation).
            *   Receives participant reflections (text or STT from voice) and ensures they are added to `session_messages`.
            *   PicaOS may use GenAI to analyze these reflections for overall sentiment or key takeaways from the Heal phase, potentially storing this as a `session_healing_summary` in the `session_insights` table.
        *   **Google GenAI (LLM):** Helps Alex craft reflection prompts and can analyze reflection statements.
        *   **Supabase DB:** `session_messages` stores reflections. `session_insights` might store a summary of this phase.
    *   ### Key Technical Considerations/Challenges
        *   **Creating a Safe Space:** Alex's tone and prompts are critical for making participants feel safe to share reflections honestly.
        *   **Guidance for Reflection:** Prompts should be open-ended but also guide users toward constructive reflection.
        *   **AI Analysis of Reflections:** If AI analyzes reflections, it should focus on positive aspects, learnings, and overall sentiment, rather than being critical of user feelings.
        *   **Time Management:** Allocate appropriate time for this phase; it shouldn't feel rushed.
*   **FR-FLOW-SESS-P5-002 (Heal: Affirmations & Intentions - UIDG 7.6):** The system must allow participants to share affirmations or state future intentions, either publicly or privately.
    *   ### Frontend Development Outline
        *   UI for sharing affirmations/intentions (UIDG 7.6.C).
        *   Alex (text/voice) prompts users if they wish to share an affirmation for another participant or a personal intention for future behavior.
        *   User can select:
            *   Share publicly (appears in transcript for all).
            *   Share privately with Alex/system (for personal growth tracking, not visible to others).
            *   Share with a specific participant (advanced, may require selecting recipient).
        *   Input via text or voice.
        *   Client sends data to PicaOS: `sessionService.shareAffirmationIntention(sessionId, text, visibility, targetUserId?)`.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Receives affirmation/intention details.
            *   Based on `visibility`:
                *   **Public:** Add to `session_messages` with clear indication it's an affirmation/intention.
                *   **Private to Alex/System:** Store in `user_private_reflections` or `growth_insights` table, linked to `user_id` and `session_id`. Not added to public transcript. This data can feed into FR-SYS-ALEX-009.
                *   **Private to Specific Participant (Advanced):** Create a private message in a `user_to_user_messages` table, and notify the recipient. This is more complex due to managing private channels. For V1, public or private-to-system is simpler.
            *   Alex might acknowledge receipt (e.g., "Thank you for sharing that intention, [User Name].").
        *   **Supabase DB:** `session_messages` for public shares. `user_private_reflections` or `growth_insights` for private-to-system. Potentially `user_to_user_messages` if direct private sharing is implemented.
    *   ### Key Technical Considerations/Challenges
        *   **Privacy:** Critical to correctly implement the chosen visibility. Private intentions must not accidentally appear in public transcript.
        *   **UI for Visibility Choice:** Clear and unambiguous UI for selecting public/private.
        *   **Targeted Private Sharing (if implemented):** Securely routing private messages to the correct recipient and notifying them.
        *   **Encouraging Positive Interaction:** Alex's framing of this activity is important to keep it positive and constructive.
*   **FR-FLOW-SESS-P5-003 (Heal: Closing - UIDG 7.6):** Alex must provide closing remarks and summarize agreed action items.
    *   ### Frontend Development Outline
        *   Alex (text/voice) provides closing remarks for the session (UIDG 7.6.D, Component 10.2).
        *   Alex reiterates any agreed-upon action items (from FR-FLOW-SESS-P4-003), displaying them clearly (UIDG 7.6.E).
        *   Alex informs participants about next steps (e.g., summary generation, feedback survey).
        *   A "Finish Session" or "Exit" button is provided. Tapping this might navigate to a post-session feedback screen (UIDG 8.4) or the main dashboard.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Manages the session closing sequence.
            *   Scripts Alex's closing remarks using GenAI. This script might be tailored based on overall session sentiment or outcomes if PicaOS has this meta-analysis.
            *   Retrieves confirmed `session_action_items` from Supabase DB.
            *   Formats these action items for Alex to present.
            *   Sends Alex's closing script, voice URL, and formatted action items to clients via Realtime: `{ type: 'SESSION_CLOSE', alexMessage: {...}, actionItems: [...] }`.
            *   Updates `sessions.status` to `'completed'` in Supabase DB.
            *   May trigger post-session processes like AI Summary Generation (FR-FLOW-POST-001).
        *   **Google GenAI (LLM):** Helps craft Alex's closing remarks.
        *   **Supabase DB:** `session_action_items` are retrieved. `sessions.status` is updated.
    *   ### Key Technical Considerations/Challenges
        *   **Summarizing Action Items:** Clearly presenting action items (what, who, when if available).
        *   **Tone of Closing:** Alex's closing should feel conclusive and positive, regardless of session difficulty.
        *   **Next Steps:** Clearly communicating what happens after the session ends (e.g., "You will receive a summary shortly").
        *   **Session State Update:** Reliably updating session status to "completed" on the backend.

### 4.7. Post-Session Activities (UIDG Part 8; Mermaid BF-BP)
*   **FR-FLOW-POST-001 (AI Summary Generation - UIDG 8.1):** The system (PicaOS/GenAI) must automatically generate a session summary, list of decisions, and action plan post-session.
    *   ### Frontend Development Outline
        *   This is primarily a backend process.
        *   The frontend (Host and Participant clients) will be notified when the summary is ready (e.g., via in-app notification - FR-SYS-NOTIF-001).
        *   The UI for viewing the summary is covered in FR-FLOW-POST-002 (UIDG 8.1, 8.2).
        *   A loading state might be shown on the session history item or a dedicated summary screen if the user access it while generation is in progress.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS:**
            *   Triggered automatically after `sessions.status` is updated to `'completed'` (end of FR-FLOW-SESS-P5-003).
            *   Retrieves all `session_messages` (transcript), agreed `session_ideas`, and confirmed `session_action_items` from Supabase DB for the completed session.
            *   Constructs a comprehensive prompt for Google GenAI (LLM) to:
                *   Generate a concise overall summary of the session.
                *   List key decisions made (based on agreed ideas).
                *   List all confirmed action items (what, who, when).
                *   Potentially identify overall sentiment or key communication patterns observed (if this meta-analysis is part of the summary).
            *   (FR-SYS-ALEX-006).
            *   Receives the structured summary (e.g., JSON with fields for `overall_summary`, `decisions: []`, `action_items: []`) from GenAI.
            *   Stores this generated summary in the `sessions` table (e.g., `sessions.generated_summary_json`) or a dedicated `session_summaries` table linked to `session_id`. (Fulfills FR-DATA-SESS-006).
            *   Sends notifications (in-app, email) to Host and Participants that the summary is ready for review (FR-SYS-NOTIF-001). PicaOS calls the notification service/function.
        *   **Google GenAI (LLM):** Performs the summarization of transcript and action items.
        *   **Supabase DB:** Stores all source data and the generated summary.
    *   ### Key Technical Considerations/Challenges
        *   **Accuracy & Completeness of Summary:** The AI-generated summary must accurately reflect the session's key outcomes. This heavily relies on GenAI prompt engineering by PicaOS and quality of input data (transcript, action items).
        *   **Latency of Generation:** Summarizing a long session can take time. This should be an asynchronous process. Users are notified upon completion.
        *   **Handling Large Transcripts:** Similar to FR-FLOW-SESS-P3-001, PicaOS may need strategies for chunking or iterative summarization for very long sessions to fit GenAI context windows.
        *   **Structured Output from GenAI:** Ensuring GenAI returns the summary in a reliable JSON structure that PicaOS can parse and store.
        *   **Cost:** GenAI calls for summarization can be significant for long sessions.
*   **FR-FLOW-POST-002 (Summary Review & Comment - UIDG 8.2):** Participants (or Host first) must be able to review the summary and add comments or suggest edits.
    *   ### Frontend Development Outline
        *   Implement the "Review Summary" screen UI as per UIDG 8.1 and 8.2.
        *   Display the AI-generated session summary (overall summary, decisions, action items) fetched from `sessions.generated_summary_json` (UIDG 8.1.A, 8.2.A).
        *   Provide functionality for users (Host or Participants, based on workflow rules set by PicaOS) to:
            *   Add comments to specific sections of the summary or overall (UIDG 8.2.B). This could be a general comment box or inline commenting if UI supports.
            *   Suggest edits (e.g., by flagging a section and typing a suggested change).
        *   Submitted comments/edits are sent to PicaOS: `sessionService.submitSummaryFeedback(sessionId, feedbackType, content, sectionId?)`.
        *   Display existing comments/suggested edits from others, if the review process is collaborative.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `sessionId`, `feedbackType` ('comment' or 'edit_suggestion'), `content`, and optional `sectionId`.
            *   Stores this feedback in a new table, e.g., `session_summary_feedback`, linked to `session_id`, `user_id`, `created_at`, `feedback_type`, `content`, `section_id`, `status ('new'/'addressed')`.
            *   (Fulfills FR-DATA-SESS-007 for review/comment part).
            *   **Workflow Management (PicaOS):**
                *   PicaOS may manage a review workflow. For example:
                    *   Host reviews first, then releases to participants.
                    *   Participants comment, Host reviews comments, and can choose to ask PicaOS to regenerate parts of summary with GenAI based on feedback, or manually edit the summary text (if direct editing is supported).
                *   PicaOS sends notifications to relevant users when new comments/edits are made or when the summary is updated.
        *   **Supabase DB:** `session_summary_feedback` table stores feedback. `sessions.generated_summary_json` might be updated by PicaOS if edits are incorporated.
    *   ### Key Technical Considerations/Challenges
        *   **Review Workflow:** Defining the review/comment/edit workflow (Host-led, collaborative, etc.). PicaOS needs to implement this state machine.
        *   **UI for Commenting/Editing:** Intuitive UI for adding and viewing comments/edits, especially if inline or tied to specific sections.
        *   **Incorporating Edits:** How are suggested edits incorporated?
            *   Manual: Host (or admin) manually updates the summary text based on suggestions.
            *   AI-assisted: PicaOS uses GenAI to revise the summary based on feedback (complex, requires good prompting).
        *   **Versioning (Optional):** If summaries go through multiple revisions, consider versioning the `generated_summary_json`.
        *   **Notification Spam:** Avoid excessive notifications during an active review cycle. Bundle updates or use smart logic.
*   **FR-FLOW-POST-003 (Summary Approval - UIDG 8.2):** Participants must be able to formally approve the session summary.
    *   ### Frontend Development Outline
        *   On the "Review Summary" screen (UIDG 8.2), provide an "Approve Summary" button (UIDG 8.2.C).
        *   This button might only become active once the review/comment period is over or when the Host finalizes the summary for approval.
        *   On tap, client sends approval to PicaOS: `sessionService.approveSummary(sessionId, userId)`.
        *   UI should reflect approval status (e.g., button changes to "Approved," show list of who has approved).
        *   Display confirmation Toast (Component 10.6).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `sessionId` and `userId` for approval.
            *   Updates the `session_participants` table for that user and session, setting `summary_approval_status = 'approved'` and `summary_approved_at = NOW()`.
            *   (Fulfills FR-DATA-SESS-007 for approval part).
            *   PicaOS checks if all required participants have approved. "Required participants" logic might vary (e.g., all participants, or just Host and key participants).
            *   If all required approvals are met, PicaOS might:
                *   Update `sessions.summary_status` to `'approved'`.
                *   Trigger notifications to Host/participants that summary is fully approved.
                *   If digital sign-off (FR-FLOW-POST-004) is the next step, PicaOS prepares for that.
        *   **Supabase DB:** `session_participants` table stores individual approval status. `sessions` table might store overall summary status.
    *   ### Key Technical Considerations/Challenges
        *   **Approval Workflow:** Defining who needs to approve and in what order (if any).
        *   **Clarity of "Approved" State:** Ensuring all users understand when a summary is considered final and approved by all necessary parties.
        *   **Revoking Approval (Optional):** Whether a user can revoke their approval before the summary is finalized by all. (Adds complexity, likely no for V1).
        *   **Real-time Status Update:** Host and participants should see updates to approval statuses in real-time (via Supabase Realtime on `session_participants` table).
*   **FR-FLOW-POST-004 (Digital Sign-off - UIDG 8.3):** The system must allow participants to digitally sign off on the final summary, supporting remote and same-device scenarios.
    *   ### Frontend Development Outline
        *   Implement the "Digital Sign-off" screen/flow as per UIDG 8.3.
        *   This is triggered after summary is fully approved (FR-FLOW-POST-003).
        *   **Remote Sign-off (UIDG 8.3.A):**
            *   Display the final, approved summary text.
            *   Provide a "Digitally Sign" button.
            *   On tap, user might be asked to re-authenticate (e.g., password, biometrics via `expo-local-authentication`) or simply tap a confirmation.
            *   Client sends sign-off signal: `sessionService.signSummary(sessionId, userId, signatureData)`. `signatureData` could be a timestamp, a confirmation string, or a cryptographic signature if using more advanced methods.
        *   **Same-Device Sign-off (UIDG 8.3.B):**
            *   Host initiates this mode.
            *   Sequentially pass device to each local participant.
            *   Each participant selects their name (from list established in FR-FLOW-PREP-006).
            *   Views summary, taps "Digitally Sign."
            *   Client sends sign-off signal with `local_participant_name` and Host's `userId` for authentication: `sessionService.signSummarySameDevice(sessionId, hostUserId, localParticipantName, signatureData)`.
        *   UI updates to show who has signed.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   **Remote Sign-off:**
                *   Receives `sessionId`, `userId`, `signatureData`.
                *   Validates user is a participant and summary is approved.
                *   Records the signature in `session_signatures` table (fields: `session_id`, `user_id`, `signature_data`, `signed_at`, `method='remote'`).
            *   **Same-Device Sign-off:**
                *   Receives `sessionId`, `hostUserId`, `localParticipantName`, `signatureData`.
                *   Validates Host is authorized for this session.
                *   Records signature in `session_signatures` (fields: `session_id`, `signed_by_name` (local name), `host_authenticator_id` (host's user_id), `signature_data`, `signed_at`, `method='same_device'`).
            *   (Fulfills FR-DATA-SESS-007 for sign-off part).
            *   PicaOS checks if all required sign-offs are complete. If so, updates `sessions.summary_status` to `'signed'` or `finalized`.
            *   (Optional) If Nodely/IPFS is used (FR-SYS-MM-005), PicaOS could now trigger pinning the signed summary PDF (generated on the fly or from stored final text) to IPFS.
        *   **Supabase DB:** `session_signatures` table stores sign-off records.
    *   ### Key Technical Considerations/Challenges
        *   **Meaning of "Digital Signature":** For V1, this might be a simple record of user confirmation. True cryptographic signatures are much more complex (would likely involve Dappier or other identity/key management). The term "sign-off" is used here to mean a recorded attestation.
        *   **Same-Device Security:** Ensuring the correct local participant is signing. Relies on social protocol of passing device. Host's authentication for same-device signing events provides some level of attestation.
        *   **Non-Repudiation (Advanced):** True non-repudiation is hard without cryptographic signatures. Current scope is a "good faith" sign-off.
        *   **Generating Signed Document (Optional):** If a PDF or other immutable document of the signed summary is needed, backend would need to generate this (e.g., using a library to convert HTML/JSON summary to PDF, then add signature info).
        *   **Order of Signatures:** If important, manage this in PicaOS workflow.
*   **FR-FLOW-POST-005 (Session Evaluation - UIDG 8.4):** Participants must be able to provide feedback on the session experience and AI mediation.
    *   ### Frontend Development Outline
        *   Implement the "Session Evaluation" screen UI as per UIDG 8.4.
        *   This screen is typically presented after a session ends or after summary sign-off. Users might also access it from their session history for a limited time.
        *   Include questions/prompts related to:
            *   Overall session satisfaction (e.g., star rating - UIDG 8.4.A).
            *   Effectiveness of Alex the AI mediator (e.g., rating, specific feedback areas - UIDG 8.4.B).
            *   Usefulness of specific features or session phases.
            *   Open text field for general comments (UIDG 8.4.C).
        *   Use standard form components (Component 10.8 - Star ratings, Radio buttons, TextInputs).
        *   "Submit Feedback" button calls `sessionService.submitSessionEvaluation(sessionId, feedbackData)`.
        *   Provide a "Skip" or "Do Later" option.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `sessionId` and structured `feedbackData` from the client for the current `userId`.
            *   Stores the feedback in `session_evaluations` table, linked to `session_id`, `user_id` (submitter), and various feedback fields (ratings, text comments).
            *   (Fulfills FR-DATA-FEED-001).
            *   This data is crucial for:
                *   Product improvement (analyzing common pain points or highly-rated features).
                *   AI model improvement (feedback on Alex's effectiveness can inform PicaOS prompt engineering or identify areas where Alex needs better skills).
                *   Host feedback (if feedback is shared with Hosts, respecting participant anonymity preferences - FR-DATA-FEED-002). PicaOS/Edge function would aggregate and anonymize feedback if configured to share with host.
        *   **Supabase DB:** `session_evaluations` table stores the feedback.
    *   ### Key Technical Considerations/Challenges
        *   **Question Design:** Crafting evaluation questions that yield actionable insights.
        *   **Anonymity & Consent:** Clearly communicate to users how their feedback will be used and if/how it will be anonymized, especially if shared with Hosts (FR-DATA-FEED-002). UI must present choices for anonymity if applicable.
        *   **Timing of Survey:** Prompting for feedback when the experience is still fresh but not being overly intrusive.
        *   **Data Analysis:** How the collected feedback will be aggregated, analyzed, and reported for product/AI improvement or for Hosts.
        *   **Optional vs. Required:** Decide if session evaluation is mandatory or optional. If optional, make skipping easy.
*   **FR-FLOW-POST-006 (Schedule Follow-up - UIDG 8.5):** The Host must be able to schedule follow-up check-in sessions, inviting relevant participants.
    *   ### Frontend Development Outline
        *   Implement the "Schedule Follow-up" screen UI as per UIDG 8.5.
        *   This screen is typically accessed by the Host from a completed session's summary page or session history item.
        *   Allow Host to:
            *   Select a date and time for the follow-up session (using a date/time picker component - Component 10.8).
            *   Select participants from the original session to invite to the follow-up (e.g., checkboxes next to participant list - UIDG 8.5.A).
            *   Optionally, add a short message or agenda for the follow-up.
            *   (Optional) Define if this follow-up is a full new session or a "lite" check-in type.
        *   "Send Follow-up Invitations" button: Calls `sessionService.scheduleFollowUp(originalSessionId, dateTime, participantIds, message)`.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (or Supabase Edge Function via `sessionService.ts`):**
            *   Receives `originalSessionId`, `dateTime`, `participantIds` (list of user_ids), and `message`.
            *   Creates a new session record in the `sessions` table:
                *   `title` could be "Follow-up to: [Original Session Title]".
                *   `description_context` could include the custom message and link to original session summary.
                *   `session_type` might be a specific "follow-up" type or inherit from original.
                *   `scheduled_datetime` is set.
                *   `host_id` is the current user.
                *   `status` is 'scheduled'.
                *   Link to `parent_session_id = originalSessionId`.
            *   For each selected `participantId`, create records in `session_participants` for the new session_id (similar to FR-FLOW-HPS-009).
            *   Trigger sending of invitations (email/in-app) to these participants for the new follow-up session (re-uses notification logic from FR-SYS-NOTIF-001).
        *   **Supabase DB:** New record in `sessions`, new records in `session_participants`.
    *   ### Key Technical Considerations/Challenges
        *   **Link to Original Session:** Clearly linking the follow-up session to the original one for context (e.g., via `parent_session_id`).
        *   **Participant Selection:** Easy UI for Host to select which of the original participants to invite.
        *   **Invitation Content:** Invitation for follow-up should clearly state its purpose and reference the original session.
        *   **Session Type for Follow-up:** Decide if follow-ups have a distinct type with potentially different phases/features, or if they are standard sessions.
        *   **Calendar Integration (Future):** Allow adding follow-up event to user's device calendar.

### 4.8. Growth & Tracking Module (UIDG Part 9; Mermaid K, CB-CI)
*   **FR-FLOW-GROW-001 (View Personal Growth Insights - UIDG 9.1):** Users must be able to view AI-generated insights on their communication patterns and emotional regulation.
    *   ### Frontend Development Outline
        *   Implement the "Personal Growth Insights" screen UI as per UIDG 9.1.
        *   Fetch personalized insights for the logged-in user via `growthService.getPersonalInsights(userId)`.
        *   Display insights, which may include (UIDG 9.1.A, 9.1.B):
            *   Textual summaries of communication patterns (e.g., clarity, sentiment trends, use of filler words).
            *   Visualizations like charts (`react-native-svg-charts`) for trends over time (e.g., emotional regulation progress).
            *   Specific examples or references to past session moments if privacy settings allow and it's deemed helpful (requires careful design).
        *   Alex (text/voice) may provide context or explanations for these insights (UIDG 9.1.C, Component 10.2).
        *   Ensure UI is empathetic, private, and encouraging.
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (Scheduled or Triggered Post-Session/Interaction - FR-SYS-ALEX-009):**
            *   Analyzes user's interaction data from `session_messages`, `user_private_reflections`, and potentially `session_evaluations` (with consent).
            *   Uses Google GenAI (LLM) to identify patterns, trends, and generate textual insights related to communication skills, emotional regulation, etc.
            *   Stores these insights in `growth_insights` table in Supabase, linked to `user_id`, `insight_type`, `insight_text`, `generated_at`, and potentially data points for charts. (Fulfills FR-DATA-GROW-001, FR-DATA-GROW-002).
        *   **Supabase Edge Function (via `growthService.ts`):**
            *   Retrieves stored insights from `growth_insights` for the requesting `user_id`.
            *   Formats data as needed for client-side display (e.g., preparing data for charts).
        *   **Upstash Redis:** Frequently accessed or computationally intensive insights for active users could be cached.
    *   ### Key Technical Considerations/Challenges
        *   **Data Privacy & Consent:** Absolutely critical. Users must explicitly consent to their data being analyzed for growth insights. Anonymization or aggregation might be needed if comparing to benchmarks (e.g., via Dappier).
        *   **Quality & Actionability of Insights:** AI-generated insights must be accurate, constructive, positive, and genuinely helpful, not generic or critical. This is a major AI ethics and UX challenge.
        *   **Personalization:** Insights should feel tailored to the individual's journey.
        *   **Data for Analysis:** PicaOS needs access to rich, structured data from sessions to make meaningful analyses.
        *   **Avoiding Negative Framing:** Insights should empower users, not make them feel judged or inadequate.
        *   **Longitudinal Tracking:** Designing data models and analysis to track progress over time.
*   **FR-FLOW-GROW-002 (View Achievements & Progress - UIDG 9.2):** Users must be able to see earned badges and track progress towards new achievements and skill development.
    *   ### Frontend Development Outline
        *   Implement the "Achievements & Progress" screen UI as per UIDG 9.2.
        *   Fetch user's earned badges and progress towards others via `growthService.getAchievements(userId)`.
        *   Display earned badges visually (e.g., icons/images - UIDG 9.2.A).
        *   For unearned badges or ongoing skill development:
            *   Show progress bars or other visual indicators (UIDG 9.2.B).
            *   Display criteria for achieving them (e.g., "Participate in 3 sessions as Host," "Successfully use 'I feel' statements 5 times").
        *   Alex (text/voice) might offer encouragement or highlight recent achievements (UIDG 9.2.C).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (Scheduled or Triggered Post-Session/Interaction):**
            *   Defines criteria for various achievements/badges (these criteria could be stored in a `badge_criteria` table in Supabase).
            *   Analyzes user activity (session participation, use of specific communication techniques identified by GenAI from transcripts, completion of tutorials, etc.) against these criteria.
            *   When criteria for a badge are met, PicaOS creates a record in `user_badges` table (linking `user_id`, `badge_id`, `earned_at`).
            *   (Fulfills FR-DATA-GROW-003).
            *   Calculates progress towards incomplete badges (e.g., "2 out of 3 sessions hosted"). This progress might be stored in `user_badge_progress` table or calculated on the fly.
        *   **Supabase Edge Function (via `growthService.ts`):**
            *   Retrieves earned badges from `user_badges` for the user.
            *   Retrieves progress data from `user_badge_progress` or calculates it by querying relevant activity tables against `badge_criteria`.
        *   **Supabase DB:** `badge_criteria`, `user_badges`, `user_badge_progress` tables.
    *   ### Key Technical Considerations/Challenges
        *   **Defining Achievements:** Creating meaningful and motivating achievements that align with user growth goals.
        *   **Tracking Progress:** Reliably tracking diverse user actions and states that contribute to achievements. This requires robust event logging or querying various data sources.
        *   **Scalability of Progress Calculation:** If progress is calculated on-the-fly for many users and many badges, queries could become complex/slow. Storing progress incrementally might be better.
        *   **Visual Design of Badges:** Attractive and motivating badge designs.
        *   **Notification of Achievement:** Notify users when they earn a new badge (FR-SYS-NOTIF-001).
*   **FR-FLOW-GROW-003 (Access Recommended Resources - UIDG 9.3):** Users must be able to browse and access curated learning materials suggested by Alex/AI based on their growth insights.
    *   ### Frontend Development Outline
        *   Implement the "Recommended Resources" screen UI as per UIDG 9.3.
        *   Fetch recommended resources for the user via `growthService.getRecommendedResources(userId)`.
        *   Display resources as a list or grid of cards (UIDG 9.3.A). Each card shows:
            *   Resource title, type (article, video, exercise), and a brief description.
            *   Source or author, if applicable.
            *   Thumbnail image.
        *   Tapping a resource card:
            *   Opens in-app browser (`expo-web-browser`) for external URLs.
            *   Navigates to an in-app content viewer for internal resources (e.g., text articles, interactive exercises designed within the app).
        *   Alex (text/voice) might explain why certain resources are recommended based on user's insights (UIDG 9.3.B).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (as part of FR-SYS-ALEX-009 logic):**
            *   Based on generated `growth_insights` for a user, PicaOS queries a `learning_resources` table in Supabase to find relevant materials.
            *   The `learning_resources` table would contain metadata for each resource (title, URL/internal path, type, description, keywords/tags for matching with insights). (Fulfills FR-DATA-GROW-004).
            *   PicaOS creates associations in `user_recommended_resources` table (linking `user_id`, `resource_id`, `reason_for_recommendation_text` (optional, from Alex)).
        *   **Supabase Edge Function (via `growthService.ts`):**
            *   Retrieves recommended resource metadata for the user from `user_recommended_resources` joined with `learning_resources`.
        *   **Supabase DB:** `learning_resources` (curated list), `user_recommended_resources` (personalized list).
    *   ### Key Technical Considerations/Challenges
        *   **Curation of Resources:** Building and maintaining a high-quality, diverse library of learning resources.
        *   **Recommendation Logic:** Developing effective PicaOS logic (possibly AI-assisted) to match resources to user-specific growth insights accurately. Simple keyword/tag matching or more advanced AI-driven matching.
        *   **Content Delivery:** Seamlessly opening external web content or rendering internal content.
        *   **Tracking Consumption (Optional):** Tracking if users access recommended resources (could feed back into personalization or achievements). Requires user consent.
        *   **Resource Freshness:** Ensuring external links are not broken and content remains relevant.
*   **FR-FLOW-GROW-004 (View Conflict Prevention Insights - UIDG 9.4):** Users must be able to view proactive AI-driven advice based on recurring negative patterns to help prevent future conflicts.
    *   ### Frontend Development Outline
        *   Implement the "Conflict Prevention Insights" screen UI as per UIDG 9.4.
        *   Fetch these specific insights via `growthService.getConflictPreventionInsights(userId)`.
        *   Display insights as textual advice, possibly in card format (UIDG 9.4.A).
        *   Insights should be framed constructively, focusing on strategies and awareness.
        *   Alex (text/voice) may provide additional context or encouragement (UIDG 9.4.B, Component 10.2).
    *   ### Backend/Serverless Development Outline
        *   **PicaOS (Scheduled or Triggered Post-Session/Interaction - FR-SYS-ALEX-010):**
            *   Analyzes user's interaction history across multiple sessions (with consent) stored in `session_messages`.
            *   Uses Google GenAI (LLM) to identify recurring negative communication patterns or conflict triggers for that user.
            *   Based on these identified patterns, GenAI generates proactive advice or preventative strategies.
            *   Stores this advice in `growth_insights` table with a specific type like `conflict_prevention_tip`, or in a dedicated `conflict_prevention_insights` table, linked to `user_id`. (Fulfills FR-DATA-GROW-005).
        *   **Supabase Edge Function (via `growthService.ts`):**
            *   Retrieves these specific insights for the user.
    *   ### Key Technical Considerations/Challenges
        *   **Ethical AI:** This is highly sensitive. AI must be extremely careful not to sound accusatory or overly negative. Focus must be on constructive, empowering advice. Strong safeguards and human oversight in prompt design are essential.
        *   **Accuracy of Pattern Detection:** Reliably identifying "recurring negative patterns" from complex human conversation is very challenging and prone to misinterpretation.
        *   **User Consent & Transparency:** Users must explicitly consent to this deeper level of analysis across their session history. They need to understand what is being analyzed.
        *   **Actionability of Advice:** The advice should be practical and something users can realistically implement.
        *   **Risk of Harm:** Poorly implemented, this feature could discourage users or make them feel negatively judged by the AI, undermining trust. This feature requires the most careful design and testing of all growth module components.

## 5. Data Management (Functional Perspective)

This section outlines functional requirements related to data handling from the user's and system's perspective. Data models themselves are detailed in Developer Guide Part 3.

### 5.1. User Profile Data
*   **FR-DATA-PROF-001:** The system must securely create, store, and allow retrieval of user profile information (including name, email, avatar, and authentication details).
*   **FR-DATA-PROF-002:** The system must store and associate user-defined communication preferences (from Conversational Personality Assessment) with their profile.
*   **FR-DATA-PROF-003:** The system must store and update user onboarding status (e.g., tutorial completion, personality assessment completion) in their profile.
*   **FR-DATA-PROF-004:** Users must be able to view and initiate edits to their own mutable profile information (e.g., name, avatar).
*   **FR-DATA-PROF-005:** The system must allow users to configure and the system must store and respect user privacy settings for data sharing and AI analysis.

### 5.2. Session Data
*   **FR-DATA-SESS-001:** The system must allow authorized users (Hosts) to create new session records, including defining initial context (title, description), type, goals, and rules.
*   **FR-DATA-SESS-002:** The system must allow Hosts to associate participants with sessions, storing their roles, invitation status, and any pre-session input (perspectives).
*   **FR-DATA-SESS-003:** The system must capture and store all session messages (transcribed speech, typed messages, AI agent contributions) with accurate speaker attribution and timestamps for the duration of the session.
*   **FR-DATA-SESS-004:** The system must allow for the association and storage of multimedia files (uploaded by Host or Participants) linked to specific sessions and users.
*   **FR-DATA-SESS-005:** The system must store AI-generated analyses, including pre-session context analysis and in-session summaries or insights.
*   **FR-DATA-SESS-006:** The system must store AI-generated post-session summaries, key decisions, and action plans.
*   **FR-DATA-SESS-007:** The system must track and store the review, approval, and digital sign-off status of session summaries by each relevant participant.
*   **FR-DATA-SESS-008:** Authorized users (Hosts and relevant Participants) must be able to retrieve and view information about their past and upcoming sessions.
*   **FR-DATA-SESS-009:** (If Nodely/IPFS is used) The system must be able to store IPFS Content Identifiers (CIDs) associated with specific session artifacts (e.g., final signed summaries, critical evidence files) and allow retrieval of these artifacts via an IPFS gateway.
*   **FR-DATA-SESS-010:** The system must manage session status (e.g., scheduled, in_progress, completed, cancelled) and make this information available.

### 5.3. Growth & Tracking Data
*   **FR-DATA-GROW-001:** The system must (with user consent) collect and store data derived from user participation and interactions within sessions for the purpose of generating personal growth insights.
*   **FR-DATA-GROW-002:** The system must store AI-generated personal growth insights (e.g., clarity scores, sentiment trends, filler word frequency, communication pattern analysis) linked to individual user profiles.
*   **FR-DATA-GROW-003:** The system must define criteria for achievements/badges and store records of badges earned by users, along with their progress towards new ones.
*   **FR-DATA-GROW-004:** The system must store metadata for curated learning resources (e.g., articles, videos, exercises), including title, description, type, and source.
*   **FR-DATA-GROW-005:** The system must store AI-generated future conflict prevention insights provided to users.
*   **FR-DATA-GROW-006:** Users must be able to access and view their own private growth data, insights, achievements, and recommended resources. System must ensure this data is not visible to other users.

### 5.4. Feedback & Evaluation Data
*   **FR-DATA-FEED-001:** The system must allow users to submit, and the system must store, feedback regarding their session experience, the platform's usability, and the AI mediator's effectiveness.
*   **FR-DATA-FEED-002:** The system must store user preferences regarding the anonymity of their session-specific feedback when shared with hosts. Platform and AI feedback is typically anonymized for aggregation.

[end of docs/prd.md]
