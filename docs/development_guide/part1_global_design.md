

# **Part 1: Global Design & Interaction Principles**

This section outlines the global design and interaction principles that underpin the "Understand-me" mobile application. These principles ensure a cohesive, intuitive, and accessible user experience across iOS and Android platforms, leveraging the Expo (React Native) framework.

## **1.1. Introduction to "Understand-me"**

"Understand-me" is a **voice-first, AI-mediated conflict resolution mobile application** designed to help individuals and groups navigate disagreements with empathy and structure. Built with **Expo (React Native)**, it facilitates guided conversations, manages turn-taking, and uses emotional analysis to foster genuine understanding and collaborative problem-solving.

Our unified technology stack includes:
*   **Frontend:** Expo (React Native) with TypeScript, Zustand state management
*   **AI Orchestration:** Vercel AI SDK (`ai`) + Google Gemini chat via `@ai-sdk/google`
*   **Retrieval (RAG):** Voyage AI embeddings via `@ai-sdk/voyage` + cosine-similarity lookup
*   **Voice Agent:** "Udine" – powered by ElevenLabs turn-taking conversations
*   **Emotional Intelligence:** Hume AI real-time emotion analysis
*   **Optional LangChain Utilities:** `@ai-sdk/langchain` adapter where ai-SDK parity is missing
*   **Deployment:** Expo EAS (mobile) & Vercel Edge Functions (for serverless AI logic)

"Understand-me" aims to break down the emotional barriers in conflict, ensure everyone feels heard, and create a safe environment for finding a path forward, together.

## **1.2. Target Users & Personas**

We have identified three primary user personas for "Understand-me":

*   **The Host:** Alex, a 30-year-old who feels like the "peacemaker" in their family and friend group.
    *   **Goals:** Find a structured and fair way to address a conflict with a loved one, have their perspective heard and understood, and facilitate a resolution that repairs or improves the relationship.
    *   **Motivations:** Frustration with an unresolved conflict, desire for a private and less confrontational way to initiate a difficult conversation, and a belief that a neutral third party can help.
    *   **Technical Proficiency:** Tech-savvy, comfortable with mobile apps, and looking for an intuitive tool to help with a deeply human problem.

*   **The Participant:** Maria, a 28-year-old who has been invited by her partner, Alex, to a session.
    *   **Goals:** Understand the issue from her partner's perspective, have her own viewpoint heard and validated, and contribute to a fair and mutually agreeable resolution.
    *   **Motivations:** Receives an invitation and is willing to engage constructively to resolve the conflict. Hopes for a positive outcome and a way to improve communication.
    *   **Technical Proficiency:** Uses apps daily but expects a smooth, secure, and non-intimidating experience, especially for a sensitive topic.

*   **The Individual:** Sam, a 42-year-old manager seeking to improve their conflict resolution skills.
    *   **Goals:** Use the app in a solo "coaching" mode to work through professional disagreements, practice articulating their points empathetically, and gain insights into their own communication patterns.
    *   **Motivations:** Wants to become a better leader and communicator. Values tools that provide actionable feedback and personal growth opportunities.
    *   **Technical Proficiency:** Comfortable with productivity and professional development tools. Values efficiency and clear, data-driven insights.

Understanding these personas will help us design features that cater to their specific emotional and functional needs.

## **1.3. Core Design Philosophy**

Our design philosophy is built on four key pillars:

*   **Empathy:** Design with a deep understanding of our users' vulnerability and emotional state during conflict. Prioritize creating a safe, non-judgmental, and supportive environment in every interaction.
*   **Clarity:** Ensure the interface is intuitive and the process is predictable. "Understand-me" must guide users through a potentially stressful conversation with simple visual cues, clear instructions, and a calm aesthetic, reducing cognitive load.
*   **User Control:** Empower users by giving them full agency over their journey. Users must feel in control of the conversation, their data, and the final agreements. The AI is a facilitator, not a decider.
*   **Trust:** Build trust through absolute transparency about the AI's role, robust security, and a steadfast commitment to privacy. Given the deeply sensitive nature of the conversations "Understand-me" handles, trust is our most critical asset.

## **1.4. Voice Agent "Udine": AI-Mediated Conflict Resolution Specialist**

"Udine" is the primary AI voice agent that facilitates conflict resolution through structured, empathetic mediation using ElevenLabs turn-taking conversation technology.

*   **Persona:** Udine is a warm, empathetic, and professionally trained conflict resolution specialist. She embodies emotional intelligence, patience, and deep understanding of human dynamics. Udine is designed to feel like a trusted mediator who genuinely cares about helping people understand each other.

*   **Core Competencies:**
    *   **5-Phase Mediation Expertise:** Udine guides users through Prepare, Express, Understand, Resolve, and Heal phases.
    *   **Emotional Intelligence:** Real-time emotional analysis and adaptive responses using Hume AI integration.
    *   **Turn-Taking Management:** Natural conversation flow with automatic speaker detection and fair participation.
    *   **Conflict Analysis:** Deep understanding of underlying needs, interests, and relationship dynamics.

*   **Communication Style:**
    *   **Warm and Supportive:** Uses empathetic language that validates emotions while maintaining professional boundaries.
    *   **Culturally Sensitive:** Adapts communication style to respect diverse backgrounds and perspectives.
    *   **Phase-Appropriate:** Adjusts tone and approach based on the current mediation phase (more structured in Prepare, more empathetic in Heal).
    *   **Emotionally Intelligent:** Responds to detected emotions with appropriate validation and guidance.

*   **Interaction Patterns:**
    *   **Turn-Taking Facilitation:** Manages conversation flow, ensures equal participation, and prevents interruptions.
    *   **Emotional Regulation:** Helps de-escalate tension and guides participants toward constructive dialogue.
    *   **Clarification Seeking:** Asks probing questions to uncover underlying needs and interests.
    *   **Solution Facilitation:** Guides brainstorming and helps evaluate potential resolutions.
    *   **Relationship Focus:** Emphasizes healing and future-oriented positive interactions.

*   **Technical Integration:**
    *   **ElevenLabs Turn-Taking:** Natural conversation flow with real-time voice processing.
    *   **Vercel AI SDK Orchestration:** Sophisticated workflow management across mediation phases.
    *   **Hume AI Emotions:** Real-time emotional analysis informing response adaptation.
    *   **Memory Persistence:** Maintains context and relationship history across sessions via Supabase.

## **1.5. Global UI Elements**

Consistent use of UI elements is crucial for a predictable and learnable mobile interface. We will leverage common patterns from Expo and React Native.

*   **Navigation:**
    *   **Primary Navigation:** Achieved using React Navigation library. Typically a **Bottom Tab Navigator** for main sections (e.g., Dashboard, Sessions, Growth, Settings). Icons with clear labels are essential. For less frequently accessed items, a "More" tab can reveal a list or a **Drawer Navigator** might be used if appropriate for the information architecture.
    *   **Secondary Navigation:** Within a main section, **Stack Navigator** will be used to manage views hierarchically (e.g., navigating from a session list to a specific session's details). Headers for these stacked screens are managed by the Stack Navigator.
    *   **Top Tab Navigator:** Can be used within a screen for organizing content into related views (e.g., within a specific session: Transcription, Participants, Q&A).
    *   **Headers:** Provided by React Navigation's Stack Navigator. Titles should be concise. Contextual action buttons (e.g., "Edit," "Share") can be added to the header. The "Understand-me" logo is generally not in the per-screen header but might be on an initial loading screen or an "About" page.
    *   **No traditional application-wide Footers:** Mobile apps typically do not have persistent footers like websites. Copyright and informational links (Privacy Policy, Terms) will be located in an "About" section accessible via Settings or the "More" tab.

*   **Modals (Dialogs):**
    *   **Usage:** For critical alerts, confirmations (e.g., "Delete Session?"), short, focused tasks (e.g., "Invite Participant"), or information that requires immediate user attention. Standard React Native Modal components will be used. Avoid using modals for complex forms or multi-step processes; navigate to a new screen instead.
    *   **Appearance:** Centered on the screen, with a clear overlay dimming the background content. Must have a clear title, concise message, and explicit action buttons (e.g., "Confirm," "Cancel").
    *   **Interaction:** Dismissible via an "X" icon in the corner, in addition to explicit action buttons.

*   **Notifications:**
    *   **In-App Notifications (Toasts/Snackbars):** Used for non-critical feedback, such as "Session saved successfully," "Offline mode activated." Appear subtly, usually at the bottom or top of the screen, and auto-dismiss after a short period. Should not interrupt user flow.
    *   **Alerts/Badges:** For indicating new activity or items requiring attention (e.g., a new message, a pending participant join request). Displayed as badges on navigation items or specific UI elements.
    *   **Push Notifications:** Used sparingly for important real-time events (e.g., "Session starting soon," "You've been mentioned"). Users must have control over push notification preferences.

*   **Buttons:**
    *   **Primary Actions:** Solid background color (brand's primary color), clear contrasting text. Used for the main call-to-action on a page or in a modal (e.g., "Start Session," "Save Changes").
    *   **Secondary Actions:** Outlined or a lighter shade of the primary color. Used for less critical actions or alternatives to the primary action (e.g., "Cancel," "View Details").
    *   **Tertiary/Text Buttons:** No background, text-only or with a subtle icon. Used for minor actions or links (e.g., "Learn More," "Clear Filter").
    *   **Icon Buttons:** Buttons with only an icon, used for common actions with widely understood symbols (e.g., close, edit, delete). Must have an accessibility label.
    *   **States:**
        *   **Default:** Normal appearance.
        *   **Active/Pressed:** Visual feedback when the button is clicked/tapped.
        *   **Disabled:** Visually distinct (e.g., faded, non-interactive) and non-functional.

*   **Forms:**
    *   **Layout:**
        *   Labels: Top-aligned for readability and ease of scanning.
        *   Spacing: Adequate spacing between fields and sections to avoid clutter.
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

## **1.6. Accessibility Guidelines (WCAG 2.1 AA)**

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

## **1.7. Expo Mobile App Specifics**

As an **Expo (React Native) mobile application**, "Understand-me" has specific considerations to ensure a high-quality, native-like experience on both iOS and Android:

*   **Cross-Platform Consistency & Native Feel:**
    *   Strive for a consistent user experience across iOS and Android, while respecting platform-specific UI conventions where it enhances usability (e.g., date pickers, alert dialogs).
    *   Leverage Expo's capabilities to access native UI components and APIs where beneficial.
*   **Native Feature Access & Performance:**
    *   Utilize Expo libraries for accessing device features like the microphone, camera (for avatar upload), file system (for caching), and contacts (for inviting participants).
    *   Performance implications of real-time AI integrations must be carefully assessed to prevent UI lag or excessive battery drain.
*   **Offline Strategies:**
    *   **Data Caching:** Implement strategies for caching essential data locally (e.g., user profile, upcoming sessions, drafts of perspectives) using AsyncStorage or a local database like SQLite.
    *   **Offline Indicators:** Clearly communicate when the user is offline (e.g., a global banner or subtle UI change).
    *   **Queueing Actions:** For actions taken offline (e.g., saving a draft), queue them and process when connectivity is restored. Provide feedback to the user about queued actions.
    *   **Graceful Degradation:** Some features, particularly real-time AI mediation, will be unavailable offline; this should be communicated clearly.
*   **State Management:** Employ a robust state management solution (e.g., Zustand, Redux Toolkit) suitable for a mobile application, managing both UI state and cached data.
*   **Build & Deployment:** Utilize Expo Application Services (EAS) for building and submitting apps to the Apple App Store and Google Play Store. Manage updates and different release channels effectively.
*   **Over-the-Air (OTA) Updates:** Leverage Expo's OTA update mechanism for pushing JavaScript bundle updates quickly to users without requiring a full app store submission, ideal for bug fixes and minor feature rollouts.
*   **Permissions Handling:** Gracefully request and handle necessary permissions (microphone, files, contacts) using Expo's permission APIs, explaining why permissions are needed before the OS prompt appears.

The overall goal of these Expo-specific considerations is to deliver a polished, performant, and reliable mobile application that feels native to each platform while maximizing code reuse.

This document serves as a living guide and will be updated as "Understand-me" evolves.
