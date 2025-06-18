# Part 9: Deployment & Operations for Developers

This part of the Developer Guide covers key aspects of deploying and managing the "Understand.me" application and its backend services in staging and production environments. It provides guidance for developers on their role in these processes.

## 9.1. Expo App Deployment

The "Understand.me" mobile application, built with Expo (React Native), is deployed to the Apple App Store and Google Play Store using Expo Application Services (EAS).

*   **EAS Build:**
    *   **Purpose:** EAS Build is a cloud service for building standalone app binaries (`.ipa` for iOS, `.apk`/`.aab` for Android) from your Expo project.
    *   **Build Profiles (`eas.json`):**
        *   Define different build profiles for development, staging, and production.
        *   Example `eas.json` snippet:
            ```json
            {
              "build": {
                "development": {
                  "distribution": "internal",
                  "android": { "image": "latest" },
                  "ios": { "image": "latest" }
                },
                "staging": {
                  "distribution": "internal",
                  "channel": "staging",
                  "android": { "env": { "APP_ENV": "staging" } },
                  "ios": { "env": { "APP_ENV": "staging" } }
                },
                "production": {
                  "distribution": "store",
                  "channel": "production",
                  "android": { "env": { "APP_ENV": "production" } },
                  "ios": { "env": { "APP_ENV": "production" } }
                }
              }
              // ... submit profiles
            }
            ```
        *   **Environment Variables & Secrets:** Use EAS Build Secrets (via `eas secrets:create`) for sensitive keys (Supabase URL/anon key, Sentry DSN, API keys for PicaOS, Dappier, Nodely, ElevenLabs, Google GenAI if client-side interaction is unavoidable for some part) as per Dev Guide 2.5. These are injected during the build process based on the profile.
    *   **Triggering Builds:**
        ```bash
        eas build -p android --profile production
        eas build -p ios --profile production
        # Or for specific platforms/profiles
        ```
    *   Monitor build progress on the Expo dashboard. Download artifacts or have them automatically submitted.
*   **Submitting to App Stores:**
    *   **EAS Submit:** Use `eas submit -p ios` or `eas submit -p android` to upload builds to App Store Connect and Google Play Console. This often requires initial setup and configuration in `eas.json` submit profiles.
    *   **App Store Connect:**
        *   Ensure all metadata (screenshots, descriptions, privacy info) is complete.
        *   Manage TestFlight for beta testing.
        *   Handle provisioning profiles and certificates (EAS can assist with this).
    *   **Google Play Console:**
        *   Complete store listing details.
        *   Manage testing tracks (internal, closed, open).
        *   Upload Keystore credentials to EAS or manage them manually.
*   **Over-The-Air (OTA) Updates with EAS Update:**
    *   **Purpose:** Push JavaScript bundle and asset updates directly to users without requiring a full app store review process. Ideal for bug fixes, minor UI tweaks, and rapid iteration.
    *   **Channels:** Use different channels for different builds (e.g., `development`, `staging`, `production`).
    *   **Publishing an Update:**
        ```bash
        eas update --branch main --message "Deployed new feature X"
        # Or specify a channel if not using git branch based channels
        # eas update --channel production --message "Critical bug fix for login"
        ```
    *   **Configuration:** Configure `app.config.js` (or `app.json`) with update settings (e.g., `updates.url`, `updates.fallbackToCacheTimeout`).
    *   **Rollbacks:** EAS Update dashboard allows for easy rollbacks to previous updates if issues arise.
    *   **Important:** Native code changes (new libraries, Expo SDK upgrades) still require a new binary build and store submission.

## 9.2. Supabase Management

Developers should be aware of how different Supabase environments are managed.

*   **Environments (Dev, Staging, Prod):**
    *   Ideally, have separate Supabase projects for `development` (can be local Supabase Studio via CLI), `staging` (cloud-hosted), and `production` (cloud-hosted).
    *   Each environment will have its own API URL, anon key, and service role key. These are managed via environment variables in the respective client apps and backend services.
*   **Database Migrations:**
    *   **Development:** Use `supabase migration new <migration_name>` to create new migration files after making schema changes locally (e.g., via Supabase Studio UI or SQL). These files in `supabase/migrations/` are version controlled.
    *   **Applying Migrations:**
        *   Local: `supabase db reset` (to clear and reapply all) or `supabase migration up` (to apply pending).
        *   Staging/Production (Cloud): Link your Supabase project to GitHub (or other VCS) and enable schema migration via the Supabase dashboard's deployment workflow. Migrations from the `main` (or `production`) branch are automatically applied.
        *   Alternatively, use the Supabase CLI to apply migrations to linked remote projects: `supabase db push --linked` (use with caution on prod).
    *   **Best Practice:** Always develop schema changes in a local or dev environment first, generate a migration file, test it, and then commit it. Let the CI/CD pipeline or Supabase GitHub integration handle deployment to staging/prod.
*   **Backup/Restore:**
    *   Supabase cloud projects have automated daily backups. Configure Point-In-Time Recovery (PITR) for more granular restore options if needed (paid feature).
    *   Developers can perform manual backups using `pg_dump` with the database connection string from Supabase for local archives or specific needs.
    *   Understand the project's backup policy and how to request a restore from Supabase support if necessary.
*   **Seeding Data:** Use seed scripts (`supabase/seed.sql` or custom scripts) for populating development and staging databases with necessary initial data.

## 9.3. PicaOS Deployment/Configuration

PicaOS deployment and configuration will depend on its final architecture (e.g., self-hosted service, managed cloud service, or integrated within serverless functions).

*   **If PicaOS is a Separate Deployed Service:**
    *   **Environments:** Maintain separate PicaOS instances for dev, staging, and production.
    *   **Configuration:** Each instance will require its own environment variables for:
        *   API keys for Google GenAI, ElevenLabs, Dappier, Nodely.
        *   Connection details for Supabase (e.g., service role key for backend access).
        *   Internal PicaOS settings (e.g., logging levels, default models).
    *   **Deployment:** Follow PicaOS-specific deployment procedures (e.g., Docker container deployment to a cloud platform like Google Cloud Run, AWS Fargate, or a managed Kubernetes service). This might be automated via CI/CD.
    *   **Scaling:** Configure auto-scaling rules based on CPU, memory, or request load if applicable to the hosting platform.
*   **If PicaOS is a Library/Embedded Logic (e.g., in Supabase Edge Functions or Nodely Workflows):**
    *   Configuration is managed within the host service's environment variables.
    *   Deployment and scaling are handled as part of the host service's lifecycle.
*   **Developer Interaction:** Developers typically won't deploy PicaOS directly to production but need to know how to:
    *   Access different PicaOS endpoints (dev/staging/prod) from their Expo app by configuring `EXPO_PUBLIC_PICAOS_API_ENDPOINT`.
    *   Understand PicaOS logs (if accessible via a logging platform integrated with Sentry or directly) for debugging interactions.

## 9.4. Dappier & Nodely Production Considerations

Similar to PicaOS, the production setup for Dappier and Nodely depends on their service models.

*   **Dappier:**
    *   **API Keys/Access Tokens:** Ensure production API keys are securely managed and used by PicaOS or other backend services that interact with Dappier.
    *   **Service Quotas & Limits:** Be aware of any API rate limits or data processing quotas for the Dappier services being used. Monitor usage.
    *   **Data Source Configuration:** Ensure Dappier is configured to access the correct production data sources for RAG or real-time feeds.
*   **Nodely:**
    *   **IPFS Pinning Services:** If Nodely uses a third-party pinning service (e.g., Pinata) for IPFS, ensure the production account and API keys are correctly configured in the Nodely service or the backend function calling Nodely.
    *   **Gateway Access:** If using a Nodely-provided IPFS gateway for retrieving files, ensure it's configured for production load and availability. The Expo app will use this gateway URL.
    *   **Storage Management:** Understand how data retention and pinning duration are managed on IPFS via Nodely.
*   **Environment Variables:** All sensitive credentials for Dappier and Nodely must be managed as environment variables in the services that interact with them (e.g., PicaOS, Supabase Edge Functions).

## 9.5. Monitoring Production with Sentry

Sentry is crucial for monitoring the health of the production application and backend services.

*   **Alerting:**
    *   Configure Sentry alerts for:
        *   New, unhandled error types.
        *   High frequency of existing errors.
        *   Performance degradation (e.g., slow screen loads, high transaction times).
        *   Significant increases in error rates after a new deployment.
    *   Set up alert routing to appropriate channels (email, Slack, PagerDuty).
*   **Dashboards:**
    *   Create or use default Sentry dashboards to visualize:
        *   Error rates over time.
        *   Most frequent errors.
        *   Error distribution by app version, OS, device.
        *   Performance metrics (transaction durations, Apdex scores).
        *   Release health (adoption of new releases, crash rates per release).
*   **Triaging Production Issues:**
    *   When an alert is received or an issue is reported:
        1.  Examine the Sentry issue details: stack trace, breadcrumbs, tags (user ID, session ID, correlation ID), device context.
        2.  Use the `correlationId` to trace issues across services (Expo app, PicaOS, Supabase Functions, etc.) if this pattern is implemented.
        3.  Check for related issues or patterns.
        4.  Assign ownership for investigation and resolution.
    *   Prioritize issues based on user impact and frequency.
*   **Source Maps:** Ensure source maps for the Expo app are correctly uploaded to Sentry for every release to get de-obfuscated stack traces. EAS Build can be configured to do this automatically.
*   **User Feedback Integration:** Correlate user-reported feedback (if captured via Sentry or another tool) with Sentry error events.

## 9.6. CI/CD Pipeline Suggestions

A Continuous Integration/Continuous Deployment (CI/CD) pipeline automates the build, test, and deployment process, improving efficiency and reliability. GitHub Actions is a common choice.

*   **Pipeline Triggers:**
    *   On push to `main` branch (for production deployments/updates).
    *   On push to `develop` or `staging` branches (for staging deployments/updates).
    *   On pull request to `main` or `develop` (for running tests and preview builds).
*   **Key CI/CD Steps:**
    1.  **Checkout Code:** `actions/checkout@v3`
    2.  **Setup Node.js, Yarn/npm, Expo CLI:** `actions/setup-node@v3`
    3.  **Install Dependencies:** `yarn install --frozen-lockfile` (or `npm ci`) for Expo app and any backend services if in the same monorepo.
    4.  **Linting & Static Analysis:** `eslint .`
    5.  **Unit & Integration Tests:** `yarn test` (or `npm test`) for Expo app. Run tests for backend components (PicaOS, Edge Functions) if applicable. Report test coverage.
    6.  **EAS Build (Conditional):**
        *   For PRs to `develop` or pushes to `develop`/`staging`:
            ```bash
            eas build -p android --profile staging --non-interactive --no-wait
            eas build -p ios --profile staging --non-interactive --no-wait
            # (Store build IDs or use webhooks to proceed upon completion)
            ```
        *   For pushes to `main` (after PR merge):
            ```bash
            eas build -p android --profile production --non-interactive --no-wait
            eas build -p ios --profile production --non-interactive --no-wait
            ```
    7.  **EAS Update (Optional, for OTA updates):**
        *   After successful tests on a branch that doesn't require a native build:
            ```bash
            eas update --branch <branch-name> --message "Automated update from CI"
            # Or for specific channels
            # eas update --channel staging --message "Deploying staging updates"
            ```
    8.  **Supabase Migrations (Conditional):**
        *   If `supabase/migrations` directory has changes on merge to `main` or `staging`:
            ```bash
            # For staging (ensure Supabase project is linked)
            # supabase db push --linked --project-ref <staging-project-ref>
            # For production (CAUTION: often requires manual review or more sophisticated blue/green)
            # supabase db push --linked --project-ref <production-project-ref>
            ```
            It's often safer to let Supabase's GitHub integration handle production migrations from the `main` branch after thorough review.
    9.  **Deploy Supabase Edge Functions (Conditional):**
        *   If `/supabase/functions` directory has changes:
            ```bash
            supabase functions deploy --project-ref <project-ref> <function-name>
            ```
    10. **Deploy PicaOS / Nodely / Dappier (If applicable):**
        *   Use their respective CLIs or deployment scripts if they are self-managed services. This might involve building Docker images and pushing to a container registry, then updating a cloud service (e.g., Cloud Run, Kubernetes).
    11. **Sentry Source Map Upload:** Integrate `sentry-expo/upload-sourcemaps` (or Sentry CLI) into the EAS Build process or as a separate step after building to upload source maps for each release.
    12. **Notifications:** Notify the team (e.g., via Slack) of successful deployments or failures.

*   **Secrets Management in CI/CD:** Use encrypted secrets in GitHub Actions (or your CI/CD provider) for `EXPO_TOKEN`, `SUPABASE_ACCESS_TOKEN`, Sentry auth tokens, PicaOS/Dappier/Nodely deployment keys, etc.
