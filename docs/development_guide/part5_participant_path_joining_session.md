# Part 5: Participant Path - Joining a Session

This part of the Development Guide outlines the typical journey for a Participant joining an "Understand-me" **Expo (React Native) mobile application** session. UI styling uses **React Native StyleSheet API** (or NativeWind) and navigation is via **React Navigation**.

## 5.1. Screen: Enter Session Code (Mermaid: P)

*   **Mermaid Diagram ID:** P (Screen for entering a session code, part of a Stack Navigator).

*   **Purpose:** (Remains the same)
    *   Validation of the code against Supabase would be managed via a Nodely orchestrated API call.

*   **Key UI Elements (using React Native components, Forms Pattern 10.8):**
    *   **Main Container (`<KeyboardAvoidingView>` with `<View>`):**
    *   App Logo (`<Image>`).
    *   Headline (`<Text>`): "Join Your Session".
    *   Session Code Input Field (`<TextInput>` with `autoCapitalize="characters"`, `maxLength`, and appropriate `StyleSheet` for code-like appearance).
    *   "Join Session" Button (`<TouchableOpacity>` with `<Text>`).
    *   Help Link (`<TouchableOpacity>` with `<Text>`): "Where's the code?" (Could open a Modal - Component 10.7 - with info).
    *   Alternative Action (`<TouchableOpacity>` with `<Text>`): "Login Instead" or "Go to Sign Up".

*   **Voice Agent Interactions (Alex - Component 10.2):**
    *   Minimal presence. Help icon (`<TouchableOpacity>` with Alex's avatar) available.
    *   Error Handling: Invalid code messages via `<Text>` or Toast (Component 10.6). Alex might voice: "That code doesn't look right. Please try again."
    *   Accessibility Support: Alex can read out instructions if help icon is tapped.

*   **Navigation (React Navigation Stack):**
    *   Accessed from a "Join with Code" button on Welcome/Login screen, or potentially via a deep link `understandmeapp://join/[code]`.
    *   Successful entry navigates to session waiting room, or pre-session screens (5.4, 5.5) if required by host configuration.

*   **Multimedia Aspects:** App Logo (`<Image>`).

## 5.2. Screen: Receive Detailed Invitation (Mermaid: AE)

*   **Mermaid Diagram ID:** AE (Screen displaying session details from an invitation link, within a Stack Navigator).

*   **Purpose:** (Remains the same)
    *   Invitation details fetched from Supabase, potentially via Nodely. Dappier could be used if the invitation link contains secure, one-time tokens.

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<ScrollView>`):**
    *   Session Title, Host Info, Date/Time, Duration (`<Text>` components, styled with `StyleSheet`).
    *   "You're Invited by [Host Name]" Message (`<Text>`).
    *   Host's Message/Session Description (`<Text>` within a styled `<View>`).
    *   **Shared Files/Contextual Materials Section (Component 10.3):**
        *   `<FlatList>` of shared files. Each item (`<TouchableOpacity>`) shows file icon (`<Image>`), name (`<Text>`), and type/size (`<Text>`).
        *   Tapping a file opens it in a preview modal (using `expo-av` for media, `react-native-pdf`/`WebView` for documents, or `expo-sharing` to open in native app).
    *   Key Objectives/Agenda (`<Text>` list).
    *   "What is Understand-me?" (`<TouchableOpacity>` expanding a `<View>` with `<Text>` or linking to an info screen).
    *   **Action Buttons (`<View>` with row of `<TouchableOpacity>`s):** "Accept," "Decline," "Maybe."

*   **Voice Agent Interactions (Alex - Component 10.2):**
    *   Welcome and explanation of session details displayed in `<Text>` components.
    *   Guidance on reviewing files: "Tap on a file name to preview or download it."
    *   Explaining "Understand-me" if requested.

*   **Navigation (React Navigation Stack):**
    *   Accessed via deep link from email/message (e.g., `understandmeapp://invitation/[inviteId]`).
    *   "Accept"/"Decline"/"Maybe" navigates to Screen 5.3.

*   **Multimedia Aspects:** Host's Profile `<Image>`, File Type Icons (`<Image>`), Alex's Avatar (`<Image>`/Lottie).

## 5.3. Screen: Accept or Decline Invitation (Mermaid: AF, AG)

*   **Mermaid Diagram ID:** AF (Accept flow), AG (Decline flow) - these are conditional renderings on the same screen or very similar screens in a stack.

*   **Purpose:** (Remains the same)
    *   Response stored in Supabase (via Nodely).

*   **Key UI Elements (using React Native components):**
    *   **Container (`<View>`):**
    *   **View AF (Accepted):**
        *   Confirmation Message (`<Text>`). Session Details Recap (`<Text>`).
        *   "Add to Calendar" Button (`<TouchableOpacity>` using `expo-calendar` API).
        *   Next Steps Button (`<TouchableOpacity>` with `<Text>`) e.g., "Next: Share Your Perspective".
    *   **View AG (Declined):**
        *   Confirmation Message (`<Text>`).
        *   Optional Reason (`<TextInput multiline={true}>` - Component 10.8).
        *   "Submit Reason & Close" / "Decline Without Reason" Buttons (`<TouchableOpacity>`).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same, adapted for mobile UI)
    *   Guidance for adding to calendar using `expo-calendar`.

*   **Navigation (React Navigation Stack):**
    *   Arrives from 5.2.
    *   Accepted: Navigates to 5.4 (Provide Perspective) or 5.5 (Privacy Settings) or Dashboard.
    *   Declined: Navigates to Dashboard or closes view if entered via deep link without prior app session.

*   **Multimedia Aspects:** Calendar Icons (`<Image>`), Confirmation Icons (`<Image>`). Alex's Avatar.

## 5.4. Screen: Provide Your Perspective (Mermaid: AH)

*   **Mermaid Diagram ID:** AH (Screen for participant's pre-session input, in Stack Navigator).

*   **Purpose:** (Remains the same)
    *   Input (text & files) saved to Supabase via Nodely. AI Orchestration Layer could be used for on-device analysis of participant's multimedia input if needed before upload.

*   **Key UI Elements (using React Native components, Forms Pattern 10.8):**
    *   **Main Container (`<KeyboardAvoidingView>` with `<ScrollView>`):**
    *   Session Title & Host's Context Summary (`<Text>` in a collapsible `<View>`).
    *   Headline (`<Text>`). Instructional Text (`<Text>`).
    *   Main Input Text Area (`<TextInput multiline={true}>`).
    *   **Multimedia Upload Section (Component 10.3):** Using `expo-image-picker`, `expo-document-picker`.
    *   Privacy Note (`<Text>`).
    *   "Submit Perspective" / "Skip for Now" Buttons (`<TouchableOpacity>`).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)
    *   Encouraging input, explaining privacy, guidance on multimedia uploads.

*   **Navigation (React Navigation Stack):**
    *   Arrives from 5.3.
    *   "Submit" or "Skip" navigates to 5.5 (Privacy Settings) or session waiting room/dashboard.

*   **Multimedia Aspects:** File Upload UI (Component 10.3). Alex's Avatar.

## 5.5. Screen: Configure Privacy Settings (Mermaid: AI)

*   **Mermaid Diagram ID:** AI (Privacy settings screen, in Stack Navigator or as a main Tab).

*   **Purpose:** (Remains the same)
    *   Settings stored in Supabase. Dappier could be involved if settings relate to decentralized data permissions or verifiable credentials for data usage.

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<ScrollView>`):**
    *   Headline (`<Text>`). Introductory Text (`<Text>`).
    *   **Settings Sections (`<View>` for each section with `<Text>` label and explanation):**
        *   Profile Visibility: Picker (`@react-native-picker/picker`) or custom selection component.
        *   Transcription Data Usage: `<Switch>` component.
        *   Data Sharing with Host: `<Switch>` component.
        *   AI Coaching: `<Switch>` component.
    *   "Save Settings" Button (`<TouchableOpacity>`).
    *   "Learn More" Link (`<TouchableOpacity>` opening a Modal with Privacy Policy).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same, explaining each option clearly).

*   **Navigation (React Navigation Stack or Tab):**
    *   Arrives from 5.3 or 5.4, or from User Profile/Settings.
    *   "Save Settings" navigates to session waiting room/dashboard or back to profile.

*   **Multimedia Aspects:** Icons (`<Image>`) for settings categories. `<Switch>` components. Alex's Avatar.

This concludes Part 5.
