# Part 6: Feature Implementation Guide

## Introduction

This part of the Developer Guide provides detailed, feature-by-feature implementation guidance for the "Understand.me" mobile application. Its purpose is to bridge the gap between the high-level design documents (UI Development Guide, System Architecture, Mermaid Flows) and the actual coding process.

For each major feature or user flow, this guide will:
*   Outline the **overview and goal** of the feature.
*   Reference the relevant sections in the **Mermaid Diagram** (`understand_me_mermaid_flow updated.mermaid`) and the **UI Development Guide** (`../development_guide/README.md`).
*   Describe the **core logic and workflow**, including interactions between the Expo (React Native) frontend, PicaOS (AI orchestration), Supabase (BaaS), and other relevant microservices (Dappier, Nodely, Google GenAI, ElevenLabs).
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
    *   **6.1.2. Mermaid Diagram Reference:** Sections A, B, E, F.
    *   **6.1.3. UI Guide Reference:** Part 2 (Initial User Experience & Onboarding).
    *   **6.1.4. Core Logic & Workflow:**
        *   [Placeholder for detailed breakdown: Sign-Up/Login Logic]
        *   [Placeholder for detailed breakdown: Conversational Personality Assessment - **See 6.X. Example 1 for full detail**]
        *   [Placeholder for detailed breakdown: Interactive Platform Tutorial Logic]
    *   **6.1.5. Frontend Implementation:**
        *   [Placeholder]
    *   **6.1.6. Backend/Service Interactions:**
        *   [Placeholder]
    *   **6.1.7. Data Flow Diagram (Conceptual):**
        *   [Placeholder]
    *   **6.1.8. Error Handling:**
        *   [Placeholder]
    *   **6.1.9. Code Snippets:**
        *   [Placeholder]

### 6.2. Host Path - Session Creation & Setup
    *   **6.2.1. Overview & Goal:** Enable hosts to define a new session, provide context, configure its type, and invite participants.
    *   **6.2.2. Mermaid Diagram Reference:** Sections O, Q, R, S, T, U, X, Y, Z, AA, AB, AC.
    *   **6.2.3. UI Guide Reference:** Part 4 (Host Path - Initiating a Session).
    *   **6.2.4. Core Logic & Workflow:**
        *   [Placeholder for detailed breakdown: Describe Conflict - **See 6.Y. Example 2 for full detail**]
        *   [Placeholder for detailed breakdown: AI Problem Analysis Review Logic]
        *   [Placeholder for detailed breakdown: Configure Session Type Logic]
        *   [Placeholder for detailed breakdown: Add Participants & Send Invitations Logic]
        *   [Placeholder for detailed breakdown: Track Invitation Status Logic]
    *   **6.2.5. Frontend Implementation:**
        *   [Placeholder]
    *   **6.2.6. Backend/Service Interactions:**
        *   [Placeholder]
    *   **6.2.7. Data Flow Diagram (Conceptual):**
        *   [Placeholder]
    *   **6.2.8. Error Handling:**
        *   [Placeholder]
    *   **6.2.9. Code Snippets:**
        *   [Placeholder]

### 6.3. Participant Path - Joining Session
    *   **6.3.1. Overview & Goal:** Enable participants to join sessions easily, understand context, and prepare for participation.
    *   **6.3.2. Mermaid Diagram Reference:** Sections P, AE, AF, AG, AH, AI.
    *   **6.3.3. UI Guide Reference:** Part 5 (Participant Path - Joining a Session).
    *   **6.3.4. Core Logic & Workflow:**
        *   [Placeholder: Detailed breakdown for each sub-feature]
    *   ... (placeholders for Frontend, Backend, Data Flow, Error Handling, Snippets)

### 6.4. Pre-Session Preparation (Converged Path)
    *   **6.4.1. Overview & Goal:** Synthesize inputs, establish goals/rules, and handle same-device setup.
    *   **6.4.2. Mermaid Diagram Reference:** Sections AJ, AK, AL, AM, V, AN, AO, AP.
    *   **6.4.3. UI Guide Reference:** Part 6 (Pre-Session Preparation).
    *   **6.4.4. Core Logic & Workflow:**
        *   [Placeholder: Detailed breakdown for each sub-feature]
    *   ... (placeholders)

### 6.5. AI-Mediated Session Core (The Five Phases)
    *   **6.5.1. Overview & Goal:** Implement the five-phase AI-mediated session interface.
    *   **6.5.2. Mermaid Diagram Reference:** Sections AX, AY, BA, BB, BC, BD, BE.
    *   **6.5.3. UI Guide Reference:** Part 7 (AI-Mediated Session Interface).
    *   **6.5.4. Core Logic & Workflow:**
        *   [Placeholder: Detailed breakdown for each phase and common elements]
    *   ... (placeholders)

### 6.6. Post-Session Activities
    *   **6.6.1. Overview & Goal:** Generate summaries, manage review/approval, digital sign-offs, evaluations, and follow-ups.
    *   **6.6.2. Mermaid Diagram Reference:** Sections BF, BG, BI, BJ, BL, BM, BN, BP.
    *   **6.6.3. UI Guide Reference:** Part 8 (Post-Session & Follow-Up).
    *   **6.6.4. Core Logic & Workflow:**
        *   [Placeholder: Detailed breakdown for each sub-feature]
    *   ... (placeholders)

### 6.7. Growth & Tracking Module
    *   **6.7.1. Overview & Goal:** Provide users with personalized insights, achievements, resources, and conflict prevention advice.
    *   **6.7.2. Mermaid Diagram Reference:** Sections K, CB, CC, CD, CE, CF, CG, CH, CI.
    *   **6.7.3. UI Guide Reference:** Part 9 (Growth & Tracking Module).
    *   **6.7.4. Core Logic & Workflow:**
        *   [Placeholder: Detailed breakdown for each sub-feature]
    *   ... (placeholders)

---
## 6.X. Example 1: Conversational Personality Assessment (from Onboarding Process)

*   **6.X.1. Overview & Goal:**
    *   To understand the user's communication style, preferences, and needs to tailor "Understand.me" for a more personalized and effective experience. This is achieved through a chat-like interaction with Alex. (Refer to UI Guide 2.3).
*   **6.X.2. Mermaid Diagram Reference:** Section E.
*   **6.X.3. UI Guide Reference:** Part 2, Section 2.3. Part 10 (Components 10.1, 10.2, 10.8).
*   **6.X.4. Core Logic & Workflow:**
    1.  **Initiation (Expo App):** After successful sign-up, the app navigates to this screen. Alex's initial greeting is displayed.
    2.  **User Input (Expo App):** User responds to Alex's question via voice (using `expo-av` for recording, then sent to PicaOS for STT via Google GenAI) or text input (`<TextInput>`).
    3.  **Request to PicaOS (Expo App):** The Expo app sends the user's response (text or audio reference), current question ID, and conversation history to a PicaOS endpoint (e.g., `/assessment/submit_answer` - see Dev Guide 4.3).
    4.  **PicaOS Orchestration:**
        *   If audio reference, PicaOS uses Google GenAI STT to transcribe.
        *   PicaOS updates the user's partial assessment data in Supabase (`profiles.preferred_communication_style`).
        *   PicaOS sends the transcribed/text response and conversation history to Google GenAI (LLM) with a prompt to:
            *   Analyze the latest response.
            *   Determine the next logical question from a predefined question bank or generate one dynamically based on the flow.
            *   Generate Alex's script for the next utterance.
    5.  **Google GenAI Processing:** Returns structured data to PicaOS (e.g., `{ nextQuestionId: 'q5', alexScript: "That's interesting! Tell me more about...", isComplete: false }`).
    6.  **Alex's Voice Synthesis (PicaOS):** PicaOS sends `alexScript` to ElevenLabs API (Dev Guide 5.1) to get the voice audio URL/data.
    7.  **Response to Expo App (PicaOS):** PicaOS sends `{ nextQuestionData, alexScript, alexVoiceUrl, isComplete }` back to the Expo app.
    8.  **UI Update (Expo App):**
        *   Displays Alex's new message bubble (`<Text>`).
        *   Plays Alex's voice using `expo-av` (Component 10.2).
        *   Presents the next question or choices. Updates progress indicator.
    9.  **Loop or Completion:** Steps 2-8 repeat until `isComplete` is true.
    10. **Finalization (PicaOS):** Once complete, PicaOS might run a final GenAI call to summarize the assessment or derive key traits, updating the `profiles` table in Supabase.
*   **6.X.5. Frontend Implementation (Expo/React Native - Conceptual):**
    *   State management for current question, conversation history, user input, Alex's responses.
    *   UI components: `<ScrollView>`/`<FlatList>` for chat, styled `<View>`s for bubbles, `<TextInput>`, `<TouchableOpacity>` for mic/send buttons (Component 10.1, 10.8). Alex's avatar (Component 10.2).
    *   API calls to PicaOS using a service module.
*   **6.X.6. Backend/Service Interactions:**
    *   **PicaOS:** Endpoints for `/assessment/start`, `/assessment/submit_answer`.
    *   **Google GenAI:** For STT (if voice input) and LLM analysis/scripting.
    *   **ElevenLabs:** For TTS.
    *   **Supabase:** Read/write to `profiles.preferred_communication_style`.
*   **6.X.7. Data Flow Diagram (Conceptual):**
    ```
    ExpoApp (Input) -> PicaOS (STT? -> GenAI for NextQ -> Store Prefs in Supabase) -> GenAI (AlexScript) -> PicaOS -> ElevenLabs (Voice) -> PicaOS -> ExpoApp (Display + Audio)
    ```
*   **6.X.8. Error Handling:**
    *   Expo App: Handle PicaOS API errors, voice recording/playback errors. Show Toasts (Component 10.6).
    *   PicaOS: Handle GenAI/ElevenLabs API errors, provide fallback responses or error messages to app (Dev Guide 4.4).
*   **6.X.9. Code Snippets (Conceptual TypeScript):**
    ```typescript
    // Expo App: Service call to PicaOS
    // async function submitAssessmentAnswer(answer: string, history: any[]) {
    //   const response = await picaosClient.post('/assessment/submit_answer', {
    //     userId: authStore.userId,
    //     answer,
    //     history
    //   });
    //   // Update UI with response.alexScript, response.alexVoiceUrl, response.nextQuestionData
    // }

    // PicaOS: Conceptual logic for /assessment/submit_answer
    // async function handleAssessmentAnswer(userId, answer, history) {
    //   // 1. Store answer in Supabase
    //   // 2. const analysisPrompt = createPromptForGenAI(answer, history);
    //   // 3. const genAIResult = await googleGenAI.generate(analysisPrompt);
    //   // 4. const alexVoiceUrl = await elevenLabs.synthesize(genAIResult.alexScript);
    //   // 5. return { ...genAIResult, alexVoiceUrl };
    // }
    ```

---
## 6.Y. Example 2: Describe Conflict (from Host Path - Session Creation)

*   **6.Y.1. Overview & Goal:**
    *   Allow the Host to provide a detailed text description of the situation/conflict, and optionally upload multimedia files (documents, images, audio, video) for context. This input is crucial for AI analysis and session setup. (Refer to UI Guide 4.1).
*   **6.Y.2. Mermaid Diagram Reference:** Section O.
*   **6.Y.3. UI Guide Reference:** Part 4, Section 4.1. Part 10 (Components 10.1, 10.3, 10.8).
*   **6.Y.4. Core Logic & Workflow:**
    1.  **Input (Expo App):** Host types session title and description (`<TextInput>`). Host can use voice input for description (Component 10.1). Host uses `expo-document-picker` or `expo-image-picker` to select files (Component 10.3).
    2.  **File Upload (Expo App to Supabase):** Selected files are uploaded directly from the Expo app to Supabase Storage (Dev Guide 3.5). The app receives back storage paths/references.
        *   PicaOS might be informed by the app (or via a Supabase Function trigger) about new files if on-device pre-processing by PicaOS was desired for large media before full analysis, but typically PicaOS gets references later.
    3.  **Request to PicaOS (Expo App):** Expo app sends the session title, description text, and an array of file references (storage paths, types, names) to a PicaOS endpoint (e.g., `/session/initiate_conflict_description` - Dev Guide 4.3).
    4.  **PicaOS Orchestration & Initial Storage:**
        *   PicaOS creates an initial `sessions` record in Supabase with the title, description, and host ID.
        *   It also creates records in `session_files` linking the uploaded files (via their storage paths) to this new session ID.
        *   PicaOS then triggers the deeper AI analysis (as described in UI Guide 4.2 / Dev Guide 4.2.2). It sends the text description and file references to Google GenAI.
    5.  **Google GenAI Processing (via PicaOS):** PicaOS retrieves file content from Supabase Storage as needed. For multimedia, it may use Google GenAI's STT/Vision capabilities. It compiles all context and sends to GenAI LLM for analysis (themes, sentiment, etc.).
    6.  **Response to Expo App (PicaOS):** PicaOS returns a confirmation that the description is saved and analysis is in progress, along with the new `session_id`. The app then navigates to the AI Problem Analysis Review screen (UI Guide 4.2).
    7.  **(Later) IPFS Pinning (Nodely via Supabase Function/PicaOS):** If certain uploaded files are later marked as critical evidence or part of a finalized record, a separate process (Dev Guide 3.5, 5.3) involving PicaOS or a Supabase Edge Function can send the file (or its Supabase Storage reference) to Nodely to be pinned to IPFS. The `ipfs_cid` is then stored in `session_files`. This is not usually part of the initial "Describe Conflict" submission but a later lifecycle event.
*   **6.Y.5. Frontend Implementation (Expo/React Native - Conceptual):**
    *   State for title, description, list of selected/uploaded files.
    *   UI components for text input, file picking, file list display (Component 10.3, 10.8).
    *   Functions for handling file selection (`expo-document-picker`), uploading to Supabase Storage, and then calling the PicaOS API.
*   **6.Y.6. Backend/Service Interactions:**
    *   **Expo App -> Supabase Storage:** Direct file uploads.
    *   **Expo App -> PicaOS:** API call with text data and file references.
    *   **PicaOS -> Supabase DB:** Create `sessions`, `session_files` records.
    *   **PicaOS -> Google GenAI:** Send text and file content (fetched from Supabase Storage by PicaOS) for analysis.
    *   **(Later) PicaOS/Supabase Function -> Nodely:** For IPFS pinning.
*   **6.Y.7. Data Flow Diagram (Conceptual):**
    ```
    ExpoApp (Text, File Pick) -> Supabase Storage (Files)
                                -> PicaOS (Text, File Refs) -> Supabase DB (Session/File Records)
                                                            -> Google GenAI (Analysis) -> PicaOS -> ExpoApp (Nav to Analysis Review)
    (Later) PicaOS/Supabase Fn -> Nodely (Pin to IPFS) -> Supabase DB (Store CID)
    ```
*   **6.Y.8. Error Handling:**
    *   Expo App: Handle file picker errors, upload errors (Supabase Storage), PicaOS API errors. Display Toasts or Modals.
    *   PicaOS: Handle Supabase DB errors, GenAI analysis errors. Return appropriate error codes.
*   **6.Y.9. Code Snippets (Conceptual TypeScript):**
    ```typescript
    // Expo App: File Upload and PicaOS call
    // async function handleDescribeConflictSubmit(title, description, filesToUpload) {
    //   const uploadedFileReferences = [];
    //   for (const file of filesToUpload) {
    //     const storagePath = await supabaseStorageService.upload(file.uri, `sessions_context/${sessionId}/${file.name}`);
    //     uploadedFileReferences.push({ fileName: file.name, storagePath, type: file.mimeType });
    //   }
    //   const response = await picaosClient.post('/session/initiate_conflict_description', {
    //     title, description, fileReferences: uploadedFileReferences
    //   });
    //   // Navigate to AI Analysis Review screen (UI Guide 4.2) with response.sessionId
    // }

    // PicaOS: Conceptual logic
    // async function initiateConflictDescription(hostId, title, description, fileReferences) {
    //   // 1. Create session record in Supabase, get sessionId.
    //   // 2. Create session_files records in Supabase linking fileReferences to sessionId.
    //   // 3. Asynchronously trigger deeper analysis:
    //   //    const analysisContext = await gatherContextForGenAI(description, fileReferences); // Fetches file content etc.
    //   //    const analysisResults = await googleGenAI.analyze(analysisContext);
    //   //    await supabaseService.storeAnalysisResults(sessionId, analysisResults);
    //   // 4. Return { sessionId, message: "Description saved, analysis in progress." }
    // }
    ```
