# Part 3: Core Backend & Data Management (Supabase)

This part of the Developer Guide provides a detailed overview of how "Understand.me" utilizes Supabase for its core backend functionalities, including data modeling, authentication, database interactions, real-time features, file storage, and serverless functions.

## 3.1. Detailed Data Models

The following data models are implemented in Supabase PostgreSQL. These tables are designed to store all necessary information for the application's functionality. The base schema can be found in `supabase/migrations/[timestamp]_initial_schema.sql` and subsequent migration files.

*(Based on `serverless-implementation-complete.md` and expanded for clarity)*

**1. `profiles` Table:** Stores user account information.
    *   `id` (uuid, primary key, default: `auth.uid()`, references `auth.users`): User ID, linked to Supabase Auth.
    *   `created_at` (timestamp with time zone, default: `now()`): Timestamp of profile creation.
    *   `updated_at` (timestamp with time zone, default: `now()`): Timestamp of last profile update.
    *   `full_name` (text): User's full name.
    *   `avatar_url` (text, nullable): URL to the user's avatar image (stored in Supabase Storage).
    *   `email` (text, unique, indexed): User's email, primarily managed by `auth.users` but can be synced here.
    *   `preferred_communication_style` (jsonb, nullable): Stores preferences from Conversational Personality Assessment (Screen 2.3). E.g., `{"pace": "moderate", "detail_level": "summary"}`.
    *   `onboarding_completed` (boolean, default: `false`): Flag indicating if the user has completed the initial onboarding flow.
    *   *Constraints:* `id` is a foreign key to `auth.users.id`. `email` should be unique.

**2. `sessions` Table:** Stores information about each communication session.
    *   `id` (uuid, primary key, default: `gen_random_uuid()`): Unique session ID.
    *   `created_at` (timestamp with time zone, default: `now()`): Timestamp of session creation.
    *   `host_id` (uuid, references `profiles.id`): The user ID of the session host.
    *   `title` (text, not null): Title of the session (from Screen 4.1).
    *   `description_context` (text, nullable): Initial description/conflict provided by the host (Screen 4.1).
    *   `session_type` (text, nullable): Type of session configured (e.g., "mediated_discussion", "problem_solving" - Screen 4.3).
    *   `status` (text, default: `'scheduled'`): Current status (e.g., `'scheduled'`, `'in_progress'`, `'completed'`, `'cancelled'`).
    *   `scheduled_start_time` (timestamp with time zone, nullable): Scheduled start time.
    *   `actual_start_time` (timestamp with time zone, nullable): Actual start time.
    *   `actual_end_time` (timestamp with time zone, nullable): Actual end time.
    *   `goals` (jsonb, nullable): Session goals defined by host (Screen 6.2). E.g., `["Goal 1", "Goal 2"]`.
    *   `rules` (jsonb, nullable): Session rules defined by host (Screen 6.2). E.g., `["Rule 1", "Rule 2"]`.
    *   `ai_synthesis_summary` (text, nullable): AI-generated synthesis of all pre-session inputs (Screen 6.1).
    *   `final_summary_pdf_url` (text, nullable): Link to the final signed-off PDF summary (potentially on IPFS via Nodely).
    *   *Constraints:* `host_id` foreign key.

**3. `session_participants` Table:** Links users from `profiles` to `sessions`.
    *   `id` (bigint, primary key, generated always as identity): Unique link ID.
    *   `session_id` (uuid, references `sessions.id` on delete cascade): Foreign key to sessions.
    *   `profile_id` (uuid, references `profiles.id` on delete cascade): Foreign key to profiles.
    *   `role` (text, nullable, default: `'participant'`): Role in the session (e.g., `'host'`, `'participant'`, `'observer'`).
    *   `joined_at` (timestamp with time zone, nullable): Timestamp when participant joined.
    *   `perspective_text` (text, nullable): Pre-session perspective shared by participant (Screen 5.4).
    *   `invitation_status` (text, default: `'pending'`): e.g., `'pending'`, `'accepted'`, `'declined'` (Screen 4.5).
    *   `signed_off_summary` (boolean, default: `false`): True if participant signed off on summary (Screen 8.3).
    *   `sign_off_timestamp` (timestamp with time zone, nullable).
    *   *Constraints:* Composite unique key on (`session_id`, `profile_id`).

**4. `session_messages` Table:** Stores individual messages/utterances from a session.
    *   `id` (bigint, primary key, generated always as identity): Unique message ID.
    *   `session_id` (uuid, references `sessions.id` on delete cascade): Foreign key to sessions.
    *   `session_participant_id` (bigint, nullable, references `session_participants.id`): Who said/wrote it. Nullable if system message or unassigned.
    *   `profile_id` (uuid, nullable, references `profiles.id`): Denormalized `profile_id` for easier querying.
    *   `timestamp` (timestamp with time zone, default: `now()`): Time of message.
    *   `message_type` (text, default: `'speech_transcript'`): e.g., `'speech_transcript'`, `'user_typed_message'`, `'alex_guidance'`, `'poll_created'`.
    *   `content` (text, not null): The transcribed speech, typed message, or system message content.
    *   `sentiment_analysis` (jsonb, nullable): AI-generated sentiment for this message. E.g. `{"score": 0.8, "label": "positive"}`.
    *   `is_edited` (boolean, default: `false`): If the transcript was manually edited.
    *   *Indexes:* On `session_id`, `timestamp`.

**5. `session_files` Table:** Tracks files uploaded for session context or during a session.
    *   `id` (uuid, primary key, default: `gen_random_uuid()`): Unique file ID.
    *   `session_id` (uuid, references `sessions.id` on delete cascade): Associated session.
    *   `uploader_profile_id` (uuid, references `profiles.id`): Who uploaded the file.
    *   `file_name` (text, not null): Original file name.
    *   `storage_path` (text, not null, unique): Path to the file in Supabase Storage.
    *   `ipfs_cid` (text, nullable, unique): IPFS Content Identifier if pinned via Nodely.
    *   `file_type` (text): MIME type of the file.
    *   `file_size` (bigint): Size in bytes.
    *   `description` (text, nullable): Optional description of the file.
    *   `uploaded_at` (timestamp with time zone, default: `now()`).
    *   `ai_analysis_snippet` (text, nullable): Brief AI-generated summary or key points from the file.
    *   *RLS:* Users can only see files associated with sessions they are part of. Hosts can upload/delete. Participants can upload if allowed by session type (e.g. their perspective files).

**6. `growth_insights` Table:** Stores personalized growth feedback for users.
    *   `id` (bigint, primary key, generated always as identity).
    *   `profile_id` (uuid, references `profiles.id` on delete cascade): The user receiving the insight.
    *   `session_id` (uuid, nullable, references `sessions.id` on delete set null): The session from which this insight was derived (can be null for general insights).
    *   `insight_type` (text, not null): e.g., `'clarity_score'`, `'filler_word_frequency'`, `'sentiment_trend'`, `'conflict_pattern'`.
    *   `insight_data` (jsonb, not null): Specific data for the insight (e.g., `{"score": 4.5, "trend": "up"}`).
    *   `generated_at` (timestamp with time zone, default: `now()`).
    *   `viewed_at` (timestamp with time zone, nullable).
    *   *RLS:* Users can only access their own growth insights.

**7. `achievements` Table:** Tracks earned badges/achievements.
    *   `id` (bigint, primary key, generated always as identity).
    *   `profile_id` (uuid, references `profiles.id` on delete cascade): The user who earned it.
    *   `badge_id` (text, not null): Unique identifier for the badge type (e.g., `'clarity_champion_1'`, `'active_listener_bronze'`).
    *   `achieved_at` (timestamp with time zone, default: `now()`).
    *   `details` (jsonb, nullable): Any specific details about this achievement instance.
    *   *RLS:* Users can only access their own achievements.

**8. `session_evaluations` Table:** Stores feedback provided by participants about a session.
    *   `id` (bigint, primary key, generated always as identity).
    *   `session_id` (uuid, references `sessions.id` on delete cascade).
    *   `evaluator_profile_id` (uuid, references `profiles.id` on delete cascade).
    *   `rating_overall_satisfaction` (integer, check: `rating_overall_satisfaction BETWEEN 1 AND 5`, nullable).
    *   `rating_clarity_goals` (integer, check: `rating_clarity_goals BETWEEN 1 AND 5`, nullable).
    *   `rating_fairness_balance` (integer, check: `rating_fairness_balance BETWEEN 1 AND 5`, nullable).
    *   `rating_alex_helpfulness` (integer, check: `rating_alex_helpfulness BETWEEN 1 AND 5`, nullable).
    *   `feedback_worked_well` (text, nullable).
    *   `feedback_could_improve` (text, nullable).
    *   `feedback_alex_specific` (text, nullable).
    *   `share_with_host` (boolean, default: `false`): If non-platform feedback should be shared (anonymously) with host.
    *   `submitted_at` (timestamp with time zone, default: `now()`).
    *   *RLS:* Users can only submit their own feedback. Host might see anonymized, aggregated feedback if `share_with_host` is true for those entries.

## 3.2. Authentication & Authorization

Supabase Auth provides a robust foundation for user authentication and authorization.

*   **Authentication Methods:**
    *   **Email/Password:** Standard sign-up and login (Supabase `signUp`, `signInWithPassword`).
    *   **Social Logins:** Google, Apple (and potentially others) configured via Supabase Auth dashboard and implemented in Expo using `expo-auth-session` or specific provider SDKs (e.g., `expo-apple-authentication`).
    *   **Password Reset:** "Forgot Password" flow initiated by `resetPasswordForEmail`.
*   **User Sessions in Expo:**
    *   The Supabase JS client (`@supabase/supabase-js`) handles session management automatically.
    *   On app launch, check for an active session: `supabase.auth.getSession()`.
    *   Listen to auth state changes: `supabase.auth.onAuthStateChange((event, session) => { ... })`. This is crucial for updating UI and navigation based on login/logout events.
    *   Securely store session tokens (handled by the client library, typically in AsyncStorage in React Native).
*   **Row Level Security (RLS) Policies:** RLS is critical for securing data access. Policies are defined in SQL and applied to tables. **RLS should be enabled on all tables containing user data.**

    **Example RLS Policies:**

    *   **`profiles` Table:**
        ```sql
        -- Users can only see their own profile.
        CREATE POLICY "Users can view own profile" ON profiles
        FOR SELECT USING (auth.uid() = id);

        -- Users can update their own profile.
        CREATE POLICY "Users can update own profile" ON profiles
        FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

        -- Profiles are publicly readable if needed for avatars/names in sessions (consider carefully)
        -- OR create specific policies for session participants to view profiles of others in their session.
        ```

    *   **`sessions` Table:**
        ```sql
        -- Users can view sessions they are a host of or a participant in.
        CREATE POLICY "Users can view their sessions" ON sessions
        FOR SELECT USING (
          auth.uid() = host_id OR
          EXISTS (
            SELECT 1 FROM session_participants sp
            WHERE sp.session_id = sessions.id AND sp.profile_id = auth.uid()
          )
        );

        -- Hosts can create sessions.
        CREATE POLICY "Hosts can create sessions" ON sessions
        FOR INSERT WITH CHECK (auth.uid() = host_id);

        -- Hosts can update their own sessions.
        CREATE POLICY "Hosts can update their own sessions" ON sessions
        FOR UPDATE USING (auth.uid() = host_id) WITH CHECK (auth.uid() = host_id);
        ```

    *   **`session_participants` Table:**
        ```sql
        -- Users can view participant records for sessions they are part of.
        CREATE POLICY "Users can view participants of their sessions" ON session_participants
        FOR SELECT USING (
          EXISTS (
            SELECT 1 FROM sessions s
            WHERE s.id = session_participants.session_id AND
                  (s.host_id = auth.uid() OR
                   EXISTS (SELECT 1 FROM session_participants sp_inner
                           WHERE sp_inner.session_id = s.id AND sp_inner.profile_id = auth.uid()))
          )
        );

        -- Hosts can add/manage participants for their sessions.
        -- Users can accept/decline their own invitations (update their own record).
        -- (More granular policies needed here based on specific actions)
        ```

    *   **`session_messages` Table:**
        ```sql
        -- Users can view messages from sessions they are a participant in.
        CREATE POLICY "Users can view messages of their sessions" ON session_messages
        FOR SELECT USING (
          EXISTS (
            SELECT 1 FROM session_participants sp
            WHERE sp.session_id = session_messages.session_id AND sp.profile_id = auth.uid()
          )
        );

        -- Users can insert messages into sessions they are an active participant in.
        CREATE POLICY "Users can insert messages in their active sessions" ON session_messages
        FOR INSERT WITH CHECK (
          EXISTS (
            SELECT 1 FROM session_participants sp
            WHERE sp.session_id = session_messages.session_id AND
                  sp.profile_id = auth.uid() AND
                  sp.invitation_status = 'accepted' -- And session is 'in_progress'
          )
        );
        ```
    *   **RLS for other tables (`session_files`, `growth_insights`, `achievements`, `session_evaluations`) will follow similar principles: users can only access/modify their own data or data related to sessions they are legitimately part of.**

## 3.3. Database Interactions (Supabase JS Client)

The `@supabase/supabase-js` client library is used in the Expo app and Supabase Edge Functions for all database interactions.

*   **Best Practices:**
    *   **TypeScript:** Utilize TypeScript for type safety with Supabase client. Generate types from your database schema using `supabase gen types typescript > types/supabase.ts`.
    *   **Error Handling:** Always handle potential errors from Supabase calls (e.g., network issues, RLS violations).
    *   **Selective Queries:** Only select the columns you need (`select('column1, column2')`) to minimize data transfer.
    *   **Use Filters:** Apply appropriate filters (`eq`, `lt`, `gte`, `in`, `textSearch` etc.) to limit results.
    *   **Pagination:** Use `range()` for paginating large datasets.
    *   **Upserts:** Use `upsert()` for inserting or updating records.
    *   **RPC (Remote Procedure Calls):** For complex queries or operations that should be executed atomically on the database, create SQL functions and call them via `rpc()`.

*   **TypeScript Code Examples (Expo App / Edge Functions):**

    *   **Fetching user's profile:**
        ```typescript
        // Assuming supabase client is initialized
        async function getProfile(userId: string) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single(); // Expects a single row

          if (error) throw error;
          return data;
        }
        ```

    *   **Creating a new session (Host action):**
        ```typescript
        interface SessionInput {
          host_id: string;
          title: string;
          description_context?: string;
          session_type?: string;
          // ... other fields
        }
        async function createSession(sessionData: SessionInput) {
          const { data, error } = await supabase
            .from('sessions')
            .insert(sessionData)
            .select() // To get the created row back
            .single();

          if (error) throw error;
          return data;
        }
        ```

    *   **Fetching messages for a session (with user details):**
        ```typescript
        async function getSessionMessages(sessionId: string) {
          const { data, error } = await supabase
            .from('session_messages')
            .select(`
              id,
              timestamp,
              content,
              message_type,
              profiles (id, full_name, avatar_url)
            `) // Select specific columns from profiles
            .eq('session_id', sessionId)
            .order('timestamp', { ascending: true });

          if (error) throw error;
          return data;
        }
        ```

## 3.4. Real-time Features with Supabase Subscriptions

Supabase Realtime allows the Expo app to listen for database changes (inserts, updates, deletes) without constant polling.

*   **Setting up Subscriptions (Expo App):**
    ```typescript
    // Example: Listening for new messages in a session
    const sessionMessagesListener = supabase
      .channel(`session-messages-${sessionId}`) // Unique channel name
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'session_messages',
          filter: `session_id=eq.${sessionId}` // Only listen for changes in the current session
        },
        (payload) => {
          console.log('New message received!', payload.new);
          // Update your React Native component's state with the new message
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to session messages!');
        }
        if (status === 'CHANNEL_ERROR') {
          console.error('Subscription error:', err);
        }
      });

    // Don't forget to unsubscribe when the component unmounts or user leaves the session:
    // return () => { supabase.removeChannel(sessionMessagesListener); };
    ```
*   **Use Cases:**
    *   Live transcription updates in `session_messages` during a session (Part 7).
    *   Real-time updates to participant status (e.g., joining, leaving, `invitation_status` in `session_participants` - Screen 4.5).
    *   Real-time updates to shared documents or collaborative whiteboards (if such features are added).
    *   Notification system updates.
*   **RLS and Realtime:** Realtime subscriptions respect RLS policies. Users will only receive updates for data they are permitted to see.

## 3.5. File Storage & IPFS Integration (Supabase Storage & Nodely)

Supabase Storage is used for direct uploads from the Expo app. Nodely can be used to optionally pin important files (like final session summaries or evidence) to IPFS for decentralized persistence and content addressing.

*   **Workflow for Uploading Files (Expo App - Component 10.3):**
    1.  User selects a file using `expo-document-picker` or `expo-image-picker`.
    2.  The file is uploaded directly to a designated Supabase Storage bucket using `supabase.storage.from('bucket_name').upload(filePath, file)`.
        *   Bucket policies and RLS on a related `session_files` table control access.
        *   `filePath` should be unique, e.g., `user_id/session_id/timestamp_filename.ext`.
    3.  On successful upload, the `storage_path` is saved in the `session_files` table along with metadata.
*   **Nodely for IPFS Pinning (Backend Logic - Supabase Edge Function or PicaOS/Nodely Workflow):**
    1.  **Trigger:** After a file is marked as "final" or needs to be pinned (e.g., a signed session summary - Screen 8.3).
    2.  **Action:** A Supabase Edge Function (or a PicaOS/Nodely workflow) is triggered.
    3.  The function retrieves the file from Supabase Storage.
    4.  It then uses an IPFS client library (or Nodely's specific API for IPFS) to upload and pin the file to an IPFS node (or a pinning service like Pinata managed via Nodely).
    5.  The returned IPFS CID (Content Identifier) is then saved back to the `session_files.ipfs_cid` column for that file record.
*   **Retrieving Files for Display (Expo App):**
    *   **From Supabase Storage:** Get a signed URL or public URL (if appropriate) from Supabase Storage: `supabase.storage.from('bucket_name').getPublicUrl(filePath)` or `createSignedUrl()`. Use this URL in an `<Image>` component or for download with `expo-file-system`.
    *   **From IPFS (via Nodely):** If an `ipfs_cid` exists and direct IPFS retrieval is desired, construct an IPFS gateway URL (e.g., `your_nodely_ipfs_gateway_url/ipfs/{cid}` or `https://ipfs.io/ipfs/{cid}`) or use Nodely's SDK/API to fetch the file. This URL can then be used in `<Image>`, `WebView` (for PDFs), or `expo-av` (for media).

## 3.6. Supabase Edge Functions (If Needed)

Supabase Edge Functions (Deno-based TypeScript) are serverless functions useful for backend logic that doesn't fit into client-side operations or database policies/triggers directly.

*   **Use Cases:**
    *   **Complex Data Validation/Processing:** Before inserting/updating data that requires logic beyond SQL constraints.
    *   **Third-Party API Integrations:** Securely calling external APIs where keys should not be exposed on the client (e.g., sending a complex payload to Nodely, Dappier, or PicaOS if those interactions are better handled server-side).
    *   **Nodely/IPFS Interactions:** As described in 3.5, an Edge Function can manage the process of fetching from Supabase Storage and pinning to IPFS via Nodely.
    *   **Database Triggers:** Invoking a function in response to database events (e.g., after a new user signs up, create their `profile` entry - though this can also be done with SQL triggers).
    *   **Orchestrating PicaOS tasks:** If a specific, isolated backend task needs to be kicked off in PicaOS, an Edge Function can serve as the intermediary.
    *   **Processing data for Dappier:** If data needs to be prepared or fetched before being sent to Dappier for RAG or real-time processing.
*   **Example: Edge Function to Pin a Session Summary to IPFS via Nodely**
    *(Conceptual - actual Nodely API would be used)*
    ```typescript
    // supabase/functions/pin-summary-to-ipfs/index.ts
    import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
    import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    serve(async (req) => {
      const { session_id, file_path, file_name } = await req.json();

      try {
        // 1. Download file from Supabase Storage
        const { data: fileData, error: downloadError } = await supabaseAdmin.storage
          .from('session-summaries') // Or your actual bucket
          .download(file_path);

        if (downloadError) throw downloadError;
        if (!fileData) throw new Error("File not found in Supabase Storage");

        // 2. (Conceptual) Upload to IPFS via Nodely
        // const nodelyApiKey = Deno.env.get("NODELY_API_KEY");
        // const ipfsResponse = await fetch("https://api.nodely.io/ipfs/pin", {
        //   method: "POST",
        //   headers: { "Authorization": `Bearer ${nodelyApiKey}`, "Content-Type": "application/octet-stream" },
        //   body: fileData
        // });
        // if (!ipfsResponse.ok) throw new Error("Nodely IPFS pinning failed");
        // const { cid } = await ipfsResponse.json();
        const cid = "mock_ipfs_cid_from_nodely"; // Replace with actual call

        // 3. Update session_files table (or sessions table) with the IPFS CID
        const { error: updateError } = await supabaseAdmin
          .from('session_files') // Assuming you have a table to store this
          .update({ ipfs_cid: cid })
          .eq('storage_path', file_path); // Or match by session_id

        if (updateError) throw updateError;

        return new Response(JSON.stringify({ success: true, cid }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        });
      }
    });
    ```
*   **Deployment:**
    ```bash
    supabase functions deploy pin-summary-to-ipfs --project-ref <your-project-ref>
    ```
    And set necessary environment variables (like `NODELY_API_KEY`) in Supabase project settings.

## 3.7. Caching Supabase Queries with Upstash Redis

To improve performance and reduce direct load on the PostgreSQL database, frequently accessed or computationally intensive query results from Supabase can be cached using Upstash Redis. This is typically implemented within Supabase Edge Functions or by PicaOS when it fetches data from Supabase.

*   **Cache-Aside Pattern:** This is the most common pattern.
    1.  **Request Data:** An Edge Function or PicaOS receives a request for data.
    2.  **Check Cache:** It first checks if the requested data is in Upstash Redis (e.g., using a key derived from the query parameters).
    3.  **Cache Hit:** If data is found in Redis and is not stale, return it directly.
    4.  **Cache Miss:** If data is not in Redis or is stale:
        *   Fetch the data from Supabase PostgreSQL.
        *   Store the fetched data in Upstash Redis with an appropriate Time-To-Live (TTL).
        *   Return the data to the requester.
*   **Cache Invalidation:**
    *   **TTL-based:** Simplest method, data expires automatically after a set duration. Suitable for data that can tolerate some staleness.
    *   **Event-driven:** When underlying data in Supabase changes (e.g., via `UPDATE`, `DELETE`), a database trigger or application logic can explicitly invalidate or update the corresponding Redis cache entry. This is more complex but ensures stronger consistency. Supabase Triggers calling an Edge Function which then updates Redis is a viable approach.
*   **What to Cache:**
    *   Frequently read, rarely updated data (e.g., lists of session templates, user profiles if not changing often, configuration data).
    *   Results of complex or slow queries.
    *   Aggregated data or summaries that are expensive to compute.
*   **Accessing Upstash Redis:**
    *   From Supabase Edge Functions or PicaOS (if Node.js based), use an appropriate Redis client library (e.g., `ioredis`, `redis` for Node.js; Deno has its own Redis clients like `https://deno.land/x/redis/mod.ts`).
    *   Credentials (`UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) are stored as environment variables in the Edge Function/PicaOS environment.
*   **Example: Supabase Edge Function with Redis Caching (Conceptual):**
    ```typescript
    // supabase/functions/get-cached-session-types/index.ts
    import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
    import { createClient as createSupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
    import { Redis } from "https://deno.land/x/upstash_redis@v1.19.1/mod.ts"; // Example Deno Redis client

    const supabaseClient = createSupabaseClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")! // Or service_role for broader access if needed from trusted server
    );

    const redis = new Redis({
      url: Deno.env.get("UPSTASH_REDIS_REST_URL")!,
      token: Deno.env.get("UPSTASH_REDIS_REST_TOKEN")!,
    });

    const CACHE_KEY = "session_types_all";
    const CACHE_TTL_SECONDS = 60 * 5; // 5 minutes

    serve(async (_req) => {
      try {
        // 1. Check Cache
        const cachedData = await redis.get(CACHE_KEY);
        if (cachedData) {
          console.log("Cache hit for session types");
          return new Response(JSON.stringify(cachedData), {
            headers: { "Content-Type": "application/json" },
          });
        }

        // 2. Cache Miss: Fetch from Supabase
        console.log("Cache miss for session types, fetching from DB...");
        const { data: sessionTypes, error } = await supabaseClient
          .from('session_type_templates') // Assuming such a table exists
          .select('*');

        if (error) throw error;

        // 3. Store in Cache (with EX for TTL in seconds)
        if (sessionTypes) {
          await redis.set(CACHE_KEY, JSON.stringify(sessionTypes), { ex: CACHE_TTL_SECONDS });
        }

        return new Response(JSON.stringify(sessionTypes || []), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          headers: { "Content-Type": "application/json" },
          status: 500,
        });
      }
    });
    ```
*   **Considerations:**
    *   Choose appropriate TTLs based on data volatility and acceptable staleness.
    *   Develop a clear cache invalidation strategy for data that changes frequently.
    *   Monitor cache hit/miss rates to optimize caching effectiveness.
    *   Be mindful of data serialization/deserialization overhead.
