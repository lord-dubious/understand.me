# Part 3: Main Dashboard & Core Navigation

This part of the Development Guide focuses on the central hub of the "Understand-me" **Expo (React Native) mobile application**: the Main Dashboard. It also covers navigation to other key areas like Session History and the Personal Growth Dashboard, which are integral to the user's ongoing interaction with the platform. UI styling uses **React Native StyleSheet API** (or NativeWind). Navigation is managed by **React Navigation**.

## 3.1. Screen: Main Dashboard (Mermaid: G/H)

*   **Mermaid Diagram ID:** G/H (Represents the main dashboard screen, accessible via the Bottom Tab Navigator - Part 1.5).

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<ScrollView>` within a `<View>`):** Allows scrolling if content exceeds screen height.
    *   **Welcome Message (`<Text>`):** Personalized greeting (e.g., "Good morning, Sarah!").
    *   **Quick Actions Section (`<View>` with horizontally or vertically arranged `<TouchableOpacity>` buttons):**
        *   Prominent button (`<TouchableOpacity>` with `<Text>` and/or `<Image>` icon): "Start New Session" / "Schedule Session".
        *   Button (`<TouchableOpacity>`): "Join a Session" (navigates to Screen 5.1 or a modal for code entry).
        *   Link-like `<TouchableOpacity>` with `<Text>`: "View Upcoming Sessions."
    *   **Recent Activity Overview (`<View>` with a `<FlatList>` or mapped `<View>`s for items):**
        *   Each item a styled `<TouchableOpacity>` card: Session Title (`<Text>`), Date (`<Text>`), small icon (`<Image>`). Navigates to session details.
        *   Quick stats could be `<Text>` elements within this section.
        *   Dappier might be used here if session statuses (e.g., "live," "processing") are updated in real-time via a decentralized pub/sub mechanism.
    *   **"Alex's Insights" / "Tips from Alex" Card (`<View>` - Component 10.2 for Alex's Avatar):**
        *   Displays `<Text>` for Alex's suggestions. Could include `<TouchableOpacity>` buttons for suggested actions.
    *   **Personal Growth Snapshot Teaser (`<TouchableOpacity>` card navigating to Personal Growth Dashboard - Screen 3.3):**
        *   Contains a key stat (`<Text>`) and a mini-chart (e.g., using `react-native-svg-charts`).
    *   **Search Bar (Optional, could be in header via Stack Navigator options):** `<TextInput>` with search icon.

*   **Voice Agent Interactions (Alex - Component 10.2):** (Remains largely the same, delivered via Alex's Avatar/Text in AI Panel card and voice output - Component 10.2)
    *   Personalized greeting, contextual tips.
    *   Responding to queries via voice input (Component 10.1) if a global voice command feature for Alex is implemented.
    *   Proactive notifications delivered as Toasts/Snackbars (Component 10.6) or updates in Alex's Insight card.

*   **Navigation (React Navigation):**
    *   This screen is a primary tab in the **Bottom Tab Navigator** (Part 1.5).
    *   Dashboard cards/buttons navigate to other screens (e.g., Session Setup Part 4, Session History 3.2, specific session details) typically within a **Stack Navigator** managing the flow from that tab.

*   **Multimedia Aspects:**
    *   Alex's Avatar (`<Image>`/Lottie - Component 10.2).
    *   Icons (`<Image>` or icon font) for actions and list items.
    *   Mini-charts for Personal Growth Snapshot.
    *   User Avatars (`<Image>`) in recent session lists.

## 3.2. Screen: Session History (Mermaid: J, LA)

*   **Mermaid Diagram ID:** J (Main list view, a screen in a Stack Navigator, likely accessed from Dashboard or Tab Bar), LA (Detailed view of a past session, also a screen in the Stack Navigator).

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components):**
    *   **View J: Session List View (`<View>` with `<FlatList>`):**
        *   **Search Bar (`<TextInput>` with icon, potentially in Stack Navigator header).**
        *   **Filter Controls:** Implemented using `<TouchableOpacity>` buttons, Pickers (`@react-native-picker/picker`), or custom modal dialogs (Component 10.7) for date range, tags etc.
        *   **Session List Items (`<TouchableOpacity>` card in `<FlatList>`):**
            *   Session Title (`<Text>`), Date & Time (`<Text>`), Duration (`<Text>`).
            *   Action buttons ("View Details", "Play Recording" etc.) as small `<TouchableOpacity>`s with icons/text within the card.
            *   Recording/transcript availability indicator (`<Image>` icon).
    *   **View LA: Detailed Past Session View (`<ScrollView>` with tabbed content using `react-native-tab-view` or similar):**
        *   Header: Session Title etc. (`<Text>`), managed by Stack Navigator.
        *   **Tabs/Sections for Summary, Transcript, Recording, Q&A, Analytics:**
            *   Transcript: Searchable `<Text>` within `<ScrollView>`.
            *   Recording: Audio/video playback using **`expo-av` PlayerView**.
            *   Analytics: Charts using `react-native-svg-charts` or similar.
        *   Action Buttons (`<TouchableOpacity>` with `<Text>/<Image>`): e.g., "Download Transcript" (might use `expo-sharing` or `expo-file-system`).
        *   Nodely could be used for backend processing to generate the detailed analytics from raw session data stored in Supabase.

*   **Voice Agent Interactions (Alex - Component 10.2):** (Remain largely the same, adapted for mobile commands/feedback)
    *   Alex's prompts/tips appear in an AI Panel `<View>` or as Toasts (Component 10.6).

*   **Navigation (React Navigation):**
    *   Accessed from Main Dashboard (3.1) or a dedicated "History" tab in the Bottom Tab Navigator. Uses a Stack Navigator for list (J) to detail (LA) navigation.
    *   Tabs within LA for different content sections.

*   **Multimedia Aspects:**
    *   View J: Icons (`<Image>`) for session types/status.
    *   View LA: Embedded `expo-av` player, charts. Speaker avatars (`<Image>`) in transcript.

## 3.3. Screen: Personal Growth Dashboard (Mermaid: K, CF-CI)

*   **Mermaid Diagram ID:** K (Main Personal Growth Dashboard screen, accessed via Bottom Tab Navigator), CF-CI (Representing various cards/sections within this screen, potentially navigable as sub-screens in a Stack).

*   **Purpose:** (Remains the same)

*   **Key UI Elements (View K - Main Dashboard, using React Native components):**
    *   Main container: `<ScrollView>`.
    *   Overall Communication Score (`<Text>` with explanation).
    *   Date Range Filter (e.g., `<TouchableOpacity>` buttons for "Week", "Month", "Quarter" or a date picker modal).
    *   **Key Metrics Cards/Widgets (`<View>` cards, possibly in a `<FlatList>` or mapped):**
        *   Each card (Clarity, Filler Words etc.) displays metric title (`<Text>`), score/level (`<Text>`), trend graph (e.g., `react-native-svg-charts`), and insight/tip (`<Text>`).
        *   Tapping a card could navigate to a more detailed screen for that metric within the Growth stack.
    *   **"Alex's Coaching Corner" (`<View>` with Alex's Avatar and `<Text>` for tips - Component 10.2).**
    *   Links to relevant sessions (`<TouchableOpacity>` with `<Text>`).
    *   AI Orchestration Layer might be leveraged if some communication pattern data (e.g., tone, speaking speed) is processed locally on-device for privacy before aggregation, with results sent to Supabase via Nodely.

*   **Voice Agent Interactions (Alex - Component 10.2):** (Remain largely the same, acting as data interpreter and coach)
    *   Alex's messages appear in the "Coaching Corner" or as voice output.

*   **Navigation (React Navigation):**
    *   Accessed as a primary tab in the Bottom Tab Navigator.
    *   Individual metric cards can navigate to detail screens within a Stack Navigator specific to the Growth tab.
    *   Links to Session History (LA view) or specific transcript moments.

*   **Multimedia Aspects:**
    *   Rich Charts and Graphs (`react-native-svg-charts` or similar, interactive with `onPress` events).
    *   Icons (`<Image>` or icon font) for metrics/goals.
    *   Alex's Avatar (`<Image>`/Lottie - Component 10.2).
    *   Color-coding in charts (via `StyleSheet`).
