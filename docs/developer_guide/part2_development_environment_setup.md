# Part 2: Development Environment Setup

This part of the guide provides instructions for setting up your local development environment to work on the "Understand.me" Expo (React Native) mobile application and its associated backend services.

## 2.1. Prerequisites

Before you begin, ensure you have the following software installed on your development machine:

*   **Node.js:** (LTS version recommended, e.g., 18.x or 20.x). Required for running JavaScript/TypeScript code, npm/yarn, and Expo CLI.
    *   *Verification:* `node -v`
*   **npm or Yarn:** Package managers for Node.js. Expo CLI uses Yarn by default for new projects, but npm is also widely used.
    *   *Verification:* `npm -v` or `yarn -v`
*   **Git:** For version control and cloning the repository.
    *   *Verification:* `git --version`
*   **Expo CLI:** The command-line interface for Expo.
    *   *Installation:* `npm install -g expo-cli` or `yarn global add expo-cli`
    *   *Verification:* `expo --version`
*   **Watchman (macOS/Linux recommended):** A file watching service that can improve performance for React Native Metro bundler.
    *   *Installation (macOS via Homebrew):* `brew install watchman`
*   **Supabase CLI (Optional but Recommended for Local Development):** If you plan to run Supabase locally for development or manage migrations extensively.
    *   *Installation:* Follow instructions on the [official Supabase CLI documentation](https://supabase.com/docs/guides/cli).
    *   *Verification:* `supabase --version`
*   **Docker (Optional but Recommended for Local Supabase):** Required if you intend to run Supabase locally using Docker, as provided by the Supabase CLI.
    *   *Installation:* [Docker Desktop](https://www.docker.com/products/docker-desktop/)
    *   *Verification:* `docker --version`
*   **IDE/Code Editor:** A code editor of your choice (e.g., VS Code with recommended extensions for React Native, TypeScript, ESLint).
*   **Mobile Device Emulators/Simulators:**
    *   **Android Studio:** For Android Virtual Devices (AVDs).
    *   **Xcode (macOS only):** For iOS Simulators.
    *   Alternatively, you can use physical devices with the Expo Go app.

## 2.2. Cloning the Repository & Initial Setup

1.  **Clone the Repository:**
    ```bash
    git clone [URL_to_Understand.me_repository] understand-me-app
    cd understand-me-app
    ```
2.  **Review Project Structure:** Familiarize yourself with the main directories (e.g., `/app` for Expo code, `/supabase` for Supabase migrations/functions, `/picaos_services` for PicaOS related microservices if separate).

## 2.3. Expo Environment

The mobile application is built using Expo (React Native).

1.  **Navigate to the App Directory:**
    ```bash
    cd app
    ```
    (Or the relevant directory name for the Expo project, e.g., `client`, `mobile-app`)
2.  **Install Dependencies:**
    ```bash
    yarn install
    ```
    or
    ```bash
    npm install
    ```
3.  **Running the Expo App:**
    *   **Start the Metro Bundler:**
        ```bash
        expo start
        ```
    *   This will open a command-line interface with options:
        *   Press `a` to run on an Android emulator or connected device (requires Android Studio setup).
        *   Press `i` to run on an iOS simulator or connected device (requires Xcode setup, macOS only).
        *   Scan the QR code with the Expo Go app on your physical device.
4.  **Expo Go App:** For testing on physical devices without building the native code, install the "Expo Go" app from the App Store (iOS) or Play Store (Android).

## 2.4. Supabase Setup

"Understand.me" uses Supabase for its backend database, authentication, storage, and serverless functions.

*   **Option 1: Cloud Hosted Supabase (Recommended for most developers):**
    1.  Ensure you have access to the shared Supabase project on [supabase.com](https://supabase.com).
    2.  Obtain the Project URL and `anon` key (public API key). These will be used in environment variables (see Section 2.5).
*   **Option 2: Local Supabase Development (using Supabase CLI & Docker):**
    1.  Ensure Docker Desktop is running.
    2.  Navigate to the Supabase project directory (e.g., `/supabase` or the root if integrated):
        ```bash
        # cd ../supabase # if you were in /app
        ```
    3.  Initialize Supabase (if not already done, only for the first time setting up the local project):
        ```bash
        supabase init
        ```
        (This creates a `/supabase` directory if it doesn't exist).
    4.  Start Supabase services:
        ```bash
        supabase start
        ```
        This will output local Supabase Project URL, `anon` key, `service_role` key, and other relevant information.
    5.  **Schema Migrations:**
        *   The base database schema is defined in `supabase/migrations/[timestamp]_initial_schema.sql` (or similar).
        *   When pulling new changes, or if the local database needs to be reset and updated with the latest schema:
            ```bash
            supabase db reset
            ```
            (This will wipe your local Supabase DB and re-run all migrations).
        *   To apply new unapplied migrations:
            ```bash
            supabase migration up
            ```
        *   To create a new migration after making schema changes (e.g., via Supabase Studio or SQL):
            ```bash
            supabase migration new your_migration_name
            ```
            Then edit the generated SQL file with your schema changes.

## 2.5. API Keys & Service Credentials

The application requires API keys and credentials for various services. These should **NEVER** be hardcoded directly into the application code. They are managed via environment variables.

1.  **Create Environment File(s):**
    *   For the Expo app (e.g., in `/app` directory), create a `.env` file (this should be in `.gitignore`).
    *   Example `.env` content for Expo:
        ```env
        EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
        EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
        EXPO_PUBLIC_GOOGLE_GENAI_API_KEY=your_google_genai_api_key
        EXPO_PUBLIC_ELEVENLABS_API_KEY=your_elevenlabs_api_key
        SENTRY_DSN=your_sentry_dsn
        # Add other keys as needed for PicaOS, Dappier, Nodely if they are client-facing
        EXPO_PUBLIC_PICAOS_API_ENDPOINT=your_picaos_endpoint
        EXPO_PUBLIC_DAPPIER_API_KEY=your_dappier_key
        EXPO_PUBLIC_NODELY_GATEWAY_URL=your_nodely_ipfs_gateway_or_api
        ```
    *   For server-side components (e.g., Supabase Edge Functions, PicaOS services, Nodely workflows), environment variables are typically set in the respective service's configuration panel or deployment environment. Refer to Supabase documentation for Edge Functions, and PicaOS/Nodely specific setup for their services. Supabase Edge Functions can also have a `.env` file locally when using `supabase functions serve`.
2.  **Obtain Keys:**
    *   **Supabase:** From your Supabase project dashboard (Settings > API).
    *   **Google GenAI SDK:** From Google AI Studio or Google Cloud Console.
    *   **ElevenLabs API:** From your ElevenLabs account dashboard.
    *   **Sentry DSN:** From your Sentry project settings.
    *   **PicaOS, Dappier, Nodely:** Refer to specific setup instructions for these services to obtain necessary API keys, endpoints, or credentials. These might involve authentication tokens or service account keys.
3.  **Secure Management:**
    *   Ensure `.env` files are listed in `.gitignore` to prevent committing them to version control.
    *   For Expo builds (EAS Build), use [Build Secrets](https://docs.expo.dev/build/secrets/) to securely provide these environment variables during the build process.
    *   For Supabase Edge Functions, set environment variables in the Supabase Dashboard or via the `supabase secrets set` CLI command for deployed functions.

## 2.6. PicaOS Setup

PicaOS acts as the AI orchestration layer. Depending on its deployment model (self-hosted, managed service, or library integrated into another backend like Nodely/Supabase Functions):

*   **If PicaOS is a separate service to run locally:**
    1.  Navigate to the PicaOS service directory (e.g., `/picaos_service`).
    2.  Follow its specific `README.md` for installation (e.g., `npm install` or `pip install -r requirements.txt`) and running instructions (e.g., `npm start` or `python main.py`).
    3.  Ensure its local endpoint is correctly configured in the Expo app's `.env` file (`EXPO_PUBLIC_PICAOS_API_ENDPOINT`).
*   **If PicaOS is a library/SDK used by other backend components:**
    1.  Its dependencies will be part of the parent service (e.g., a Supabase Edge Function or Nodely workflow).
    2.  Configuration (API keys for Google GenAI, ElevenLabs, etc., that PicaOS uses) will be managed within that parent service's environment variables.
*   **Consult PicaOS Specific Documentation:** Detailed setup for PicaOS, including any necessary SDKs or tools for developers to interact with or test it, will be in its dedicated documentation.

## 2.7. Sentry Project Setup

Sentry is used for error monitoring and performance tracking.

1.  **Create a Sentry Project:** If not already done, create a new project in your Sentry organization, selecting "React Native" as the platform.
2.  **Install Sentry SDK in Expo App:**
    ```bash
    cd app # Or your Expo project directory
    expo install sentry-expo
    ```
3.  **Configure Sentry:**
    *   Initialize Sentry in your app's entry point (e.g., `App.tsx` or `App.js`):
        ```typescript
        import * as Sentry from 'sentry-expo';

        Sentry.init({
          dsn: process.env.EXPO_PUBLIC_SENTRY_DSN, // Or directly your DSN if not using .env for it
          enableInExpoDevelopment: true,
          debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set to `false` in production.
          // Consider adding release and environment configurations for better tracking
        });
        ```
    *   Ensure `EXPO_PUBLIC_SENTRY_DSN` is set in your `.env` file and configured as an EAS Build Secret.
4.  **Test Sentry Integration:** You can create a deliberate error in a test screen to verify that issues are reported to your Sentry dashboard.
    ```typescript
    // Example:
    function MyComponent() {
      return <Button title="Crash App" onPress={() => { throw new Error("Test Sentry Error"); }} />;
    }
    ```

With these steps completed, your development environment should be ready for building and testing the "Understand.me" application. Refer to individual service documentation (Supabase, Expo, PicaOS, etc.) for more advanced configurations.
