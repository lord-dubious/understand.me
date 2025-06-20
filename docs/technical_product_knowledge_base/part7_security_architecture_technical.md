# Part 7: Security Architecture - Technical Details

## Introduction

Security is a foundational pillar of the "Understand.me" application. Given the sensitive nature of conversations and personal insights the platform handles, a robust security architecture is paramount to build and maintain user trust. This part of the Technical Product Knowledge Base (TPKB) details the security principles, mechanisms, and technical implementations across the entire stack.

**Guiding Security Principles:**

*   **Defense in Depth:** Implement multiple layers of security controls.
*   **Least Privilege:** Grant only necessary permissions to users and services.
*   **Secure by Design:** Integrate security into the entire development lifecycle.
*   **Data Minimization:** Collect and retain only essential data.
*   **Privacy by Default:** Configure systems with the highest privacy settings by default.
*   **Regular Audits & Updates:** Continuously review and update security measures.

## 7.1. Authentication & Authorization Deep Dive

**7.1.1. Supabase Row Level Security (RLS) Policies - Advanced Examples:**

(Refer to Dev Guide 3.2 for basic RLS examples. This section expands with more nuanced scenarios.)

*   **`session_messages` - Protecting Sensitive Content:**
    *   **Requirement:** Users can only read messages from sessions they are active, accepted participants in. Only the speaker or a host (with specific privileges, e.g., for moderation/editing) can edit/delete their own messages. Alex's messages are system-generated.
    *   **Policy Example (SELECT):**
        ```sql
        CREATE POLICY "Participants can select messages in their accepted sessions"
        ON public.session_messages FOR SELECT USING (
          EXISTS (
            SELECT 1 FROM session_participants sp
            WHERE sp.session_id = session_messages.session_id
              AND sp.profile_id = auth.uid()
              AND sp.invitation_status = 'accepted' -- Crucial check
          )
        );
        ```
    *   **Policy Example (UPDATE - own message):**
        ```sql
        CREATE POLICY "Users can update their own messages within a time window"
        ON public.session_messages FOR UPDATE USING (
            auth.uid() = profile_id AND (now() - "timestamp" < INTERVAL '5 minutes') -- Example: 5 min edit window
        ) WITH CHECK (auth.uid() = profile_id);
        ```
*   **`growth_insights` - Strict Privacy:**
    *   **Requirement:** Users can *only* access their own growth insights. No other user, including hosts, can see them.
    *   **Policy Example (SELECT, INSERT, UPDATE, DELETE):**
        ```sql
        CREATE POLICY "Users can manage their own growth insights"
        ON public.growth_insights FOR ALL USING (auth.uid() = profile_id)
        WITH CHECK (auth.uid() = profile_id);
        ```
*   **`session_files` - Contextual Access:**
    *   **Requirement:** Users can see files linked to sessions they are part of. Only uploaders or hosts can delete. If a file is marked "host_only_context", only the host can see it pre-session.
    *   **Policy Example (SELECT):**
        ```sql
        CREATE POLICY "Participants can see relevant session files"
        ON public.session_files FOR SELECT USING (
          EXISTS (
            SELECT 1 FROM session_participants sp
            JOIN sessions s ON sp.session_id = s.id
            WHERE sp.session_id = session_files.session_id
              AND sp.profile_id = auth.uid()
              AND sp.invitation_status = 'accepted'
              AND (NOT session_files.host_only OR s.host_id = auth.uid()) -- Check host_only flag
          )
        );
        ```
    *   **Policy Example (INSERT):** (Allows participants to upload if they are part of the session, further restrictions might be in application logic via PicaOS).
        ```sql
        CREATE POLICY "Accepted participants can upload files to their sessions"
        ON public.session_files FOR INSERT WITH CHECK (
          EXISTS (
            SELECT 1 FROM session_participants sp
            WHERE sp.session_id = session_files.session_id
              AND sp.profile_id = auth.uid()
              AND sp.invitation_status = 'accepted'
              AND auth.uid() = uploader_profile_id -- User can only claim to be themselves
          )
        );
        ```

**7.1.2. PicaOS API Endpoint Security:**

*   **Authentication:** All PicaOS API endpoints (Dev Guide 4.3) must be protected.
    *   **JWT Validation:** PicaOS validates the Supabase JWT sent by the Expo app in the `Authorization: Bearer <token>` header. This can be done using Supabase's provided libraries or a standard JWT validation library with Supabase's JWT secret.
    *   The `userId` from the validated JWT is then trusted for RLS-like checks within PicaOS logic or for passing to Supabase.
*   **Authorization (within PicaOS):**
    *   After authenticating the user, PicaOS must perform authorization checks before executing sensitive operations. For example, before PicaOS allows adding a participant to a session, it must verify that the authenticated user (`auth.uid()`) is indeed the `host_id` for that session (by querying Supabase `sessions` table).
*   **API Key Management (for PicaOS itself, if it acts as a client to other services):**
    *   All API keys used by PicaOS (for Google GenAI, ElevenLabs, Dappier, Nodely, Upstash Redis) must be stored as secure environment variables in PicaOS's deployment environment (e.g., Google Cloud Run secrets, AWS Secrets Manager). They must not be hardcoded.

**7.1.3. Service-to-Service Authentication:**

*   **PicaOS to Google GenAI/ElevenLabs:** Use API keys, managed as secure environment variables in PicaOS.
*   **PicaOS to Dappier/Nodely:** Use API keys or OAuth2 client credentials flows if supported by Dappier/Nodely, managed as secure environment variables in PicaOS.
*   **PicaOS to Supabase:**
    *   For user-context operations: PicaOS can use the user's JWT to call Supabase Edge Functions (which respect RLS for that user).
    *   For admin/broader operations: PicaOS (if running in a secure backend environment) uses the Supabase `service_role_key` to bypass RLS for necessary tasks like creating initial session records or aggregating data. This key must be heavily protected.
*   **PicaOS/Supabase Edge Functions to Upstash Redis:** Use Upstash Redis REST URL and secure REST token, stored as environment variables.
*   **Expo App to Supabase:** Uses the public `anon_key` and the user's JWT. RLS enforces data access.

## 7.2. Data Security

*   **Encryption at Rest:**
    *   **Supabase PostgreSQL:** Data is encrypted at rest by default on AWS RDS, which Supabase uses. Supabase also offers column-level encryption capabilities for specific PII if needed, though this adds complexity to querying.
    *   **Supabase Storage:** Files are stored in S3, which encrypts data at rest by default.
    *   **Upstash Redis:** Offers encryption at rest. Ensure this is active for production databases.
    *   **Nodely/IPFS:**
        *   Data on public IPFS is generally not encrypted by default.
        *   If sensitive files are pinned to IPFS via Nodely (e.g., session summaries intended only for participants), they **must be client-side encrypted (in Expo app or by PicaOS/Supabase Function) before being sent to Nodely for pinning.**
        *   Key management for this encryption becomes crucial. Options:
            *   User-derived keys (complex for sharing).
            *   Session-specific symmetric keys shared with participants via a secure channel (e.g., Supabase Realtime with RLS on key table).
            *   For "Understand.me," IPFS is primarily for finalized, potentially less sensitive, or user-agreed public-after-consent artifacts. Highly sensitive raw data stays in Supabase.
*   **Encryption in Transit:**
    *   All communications between the Expo app, PicaOS, Supabase, and all other external services (Google GenAI, ElevenLabs, Dappier, Nodely, Upstash Redis, Sentry) **must use TLS/SSL (HTTPS, WSS for Realtime, secure Redis connections).**
    *   Ensure appropriate TLS versions and cipher suites are configured on any self-managed PicaOS/Nodely components. Managed services generally handle this.
*   **Securing Sensitive AI Data:**
    *   **Prompts to Google GenAI:** PicaOS must ensure that prompts sent to Google GenAI only contain the necessary context for the task and do not inadvertently include excessive PII unless explicitly required and consented to for that feature. Redact where possible.
    *   **User Inputs:** Raw user voice/text inputs are processed by PicaOS. Transcripts and AI analyses are stored in Supabase and protected by RLS.
    *   **AI Responses (Alex's scripts/insights):** Stored in Supabase and protected by RLS. If cached in Upstash Redis by PicaOS, Redis instance must be secured.
*   **Data Masking or Anonymization:**
    *   For analytics or logging (Sentry), if PII is captured, implement masking or anonymization routines within PicaOS or Supabase Edge Functions before sending data to analytics platforms or less secure logging tiers.
    *   Sentry SDKs have client-side data scrubbing options.

## 7.3. Infrastructure & Network Security

*   **Supabase Security Configurations:**
    *   **Network Restrictions:** If possible (depending on Supabase plan and other service locations), restrict direct database access to only known IP addresses or VPCs (e.g., for PicaOS or other backend services). Client access from Expo app uses the public API gateway.
    *   **Database Roles & Permissions:** Use Supabase's PostgreSQL roles with least privilege for different backend processes if PicaOS or Edge Functions connect with more than just the `service_role_key`.
    *   **SSL Enforcement:** Ensure "Enforce SSL" is active for the database.
    *   **Two-Factor Authentication (2FA):** Enforce 2FA for all Supabase project administrators.
*   **PicaOS Deployment Security (If self-managed components):**
    *   If PicaOS involves self-hosted Docker containers or VMs:
        *   Regular OS patching and security hardening.
        *   Firewall rules to restrict access to necessary ports.
        *   Run PicaOS services with least-privileged user accounts.
        *   Securely manage deployment credentials and access to the hosting environment.
    *   If PicaOS is a managed cloud service (e.g., Cloud Run, Lambda), rely on the cloud provider's security features and configure IAM roles with least privilege.
*   **Secure Access to Dappier, Nodely, Upstash Redis:**
    *   **API Key Security:** Store API keys for these services securely in the environment of PicaOS or Supabase Edge Functions, not in client-side code.
    *   **IP Whitelisting:** If these services support IP whitelisting, configure them to only accept requests from the known outbound IP addresses or VPCs of your PicaOS/Supabase Function infrastructure.
    *   **VPC Peering/Private Endpoints:** If available and applicable (e.g., PicaOS self-hosted in same cloud provider), use private network connections instead of public internet for service-to-service communication.

## 7.4. Input Validation & Sanitization

Preventing common web/mobile vulnerabilities through rigorous input validation.

*   **Expo App (Client-Side Validation - Component 10.8):**
    *   Perform initial validation of all user inputs (forms, text fields) for type, format, length, and presence before sending to backend services.
    *   Use libraries like `zod` or `yup` for schema validation.
    *   This provides immediate feedback to the user and reduces load on backend validation.
*   **PicaOS (Server-Side Validation):**
    *   **Crucial:** PicaOS MUST re-validate ALL data received from the Expo app or any other client, even if client-side validation was performed. Never trust client input.
    *   Validate data types, formats, ranges, and business rules before processing or passing to other services (Google GenAI, Supabase).
    *   Sanitize inputs to prevent injection attacks if data is used to construct queries or scripts for services that don't have strong built-in protection (though Supabase client and modern ORMs largely prevent SQLi for database interactions). For GenAI prompts, be mindful of prompt injection if user input is directly embedded in complex instruction sets.
*   **Supabase Edge Functions:**
    *   Similar to PicaOS, any Edge Function receiving direct client input or input from other services must validate it rigorously before processing or database interaction.
*   **Preventing Common Vulnerabilities:**
    *   **XSS (Cross-Site Scripting):** While React Native is less susceptible than web apps, be cautious if rendering HTML content via `WebView`s (ensure it's from trusted sources or sanitized). User-generated content displayed as native `<Text>` is generally safe from XSS.
    *   **SQL Injection:** Using the Supabase JS client with its query builder (or RLS) largely mitigates traditional SQLi risks. Avoid constructing raw SQL queries with user input.
    *   **NoSQL Injection:** Not directly applicable to PostgreSQL, but if PicaOS interacts with NoSQL databases via Dappier or Nodely, ensure those interactions use parameterized queries or appropriate SDKs that prevent injection.

## 7.5. Sentry for Security Monitoring

Sentry can be configured to help detect and alert on security-related events.

*   **Content Security Policy (CSP) Violations (If using WebViews extensively):**
    *   While primarily a mobile app, if any part uses `WebView` to display external or complex HTML content, CSP headers can be configured for those WebViews. Sentry can report CSP violations, indicating potential XSS attempts or misconfigurations.
*   **Unusual Error Patterns:**
    *   Configure Sentry alerts for sudden spikes in specific types of errors, especially:
        *   Authentication errors (e.g., many failed login attempts - could indicate brute-forcing).
        *   Authorization errors (RLS violations in Supabase, PicaOS authz failures - could indicate probing or privilege escalation attempts).
        *   Input validation errors on the backend (could indicate attempts to bypass client-side validation).
*   **Security Headers Monitoring (If applicable to PicaOS/Nodely/Dappier if they expose HTTP endpoints directly consumed by anything other than the app):**
    *   Sentry can track other security-related headers if relevant.
*   **Integrating with Alerting Systems:**
    *   Route security-pertinent Sentry alerts to a dedicated security channel (e.g., specific Slack channel, email alias for security team/leads) for prompt investigation.
*   **Audit Trail Review:** While Sentry is primarily for errors, its breadcrumbs (if capturing relevant events) can sometimes assist in reconstructing user activity leading up to a security incident, complementing audit logs from Supabase or PicaOS.

## 7.6. Compliance Considerations (Technical Aspects)

Technical measures to support data privacy regulations (e.g., GDPR, CCPA).

*   **Data Minimization:**
    *   Services (PicaOS, Expo app) should only request and process data essential for their immediate task.
    *   Avoid over-fetching from Supabase. Use `select()` to specify only needed columns.
*   **User Data Export:**
    *   PicaOS or a Supabase Edge Function should provide a mechanism to export a user's data upon request. This would involve querying all relevant tables (`profiles`, `sessions` they hosted/participated in, `session_messages` they authored, `growth_insights`, etc.) and compiling it into a machine-readable format (e.g., JSON).
    *   Consider data relationships and how to present them comprehensibly.
*   **User Data Deletion (Right to be Forgotten):**
    *   Implement a robust data deletion process, typically orchestrated by PicaOS or a Supabase Edge Function.
    *   When a user requests deletion:
        *   Use `supabase.auth.admin.deleteUser()` to remove the user from `auth.users`. This will cascade delete their `profiles` record due to the foreign key constraint.
        *   Determine policy for associated data:
            *   Should `session_messages` authored by the user be anonymized (e.g., `profile_id` set to NULL, content potentially scrubbed of PII if legally required) or deleted? Deletion might affect transcript coherence for other users. Anonymization is often preferred.
            *   Should `sessions` hosted by the user be deleted or reassigned/anonymized?
            *   `growth_insights`, `achievements` for the user should be deleted.
        *   This requires careful schema design with appropriate `ON DELETE` cascade or set null behaviors, and potentially custom SQL scripts or Edge Functions for complex deletion/anonymization logic.
*   **Consent Management:**
    *   User consents (e.g., for data usage in Personal Growth Insights - UI Guide 5.5) must be stored explicitly in Supabase (`profiles` table or a dedicated `user_consents` table) with timestamps.
    *   PicaOS and other services must check these consent flags before processing data for optional features.
    *   If Dappier is used for verifiable consent, this involves managing and verifying Dappier credentials.
*   **Data Retention Policies:**
    *   Implement automated data retention/archival policies if required by regulations or business needs (e.g., automatically delete raw session audio from temporary storage after STT and analysis by PicaOS, or delete inactive user accounts after a certain period). This can be managed by Supabase scheduled functions or PicaOS/Nodely workflows.
