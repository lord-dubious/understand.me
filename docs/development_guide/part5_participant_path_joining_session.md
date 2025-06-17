# Part 5: Participant Path - Joining a Session

This part of the Development Guide outlines the typical journey for a Participant joining an "Understand-me" session. It covers various entry points, from receiving an invitation to providing their perspective before the session begins, and configuring their privacy settings.

## 5.1. Screen: Enter Session Code (Mermaid: P)

*   **Mermaid Diagram ID:** P (Represents the screen where a participant can enter a unique code to join a session).

*   **Purpose:**
    *   To provide a quick and direct way for participants to join a session if they have received a session code (e.g., verbally, via a non-system message, or from a kiosk).
    *   To validate the session code and direct the participant to the correct session waiting room or pre-session steps.

*   **Key UI Elements:**
    *   **"Understand-me" Logo/Branding.**
    *   **Clear Headline:** e.g., "Join Your Session" or "Enter Session Code."
    *   **Session Code Input Field:**
        *   Prominent, single input field designed for a short alphanumeric code.
        *   May include auto-formatting (e.g., adding hyphens if the code format uses them).
        *   Clear placeholder text: e.g., "Enter Code Here."
    *   **"Join Session" / "Continue" Button (Primary CTA).**
    *   **Help Link/Tooltip:** "Where do I find the session code?" or "If you received an email invitation, click the link in the email instead."
    *   **Alternative Action:** Link to "Login" or "Sign Up" if the participant wants to access their dashboard or doesn't have a code. (Less prominent).

*   **Voice Agent Interactions (Alex):**
    *   **General:** Alex's presence on this screen would be minimal to keep it streamlined. A small, non-intrusive help icon for Alex could be available.
    *   **Error Handling:**
        *   **Cue:** User enters an invalid or expired code.
        *   **Alex (On-screen error message, potentially voiced if user has opted-in):** "Hmm, that session code doesn't seem right, or it might have expired. Please double-check the code and try again. If you need help, you can ask the session host or check your invitation."
    *   **Accessibility Support (On request via help icon):**
        *   **Alex:** "Need help joining? Just type the session code you received into the box and click 'Join Session'. If you have an invitation link, that's usually the easiest way to join."

*   **Navigation:**
    *   Typically accessed directly via a URL like `understand-me.com/join` or from a "Join with Code" button on the landing page/dashboard if logged in.
    *   Successful code entry navigates to:
        *   The session waiting room (if the session is about to start or in progress).
        *   Screen 5.4 ("Provide Your Perspective") if the host has requested pre-session input and the participant hasn't provided it yet.
        *   Screen 5.5 ("Configure Privacy Settings") if it's their first time or settings need review.
        *   A session information screen if the session is scheduled for a later time.
    *   Failed code entry keeps the user on this screen with an error message.

*   **Multimedia Aspects:**
    *   Minimal, focusing on clarity and ease of use.
    *   Company logo.
    *   Clear, legible fonts for instructions and input fields.

## 5.2. Screen: Receive Detailed Invitation (Mermaid: AE)

*   **Mermaid Diagram ID:** AE (Represents the screen a participant sees after clicking an email invitation link, displaying detailed session information before they accept/decline).

*   **Purpose:**
    *   To provide the participant with comprehensive information about the upcoming session.
    *   To display any context, objectives, or introductory materials (including files) shared by the Host.
    *   To allow the participant to make an informed decision about accepting or declining the invitation.
    *   To introduce "Understand-me" to new users if they haven't encountered it before.

*   **Key UI Elements:**
    *   **Session Title:** Clearly displayed.
    *   **Host Information:** Name of the Host (and their organization, if applicable).
    *   **Date & Time of Session:** Clearly stated, including time zone.
    *   **Estimated Duration.**
    *   **"You're Invited by [Host Name]" Message.**
    *   **Host's Message/Session Description (from Screen 4.1 & 4.4):**
        *   The personalized message from the host.
        *   The description of the conflict/topic.
    *   **Shared Files/Contextual Materials Section:**
        *   If the Host uploaded files in Screen 4.1 and chose to share them with participants, these are listed here.
        *   Display file names, types (with icons), and sizes.
        *   Option to preview common file types (e.g., images, PDFs, text documents) directly in the browser or download them.
    *   **Key Objectives/Agenda (if provided by Host).**
    *   **"What is Understand-me?" Link/Section (for new users):**
        *   A brief explanation of the platform and its benefits for participants (e.g., "Understand-me helps make conversations clearer and ensures everyone can participate effectively. You'll be able to see live transcriptions and share your thoughts easily.")
    *   **Call-to-Action Buttons:**
        *   "Accept Invitation" (Primary CTA) - Leads to Screen 5.3.
        *   "Decline Invitation" (Secondary CTA) - Leads to Screen 5.3.
        *   "Maybe / Tentative" (Optional CTA, if supported by the system).
    *   **Footer Links:** Privacy Policy, Terms of Service.

*   **Voice Agent Interactions (Alex):** Alex helps explain the session context and the platform to the participant.
    *   **Welcome and Explanation:**
        *   **Cue:** Participant lands on the screen.
        *   **Alex:** "Hi there! You've been invited by [Host Name] to a session called '[Session Title]'. This page has all the details to help you decide. The host has shared some information about the topic below."
    *   **Guidance on Reviewing Host's Context/Files:**
        *   **Cue:** Participant scrolls to the shared files section.
        *   **Alex:** "[Host Name] has included [Number] file(s) to provide more background for this session. You can preview them here or download them to review. This information can help everyone get on the same page before the session starts."
        *   **Alex (If a video or audio file is shared):** "This is a [video/audio] file shared by the host. You can play it here to get more context."
    *   **Explaining "Understand-me" (If participant seems new, or on clicking "What is Understand-me?"):**
        *   **Alex:** "'Understand-me' is a platform designed to make discussions more inclusive and clear. During the session, you'll see real-time transcriptions, and you'll have tools to ask questions or share feedback easily, even if many people are talking. The goal is to help everyone understand and be understood."
    *   **Clarifying Next Steps:**
        *   **Alex:** "Once you've reviewed the details, you can choose to accept or decline the invitation using the buttons below. If you accept, [Host Name] will be notified."

*   **Navigation:**
    *   Accessed by clicking a unique link in an email invitation.
    *   "Accept Invitation" button proceeds to Screen 5.3 (and potentially 5.4 or 5.5).
    *   "Decline Invitation" button proceeds to Screen 5.3 (likely a confirmation and optional reason).
    *   Links to preview/download files might open in a modal or new tab.

*   **Multimedia Aspects:**
    *   **Host's Profile Picture (if available).**
    *   **File Type Icons:** Clear visual indicators for different types of shared files.
    *   **Embedded Previews:** For documents, images, or media files where possible.
    *   **Alex's Avatar:** Present to provide explanations and guidance in a friendly manner.
    *   **"Understand-me" Branding:** Consistent with the platform's look and feel.

## 5.3. Screen: Accept or Decline Invitation (Mermaid: AF, AG)

*   **Mermaid Diagram ID:** AF (Flow/confirmation after clicking "Accept"), AG (Flow/confirmation after clicking "Decline").

*   **Purpose:**
    *   To confirm the participant's decision to accept (AF) or decline (AG) the session invitation.
    *   To provide any immediate next steps or information based on their choice (e.g., add to calendar, option to provide perspective if accepted; option to provide reason if declined).
    *   To update the Host on the participant's status.

*   **Key UI Elements:**
    *   **View AF: Accepted Invitation**
        *   **Confirmation Message:** e.g., "Great! You've accepted the invitation to '[Session Title]'."
        *   **Session Details Recap:** Date, Time, Host.
        *   **"Add to Calendar" Button:** Provides .ics file or links to Google Calendar/Outlook Calendar.
        *   **Next Steps Information/Button:**
            *   If Host requested pre-session input (Screen 5.4): "Next: Share Your Perspective" button.
            *   Else if privacy settings need review (Screen 5.5): "Next: Configure Privacy Settings" button.
            *   Else: "You're all set! We'll remind you before the session." or "Go to My Dashboard."
        *   Link: "View Session Details Again" (back to Screen 5.2).
    *   **View AG: Declined Invitation**
        *   **Confirmation Message:** e.g., "You have declined the invitation to '[Session Title]'."
        *   **Optional: Reason for Declining (Text Area):** "If you'd like, you can provide a reason for declining (this will be shared with the host)."
        *   **"Submit Reason & Close" or "Decline Without Reason" Button.**
        *   Link: "Undo / Change My Response" (if feasible, might take back to Screen 5.2, status permitting).

*   **Voice Agent Interactions (Alex):** Alex confirms the choice and guides on immediate next steps.
    *   **On Accepting (AF):**
        *   **Cue:** User clicks "Accept Invitation."
        *   **Alex:** "Thanks for accepting! I've let [Host Name] know. This session is on [Date] at [Time]. Would you like to add it to your calendar?"
        *   **Alex (If perspective sharing is next):** "Before the session, [Host Name] has requested participants to share their perspective on the topic. This helps ensure everyone's initial thoughts are considered. Ready to share yours now?" (Leads to 5.4)
        *   **Alex (If privacy setting is next and no perspective sharing):** "Before you join your first session, let's quickly review your privacy settings to make sure you're comfortable with how your information will be handled." (Leads to 5.5)
    *   **On Declining (AG):**
        *   **Cue:** User clicks "Decline Invitation."
        *   **Alex:** "Okay, you've chosen to decline this session. [Host Name] will be notified. If you're willing to share a brief reason, it can be helpful for the host, but it's entirely optional."
    *   **After Submitting Reason (AG):**
        *   **Alex:** "Thanks for letting us know. Your response has been recorded."

*   **Navigation:**
    *   Arrives from Screen 5.2 ("Receive Detailed Invitation") after clicking "Accept" or "Decline."
    *   **From AF (Accepted):**
        *   Typically proceeds to Screen 5.4 ("Provide Your Perspective") if requested by Host.
        *   Or proceeds to Screen 5.5 ("Configure Privacy Settings") if needed.
        *   Or proceeds to a general dashboard or a "session added" confirmation page if no other pre-session steps are required.
    *   **From AG (Declined):**
        *   Usually ends the participant's current flow for this session. Might navigate to their dashboard if they are logged in, or a generic "thank you" page.
    *   "Add to Calendar" typically triggers a file download or opens a new tab for the respective calendar service.

*   **Multimedia Aspects:**
    *   **Calendar Icons.**
    *   **Confirmation Icons (e.g., checkmark for accepted, cross for declined).**
    *   **Alex's Avatar.**

## 5.4. Screen: Provide Your Perspective (Mermaid: AH)

*   **Mermaid Diagram ID:** AH (Represents the screen where a participant can provide their perspective on the session topic before the session starts).

*   **Purpose:**
    *   To allow participants to share their initial thoughts, concerns, or information related to the session topic before it begins.
    *   To enable participants to upload relevant multimedia files (documents, images, etc.) that support their perspective.
    *   To provide the Host with more comprehensive information for better session preparation and facilitation.
    *   To help participants feel heard and prepared, potentially leveling the playing field if there are power dynamics or strong opposing views.
    *   This step is typically optional for participants but encouraged by the Host.

*   **Key UI Elements:**
    *   **Session Title & Host's Initial Context (Brief, Collapsible Summary):** Provides context for the participant's input.
    *   **Headline:** e.g., "Share Your Perspective" or "Your Initial Thoughts on '[Session Title]'."
    *   **Instructional Text:** Explaining why this input is valuable (e.g., "Sharing your perspective now helps [Host Name] understand everyone's viewpoint and prepare for a productive session. What are your initial thoughts on this topic?").
    *   **Main Input Text Area:** For participants to type their perspective, comments, or concerns.
        *   Placeholder text: e.g., "Please share your views on the situation, any key points you want to ensure are discussed, or any questions you have..."
    *   **Multimedia Upload Section:**
        *   Similar to Screen 4.1 for Hosts: Drag-and-drop area and/or "Upload Files" button.
        *   Supported file types clearly listed.
        *   Display of uploaded files with options to remove.
    *   **Privacy Note:** Clearly explaining who will see this information (typically the Host and potentially an AI for analysis, but not other participants by default). e.g., "Your perspective and any uploaded files will be shared with the Host to help them prepare. It will not be visible to other participants unless you explicitly share it during the session."
    *   **"Submit Perspective" Button.**
    *   **"Skip for Now" / "Do Later" Button** (if the system allows returning to this step).
    *   **Link to "View Session Details Again" (Screen 5.2).**

*   **Voice Agent Interactions (Alex):** Alex encourages sharing and clarifies how the information is used.
    *   **Screen Introduction:**
        *   **Alex:** "Thanks for accepting! Before the session, [Host Name] has invited you to share your perspective on '[Session Title]'. This is a great way to ensure your initial thoughts are considered. You can type your views and even upload any files that might be helpful."
    *   **Encouraging Input:**
        *   **Cue:** Participant is on the screen, perhaps hasn't started typing.
        *   **Alex:** "Feel free to share what's on your mind regarding this topic. Are there any key points you want to make sure are covered, or any initial concerns you have? Every perspective is valuable."
    *   **Explaining Use of Information & Privacy:**
        *   **Cue:** Participant hovers over the privacy note or uploads a file.
        *   **Alex:** "Just so you know, what you share here, including any files, will be sent to [Host Name] to help them prepare for the session. It's not shared with other participants directly from this screen. The aim is to help the host understand all viewpoints beforehand."
    *   **Guidance on Multimedia Uploads:**
        *   **Alex:** "If you have any documents, screenshots, or other files that support your points or provide more context, feel free to upload them here. This can be very helpful for the host."
    *   **Confirmation of Submission:**
        *   **Cue:** Participant clicks "Submit Perspective."
        *   **Alex:** "Thanks for sharing your perspective! [Host Name] will be able to review this. This will really help in making the upcoming session productive."

*   **Navigation:**
    *   Arrives from Screen 5.3 ("Accept Invitation") if this step is enabled by the Host.
    *   "Submit Perspective" button:
        *   Proceeds to Screen 5.5 ("Configure Privacy Settings") if needed.
        *   Else, navigates to a "session confirmed" page or the user's dashboard.
    *   "Skip for Now" / "Do Later":
        *   Proceeds to Screen 5.5 ("Configure Privacy Settings") if needed.
        *   Else, navigates to a "session confirmed" page (with a note that they can add their perspective later via their dashboard if allowed).
    *   Link back to session details (Screen 5.2).

*   **Multimedia Aspects:**
    *   **File Upload Interface:** Consistent with Screen 4.1.
    *   **Alex's Avatar:** Present for guidance and reassurance.
    *   **Visual separation** of Host's context and Participant's input area.

## 5.5. Screen: Configure Privacy Settings (Mermaid: AI)

*   **Mermaid Diagram ID:** AI (Represents the screen where participants configure their privacy preferences, especially before their first session or if new settings are introduced).

*   **Purpose:**
    *   To allow participants to understand and control how their data (voice, video, text contributions, personal growth metrics) is used and displayed within "Understand-me."
    *   To build trust by being transparent about data handling.
    *   To ensure compliance with privacy regulations.
    *   This screen is typically shown before a participant's first session, or if settings have been updated, or if they access it from their profile.

*   **Key UI Elements:**
    *   **Headline:** e.g., "Your Privacy Settings" or "Control How Your Information is Used."
    *   **Introductory Text:** Briefly explaining the importance of these settings.
    *   **Settings Sections (each with clear labels, explanations, and toggle switches/dropdowns):**
        *   **Profile Visibility:**
            *   Options: "Show my full name & avatar," "Show my first name & initial only," "Appear as Anonymous" (if allowed by host/session type).
            *   Explanation: "Choose how your name and picture appear to others in sessions and transcripts."
        *   **Transcription Data Usage (for Personal Growth Insights - Screen 3.3):**
            *   Option: "Allow 'Understand-me' to analyze my speech patterns from session transcripts to provide me with personal growth insights (e.g., clarity, filler words)." (Enabled by default, but can be disabled).
            *   Explanation: "If enabled, your contributions to transcribed sessions help generate private feedback for you on your communication style. This data is not shared with hosts or other participants without your explicit permission."
        *   **Data Sharing with Host (Post-Session):**
            *   Option: "Allow Host to access my identified contributions in the final session transcript and recording." (Usually enabled by default for non-anonymous sessions).
            *   Explanation: "This allows the host to review who said what after the session. If anonymity was enabled for certain interactions during the session, those will remain anonymous."
        *   **Future Feature - AI Coaching (Hypothetical):**
            *   Option: "Enable AI-driven coaching tips from Alex based on my communication patterns."
            *   Explanation: "If enabled, Alex may offer you personalized suggestions during or after sessions to help improve your communication effectiveness."
    *   **"Save Settings" Button (Primary CTA).**
    *   **"Learn More about Privacy at Understand-me" Link (to detailed Privacy Policy).**
    *   **Default Settings Note:** A note indicating what the default settings are if no changes are made.

*   **Voice Agent Interactions (Alex):** Alex's primary role here is to clearly explain each setting and its implications.
    *   **Screen Introduction:**
        *   **Alex:** "Before you join, let's quickly go over your privacy settings. These help you control how your information is handled in 'Understand-me'. I'll explain each option."
    *   **Explaining Profile Visibility:**
        *   **Alex:** "First, let's decide how you want to appear to others. You can show your full name and avatar, just your first name and initial, or, if the session allows, appear as 'Anonymous'. What works best for you?"
    *   **Explaining Transcription Data Usage for Personal Growth:**
        *   **Cue:** User is at this setting.
        *   **Alex:** "This setting is about your Personal Growth Dashboard. If you allow it, 'Understand-me' can analyze your speech from session transcripts – things like clarity or filler words – to give you private feedback on your communication style. This is just for you; it's not shared with the host or other participants. Would you like to enable this?"
    *   **Explaining Data Sharing with Host:**
        *   **Alex:** "Typically, after a session, the host can review the transcript and recording, which includes who said what. This setting confirms you're okay with your contributions being identifiable to the host in that record. If the session used any anonymous feedback tools, that anonymity is still preserved."
    *   **Answering User Questions:**
        *   **User:** "If I choose 'Anonymous' for my profile, is everything I say anonymous?"
        *   **Alex:** "Appearing as 'Anonymous' will hide your name in the participant list and on screen during live interactions. However, depending on session settings defined by the host, the final transcript available to the host might still identify speakers. True anonymous contributions usually happen through specific tools like anonymous Q&A, if enabled by the host."
    *   **Confirmation of Saved Settings:**
        *   **Cue:** User clicks "Save Settings."
        *   **Alex:** "Great, your privacy settings have been saved! You can always revisit these from your profile settings later."

*   **Navigation:**
    *   Arrives from Screen 5.3 ("Accept Invitation") or 5.4 ("Provide Your Perspective"), especially for first-time users or when settings need confirmation.
    *   Can also be accessed from a user's main profile/account settings page at any time.
    *   "Save Settings" button:
        *   Navigates to a "session confirmed" / "you're all set" page, the session waiting room (if imminent), or the user's dashboard.

*   **Multimedia Aspects:**
    *   **Clear Icons:** For each setting category (e.g., profile, analytics, sharing).
    *   **Toggle Switches:** Visually clear on/off states.
    *   **Alex's Avatar:** Present to provide clear, reassuring explanations.
    *   **Short Explainer Videos (Optional, linked via "Learn More"):** For users who prefer visual explanations of data handling.

This concludes Part 5.
