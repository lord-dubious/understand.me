# Part 6: Feature Implementation Guide

## Introduction

This part of the Developer Guide provides detailed, feature-by-feature implementation guidance for the "Understand.me" mobile application. Its purpose is to bridge the gap between the high-level design documents (UI Development Guide, System Architecture, Mermaid Flows) and the actual coding process.

For each major feature or user flow, this guide will:
*   Outline the **overview and goal** of the feature.
*   Reference the relevant sections in the **Mermaid Diagram** (`understand_me_mermaid_flow updated.mermaid`) and the **UI Development Guide** (`../development_guide/README.md`).
*   Describe the **core logic and workflow**, including interactions between the Expo (React Native) frontend, AI Orchestration Layer (AI orchestration), Supabase (BaaS), and other relevant microservices (Dappier, Nodely, Google GenAI, ElevenLabs).
*   Provide guidance on **frontend implementation** using Expo/React Native and TypeScript.
*   Detail **backend/service interactions**, including API calls and data transformation.
*   Illustrate the **data flow** conceptually.
*   Discuss specific **error handling** considerations for the feature.
*   Include **conceptual code snippets** where helpful to illustrate key implementation patterns.

This guide is intended to ensure that developers have a clear roadmap for building each part of the "Understand.me" application consistently and efficiently, adhering to the overall architecture and design principles.

## Feature Implementation Outline

The following sections will detail the implementation for each major feature area of "Understand.me":

### 6.1. Onboarding Process
    *   **6.1.1. Overview & Goal:** Guide new users through initial setup, including account creation, personality assessment, and platform tutorial.
    *   **6.1.2. Mermaid Diagram Reference:** Sections A, B, E, F (from `understand_me_mermaid_flow updated.mermaid`).
    *   **6.1.3. UI Guide Reference:** Part 2 (Initial User Experience & Onboarding) from `../development_guide/README.md`.
    *   **6.1.4. Core Logic & Workflow:**
        *   **User Sign-Up/Login Logic (UI Guide 2.2):**
            1.  **Expo App (UI):** User enters credentials (email/password) or selects a social login provider (Google, Apple via `expo-auth-session` or `expo-apple-authentication`). Form validation (Component 10.8) happens client-side first.
            2.  **Expo App (Service Call):**
                *   For email/password: Calls Supabase Auth's `signUp()` or `signInWithPassword()` methods directly from `authService.ts`.
                *   For social logins: Retrieves token from Expo auth utility, then calls Supabase Auth's `signInWithIdToken()` or `signInWithOAuth()`.
            3.  **Supabase Auth:** Handles user creation/authentication. On successful sign-up, a new user is added to `auth.users` and a JWT is issued. A trigger/function in Supabase automatically creates a corresponding entry in the public `profiles` table (Dev Guide 3.1, 3.2).
            4.  **Expo App (State Update):** Securely stores the session (handled by Supabase JS client in AsyncStorage) and updates global state (e.g., Zustand `userStore` - Dev Guide 7.3) with user profile and authentication status. User profile data might be fetched immediately after login and potentially cached using Upstash Redis (via a Supabase Edge Function or AI Orchestration Layer) for quick access upon subsequent app opens, especially if the profile data grows extensive.
            5.  **Navigation:** Navigates to Personality Assessment (for new users) or Main Dashboard.
            6.  **AI Orchestration Layer/Dappier Role (Optional):**
                *   If Dappier is used for Decentralized Identity (DID): The social login or sign-up process might involve AI Orchestration Layer orchestrating calls to Dappier to register/authenticate the user's DID and link it to their Supabase Auth ID. This would be a more complex flow involving redirects or additional steps.
                *   AI Orchestration Layer might orchestrate a post-signup welcome flow (e.g., sending a welcome email via a Supabase Edge Function, or scheduling a "check-in" notification via Nodely).
        *   **Conversational Personality Assessment (UI Guide 2.3):** - **See 6.X. Example 1 for full detail.**
        *   **Interactive Platform Tutorial Logic (UI Guide 2.4):**
            1.  **Initiation (Expo App):** Triggered after personality assessment for new users, or if `profiles.onboarding_completed` is false, or if user manually starts it.
            2.  **Tutorial Configuration (Expo App/AI Orchestration Layer):** The structure of the tutorial (steps, content, highlighted UI elements) could be:
                *   Statically defined within the Expo app.
                *   Fetched from Supabase (e.g., a `tutorial_steps` table) if it needs to be dynamically updated without an app release. This fetched configuration could be cached in Upstash Redis (via AI Orchestration Layer or an Edge Function) for faster loads.
            3.  **Step Progression (Expo App):** User interacts with UI elements as guided by Udine (Component 10.2) and tutorial overlays (React Native components). Each step completion updates local state.
            4.  **Tracking Progress (Expo App & Supabase):**
                *   Key tutorial milestones or completion status are persisted to Supabase (`profiles.onboarding_tutorial_progress` JSONB field or a separate `user_tutorial_progress` table).
                *   Example: `updateUserProfile({ onboarding_tutorial_progress: { lastStepCompleted: 'step3', completed: false } })`.
            5.  **Completion (Expo App & Supabase):** When the tutorial is finished, `profiles.onboarding_completed` is set to `true`. This ensures the user isn't prompted to retake it unless they choose to.
            6.  **AI Orchestration Layer Role (Optional):** AI Orchestration Layer might be called by the tutorial if any step requires AI interaction or analysis (e.g., "Try asking Udine a question about X").
    *   **6.1.5. Frontend Implementation (Expo/React Native):**
        *   **Sign-Up/Login:** Use `<TextInput>` for forms, `TouchableOpacity` for buttons. Manage form state (`useState`), implement validation logic. Use `authService.ts` to call Supabase. Update `userStore`.
        *   **Tutorial:** Use a state machine or step counter for tutorial progress. UI overlays using absolutely positioned `<View>`s or a library like `react-native-copilot`. Udine's voice/text via Component 10.2.
    *   **6.1.6. Backend/Service Interactions:**
        *   **Supabase Auth:** For all authentication operations.
        *   **Supabase DB (`profiles` table):** Storing profile data, assessment results, tutorial progress.
        *   **AI Orchestration Layer/Dappier (Optional for Sign-Up/Login):** Advanced identity solutions or post-signup flows.
        *   **Upstash Redis (via Backend):** Caching user profiles after login, caching dynamic tutorial configurations.
    *   **6.1.7. Data Flow Diagram (Conceptual - Sign-Up):**
        ```
        ExpoApp (Credentials) -> Supabase Auth (Create User & Session) -> Supabase DB (Trigger: Create Profile)
                                                                     -> ExpoApp (Session & User Profile) -> Zustand Store
                                                                     -> (Optional) AI Orchestration Layer (Post-Signup Welcome Flow)
        ```
    *   **6.1.8. Error Handling:**
        *   **Sign-Up/Login:** Display clear error messages from Supabase Auth (e.g., "Invalid credentials," "Email already in use") using Toasts or inline text. Handle network errors.
        *   **Tutorial:** Gracefully handle errors if tutorial configuration fails to load. Allow skipping steps if one is buggy.
    *   **6.1.9. Code Snippets (Conceptual TypeScript):**
        ```typescript
        // Expo App: authService.ts - Email Sign Up
        // async function signUpWithEmail(email, password, fullName) {
        //   const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
        //   if (error) throw error;
        //   // Supabase trigger handles profile creation. Fetch profile if needed.
        //   // useUserStore.getState().setSession(data.session);
        //   // useUserStore.getState().setProfile(data.user.user_metadata); // Or fetch from profiles table
        //   return data;
        // }

        // Expo App: Tutorial Progress Update
        // async function updateTutorialProgress(step, isCompleted) {
        //   const userId = useUserStore.getState().profile?.id;
        //   if (!userId) return;
        //   const { error } = await supabase.from('profiles').update({
        //     onboarding_tutorial_progress: { lastStepCompleted: step, completed: isCompleted },
        //     onboarding_completed: isCompleted
        //   }).eq('id', userId);
        //   if (error) console.error("Failed to update tutorial progress", error);
        // }
        ```

### 6.2. Host Path - Session Creation & Setup
    *   **6.2.1. Overview & Goal:** Enable hosts to define a new session, provide context, configure its type, and invite participants.
    *   **6.2.2. Mermaid Diagram Reference:** Sections O, Q, R, S, T, U, X, Y, Z, AA, AB, AC (from `understand_me_mermaid_flow updated.mermaid`).
    *   **6.2.3. UI Guide Reference:** Part 4 (Host Path - Initiating a Session) from `../development_guide/README.md`.
    *   **6.2.4. Core Logic & Workflow:**
        *   **6.2.A. Describe Conflict:** - **See 6.Y. Example 2 for full detail (will be relabeled to 6.2.A).**
        *   **6.2.B. AI Problem Analysis Review (UI Guide 4.2):**
            1.  **Trigger (Expo App):** After host submits conflict description (6.2.A), AI Orchestration Layer returns a `session_id` and confirmation that analysis is in progress. App navigates to this screen, polling AI Orchestration Layer (e.g., `/session/{sessionId}/analysis_status`) or listening to a Supabase Realtime event orchestrated by AI Orchestration Layer for analysis completion.
            2.  **Fetch Analysis (Expo App):** Once AI Orchestration Layer indicates completion, Expo app fetches structured analysis results from AI Orchestration Layer (e.g., `/session/{sessionId}/analysis_results`). This data might be cached in Upstash Redis by AI Orchestration Layer for quick retrieval if the analysis is extensive or frequently accessed before session start.
            3.  **Display (Expo App):** Renders themes, sentiments, divergences, talking points using `<Text>`, cards (`<View>`), simple charts (`react-native-svg-charts`). Allows user feedback (ratings/comments on insights) via Component 10.8, saved to Supabase via AI Orchestration Layer or direct Supabase call.
            4.  **User Edits/Confirmations (Expo App):** Host can edit/rephrase/dismiss AI insights. Changes are sent back to AI Orchestration Layer to update the session's AI analysis data in Supabase (e.g., in `sessions.ai_synthesis_summary` or a related table).
            5.  **AI Orchestration Layer/Nodely Role:** AI Orchestration Layer handles the orchestration of fetching file content (potentially from Nodely/IPFS if files were pinned early by an advanced AI Orchestration Layer pre-processing step) and sending it to Google GenAI for analysis. Results are stored in Supabase.
        *   **6.2.C. Configure Session Type (UI Guide 4.3):**
            1.  **Load Configuration Options (Expo App):** Session type templates (names, descriptions, default settings) might be fetched from Supabase (could be cached in Upstash Redis via AI Orchestration Layer/Edge Function) or be part of app config. AI recommendations for session types (based on analysis from 6.2.B) are fetched from AI Orchestration Layer.
            2.  **User Selection (Expo App):** Host selects a template or "custom." Configures duration (`<TextInput>` or Picker), toggles features (`<Switch>`), sets permissions.
            3.  **Persist Configuration (Expo App):** Selected configuration (session type, duration, enabled features like transcription/translation, Q&A, polls, anonymity) is saved to the `sessions` table in Supabase for the current `session_id` (likely via a AI Orchestration Layer endpoint like `/session/{sessionId}/configure`).
            4.  **AI Orchestration Layer Role:** If session setup involves complex orchestration (e.g., provisioning specific AI models or Dappier data feeds based on session type), AI Orchestration Layer handles this based on the configuration received.
        *   **6.2.D. Add Participants & Send Invitations (Joint Remote) (UI Guide 4.4):**
            1.  **Input Participants (Expo App):** Host adds emails (`<TextInput>`), imports from contacts (`expo-contacts`), or selects existing users. Roles can be assigned using Pickers.
            2.  **Store Participants (Expo App to Supabase/AI Orchestration Layer):** For each participant, a record is created in `session_participants` linked to the `session_id`, including their email and role. This can be done via a AI Orchestration Layer endpoint that then writes to Supabase.
            3.  **Customize Invitation (Expo App):** Host edits message in a Modal (Component 10.7).
            4.  **Dispatch Invitations (AI Orchestration Layer/Supabase Function):** Expo app calls a AI Orchestration Layer endpoint (e.g., `/session/{sessionId}/send_invitations`). AI Orchestration Layer then uses a Supabase Edge Function or its own logic (possibly with Nodely for email template management or dispatch) to send emails (via Supabase Auth or third-party email service) and/or in-app notifications (via Supabase Realtime/`expo-notifications`). Unique invitation links/tokens are generated.
        *   **6.2.E. Track Invitation Status (Joint Remote) (UI Guide 4.5):**
            1.  **Fetch Status (Expo App):** Retrieves participant list and their `invitation_status` from `session_participants` for the current `session_id` via Supabase query (direct or through AI Orchestration Layer).
            2.  **Real-time Updates (Expo App & Supabase Realtime):** Subscribes to changes on the `session_participants` table for the current session (Dev Guide 3.4). UI updates dynamically as participants accept/decline.
            3.  **Resend/Edit Invitation (Expo App & AI Orchestration Layer/Supabase Function):** Host actions trigger calls to AI Orchestration Layer/Supabase Function to resend email or update participant details.
    *   **6.2.5. Frontend Implementation (Expo/React Native):**
        *   Use React Navigation Stacks for the flow.
        *   Forms for input (Component 10.8). Modals for previews/edits (Component 10.7).
        *   Services (`picaosApiService.ts`, `supabaseService.ts`) to handle backend calls.
        *   State management (Zustand `sessionStore`) for current session data, analysis, configuration, participants.
    *   **6.2.6. Backend/Service Interactions:**
        *   **AI Orchestration Layer:** Orchestrates AI analysis (Google GenAI), manages session configuration logic, participant addition, and triggers invitation dispatch.
        *   **Supabase DB:** Stores session details, AI analysis, configuration, participants, invitation status.
        *   **Supabase Auth:** (Implicitly for host user session).
        *   **Supabase Realtime:** For invitation status updates.
        *   **Supabase Edge Functions/Nodely:** For dispatching invitations.
        *   **Upstash Redis (via AI Orchestration Layer/Edge Function):** Caching AI analysis results, session type templates.
    *   **6.2.7. Data Flow Diagram (Conceptual - Configure Session Type):**
        ```
        ExpoApp (SessionTypeSelection, Settings) -> AI Orchestration Layer (/session/{id}/configure)
                                                    -> Supabase DB (Update 'sessions' table)
                                                    -> (If complex) AI Orchestration Layer orchestrates Dappier/other service setup
                                                    -> AI Orchestration Layer -> ExpoApp (Confirmation)
        ```
    *   **6.2.8. Error Handling:**
        *   Expo App: Handle API errors from AI Orchestration Layer/Supabase. Provide user feedback (Toasts - Component 10.6). Validate forms.
        *   AI Orchestration Layer/Supabase Functions: Robust error handling for calls to GenAI, DB updates, invitation dispatch. Log errors to Sentry.
    *   **6.2.9. Code Snippets (Conceptual TypeScript):**
        ```typescript
        // Expo App: Fetching AI Analysis Results
        // async function fetchAnalysis(sessionId) {
        //   const analysis = await picaosApiService.get('/session/' + sessionId + '/analysis_results');
        //   sessionStore.getState().setAnalysis(analysis); // Update Zustand store
        // }

        // Expo App: Configuring Session Type
        // async function configureSession(sessionId, config) {
        //   const updatedSession = await picaosApiService.post('/session/' + sessionId + '/configure', config);
        //   sessionStore.getState().updateSessionDetails(updatedSession);
        // }

        // Supabase Edge Function: Send Invitation (Simplified)
        // async function sendInvitation(participantEmail, sessionDetails, inviteToken) {
        //   // Logic to construct email content with inviteToken
        //   // Logic to use an email provider (e.g., Supabase Auth admin functions or external like SendGrid)
        // }
        ```

### 6.3. Participant Path - Joining Session
    *   **6.3.1. Overview & Goal:** Enable participants to join sessions easily, understand context, provide their perspective if requested, and configure privacy settings before entering a session.
    *   **6.3.2. Mermaid Diagram Reference:** Sections P, AE, AF, AG, AH, AI (from `understand_me_mermaid_flow updated.mermaid`).
    *   **6.3.3. UI Guide Reference:** Part 5 (Participant Path - Joining a Session) from `../development_guide/README.md`.
    *   **6.3.4. Core Logic & Workflow:**
        *   **6.3.A. Enter Session Code (UI Guide 5.1):**
            1.  **Input (Expo App):** Participant enters a session code into a `<TextInput>` (Component 10.8).
            2.  **Validation Request (Expo App):** App calls a AI Orchestration Layer endpoint (e.g., `/session/validate_code`) or a Supabase Edge Function.
                *   **Caching/Rate Limiting (Upstash Redis):** The backend (AI Orchestration Layer/Edge Function) might use Upstash Redis to cache valid session codes for quick lookups or to implement rate limiting on code validation attempts to prevent abuse.
            3.  **Backend Logic (AI Orchestration Layer/Edge Function):** Queries Supabase `sessions` table to find a session matching the code and status (e.g., 'scheduled', 'in_progress').
            4.  **Response (AI Orchestration Layer/Edge Function to Expo App):** Returns session validity. If valid, returns `session_id` and details about next steps (e.g., if perspective sharing is required, if user is already a participant or needs to be added).
            5.  **Navigation (Expo App):** If valid, navigates to the appropriate next screen (e.g., 5.2 if they need to "join" by accepting, 5.4 if perspective needed, or directly to session if already accepted and no pre-session steps). If invalid, shows an error message (Toast - Component 10.6).
        *   **6.3.B. Receive Detailed Invitation (UI Guide 5.2):**
            1.  **Trigger (Expo App):** Participant opens a deep link (`understandmeapp://invitation/[inviteId]`). The `inviteId` could be a JWT or a unique token managed by Supabase/AI Orchestration Layer. Dappier could be used if these tokens need to be verifiable or have specific decentralized properties.
            2.  **Fetch Invitation Details (Expo App):** App calls AI Orchestration Layer (e.g., `/invitation/{inviteId}/details`) or a Supabase Edge Function.
            3.  **Backend Logic (AI Orchestration Layer/Edge Function):** Validates `inviteId`. Fetches session details, host information, host's message, list of shared files (paths from Supabase Storage, or IPFS CIDs via Nodely if applicable) from Supabase (`sessions`, `profiles`, `session_files` tables).
                *   **Caching (Upstash Redis):** Frequently accessed invitation details (especially public session info or file metadata) could be cached by AI Orchestration Layer/Edge Function to speed up loading.
            4.  **Response (AI Orchestration Layer/Edge Function to Expo App):** Returns structured data for display.
            5.  **Display (Expo App):** Renders session title, host info, message, shared files (Component 10.3 for file display/preview using `expo-av`, `react-native-pdf`, `WebView`, or `expo-sharing`).
        *   **6.3.C. Accept or Decline Invitation (UI Guide 5.3):**
            1.  **User Action (Expo App):** Participant taps "Accept" or "Decline" (`<TouchableOpacity>`).
            2.  **Update Status (Expo App):** App calls AI Orchestration Layer (e.g., `/invitation/{inviteId}/respond`) or a Supabase Edge Function with the response (`accepted` or `declined`) and optional reason for declining (`<TextInput>`).
            3.  **Backend Logic (AI Orchestration Layer/Edge Function):** Updates the `invitation_status` (and `reason_declined` if provided) in the `session_participants` table for that user and session in Supabase.
            4.  **Notifications (AI Orchestration Layer/Supabase Function):** Can trigger a notification (email or in-app via Supabase Realtime/`expo-notifications`) to the Host about the participant's response. Nodely could be used for complex notification workflows.
            5.  **Navigation (Expo App):** If accepted, proceeds to 5.4 (Provide Perspective) or 5.5 (Privacy Settings) if required by host/first-time user, or to a waiting/confirmation screen. If declined, shows a confirmation and may navigate to dashboard.
        *   **6.3.D. Provide Your Perspective (UI Guide 5.4):**
            1.  **Input (Expo App):** Similar to Host's "Describe Conflict" (6.2.A/6.Y). User types perspective (`<TextInput>`) or uses voice (Component 10.1). Uploads multimedia files (Component 10.3 using `expo-image-picker`/`expo-document-picker`) to Supabase Storage.
            2.  **Submit Perspective (Expo App):** Sends text and file references (storage paths) to AI Orchestration Layer (e.g., `/session/{sessionId}/participant_perspective`) or Supabase Edge Function.
            3.  **Backend Logic (AI Orchestration Layer/Edge Function):** Saves `perspective_text` and links uploaded files (new records in `session_files` with `uploader_profile_id` as participant) to the `session_participants` record in Supabase.
            4.  **AI Analysis (Optional, by AI Orchestration Layer):** AI Orchestration Layer *may* trigger an asynchronous light analysis of the participant's input using Google GenAI for early insight generation for the host (results stored in a separate table or appended to participant's perspective).
            5.  **Navigation (Expo App):** Proceeds to 5.5 (Privacy Settings) or session waiting room/dashboard.
        *   **6.3.E. Configure Privacy Settings (UI Guide 5.5):**
            1.  **Display Settings (Expo App):** Fetches current privacy settings for the user (if any) from `profiles` table or uses defaults. Displays options using `<Switch>`, Pickers (Component 10.8).
            2.  **Save Settings (Expo App):** User selections are saved back to their `profiles` table in Supabase (e.g., `profile_visibility`, `allow_growth_analysis`, etc.) via a direct Supabase client call from `profileService.ts` or a AI Orchestration Layer endpoint.
                *   **Dappier Role (Optional):** If privacy settings involve granular, verifiable consent for data usage across different services (e.g., specific AI analyses by AI Orchestration Layer, data sharing with Dappier-connected services), Dappier could be used to manage these consents as verifiable credentials.
            3.  **Navigation (Expo App):** Proceeds to session waiting room or dashboard.
    *   **6.3.5. Frontend Implementation (Expo/React Native):**
        *   React Navigation Stack for the flow.
        *   Forms (Component 10.8), Modals (Component 10.7), File handling (Component 10.3).
        *   Services for AI Orchestration Layer/Supabase calls. State management (Zustand) for user inputs, session details.
    *   **6.3.6. Backend/Service Interactions:**
        *   **AI Orchestration Layer/Supabase Edge Functions:** Validate session codes, fetch invitation details, update invitation status, store perspectives, trigger notifications.
        *   **Supabase DB:** Store/retrieve session data, participant data, perspectives, privacy settings.
        *   **Supabase Storage:** For files uploaded by participants.
        *   **Google GenAI (via AI Orchestration Layer):** Optional analysis of participant perspectives.
        *   **Nodely:** Potential for IPFS storage of participant-uploaded files if critical, or for notification dispatch.
        *   **Dappier:** Potential for verifiable invitation tokens or privacy consents.
        *   **Upstash Redis (via Backend):** Caching session codes, invitation details.
    *   **6.3.7. Data Flow Diagram (Conceptual - Accept Invitation):**
        ```
        ExpoApp (Acceptance) -> AI Orchestration Layer (/invitation/{id}/respond)
                                -> Supabase DB (Update 'session_participants')
                                -> AI Orchestration Layer (Trigger Host Notification via Supabase Realtime/Email)
                                -> AI Orchestration Layer -> ExpoApp (Confirmation, Nav to Next Step)
        ```
    *   **6.3.8. Error Handling:**
        *   Expo App: Handle invalid session codes, failed API calls to AI Orchestration Layer/Supabase, file upload errors. Display user-friendly errors (Toasts - Component 10.6).
        *   Backend: Validate inputs, handle DB errors, external service errors. Log to Sentry.
    *   **6.3.9. Code Snippets (Conceptual TypeScript):**
        ```typescript
        // Expo App: Validate Session Code
        // async function validateSessionCode(code) {
        //   try {
        //     const { data } = await picaosApiService.post('/session/validate_code', { code });
        //     if (data.isValid) {
        //       // Navigate to next screen with data.sessionId
        //     } else {
        //       // Show error Toast
        //     }
        //   } catch (error) { /* Handle error */ }
        // }

        // Expo App: Save Privacy Settings
        // async function savePrivacySettings(settings) {
        //   const userId = useUserStore.getState().profile?.id;
        //   const { error } = await supabase.from('profiles')
        //                           .update(settings)
        //                           .eq('id', userId);
        //   // Handle error/success
        // }
        ```

### 6.4. Pre-Session Preparation (Converged Path)
    *   **6.4.1. Overview & Goal:** To synthesize all pre-session inputs from host and participants, allow the host to establish clear session goals and rules, and configure the application for same-device use if necessary. This ensures all parties and the AI are aligned before the session formally begins.
    *   **6.4.2. Mermaid Diagram Reference:** Sections AJ, AK, AL, AM, V, AN, AO, AP (from `understand_me_mermaid_flow updated.mermaid`).
    *   **6.4.3. UI Guide Reference:** Part 6 (Pre-Session Preparation) from `../development_guide/README.md`.
    *   **6.4.4. Core Logic & Workflow:**
        *   **6.4.A. AI Synthesizes All Inputs & Dynamic Adaptation (UI Guide 6.1):**
            1.  **Trigger (Host action in Expo App):** Typically after participants have had a chance to provide their perspectives (if enabled), or host decides to proceed with available info. Host might initiate this from a "Prepare Session" screen.
            2.  **Request to AI Orchestration Layer (Expo App):** App sends `session_id` to AI Orchestration Layer (e.g., `/session/{sessionId}/synthesize_inputs`).
            3.  **AI Orchestration Layer Orchestration:**
                *   Fetches Host's conflict description and uploaded files (`sessions`, `session_files` tables in Supabase).
                *   Fetches all accepted participants' perspectives and their uploaded files (`session_participants`, `session_files` tables).
                *   Fetches relevant user personality profiles (`profiles.preferred_communication_style`) from Supabase.
                *   If Dappier is used for RAG, AI Orchestration Layer might query Dappier for additional context based on initial inputs.
                *   Constructs a comprehensive prompt for **Google GenAI** including all text, summaries of multimedia (or full transcripts if feasible), personality insights, and instructs GenAI to identify common themes, divergences, sentiments, and suggest session adaptations or focus areas.
            4.  **Google GenAI Processing:** Analyzes the combined input and returns structured synthesis to AI Orchestration Layer.
            5.  **AI Orchestration Layer Stores & Caches Synthesis:** AI Orchestration Layer stores this synthesized overview in Supabase (e.g., `sessions.ai_synthesis_summary` or a dedicated table). For faster subsequent access by the host before session start, this synthesis could be cached in Upstash Redis by AI Orchestration Layer.
            6.  **Response to Expo App:** AI Orchestration Layer returns the synthesized information (themes, sentiments, divergences, suggested adaptations) to the Expo app.
            7.  **Display (Expo App):** Host reviews the synthesis (UI Guide 6.1). UI uses styled `<View>`s, `<Text>`, and simple charts (`react-native-svg-charts`).
        *   **6.4.B. Establish Session Goals & Rules (UI Guide 6.2):**
            1.  **Load Suggestions (Expo App):** App requests suggested goals/rules from AI Orchestration Layer (e.g., `/session/{sessionId}/suggest_goals_rules`), which uses the synthesis (6.4.A) and session type to generate them via Google GenAI. Alternatively, templates from Supabase (cached in Upstash Redis) could be used.
            2.  **Host Interaction (Expo App):** Host reviews, edits (`<TextInput>`), adds, or deletes suggested goals/rules using UI components (Component 10.8).
            3.  **Save to Supabase (Expo App):** Finalized goals and rules are saved to the `sessions` table (JSONB fields `goals`, `rules`) for the `session_id`, likely via a AI Orchestration Layer endpoint (`/session/{sessionId}/finalize_goals_rules`).
            4.  **Optional Sharing (AI Orchestration Layer/Supabase Function):** If host chooses to share with participants pre-session, AI Orchestration Layer/Supabase Function could trigger notifications (Component 10.6) or update a shared resource.
        *   **6.4.C. Same-Device Setup (UI Guide 6.3 - Re-detailing Logic):**
            1.  **Initiation (Expo App):** Host (or first user on shared device) selects "Same-Device Mode" for the session.
            2.  **Number of Users (Expo App):** Input number of participants on this device (`<TextInput keyboardType="numeric">`).
            3.  **User Identification (Expo App - Component 10.4):**
                *   For each participant slot: Input name (`<TextInput>`). Option to link to existing `profiles` if user logs in (Supabase Auth). Simple avatars/colors assigned.
                *   This temporary list of same-device users is managed in Expo app state.
            4.  **Sequential Mini-Assessment (Expo App & AI Orchestration Layer - UI Guide 2.3 logic):**
                *   For each newly named participant on the device who doesn't have `profiles.preferred_communication_style` data:
                    *   Expo app displays 1-2 key assessment questions.
                    *   User responds (text/voice). Voice input via Component 10.1.
                    *   Expo app sends response to AI Orchestration Layer (e.g., `/assessment/mini_submit`).
                    *   AI Orchestration Layer -> Google GenAI (for minimal analysis if needed) -> AI Orchestration Layer.
                    *   AI Orchestration Layer saves this limited assessment data to the participant's `profiles` record in Supabase (or a temporary store if they are not existing users).
            5.  **Tap-to-Talk Training (Expo App - Component 10.4):**
                *   Udine (Component 10.2) explains the tap-to-talk mechanism.
                *   UI shows buttons for each identified user.
                *   Each user practices tapping their button and speaking a sample phrase (voice captured by Component 10.1, simple visual feedback of capture, no actual STT needed for training itself).
            6.  **Confirmation (Expo App):** All same-device users confirmed and trained. App is ready to proceed to session waiting room or directly into session (Part 7).
    *   **6.4.5. Frontend Implementation (Expo/React Native):**
        *   React Navigation Stack for the pre-session flow.
        *   UI for displaying synthesized insights, editable lists for goals/rules, forms for same-device user names.
        *   State management (Zustand) for session data, synthesis, goals, rules, same-device user list.
        *   API service calls to AI Orchestration Layer.
    *   **6.4.6. Backend/Service Interactions:**
        *   **AI Orchestration Layer:** Fetches all inputs from Supabase, orchestrates Google GenAI for synthesis & goal/rule suggestions, saves finalized goals/rules to Supabase, handles mini-assessments.
        *   **Supabase DB:** Stores all session-related data, including synthesized inputs, goals, rules, participant assessment data.
        *   **Google GenAI:** Provides AI for synthesis, suggestions.
        *   **Upstash Redis (via AI Orchestration Layer/Edge Function):** Caching synthesized overviews, session type templates, goal/rule templates.
        *   **Dappier (Optional):** Could provide external data to enrich AI Orchestration Layer's synthesis process if needed.
    *   **6.4.7. Data Flow Diagram (Conceptual - AI Synthesis):**
        ```
        ExpoApp (Host requests synthesis for session_id) -> AI Orchestration Layer (/session/{id}/synthesize_inputs)
            AI Orchestration Layer -> Supabase DB (Fetch Host Input, Participant Perspectives, Profiles)
            AI Orchestration Layer -> (Optional) Dappier (Fetch supplementary RAG data)
            AI Orchestration Layer -> Google GenAI (Send all context for synthesis)
            Google GenAI -> AI Orchestration Layer (Return structured synthesis)
            AI Orchestration Layer -> Supabase DB (Store ai_synthesis_summary)
            AI Orchestration Layer -> (Optional) Upstash Redis (Cache synthesis)
            AI Orchestration Layer -> ExpoApp (Return synthesis to display)
        ```
    *   **6.4.8. Error Handling:**
        *   Expo App: Handle AI Orchestration Layer API errors. Show Toasts (Component 10.6) or Modals (Component 10.7). Graceful degradation if synthesis fails partially.
        *   AI Orchestration Layer: Robust error handling for Supabase, Google GenAI, Dappier, Redis calls. Log to Sentry. Return meaningful errors to app.
    *   **6.4.9. Code Snippets (Conceptual TypeScript):**
        ```typescript
        // Expo App: Fetching AI Synthesis
        // async function fetchSessionSynthesis(sessionId) {
        //   const synthesis = await picaosApiService.get(`/session/${sessionId}/synthesis`);
        //   sessionStore.getState().setSynthesisDetails(synthesis);
        // }

        // Expo App: Saving Goals and Rules
        // async function saveGoalsAndRules(sessionId, goals, rules) {
        //   await picaosApiService.post(`/session/${sessionId}/finalize_goals_rules`, { goals, rules });
        //   // Update local state or refetch
        // }

        // AI Orchestration Layer: Conceptual - Orchestrating Synthesis
        // async function getSynthesizedInputs(sessionId) {
        //   // 1. const hostInput = await supabase. ...
        //   // 2. const participantInputs = await supabase. ...
        //   // 3. const personalityProfiles = await supabase. ...
        //   // 4. (Optional) const dappierContext = await dappierService.fetchContext(...);
        //   // 5. const prompt = createSynthesisPrompt(hostInput, participantInputs, profiles, dappierContext);
        //   // 6. const synthesisResult = await googleGenAI.generate(prompt);
        //   // 7. await supabase.from('sessions').update({ ai_synthesis_summary: synthesisResult }).eq('id', sessionId);
        //   // 8. await upstashRedisService.cache(`synthesis:${sessionId}`, synthesisResult);
        //   // 9. return synthesisResult;
        // }
        ```

### 6.5. AI-Mediated Session Core (The Five Phases)
    *   **6.5.1. Overview & Goal:** To implement the five-phase AI-mediated session interface, providing a structured, guided, and interactive experience for all participants. This involves real-time transcription, AI-driven guidance from Udine, turn management, and tools for understanding and resolution.
    *   **6.5.2. Mermaid Diagram Reference:** Sections AX, AY, BA, BB, BC, BD, BE (from `understand_me_mermaid_flow updated.mermaid`).
    *   **6.5.3. UI Guide Reference:** Part 7 (AI-Mediated Session Interface) from `../development_guide/README.md`.
    *   **6.5.4. Core Logic & Workflow:**
        *   **6.5.A. Common Session Interface Logic (UI Guide 7.1):**
            1.  **Overall Session State Management (Expo App):** Use Zustand store (`sessionStore`) to manage:
                *   Current `sessionId`, current `phase`, active speaker `profile_id`, speaking queue, timers.
                *   Session goals, rules, AI-generated insights from AI Orchestration Layer.
                *   Real-time messages/transcript entries.
                *   List of participants and their statuses (e.g., connected, speaking, muted).
                *   This state can be cached in Upstash Redis by AI Orchestration Layer for quick rehydration if a user briefly disconnects and reconnects, or if AI Orchestration Layer needs to maintain state across multiple serverless function invocations for that session.
            2.  **Message/Transcript Handling (Expo App & Supabase Realtime):**
                *   Subscribe to `session_messages` table for the current `session_id` (Dev Guide 3.4).
                *   New messages (user speech transcripts from AI Orchestration Layer/Google STT, user typed messages, Udine's guidance text) are inserted into `session_messages` by AI Orchestration Layer or directly by app (for typed messages), and arrive in real-time.
                *   Display messages in a `<FlatList>` (Component 7.1.C).
            3.  **Udine's Guidance Display (Expo App):**
                *   Udine's text scripts (received from AI Orchestration Layer) are displayed in the AI Panel (Component 7.1.B / 10.2).
                *   Udine's voice (audio URL from AI Orchestration Layer via ElevenLabs) is played using `expo-av` (Component 10.2).
            4.  **Multimedia Context Panel (Expo App - Component 7.1.D, 10.3):**
                *   Displays files from `session_files` (Host or Participant uploads). Files fetched from Supabase Storage or Nodely/IPFS gateway URLs.
            5.  **Input Area (Expo App - Component 7.1.E, 10.1, 10.8):** Handles text input, voice input (sending audio to AI Orchestration Layer for STT/processing), and file attachments (uploading to Supabase Storage, informing AI Orchestration Layer).
            6.  **Same-Device Logic (Expo App - Component 7.1.F, 10.4):** Manages local UI state for tap-to-talk, active speaker indication on the shared device. Sends identified speaker's contributions to AI Orchestration Layer.
            7.  **AI Orchestration Layer as Session Conductor:** AI Orchestration Layer is the central orchestrator. It receives all significant events/inputs from the app (user speech, typed messages, phase progression requests), maintains the canonical AI-driven session state, interacts with Google GenAI for analysis/scripting, and sends directives back to the app.
        *   **6.5.B. Phase 1: Prepare (UI Guide 7.2):**
            1.  **Initiation (AI Orchestration Layer & Expo App):** AI Orchestration Layer signals start of phase. Expo app displays goals/rules (fetched from `sessions` table via AI Orchestration Layer/Supabase). Udine provides welcome and instructions (Component 10.2).
            2.  **Readiness Check (Expo App & AI Orchestration Layer):** Participants tap "Ready" (`<TouchableOpacity>`). App sends readiness status to AI Orchestration Layer. AI Orchestration Layer updates `session_participants.status` in Supabase and determines when all are ready (or host overrides).
        *   **6.5.C. Phase 2: Express (UI Guide 7.3):**
            1.  **Turn Management (AI Orchestration Layer):** AI Orchestration Layer defines speaking order (e.g., based on pre-session input order, host setting, or round-robin). Communicates current speaker to Expo app.
            2.  **User Input (Expo App):** Active speaker uses voice (Component 10.1 sending audio to AI Orchestration Layer) or text (Component 10.8).
            3.  **AI Orchestration Layer Orchestration:**
                *   Receives audio -> Google GenAI STT (or ElevenLabs STT).
                *   Receives text/transcript -> Stores in `session_messages` via Supabase (linked to speaker).
                *   (Optional) Light analysis by Google GenAI for immediate sentiment cue (Component 10.5) or keyword spotting if needed by AI Orchestration Layer for phase logic.
            4.  **Same-Device Management (Expo App - Component 10.4):** UI manages tap-to-talk; only active speaker's audio/text is sent to AI Orchestration Layer with their `profile_id`.
        *   **6.5.D. Phase 3: Understand (UI Guide 7.4):**
            1.  **Synthesis by AI Orchestration Layer:** AI Orchestration Layer fetches all "Express" phase messages from Supabase. Uses Google GenAI to summarize each participant's points, identify themes, alignments, divergences. May use Dappier for RAG if external context is needed to understand a point.
            2.  **Display Insights (Expo App):** Shows summaries, maps (if applicable, e.g., `react-native-svg` or static `<Image>`), and clarification prompts from Udine (scripted by AI Orchestration Layer/GenAI) in AI Panel.
            3.  **Clarification Loop (Expo App & AI Orchestration Layer):** Users ask questions (voice/text). AI Orchestration Layer routes questions, gets answers (from users or by prompting GenAI for rephrasing), and updates UI.
            4.  **Caching (Upstash Redis):** AI Orchestration Layer can cache the generated summaries/maps for the session in Upstash Redis to avoid re-computation if the phase is revisited or if there are many participants.
        *   **6.5.E. Phase 4: Resolve (UI Guide 7.5):**
            1.  **Brainstorming (AI Orchestration Layer & Expo App):** Udine (scripted by AI Orchestration Layer/GenAI) prompts for solutions. Users submit ideas (voice/text). AI Orchestration Layer lists ideas in AI Panel via app state.
            2.  **Evaluation (AI Orchestration Layer & Expo App):** Udine guides discussion on pros/cons. AI Orchestration Layer may use GenAI to summarize arguments for/against options.
            3.  **Agreement Tracking (Expo App & AI Orchestration Layer):** Users indicate agreement (e.g., via `<TouchableOpacity>` polls sent to AI Orchestration Layer). AI Orchestration Layer tracks consensus, updates AI Panel. Agreed solutions/actions saved by AI Orchestration Layer to `sessions` or a dedicated `session_resolutions` table in Supabase.
            4.  **Dappier Role (Optional):** If agreements need to be verifiable or trigger off-chain actions, AI Orchestration Layer could interact with Dappier to record them.
        *   **6.5.F. Phase 5: Heal (UI Guide 7.6):**
            1.  **Reflection Prompts (AI Orchestration Layer & Expo App):** Udine (scripted by AI Orchestration Layer/GenAI) provides prompts.
            2.  **Capture Reflections (Expo App):** Users share (voice/text, public/private). Public reflections go to `session_messages`. Private ones might go to a `user_reflections` table in Supabase, linked to user & session, via AI Orchestration Layer.
            3.  **Closing (AI Orchestration Layer & Expo App):** Udine delivers closing remarks. AI Orchestration Layer finalizes session state in Supabase (e.g., `sessions.status = 'completed'`, `actual_end_time`).
    *   **6.5.5. Frontend Implementation (Expo/React Native):**
        *   Single main session screen with dynamic sub-views for each phase, managed by local state (Zustand `sessionStore`).
        *   Heavy use of shared components: AI Panel, Message Thread, Input Area, Multimedia Display, Same-Device controls (Part 10).
        *   Realtime subscriptions to Supabase for messages, participant status. API calls to AI Orchestration Layer for AI logic and state progression.
    *   **6.5.6. Backend/Service Interactions:**
        *   **AI Orchestration Layer:** Core orchestrator for all AI logic, session state, phase transitions, calls to Google GenAI, ElevenLabs, Dappier.
        *   **Supabase DB:** Storing all persistent session data (`session_messages`, `session_participants`, updates to `sessions`).
        *   **Supabase Realtime:** Broadcasting messages, status updates.
        *   **Google GenAI:** STT, core LLM for analysis, summarization, Udine's script generation.
        *   **ElevenLabs:** TTS for Udine.
        *   **Dappier (Optional):** RAG, verifiable agreements.
        *   **Nodely (Optional):** Accessing files from IPFS if shared during session.
        *   **Upstash Redis (via AI Orchestration Layer):** Caching session state, frequently used prompts, AI-generated summaries for performance.
    *   **6.5.7. Data Flow Diagram (Conceptual - User Expresses, Udine Responds):**
        ```
        ExpoApp (User Audio/Text) -> AI Orchestration Layer (STT if Audio)
                                    -> Supabase DB (Store user message in session_messages)
                                    -> AI Orchestration Layer (Contextualize for Udine) -> Google GenAI (Generate Udine script)
                                    -> AI Orchestration Layer -> ElevenLabs (Synthesize voice)
                                    -> AI Orchestration Layer -> Supabase DB (Store Udine message in session_messages)
                                    -> AI Orchestration Layer -> ExpoApp (via Supabase Realtime or direct push: Udine script & voice URL)
                                    -> ExpoApp (Display Udine Text & Play Voice)
        ```
    *   **6.5.8. Error Handling:**
        *   Expo App: Handle AI Orchestration Layer API errors, Supabase Realtime connection issues, media playback errors. Display Toasts or Modals (Component 10.6, 10.7). Offer options to retry or inform user.
        *   AI Orchestration Layer: Robust error handling for all external service calls (GenAI, ElevenLabs, Dappier, Supabase, Redis). Implement fallbacks (e.g., Udine text-only if ElevenLabs fails). Log detailed errors to Sentry with correlation IDs.
    *   **6.5.9. Code Snippets (Conceptual TypeScript):**
        ```typescript
        // Expo App: Sending a user message (text)
        // async function sendTextMessage(sessionId, userId, text) {
        //   // Optimistically update local UI
        //   // Call AI Orchestration Layer to process and store
        //   await picaosApiService.post(`/session/${sessionId}/message`, { userId, type: 'text', content: text });
        // }

        // Expo App: Setting up Supabase Realtime for messages
        // useEffect(() => {
        //   const channel = supabase.channel(`session-messages-${sessionId}`)
        //     .on('postgres_changes', { event: '*', schema: 'public', table: 'session_messages', filter: `session_id=eq.${sessionId}` }, payload => {
        //       // sessionStore.getState().addMessage(payload.new);
        //     })
        //     .subscribe();
        //   return () => { supabase.removeChannel(channel); };
        // }, [sessionId]);

        // AI Orchestration Layer: Conceptual - Processing a user message and getting Udine's response
        // async function processUserMessageAndRespond(sessionId, userId, userContent) {
        //   // 1. Store userContent in Supabase session_messages
        //   // 2. Fetch current session state, user profiles, recent messages from Supabase / Upstash Redis
        //   // 3. const prompt = createUdineResponsePrompt(sessionState, userContent, ...);
        //   // 4. const alexTextResponse = await googleGenAI.generate(prompt);
        //   // 5. const alexVoiceUrl = await elevenLabs.synthesize(alexTextResponse);
        //   // 6. Store Udine's response in Supabase session_messages
        //   // 7. (AI Orchestration Layer might push to Supabase Realtime, or Expo app gets it via its own subscription)
        //   // return { alexScript: alexTextResponse, alexVoiceUrl }; // Or AI Orchestration Layer pushes this to app via a websocket/realtime channel if not using Supabase Realtime for Udine's messages
        // }
        ```

### 6.6. Post-Session Activities
    *   **6.6.1. Overview & Goal:** To provide a structured way to conclude a session, including AI-generated summaries, participant review and approval, formal sign-offs, session evaluations, and scheduling of any necessary follow-up actions or check-ins.
    *   **6.6.2. Mermaid Diagram Reference:** Sections BF, BG, BI, BJ, BL, BM, BN, BP (from `understand_me_mermaid_flow updated.mermaid`).
    *   **6.6.3. UI Guide Reference:** Part 8 (Post-Session & Follow-Up) from `../development_guide/README.md`.
    *   **6.6.4. Core Logic & Workflow:**
        *   **6.6.A. AI Generates Summary & Action Plan (UI Guide 8.1):**
            1.  **Trigger (AI Orchestration Layer):** After Phase 5 (Heal) concludes, or Host manually triggers "End Session & Generate Summary".
            2.  **AI Orchestration Layer Orchestration:**
                *   Fetches all relevant data for the `session_id` from Supabase: `session_messages` (transcripts), `sessions.goals`, `sessions.rules`, identified agreements/action items from Phase 4 (e.g., from `session_resolutions` table), referenced `session_files`.
                *   Constructs a prompt for **Google GenAI** to generate a comprehensive session summary, list key decisions, and formulate an action plan.
                *   Receives structured summary data from Google GenAI.
            3.  **AI Orchestration Layer Stores Summary:** Saves the AI-generated summary, decisions, and action plan into the `sessions` table (e.g., `sessions.generated_summary_json`) or a dedicated `session_summaries` table in Supabase.
            4.  **Caching (Upstash Redis via AI Orchestration Layer - Optional):** AI Orchestration Layer might cache the generated summary for a short period for quick initial access by the host/participants.
            5.  **Notification (AI Orchestration Layer to Expo App):** AI Orchestration Layer informs the Expo app (via Supabase Realtime or a direct response if synchronous) that the summary is ready.
            6.  **Display (Expo App):** App fetches (or receives) and displays the summary using styled `<Text>`, `<FlatList>` for lists, and links to referenced multimedia (Component 10.3). Option to download PDF (using `expo-print` or a backend PDF generation service orchestrated by Nodely).
        *   **6.6.B. Participants Review & Approve Summary (UI Guide 8.2):**
            1.  **Host Initiates Review (Expo App):** Host, after reviewing the AI summary (and potentially making minor edits via a AI Orchestration Layer endpoint), triggers the participant review process.
            2.  **AI Orchestration Layer/Supabase Function:** Updates session status in Supabase (e.g., `sessions.status = 'pending_approval'`). Sends notifications (Component 10.6 via `expo-notifications` / email) to participants.
            3.  **Participant Review (Expo App):**
                *   Participant views summary. Can add comments/suggestions (stored in a `summary_comments` table linked to `session_id` and `profile_id` in Supabase).
                *   Participant clicks "Approve" or "Request Changes". This updates their status in `session_participants.summary_approval_status` via a AI Orchestration Layer call or direct Supabase update.
            4.  **Host View (Expo App):** Host sees approval statuses. If changes requested, Host can create a new version of the summary (managed by AI Orchestration Layer/Supabase).
        *   **6.6.C. Digital Sign-off (UI Guide 8.3):**
            1.  **Trigger:** Once the summary is accepted by all (or by Host if participant approval is optional for sign-off).
            2.  **Expo App (Remote BI / Same-Device BJ - Component 10.4):** Displays final summary. User "signs" by typing name and checking a box.
            3.  **Record Signature (Expo App to AI Orchestration Layer/Supabase Function):**
                *   A record of the sign-off (user_id, session_id, timestamp, signature_data - which might be the typed name or a cryptographic hash if more formal) is sent to AI Orchestration Layer or a Supabase Edge Function.
                *   **Dappier Role (Optional):** For verifiable signatures, AI Orchestration Layer/Edge Function could interact with Dappier to create a verifiable credential or attestation for the sign-off, linking it to the user's DID.
                *   **Nodely Role (Optional):** The signed summary (perhaps as a PDF generated by `expo-print` or a backend service) and its signature attestations could be pinned to IPFS via Nodely for an immutable record. The IPFS CID is stored in `sessions.final_summary_pdf_url` or `sessions.signed_summary_cid`.
            4.  **Update Supabase:** `session_participants.signed_off_summary` is set to true.
        *   **6.6.D. Session Evaluation & Feedback (UI Guide 8.4):**
            1.  **Prompt (Expo App):** After sign-off or session end, users are prompted to provide feedback.
            2.  **Submit Feedback (Expo App):** User fills out ratings (`react-native-ratings`) and text feedback (`<TextInput>`). Data sent to AI Orchestration Layer or directly to Supabase.
            3.  **Store Feedback (Supabase):** Saved in `session_evaluations` table. Anonymity preferences are respected.
        *   **6.6.E. Schedule Follow-up Check-ins (UI Guide 8.5):**
            1.  **Host Initiates (Expo App):** Host uses scheduling interface (`@react-native-community/datetimepicker`, participant selection via `<FlatList>`).
            2.  **Check Availability (Expo App & AI Orchestration Layer/Supabase Function - Optional):** If `expo-calendar` access is granted, app can send availability info to AI Orchestration Layer/Supabase Function to suggest common times.
            3.  **Create Follow-up Session (Expo App & AI Orchestration Layer/Supabase Function):** Details (title, purpose, participants, time) sent to AI Orchestration Layer/Supabase Function. A new `sessions` record is created in Supabase with a link to the original session.
            4.  **Send Invitations (AI Orchestration Layer/Supabase Function):** Triggers email/in-app notifications (Component 10.6) for the follow-up session. Calendar invites created using `expo-calendar` on client, or sent via backend email service.
    *   **6.6.5. Frontend Implementation (Expo/React Native):**
        *   React Navigation Stack for post-session flow.
        *   Displaying summaries (potentially using `react-native-render-html` if summary has rich text, or custom `<View>`s and `<Text>`). PDF viewing/generation with `react-native-pdf` / `expo-print`.
        *   Forms for feedback and scheduling (Component 10.8). Realtime updates for review status.
    *   **6.6.6. Backend/Service Interactions:**
        *   **AI Orchestration Layer:** Orchestrates summary generation (Google GenAI), manages review/approval state changes, triggers notifications, handles scheduling logic.
        *   **Supabase DB:** Stores summaries, comments, sign-off status, feedback, follow-up session details.
        *   **Google GenAI:** Generates session summaries.
        *   **Dappier (Optional):** Verifiable signatures.
        *   **Nodely (Optional):** IPFS pinning of final summaries/signatures, email template management for follow-ups.
        *   **Upstash Redis (via AI Orchestration Layer/Edge Function):** Caching generated summaries before review.
    *   **6.6.7. Data Flow Diagram (Conceptual - AI Summary Generation & Review Start):**
        ```
        AI Orchestration Layer (End of Session Trigger) -> Supabase DB (Fetch session data)
                                        -> Google GenAI (Generate Summary)
                                        -> Supabase DB (Store Raw Summary)
                                        -> (Optional) Upstash Redis (Cache Summary)
                                        -> AI Orchestration Layer -> Expo App (Host notified: Summary Ready)
        Expo App (Host reviews/edits, initiates participant review) -> AI Orchestration Layer
                                        -> Supabase DB (Update session status to 'pending_approval')
                                        -> AI Orchestration Layer (Trigger Notifications to Participants)
        ```
    *   **6.6.8. Error Handling:**
        *   Expo App: Handle API errors from AI Orchestration Layer/Supabase. Graceful display if summary parts are missing. Clear feedback on submission status.
        *   AI Orchestration Layer/Backend: Robust error handling for GenAI summary generation, DB updates, notification dispatch. Log to Sentry.
    *   **6.6.9. Code Snippets (Conceptual TypeScript):**
        ```typescript
        // Expo App: Fetching AI-Generated Summary
        // async function fetchSessionSummary(sessionId) {
        //   const summary = await picaosApiService.get(`/session/${sessionId}/generated_summary`);
        //   sessionStore.getState().setSessionSummary(summary);
        // }

        // Expo App: Approving a Summary
        // async function approveSummary(sessionId, userId) {
        //   await picaosApiService.post(`/session/${sessionId}/participant_approval`, { userId, status: 'approved' });
        //   // Update local UI based on success
        // }

        // AI Orchestration Layer/Supabase Edge Function: Digital Sign-off with Dappier (Conceptual)
        // async function recordDigitalSignOff(sessionId, userId, typedName) {
        //   // 1. Standard signature logging to Supabase session_participants
        //   // 2. const summaryData = await supabaseService.fetchFinalSummary(sessionId);
        //   // 3. const verifiableAttestation = await dappierService.createSignOffAttestation(userId, summaryData, typedName);
        //   // 4. await supabaseService.storeAttestationReference(sessionId, userId, verifiableAttestation.id);
        //   // 5. (Optional) If summary is a PDF, pin its hash with attestation to Nodely/IPFS
        // }
        ```

### 6.7. Growth & Tracking Module
    *   **6.7.1. Overview & Goal:** Provide users with personalized insights, achievements, resources, and conflict prevention advice.
    *   **6.7.2. Mermaid Diagram Reference:** Sections K, CB, CC, CD, CE, CF, CG, CH, CI.
    *   **6.7.3. UI Guide Reference:** Part 9 (Growth & Tracking Module).
    *   **6.7.4. Core Logic & Workflow:**
        *   [Placeholder: Detailed breakdown for each sub-feature]
    *   ... (placeholders)

---
## 6.2.A. Example 2: Describe Conflict (from Host Path - Session Creation)
    (This was previously 6.Y, relabeled for consistency)

*   **6.2.A.1. Overview & Goal:**
    *   Allow the Host to provide a detailed text description of the situation/conflict, and optionally upload multimedia files (documents, images, audio, video) for context. This input is crucial for AI analysis and session setup. (Refer to UI Guide 4.1).
*   **6.2.A.2. Mermaid Diagram Reference:** Section O.
*   **6.2.A.3. UI Guide Reference:** Part 4, Section 4.1. Part 10 (Components 10.1, 10.3, 10.8).
*   **6.2.A.4. Core Logic & Workflow:**
    1.  **Input (Expo App):** Host types session title and description (`<TextInput>`). Host can use voice input for description (Component 10.1). Host uses `expo-document-picker` or `expo-image-picker` to select files (Component 10.3).
    2.  **File Upload (Expo App to Supabase):** Selected files are uploaded directly from the Expo app to Supabase Storage (Dev Guide 3.5). The app receives back storage paths/references.
        *   AI Orchestration Layer might be informed by the app (or via a Supabase Function trigger) about new files if on-device pre-processing by AI Orchestration Layer was desired for large media before full analysis, but typically AI Orchestration Layer gets references later.
    3.  **Request to AI Orchestration Layer (Expo App):** Expo app sends the session title, description text, and an array of file references (storage paths, types, names) to a AI Orchestration Layer endpoint (e.g., `/session/initiate_conflict_description` - Dev Guide 4.3).
    4.  **AI Orchestration Layer Orchestration & Initial Storage:**
        *   AI Orchestration Layer creates an initial `sessions` record in Supabase with the title, description, and host ID.
        *   It also creates records in `session_files` linking the uploaded files (via their storage paths) to this new session ID.
        *   AI Orchestration Layer then triggers the deeper AI analysis (as described in UI Guide 4.2 / Dev Guide 4.2.2). It sends the text description and file references to Google GenAI.
    5.  **Google GenAI Processing (via AI Orchestration Layer):** AI Orchestration Layer retrieves file content from Supabase Storage as needed. For multimedia, it may use Google GenAI's STT/Vision capabilities. It compiles all context and sends to GenAI LLM for analysis (themes, sentiment, etc.).
    6.  **Response to Expo App (AI Orchestration Layer):** AI Orchestration Layer returns a confirmation that the description is saved and analysis is in progress, along with the new `session_id`. The app then navigates to the AI Problem Analysis Review screen (UI Guide 4.2).
    7.  **(Later) IPFS Pinning (Nodely via Supabase Function/AI Orchestration Layer):** If certain uploaded files are later marked as critical evidence or part of a finalized record, a separate process (Dev Guide 3.5, 5.3) involving AI Orchestration Layer or a Supabase Edge Function can send the file (or its Supabase Storage reference) to Nodely to be pinned to IPFS. The `ipfs_cid` is then stored in `session_files`. This is not usually part of the initial "Describe Conflict" submission but a later lifecycle event.
*   **6.2.A.5. Frontend Implementation (Expo/React Native - Conceptual):**
    *   State for title, description, list of selected/uploaded files.
    *   UI components for text input, file picking, file list display (Component 10.3, 10.8).
    *   Functions for handling file selection (`expo-document-picker`), uploading to Supabase Storage, and then calling the AI Orchestration Layer API.
*   **6.2.A.6. Backend/Service Interactions:**
    *   **Expo App -> Supabase Storage:** Direct file uploads.
    *   **Expo App -> AI Orchestration Layer:** API call with text data and file references.
    *   **AI Orchestration Layer -> Supabase DB:** Create `sessions`, `session_files` records.
    *   **AI Orchestration Layer -> Google GenAI:** Send text and file content (fetched from Supabase Storage by AI Orchestration Layer) for analysis.
    *   **(Later) AI Orchestration Layer/Supabase Function -> Nodely:** For IPFS pinning.
*   **6.2.A.7. Data Flow Diagram (Conceptual):**
    ```
    ExpoApp (Text, File Pick) -> Supabase Storage (Files)
                                -> AI Orchestration Layer (Text, File Refs) -> Supabase DB (Session/File Records)
                                                            -> Google GenAI (Analysis) -> AI Orchestration Layer -> ExpoApp (Nav to Analysis Review)
    (Later) AI Orchestration Layer/Supabase Fn -> Nodely (Pin to IPFS) -> Supabase DB (Store CID)
    ```
*   **6.2.A.8. Error Handling:**
    *   Expo App: Handle file picker errors, upload errors (Supabase Storage), AI Orchestration Layer API errors. Display Toasts or Modals (Component 10.6, 10.7).
    *   AI Orchestration Layer: Handle Supabase DB errors, GenAI analysis errors. Return appropriate error codes. Log to Sentry.
*   **6.2.A.9. Code Snippets (Conceptual TypeScript):**
    ```typescript
    // Expo App: File Upload and AI Orchestration Layer call
    // async function handleDescribeConflictSubmit(title, description, filesToUpload) {
    //   const uploadedFileReferences = [];
    //   for (const file of filesToUpload) {
    //     const storagePath = await supabaseStorageService.upload(file.uri, `sessions_context/${sessionId}/${file.name}`); // Assuming supabaseStorageService
    //     uploadedFileReferences.push({ fileName: file.name, storagePath, type: file.mimeType });
    //   }
    //   const response = await picaosApiService.post('/session/initiate_conflict_description', { // Assuming picaosApiService
    //     title, description, fileReferences: uploadedFileReferences
    //   });
    //   // Navigate to AI Analysis Review screen (UI Guide 4.2) with response.sessionId
    // }

    // AI Orchestration Layer: Conceptual logic (Illustrative)
    // async function initiateConflictDescription(hostId, title, description, fileReferences) {
    //   // 1. Create session record in Supabase, get sessionId.
    //   // 2. Create session_files records in Supabase linking fileReferences to sessionId.
    //   // 3. Asynchronously trigger deeper analysis:
    //   //    const analysisContext = await gatherContextForGenAI(description, fileReferences); // Fetches file content etc.
    //   //    const analysisResults = await googleGenAI.analyze(analysisContext);
    //   //    await supabaseService.storeAnalysisResults(sessionId, analysisResults); // Store results in Supabase
    //   // 4. Return { sessionId, message: "Description saved, analysis in progress." }
    // }
    ```

### 6.3. Participant Path - Joining Session
