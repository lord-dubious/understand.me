# Part 3: Deep Dive Service Integrations

## Introduction

This part of the Technical Product Knowledge Base (TPKB) provides a deeper technical dive into the integration and utilization of each key external service within the "Understand.me" architecture. It aims to explain the "how" and "why" of specific integration patterns, API interactions, data flows, and configurations critical for developers to understand when working with these services.

## 3.1. AI Orchestration Layer - The AI Orchestrator

AI Orchestration Layer is conceptualized as the central nervous system for AI-driven functionalities in "Understand.me." It's not a single monolithic service but rather an orchestration layer whose logic might be implemented across Supabase Edge Functions, dedicated microservices (if any), or even Nodely workflows, depending on the specific task's requirements for compute, state management, and interaction with other services. Its primary goal is to decouple the frontend Expo app from the complexities of direct AI model and specialized service interactions.

**Core Architectural Role:**
*   **Stateful AI Context Management:** AI Orchestration Layer maintains the context for ongoing AI interactions, such as session phase, user personality insights, recent conversation history, and active emotional cues. This state might be held in memory for short-lived interactions or persisted/cached in Supabase/Upstash Redis for longer processes or across multiple serverless invocations.
*   **Dynamic Prompt Engineering:** Based on the current context, AI Orchestration Layer dynamically constructs highly specific prompts for Google GenAI, tailoring them for tasks like analysis, summarization, script generation for Udine, or suggesting session adaptations.
*   **Multi-Service Workflow Coordination:** It manages sequences of calls to different services. For example: Expo App -> AI Orchestration Layer -> Google GenAI (STT) -> AI Orchestration Layer -> Google GenAI (LLM for analysis) -> AI Orchestration Layer -> Google GenAI (LLM for Udine script) -> AI Orchestration Layer -> ElevenLabs (TTS) -> AI Orchestration Layer -> Expo App.
*   **API Abstraction & Simplification:** Provides a consistent API interface for the Expo app, abstracting the underlying calls to various AI models and services.

**Interaction Patterns:**

*   **With Google GenAI SDK:**
    *   **Prompts:** AI Orchestration Layer sends detailed prompts incorporating session history, user profiles (from Supabase via AI Orchestration Layer), real-time context (potentially from Dappier), and specific instructions based on the current session phase or required AI task (e.g., "Summarize these points from participant A, considering their preference for direct communication, and identify potential misunderstandings with participant B's statement X").
    *   **Context Window Management:** AI Orchestration Layer is responsible for managing the context window for GenAI, ensuring that the most relevant information is included in prompts without exceeding token limits. This might involve summarizing older parts of the conversation or using techniques like RAG (via Dappier) to inject specific knowledge.
    *   **Function Calling:** Leverages Google GenAI's function calling capabilities to allow the LLM to request AI Orchestration Layer to perform actions or retrieve more information (e.g., "get_user_sentiment_history", "fetch_document_summary_from_dappier").
*   **With ElevenLabs API:**
    *   **Voice Profile Management:** AI Orchestration Layer stores the selected voice ID for Udine.
    *   **Emotional/Styled TTS:** AI Orchestration Layer translates desired emotional tones (e.g., empathetic, assertive, neutral) derived from GenAI's script or session context into appropriate ElevenLabs API parameters (e.g., `voice_settings`, or by selecting pre-configured sub-voices if available). It might also pre-process text with SSML-like tags if ElevenLabs supports the desired nuance.
    *   **Audio Caching Strategy:** AI Orchestration Layer may cache common phrases or frequently generated audio responses from ElevenLabs in Upstash Redis (using a hash of the text and voice settings as a key) to reduce latency and API calls. The cache would store the audio file URL or binary.
*   **With Dappier (Real-time Data & RAG):**
    *   **RAG Triggers:** When AI Orchestration Layer formulates a prompt for Google GenAI and determines that external, specific knowledge is required, it first queries Dappier. For example, if a user mentions a specific internal project code, AI Orchestration Layer asks Dappier for a summary of that project.
    *   **Dappier Query Formulation:** AI Orchestration Layer translates the need for information into a query that Dappier can understand (e.g., keyword search, semantic search if Dappier uses a vector DB).
    *   **Context Injection:** AI Orchestration Layer receives structured data from Dappier and injects it directly into the prompt for Google GenAI.
    *   **Real-time Data Consumption:** AI Orchestration Layer can subscribe to Dappier data streams. When relevant events arrive, AI Orchestration Layer updates its internal session context, potentially triggering proactive Udine interventions or UI updates in the Expo app (via Supabase Realtime).
*   **With Nodely (IPFS Workflows):**
    *   **Triggering IPFS Pinning:** For specific artifacts (e.g., finalized session summaries, evidence files designated by the host), AI Orchestration Layer can initiate a workflow (potentially implemented as a Supabase Edge Function calling Nodely, or a direct Nodely workflow) to retrieve the file from Supabase Storage and pin it to IPFS via Nodely.
    *   **CID Management:** AI Orchestration Layer receives the IPFS CID from Nodely and ensures it's stored appropriately in Supabase (e.g., in `session_files` or `sessions` table).
    *   **Retrieval for AI Context:** If a file stored on IPFS (via Nodely) is needed for AI analysis, AI Orchestration Layer would use the CID and a Nodely/public IPFS gateway to retrieve the content.
*   **With Supabase:**
    *   **Data I/O:** AI Orchestration Layer frequently reads from and writes to Supabase tables (`profiles`, `sessions`, `session_messages`, `session_files`, `growth_insights`, etc.) to fetch context and store results of AI operations or session state. Uses the Supabase JS client.
    *   **Edge Function Invocation:** AI Orchestration Layer might invoke Supabase Edge Functions for specific, isolated backend tasks that are part of a larger orchestration (e.g., a function to dispatch a complex set of notifications after AI Orchestration Layer determines a session milestone).
*   **With Upstash Redis (Caching):**
    *   **AI Results Caching:** AI Orchestration Layer implements cache-aside logic for responses from Google GenAI (e.g., analysis of a document, summaries) and ElevenLabs (audio for common phrases). Cache keys are designed based on input parameters or content hashes.
    *   **Session State Caching:** For long-running or complex sessions, AI Orchestration Layer might cache parts of its internal AI session state in Redis to allow for stateless AI Orchestration Layer instances or faster recovery.
    *   **Rate Limiting Info:** AI Orchestration Layer might use Redis to track API usage against external services like Google GenAI or ElevenLabs to stay within rate limits.

## 3.2. Supabase - BaaS Deep Dive

Supabase provides the foundational backend infrastructure.

*   **Advanced RLS Patterns:**
    *   **Role-Based Access Control (RBAC) via Custom Claims:**
        *   During JWT creation (e.g., via a Supabase Function hook on login/signup), add custom claims to the JWT indicating user roles (e.g., `app_metadata.roles = ['host', 'participant']`).
        *   RLS policies can then use `auth.jwt() -> 'app_metadata' ->> 'roles' LIKE '%host%'`.
    *   **Group/Team Based Access:** If sessions or data can belong to teams/organizations, create linking tables (e.g., `organization_members`) and use `EXISTS` clauses in RLS policies to check membership.
    *   **Time-Limited Access:** For features like temporary access to a shared document, RLS can incorporate timestamp checks against `NOW()`.
    *   **Object Ownership & Shared Access:** Clearly define ownership (e.g., `sessions.host_id`) and use linking tables (`session_participants`) to grant access to shared resources.
*   **Query Performance Tuning:**
    *   **Indexing:** Ensure appropriate indexes are created on frequently queried columns, especially foreign keys, columns used in `WHERE` clauses for filtering (e.g., `sessions.status`, `session_messages.timestamp`), and columns used for ordering. Use `EXPLAIN ANALYZE` to identify slow queries.
    *   **Selective Columns:** Always use `select('column1, specific_column, related_table(related_column)')` instead of `select('*')`.
    *   **Limit Results:** Use `.limit()` and pagination (`.range(from, to)`) for long lists.
    *   **Database Functions (RPC):** For complex queries involving multiple joins, aggregations, or data transformations that are executed frequently, create SQL functions in Supabase and call them via `supabase.rpc('my_function', {param1: value})`. This reduces round trips and can be more performant.
    *   **Connection Pooling:** If AI Orchestration Layer or other backend services make many concurrent connections, ensure they use Supabase's connection pooler (PgBouncer) effectively.
*   **Specific Supabase Edge Function Designs:**
    *   **Nodely IPFS Pinning Trigger (Dev Guide 3.5, 5.3):**
        *   **Trigger:** A Supabase Database Function/Trigger on `session_files` or `sessions` table when a file is marked for IPFS pinning (e.g., a boolean `pin_to_ipfs` flag is set to true).
        *   **Edge Function Logic:**
            1.  Receives payload from trigger (e.g., `session_files` record).
            2.  Retrieves file from Supabase Storage using service role key.
            3.  Calls Nodely API/SDK to pin the file to IPFS.
            4.  Updates the `session_files` record with the returned `ipfs_cid`.
            5.  Handles errors and logs to Sentry.
    *   **Complex Data Transformations for AI Ingestion:**
        *   If data from multiple tables needs to be fetched, joined, and transformed into a specific JSON structure before being sent to AI Orchestration Layer (or directly to Google GenAI by AI Orchestration Layer), an Edge Function can encapsulate this logic. This keeps the client app and AI Orchestration Layer cleaner.
    *   **Webhook Handler for External Services:**
        *   If services like Dappier or a payment gateway send webhooks, an Edge Function can act as the secure endpoint to receive, validate, and process these webhooks, subsequently updating Supabase tables or notifying AI Orchestration Layer.
    *   **Rate Limiting Wrapper for Sensitive Operations (with Upstash Redis):**
        *   An Edge Function can sit in front of a sensitive Supabase operation (e.g., creating many sessions quickly) and use Upstash Redis to enforce rate limits per user.

## 3.3. Dappier - Real-time Data & RAG

Dappier integration focuses on providing external real-time data to sessions and enabling Retrieval Augmented Generation (RAG) for Google GenAI via AI Orchestration Layer.

*   **RAG Implementation Technicals:**
    *   **Document Sources:** Could be internal company documents, project-specific wikis, FAQs, or curated external knowledge bases relevant to the types of discussions "Understand.me" facilitates.
    *   **Indexing Strategy for Dappier:**
        *   Documents are pre-processed (chunked into manageable pieces, metadata extracted).
        *   Embeddings are generated for these chunks (e.g., using Google GenAI embedding models or other embedding services).
        *   These embeddings and their corresponding text chunks/metadata are stored in a vector database that Dappier can access or manage. Dappier provides the API layer over this.
    *   **AI Orchestration Layer Query Patterns to Dappier:**
        *   When a user asks a question or a session context suggests a need for specific information, AI Orchestration Layer converts this into a query.
        *   This query is sent to Dappier, which performs a semantic search (vector similarity search) against the indexed documents.
        *   AI Orchestration Layer might request `top_k` relevant chunks from Dappier.
    *   **Context Injection into GenAI Prompts:** AI Orchestration Layer receives the relevant text chunks from Dappier and prepends them to the main prompt being sent to Google GenAI, instructing GenAI to use this provided context for its response.
        ```typescript
        // AI Orchestration Layer - Conceptual RAG logic
        // async function queryGenAIWithRAG(userInput: string, sessionId: string) {
        //   const dappierContextQuery = userInput; // Or derived from session context
        //   const contextChunks = await dappierService.fetchRelevantContext(dappierContextQuery, { top_k: 3 });
        //
        //   const formattedContext = contextChunks.map(c => c.text).join("\n---\n");
        //   const finalPrompt = `Context:\n${formattedContext}\n\nQuestion: ${userInput}\nAnswer:`;
        //
        //   return await googleGenAISDK.generateText({ prompt: finalPrompt });
        // }
        ```
*   **Real-time Data Feeds Consumption:**
    *   **Mechanism:** AI Orchestration Layer subscribes to Dappier's real-time APIs (e.g., WebSockets, Server-Sent Events, or long polling if necessary) for specific topics or data feeds relevant to active sessions.
    *   **Data Processing:** AI Orchestration Layer receives these events, filters/transforms them as needed, and updates its internal session context.
    *   **Action:** If the real-time data necessitates an intervention or information for users, AI Orchestration Layer may trigger Udine to speak or update UI elements in the Expo app via Supabase Realtime.

## 3.4. Nodely - IPFS Strategy

Nodely facilitates storing and managing important data on IPFS, providing content addressing and potential immutability.

*   **Workflow for IPFS Storage via Nodely:**
    *   **What Data:** Finalized session summaries (PDFs), critical evidence files uploaded by users that require an immutable audit trail, signed agreements (if not handled by Dappier).
    *   **Triggers:**
        *   Session summary digitally signed by all participants (Screen 8.3).
        *   Host explicitly marks a `session_file` for IPFS pinning.
        *   A AI Orchestration Layer workflow determines a file needs long-term immutable storage.
    *   **Process (Typically via Supabase Edge Function or AI Orchestration Layer backend task):**
        1.  The backend service authenticates with Nodely (API Key).
        2.  It retrieves the file binary from Supabase Storage.
        3.  It sends the file binary to Nodely's pinning API/SDK.
        4.  Nodely pins the file to its IPFS node(s) and/or configured third-party pinning services.
        5.  Nodely returns the IPFS CID (Content Identifier) and potentially a URL to Nodely's IPFS gateway.
    *   **CID Management in Supabase:** The returned CID (and gateway URL if applicable) is stored in the appropriate Supabase table (e.g., `sessions.final_summary_ipfs_cid` or `session_files.ipfs_cid`).
*   **Retrieval for Expo App:**
    *   The Expo app fetches the record from Supabase, which includes the `ipfs_cid`.
    *   It constructs a URL using a configured IPFS gateway (e.g., `process.env.EXPO_PUBLIC_NODELY_GATEWAY_URL/ipfs/{cid}` or a public gateway like `https://ipfs.io/ipfs/{cid}`).
    *   This URL is used with `WebView` (for PDFs via `react-native-pdf`), `<Image>`, or `expo-av` for display/playback.
*   **Data Security/Privacy on IPFS:**
    *   **Public Data:** Files pinned to public IPFS are, by nature, publicly accessible if someone knows their CID. This is suitable for documents intended for wide distribution or transparency.
    *   **Private Data on IPFS (More Complex):**
        *   If sensitive data needs IPFS benefits (e.g., for user-controlled storage via DID), files must be encrypted **before** being uploaded to IPFS via Nodely.
        *   Encryption keys must be managed securely, potentially by the user themselves (e.g., via Dappier for key management linked to their DID) or by AI Orchestration Layer/Supabase for application-managed encryption.
        *   The Expo app would need access to the decryption key to display the file. This significantly increases complexity. For "Understand.me," IPFS via Nodely is primarily considered for documents where public verifiability or decentralized persistence of non-sensitive or publicly agreed-upon records is desired. Sensitive data primarily resides in Supabase Storage with RLS.

## 3.5. ElevenLabs - Voice Modalities

ElevenLabs provides Udine's voice. AI Orchestration Layer manages the interaction.

*   **Emotional Adaptation for Udine's Voice:**
    *   AI Orchestration Layer determines the desired emotion/style for Udine's response based on context from Google GenAI or session flow logic.
    *   It can influence ElevenLabs output by:
        *   **Modifying `voice_settings`:** Adjusting `stability`, `similarity_boost`, and `style` parameters in the API call (Dev Guide 5.1). Requires experimentation to map desired emotions to setting values.
        *   **Using different pre-configured Voice IDs:** If multiple voice variations for Udine (e.g., "Udine-Empathetic," "Udine-Neutral," "Udine-Assertive") are cloned or created in ElevenLabs, AI Orchestration Layer can select the appropriate `voice_id` for the API call.
        *   **Text Pre-processing (SSML-like):** AI Orchestration Layer can slightly modify the input text with emphasis or pacing cues if ElevenLabs supports a simple form of markup for this.
*   **STT Accuracy Considerations:**
    *   While primary STT is Google GenAI, if ElevenLabs STT were used, factors include audio quality (handled by Expo app's `expo-av` settings), background noise, speaker accents, and the specific ElevenLabs STT model chosen. AI Orchestration Layer would simply relay audio to ElevenLabs and get text back.
*   **Future Voice/Language Management:**
    *   **Multiple Languages for Udine:** If Udine needs to speak other languages, an ElevenLabs model supporting those languages (e.g., `eleven_multilingual_v2`) is essential. AI Orchestration Layer would pass the target language and appropriately translated text to ElevenLabs.
    *   **User Voice Customization (Advanced Future Feature):** Allowing users to choose Udine's voice from a selection of pre-defined, high-quality voices. AI Orchestration Layer would store the user's preference and use the corresponding `voice_id`.

## 3.6. Upstash Redis - Caching Architecture

Upstash Redis serves as a high-speed, serverless caching layer accessed by backend components (AI Orchestration Layer, Supabase Edge Functions).

*   **Detailed Caching Layers & Strategies:**
    *   **Level 1: Hot Data / Frequently Accessed DB Queries:**
        *   **Data:** User profiles (after initial fetch), session type templates, lists of public resources, active session metadata needed frequently by AI Orchestration Layer.
        *   **Strategy:** Cache-aside pattern. AI Orchestration Layer/Edge Function checks Redis first. On miss, fetches from Supabase, populates Redis with a moderate TTL (e.g., 5-60 minutes).
        *   **Invalidation:** TTL-based for most. Event-driven (Supabase trigger -> Edge Function -> Redis `DEL`) for critical changes (e.g., user updates profile name).
    *   **Level 2: AI Computation Results:**
        *   **Data:** Google GenAI responses for specific, repeatable analyses (e.g., sentiment of a fixed text, summary of a document if it hasn't changed, initial conflict analysis if inputs are identical on a retry). Udine's common scripted responses.
        *   **Strategy:** Cache-aside. AI Orchestration Layer generates a cache key based on input hash or stable identifiers. Stores GenAI JSON response.
        *   **Invalidation:** Longer TTLs possible (e.g., hours, or until input data explicitly changes). Active invalidation by AI Orchestration Layer if it knows the source data for an analysis has been updated.
    *   **Level 3: Session State Snippets (for AI Orchestration Layer):**
        *   **Data:** Key elements of AI Orchestration Layer's internal AI session state if AI Orchestration Layer instances are stateless or need quick recovery (e.g., current phase, summary of last user utterance, key emotional indicators).
        *   **Strategy:** AI Orchestration Layer reads/writes this state to Redis frequently during an active session. Shorter TTLs, focused on current session persistence.
    *   **Level 4: Rate Limiting / Distributed Counters:**
        *   **Data:** Counters for API calls to external services (GenAI, ElevenLabs), session code validation attempts.
        *   **Strategy:** Increment/check values in Redis. TTLs define the window for rate limiting.
*   **Cache Key Design (Examples):**
    *   User Profile: `profile:{user_id}`
    *   Session Templates: `session_templates:all`
    *   AI Analysis of File: `file_analysis:{file_id}:{analysis_type}`
    *   GenAI Response for Prompt: `genai_resp:{prompt_hash}`
    *   Session State: `ai_orchestration_layer_session_state:{session_id}`
*   **Performance Impact Analysis:**
    *   Monitor cache hit/miss ratios in Upstash console or via Redis metrics.
    *   Low hit ratio for a given key might indicate TTL is too short, key is too specific, or data isn't suitable for caching.
    *   High hit ratio significantly reduces load on Supabase and AI services, lowering latency and cost.
    *   Measure end-to-end response times for AI Orchestration Layer endpoints with and without caching to quantify impact.
