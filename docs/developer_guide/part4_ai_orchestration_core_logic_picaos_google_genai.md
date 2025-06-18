# Part 4: AI Orchestration & Core Logic (PicaOS & Google GenAI)

This part of the Developer Guide details how "Understand.me" uses PicaOS as its central AI orchestration layer and how PicaOS, in turn, leverages the Google GenAI SDK (e.g., Gemini) for core language understanding, insight generation, and powering "Alex," our AI mediator.

## 4.1. Introduction to PicaOS in Understand.me

PicaOS is conceptualized as an intelligent middleware or orchestration engine specifically designed for "Understand.me." Its primary role is to act as the "brain" that coordinates complex AI-driven tasks, manages state for AI interactions, and simplifies the mobile application's communication with various backend AI services.

**Key Responsibilities of PicaOS:**

*   **AI Service Abstraction:** PicaOS provides a unified interface for the Expo (React Native) application to access AI functionalities. The mobile app doesn't need to know the specifics of each underlying AI service (Google GenAI, ElevenLabs, or potential future services for specific tasks like advanced sentiment analysis or topic modeling).
*   **Orchestration of AI Tasks:** For complex operations (e.g., analyzing a conflict description with multimedia, generating a dynamic response for Alex based on session phase and user input, synthesizing pre-session inputs), PicaOS breaks down the request, calls the appropriate services in the correct sequence, and aggregates the results.
*   **Context Management:** PicaOS maintains the context of an ongoing user interaction or session (e.g., current session phase, user personality profiles, recently discussed topics) to enable more relevant and coherent AI responses.
*   **Prompt Engineering & Adaptation:** PicaOS may be responsible for sophisticated prompt engineering for Google GenAI, adapting prompts based on the current context, user profiles, or desired output format.
*   **Data Transformation:** It transforms data received from the Expo app into formats suitable for Google GenAI or other services, and transforms the responses back into a format the app can easily consume.
*   **Simplified API for Mobile App:** It exposes a cleaner, more focused API (or set of SDK methods) for the Expo app, reducing the complexity of direct integrations with multiple AI services from the client-side.
*   **Integration with Other Services:** PicaOS is the primary point of contact for services like Dappier (for real-time data or RAG) and Nodely (for IPFS interactions or complex workflows) when these services are needed to inform AI logic or store AI-generated artifacts.

**PicaOS Tools/SDKs for Developers:**

*   If PicaOS is a self-contained service/platform, developers might interact with it via:
    *   **PicaOS Client SDK (Conceptual):** A TypeScript library provided for the Expo app to easily make calls to PicaOS endpoints, handling authentication and request/response typing.
    *   **PicaOS Service Definition Files:** Configuration files or schemas (e.g., OpenAPI/Swagger if PicaOS exposes REST APIs, or Protobuf/gRPC definitions) that define the available PicaOS operations and their expected inputs/outputs.
*   If PicaOS logic is embedded within another backend (e.g., as a set of orchestrated Supabase Edge Functions or Nodely workflows), developers would use the standard Supabase client or Nodely SDK, with PicaOS being a conceptual layer within those function calls. For this guide, we'll assume PicaOS has distinct endpoints or SDK methods the app calls.

## 4.2. Implementing "Alex" - The AI Mediator (Logic Layer)

PicaOS is central to implementing Alex's functionalities, primarily by orchestrating calls to Google GenAI and ElevenLabs.

**4.2.1. Conversational Personality Assessment (Screen 2.3)**

1.  **User Input (Expo App):** Participant provides text or voice input (transcribed by Component 10.1 using `expo-av` and potentially a Google STT API via PicaOS or directly).
2.  **Request to PicaOS:** Expo app sends the user's response and current assessment state/question ID to a PicaOS endpoint (e.g., `/assess/next_step`).
3.  **PicaOS Logic:**
    *   Stores/updates the user's answer in Supabase (via `profiles.preferred_communication_style`).
    *   Sends the user's response and conversation history for the assessment to **Google GenAI** with a prompt designed to:
        *   Analyze the response for key preferences.
        *   Determine the next appropriate question or conclude the assessment.
        *   Generate the script for Alex's next utterance.
4.  **Google GenAI Response:** Returns structured data (e.g., next question, Alex's script, flags for completion) to PicaOS.
5.  **PicaOS to ElevenLabs (for voice):** PicaOS sends Alex's script to ElevenLabs API (or a Supabase Edge Function that calls ElevenLabs) to synthesize voice.
6.  **Response to Expo App:** PicaOS returns the next question's data, Alex's script (text), and the URL/data for Alex's synthesized voice (from ElevenLabs) to the Expo app.
7.  **UI Update (Expo App):** Displays the new question and Alex's response (text and voice via Component 10.2).

**4.2.2. Conflict Analysis (Screen 4.1 & 4.2)**

1.  **Host Input (Expo App):** Host provides session title, description (text), and uploads multimedia files (Component 10.3, files to Supabase Storage).
2.  **Request to PicaOS:** Expo app sends text inputs and references (e.g., storage paths) to uploaded files to a PicaOS endpoint (e.g., `/session/analyze_conflict`).
3.  **PicaOS Logic:**
    *   Retrieves text content of documents (if applicable, e.g., from Supabase Storage). PicaOS might use Nodely to fetch files if they are on IPFS.
    *   If video/audio files are uploaded, PicaOS might use a Speech-to-Text service (e.g., Google GenAI's STT or a dedicated service) to get transcripts. PicaOS could manage this STT task.
    *   If images are uploaded, PicaOS might use a vision-enabled model from **Google GenAI** to understand image content.
    *   PicaOS compiles all available context (host's text, transcribed audio/video, image analysis, document text) into a comprehensive prompt for **Google GenAI**.
    *   The prompt instructs Google GenAI to identify key themes, sentiments, entities, potential areas of disagreement, and suggest talking points.
4.  **Google GenAI Response:** Returns structured analysis (JSON) to PicaOS.
5.  **Response to Expo App:** PicaOS forwards the structured analysis to the Expo app for display on Screen 4.2.

**4.2.3. Dynamic Adaptation & Session Flow Logic (Part 7)**

*   **Session State Management:** PicaOS maintains critical AI-related session state, such as:
    *   Current active phase (Prepare, Express, Understand, Resolve, Heal).
    *   Synthesized inputs from Host and Participants.
    *   Identified personality profiles of participants involved.
    *   Real-time emotional cues (if Component 10.5 is enabled and feeding data to PicaOS, potentially via Dappier for real-time aggregation).
    *   Tracked agreements and action items.
*   **Rule-Based Logic & LLM Decisions:**
    *   PicaOS implements the core logic for transitioning between session phases.
    *   Within each phase, Alex's responses and interventions are often dynamically generated. PicaOS takes the current speaker's input (from live transcription), the session state, personality profiles, and the specific goals of the current phase, and formulates a prompt for **Google GenAI**.
    *   **Example (Understand Phase):** If Participant A just spoke, and PicaOS has Participant B's personality profile (prefers summaries) and the session goal is "clarify understanding," PicaOS might prompt Google GenAI: "Given Participant A said [transcript snippet A], and Participant B prefers summaries, generate a concise summary of A's point and a clarifying question for B to ask A."
    *   **Example (Emotional Cue):** If Dappier (via PicaOS) signals rising negative sentiment from a user whose profile indicates they withdraw when frustrated, PicaOS might prompt Google GenAI for a gentle intervention script for Alex to use.
*   **PicaOS Role:** PicaOS acts as the stateful engine that decides *when* to call Google GenAI, *what context* to provide it, and *how to use* its output to guide the session and formulate Alex's next actions/scripts.

**4.2.4. Generating Mediation Responses (Alex's Scripting)**

1.  **User Input/Session Event (Expo App):** User speaks (transcribed and sent), types a message, or a session event occurs (e.g., timer up for a phase). This is sent to PicaOS.
2.  **PicaOS Contextualization:** PicaOS gathers relevant context: current phase, previous turn's content, user profiles, session goals, any active emotional state indicators (Component 10.5), data from Dappier if applicable (e.g., RAG results for a factual query).
3.  **Query Google GenAI:** PicaOS sends a carefully crafted prompt to Google GenAI to generate Alex's next script. This prompt will instruct GenAI on the desired tone, objective (e.g., clarify, summarize, transition, mediate disagreement), and incorporate the contextual information.
4.  **Google GenAI Response:** Returns the suggested script for Alex (text).
5.  **PicaOS Post-processing (Optional):** PicaOS might do minor formatting or add/select quick reply options to accompany Alex's script.
6.  **PicaOS to ElevenLabs:** PicaOS sends the final script to ElevenLabs for voice synthesis.
7.  **Response to Expo App:** PicaOS sends the text script, quick replies, and voice URL to the Expo app for Alex to deliver (Component 10.2).

## 4.3. API Design between Expo App and PicaOS

The Expo app will interact with PicaOS via a set of well-defined API endpoints. PicaOS will expose these endpoints, and the Expo app will use a Client SDK or direct HTTPS calls (using a library like Axios or Fetch) to interact with them. Authentication will likely be handled via JWTs (obtained from Supabase Auth) passed in the Authorization header.

**Assumed Interaction Model: PicaOS as a RESTful/HTTP API Service**

*   **Base URL:** `process.env.EXPO_PUBLIC_PICAOS_API_ENDPOINT`
*   **Authentication:** `Authorization: Bearer <supabase_jwt>`

**Example Endpoints & Payloads (Conceptual):**

1.  **Start Personality Assessment:**
    *   `POST /assessment/start`
    *   Request Body: `{ userId: string }`
    *   Response Body: `{ firstQuestion: object, alexScript: string, alexVoiceUrl: string }`
2.  **Submit Assessment Answer & Get Next:**
    *   `POST /assessment/submit_answer`
    *   Request Body: `{ userId: string, questionId: string, answer: any, history: object[] }`
    *   Response Body: `{ nextQuestion?: object, alexScript: string, alexVoiceUrl: string, isComplete: boolean }`
3.  **Analyze Conflict Description:**
    *   `POST /session/analyze_conflict`
    *   Request Body: `{ userId: string, title: string, description: string, fileReferences: [{fileName: string, storagePath: string, type: string}] }`
    *   Response Body: `{ analysisId: string, themes: string[], sentiment: object, divergences: object[], talkingPoints: string[] }` (as per Screen 4.2)
4.  **Process In-Session User Input / Get Alex's Next Action:**
    *   `POST /session/{sessionId}/process_turn`
    *   Request Body: `{ userId: string, currentPhase: string, transcriptSnippet?: string, typedMessage?: string, sessionState: object, emotionalCues?: object }`
    *   Response Body: `{ alexScript: string, alexVoiceUrl: string, uiActions?: object[], nextPhase?: string, updatedSessionState: object }` (uiActions could tell app to highlight something, start a poll, etc.)
5.  **Request AI Summary (Post-Session):**
    *   `GET /session/{sessionId}/generate_summary`
    *   Response Body: `{ summaryText: string, keyDecisions: object[], actionItems: object[] }` (as per Screen 8.1)

**Using a PicaOS Client SDK (Conceptual):**

If a PicaOS client SDK is provided (e.g., `picaos-client-js`):

```typescript
import PicaOSClient from 'picaos-client-js';

const picaos = new PicaOSClient(process.env.EXPO_PUBLIC_PICAOS_API_ENDPOINT, getSupabaseToken); // getSupabaseToken is a function to retrieve the current JWT

async function handleUserMessage(sessionId, message) {
  try {
    const response = await picaos.processSessionTurn(sessionId, {
      userId: currentUserId,
      currentPhase: 'Express',
      typedMessage: message,
      // ... other state
    });
    // Update UI with Alex's response (response.alexScript, response.alexVoiceUrl)
  } catch (error) {
    // Handle error
  }
}
```

## 4.4. Error Handling & Fallbacks for AI Services

Robust error handling is crucial when dealing with external AI services. PicaOS should implement strategies, and the Expo app must handle errors gracefully from PicaOS.

*   **PicaOS Responsibilities:**
    *   **Timeouts:** Implement reasonable timeouts for calls to Google GenAI, ElevenLabs, Dappier, etc.
    *   **Retries:** Implement retry logic (e.g., exponential backoff) for transient network errors or rate limit issues from AI services.
    *   **Graceful Degradation:**
        *   If a specific AI insight fails (e.g., sentiment analysis), PicaOS should still attempt to provide other parts of the response.
        *   If Alex's voice synthesis (ElevenLabs) fails, PicaOS should still return the text script so Alex can "speak" via text in the UI.
        *   If a complex Google GenAI call for dynamic response generation fails, PicaOS might have simpler, pre-defined fallback scripts for Alex based on the session phase (e.g., "Let's move to the next point," or "Could you please rephrase that?").
    *   **Clear Error Codes/Messages:** PicaOS API should return clear error codes and messages to the Expo app so it can react appropriately.
*   **Expo App Responsibilities:**
    *   **Network Request Errors:** Handle failures in API calls to PicaOS (e.g., network down, PicaOS service unavailable). Show a generic error message (Toast or Modal - Components 10.6, 10.7) like "Could not connect to Alex. Please check your internet connection."
    *   **Specific PicaOS Errors:** Based on error codes from PicaOS:
        *   If Alex's voice couldn't be loaded: Default to text-only display for that utterance.
        *   If an AI analysis task partially failed: Display the parts that succeeded with a note about what's missing.
        *   If a critical AI function fails (e.g., cannot get next step in assessment): Show an informative error message and potentially offer a "Try Again" option or guide the user to skip/exit the flow.
    *   **User Feedback:** Allow users to report persistent AI-related issues. This feedback can be logged to Sentry.

## 4.5. Caching AI Responses & PicaOS Orchestrations with Upstash Redis

To optimize performance, reduce costs associated with repeated AI service calls, and improve user experience by providing faster responses, PicaOS can leverage Upstash Redis for caching various types of data.

*   **What to Cache:**
    *   **Google GenAI Responses:**
        *   Responses to common or less dynamic prompts (e.g., generic explanations, definitions, certain types of session setup suggestions if context doesn't vary wildly).
        *   Summaries or analyses of specific inputs (text or multimedia) if the input itself hasn't changed. For example, the synthesized overview from multiple pre-session inputs (Screen 6.1 / Dev Guide 6.4.A) can be cached.
        *   Results of computationally expensive GenAI tasks.
    *   **ElevenLabs Voice Audio:** While ElevenLabs also offers its own caching, PicaOS might cache URLs to generated audio files (or even the audio data for very short, extremely common phrases if stored in a temporary Redis cache) to avoid repeated API calls for identical text scripts.
    *   **Orchestration State/Results:** Intermediate results or state within a complex PicaOS orchestration flow, especially if the flow can be paused or resumed, or if parts of it are idempotent and frequently requested with the same parameters.
    *   **Frequently Accessed Data for Prompts:** If PicaOS frequently fetches certain data from Supabase or Dappier to build prompts for Google GenAI, this data itself can be cached in Redis to speed up prompt assembly.
*   **Caching Strategies (Implemented within PicaOS):**
    *   **Cache Key Design:** Critical for effective caching. Keys should be deterministic and incorporate all relevant parameters that define the uniqueness of the request (e.g., `genai_summary:{session_id}:{inputs_hash}`, `alex_voice:{script_hash}`, `user_profile_for_ai:{user_id}`).
    *   **Time-To-Live (TTL):** Set appropriate TTLs for cached data based on its volatility and how quickly it might become stale. Some AI responses might be valid for hours or days, while others (e.g., based on rapidly changing session context) might need shorter TTLs or more active invalidation.
    *   **Cache Invalidation:**
        *   **Active Invalidation:** When underlying data that an AI response was based on changes (e.g., user updates their conflict description, new participant perspectives are added), PicaOS should invalidate the relevant cache entries.
        *   **Event-Driven Invalidation:** Supabase triggers or application events can signal PicaOS to clear specific caches.
    *   **Conditional Caching:** Only cache responses that are deterministic or where slight staleness is acceptable. Do not cache highly personalized, real-time dynamic AI interactions unless the exact same inputs are expected repeatedly in a short timeframe.
*   **Interaction with Upstash Redis (from PicaOS):**
    *   PicaOS (whether a separate service or embedded in Edge Functions/Nodely) will use a Redis client compatible with its language environment (e.g., `ioredis` for Node.js, Deno Redis clients).
    *   Securely manage Upstash Redis connection URL and token via PicaOS environment variables.
*   **Example: PicaOS Caching a Google GenAI Summary Response (Conceptual):**
    ```typescript
    // In PicaOS logic
    // const redis = new RedisClient(process.env.UPSTASH_REDIS_URL, process.env.UPSTASH_REDIS_TOKEN);

    // async function getSessionSynthesisWithCache(sessionId: string, inputsHash: string): Promise<any> {
    //   const cacheKey = `synthesis:${sessionId}:${inputsHash}`;
    //   let cachedSynthesis = await redis.get(cacheKey);

    //   if (cachedSynthesis) {
    //     console.log(`Cache hit for synthesis: ${sessionId}`);
    //     return JSON.parse(cachedSynthesis);
    //   }

    //   console.log(`Cache miss for synthesis: ${sessionId}. Generating...`);
    //   // 1. Fetch inputs from Supabase
    //   // 2. Construct prompt for Google GenAI
    //   const synthesisResult = await googleGenAI.generate(prompt); // Call to Google GenAI
    //   // 3. Store original result in Supabase (e.g., sessions.ai_synthesis_summary)
    //   // 4. Cache the result in Redis for, e.g., 1 hour
    //   await redis.set(cacheKey, JSON.stringify(synthesisResult), { ex: 3600 });

    //   return synthesisResult;
    // }
    ```
*   **Benefits:**
    *   **Reduced Latency:** Faster responses for frequently requested AI operations.
    *   **Cost Savings:** Fewer direct calls to potentially expensive GenAI and ElevenLabs APIs.
    *   **Reduced Load:** Less pressure on AI services and backend databases.
*   **Considerations for Developers:**
    *   When calling PicaOS endpoints from the Expo app, understand that some responses might be served from cache. This is generally transparent to the client but explains faster response times for repeated identical requests.
    *   If debugging AI behavior, it might be necessary for PicaOS to offer a way to bypass the cache for specific test calls.
*   **Sentry Integration:** Both PicaOS and the Expo app should report errors to Sentry for monitoring and debugging. This includes errors from interactions with Google GenAI, ElevenLabs, Dappier, and Nodely.
