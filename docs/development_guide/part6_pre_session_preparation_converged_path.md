# Part 6: Pre-Session Preparation (Converged Path)

This part of the Development Guide focuses on the final steps before a session begins in the **Expo (React Native) mobile application**. Inputs from Host and Participants are synthesized, session goals/rules established, and same-device setup handled. UI styling uses **React Native StyleSheet API** (or NativeWind) and navigation is via **React Navigation**.

## 6.1. Screen: AI Synthesizes All Inputs & Dynamic Adaptation (Mermaid: AJ, AK)

*   **Mermaid Diagram ID:** AJ (Main screen for synthesized insights), AK (Dynamic adaptation/drill-down views, possibly Modals or separate screens in a Stack).

*   **Purpose:** (Remains the same)
    *   This process might be orchestrated by Nodely, which gathers all inputs (Host description from 4.1, Participant perspectives from 5.4, including file analyses from Supabase/Google GenAI, potentially pre-processed by AI Orchestration Layer) and feeds them to Google GenAI for the synthesis. Dappier could be involved if any of this data is access-controlled or requires special handling.

*   **Key UI Elements (View AJ - Primarily Host View, using React Native components):**
    *   **Main Container (`<ScrollView>`):**
    *   **Combined Input Summary (`<View>` with `<Text>`, collapsible via `<TouchableOpacity>`).**
    *   **Insight Cards (`<View>` with `StyleSheet` for card appearance):**
        *   Key Themes - Converged View: `<Text>` list.
        *   Sentiment Overview - Combined: `<Text>` and simple charts (e.g., `react-native-svg-charts`).
        *   Areas of Agreement/Common Ground: `<Text>` list.
        *   Potential Areas of Divergence/Conflict: `<Text>` list, tapping might open a Modal (AK) showing conflicting snippets from different inputs (e.g., from Host's uploaded file vs. Participant's perspective text).
        *   Key Personality Insights Snapshot: `<Text>` (e.g., "Host prefers directness, P1 prefers details").
    *   **AI Suggested Focus Areas/Adaptations (`<View>` with `<Text>` list - AK integrated).**
    *   **Feedback on Synthesis (`<TouchableOpacity>` icons).**
    *   **"Next: Establish Session Goals & Rules" Button (`<TouchableOpacity>` with `<Text>`).**

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same, adapted for mobile)
    *   Alex explains the synthesized information displayed in `<Text>` components.
    *   Highlights how personality data (from Screen 2.3) might influence session dynamics.

*   **Navigation (React Navigation Stack):**
    *   Accessed by Host after pre-session inputs are gathered.
    *   "Next" button navigates to Screen 6.2.
    *   Drill-downs (AK) might be Modals (Component 10.7) or new screens in the stack.

*   **Multimedia Aspects:**
    *   Visualizations: Charts (`react-native-svg-charts`). Text snippets for comparisons.
    *   Icons (`<Image>`) for agreement/divergence. Alex's Avatar (`<Image>`/Lottie - Component 10.2).

## 6.2. Screen: Establish Session Goals & Rules (Mermaid: AL, AM)

*   **Mermaid Diagram ID:** AL (Goal Setting), AM (Rule Setting) - can be sections within a single `<ScrollView>` screen or separate screens in a stack.

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components, Forms Pattern 10.8):**
    *   **Main Container (`<ScrollView>`):**
    *   **View AL: Establish Session Goals**
        *   Headline (`<Text>`).
        *   AI-Suggested Goals List (`<FlatList>` of items, each with `<TextInput>` for editing goal text and `<TouchableOpacity>` to delete).
        *   "Add New Goal" Button (`<TouchableOpacity>`).
    *   **View AM: Establish Session Rules/Guidelines**
        *   Headline (`<Text>`).
        *   AI-Suggested Rules List (`<FlatList>` similar to goals).
        *   "Add New Rule" Button (`<TouchableOpacity>`).
        *   Browse Standard Rule Sets (`<TouchableOpacity>` opening a Modal - Component 10.7 - with a `<FlatList>` of rule sets).
    *   **Confirmation/Sharing Options:**
        *   "Confirm Goals & Rules" Button (`<TouchableOpacity>`).
        *   Share option: `<Switch>` component next to a `<Text>` label.
    *   **Navigation Buttons (`<TouchableOpacity>`).**

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same, adapted for mobile)
    *   Alex explains suggestions for goals/rules.
    *   Emphasizes rules relevant for same-device setup if that mode is anticipated.

*   **Navigation (React Navigation Stack):**
    *   Arrives from 6.1. "Confirm" leads to 6.3 (if same-device) or session waiting room. "Back" to 6.1.

*   **Multimedia Aspects:**
    *   Icons (`<Image>`) for goals/rules. Editable list UI. Alex's Avatar (`<Image>`/Lottie).

## 6.3. Screen: Same-Device Setup (Mermaid: V, AN, AO, AP)

*   **Mermaid Diagram ID:** V (Intro), AN (User ID), AO (Mini-Assessment), AP (Tap-to-Talk Training) - sequence of screens in a Stack Navigator, or steps within a single screen.

*   **Purpose:** (Remains the same)
    *   AI Orchestration Layer could potentially be used here for advanced on-device voice signature capture/training if "tap-to-talk" is augmented with voice recognition for speaker changes, though this is an advanced feature. For now, manual tap-to-talk is assumed.

*   **Key UI Elements (using React Native components):**
    *   **View V: Introduction**
        *   Headline (`<Text>`), Explanation (`<Text>`).
        *   Number of Participants Input (`<TextInput keyboardType="numeric">`).
        *   "Start Setup" Button (`<TouchableOpacity>`).
    *   **View AN: User Identification/Order**
        *   Headline (`<Text>`).
        *   `<FlatList>` or mapped `<View>`s generating `<TextInput>` for each participant's name.
        *   Option to "Use existing profile" (`<TouchableOpacity>`) might involve a search/login modal.
        *   Assigned avatars/colors displayed via `<Image>` or styled `<View>`.
        *   "Next" Button (`<TouchableOpacity>`).
    *   **View AO: Sequential Mini-Personality Assessment (if needed)**
        *   Headline (`<Text>`). Question (`<Text>`).
        *   Multiple choice answers presented as `<TouchableOpacity>` buttons.
        *   "Next" Button.
    *   **View AP: Tap-to-Talk / Speaker Switching Training (Component 10.4)**
        *   Headline (`<Text>`).
        *   Visual Demonstration (Lottie animation `lottie-react-native` or `<Image>` sequence).
        *   Interactive Practice: `<View>` containing `<TouchableOpacity>` buttons for each user (name + avatar/color). Visual feedback on active tap (StyleSheet changes). Sample phrase prompt (`<Text>`).
        *   Reinforcement of Rules (`<Text>`).
        *   "Ready to Join Session" Button (`<TouchableOpacity>`).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same, very interactive in this flow)
    *   Alex guides each user on the shared device through each step (V to AP).
    *   Uses voice input (`expo-av` via Component 10.1) for name entry or mini-assessment responses if preferred by user.
    *   Provides audio feedback during tap-to-talk practice.

*   **Navigation (React Navigation Stack):**
    *   Initiated by Host from 6.2 or session control panel.
    *   Sequential flow V -> AN -> AO (conditional) -> AP.
    *   "Ready to Join" proceeds to session waiting room or live session (Part 7).
    *   "Go Back" allows correction of previous steps.

*   **Multimedia Aspects:**
    *   User Avatars/Color Indicators (`<Image>`, styled `<View>`).
    *   Lottie animation for tap-to-talk demo.
    *   Visual feedback on active speaker button. Alex's Avatar.

This concludes Part 6.
