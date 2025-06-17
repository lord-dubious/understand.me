# Part 4: Host Path - Initiating a Session

This part of the Development Guide details the journey a Host takes to initiate a new session. It covers the steps from describing the initial situation or conflict to configuring the session and inviting participants, with a focus on leveraging AI insights and Alex's guidance. While "Describe Conflict" is used as a specific starting point, this path can be adapted for various session types where initial context is important.

## 4.1. Screen: Describe Conflict (Mermaid: O)

*   **Mermaid Diagram ID:** O (Represents the initial screen where a host describes the context, problem, or conflict for an upcoming session).

*   **Purpose:**
    *   Allow the Host to provide a detailed description of the situation, conflict, or topic to be addressed in the session.
    *   Enable the upload of relevant multimedia files (documents, images, audio snippets, short video clips) that provide context.
    *   Guide the Host to articulate the core issues clearly, which will inform AI analysis and session setup.
    *   Set the stage for a focused and productive session.

*   **Key UI Elements:**
    *   **Session Title Field:** A clear field for giving the session a working title (e.g., "Project Alpha - Budget Discrepancy," "Team Communication Challenges").
    *   **Main Description Text Area:** A large, resizable text area for the Host to type out the details of the conflict or situation.
        *   Placeholder text: e.g., "Describe the situation, the key parties involved, the main points of contention, and any desired outcomes..."
    *   **Multimedia Upload Section:**
        *   Drag-and-drop area and/or "Upload Files" button.
        *   Supported file types clearly listed (e.g., .txt, .pdf, .docx, .jpg, .png, .mp3, .wav, .mp4 - with size limits).
        *   Display of uploaded files with options to remove or rename.
        *   Progress bars for uploads.
    *   **Key Information Prompts (Optional, guided by Alex or static):**
        *   Short fields or guided questions like:
            *   "Who are the key parties involved?" (Text input, could allow tagging users already in the system).
            *   "What are the main emotions you've observed or experienced related to this?" (Tag input or text).
            *   "What would be a successful outcome for this session?" (Text input).
    *   **Privacy/Sensitivity Notice:** A reminder that the information shared will be processed by AI to provide insights and that sensitive information should be handled appropriately.
    *   **"Next: AI Analysis" or "Save Draft" Button:** Primary CTA to proceed.

*   **Voice Agent Interactions (Alex):** Alex acts as a supportive guide, especially for the sensitive task of describing a conflict.
    *   **Screen Introduction:**
        *   **Cue:** Host lands on this screen.
        *   **Alex:** "Starting a new session is a great first step. On this screen, you can describe the situation or topic you'd like to address. The more detail you provide, the better I can help analyze it and suggest a productive session setup. What would you like to call this session?"
    *   **Guidance During Description:**
        *   **Cue:** Host is typing in the main description area.
        *   **Alex (Subtle prompt if Host pauses for long):** "Remember to include who is involved, what the core issues are, and any specific incidents or examples. No need to be perfect, just get your initial thoughts down."
        *   **Alex (If specific keywords related to high emotion are typed, e.g., "furious," "very upset"):** "It sounds like this is a challenging situation. Take your time to describe it. Acknowledging the emotions involved can be helpful."
    *   **Encouraging Multimedia Uploads:**
        *   **Cue:** Host has written a description but not uploaded files.
        *   **Alex:** "You've provided a good description. Do you have any documents, emails, screenshots, or even short audio clips that might give more context? Uploading them can help us get a fuller picture."
    *   **Explaining File Usage & AI Analysis:**
        *   **Cue:** Host uploads a file.
        *   **Alex:** "Thanks for uploading '[filename]'. Our AI will analyze its content to help identify key themes, sentiments, and talking points. This stays confidential and is only used to prepare for your session."
    *   **Answering Questions about Privacy:**
        *   **User:** "Alex, who sees this information?"
        *   **Alex:** "The information you provide here is used to help you prepare for the session and will be accessible to you as the host. If you later invite participants, you'll be able to choose what information is shared with them. All data is handled securely."
    *   **Prompting for Key Information Fields:**
        *   **Alex:** "To help focus the session, could you list the key parties or individuals involved in this situation?" (If the Host hasn't filled that optional field).

*   **Navigation:**
    *   Accessed via "Start New Session" or similar CTA from the Main Dashboard.
    *   "Next: AI Analysis" button proceeds to Screen 4.2 (AI Problem Analysis Review).
    *   "Save Draft" would save the current input and return the user to the dashboard or a drafts list.
    *   Links to Help or FAQs about describing conflicts or data privacy.

*   **Multimedia Aspects:**
    *   **File Upload Interface:** Clear visual cues for supported file types, progress of uploads, and management of uploaded files (e.g., icons for file types, thumbnails for images).
    *   **Alex's Avatar:** Present to provide guidance and reassurance.
    *   **Loading Indicators:** If AI is doing any pre-processing of text as it's typed (e.g., for sentiment).

## 4.2. Screen: AI Problem Analysis Review (Mermaid: Q, R)

*   **Mermaid Diagram ID:** Q (Main AI Analysis Review screen), R (Detailed view or feedback mechanism for specific AI insights).

*   **Purpose:**
    *   To present the Host with AI-generated insights based on the information provided in Screen 4.1 (description and uploaded files).
    *   To help the Host understand the situation from different perspectives and identify key themes, sentiments, potential misunderstandings, or areas of focus.
    *   To allow the Host to validate, refine, or dismiss AI-generated insights.
    *   To provide a basis for deciding on the most appropriate session type and configuration.

*   **Key UI Elements (View Q - Main Review):**
    *   **Summary of Host's Input:** A brief, collapsible section showing the original title and description for easy reference.
    *   **Key Themes/Topics Card:**
        *   Lists 3-5 dominant themes or keywords extracted from the input.
        *   e.g., "Budget constraints," "Communication breakdown," "Deadline pressure."
        *   Each theme could be clickable to see supporting snippets (View R).
    *   **Sentiment Analysis Card:**
        *   Overall sentiment score/indicator (e.g., Negative, Neutral, Mixed, Positive) with a brief explanation.
        *   Potentially a simple chart showing sentiment distribution if varied.
        *   Identification of key phrases or sentences associated with strong sentiment (clickable to see in context - View R).
    *   **Potential Areas of Misunderstanding/Disagreement Card (if applicable):**
        *   Highlights statements or topics that seem contradictory or indicate differing perspectives, based on text analysis.
        *   e.g., "Party A states X, while uploaded document B implies Y."
    *   **Key Entities/People Mentioned Card:**
        *   Lists individuals, departments, or projects frequently mentioned.
        *   Helps confirm all relevant parties are considered.
    *   **Suggested Talking Points/Questions Card:**
        *   AI-generated suggestions for questions the Host might ask during the session, or key points to ensure are covered.
        *   e.g., "Consider asking: 'What is each party's understanding of the budget allocation process?'"
    *   **Overall AI Confidence Score (Optional):** A score indicating how confident the AI is in its analysis, based on clarity and completeness of input.
    *   **Feedback Mechanism (View R - integrated or separate):**
        *   For each insight card or specific insight: Thumbs up/down, "Useful/Not Useful," or a short comment box.
        *   Option to "Edit" or "Rephrase" an AI insight to better match Host's understanding.
        *   Option to "Dismiss" an irrelevant insight.
    *   **"Next: Configure Session" Button.**
    *   **"Back to Description" Button.**

*   **Voice Agent Interactions (Alex):** Alex helps the Host interpret AI insights and reassures them about AI's role.
    *   **Screen Introduction:**
        *   **Alex:** "Okay, I've analyzed the information you provided. This screen shows a summary of what the AI found. Remember, these are just suggestions and observations to help you prepare – you're the expert on the situation."
    *   **Explaining AI Insights:**
        *   **Cue:** Host hovers over or clicks an info icon next to an insight card.
        *   **Alex:** "This 'Key Themes' card shows the main topics that appeared frequently in your description and uploaded files. You can click on a theme to see the exact phrases that relate to it."
        *   **Alex (For Sentiment Analysis):** "Based on the language used, the overall sentiment seems to be [e.g., 'leaning negative']. This is common in conflict situations. We can look at specific phrases that contributed to this."
    *   **Encouraging Feedback on Insights (View R):**
        *   **Alex:** "Your feedback is valuable! If an insight seems particularly accurate or helpful, let me know by using the thumbs-up. If something isn't quite right or is missing, you can edit or dismiss it. This helps the AI learn."
    *   **Handling Potentially Sensitive Insights:**
        *   **Alex (If AI identifies strong negative sentiment or significant conflict indicators):** "It appears there are some strong emotions or clear points of disagreement highlighted here. This is often the core of the issue and can be a good starting point for discussion in the session."
    *   **Clarifying AI's Role:**
        *   **User:** "Is this AI always right?"
        *   **Alex:** "That's a great question! The AI provides suggestions based on patterns in the data you give it. It's a tool to help you see things you might have missed or to organize your thoughts. Your own understanding and judgment are key to interpreting these insights correctly."
    *   **Transitioning to Next Step:**
        *   **Alex:** "Once you've reviewed these insights and made any adjustments, we can move on to thinking about the best way to structure your session. Ready to configure the session type?"

*   **Navigation:**
    *   Arrives from Screen 4.1 ("Describe Conflict").
    *   "Next: Configure Session" button proceeds to Screen 4.3.
    *   "Back to Description" button returns to Screen 4.1 to allow editing of the initial input (which would then trigger a re-analysis).
    *   Clicking on specific insights might lead to a more detailed view (View R) or show contextual snippets from the uploaded files/description.

*   **Multimedia Aspects:**
    *   **Visualizations of Insights:** Simple charts for sentiment, tag clouds for key themes.
    *   **Highlighting in Context:** If user clicks an insight (View R), the system might show the original document or description with the relevant text highlighted.
    *   **Icons:** For feedback (thumbs up/down), insight categories.
    *   **Alex's Avatar:** Present to guide and explain.

## 4.3. Screen: Configure Session Type (Mermaid: S, T)

*   **Mermaid Diagram ID:** S (Main Session Type Configuration screen), T (Templates or detailed options for a selected session type).

*   **Purpose:**
    *   To allow the Host to choose or customize the type of session they want to conduct.
    *   To provide predefined session templates based on common use cases (e.g., conflict resolution, brainstorming, feedback session, decision-making).
    *   To enable configuration of session parameters like duration, tools to be used (e.g., Q&A, polls, non-verbal feedback), and participant interaction rules.
    *   To leverage AI insights from the previous step to recommend suitable session types or configurations.

*   **Key UI Elements (View S - Main Configuration):**
    *   **Recap of AI Insights (Collapsible):** A brief summary or link back to the key findings from Screen 4.2.
    *   **Recommended Session Types Card (from Alex/AI):**
        *   Displays 1-2 suggested session types based on the conflict description and AI analysis.
        *   e.g., "Based on the described disagreement and desired outcomes, a 'Mediated Discussion' or 'Structured Problem Solving' session might be effective."
        *   Each recommendation has a brief explanation and a "Select" or "Customize" button.
    *   **Browse All Session Templates (View T - integrated or as modal/panel):**
        *   A list or grid of available session templates (e.g., "One-on-One Feedback," "Team Retrospective," "Stakeholder Briefing," "Conflict Resolution - 3 Party").
        *   Each template has a short description, typical duration, and key features/tools enabled by default.
        *   Option to "Preview" a template's structure.
    *   **"Start from Scratch" / "Custom Session" Option:** For experienced hosts or unique situations.
    *   **Selected Session Type Details (Appears after selection):**
        *   Name of selected template (editable).
        *   Estimated Duration (editable, e.g., 30 min, 1 hour, custom).
        *   **Key Features/Tools Toggle Switches:**
            *   Enable/Disable Real-time Transcription.
            *   Enable/Disable Live Translation (and language selection).
            *   Enable/Disable Q&A Panel.
            *   Enable/Disable Polls.
            *   Enable/Disable Anonymous Contributions (for certain features).
            *   Enable/Disable Non-verbal Feedback (e.g., raise hand, thumbs up/down).
        *   **Participant Permissions (if applicable at this stage):**
            *   e.g., "Allow participants to view full transcript post-session."
            *   e.g., "Allow participants to invite others." (Usually off by default).
    *   **Agenda Builder (Optional, more advanced):**
        *   A simple interface to outline key agenda items or phases for the session, with time allocations.
        *   Could be pre-filled if a template is chosen.
    *   **"Next: Add Participants" or "Save for Later" Button.**
    *   **"Back to AI Analysis" Button.**

*   **Voice Agent Interactions (Alex):** Alex acts as a facilitator and advisor in choosing and configuring the session.
    *   **Screen Introduction:**
        *   **Alex:** "Now let's think about the best way to structure this session. On this screen, you can choose a session type and configure its features. Based on my analysis of your input, I have a couple of recommendations."
    *   **Explaining Recommended Session Types:**
        *   **Cue:** Host views the "Recommended Session Types" card.
        *   **Alex:** "For the situation you described, a 'Mediated Discussion' could be helpful because it focuses on ensuring all parties get to speak and be heard in a structured way. Alternatively, 'Structured Problem Solving' helps break down the issue into manageable parts and brainstorm solutions. What are your thoughts?"
    *   **Guidance on Choosing Templates (View T):**
        *   **Cue:** Host browses all templates.
        *   **Alex:** "Each template here is designed for a specific purpose. For example, 'Team Retrospectives' are great for reflecting on past work, while 'One-on-One Feedback' sessions are tailored for individual discussions. Let me know if you want more details on any of them."
    *   **Advice on Feature Configuration:**
        *   **Cue:** Host is toggling feature switches.
        *   **Alex:** "Given the sensitivity you mentioned earlier, you might consider enabling 'Anonymous Q&A' to encourage more candid questions."
        *   **Alex:** "For sessions with many participants, enabling 'Non-verbal Feedback' like 'Raise Hand' can help manage the flow of conversation without interruptions."
        *   **Alex (If translation might be needed based on participant info, if available yet):** "If you're expecting participants who speak different languages, remember to enable 'Live Translation' and select the relevant languages."
    *   **Responding to Queries about Session Types/Features:**
        *   **User:** "Alex, what's the difference between 'Mediated Discussion' and 'Open Forum'?"
        *   **Alex:** "Good question! 'Mediated Discussion' usually involves more turn-taking rules and a facilitator guiding the conversation closely, often for resolving disagreements. 'Open Forum' is typically more free-flowing, suitable for brainstorming or general Q&A with a larger group. Which aspects are more important for your upcoming session?"

*   **Navigation:**
    *   Arrives from Screen 4.2 ("AI Problem Analysis Review").
    *   "Next: Add Participants" button proceeds to Screen 4.4.
    *   "Save for Later" saves the configuration and returns to the dashboard or a drafts list.
    *   "Back to AI Analysis" returns to Screen 4.2.
    *   Selecting a template might refresh the view with its specific default settings (View T details).

*   **Multimedia Aspects:**
    *   **Icons for Session Templates:** Visually distinct icons representing different session types.
    *   **Icons for Features/Tools:** Clear icons for Q&A, Polls, Translation, etc.
    *   **Alex's Avatar:** Present to offer recommendations and guidance.
    *   **Short Video Snippets (Optional in Help Section):** Brief videos demonstrating how different session types or features work in practice.

## 4.4. Screen: Add Participants & Send Invitations (Mermaid: U, X) - for Joint Remote

*   **Mermaid Diagram ID:** U (Main participant addition and invitation screen), X (Invitation message composition/preview or different invitation channel options).

*   **Purpose:**
    *   To enable the Host to add participants to the scheduled "Joint Remote" session.
    *   To allow customization of the invitation message.
    *   To send out invitations via email or other supported channels (e.g., shareable link, calendar integration).
    *   To manage participant roles or groups if applicable to the session type (e.g., "Party A," "Party B," "Observers").

*   **Key UI Elements (View U - Main Participant Management):**
    *   **Session Details Summary (Collapsible):** Displays selected session title, type, date/time (if scheduled, or indicates "To be scheduled" if it's a template for an ad-hoc session).
    *   **Participant Input Area:**
        *   Text field for entering email addresses (with auto-suggestions for known contacts/users).
        *   Option to "Import from CSV" or "Add from Address Book/Contacts."
    *   **Participant List:**
        *   Displays added participants with their email or name.
        *   Option to remove a participant.
        *   [Optional] Role assignment dropdown next to each participant (e.g., "Speaker," "Observer," or custom roles like "Team Lead," "Client Rep" defined by the host or session template).
        *   [Optional] Grouping: If the session involves distinct groups (e.g., for a mediation), UI to assign participants to "Group A" or "Group B".
    *   **Invitation Message Customization (View X - integrated or modal):**
        *   **Subject Line:** Pre-filled with session title, editable.
        *   **Message Body:**
            *   Pre-filled template including session details (title, purpose from Screen 4.1, date/time if set).
            *   Placeholders for participant name (e.g., "Dear [Participant Name],").
            *   Editable area for the Host to add a personal message or specific instructions.
            *   Option to include a brief explanation of "Understand-me" for new users.
        *   "Preview Invitation" button.
    *   **Scheduling Options (if not already set, or if it's a flexible invitation):**
        *   Date and Time picker.
        *   Option to "Find a common available time" (if calendar integration is available).
    *   **"Send Invitations" Button (Primary CTA).**
    *   **"Get Shareable Link" Option:** Generates a unique link that can be manually shared (bypassing direct email invites from the system).
    *   **"Save and Invite Later" Button.**
    *   **"Back to Session Configuration" Button.**

*   **Voice Agent Interactions (Alex):** Alex assists in making the invitation process smooth and considers sensitivities.
    *   **Screen Introduction:**
        *   **Alex:** "Great, your session is configured! Now, let's invite the participants. You can add them by typing their email addresses or importing a list. Who needs to be part of this conversation?"
    *   **Guidance on Adding Participants:**
        *   **Cue:** Host starts adding emails.
        *   **Alex:** "If you've communicated with these individuals through 'Understand-me' before, I can try to auto-suggest them as you type."
        *   **Alex (If roles/groups are relevant based on session type from 4.3):** "For this type of session, it can be helpful to assign roles or group participants. For example, are there distinct 'sides' or specific roles like 'mediator' or 'observer'?"
    *   **Advice on Invitation Message (View X):**
        *   **Cue:** Host is editing the invitation message.
        *   **Alex:** "The standard invitation includes all the key details. Adding a personal note can make it more welcoming. You might also want to briefly explain what 'Understand-me' is if some participants are new to it. I can add a standard sentence about that if you like."
        *   **Alex (If the session is about a conflict):** "Consider the tone of your message. A neutral and inviting tone can help set a positive stage for the session, even if the topic is difficult."
    *   **Confirming Before Sending:**
        *   **Cue:** Host clicks "Send Invitations."
        *   **Alex:** "Just to confirm, you're about to send invitations to [Number] participants for the session '[Session Title]'. Ready to send?"
    *   **Explaining Shareable Links:**
        *   **Cue:** Host clicks "Get Shareable Link."
        *   **Alex:** "Here's a unique link for your session. Anyone with this link can join, so be mindful of where you share it. This is useful if you don't have email addresses or want to post it in a team chat."

*   **Navigation:**
    *   Arrives from Screen 4.3 ("Configure Session Type").
    *   "Send Invitations" proceeds to Screen 4.5 ("Track Invitation Status") or a confirmation message.
    *   "Get Shareable Link" provides the link and might also move to Screen 4.5.
    *   "Save and Invite Later" saves the participant list and configuration, returning to the dashboard or drafts.
    *   "Back to Session Configuration" returns to Screen 4.3.

*   **Multimedia Aspects:**
    *   **User Avatars/Initials:** Displayed in the participant list if known.
    *   **Calendar Icon:** For scheduling options.
    *   **Email Preview (View X):** A clear visual representation of what the email invitation will look like.
    *   **Alex's Avatar:** Present for guidance.

## 4.5. Screen: Track Invitation Status (Mermaid: Y, Z, AA, AB, AC) - for Joint Remote

*   **Mermaid Diagram ID:** Y (Main invitation status tracking dashboard for a session), Z (Participant status: Accepted), AA (Participant status: Declined), AB (Participant status: Pending/Sent), AC (Actions like Resend/Edit Invitation).

*   **Purpose:**
    *   To provide the Host with a clear overview of the status of invitations sent for a specific "Joint Remote" session.
    *   To allow the Host to see who has accepted, declined, or not yet responded.
    *   To enable follow-up actions such as resending invitations or editing participant details if necessary.
    *   To help the Host anticipate attendance and manage session logistics.

*   **Key UI Elements (View Y - Main Tracking Dashboard):**
    *   **Session Details Header:** Displays the Session Title, Date, and Time.
    *   **Overall Status Summary:**
        *   Visual representation (e.g., donut chart or progress bars) showing percentages: Accepted (Z), Declined (AA), Pending/No Response (AB).
        *   Counts: e.g., "5/10 Accepted," "1 Declined," "4 Pending."
    *   **Participant List Table:**
        *   **Column: Participant Name/Email.**
        *   **Column: Status** (e.g., "Accepted," "Declined," "Pending," "Email Bounced"). Color-coded icons or tags for quick visual identification. (Z, AA, AB)
        *   **Column: Role** (if defined in 4.4).
        *   **Column: Last Updated** (Timestamp of their response or last invite sent).
        *   **Column: Actions (AC):**
            *   For "Pending": "Resend Invitation," "Edit Invitation" (e.g., to correct email, resend to a different address).
            *   For "Declined": (May show a reason if the participant provided one via an RSVP form). Option to "Remove from session."
            *   For "Accepted": (Usually no action, but could have "View Profile" if integrated).
            *   Option to "Add New Participant" (takes back to a simplified version of Screen 4.4).
    *   **Filter/Sort Options for Participant List:**
        *   Filter by Status (Accepted, Declined, Pending).
        *   Sort by Name, Status, Last Updated.
    *   **Bulk Actions (Optional):**
        *   "Resend to all Pending."
        *   "Send Reminder to all Pending."
    *   **"Start Session" Button (becomes active when session time approaches or if it's an ad-hoc session ready to begin).**
    *   **"Edit Session Details" (e.g., time, configuration - links back to 4.3).**
    *   **"Cancel Session" Button.**
    *   **"Back to Dashboard" Link.**

*   **Voice Agent Interactions (Alex):** Alex helps the Host interpret the status and suggests actions.
    *   **Screen Introduction/Summary:**
        *   **Cue:** Host navigates to this screen.
        *   **Alex:** "Here's the current status of your invitations for '[Session Title]'. It looks like [Number] people have accepted so far. You can see the details for each participant below."
    *   **Highlighting Key Information:**
        *   **Cue:** A significant number of declines or pending invitations.
        *   **Alex:** "I notice that [Number] invitations are still pending and the session is scheduled for [Date/Time]. You might want to consider resending the invitation or following up with those who haven't responded."
        *   **Alex (If an email bounced):** "It seems the email to [Participant Name/Email] couldn't be delivered. You might want to check the address and try resending." (AB, AC)
    *   **Suggesting Actions (AC):**
        *   **Cue:** Host is viewing a participant with "Pending" status.
        *   **Alex:** "If you'd like to send a reminder to [Participant Name], you can use the 'Resend Invitation' option. You can also edit the original invitation if you need to update their details."
    *   **Answering Questions about Statuses:**
        *   **User:** "Alex, what happens if someone declines?"
        *   **Alex:** "If a participant declines, their status will show as 'Declined' (AA). They won't receive further reminders for this session. If they provided a reason, it might be visible here, depending on how they RSVP'd."
    *   **Preparing for the Session:**
        *   **Alex (As session time nears):** "Your session is approaching! It looks like [Number] participants have accepted. The 'Start Session' button will become active shortly before the scheduled time."

*   **Navigation:**
    *   Arrives from Screen 4.4 ("Add Participants & Send Invitations") or by selecting a scheduled session from the Main Dashboard / Session History.
    *   Actions (AC) like "Resend Invitation" or "Edit Invitation" might open a modal or a focused view.
    *   "Add New Participant" would likely navigate back to a simplified version of Screen 4.4 or open a modal for quick addition.
    *   "Edit Session Details" navigates back to Screen 4.3.
    *   "Start Session" (when active) navigates to the live session environment.

*   **Multimedia Aspects:**
    *   **Color-Coded Status Indicators:** Green for Accepted (Z), Red for Declined (AA), Yellow/Grey for Pending (AB) for quick visual scanning.
    *   **Icons:** For different statuses and actions (e.g., resend, edit, delete).
    *   **Progress Charts:** For overall status summary.
    *   **Alex's Avatar:** Present for proactive suggestions and explanations.

This concludes Part 4.
