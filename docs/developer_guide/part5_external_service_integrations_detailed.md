# Part 5: External Service Integrations (Detailed)

This part of the Developer Guide provides detailed information on how "Understand.me" integrates with key external services: ElevenLabs for voice synthesis (and potentially STT), Dappier for real-time data and Retrieval Augmented Generation (RAG), Nodely for IPFS integration, and Sentry for error monitoring.

## 5.1. ElevenLabs (Voice Synthesis & STT)

ElevenLabs is primarily used for generating the natural-sounding voice for "Alex," our AI voice agent. It might also be considered for advanced Speech-to-Text (STT) if its capabilities are preferred over Google GenAI's STT for specific use cases, though Google GenAI STT (via PicaOS) is the default assumption for user voice input.

**Integration for Alex's Voice Synthesis (Text-to-Speech - TTS):**

*   **Triggering Service:** PicaOS (as per Part 4.2.4) is responsible for generating Alex's script (often with Google GenAI) and then sending this text to the ElevenLabs API for voice synthesis. Alternatively, a Supabase Edge Function could act as a secure proxy if PicaOS is more of an orchestration logic layer.
*   **API Interaction:**
    *   **Authentication:** Requires an API key (`XI_API_KEY`) securely stored in PicaOS's or the Edge Function's environment variables.
    *   **Endpoint:** Typically the `POST /v1/text-to-speech/{voice_id}` endpoint.
    *   **Voice ID:** A specific voice ID for Alex (pre-selected or custom-cloned via ElevenLabs dashboard) will be configured in PicaOS.
    *   **Request Body (Example):**
        ```json
        {
          "text": "Hello, this is Alex. How can I help you prepare for your session today?",
          "model_id": "eleven_multilingual_v2", // Or other appropriate model
          "voice_settings": {
            "stability": 0.7, // Example values
            "similarity_boost": 0.75,
            "style": 0.1, // If style exaggeration is desired
            "use_speaker_boost": true
          }
        }
        ```
    *   **Emotional Adaptation (via PicaOS):** PicaOS can dynamically adjust the `text` sent to ElevenLabs or even select different `voice_settings` (if available and pre-configured) based on the desired emotional tone for Alex, which PicaOS determines from context or Google GenAI's suggestions. For instance, adding emphasis via SSML tags within the text if supported, or slightly altering voice settings for a more empathetic or assertive tone.
        *   Example of text modification by PicaOS for emphasis: `"I <emphasis level='strong'>really</emphasis> think this is important."` (Requires ElevenLabs support for SSML or similar).
*   **Response Handling:**
    *   ElevenLabs API returns an audio stream (e.g., MP3).
    *   PicaOS (or the Edge Function) might temporarily store this audio (e.g., in Supabase Storage for a short TTL or stream it) and provide a URL to the Expo app, or directly stream the audio data if feasible.
*   **Expo App Interaction (Component 10.2):**
    *   The Expo app receives the text script and the audio URL (or data) for Alex's speech from PicaOS.
    *   It uses `expo-av`'s `Audio` object to play back Alex's voice:
        ```typescript
        // In Alex's UI component
        import { Audio } from 'expo-av';

        async function playAlexVoice(audioUrl: string) {
          const { sound } = await Audio.Sound.createAsync(
            { uri: audioUrl },
            { shouldPlay: true }
          );
          // soundObjectRef.current = sound; // Store to manage playback (pause, stop)
          await sound.playAsync();
          // sound.setOnPlaybackStatusUpdate to handle when finished, then unload
        }
        ```
*   **SDK Usage:** While ElevenLabs has official Python and JavaScript SDKs, direct use from PicaOS/Edge Function might involve simple HTTPS requests if the SDKs are not Deno-compatible (for Edge Functions) or if a lightweight approach is preferred.

**Integration for Speech-to-Text (STT) - Optional/Alternative:**

*   While Google GenAI's STT is the primary assumption (orchestrated by PicaOS), if ElevenLabs STT were chosen for a specific reason (e.g., particular accent handling):
    *   **Expo App (Component 10.1):** Uses `expo-av` to record audio.
    *   **PicaOS/Edge Function:** Receives audio data from the app, sends it to ElevenLabs STT API endpoint.
    *   **API Interaction:** Similar authentication. Endpoint and request body would match ElevenLabs STT API specs.
    *   **Response Handling:** PicaOS receives transcript text, processes/forwards it.

## 5.2. Dappier (Real-time Data & RAG)

Dappier is conceptualized for providing real-time, potentially decentralized, data feeds and facilitating Retrieval Augmented Generation (RAG) to enhance Google GenAI's contextual awareness.

**Integration for Real-time Data Feeds:**

*   **Use Case:** If a session requires Alex to have access to rapidly changing external information (e.g., live news impacting a business discussion, status of a system relevant to a technical mediation).
*   **PicaOS Interaction:**
    *   PicaOS would subscribe to or query Dappier endpoints/streams that provide this real-time data.
    *   Dappier would need its own data sources or connectors.
    *   Authentication with Dappier would use API keys/tokens managed by PicaOS.
*   **Data Flow:** Dappier stream -> PicaOS -> (PicaOS processes/filters) -> Relevant context for Google GenAI prompt or direct update to Expo app via Supabase Realtime (if information needs to be displayed directly).
*   **Example Dappier API/SDK Usage (Conceptual):**
    ```typescript
    // In PicaOS (conceptual, assuming a Dappier SDK or API client)
    // dappierClient.subscribeToTopic('live_project_updates', (update) => {
    //   picaos.updateSessionContext(sessionId, { projectUpdate: update });
    //   // Potentially trigger Alex to inform participants if relevant
    // });
    ```

**Integration for Retrieval Augmented Generation (RAG):**

*   **Use Case:** To provide Google GenAI with specific, up-to-date, or proprietary information not in its general training data, enabling more accurate and relevant responses from Alex. This could be project documents, company policies, or specific knowledge bases.
*   **PicaOS & Dappier Interaction:**
    1.  **Query from User/Session Context:** PicaOS identifies a need for specific information based on user query or session context.
    2.  **PicaOS Queries Dappier:** PicaOS sends a search query or context to Dappier.
    3.  **Dappier Retrieval:** Dappier searches its connected knowledge sources (e.g., vector databases populated with company documents, specific APIs) and retrieves relevant chunks of information. These sources might be populated/managed via Nodely if they involve IPFS or other decentralized stores.
    4.  **Dappier to PicaOS:** Dappier returns the retrieved context to PicaOS.
    5.  **PicaOS to Google GenAI:** PicaOS incorporates this retrieved context into the prompt for Google GenAI.
    6.  **Google GenAI Response:** GenAI uses the augmented prompt to generate a more informed response.
*   **Example Dappier API/SDK Usage (Conceptual for RAG in PicaOS):**
    ```typescript
    // In PicaOS
    // async function getAugmentedResponse(userInput: string, sessionId: string) {
    //   const relevantDocs = await dappierClient.searchKnowledgeBase(sessionId, userInput, { top_k: 3 });
    //   const contextForGenAI = relevantDocs.map(doc => doc.content).join("\n");
    //
    //   const prompt = `Based on the following context:\n${contextForGenAI}\n\nUser question: ${userInput}\nAnswer:`;
    //   const genAIResponse = await googleGenAI.generate(prompt);
    //   return genAIResponse;
    // }
    ```

## 5.3. Nodely (IPFS Integration)

Nodely is conceptualized for integrating with IPFS for decentralized storage of specific artifacts, like final session summaries or critical evidence files, ensuring immutability and content addressing.

**Workflow for Storing Files on IPFS via Nodely:**

*   **Trigger:** Typically a server-side process (Supabase Edge Function called by PicaOS, or a direct PicaOS/Nodely workflow) after a specific event (e.g., session summary digitally signed by all - Screen 8.3, or host designates a file for permanent storage).
*   **Process:**
    1.  **Retrieve File:** The backend process (Edge Function or PicaOS/Nodely workflow) retrieves the target file from Supabase Storage (where it was initially uploaded - Component 10.3).
    2.  **Send to Nodely:** The file content is sent to a Nodely API endpoint or processed using a Nodely SDK.
        *   **Authentication:** Nodely would require an API key, managed securely by the backend process.
    3.  **Nodely Pins to IPFS:** Nodely handles the interaction with an IPFS node (either its own or a third-party pinning service like Pinata) to add and pin the file.
    4.  **Nodely Returns CID:** Nodely returns the IPFS Content Identifier (CID) for the pinned file.
    5.  **Store CID:** The backend process updates the relevant record in Supabase (e.g., in `session_files` or `sessions` table) with the `ipfs_cid`.
*   **Example Nodely API/SDK Usage (Conceptual in an Edge Function - see also 3.5):**
    ```typescript
    // In a Supabase Edge Function or PicaOS/Nodely workflow
    // async function pinToIPFSviaNodely(fileBuffer: ArrayBuffer, fileName: string) {
    //   const nodelyResponse = await fetch(`${process.env.NODELY_API_URL}/ipfs/pin`, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${process.env.NODELY_API_KEY}`,
    //       'Content-Type': 'application/octet-stream', // Or multipart/form-data
    //       'X-File-Name': fileName
    //     },
    //     body: fileBuffer,
    //   });
    //   if (!nodelyResponse.ok) throw new Error('Nodely IPFS pinning failed');
    //   const { cid } = await nodelyResponse.json();
    //   return cid;
    // }
    ```

**Retrieving IPFS Files for Display in Expo App:**

*   The Expo app receives the `ipfs_cid` from Supabase (e.g., as part of `session_files` data).
*   It constructs a URL using a configured IPFS gateway (this gateway URL could be provided by Nodely or be a public one like `https://ipfs.io`).
    *   `const ipfsFileUrl = \`https://{your_nodely_or_public_gateway}/ipfs/\${ipfs_cid}\`;`
*   This URL is then used in `<Image>`, `WebView` (for PDFs using a library like `react-native-pdf` which can take a URI), or `expo-av` components for display/playback (as per Component 10.3).

## 5.4. Sentry (Error Monitoring & Debugging)

Sentry provides real-time error tracking and performance monitoring for the Expo (React Native) app and can be used for backend services as well.

**Expo App Setup (`sentry-expo` - Component 10.6):**

*   **Installation:** `expo install sentry-expo`
*   **Initialization (in `App.tsx` or `App.js`):**
    ```typescript
    import *  as Sentry from 'sentry-expo';

    Sentry.init({
      dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
      enableInExpoDevelopment: true, // Set to false for production builds if desired
      debug: __DEV__, // Only output Sentry debug logs in development
      environment: process.env.NODE_ENV || (__DEV__ ? 'development' : 'production'),
      // release: `understand-me@${Application.nativeApplicationVersion}+${Application.nativeBuildVersion}`, // Requires expo-application
    });
    ```
    *   Ensure `EXPO_PUBLIC_SENTRY_DSN` is set in `.env` and EAS Build secrets.
*   **Capturing Errors:**
    *   Most unhandled JavaScript errors will be automatically captured.
    *   Manually capture errors: `Sentry.Native.captureException(error);`
*   **Adding Context:**
    *   Set user context after login: `Sentry.Native.setUser({ id: userId, email: userEmail });`
    *   Add tags for filtering: `Sentry.Native.setTag("sessionPhase", currentPhase);`
    *   Add breadcrumbs for user actions: `Sentry.Native.addBreadcrumb({ category: 'ui', message: 'User tapped login button', level: 'info' });`
*   **User Feedback:** Integrate Sentry User Feedback dialogs if desired, allowing users to report issues they encounter.
*   **Performance Monitoring:** Configure Sentry for performance monitoring to track screen transitions, API call durations, etc. (Requires additional setup).
*   **Source Maps:** Ensure source maps are correctly uploaded to Sentry during the EAS Build process to get de-minified stack traces. Configure this in `eas.json` and Sentry build steps.

**Monitoring Supabase Edge Functions / PicaOS / Nodely:**

*   **Supabase Edge Functions:** Use the official Sentry Deno SDK or a compatible logging mechanism that forwards errors to Sentry. Configure the DSN and environment as environment variables for the function.
*   **PicaOS/Nodely (if Node.js based):** Use the Sentry Node.js SDK. Initialize Sentry with the appropriate DSN.
    *   Capture exceptions within PicaOS/Nodely logic.
    *   Pass `traceId` or error IDs between services (e.g., Expo app -> PicaOS -> Google GenAI) to correlate issues across the stack in Sentry. PicaOS can generate a `correlationId` for each orchestrated flow and log it with every step.
*   **Best Practices:**
    *   Use distinct Sentry projects or environments (e.g., `understand-me-mobile`, `understand-me-picaos`, `understand-me-supabase-fns`) for different parts of the system for better organization.
    *   Filter out noise (e.g., known benign errors) in Sentry settings.
    *   Set up alerts in Sentry for new or high-frequency issues.
