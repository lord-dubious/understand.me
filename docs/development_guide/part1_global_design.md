# Part 1: Global Design & Interaction Principles

This section outlines the global design and interaction principles that underpin the "Understand-me" mobile application. These principles ensure a cohesive, intuitive, and accessible user experience across iOS and Android platforms, leveraging the Expo (React Native) framework.

## 1.1. Introduction to "Understand-me"

"Understand-me" is a real-time transcription, translation, and engagement **mobile application** designed to foster clearer communication and inclusivity in meetings, workshops, and educational settings. Built with **Expo (React Native)**, it captures spoken dialogue, provides instant transcriptions, and offers tools for participants to ask questions, provide feedback, and engage with the content seamlessly.

Our technology stack includes:
*   **Frontend:** Expo (React Native), TypeScript
*   **Backend & Database:** Supabase
*   **AI & Machine Learning:** Google GenAI (for core language understanding and insights), ElevenLabs (for voice synthesis for "Alex")
*   **Specialized Services:**
    *   **PicaOS:** Potentially used for advanced on-device multimedia processing or custom OS-level interactions if required.
    *   **Dappier:** May be leveraged for secure data handling, decentralized identity aspects, or specific API integrations.
    *   **Nodely:** Could be used for complex backend workflows, data orchestration, or connecting various microservices.
*   **Monitoring:** Sentry

"Understand-me" aims to break down communication barriers, ensure everyone feels heard, and create a more productive and equitable environment for collaboration. This guide provides a framework for designing and developing features that align with our core vision and user needs within this mobile-first context.

## 1.2. Target Users & Personas

We have identified three primary user personas for "Understand-me":

*   **Host:** Sarah, a 35-year-old corporate trainer and workshop facilitator.
    *   **Goals:** Deliver engaging and interactive sessions, ensure all participants can follow along (regardless of language or hearing impairments), gather actionable feedback, and easily share meeting summaries.
    *   **Motivations:** Wants to be perceived as an effective and inclusive facilitator. Values tools that are reliable, easy to set up, and don't distract from the session's flow.
    *   **Technical Proficiency:** Tech-savvy, comfortable with various online collaboration tools, but prefers intuitive interfaces that require minimal learning curve.

*   **Participant:** David, a 28-year-old software developer attending a multi-national team meeting. English is his second language.
    *   **Goals:** Fully understand the discussion, contribute his ideas effectively without feeling self-conscious about his accent or language proficiency, and easily refer back to key decisions or points made.
    *   **Motivations:** Wants to be an active and valued team member. Appreciates tools that aid comprehension and allow for discreet participation (e.g., asking a question via text that the host can address).
    *   **Technical Proficiency:** Highly tech-literate, uses various apps daily, but expects a smooth and unobtrusive experience during meetings.

*   **Individual:** Dr. Lena Hanson, a 52-year-old university lecturer who records her lectures for student access and for her own research on discourse analysis.
    *   **Goals:** Obtain accurate transcriptions of her lectures for archival, to provide to students with accessibility needs, and for later analysis. She also values the ability to easily search and annotate these transcripts.
    *   **Motivations:** Dedicated to student success and academic rigor. Needs tools that are accurate, reliable, and save her time in preparing and analyzing educational materials.
    *   **Technical Proficiency:** Comfortable with academic software and productivity tools, but not necessarily an early adopter of new technologies. Values clarity and robust functionality over bells and whistles.

Understanding these personas will help us design features that cater to their specific needs and contexts.

## 1.3. Core Design Philosophy

Our design philosophy is built on four key pillars:

*   **Empathy:** Design with a deep understanding of our users' needs, frustrations, and goals. For "Understand-me," this means recognizing the challenges of diverse communication settings and striving to make every user feel acknowledged and capable. Prioritize their experience in every decision.
*   **Clarity:** Ensure that the interface is intuitive, easy to understand, and predictable. "Understand-me" must present complex information (like real-time transcriptions and translations) in a straightforward manner, reducing cognitive load by providing clear visual cues and concise language.
*   **User Control:** Empower users by giving them control over their data and interactions. "Understand-me" users should easily manage their privacy settings, control recording and transcription options, and customize their interaction preferences. Provide clear options and feedback mechanisms.
*   **Trust:** Build trust by being transparent about data usage, ensuring reliability, and maintaining a high standard of security and privacy. Given the sensitive nature of conversations "Understand-me" handles, establishing and maintaining user trust is paramount.

## 1.4. Voice Agent "Alex": Persona, Tone, Interaction Style

"Alex" is the voice agent integrated into "Understand-me."

*   **Persona:** Alex is envisioned as a helpful, patient, and knowledgeable assistant. Alex is gender-neutral and aims to be universally approachable.
*   **Tone:**
    *   **Supportive and Encouraging:** Alex should use language that makes users feel capable and at ease.
    *   **Clear and Concise:** Avoid jargon and be direct in communication.
    *   **Polite and Respectful:** Maintain a professional yet friendly demeanor.
    *   **Neutral and Unbiased:** Avoid making assumptions or expressing personal opinions.
*   **Interaction Style:**
    *   **Proactive (when appropriate):** Offer help or suggestions when it seems beneficial, but avoid being intrusive.
    *   **Responsive:** Acknowledge user input promptly and provide clear feedback.
    *   **Adaptive:** Adjust its communication style slightly based on user cues (e.g., speed of speech, vocabulary), if technically feasible and appropriate.
    *   **Error Handling:** When errors occur, Alex should explain the issue clearly and offer actionable solutions. For example, if transcription accuracy is low due to background noise, Alex might suggest ways to improve audio quality.
    *   **Within "Understand-me":** Alex primarily assists with setup, answers questions about features, and can be invoked for specific tasks like initiating a recording or enabling translation for a specific language, adapting its interaction for the mobile context.

## 1.5. Global UI Elements

Consistent use of UI elements is crucial for a predictable and learnable mobile interface. We will leverage common patterns from Expo and React Native.

*   **Navigation:**
    *   **Primary Navigation:** Achieved using React Navigation library. Typically a **Bottom Tab Navigator** for main sections (e.g., Dashboard, Sessions, Growth, Settings). Icons with clear labels are essential. For less frequently accessed items, a "More" tab can reveal a list or a **Drawer Navigator** might be used if appropriate for the information architecture.
    *   **Secondary Navigation:** Within a main section, **Stack Navigator** will be used to manage views hierarchically (e.g., navigating from a session list to a specific session's details). Headers for these stacked screens are managed by the Stack Navigator.
    *   **Top Tab Navigator:** Can be used within a screen for organizing content into related views (e.g., within a specific session: Transcription, Participants, Q&A).
    *   **Headers:** Provided by React Navigation's Stack Navigator. Titles should be concise. Contextual action buttons (e.g., "Edit," "Share") can be added to the header. The "Understand-me" logo is generally not in the per-screen header but might be on an initial loading screen or an "About" page.
    *   **No traditional application-wide Footers:** Mobile apps typically do not have persistent footers like websites. Copyright and informational links (Privacy Policy, Terms) will be located in an "About" section accessible via Settings or the "More" tab. Content-specific footers (e.g., pagination, summary bars) are rare and should be used only if they provide significant value without cluttering the limited screen space. Interactions with PicaOS, Dappier, or Nodely for specific data display in footers are unlikely but will be considered if a unique native bridged feature requires it.

*   **Modals (Dialogs):**
    *   **Usage:** For critical alerts, confirmations (e.g., "Delete Session?"), short, focused tasks (e.g., "Invite Participant"), or information that requires immediate user attention. Standard React Native Modal components or libraries extending their functionality will be used. Avoid using modals for complex forms or multi-step processes; navigate to a new screen instead.
    *   **Appearance:** Centered on the screen, with a clear overlay dimming the background content. Must have a clear title, concise message, and explicit action buttons (e.g., "Confirm," "Cancel").
    *   **Interaction:** Dismissible via an "X" icon in the corner and by pressing the Escape key, in addition to explicit action buttons.

*   **Notifications:**
    *   **In-App Notifications (Toasts/Snackbars):** Used for non-critical feedback, such as "Session saved successfully," "Offline mode activated." Appear subtly, usually at the bottom or top of the screen, and auto-dismiss after a short period. Should not interrupt user flow.
    *   **Alerts/Badges:** For indicating new activity or items requiring attention (e.g., a new message in Q&A, a pending participant join request). Displayed as badges on navigation items or specific UI elements.
    *   **Push Notifications (PWA/Mobile):** Used sparingly for important real-time events (e.g., "Session starting soon," "You've been mentioned"). Users must have control over push notification preferences.

*   **Buttons:**
    *   **Primary Actions:** Solid background color (brand's primary color), clear contrasting text. Used for the main call-to-action on a page or in a modal (e.g., "Start Session," "Save Changes").
    *   **Secondary Actions:** Outlined or a lighter shade of the primary color. Used for less critical actions or alternatives to the primary action (e.g., "Cancel," "View Details").
    *   **Tertiary/Text Buttons:** No background, text-only or with a subtle icon. Used for minor actions, links, or options that don't need strong visual prominence (e.g., "Learn More," "Clear Filter").
    *   **Icon Buttons:** Buttons with only an icon, used for common actions with widely understood symbols (e.g., close, edit, delete). Must have a tooltip on hover/focus for accessibility.
    *   **States:**
        *   **Default:** Normal appearance.
        *   **Hover:** Visual indication of interactivity (e.g., slight color change, shadow).
        *   **Focus:** Clear visual outline (accessibility requirement) when navigated via keyboard.
        *   **Active/Pressed:** Visual feedback when the button is clicked/tapped.
        *   **Disabled:** Visually distinct (e.g., faded, non-interactive) with appropriate ARIA attributes. Cursors should be `not-allowed`.

*   **Forms:**
    *   **Layout:**
        *   Labels: Top-aligned for readability and ease of scanning.
        *   Spacing: Adequate spacing between fields and sections to avoid clutter. Group related fields using fieldsets where appropriate.
    *   **Input Fields:**
        *   Standardized height and padding.
        *   Clear visual distinction between text inputs, select dropdowns, text areas.
        *   Consistent styling for checkboxes and radio buttons.
    *   **Validation:**
        *   Real-time inline validation where helpful (e.g., for email format), but primary validation occurs on submit or blur.
        *   Error messages: Displayed clearly below the respective field, in a contrasting color (e.g., red). Error messages should be specific and constructive.
        *   Input fields with errors should have a visual indicator (e.g., red border).
    *   **Required Fields:** Clearly indicated with an asterisk (*) next to the label, and/or the word "(required)".
    *   **Helper Text:** Brief, contextual hints or instructions can be placed below input fields if necessary.

## 1.6. Accessibility Guidelines (WCAG 2.1 AA)

"Understand-me" is committed to being accessible to all users, including those with disabilities. We will adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. Key considerations include:

*   **Perceivable:**
    *   Provide text alternatives (e.g., `accessibilityLabel`) for non-text content like icons and images.
    *   Ensure sufficient color contrast between text/icons and backgrounds (WCAG AA).
    *   Support **Dynamic Type** adjustments (allowing users to change font sizes via OS settings) and ensure layouts reflow correctly.
    *   Content should be usable with screen readers like **VoiceOver (iOS)** and **TalkBack (Android)**.
*   **Operable:**
    *   Ensure all functionality is accessible via touch and screen reader navigation.
    *   Interactive elements must have clear focus indicators and be large enough for easy interaction (**touch targets** at least 44x44 points).
    *   Avoid content that causes seizures (no flashing content faster than 3Hz).
*   **Understandable:**
    *   Use clear and simple language.
    *   Provide consistent navigation patterns (as defined by React Navigation usage).
    *   Offer input assistance (clear labels, error messages) and error prevention.
*   **Robust:**
    *   Utilize Expo and React Native's accessibility APIs correctly.
    *   Test with VoiceOver and TalkBack regularly.
    *   Ensure compatibility with different device sizes and orientations where appropriate.

Regular accessibility audits and user testing, including with users of assistive technologies on mobile devices, will be conducted throughout the development lifecycle.

## 1.7. Expo Mobile App Specifics

As an **Expo (React Native) mobile application**, "Understand-me" has specific considerations to ensure a high-quality, native-like experience on both iOS and Android:

*   **Cross-Platform Consistency & Native Feel:**
    *   Strive for a consistent user experience across iOS and Android, while respecting platform-specific UI conventions where it enhances usability (e.g., date pickers, alert dialogs).
    *   Leverage Expo's capabilities to access native UI components and APIs where beneficial.
*   **Native Feature Access & Performance:**
    *   Utilize Expo libraries (or custom native modules if absolutely necessary and performance-critical) for accessing device features like microphone, camera (for avatar upload, potential future video features), file system (for caching or temporary storage of multimedia), and contacts (for inviting participants).
    *   **PicaOS, Dappier, Nodely Integration:** If these services bridge to native functionalities (e.g., PicaOS for specialized on-device media processing, Dappier for secure hardware-backed key storage, Nodely for background data sync tasks), their integration via Expo's native module system will be critical. Performance implications of such integrations must be carefully assessed.
*   **Offline Strategies:**
    *   **Data Caching:** Implement strategies for caching essential data locally (e.g., user profile, upcoming sessions, drafts of perspectives/conflict descriptions) using AsyncStorage or SQLite via Expo's FileSystem API.
    *   **Offline Indicators:** Clearly communicate when the user is offline (e.g., a global banner or subtle UI change).
    *   **Queueing Actions:** For actions taken offline (e.g., saving a draft, attempting to send a message), queue them and process when connectivity is restored. Provide feedback to the user about queued actions.
    *   **Graceful Degradation:** Some features might be unavailable or limited offline; this should be communicated clearly.
*   **State Management:** Employ a robust state management solution (e.g., Zustand, Redux Toolkit, or React Context with hooks) suitable for a mobile application, managing both UI state and cached data.
*   **Build & Deployment:** Utilize Expo Application Services (EAS) for building and submitting apps to the Apple App Store and Google Play Store. Manage updates and different release channels effectively.
*   **Over-the-Air (OTA) Updates:** Leverage Expo's OTA update mechanism for pushing JavaScript bundle updates quickly to users without requiring a full app store submission, ideal for bug fixes and minor feature rollouts.
*   **Permissions Handling:** Gracefully request and handle necessary permissions (microphone, files, contacts) using Expo's permission APIs, explaining why permissions are needed.

The overall goal of these Expo-specific considerations is to deliver a polished, performant, and reliable mobile application that feels native to each platform while maximizing code reuse.

This document serves as a living guide and will be updated as "Understand-me" evolves.
