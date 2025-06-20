# Understand.me - Product Requirements Document (PRD)

## 1. Introduction

### 1.1. Purpose
This Product Requirements Document (PRD) defines the functional requirements for the "Understand.me" mobile application. It serves as a foundational guide for the development team, product managers, and QA testers to ensure the delivered product aligns with the intended features and user needs. This document focuses on *what* the system should do. The *how* (technical implementation) is detailed in the Developer's Guide and Technical Product Knowledge Base.

### 1.2. Product Overview
"Understand.me" is an AI-mediated mobile application designed to enhance communication, facilitate understanding, and guide users through structured conversational processes. Its core is "Alex," an AI voice agent that acts as a facilitator, analyst, coach, and mediator. The application supports various interaction types, from personal reflection and skill development to complex, multi-participant mediated sessions. It aims to create clearer, more empathetic, and productive interactions by leveraging advanced AI for transcription, translation, analysis, and guidance. The platform is built using a serverless-first architecture with Expo (React Native) for the mobile frontend, and a backend stack including Supabase, PicaOS (AI orchestration), Google GenAI, ElevenLabs, Upstash Redis, and potentially Dappier and Nodely for specialized data handling and workflows.

### 1.3. Scope
This PRD covers the **functional requirements** of the "Understand.me" mobile application. This includes:
*   User authentication and management.
*   Core capabilities of the AI agent "Alex."
*   Onboarding processes for new users.
*   Functionality for hosts to create, configure, and manage sessions.
*   Functionality for participants to join and engage in sessions.
*   The five-phase AI-mediated session flow.
*   Post-session summary generation, review, and sign-off.
*   The personal growth and tracking module.
*   Multimedia handling (upload, display, analysis context).
*   Real-time interactions and notifications.

Non-functional requirements (performance, security, reliability, usability, maintainability) are detailed in relevant sections of the Developer's Guide and Technical Product Knowledge Base. UI/UX design specifics are detailed in the UI Development Guide.

### 1.4. References
This PRD should be read in conjunction with the following project documents:
*   `Understand-me_ AI-Mediated Conflict Resolution Platform - Research & Strategy Report.txt` (Conceptual reference for market, user needs, and strategy)
*   `understand_me_mermaid_flow updated.mermaid` (Overall application user flow)
*   `docs/development_guide/README.md` (UI Development Guide - for UI/UX specifics)
*   `docs/developer_guide/README.md` (Developer's Guide - for technical implementation details)
*   `docs/technical_product_knowledge_base/README.md` (Technical Product Knowledge Base - for deep technical synthesis)

## 2. User Personas & Roles (Functional Focus)

This section summarizes the key user personas and their primary functional goals within the "Understand.me" application. Detailed persona descriptions are available in the Research & Strategy Report and TPKB Part 2.

### 2.1. Harriet (The Host/Mediator/Facilitator)
*   **FR-PER-HOS-001:** Must be able to create new sessions.
*   **FR-PER-HOS-002:** Must be able to provide detailed context for a session, including text descriptions and multimedia file uploads (documents, images, audio, video).
*   **FR-PER-HOS-003:** Must be able to review AI-generated analysis of the provided session context.
*   **FR-PER-HOS-004:** Must be able to configure session types, choosing from templates or customizing settings (e.g., duration, features like Q&A, polls, anonymity, transcription, translation).
*   **FR-PER-HOS-005:** Must be able to define specific goals and communication rules for a session.
*   **FR-PER-HOS-006:** Must be able to invite participants to a session (e.g., via email, shareable link) and manage participant roles.
*   **FR-PER-HOS-007:** Must be able to track participant invitation statuses (accepted, declined, pending).
*   **FR-PER-HOS-008:** Must be able to initiate and lead an AI-mediated session through its five phases.
*   **FR-PER-HOS-009:** Must be able to utilize in-session AI guidance and moderation tools provided by Alex.
*   **FR-PER-HOS-010:** Must receive and review AI-generated post-session summaries and action plans.
*   **FR-PER-HOS-011:** Must be able to manage the review and approval process for session summaries with participants.
*   **FR-PER-HOS-012:** Must be able to digitally sign off on final session summaries.
*   **FR-PER-HOS-013:** Must be able to schedule follow-up check-in sessions.
*   **FR-PER-HOS-014:** Must be able to access personal growth insights and track communication skill development related to hosting.

### 2.2. Paul (The Participant)
*   **FR-PER-PAR-001:** Must be able to join a session using a unique session code or an invitation link.
*   **FR-PER-PAR-002:** Must be able to view detailed invitation information, including context and files shared by the Host.
*   **FR-PER-PAR-003:** Must be able to accept or decline session invitations, optionally providing a reason for declining.
*   **FR-PER-PAR-004:** Must be able (if requested by the Host) to provide their perspective on the session topic before it begins, including text and multimedia file uploads.
*   **FR-PER-PAR-005:** Must be able to configure personal privacy settings related to data usage and visibility in sessions.
*   **FR-PER-PAR-006:** Must be able to actively participate in all five phases of an AI-mediated session, including expressing their views (via voice or text) and engaging in understanding and resolution activities.
*   **FR-PER-PAR-007:** Must be able to understand and follow Alex's guidance and the established session rules.
*   **FR-PER-PAR-008:** Must be able to review and (if required) approve or suggest changes to post-session summaries.
*   **FR-PER-PAR-009:** Must be able to digitally sign off on final session summaries if required.
*   **FR-PER-PAR-010:** Must be able to provide feedback on the session and AI mediation.
*   **FR-PER-PAR-011:** Must be able to access personal growth insights related to their participation.

### 2.3. Individual User (Self-Reflection/Personal Growth)
*   **FR-PER-IND-001:** Must be able to use the application for personal, private use without necessarily inviting other participants (e.g., for voice journaling, practicing communication, self-reflection).
*   **FR-PER-IND-002:** Must be able to get live transcription of their spoken input in this solo mode.
*   **FR-PER-IND-003:** Must be able to receive AI-driven analysis and insights on their personal input (similar to conflict description analysis but for self-reflection).
*   **FR-PER-IND-004:** Must be able to access all features of the Personal Growth & Tracking Module (insights, badges, resources, conflict prevention advice) based on their solo usage and any participated sessions.
*   **FR-PER-IND-005:** Must have strong privacy assurances for their solo usage data.

## 3. System-Wide Functional Requirements

This section details functional requirements that apply across multiple features or define core system capabilities.

### 3.1. Authentication & User Management
*   **FR-SYS-AUTH-001:** The system must allow users to sign up using an email address and password.
*   **FR-SYS-AUTH-002:** The system must allow existing users to log in using their email and password.
*   **FR-SYS-AUTH-003:** The system must support social logins (e.g., Google, Apple).
*   **FR-SYS-AUTH-004:** The system must provide a secure password reset mechanism for users who have forgotten their password.
*   **FR-SYS-AUTH-005:** Upon first sign-up, the system must create a user profile and link it to their authentication credentials.
*   **FR-SYS-AUTH-006:** The system must manage user sessions securely, maintaining login state across app uses until explicit logout or session expiry.
*   **FR-SYS-AUTH-007:** The system must allow users to update their basic profile information (e.g., full name, avatar).
*   **FR-SYS-AUTH-008:** The system must allow users to manage their privacy and notification preferences.
*   **FR-SYS-AUTH-009:** (Optional, if Dappier DID is used) The system may allow users to link or authenticate via a Decentralized Identifier.

### 3.2. AI Agent 'Alex's' Core Functional Capabilities
*   **FR-SYS-ALEX-001:** Alex must be able to provide real-time transcription of spoken user input during sessions.
*   **FR-SYS-ALEX-002:** Alex must be able to synthesize text scripts into natural-sounding voice output.
*   **FR-SYS-ALEX-003:** Alex's voice output must support configurable emotional nuances based on context (as orchestrated by PicaOS).
*   **FR-SYS-ALEX-004:** Alex must be able to guide users through pre-defined conversational flows (e.g., Personality Assessment, Session Phases).
*   **FR-SYS-ALEX-005:** Alex must be able to analyze textual and multimedia input (provided by users or retrieved via Dappier RAG) to identify themes, sentiments, and key points.
*   **FR-SYS-ALEX-006:** Alex must be able to generate summaries of discussions, sessions, and user inputs.
*   **FR-SYS-ALEX-007:** Alex must be able to suggest session goals, rules, and discussion points based on initial context.
*   **FR-SYS-ALEX-008:** Alex must be able to manage speaking turns and enforce time limits during structured session phases.
*   **FR-SYS-ALEX-009:** Alex must be able to provide personalized growth insights and recommend learning resources based on user interaction history.
*   **FR-SYS-ALEX-010:** Alex must be able to identify and suggest proactive conflict prevention strategies based on observed patterns.
*   **FR-SYS-ALEX-011:** Alex must offer contextual help and explanations about application features and processes.

### 3.3. Multimedia Handling
*   **FR-SYS-MM-001:** The system must allow users (Hosts and Participants where appropriate) to upload multimedia files (defined types: PDF, DOCX, JPG, PNG, MP3, MP4) as contextual material.
*   **FR-SYS-MM-002:** Uploaded multimedia files must be securely stored (Supabase Storage).
*   **FR-SYS-MM-003:** The system must allow relevant users to view or play back uploaded multimedia files within the app (e.g., PDF preview, image display, audio/video playback using `expo-av`).
*   **FR-SYS-MM-004:** The AI (via PicaOS/Google GenAI) must be able to process the content of uploaded multimedia files (text extraction from docs, STT for audio/video, image analysis) for contextual understanding.
*   **FR-SYS-MM-005:** (Optional, if Nodely IPFS is used) The system must allow for designated files (e.g., final session summaries) to be pinned to IPFS for decentralized, immutable storage, and be retrievable via an IPFS gateway.
*   **FR-SYS-MM-006:** The system must clearly indicate file upload progress and handle upload errors gracefully.

### 3.4. Real-time Interactions
*   **FR-SYS-RT-001:** The system must provide real-time transcription display to all relevant participants during an active session.
*   **FR-SYS-RT-002:** The system must update the UI of all participants in real-time when new messages (user or Alex) are added to the session.
*   **FR-SYS-RT-003:** The system must reflect changes in participant invitation status (accepted, declined) in real-time for the Host.
*   **FR-SYS-RT-004:** The system must provide real-time updates for collaborative features if any are introduced (e.g., shared notes, polls).
*   **FR-SYS-RT-005:** (Optional, if Dappier is used) The system may consume real-time data feeds from Dappier to inform PicaOS/Alex during a session.

### 3.5. Notifications
*   **FR-SYS-NOTIF-001:** The system must send notifications to users for key events (e.g., session invitations, reminders for scheduled sessions, summary ready for review, participant responses).
*   **FR-SYS-NOTIF-002:** Notifications must be deliverable via multiple channels (in-app alerts/badges, push notifications via `expo-notifications`, email).
*   **FR-SYS-NOTIF-003:** Users must be able to configure their notification preferences.
*   **FR-SYS-NOTIF-004:** In-app notifications (Toasts/Snackbars) must be used for transient, non-critical feedback.
*   **FR-SYS-NOTIF-005:** Modal alerts must be used for critical information requiring immediate user attention.

## 4. User Flow Functional Requirements (Mapped to Mermaid Diagram)

This section details functional requirements associated with specific user flows, referencing the UI Development Guide (UIDG) for screen details and the Mermaid diagram for flow context.

### 4.1. Onboarding Process (UIDG Part 2; Mermaid A, B, E, F)
*   **FR-FLOW-OB-001 (Welcome/Landing - UIDG 2.1):** The system must display a welcome screen with options to "Get Started" (Sign Up) or "Login."
*   **FR-FLOW-OB-002 (Sign-Up - UIDG 2.2):** The system must allow a new user to create an account using email/password or social providers (fulfills FR-SYS-AUTH-001, FR-SYS-AUTH-003).
*   **FR-FLOW-OB-003 (Login - UIDG 2.2):** The system must allow an existing user to log into their account (fulfills FR-SYS-AUTH-002, FR-SYS-AUTH-003).
*   **FR-FLOW-OB-004 (Conversational Personality Assessment - UIDG 2.3):**
    *   **FR-FLOW-OB-004.1:** The system (Alex) must present a sequence of questions to new users in a conversational format.
    *   **FR-FLOW-OB-004.2:** Users must be able to respond to assessment questions via text or voice input.
    *   **FR-FLOW-OB-004.3:** The system must store user preferences derived from this assessment in their profile (see FR-DATA-PROF-002).
    *   **FR-FLOW-OB-004.4:** Users must be able to skip or postpone the assessment.
*   **FR-FLOW-OB-005 (Interactive Platform Tutorial - UIDG 2.4):**
    *   **FR-FLOW-OB-005.1:** The system (Alex) must offer new users an interactive tutorial of core platform features.
    *   **FR-FLOW-OB-005.2:** The tutorial must allow users to try out key actions in a simulated or guided environment.
    *   **FR-FLOW-OB-005.3:** The system must track tutorial completion status for a user (see FR-DATA-PROF-003).
    *   **FR-FLOW-OB-005.4:** Users must be able to skip or exit the tutorial at any time.

### 4.2. Main Dashboard & Core Navigation (UIDG Part 3)
*   **FR-FLOW-DASH-001 (Main Dashboard Display - UIDG 3.1):** Upon successful login, the system must display a personalized dashboard screen.
*   **FR-FLOW-DASH-002 (Dashboard Content - UIDG 3.1):** The dashboard must provide quick actions (e.g., start/join session), an overview of recent activity/sessions, and contextual insights or tips from Alex.
*   **FR-FLOW-DASH-003 (Navigation - UIDG 1.5):** The system must provide intuitive mobile navigation (e.g., bottom tab bar) allowing access to main application sections: Dashboard, Sessions/History, Growth Hub, and Settings.
*   **FR-FLOW-DASH-004 (Session History Access - UIDG 3.2):** From the dashboard or main navigation, users must be able to access a list of their past and upcoming sessions.
*   **FR-FLOW-DASH-005 (Growth Hub Access - UIDG 3.3):** From the dashboard or main navigation, users must be able to access their Personal Growth Dashboard.

### 4.3. Host Path - Session Creation & Setup (UIDG Part 4; Mermaid O-AC)
*   **FR-FLOW-HPS-001 (Describe Conflict - UIDG 4.1):** The system must allow a Host to input a session title, a detailed text description of the context, and upload multiple multimedia files (images, documents, audio, video) to support the description (fulfills FR-PER-HOS-002, FR-SYS-MM-001).
*   **FR-FLOW-HPS-002 (AI Problem Analysis Review - UIDG 4.2):** The system must present AI-generated analysis (themes, sentiments, potential divergences, suggested talking points) derived from the "Describe Conflict" inputs to the Host for review (fulfills FR-PER-HOS-003).
*   **FR-FLOW-HPS-003 (Host Feedback on Analysis - UIDG 4.2):** The Host must be able to provide feedback (e.g., rate usefulness, suggest edits, dismiss) on the AI-generated analysis.
*   **FR-FLOW-HPS-004 (Configure Session Type - UIDG 4.3):** The system must allow the Host to select a session type from predefined templates or define a custom session, and configure parameters such as duration, enabled features (e.g., Q&A, polls, anonymity settings), transcription, and translation options (fulfills FR-PER-HOS-004).
*   **FR-FLOW-HPS-005 (Define Goals & Rules - UIDG 6.2):** The system must allow the Host to establish specific session goals and communication rules, with Alex providing suggestions based on the session context and type (fulfills FR-PER-HOS-005).
*   **FR-FLOW-HPS-006 (Add Participants - UIDG 4.4):** The system must enable the Host to add participants by entering email addresses or selecting from device contacts.
*   **FR-FLOW-HPS-007 (Assign Participant Roles - UIDG 4.4):** The system must allow the Host to assign roles (e.g., speaker, observer) to invited participants if the session type supports it.
*   **FR-FLOW-HPS-008 (Customize Invitation - UIDG 4.4):** The system must allow the Host to customize the invitation message sent to participants (fulfills FR-PER-HOS-006).
*   **FR-FLOW-HPS-009 (Send Invitations - UIDG 4.4):** The system must send invitations to added participants via email and/or in-app notifications.
*   **FR-FLOW-HPS-010 (Get Shareable Link - UIDG 4.4):** The system must provide an option for the Host to get a unique, shareable link for the session.
*   **FR-FLOW-HPS-011 (Track Invitation Status - UIDG 4.5):** The system must allow the Host to view the status of sent invitations (pending, accepted, declined) in real-time (fulfills FR-PER-HOS-007, FR-SYS-RT-003).
*   **FR-FLOW-HPS-012 (Manage Invitations - UIDG 4.5):** The system must allow the Host to resend invitations or edit participant details for pending invitations.

### 4.4. Participant Path - Joining Session (UIDG Part 5; Mermaid P, AE-AI)
*   **FR-FLOW-PPJ-001 (Join via Code - UIDG 5.1):** The system must allow a participant to join a session by entering a valid, unique session code (fulfills FR-PER-PAR-001).
*   **FR-FLOW-PPJ-002 (Join via Invitation Link - UIDG 5.2):** The system must allow a participant to access session details by opening a unique invitation link.
*   **FR-FLOW-PPJ-003 (View Invitation Details - UIDG 5.2):** The system must display comprehensive session details from the invitation, including title, host, date/time, host's message, and any shared files (fulfills FR-PER-PAR-002).
*   **FR-FLOW-PPJ-004 (Accept/Decline Invitation - UIDG 5.3):** The system must allow a participant to accept or decline the session invitation. An optional reason for declining can be provided (fulfills FR-PER-PAR-003).
*   **FR-FLOW-PPJ-005 (Provide Perspective - UIDG 5.4):** If requested by the host, the system must allow an accepted participant to submit their perspective on the session topic, including text and multimedia file uploads (fulfills FR-PER-PAR-004, FR-SYS-MM-001).
*   **FR-FLOW-PPJ-006 (Configure Privacy Settings - UIDG 5.5):** Before their first session or when settings are updated, the system must allow a participant to configure personal privacy settings related to data usage, profile visibility, and AI analysis (fulfills FR-PER-PAR-005).

### 4.5. Pre-Session Preparation (Converged Path) (UIDG Part 6; Mermaid AJ-AP)
*   **FR-FLOW-PREP-001 (AI Synthesizes Inputs - UIDG 6.1):** The system (PicaOS/GenAI) must synthesize the Host's description and any submitted Participant perspectives, including analysis of associated multimedia files, into a consolidated overview for the Host.
*   **FR-FLOW-PREP-002 (Host Reviews Synthesis - UIDG 6.1):** The Host must be able to review the AI-generated synthesis, which includes identified common themes, areas of divergence, sentiment analysis, and suggested session adaptations.
*   **FR-FLOW-PREP-003 (Host Establishes Final Goals & Rules - UIDG 6.2):** Based on the synthesis and AI suggestions, the Host must be able to define, edit, and confirm the final session goals and communication rules.
*   **FR-FLOW-PREP-004 (Host Shares Goals/Rules - UIDG 6.2):** The system must allow the Host to optionally share the finalized goals and rules with participants before the session begins.
*   **FR-FLOW-PREP-005 (Same-Device Setup Initiation - UIDG 6.3):** The system must allow a user (typically Host) to initiate same-device mode for a session and specify the number of local participants.
*   **FR-FLOW-PREP-006 (Same-Device User Identification - UIDG 6.3):** Each local participant on a shared device must be able to enter their name for speaker attribution.
*   **FR-FLOW-PREP-007 (Same-Device Mini-Assessment - UIDG 6.3):** If a local participant on a shared device is new or lacks assessment data, the system must provide a brief, sequential conversational personality assessment for them.
*   **FR-FLOW-PREP-008 (Same-Device Tap-to-Talk Training - UIDG 6.3):** The system must guide all users on the shared device through an interactive training on the tap-to-talk mechanism.

### 4.6. AI-Mediated Session Core (The Five Phases) (UIDG Part 7; Mermaid AX-BE)
*   **FR-FLOW-SESS-C001 (Common: Display Session Info - UIDG 7.1):** The system must persistently display current session title, current phase, and relevant timers.
*   **FR-FLOW-SESS-C002 (Common: Alex's Presence - UIDG 7.1):** Alex's avatar and text guidance must be present and contextually relevant throughout all phases.
*   **FR-FLOW-SESS-C003 (Common: Real-time Transcript - UIDG 7.1):** The system must display a real-time, scrollable transcript of spoken and typed contributions, with speaker attribution.
*   **FR-FLOW-SESS-C004 (Common: Multimedia Context Access - UIDG 7.1):** Participants must be able to access relevant, previously uploaded multimedia files during the session.
*   **FR-FLOW-SESS-C005 (Common: Text Input - UIDG 7.1):** Participants must be able to contribute via text input at appropriate times.
*   **FR-FLOW-SESS-C006 (Common: Same-Device Controls - UIDG 7.1):** If in same-device mode, specific tap-to-talk and turn management UI must be active and functional.
*   **FR-FLOW-SESS-P1-001 (Prepare: Welcome & Review - UIDG 7.2):** Alex must welcome participants and reiterate agreed-upon session goals and rules.
*   **FR-FLOW-SESS-P1-002 (Prepare: Readiness Confirmation - UIDG 7.2):** Participants must be able to signal their readiness to start the session.
*   **FR-FLOW-SESS-P2-001 (Express: Turn Management - UIDG 7.3):** Alex must manage speaking turns, ensuring each participant has a dedicated opportunity to express their perspective.
*   **FR-FLOW-SESS-P2-002 (Express: Input Capture - UIDG 7.3):** The system must capture the active speaker's input (voice via STT, or text) and add it to the transcript.
*   **FR-FLOW-SESS-P2-003 (Express: File Sharing - UIDG 7.3):** The active speaker must be able to share relevant multimedia files during their turn, which are then added to the session's context.
*   **FR-FLOW-SESS-P3-001 (Understand: AI Summaries & Mapping - UIDG 7.4):** Alex (PicaOS/GenAI) must provide summaries of expressed perspectives, highlighting key themes, alignments, and divergences.
*   **FR-FLOW-SESS-P3-002 (Understand: Clarification - UIDG 7.4):** Participants must be able to ask clarifying questions; Alex facilitates this process.
*   **FR-FLOW-SESS-P4-001 (Resolve: Brainstorming - UIDG 7.5):** Alex must guide participants through brainstorming potential solutions to identified issues.
*   **FR-FLOW-SESS-P4-002 (Resolve: Solution Evaluation - UIDG 7.5):** Alex must facilitate the evaluation of proposed solutions (e.g., discussing pros/cons).
*   **FR-FLOW-SESS-P4-003 (Resolve: Agreement Tracking - UIDG 7.5):** The system must allow participants to indicate agreement on solutions, and Alex must track these points of consensus and identify actionable steps.
*   **FR-FLOW-SESS-P5-001 (Heal: Reflection - UIDG 7.6):** Alex must guide participants to reflect on the session process and outcomes.
*   **FR-FLOW-SESS-P5-002 (Heal: Affirmations & Intentions - UIDG 7.6):** The system must allow participants to share affirmations or state future intentions, either publicly or privately.
*   **FR-FLOW-SESS-P5-003 (Heal: Closing - UIDG 7.6):** Alex must provide closing remarks and summarize agreed action items.

### 4.7. Post-Session Activities (UIDG Part 8; Mermaid BF-BP)
*   **FR-FLOW-POST-001 (AI Summary Generation - UIDG 8.1):** The system (PicaOS/GenAI) must automatically generate a session summary, list of decisions, and action plan post-session.
*   **FR-FLOW-POST-002 (Summary Review & Comment - UIDG 8.2):** Participants (or Host first) must be able to review the summary and add comments or suggest edits.
*   **FR-FLOW-POST-003 (Summary Approval - UIDG 8.2):** Participants must be able to formally approve the session summary.
*   **FR-FLOW-POST-004 (Digital Sign-off - UIDG 8.3):** The system must allow participants to digitally sign off on the final summary, supporting remote and same-device scenarios.
*   **FR-FLOW-POST-005 (Session Evaluation - UIDG 8.4):** Participants must be able to provide feedback on the session experience and AI mediation.
*   **FR-FLOW-POST-006 (Schedule Follow-up - UIDG 8.5):** The Host must be able to schedule follow-up check-in sessions, inviting relevant participants.

### 4.8. Growth & Tracking Module (UIDG Part 9; Mermaid K, CB-CI)
*   **FR-FLOW-GROW-001 (View Personal Growth Insights - UIDG 9.1):** Users must be able to view AI-generated insights on their communication patterns and emotional regulation.
*   **FR-FLOW-GROW-002 (View Achievements & Progress - UIDG 9.2):** Users must be able to see earned badges and track progress towards new achievements and skill development.
*   **FR-FLOW-GROW-003 (Access Recommended Resources - UIDG 9.3):** Users must be able to browse and access curated learning materials suggested by Alex/AI based on their growth insights.
*   **FR-FLOW-GROW-004 (View Conflict Prevention Insights - UIDG 9.4):** Users must be able to view proactive AI-driven advice based on recurring negative patterns to help prevent future conflicts.

## 5. Data Management (Functional Perspective)

This section outlines functional requirements related to data handling from the user's and system's perspective. Data models themselves are detailed in Developer Guide Part 3.

### 5.1. User Profile Data
*   **FR-DATA-PROF-001:** The system must securely create, store, and allow retrieval of user profile information (including name, email, avatar, and authentication details).
*   **FR-DATA-PROF-002:** The system must store and associate user-defined communication preferences (from Conversational Personality Assessment) with their profile.
*   **FR-DATA-PROF-003:** The system must store and update user onboarding status (e.g., tutorial completion, personality assessment completion) in their profile.
*   **FR-DATA-PROF-004:** Users must be able to view and initiate edits to their own mutable profile information (e.g., name, avatar).
*   **FR-DATA-PROF-005:** The system must allow users to configure and the system must store and respect user privacy settings for data sharing and AI analysis.

### 5.2. Session Data
*   **FR-DATA-SESS-001:** The system must allow authorized users (Hosts) to create new session records, including defining initial context (title, description), type, goals, and rules.
*   **FR-DATA-SESS-002:** The system must allow Hosts to associate participants with sessions, storing their roles, invitation status, and any pre-session input (perspectives).
*   **FR-DATA-SESS-003:** The system must capture and store all session messages (transcribed speech, typed messages, AI agent contributions) with accurate speaker attribution and timestamps for the duration of the session.
*   **FR-DATA-SESS-004:** The system must allow for the association and storage of multimedia files (uploaded by Host or Participants) linked to specific sessions and users.
*   **FR-DATA-SESS-005:** The system must store AI-generated analyses, including pre-session context analysis and in-session summaries or insights.
*   **FR-DATA-SESS-006:** The system must store AI-generated post-session summaries, key decisions, and action plans.
*   **FR-DATA-SESS-007:** The system must track and store the review, approval, and digital sign-off status of session summaries by each relevant participant.
*   **FR-DATA-SESS-008:** Authorized users (Hosts and relevant Participants) must be able to retrieve and view information about their past and upcoming sessions.
*   **FR-DATA-SESS-009:** (If Nodely/IPFS is used) The system must be able to store IPFS Content Identifiers (CIDs) associated with specific session artifacts (e.g., final signed summaries, critical evidence files) and allow retrieval of these artifacts via an IPFS gateway.
*   **FR-DATA-SESS-010:** The system must manage session status (e.g., scheduled, in_progress, completed, cancelled) and make this information available.

### 5.3. Growth & Tracking Data
*   **FR-DATA-GROW-001:** The system must (with user consent) collect and store data derived from user participation and interactions within sessions for the purpose of generating personal growth insights.
*   **FR-DATA-GROW-002:** The system must store AI-generated personal growth insights (e.g., clarity scores, sentiment trends, filler word frequency, communication pattern analysis) linked to individual user profiles.
*   **FR-DATA-GROW-003:** The system must define criteria for achievements/badges and store records of badges earned by users, along with their progress towards new ones.
*   **FR-DATA-GROW-004:** The system must store metadata for curated learning resources (e.g., articles, videos, exercises), including title, description, type, and source.
*   **FR-DATA-GROW-005:** The system must store AI-generated future conflict prevention insights provided to users.
*   **FR-DATA-GROW-006:** Users must be able to access and view their own private growth data, insights, achievements, and recommended resources. System must ensure this data is not visible to other users.

### 5.4. Feedback & Evaluation Data
*   **FR-DATA-FEED-001:** The system must allow users to submit, and the system must store, feedback regarding their session experience, the platform's usability, and the AI mediator's effectiveness.
*   **FR-DATA-FEED-002:** The system must store user preferences regarding the anonymity of their session-specific feedback when shared with hosts. Platform and AI feedback is typically anonymized for aggregation.
