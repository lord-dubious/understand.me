# Part 10: Shared Components & UI Patterns

This part of the Development Guide defines and describes reusable UI components and interaction patterns that are applied across multiple features and screens within the "Understand-me" application. Adhering to these definitions is crucial for maintaining UI consistency, predictability, and a cohesive user experience.

## 10.1. Component: Voice Input & Processing

*   **Purpose:**
    *   To allow users to interact with the system and provide input using their voice (e.g., dictating responses, issuing commands to Alex, speaking during sessions for transcription).
    *   To provide clear visual feedback on the status of voice input and processing.

*   **Key UI Elements / States:**
    *   **Microphone Icon Button:**
        *   **Resting/Default State:** Standard microphone icon, indicating voice input is available but not active. Tooltip: "Activate Voice Input."
        *   **Hover State:** Slight visual change (e.g., glow, size increase) to indicate interactivity.
        *   **Active/Listening State:** Icon changes (e.g., pulsating, color change, sound wave animation) to clearly indicate the system is actively listening. Tooltip might change to "Stop Listening" or show a timer.
        *   **Processing State:** Icon changes or a distinct visual indicator (e.g., spinning animation around the mic icon, a subtle loading bar) appears when audio has been captured and is being processed (e.g., for transcription or command recognition). Tooltip: "Processing audio..."
        *   **Disabled State:** Greyed-out microphone icon if voice input is unavailable (e.g., no microphone detected, permission denied, or feature not applicable in current context). Tooltip: "Voice input unavailable."
    *   **Visual Feedback for Transcription (where applicable, e.g., in Input Area E or live session transcript C):**
        *   Real-time (or near real-time) display of transcribed text as the user speaks.
        *   "Thinking" ellipses (...) or a subtle animation if there's a slight delay in transcription.
    *   **Permission Prompts:** Standard browser/OS prompts for microphone access if not already granted. Must be handled gracefully.

*   **Relevant Voice Agent (Alex) Interactions or Cues:**
    *   **Initiation Cue (User clicks mic icon):**
        *   **Alex (Subtle audio cue like a soft chime, if appropriate, or just visual state change):** (No explicit voice output needed unless it's the first time or for training).
    *   **Error Handling:**
        *   **Cue:** No speech detected after activation.
        *   **Alex (Text in AI Panel or tooltip):** "I didn't catch that. Please try speaking clearly, or check your microphone connection."
        *   **Cue:** Microphone permission denied or no microphone found.
        *   **Alex (Text in AI Panel or modal):** "It seems I don't have permission to access your microphone, or no microphone is connected. Please check your browser/system settings to enable microphone access for 'Understand-me'."
        *   **Cue:** Background noise is too high for effective transcription.
        *   **Alex (Text in AI Panel):** "There's a lot of background noise, which might affect transcription quality. Try moving to a quieter place if possible."
    *   **Confirmation of Command (If voice commands are used):**
        *   **User:** "Alex, show me my last session."
        *   **Alex (Voice & Text in AI Panel):** "Okay, showing you your last session." (Accompanied by the action).

*   **Typical Usage Locations:**
    *   Input Area (E) for text-based contributions across various screens (e.g., Screen 2.3, 4.1, 5.4, during session chat).
    *   Live session interface for capturing participant speech for transcription (Main Interaction Area C).
    *   Interacting with Alex via voice commands (if supported globally or in specific contexts).
    *   Same-Device Setup (Screen 6.3) for tap-to-talk training.

## 10.2. Component: AI Voice Output & Avatar (Alex's Presence)

*   **Purpose:**
    *   To provide a consistent and recognizable persona for Alex, the AI voice agent, through visual representation (avatar) and synthesized voice output.
    *   To deliver information, guidance, and feedback from Alex in a clear, understandable, and engaging manner.
    *   To build user trust and rapport with Alex as a helpful assistant.
    *   (Refer to Part 1.4 for Alex's Persona, Tone, and Interaction Style).

*   **Key UI Elements / States:**
    *   **Alex's Avatar:**
        *   **Design:** A friendly, approachable, and gender-neutral design. Should be distinct but not overly distracting. (Specific design details to be in a separate style guide, but principles are: simple, modern, trustworthy).
        *   **Resting State:** A calm, neutral expression.
        *   **Speaking State:** Subtle animation to indicate Alex is currently speaking (e.g., mouth movement, pulsing light, sound wave effect around the avatar). This is crucial for associating the voice output with Alex.
        *   **Listening State (When Alex is expecting a response or processing):** Subtle animation indicating active listening or thinking (e.g., slight head tilt, a subtle "thinking" animation).
        *   **Emotive States (Subtle & Optional):** Very subtle changes in expression to match the tone of the message (e.g., slightly more "upbeat" for congratulations, slightly more "concerned" for errors). These should be used sparingly and carefully to maintain professionalism. (See 10.5 for more on emotional state indicators).
        *   **Placement:** Consistently placed, typically within the AI Panel (7.1.B), but could appear in modals or notifications initiated by Alex.
    *   **Voice Output Controls (User-configurable in Settings):**
        *   **Enable/Disable Alex's Voice:** Allows users to opt for text-only interaction with Alex if preferred.
        *   **Voice Selection (If multiple voice options are available for Alex):** e.g., different accents, though a consistent primary voice is recommended.
        *   **Speech Rate Control:** Allow users to adjust how fast Alex speaks.
        *   **Volume Control:** Independent volume control for Alex's voice.
    *   **Text Display of Alex's Speech:** All verbal output from Alex should also be available as text, typically in the AI Panel or associated UI element (e.g., modal message). This is critical for accessibility and for users who have voice output disabled.

*   **Relevant Voice Agent (Alex) Interactions or Cues:**
    *   **Voice Characteristics:**
        *   **Tone:** As defined in Part 1.4 (Supportive, Clear, Polite, Neutral). Voice synthesis should be high quality to avoid sounding robotic or unpleasant.
        *   **Pacing:** Deliberate and easy to understand, but not overly slow. Should adapt slightly based on context (e.g., slightly more upbeat for positive feedback, calm and clear for instructions).
    *   **Initiating Speech:** A very subtle audio cue (e.g., a soft, unique chime) can precede Alex speaking, especially if Alex is initiating a new interaction or providing an alert. This helps draw attention if the user isn't looking at the avatar.
    *   **Turn-Taking in Conversation:** Alex should use natural pauses to allow users to interject or respond.
    *   **Handling Interruptions:** If Alex is speaking and the user starts speaking or clicks an action, Alex should gracefully stop speaking (or complete the immediate sentence if critical) and yield focus to the user.

*   **Typical Usage Locations:**
    *   **AI Panel (7.1.B):** Primary location for Alex's avatar and text display of speech.
    *   **Onboarding Screens (Part 2):** Guiding users through initial setup (e.g., Screen 2.3, 2.4).
    *   **Dashboard (Part 3):** Providing personalized greetings and insights (Screen 3.1).
    *   **Session Setup (Part 4, 5, 6):** Guiding Hosts and Participants.
    *   **Live Session Interface (Part 7):** Facilitating the five phases.
    *   **Post-Session (Part 8):** Explaining summaries, feedback, follow-ups.
    *   **Growth Module (Part 9):** Acting as a coach.
    *   **Notifications & Alerts (10.6):** Alex might voice important alerts.
    *   **Modals/Dialogs (10.7):** Alex might provide context or instructions in a modal.

## 10.3. Component: Multimedia File Upload & Display

*   **Purpose:**
    *   To provide a consistent mechanism for users to upload various types of multimedia files (documents, images, audio, video) as contextual material.
    *   To display uploaded files in a clear, accessible, and manageable way.
    *   To integrate AI-generated snippets or analysis related to these files where appropriate.

*   **Key UI Elements / States:**
    *   **File Upload Area/Button:**
        *   **Drag-and-Drop Zone:** Clearly indicated area where users can drag files. Visual feedback on hover (e.g., border highlight).
        *   **"Upload Files" / "Choose Files" Button:** Standard file browser initiator.
        *   **Accepted File Types & Size Limits:** Clearly displayed text (e.g., "Supports: PDF, DOCX, JPG, PNG, MP3, MP4. Max size: 25MB").
    *   **File Upload Progress:**
        *   For each file being uploaded: Filename, progress bar, percentage, and option to "Cancel" upload.
        *   Overall progress if multiple files are uploaded simultaneously.
    *   **Uploaded File Display (List or Grid View):**
        *   **File Icon:** Based on MIME type (e.g., PDF icon, image icon, video icon).
        *   **Filename:** Clearly displayed, potentially editable by the uploader before final submission.
        *   **File Size.**
        *   **Timestamp** of upload.
        *   **"Remove" / "Delete" Icon:** To remove an uploaded file before submitting the overall form/context.
        *   **Preview Option:** If available for the file type (e.g., "Preview" button for images/PDFs that opens in a modal - see 10.7).
    *   **Multimedia Context Panel (7.1.D - for in-session display):**
        *   Displays files relevant to the current discussion.
        *   Allows inline viewing of PDFs/images, playback of audio/video.
        *   Navigation for multi-page documents.
    *   **AI Analysis Snippets Display (Integrated with file display where relevant):**
        *   **Context:** When AI has analyzed an uploaded file (e.g., in Screen 4.2 - AI Problem Analysis Review, or Screen 6.1 - AI Synthesizes All Inputs).
        *   **UI:**
            *   A small "AI Insights" badge or icon next to the file.
            *   Clicking this reveals a snippet of relevant text extracted by AI, or a summary of the file's key points related to the discussion. E.g., "AI found 3 key financial figures on p.2 of 'Budget.pdf'."
            *   Highlighted sections (if viewing a document preview) that AI identified as important.
            *   These snippets link back to the full file for context.

*   **Relevant Voice Agent (Alex) Interactions or Cues:**
    *   **During Upload:**
        *   **Alex (If user uploads many files or large files):** "Uploading your files... This might take a moment for larger files."
        *   **Alex (On successful upload):** "'[Filename]' has been uploaded successfully."
        *   **Alex (On upload error, e.g., file type not supported, size limit exceeded):** "Sorry, '[Filename]' couldn't be uploaded. It might be too large or not a supported file type. Please check the requirements and try again."
    *   **Referring to Uploaded Files & AI Snippets:**
        *   **Alex (e.g., in AI Problem Analysis Review - Screen 4.2):** "I've analyzed the document '[Filename.pdf]' you uploaded. It seems to highlight [AI-extracted key point]. You can see more details under the 'AI Insights' for this file."
        *   **Alex (e.g., during a session - Phase 3 Understand):** "That point about [Topic] is also mentioned in the '[Document Name]' file shared by [User Name]. I can highlight the relevant section in the Multimedia Context Panel if you'd like."

*   **Typical Usage Locations:**
    *   Screen 4.1: Host Describe Conflict (uploading context).
    *   Screen 5.4: Participant Provide Your Perspective (uploading context).
    *   Screen 4.2 / 6.1: Displaying files with AI analysis snippets.
    *   Multimedia Context Panel (7.1.D): In-session display and interaction with shared files.
    *   Input Area (7.1.E): Option to attach files to messages (if session rules allow).
    *   Post-Session Summary (8.1): Linking to referenced files.

## 10.4. Pattern: Same-Device User Identification & Turn Management

*   **Purpose:**
    *   To allow multiple participants to use a single device (e.g., tablet, laptop) to join and participate in an "Understand-me" session.
    *   To accurately identify who is speaking at any given time for correct speaker attribution in transcripts and AI analysis.
    *   To provide a clear and fair mechanism for managing speaking turns among users sharing the device.
    *   (Detailed setup flow described in Screen 6.3).

*   **Key UI Elements / States:**
    *   **Initial Setup (Screen 6.3 - AN, AO):**
        *   Input fields for names of all users on the device.
        *   Assignment of a unique color or simple avatar to each user for the session.
        *   Brief mini-assessment for users new to the system on that device.
    *   **In-Session Interface (integrates with Common Element 7.1.F):**
        *   **Speaker Queue/Order Display (Optional):** If a specific speaking order is set, it's displayed (e.g., "Up Next: [P2 Name], then [P3 Name]").
        *   **"Tap-to-Talk" Button Area:**
            *   A dedicated button for each identified participant on the device, labeled with their name and/or assigned color/avatar.
            *   **Default State:** All buttons are visible, indicating readiness.
            *   **Active Speaker State:** When a user taps their button, it becomes visually highlighted (e.g., brighter, larger, border changes) indicating "Now Speaking: [User Name]". All other users' buttons are dimmed or show "Waiting."
            *   **Visual Feedback:** The button itself might animate or change icon while the user is "live."
        *   **"Pass the Mic" / "Done Speaking" Button:**
            *   Appears for the active speaker. Allows them to explicitly signal they have finished their turn.
            *   Tapping this deactivates their "Tap-to-Talk" button and might visually prompt the next person in a queue, or simply free up the system for another user to tap in.
        *   **Active Speaker Name Display:** Prominently displayed in the main transcript area (7.1.C) and potentially in the AI Panel (7.1.B).

*   **Relevant Voice Agent (Alex) Interactions or Cues:**
    *   **During Setup (Screen 6.3):**
        *   Alex guides each user through naming themselves and the mini-assessment (if needed).
        *   Alex explains and facilitates the "Tap-to-Talk" practice.
    *   **During Session - Turn Management:**
        *   **Alex (Starting a turn):** "Okay, [User Name on Device A], it's your turn now. Please tap your button to speak."
        *   **Alex (If someone speaks without tapping):** "I hear someone speaking, but please remember to tap your name on the device so I can correctly note who's talking."
        *   **Alex (If multiple people try to tap at once or if there's confusion):** "One moment. Let's have [User Name on Device A] go first, then [User Name on Device B]." (Relies on Host or pre-set order if available, or just picks one).
        *   **Alex (Encouraging passing the turn):** "[Active Speaker Name], when you're finished with your point, please remember to tap 'Done Speaking' or indicate you're passing the device, so the next person can share."
    *   **Attribution in Summaries/Feedback:**
        *   Alex's summaries (e.g., in Phase 3 - Understand) will refer to "[User Name on Device A]'s point was..." ensuring their identity is maintained despite sharing hardware.

*   **Typical Usage Locations:**
    *   Screen 6.3: The entire setup flow for this pattern.
    *   Throughout all phases of an AI-mediated session (Part 7) when users are participating via a shared device.
    *   Digital Sign-off (Screen 8.3 - BJ) for sequential signing on the same device.

## 10.5. Pattern: Emotional State Indicators (Subtle & Optional)

*   **Purpose:**
    *   To subtly reflect the AI's interpretation of the emotional tone of the current speaker or the overall session atmosphere, if enabled and deemed appropriate for the session type.
    *   To provide a gentle, non-judgmental cue that might help participants become more aware of their own emotional expression or the impact of their words.
    *   To assist Alex or a human host in identifying moments where intervention might be needed to de-escalate or clarify feelings.
    *   **Crucially, this feature must be optional, subtle, and designed with extreme sensitivity to avoid misinterpretation, causing distress, or feeling like a judgment.** User control and understanding are paramount.

*   **Key UI Elements / States:**
    *   **Location:** Could be a small, ambient indicator within the AI Panel (7.1.B), near the active speaker's name/avatar (7.1.C/F), or as a dynamic element of Alex's avatar (10.2).
    *   **Visual Representation (Subtle):**
        *   **Color Shifting Ambient Orb/Glow:** A small, softly glowing orb that subtly shifts color based on detected sentiment (e.g., calm blue/green for neutral/positive, soft amber for rising intensity/frustration, gentle purple for empathy/understanding). *Avoid harsh reds or alarming colors.*
        *   **Dynamic Lines/Particles:** Abstract animated lines or particles that change speed, density, or color subtly.
        *   **Alex's Avatar Expression (Very Subtle):** As mentioned in 10.2, Alex's avatar might show very subtle shifts in expression (e.g., a slightly more furrowed brow for concern, a gentle smile for positive moments). This must be extremely nuanced.
    *   **Intensity Levels:** The indicator could have different levels of intensity (e.g., slight shift for mild emotion, more noticeable but still gentle shift for stronger emotion).
    *   **Tooltip/Explanation (On hover or click):**
        *   "AI senses a [e.g., 'slightly intense,' 'frustrated,' 'positive,' 'reflective'] tone in the current contributions."
        *   "This is an AI interpretation based on language and tone. It's a tool for awareness."
    *   **User Settings (Critical):**
        *   **Global Opt-Out:** Users can disable emotional state indicators entirely for their experience.
        *   **Host Control:** Hosts can enable/disable this feature for a whole session (default might be OFF for many session types).
        *   **Feedback Mechanism:** Users can provide feedback if they feel the indicator is inaccurate ("This isn't right").

*   **Relevant Voice Agent (Alex) Interactions or Cues:**
    *   **Alex generally AVOIDS directly verbalizing the emotional state based *solely* on this indicator unless it's part of a structured intervention strategy defined by the session type or host.** The indicator is primarily for visual awareness.
    *   **Indirect Cues (If intervention is needed and Host has enabled Alex to act on it):**
        *   **Cue:** Indicator shows rising frustration for a sustained period.
        *   **Alex:** "Let's take a brief pause here. [Speaker Name], I sense this is a very important point for you. Could you perhaps elaborate on the core concern behind that feeling?" (Focuses on content, not just emotion).
        *   **Alex:** "I'm noticing the energy in the conversation has shifted. It might be a good moment to remember our session rule about [e.g., 'active listening / seeking to understand']. Shall we take a moment to reflect on that?"
    *   **Highlighting Positive Shifts:**
        *   **Alex:** "It sounds like we're reaching a more positive understanding on this point. I'm sensing a shift towards agreement." (If indicator moves to positive).
    *   **Explaining the Feature (If user asks or during onboarding to the feature):**
        *   **Alex:** "This little [orb/indicator] you see is designed to subtly reflect the emotional tone the AI understands from the conversation. It's not a judgment, just a gentle cue for awareness. You can turn it off in your settings if you prefer."

*   **Typical Usage Locations:**
    *   AI Panel (7.1.B).
    *   Near speaker identification in the Main Interaction Area / Transcript (7.1.C).
    *   As part of Alex's avatar display (10.2).
    *   Primarily during active session phases (Part 7), especially Express, Understand, and Resolve.
    *   Emotional Regulation Insights (Screen 9.1 CG) might show aggregated data based on these indicators from past sessions (for personal reflection only).

*   **Important Considerations:**
    *   **Accuracy:** AI emotion detection is not perfect. The system must be humble about this.
    *   **Cultural Sensitivity:** Emotional expression varies greatly.
    *   **Privacy:** Users must be fully informed and in control.
    *   **Potential for Misuse:** Must be designed to prevent judgment or manipulation.
    *   **Default State:** Likely OFF for many users/session types, requiring explicit opt-in or host enablement.

## 10.6. Component: Notification/Alert System

*   **Purpose:**
    *   To inform users about important system events, session updates, required actions, or messages from other users or Alex.
    *   To provide timely and relevant information without being overly intrusive.
    *   To allow users to manage their notification preferences.

*   **Key UI Elements / States:**
    *   **Notification Types:**
        *   **Toast/Snackbar Notifications:**
            *   **Appearance:** Small, non-modal messages that typically appear briefly at the bottom or top of the screen and then auto-dismiss. Used for transient, less critical information (e.g., "Session summary saved," "Perspective submitted," "Alex: Participants have been invited.").
            *   **Content:** Short text message, an optional icon, and a "Dismiss" (X) button.
            *   **States:** Appearing, visible, dismissing.
        *   **In-App Alerts/Badges (within the application UI):**
            *   **Appearance:** Red dot/numerical badge on a navigation item (e.g., main menu, bell icon, specific session in a list) indicating new activity or information available.
            *   **Content:** The badge itself is the indicator; clicking the item reveals the new information (e.g., new message, pending task).
        *   **Modal Alerts (see 10.7 - Modal/Dialog):** Used for critical information that requires immediate user attention and possibly action (e.g., "Session starting in 5 minutes - Join Now?", "Error: Could not save changes.").
        *   **Email Notifications:** For out-of-app notifications (e.g., session invitations, summary available for review, follow-up reminders). (Content and branding of emails should be consistent).
        *   **Push Notifications (PWA/Mobile - if applicable):** Opt-in notifications that can appear even when the app is not actively open (e.g., "Your session is about to start," "[User] sent you a message").
    *   **Notification Center/List (Optional but Recommended):**
        *   **Appearance:** Accessed via a bell icon or "Notifications" link in the main header. Displays a chronological list of recent, persistent notifications.
        *   **Content:** Each item shows the message, timestamp, and a link to the relevant content if applicable. "Mark as Read/Unread" options. "Clear All" option.
    *   **Notification Settings (User Profile):**
        *   Granular controls for enabling/disabling different types of notifications (e.g., by email, in-app, push).
        *   Preferences for which events trigger notifications (e.g., "Notify me when a participant accepts an invitation," "Notify me when a summary is ready for review").

*   **Relevant Voice Agent (Alex) Interactions or Cues:**
    *   **Voicing Critical Alerts:**
        *   **Alex (If user is active in the app and a critical modal alert appears):** "Attention: [Reads the critical alert message, e.g., 'Your session is starting now.']."
    *   **Summarizing New Notifications (Optional, upon login or returning to app):**
        *   **Alex:** "Welcome back, [User Name]. While you were away, you received [Number] new notifications. You can view them in the Notification Center."
    *   **Alerting to Missed In-Session Cues (If user seems unresponsive to an important Alex prompt during a session):**
        *   **Alex (After a visual prompt, if no response):** "Just a reminder, [User Name], it's your turn to speak." (Accompanied by a subtle toast or highlight).

*   **Typical Usage Locations:**
    *   **Toasts/Snackbars:** Used across the application for quick, non-critical feedback (e.g., after saving a form, sending an invitation, successful file upload).
    *   **In-App Alerts/Badges:** On navigation menus, session lists, message icons.
    *   **Modal Alerts:** For session start reminders, critical errors, important confirmations.
    *   **Email/Push Notifications:** For keeping users informed when they are not actively using the application.
    *   **Notification Center:** Accessible from the main application header.

## 10.7. Component: Modal/Dialog

*   **Purpose:**
    *   To display focused information, require critical user decisions, or guide users through short, self-contained tasks without navigating away from the current page.
    *   To prevent background interaction until the modal task is completed or dismissed.
    *   (Refer to Part 1.5 - Global UI Elements - Modals for initial definition).

*   **Key UI Elements / States:**
    *   **Overlay:** A semi-transparent layer covering the background page content, indicating that the page is temporarily inactive.
    *   **Modal Container:**
        *   **Appearance:** Clearly defined border, background color distinct from the overlay. Centered on the screen by default. Sizing should be appropriate for the content (not too large, not too small).
        *   **Header:**
            *   Clear, concise Title.
            *   "Close" button (X icon) in the top-right corner.
        *   **Content Area:** Displays the modal's message, form, or information. Content should be succinct. For complex interactions, consider a new page instead of a very large modal.
        *   **Footer / Action Area:**
            *   Contains action buttons (e.g., "Save," "Cancel," "Confirm," "OK," "Delete").
            *   Primary action button should be visually distinct.
            *   Button alignment (e.g., right-aligned, center-aligned) should be consistent.
    *   **States:**
        *   **Opening/Closing Animation:** Subtle animation (e.g., fade-in, slide-down) for smooth transitions.
        *   **Focus Management:** Keyboard focus should be trapped within the modal. When opened, focus should go to the first interactive element (or the modal container itself). When closed, focus should return to the element that triggered the modal.
    *   **Types of Modals:**
        *   **Confirmation Dialog:** Asks user to confirm an action (e.g., "Are you sure you want to delete this session?"). Buttons: "Delete," "Cancel."
        *   **Alert Dialog (Critical):** Informs user of a critical issue or important information that needs acknowledgment. Button: "OK" or "Dismiss." (Often used with Notification System 10.6).
        *   **Form Modal:** Contains a short form for a specific task (e.g., "Invite Participant," "Create New Tag"). Buttons: "Submit," "Cancel."
        *   **Information Modal:** Displays information without requiring direct action beyond closing it (e.g., "Preview File," "Detailed View of an Item"). Button: "Close" or "OK."

*   **Relevant Voice Agent (Alex) Interactions or Cues:**
    *   **Contextual Explanation (If Alex initiates the modal or its content is complex):**
        *   **Alex (Voice or text at the top of the modal content):** "Before we proceed, please confirm [explains the action and its consequences, e.g., 'that you want to permanently delete this recording. This cannot be undone.']."
        *   **Alex:** "I need a bit more information for this next step. Could you please [explains what's needed in the form modal]?"
    *   **Guiding through Modal Forms:**
        *   **Alex (If a form modal has multiple fields):** "First, enter the [Field 1 Name], then [Field 2 Name]." (More likely for complex or onboarding modals).
    *   **Responding to Modal Actions (Less common for Alex to speak, usually just UI change):**
        *   If a user confirms a critical action via a modal, Alex might provide a toast notification (10.6) confirming the success or failure, rather than speaking directly from the closed modal.

*   **Typical Usage Locations:**
    *   **Confirmation Dialogs:** Deleting items (sessions, files, participants), unsaved changes warnings, starting a session that might affect others.
    *   **Alert Dialogs:** Session start reminders, critical system errors, permission issues.
    *   **Form Modals:** Quick-add forms (e.g., adding a participant from Screen 4.4, creating a quick event), simple settings configurations.
    *   **Information Modals:** File previews (Screen 10.3), help information, detailed views of list items without navigating away.
    *   Used across virtually all parts of the application where focused attention or confirmation is needed.

*   **Accessibility Considerations:**
    *   Proper ARIA attributes (e.g., `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`).
    *   Keyboard navigability (focusable elements, close on Escape key).
    *   Focus trapping and return.

## 10.8. Pattern: Form Elements & Validation

*   **Purpose:**
    *   To ensure consistency and usability for all forms within the application.
    *   To provide clear guidance to users when filling out forms.
    *   To implement a standardized approach to input validation and error feedback.
    *   (Refer to Part 1.5 - Global UI Elements - Forms for initial definition).

*   **Key UI Elements / States:**
    *   **Standard Form Controls:**
        *   **Text Inputs (Single & Multi-line/Textarea):**
            *   Clear label (top-aligned or floating label).
            *   Placeholder text (optional, as a hint, not a replacement for label).
            *   States: Default, Hover, Focus (e.g., border color change), Disabled, Error.
        *   **Dropdowns/Selects:**
            *   Label, dropdown arrow, list of options.
            *   States: Default, Hover, Focus, Open, Disabled, Error.
        *   **Checkboxes & Radio Buttons:**
            *   Label associated with each control.
            *   Clear visual distinction between selected and unselected states.
            *   Grouped logically (e.g., radio buttons within a fieldset).
            *   States: Default, Hover, Focus, Checked, Disabled, Error.
        *   **Date/Time Pickers:** Consistent style, intuitive date/time selection.
        *   **File Input (see 10.3 for more details on upload UI):** Button to trigger file selection.
    *   **Labels & Helper Text:**
        *   **Labels:** Always visible, clearly associated with their respective input field (e.g., using `for` attribute). Top-aligned is generally preferred for scannability.
        *   **Required Field Indicators:** Asterisk (*) next to the label for mandatory fields.
        *   **Helper Text/Instructions:** Brief, contextual guidance below an input field if needed (e.g., "Password must be at least 8 characters long.").
    *   **Validation Feedback:**
        *   **Inline Validation (Real-time or On Blur):**
            *   Positive feedback (optional): Subtle checkmark or green border for correctly filled fields.
            *   Negative feedback: Error message displayed clearly below the relevant field upon invalid input. Field border changes to red.
        *   **On Submit Validation:** All required fields are checked. A summary of errors might appear at the top of the form if it's long, in addition to inline error messages.
        *   **Error Messages:**
            *   Clear, concise, and constructive (e.g., "Please enter a valid email address," not just "Invalid input.").
            *   Visually distinct (e.g., red text).
    *   **Buttons within Forms:**
        *   Primary action button (e.g., "Submit," "Save," "Create") should be clearly dominant.
        *   Secondary action button (e.g., "Cancel," "Reset") should be less prominent.
        *   Disabled state for submit button until all required fields are validly filled (optional, but can be good UX).

*   **Relevant Voice Agent (Alex) Interactions or Cues:**
    *   **Guidance on Complex Forms (Less common, but possible for multi-step or unusual forms):**
        *   **Alex:** "This form helps us set up [Feature X]. First, please provide [Field 1 Description], then [Field 2 Description]."
    *   **Explaining Validation Errors (If user struggles or asks for help):**
        *   **User:** "Alex, why can't I submit this form?"
        *   **Alex:** "It looks like there are a couple of things that need attention. The 'Email' field says '[Reads specific error message, e.g., 'Please enter a valid email address']', and the 'Password' field needs to be at least 8 characters long. Let me know if you'd like more details on any of these."
    *   **Confirmation of Successful Submission (Often via Toast Notification 10.6 rather than direct voice):**
        *   **Alex (Toast message):** "Your information has been saved successfully!"
    *   **Clarifying Field Purpose (On user request):**
        *   **User:** "Alex, what does 'Session Title' mean here?"
        *   **Alex:** "The 'Session Title' is just a short name you give to this session so you can easily find it later. For example, 'Project Alpha Weekly Check-in' or 'Budget Discussion Q3'."

*   **Typical Usage Locations:**
    *   Sign-Up/Login forms (Screen 2.2).
    *   Onboarding forms (e.g., Conversational Personality Assessment if it includes form-like inputs - Screen 2.3).
    *   Session creation and configuration (Part 4, e.g., Screen 4.1, 4.3, 4.4).
    *   Participant perspective input (Screen 5.4).
    *   Privacy settings configuration (Screen 5.5).
    *   User profile settings.
    *   Session evaluation/feedback forms (Screen 8.4).
    *   Scheduling forms (Screen 8.5).
    *   Anywhere structured data input is required.

This concludes Part 10.
