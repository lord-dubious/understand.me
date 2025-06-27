# Part 7: AI-Mediated Session Interface (The Five Phases)

This part of the Development Guide describes the user interface and interaction flow within an active "Understand-me" **Expo (React Native) mobile application** session. The session is structured around five distinct phases. UI styling uses **React Native StyleSheet API** (or NativeWind) and navigation within these phases is typically managed by internal state changes within a single main session screen, rather than full React Navigation screen changes for each phase. AI Orchestration Layer might be used by Alex/AI for real-time session logic, like adapting phase transitions or interventions based on complex event processing of the conversation flow. Dappier could provide real-time data feeds for RAG if external, secure data needs to be referenced mid-session. Nodely could be involved if files shared during the session (e.g., on IPFS) need secure access and display.

## 7.1. Common Session Interface Elements

These UI elements are generally visible and accessible throughout all five phases of an AI-mediated session.

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components):**
    *   **A. Session Header (`<View>` with `StyleSheet`):**
        *   Content: Session Title (`<Text>`), Current Phase Name (`<Text>`), Timer (`<Text>`).
        *   Controls: "Leave Session" (`<TouchableOpacity>` with `<Text>` or icon), Help (`<TouchableOpacity>`), Settings (`<TouchableOpacity>`).
    *   **B. AI Panel (Alex's Hub - Component 10.2, typically a collapsible `<View>` or bottom sheet modal):**
        *   Content: Alex's Avatar (`<Image>`/Lottie), Status/Suggestion (`<Text>`), Instructions (`<Text>`), Goals/Rules display (`<TouchableOpacity>` to show in a Modal - Component 10.7), AI Summaries (`<Text>`), Private Interaction with Alex (`<TextInput>` within the panel, or a button to open a chat modal).
    *   **C. Main Interaction Area / Message Thread / Transcript View (`<ScrollView>` or `<FlatList>`):**
        *   Content: Real-time transcription (`<Text>` items styled as bubbles), speaker attribution (`<Text>`), events (`<Text>`).
    *   **D. Multimedia Context Panel (`<View>` as a collapsible section or tab within AI Panel/Modal - Component 10.3):**
        *   Content: List (`<FlatList>`) of shared files (`<TouchableOpacity>` items to open with `expo-av`, `react-native-pdf`, `WebView`, or `expo-sharing`).
        *   Functionality: View/play media. If Nodely is used for IPFS file access, this panel would handle resolving and displaying those URIs.
    *   **E. Input Area (for Text-Based Contributions - Component 10.8 for form elements):**
        *   Content: `<TextInput>` for messages.
        *   Controls: "Send" (`<TouchableOpacity>`), attach file (`<TouchableOpacity>` using `expo-document-picker`/`expo-image-picker` - Component 10.3), Voice Input Toggle (`<TouchableOpacity>` for Component 10.1).
    *   **F. Same-Device Specifics (Overlay or Footer `<View>` - Component 10.4):**
        *   Active Speaker Indicator (`<Text>` or styled `<View>`).
        *   "Tap-to-Talk" Buttons (`<TouchableOpacity>` for each user).
        *   Turn Management Visuals (`<Text>`). Pass Control Button (`<TouchableOpacity>`).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Remain largely the same, delivered via AI Panel and voice output)

*   **User Interactions:** (Remain largely the same, adapted for touch)

*   **Navigation:**
    *   Phases change by updating the internal state of the main session screen, re-rendering relevant UI parts rather than full screen navigation.
    *   Users can expand/collapse panels via `<TouchableOpacity>`.

*   **Multimedia Context Utilization:** (Remains largely the same, using mobile display methods)
    *   AI (potentially via AI Orchestration Layer/Nodely for complex analysis) might extract and highlight key info from documents for display in AI Panel.

## 7.2. Screen: Phase 1 - Prepare (Mermaid: AX)

*   **Mermaid Diagram ID:** AX (Initial state of the main session screen).

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components):**
    *   Common Elements are present.
    *   Main Interaction Area: Welcome `<Text>`, Goals/Rules (`<Text>` components, possibly in a `<Card>` like `<View>`). AI-generated summary (`<Text>`).
    *   AI Panel: Alex's status/instructions (`<Text>`). "Ready to Start" (`<TouchableOpacity>`) for each participant (if needed, updates state).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same, adapted for mobile delivery)

*   **User Interactions:** Read info, ask questions via Input Area (E) or voice (Component 10.1). Indicate readiness via `<TouchableOpacity>`.

*   **Navigation:** Phase transition managed by internal state update.

*   **Multimedia Context Utilization:** (Remains the same)

## 7.3. Screen: Phase 2 - Express (Mermaid: AY, BA, BB)

*   **Mermaid Diagram ID:** AY (General state), BA (Active Speaker UI), BB (Listener/Same-Device UI).

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components):**
    *   Common Elements present.
    *   Main Interaction Area: Real-time transcription. Visual indication of active speaker (BA - e.g., highlighted name `<Text>`).
    *   AI Panel: Speaker turn order (`<Text>`), current/next speaker (`<Text>`), timer (`<Text>`). Guidance for speaker/listeners (`<Text>`). Optional "Request to Speak" `<TouchableOpacity>`.
    *   Same-Device UI (BB - Component 10.4): Active speaker button highlighted. Other buttons inactive. "Done Speaking" `<TouchableOpacity>`.

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same, actively manages turns including same-device via Component 10.4 cues)

*   **User Interactions:** Active speaker uses voice (Component 10.1). Listeners view transcript. Same-device users use tap-to-talk.

*   **Navigation:** Phase transition by internal state update after all turns.

*   **Multimedia Context Utilization:** (Remains the same)

## 7.4. Screen: Phase 3 - Understand (Mermaid: BC)

*   **Mermaid Diagram ID:** BC (Understand phase state).

*   **Purpose:** (Remains the same)
    *   AI summaries/maps generated by Google GenAI, potentially orchestrated by AI Orchestration Layer or Nodely from session data.

*   **Key UI Elements (using React Native components):**
    *   Common Elements present.
    *   Main Interaction Area: AI summaries (`<Text>`), Q&A thread.
    *   AI Panel: Perspective Summaries (`<Text>`), Visual Perspective Map (could be an `<Image>` generated by AI, or a custom `<View>` using `react-native-svg` if simple enough). Areas of Alignment/Divergence (`<Text>`). Clarification Prompts (`<Text>`).
    *   Multimedia Context Panel: Relevant files highlighted (e.g., border change on the file item in the `<FlatList>`).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)
    *   Guides exploration of AI summaries/maps. Facilitates clarification. Connects to multimedia files (potentially including those on IPFS via Nodely, if applicable).

*   **User Interactions:** Review AI Panel, ask/answer questions via voice/text. Refer to multimedia. Same-device turn management via Component 10.4.

*   **Navigation:** Iterative; phase transition by internal state update.

*   **Multimedia Context Utilization:** (Remains the same)

## 7.5. Screen: Phase 4 - Resolve (Mermaid: BD)

*   **Mermaid Diagram ID:** BD (Resolve phase state).

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components):**
    *   Common Elements present.
    *   Main Interaction Area: Brainstormed ideas (`<Text>` items), highlighted agreements (`<Text>` with distinct style). Polls (could be custom `<View>` with `<TouchableOpacity>` options).
    *   AI Panel: Brainstorming Prompts (`<Text>`). Solution/Idea List (`<FlatList>` of `<Text>` items, perhaps with voting via `<TouchableOpacity>`). Pros & Cons Tool (simple two-column `<View>` with `<Text>`). Agreement Tracker (`<Text>`). Action Item List (`<Text>`).
    *   Multimedia Context Panel: Referencing files for solution feasibility.

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)
    *   Guides brainstorming, evaluation, consensus tracking. Dappier might be relevant if "agreements" need to be cryptographically signed or made verifiable.

*   **User Interactions:** Propose solutions (voice/text). Discuss/evaluate. Indicate agreement via voice/tap. Refer to multimedia.

*   **Navigation:** Iterative; phase transition by internal state update.

*   **Multimedia Context Utilization:** (Remains the same)

## 7.6. Screen: Phase 5 - Heal (Mermaid: BE)

*   **Mermaid Diagram ID:** BE (Heal phase state).

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components):**
    *   Common Elements present.
    *   Main Interaction Area: Prompts for reflection (`<Text>`), shared reflections (`<Text>`).
    *   AI Panel: Summary of Agreements (`<Text>`). Reflection/Intention Prompts (`<Text>`). Affirmation/Acknowledgment Area (`<Text>`). Private Feedback Button (`<TouchableOpacity>` linking to a Modal or separate feedback screen).
    *   Input Area: `<TextInput>` for reflections, with a `<Switch>` or similar to mark as "Share with group" / "Private."

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)
    *   Facilitates reflection, affirmations, intention setting, session closing.

*   **User Interactions:** Listen, reflect, share reflections/intentions (voice/text, public/private). Provide feedback.

*   **Navigation:** Final phase. Session ends, navigates to Post-Session (Part 8) screens (e.g., 8.1 Summary) via React Navigation.

*   **Multimedia Context Utilization:** (Remains largely the same, minimal focus here).

This concludes Part 7.
