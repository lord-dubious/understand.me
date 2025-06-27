# Part 4: Host Path - Initiating a Session

This part of the Development Guide details the journey a Host takes to initiate a new session within the **Expo (React Native) mobile application**. It covers steps from describing the initial situation to inviting participants, leveraging AI insights and Alex's guidance. UI styling uses **React Native StyleSheet API** (or NativeWind) and navigation is via **React Navigation**.

## 4.1. Screen: Describe Conflict (Mermaid: O)

*   **Mermaid Diagram ID:** O (Initial screen in the new session flow, typically part of a Stack Navigator).

*   **Purpose:** (Remains the same)
    *   AI analysis of text and multimedia might be orchestrated by Nodely, with AI Orchestration Layer potentially involved for on-device pre-processing of multimedia if it's very large or requires immediate sensitive data scrubbing before upload to Supabase.

*   **Key UI Elements (using React Native components, Forms Pattern 10.8):**
    *   **Main Container (`<ScrollView>` within a `<KeyboardAvoidingView>`):**
    *   **Session Title Field (`<TextInput>` from Component 10.8).**
    *   **Main Description Text Area (`<TextInput multiline={true}>` from Component 10.8).**
        *   Placeholder text.
    *   **Multimedia Upload Section (Component 10.3):**
        *   `<TouchableOpacity>` button to trigger `expo-image-picker` or `expo-document-picker`.
        *   Uploaded files displayed in a `<FlatList>` with `<Image>` icons and `<Text>` for filenames, plus remove (`<TouchableOpacity>`) option.
        *   Progress indicators (e.g., `<ActivityIndicator>` or custom).
    *   **Key Information Prompts (Optional `<View>` with `<Text>` labels and `<TextInput>` fields):**
    *   **Privacy/Sensitivity Notice (`<Text>` with appropriate styling).**
    *   **"Next: AI Analysis" or "Save Draft" Button (`<TouchableOpacity>` with `<Text>`).**

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same, delivered via Alex's Avatar/Text in an AI Panel `<View>` and voice output - Component 10.2)
    *   Guidance during description, encouraging multimedia uploads (using Expo pickers), explaining file usage (files uploaded to Supabase, analysis by Google GenAI via Nodely/AI Orchestration Layer).

*   **Navigation (React Navigation Stack):**
    *   Accessed via "Start New Session" CTA from Main Dashboard (Screen 3.1).
    *   "Next: AI Analysis" button navigates to Screen 4.2.
    *   "Save Draft" saves to Supabase (potentially via Nodely) and navigates back to dashboard.

*   **Multimedia Aspects:**
    *   File Upload Interface (Component 10.3).
    *   Alex's Avatar (`<Image>`/Lottie - Component 10.2).
    *   Loading Indicators (`<ActivityIndicator>`).

## 4.2. Screen: AI Problem Analysis Review (Mermaid: Q, R)

*   **Mermaid Diagram ID:** Q (Main AI Analysis Review screen), R (Detailed view/feedback for insights, possibly a `<Modal>` - Component 10.7 - or separate screen).

*   **Purpose:** (Remains the same)
    *   AI insights from Google GenAI, potentially orchestrated by Nodely, including analysis of files from Supabase (which might have been pre-processed by AI Orchestration Layer).

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<ScrollView>`):**
    *   **Summary of Host's Input (`<View>` with `<Text>`, collapsible using `<TouchableOpacity>`).**
    *   **Insight Cards (`<View>` with `StyleSheet` styling for card appearance):**
        *   Key Themes/Topics: `<Text>` list. Tapping a theme might show snippets in a Modal (R).
        *   Sentiment Analysis: `<Text>` score, simple chart (e.g., `react-native-svg-charts`).
        *   Potential Misunderstanding/Disagreement: `<Text>` explanations.
        *   Key Entities/People: `<Text>` list.
        *   Suggested Talking Points: `<Text>` list.
    *   **Feedback Mechanism (View R):** `<TouchableOpacity>` icons (e.g., thumbs up/down using `<Image>`) next to insights. Comments via `<TextInput>` in a Modal.
    *   **"Next: Configure Session" / "Back to Description" Buttons (`<TouchableOpacity>`).**

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)
    *   Explaining insights displayed in `<Text>` components within cards.
    *   Encouraging feedback.

*   **Navigation (React Navigation Stack):**
    *   Arrives from Screen 4.1.
    *   "Next" navigates to 4.3. "Back" navigates to 4.1 (triggering re-analysis if input changed).
    *   Tapping insights might open a Modal (R) or navigate to a detail screen within the stack.

*   **Multimedia Aspects:**
    *   Visualizations: Simple charts (`react-native-svg-charts`), tag clouds (could be a custom `<View>` with styled `<Text>`).
    *   Highlighted text snippets shown in Modals or detail views.
    *   Icons (`<Image>`) for feedback. Alex's Avatar (`<Image>`/Lottie).

## 4.3. Screen: Configure Session Type (Mermaid: S, T)

*   **Mermaid Diagram ID:** S (Main Configuration screen), T (Templates/options, possibly a `<Modal>` or separate screen).

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<ScrollView>`):**
    *   **Recap of AI Insights (`<TouchableOpacity>` linking to a Modal or previous screen).**
    *   **Recommended Session Types Card (`<View>` with `<Text>` and `<TouchableOpacity>` "Select" buttons).**
    *   **Browse All Session Templates (View T - `<FlatList>` of `<TouchableOpacity>` cards in a Modal or new screen):**
        *   Each card: Title (`<Text>`), Description (`<Text>`), Duration (`<Text>`), Preview button.
    *   **"Start from Scratch" Button (`<TouchableOpacity>`).**
    *   **Selected Session Type Details (`<View>`):**
        *   Name (`<TextInput>`), Duration (e.g., Picker or `<TextInput>`).
        *   Key Features/Tools: List of `<View>`s with `<Text>` label and `<Switch>` component (from Component 10.8).
    *   **Agenda Builder (Optional):** `<FlatList>` of `<TextInput>` for agenda items.
    *   **"Next: Add Participants" / "Save for Later" Buttons (`<TouchableOpacity>`).**

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)
    *   Recommendations and guidance delivered via Alex's standard presence.

*   **Navigation (React Navigation Stack):**
    *   Arrives from 4.2. "Next" to 4.4. "Save" to dashboard. "Back" to 4.2.
    *   Selecting template (T) updates current screen or navigates to detail.

*   **Multimedia Aspects:**
    *   Icons (`<Image>`) for templates and features. Alex's Avatar (`<Image>`/Lottie).

## 4.4. Screen: Add Participants & Send Invitations (Mermaid: U, X) - for Joint Remote

*   **Mermaid Diagram ID:** U (Main participant screen), X (Invitation message, likely a `<Modal>` - Component 10.7).

*   **Purpose:** (Remains the same)
    *   Contact list access via `expo-contacts`. Calendar integration for scheduling (BN in 8.5) might use `expo-calendar`.

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<ScrollView>`):**
    *   **Session Details Summary (`<View>` with `<Text>`).**
    *   **Participant Input Area (`<TextInput>` for emails, `<TouchableOpacity>` to access contacts via `expo-contacts`).**
    *   **Participant List (`<FlatList>` of `<View>` cards with `<Text>` name, `<TouchableOpacity>` remove icon).**
        *   Role assignment with Picker. Grouping UI with styled `<View>`s.
    *   **Invitation Message Customization (View X - Modal):** `<TextInput>` for subject, `<TextInput multiline={true}>` for body. Preview button.
    *   **Scheduling Options:** `@react-native-community/datetimepicker` or custom modal.
    *   **"Send Invitations" / "Get Shareable Link" / "Save and Invite Later" Buttons (`<TouchableOpacity>`).**
    *   Nodely could manage the sending of invitations via Supabase (e.g., triggering email services).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)

*   **Navigation (React Navigation Stack):**
    *   Arrives from 4.3. "Send" or "Shareable Link" to 4.5. "Save" to dashboard. "Back" to 4.3.

*   **Multimedia Aspects:**
    *   User Avatars (`<Image>`) in list. Calendar icon (`<Image>`). Email preview in Modal. Alex's Avatar.

## 4.5. Screen: Track Invitation Status (Mermaid: Y, Z, AA, AB, AC) - for Joint Remote

*   **Mermaid Diagram ID:** Y (Main tracking screen), Z, AA, AB (Status indicators), AC (Action buttons).

*   **Purpose:** (Remains the same)
    *   Real-time status updates could be facilitated by Supabase Realtime subscriptions, potentially managed/proxied by Nodely or Dappier for enhanced features.

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<View>`):**
    *   **Session Details Header (`<View>` with `<Text>`).**
    *   **Overall Status Summary (`<View>` with `<Text>` counts and a simple chart e.g. `react-native-pie-chart`).**
    *   **Participant List Table (`<FlatList>` of `<View>` cards):**
        *   Each card: Participant Name/Email (`<Text>`), Status (`<Text>` with styled color-coded `<View>` indicator - Z, AA, AB), Role (`<Text>`), Last Updated (`<Text>`).
        *   Actions (AC): Row of `<TouchableOpacity>` buttons with icons/text ("Resend," "Edit").
    *   **Filter/Sort Options (`<TouchableOpacity>` buttons triggering filter logic on the `<FlatList>` data).**
    *   **Bulk Actions (`<TouchableOpacity>` buttons).**
    *   **"Start Session" / "Edit Session Details" / "Cancel Session" Buttons (`<TouchableOpacity>`).**

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)

*   **Navigation (React Navigation Stack):**
    *   Arrives from 4.4 or selected from Dashboard/Session History. Actions (AC) might open Modals (Component 10.7). "Edit Session" to 4.3. "Start Session" to live session (Part 7).

*   **Multimedia Aspects:**
    *   Color-coded status indicators (styled `<View>`s). Icons (`<Image>`). Progress charts. Alex's Avatar.

This concludes Part 4.
