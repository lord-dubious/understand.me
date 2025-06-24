# Part 10: Shared Components & UI Patterns

This part of the Development Guide defines and describes reusable UI components and interaction patterns that are applied across multiple features and screens within the "Understand-me" **Expo (React Native) mobile application**. Adhering to these definitions is crucial for maintaining UI consistency, predictability, and a cohesive user experience. Styling will primarily use **React Native's StyleSheet API**, with consideration for Tailwind-like syntax via libraries like **NativeWind** if complex styling needs arise that benefit from utility classes.

## 10.1. Component: Voice Input & Processing

*   **Purpose:**
    *   To allow users to interact with the system and provide input using their voice (e.g., dictating responses, issuing commands to Alex, speaking during sessions for transcription) using native device capabilities via **Expo AV API** or a similar module.
    *   To provide clear visual feedback on the status of voice input and processing.

*   **Key UI Elements / States (using React Native components):**
    *   **Microphone Icon Button (`<TouchableOpacity>` with `<Image>` or icon font):**
        *   **Resting/Default State:** Standard microphone icon. `accessibilityLabel`: "Activate Voice Input."
        *   **Press State:** Visual feedback on press (e.g., opacity change).
        *   **Active/Listening State:** Icon changes (e.g., to a pulsating version or sound wave). `accessibilityLabel`: "Stop Listening." Visual cues like a surrounding animated `<View>`.
        *   **Processing State:** A distinct visual indicator (e.g., spinning `<ActivityIndicator>` around the mic icon). `accessibilityLabel`: "Processing audio."
        *   **Disabled State:** Greyed-out icon if voice input is unavailable. `accessibilityLabel`: "Voice input unavailable."
    *   **Visual Feedback for Transcription (e.g., in a `<TextInput>` or custom `<Text>` display within a `<View>`):**
        *   Real-time display of transcribed text.
        *   "Thinking" ellipses (...) or a subtle animation if there's a slight delay.
    *   **Permission Prompts:** Handled via **Expo's `Permissions` API** (e.g., `AudioRecordingPermission`). UI should gracefully guide users if permission is denied.

*   **Relevant Voice Agent (Alex) Interactions or Cues:** (Remain largely the same as previous, adapted for mobile context)
    *   Error handling messages might appear in the AI Panel or as Toasts (10.6).
    *   PicaOS could be involved if advanced on-device audio pre-processing is required before sending to GenAI.

*   **Typical Usage Locations:** (Remain largely the same, adapted for mobile screens)
    *   Input areas in various screens.
    *   Live session interface.
    *   Interacting with Alex.
    *   Same-Device Setup (Screen 6.3).

## 10.2. Component: AI Voice Output & Avatar (Alex's Presence)

*   **Purpose:** (Remains the same)
    *   Voice output will be handled using **ElevenLabs API via a backend service (possibly Nodely for orchestration) and then played using Expo AV API** on the device.

*   **Key UI Elements / States (using React Native components):**
    *   **Alex's Avatar (`<Image>` or custom animated component like Lottie with `lottie-react-native`):**
        *   States (Resting, Speaking, Listening, Emotive) as previously defined, animations are key for mobile.
        *   Placement: Consistently placed, typically within the AI Panel (a `<View>` acting as 7.1.B).
    *   **Voice Output Controls (User-configurable in Settings screen):**
        *   Implemented using React Native switches (`<Switch>`) and sliders (e.g., from `@react-native-community/slider`).
    *   **Text Display of Alex's Speech (`<Text>` components within relevant `<View>`s):** Essential for accessibility.

*   **Relevant Voice Agent (Alex) Interactions or Cues:** (Remain the same as previous)

*   **Typical Usage Locations:** (Remain the same, adapted for mobile screens)

## 10.3. Component: Multimedia File Upload & Display

*   **Purpose:** (Remains the same)
    *   File upload will utilize **`expo-document-picker`** for general documents and **`expo-image-picker`** for images/videos. Uploads managed via Supabase storage.
    *   Display might involve **`expo-av`** for audio/video playback, or `react-native-pdf` / `WebView` for documents.

*   **Key UI Elements / States (using React Native components):**
    *   **File Upload Area/Button (`<TouchableOpacity>`):**
        *   "Upload Files" / "Choose Files" `<Text>` within the button.
        *   Accepted File Types & Size Limits displayed via `<Text>`.
    *   **File Upload Progress (`<View>` with `ProgressBarAndroid` / `ProgressViewIOS` or custom animated `<View>`):**
        *   Filename (`<Text>`), progress bar, percentage (`<Text>`), "Cancel" (`<TouchableOpacity>`).
    *   **Uploaded File Display (e.g., in a `<FlatList>` or `<ScrollView>`):**
        *   File Icon (`<Image>` or icon font).
        *   Filename (`<Text>`). File Size (`<Text>`). Timestamp (`<Text>`).
        *   "Remove" Icon (`<TouchableOpacity>` with icon).
        *   Preview Option (`<TouchableOpacity>`) opening a Modal (10.7) with the content.
    *   **Multimedia Context Panel (7.1.D - a `<View>`):**
        *   Inline viewing/playback components.
    *   **AI Analysis Snippets Display:**
        *   "AI Insights" badge (`<View>` with `<Text>`) next to file item.
        *   Revealed snippets in a `<Text>` block.
        *   Nodely might be involved in orchestrating the AI analysis of files stored in Supabase, and Dappier could be used if files have specific access control or rights management. If files are stored on a decentralized system via Nodely/Dappier, URIs might be IPFS or similar, requiring appropriate handling for display/retrieval.

*   **Relevant Voice Agent (Alex) Interactions or Cues:** (Remain largely the same)

*   **Typical Usage Locations:** (Remain the same, adapted for mobile screens)

## 10.4. Pattern: Same-Device User Identification & Turn Management

*   **Purpose:** (Remains the same)

*   **Key UI Elements / States (using React Native components):**
    *   **Initial Setup (Screen 6.3 - AN, AO):**
        *   `<TextInput>` for names.
        *   `<Image>` or colored `<View>` for avatars/indicators.
    *   **In-Session Interface (integrates with Common Element 7.1.F - likely a footer `<View>` or overlay):**
        *   Speaker Queue/Order Display (`<Text>` components).
        *   **"Tap-to-Talk" Button Area:**
            *   `<TouchableOpacity>` for each participant, styled with their name/color/avatar (`<Text>`, `<Image>`).
            *   Visual highlighting for active speaker (e.g., changing background color, border of the `<TouchableOpacity>`).
        *   **"Pass the Mic" / "Done Speaking" Button (`<TouchableOpacity>`).**
        *   Active Speaker Name Display (`<Text>`) in transcript area.

*   **Relevant Voice Agent (Alex) Interactions or Cues:** (Remain the same)

*   **Typical Usage Locations:** (Remain the same)

## 10.5. Pattern: Emotional State Indicators (Subtle & Optional)

*   **Purpose:** (Remains the same, with strong emphasis on user control and subtlety in mobile).

*   **Key UI Elements / States (using React Native components):**
    *   **Location:** Small `<View>` in AI Panel, near speaker name, or part of Alex's `<Image>`/Lottie animation.
    *   **Visual Representation (Subtle):**
        *   **Color Shifting Ambient Orb/Glow:** An animated `<View>` (e.g., using `Animated` API or `react-native-reanimated`) that changes `backgroundColor`.
        *   **Alex's Avatar Expression:** Subtle changes to the Lottie animation file or `<Image>` source.
    *   **Tooltip/Explanation (On press of the indicator or a nearby info icon):** Displayed in a small pop-up or Modal (10.7).
    *   **User Settings:** Implemented with `<Switch>` components on a settings screen.

*   **Relevant Voice Agent (Alex) Interactions or Cues:** (Remain the same, emphasizing indirectness)

*   **Typical Usage Locations:** (Remain the same)
*   **Important Considerations:** (Remain the same)

## 10.6. Component: Notification/Alert System

*   **Purpose:** (Remains the same)

*   **Key UI Elements / States (using React Native components):**
    *   **Notification Types:**
        *   **Toast/Snackbar Notifications:** Implemented using a custom `<Animated.View>` at top/bottom of screen or a library like `react-native-toast-message`. Content: `<Text>`, optional `<Image>` (icon), dismiss `<TouchableOpacity>`.
        *   **In-App Alerts/Badges:** A small `<View>` with `<Text>` (count) overlaid on navigation icons.
        *   **Modal Alerts (see 10.7 - Modal/Dialog).**
        *   **Email Notifications:** (Handled by backend services like Supabase functions or Nodely workflows).
        *   **Push Notifications:** Implemented using **`expo-notifications`**. Requires obtaining push notification permissions.
    *   **Notification Center/List (Optional):** A `<FlatList>` within a dedicated screen or modal.
    *   **Notification Settings:** Screen with `<Switch>` components for various notification channels/types.

*   **Relevant Voice Agent (Alex) Interactions or Cues:** (Remain largely the same)

*   **Typical Usage Locations:** (Remain the same)

## 10.7. Component: Modal/Dialog

*   **Purpose:** (Remains the same)

*   **Key UI Elements / States (using React Native's `<Modal>` component):**
    *   **Overlay:** The `<Modal>` component's backdrop styling.
    *   **Modal Container (`<View>` within the `<Modal>`):**
        *   Styled with `StyleSheet` (borders, background color).
        *   **Header (`<View>` with `<Text>` for Title, `<TouchableOpacity>` with icon for Close).**
        *   **Content Area (`<ScrollView>` or `<View>`).**
        *   **Footer / Action Area (`<View>` with `<Button>` or styled `<TouchableOpacity>` components).**
    *   **States:** Animation handled by `<Modal>` properties (`animationType`). Focus management is critical for accessibility (`accessible`, `accessibilityViewIsModal`).
    *   **Types of Modals:** Structure content within the modal for Confirmation, Alert, Form, Information types.

*   **Relevant Voice Agent (Alex) Interactions or Cues:** (Remain largely the same)

*   **Typical Usage Locations:** (Remain the same)
*   **Accessibility Considerations:**
    *   React Native's `<Modal>` has props like `accessible`, `accessibilityLabel`, `accessibilityHint`, `onDismiss` that are important. Ensure keyboard (if applicable via external keyboard) and screen reader accessibility. Focus should be managed logically.

## 10.8. Pattern: Form Elements & Validation

*   **Purpose:** (Remains the same)

*   **Key UI Elements / States (using React Native components):**
    *   **Standard Form Controls:**
        *   **Text Inputs (`<TextInput>`):**
            *   Label (`<Text>`). Placeholder text via `placeholder` prop.
            *   States managed by parent component's state and `StyleSheet`.
        *   **Dropdowns/Selects:** Typically implemented using a library like `react-native-picker-select` or custom component using `<Modal>` and `<FlatList>`.
        *   **Checkboxes & Radio Buttons:** Custom components using `<TouchableOpacity>` and `<View>`/`<Image>` (icon) or libraries like `react-native-bouncy-checkbox`.
        *   **Date/Time Pickers:** Using `@react-native-community/datetimepicker`.
        *   **File Input (see 10.3).**
    *   **Labels & Helper Text (`<Text>` components):**
        *   Required Field Indicators (`<Text>` with "*").
    *   **Validation Feedback:**
        *   Error messages displayed as `<Text>` components below the field, styled with `StyleSheet` (e.g., red color). Field border color in `<TextInput>` style changes.
    *   **Buttons within Forms (`<Button>` or styled `<TouchableOpacity>`):**
        *   Primary/Secondary visual distinction via `StyleSheet`.
        *   Disabled state via prop and styling.

*   **Relevant Voice Agent (Alex) Interactions or Cues:** (Remain largely the same)

*   **Typical Usage Locations:** (Remain the same)

This concludes Part 10.
