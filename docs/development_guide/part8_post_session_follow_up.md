# Part 8: Post-Session & Follow-Up

This part of the Development Guide covers the user experience after an "Understand-me" **Expo (React Native) mobile application** session has concluded. UI styling uses **React Native StyleSheet API** (or NativeWind) and navigation is via **React Navigation**.

## 8.1. Screen: AI Generates Summary & Action Plan (Mermaid: BF)

*   **Mermaid Diagram ID:** BF (Screen displaying AI-generated summary, part of a Stack Navigator, typically accessed from a session end state or notification).

*   **Purpose:** (Remains the same)
    *   Summary generation by Google GenAI, potentially orchestrated by Nodely. If summaries are stored on IPFS via Nodely, this screen would fetch and display them.

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<ScrollView>`):**
    *   Session Title, Date, Participants List (`<Text>` components).
    *   **Overall Session Summary Section (`<View>` with `<Text>` for the narrative).**
    *   **Key Decisions / Agreements Section (`<FlatList>` or mapped `<View>`s with `<Text>` for each item).**
    *   **Action Plan Section (`<FlatList>` or mapped `<View>`s with `<Text>` for action, owner, due date).**
    *   **Referenced Multimedia / Transcript Highlights (`<View>`):**
        *   Links (`<TouchableOpacity>` with `<Text>`) to multimedia files (opening with `expo-sharing` or in-app preview via Component 10.3).
        *   Quotes/links to transcript moments (`<Text>`, potentially tappable to open full transcript at that point).
    *   **"Download Summary (PDF)" Button (`<TouchableOpacity>` using `expo-print` or `expo-sharing` for a generated PDF).**
    *   **"Proceed to Review & Approve" / "Edit Summary" Buttons (`<TouchableOpacity>`).**
    *   Disclaimer (`<Text>`).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same, adapted for mobile)
    *   Alex presents summary elements displayed in `<Text>` components.

*   **Navigation (React Navigation Stack):**
    *   Appears after session ends or via notification.
    *   "Proceed to Review & Approve" navigates to 8.2.
    *   "Edit Summary" might open a modal (Component 10.7) or new screen for editing.

*   **Multimedia Aspects:**
    *   Clean document layout using styled `<View>` and `<Text>`.
    *   Interactive links. Icons (`<Image>`). Alex's Avatar (`<Image>`/Lottie - Component 10.2).

## 8.2. Screen: Participants Review & Approve Summary (Mermaid: BG)

*   **Mermaid Diagram ID:** BG (Screen for participant review, in Stack Navigator).

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<ScrollView>`):**
    *   **Session Summary Display (`<View>` with nested `<Text>` components for sections from 8.1).**
        *   Comment Bubbles/Annotations: Tapping a `<View>` section might open a `<Modal>` (Component 10.7) with a `<TextInput>` (Component 10.8) for comments. Comments could be stored in Supabase, linked to summary sections.
    *   **Participant Review Status Section (`<FlatList>` of `<View>`s with participant `<Text>` and status `<Text>/<Image>` icon).**
    *   **Action Buttons (`<View>` with row of `<TouchableOpacity>`s):** "Approve Summary," "Suggest Edits / Add Comments."
    *   Deadline for Review (`<Text>`).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)

*   **Navigation (React Navigation Stack):**
    *   Accessed via notification (`expo-notifications`).
    *   "Approve Summary" may navigate to 8.3 or confirm completion.
    *   "Suggest Edits" opens comment mechanism.

*   **Multimedia Aspects:** Document presentation. Comment indicators (`<Image>` icons). Avatars (`<Image>`). Progress indicators (e.g., custom `<View>` bar).

## 8.3. Screen: Digital Sign-off (Mermaid: BI/BJ)

*   **Mermaid Diagram ID:** BI (Remote sign-off), BJ (Same-device sign-off) - conditional UI within one screen or separate screens in a stack.

*   **Purpose:** (Remains the same)
    *   Dappier could be used here for verifiable digital signatures if required, potentially interacting with native secure elements via Expo modules. Nodely could log these signatures to an immutable ledger.

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<ScrollView>`):**
    *   **Finalized Summary Display (`<View>` with `<Text>`, potentially using `react-native-pdf` if it's a formal PDF view).**
    *   Clear Statement of Agreement (`<Text>`).
    *   **Digital Signature Input Area:**
        *   **Remote (BI):** Checkbox (custom `<TouchableOpacity>`+`<Image>`), `<TextInput` for typed name (Component 10.8). "Submit Signature" (`<TouchableOpacity>`).
        *   **Same-Device (BJ - Component 10.4):** Sequential display of participant name (`<Text>`), then their input fields. "Submit Signature & Next" (`<TouchableOpacity>`).
    *   **Signatory List / Status (`<FlatList>` of `<View>`s with `<Text>`).**
    *   "Download Final Summary" Button (`<TouchableOpacity>`).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same, guiding remote vs. same-device users).

*   **Navigation (React Navigation Stack):**
    *   Initiated after summary approval (8.2).
    *   After signing, navigates to 8.4 (Feedback) or Dashboard.

*   **Multimedia Aspects:** Official document appearance. Signature fields. Visual turn indication for BJ. Alex's Avatar.

## 8.4. Screen: Session Evaluation & Feedback (Mermaid: BL)

*   **Mermaid Diagram ID:** BL (Feedback screen, in Stack Navigator).

*   **Purpose:** (Remains the same)

*   **Key UI Elements (using React Native components, Forms Pattern 10.8):**
    *   **Main Container (`<ScrollView>`):**
    *   Headline (`<Text>`). Anonymity Assurance (`<Text>`).
    *   **Rating Scales:** Using libraries like `react-native-ratings` or custom `<TouchableOpacity>` groups for stars/Likert.
    *   **Open-Ended Questions (`<TextInput multiline={true}>`).**
    *   Optional Feedback Sharing Preference (`<Switch>` with `<Text>` label).
    *   "Submit Feedback" / "Skip" Buttons (`<TouchableOpacity>`).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)

*   **Navigation (React Navigation Stack):**
    *   Appears after 8.3 or session end.
    *   "Submit" or "Skip" navigates to Dashboard or next step (8.5).

*   **Multimedia Aspects:** Rating scale UI. Text areas. Alex's Avatar.

## 8.5. Screen: Schedule Follow-up Check-ins (Mermaid: BM, BN, BP)

*   **Mermaid Diagram ID:** BM (Scheduling interface), BN (Calendar integration), BP (Confirmation/notification) - likely a single screen, with Modals for calendar views.

*   **Purpose:** (Remains the same)

*   **Key UI Elements (View BM - using React Native components, Forms Pattern 10.8):**
    *   **Main Container (`<ScrollView>`):**
    *   Reference to Original Session (`<Text>`). Link to Summary (`<TouchableOpacity>`).
    *   Follow-up Title (`<TextInput>`). Purpose/Agenda (`<TextInput multiline={true}>`).
    *   **Participants to Invite (`<FlatList>` with `<TouchableOpacity>` items to select/deselect, or link to contact picker `expo-contacts`).**
    *   **Proposed Date & Time Options:**
        *   `@react-native-community/datetimepicker` for date/time.
        *   **Calendar Integration (BN):** `<TouchableOpacity>` "Check Availability" might open a `<Modal>` (Component 10.7) displaying calendar data (if `expo-calendar` access is granted and an API via Nodely can aggregate availability).
    *   Duration (Picker or `<TextInput>`). Location/Method (Picker).
    *   "Schedule Follow-up & Send Invitations" Button (`<TouchableOpacity>`).
    *   Nodely would handle backend scheduling and notification dispatch (BP) via Supabase and email/push (expo-notifications).

*   **Voice Agent Interactions (Alex - Component 10.2):** (Scripts remain largely the same)

*   **Navigation (React Navigation Stack):**
    *   Accessed by Host from Dashboard or post-session flow.
    *   Scheduling (BP) navigates to confirmation or dashboard. Participants receive notifications.

*   **Multimedia Aspects:** Calendar views (if custom built, or native picker UI). Avatars (`<Image>`). Icons (`<Image>`). Alex's Avatar.

This concludes Part 8.
