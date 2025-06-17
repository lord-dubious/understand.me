# Part 6: Pre-Session Preparation (Converged Path)

This part of the Development Guide focuses on the final steps before a session begins, where inputs from the Host and Participants (if they've provided their perspective) are synthesized. It also covers setting session goals, rules, and specific setup for same-device scenarios. This path is "converged" as it involves both Host and potentially Participant views or actions leading into the session.

## 6.1. Screen: AI Synthesizes All Inputs & Dynamic Adaptation (Mermaid: AJ, AK)

*   **Mermaid Diagram ID:** AJ (Main screen displaying synthesized insights from Host and Participant inputs), AK (Represents how the session plan or AI's understanding dynamically adapts or drills down into combined insights).

*   **Purpose:**
    *   To present a consolidated view of key themes, sentiments, and potential areas of agreement or disagreement, derived from both Host's description (Screen 4.1/4.2) and Participants' perspectives (Screen 5.4), including analysis of any uploaded multimedia files.
    *   To highlight common ground and differences in understanding between parties.
    *   To allow the Host (and potentially participants, if settings allow for pre-session transparency) to see a more holistic picture.
    *   To enable the AI (and Alex) to dynamically suggest adaptations to the session plan, talking points, or focus areas (AK).
    *   This screen is primarily for the Host, but a simplified version or summary might be shared with participants if appropriate for the session type.

*   **Key UI Elements (View AJ - Primarily Host View):**
    *   **Combined Input Summary (Collapsible):** Links or brief summaries of the Host's initial description and a note on how many participants shared their perspectives.
    *   **Key Themes - Converged View Card:**
        *   Identifies themes that emerged from *all* inputs (Host and Participants).
        *   Highlights themes unique to Host or Participants, or where perspectives differ significantly.
        *   e.g., "Common theme: 'Timeline Concerns'. Host emphasizes 'budget impact,' while Participant A highlights 'resource availability'."
    *   **Sentiment Overview - Combined Card:**
        *   Shows overall sentiment from Host's input vs. aggregated sentiment from Participants' inputs.
        *   Points out significant differences or shared strong emotions.
    *   **Areas of Agreement/Common Ground Card:**
        *   AI identifies and lists points where Host and Participants seem to be aligned.
        *   e.g., "All parties agree that 'finding a resolution quickly' is important."
    *   **Potential Areas of Divergence/Conflict Card:**
        *   Highlights specific points where perspectives or stated facts appear to contradict or differ significantly.
        *   e.g., "Host's document states 'X,' Participant A's input suggests 'Y'." (Links to sources if possible - AK).
    *   **Key Personality Insights Snapshot (if data from Screen 2.3 is used and relevant):**
        *   e.g., "Host preference: Direct communication. Participant A preference: Prefers detailed explanations." (AK) - This insight could inform Alex's interaction or suggest approaches for the host.
    *   **AI Suggested Focus Areas/Adaptations (View AK - integrated):**
        *   "Based on the combined input, consider starting the discussion with [Specific Topic from Agreement Card]."
        *   "It might be useful to allocate more time to discuss the differences regarding [Specific Topic from Divergence Card]."
        *   "The AI suggests preparing questions that bridge the different perspectives on [Theme]."
    *   **Feedback on Synthesis:** Host can rate usefulness of this synthesized view or specific points.
    *   **"Next: Establish Session Goals & Rules" Button.**

*   **Voice Agent Interactions (Alex):** Alex helps the Host (primarily) understand the synthesized information and its implications.
    *   **Screen Introduction (Host View):**
        *   **Alex:** "We've now combined your initial information with the perspectives shared by [Number] participant(s). This screen summarizes the key points from all inputs, highlighting common ground and areas where views might differ. This can help us fine-tune the session plan."
    *   **Explaining Converged Insights:**
        *   **Cue:** Host examines a "Converged Themes" or "Divergence" card.
        *   **Alex:** "Here, you can see where your focus overlaps with the participants' and where there are unique points. For example, it seems everyone is concerned about [Common Theme], but there are different ideas about [Diverging Aspect]. This is a good area to explore in the session."
        *   **Alex (Regarding personality insights - AK):** "I've also looked at the communication preferences shared earlier. For instance, you prefer getting straight to the point, while some participants might appreciate more context. Keeping this in mind can help ensure everyone feels understood during the session."
    *   **Highlighting AI Suggested Adaptations (AK):**
        *   **Alex:** "Based on this synthesis, I'd suggest starting the session by acknowledging the shared goal of [Common Ground Point]. Then, it might be productive to gently explore the different views on [Divergence Point]. What do you think?"
    *   **If Participants also see a (simplified) version of this screen:**
        *   **Alex (Participant View):** "To help everyone prepare, the host is sharing a summary of key themes that have emerged from the initial thoughts shared. This can give you a sense of the topics the session will likely cover." (Privacy of individual contributions is key here).

*   **Navigation:**
    *   Accessed after Host and (some/all) Participants have provided their initial inputs (if applicable).
    *   Primarily for the Host. Participants might see a very simplified, anonymized summary if the Host chooses to share it pre-session.
    *   "Next: Establish Session Goals & Rules" button proceeds to Screen 6.2.
    *   Links might allow drilling down into specific inputs that formed the synthesis (respecting privacy - e.g., Host can see all, Participants only their own).

*   **Multimedia Aspects:**
    *   **Visualizations:**
        *   Comparative charts for sentiment (Host vs. Participants).
        *   Venn diagrams or overlapping circles to show common and unique themes.
        *   Highlighted text snippets from various inputs (anonymized if shown to participants).
    *   **Icons:** To denote agreement, divergence, sentiment.
    *   **Alex's Avatar:** Present to guide the Host through the synthesis.

## 6.2. Screen: Establish Session Goals & Rules (Mermaid: AL, AM)

*   **Mermaid Diagram ID:** AL (Goal Setting section/view), AM (Rule Setting section/view). These might be combined on one scrollable screen or be two steps.

*   **Purpose:**
    *   To clearly define and agree upon the objectives for the upcoming session (AL).
    *   To establish a set of communication guidelines or ground rules for participant interaction during the session (AM).
    *   To ensure all participants (once shared) understand the expectations and how the session will be conducted.
    *   AI/Alex suggests initial goals and rules based on the synthesized inputs and chosen session type, which the Host can then review, edit, and confirm.

*   **Key UI Elements:**
    *   **View AL: Establish Session Goals**
        *   **Headline:** "Session Goals" or "What do we want to achieve?"
        *   **AI-Suggested Goals List:**
            *   Based on Screen 6.1 synthesis (e.g., desired outcomes from Host/Participant inputs, resolving key divergences).
            *   e.g., "1. Clarify understanding of budget constraints. 2. Identify 2-3 potential solutions for resource allocation. 3. Agree on next steps and responsibilities."
            *   Each suggested goal is editable (text input).
            *   Option to delete a suggested goal.
        *   **"Add New Goal" Button.**
        *   **Host's Prioritization (Optional):** Drag-and-drop to reorder goals or mark as "Primary," "Secondary."
    *   **View AM: Establish Session Rules/Guidelines**
        *   **Headline:** "Session Rules" or "Communication Guidelines."
        *   **AI-Suggested Rules List (based on session type, potential sensitivity from synthesis):**
            *   e.g., "1. Listen actively without interrupting. 2. Focus on the issue, not the person. 3. All ideas are welcome (brainstorming). 4. One person speaks at a time (especially for same-device setup). 5. Commit to confidentiality."
            *   Each rule is editable.
            *   Option to delete a suggested rule.
        *   **"Add New Rule" Button.**
        *   **Browse Standard Rule Sets (Optional):** Predefined sets like "Basic Meeting Rules," "Conflict Resolution Rules," "Brainstorming Rules."
    *   **Confirmation/Sharing Options:**
        *   "Confirm Goals & Rules" Button.
        *   Option: "Share these with participants for review before the session?" (Checkbox, if the platform supports pre-session material distribution beyond the initial invite).
    *   **"Back to AI Synthesis" Button.**
    *   **"Next: [Final Step before Waiting Room/Session Start or Same-Device Setup if applicable]" Button.**

*   **Voice Agent Interactions (Alex):** Alex facilitates the goal and rule-setting process, explaining the rationale behind AI suggestions.
    *   **Screen Introduction:**
        *   **Alex:** "Now that we have a clearer picture from all inputs, let's define the specific goals for this session and some ground rules for communication. Clear goals and rules help everyone stay focused and ensure a respectful discussion."
    *   **Explaining AI-Suggested Goals (AL):**
        *   **Cue:** Host reviews suggested goals.
        *   **Alex:** "Based on the key divergences and desired outcomes identified earlier, I've suggested a few potential goals like '[mention one goal]'. Do these align with what you hope to achieve? You can edit them, add new ones, or reorder them."
        *   **Alex (If Host adds a vague goal):** "That's a good starting point. To make it even clearer, could we phrase it as an actionable outcome? For example, instead of 'Discuss budget,' perhaps 'Agree on budget allocation for Q3'?"
    *   **Explaining AI-Suggested Rules (AM):**
        *   **Cue:** Host reviews suggested rules.
        *   **Alex:** "I've also proposed some communication guidelines. For instance, because different perspectives were noted on [topic], a rule like 'Listen actively and seek to understand before responding' might be helpful. Feel free to adjust these to fit the group."
        *   **Alex (If same-device setup is anticipated):** "Since this might be a same-device session, I've included 'One person speaks at a time' and 'Pass the device respectfully'. These are crucial for smooth same-device interactions."
    *   **Regarding Sharing with Participants:**
        *   **Cue:** Host considers the "Share with participants" option.
        *   **Alex:** "Sharing the goals and rules beforehand can help everyone come prepared and on the same page. If you choose to share, participants will be able to see them before the session starts."

*   **Navigation:**
    *   Arrives from Screen 6.1 ("AI Synthesizes All Inputs").
    *   "Confirm Goals & Rules" leads to the next step, which could be:
        *   Screen 6.3 ("Same-Device Setup") if that mode is chosen.
        *   A session waiting room or a final confirmation before the session starts for remote participants.
    *   "Back to AI Synthesis" returns to Screen 6.1.

*   **Multimedia Aspects:**
    *   **Icons:** For goals (e.g., target icon) and rules (e.g., checklist, gavel icon).
    *   **Editable List UI:** Clean, user-friendly interface for adding, editing, and deleting text items.
    *   **Alex's Avatar:** Present to provide suggestions and rationale.

## 6.3. Screen: Same-Device Setup (Mermaid: V, AN, AO, AP)

*   **Mermaid Diagram ID:** V (Introduction to Same-Device Mode), AN (User Identification/Order for Same-Device), AO (Sequential Mini-Personality Assessment for Same-Device users, if needed), AP (Tap-to-Talk or Speaker Switching Training).

*   **Purpose:**
    *   To configure "Understand-me" for use by multiple participants on a single shared device (e.g., a tablet in a meeting room).
    *   To identify each participant who will use the device for accurate speaker attribution in the transcript.
    *   To conduct a very brief "mini-assessment" for any participant on the device who hasn't previously completed the Conversational Personality Assessment (Screen 2.3), focusing on essential interaction preferences for the AI.
    *   To train users on the specific mechanism for indicating who is currently speaking (e.g., "tap-to-talk" button, voice signature detection if advanced).
    *   This flow is typically initiated by the Host or the first user on the shared device.

*   **Key UI Elements:**
    *   **View V: Introduction to Same-Device Mode**
        *   **Headline:** "Setting Up for Same-Device Use" or "Joining on This Device."
        *   **Explanation:** "This mode allows multiple people to participate in the session using this single device. We'll quickly identify each person and show you how to make sure everyone's contributions are captured accurately."
        *   **Number of Participants Input:** "How many people will be using this device for the session?" (Input field).
        *   **"Start Setup" Button.**
    *   **View AN: User Identification/Order**
        *   **Headline:** "Who's Participating on This Device?"
        *   Dynamically displays input fields based on the number provided in View V (e.g., "Participant 1 Name," "Participant 2 Name," etc.).
        *   Option to "Use existing profile" if a participant is already an "Understand-me" user (prompts login or selection from a list if host is logged in).
        *   Simple avatars or color-coding assigned to each participant for the session.
        *   "Next: Quick Check-in" Button.
    *   **View AO: Sequential Mini-Personality Assessment (for new users on this device)**
        *   **Headline (per user):** "Quick Check-in for [Participant Name]."
        *   Displays 1-2 key questions from the full assessment (Screen 2.3) focusing on interaction style relevant for AI understanding in a group setting. (e.g., "Do you prefer to gather your thoughts before speaking, or think out loud?"). This is *very* brief.
        *   Simple multiple-choice answers.
        *   "Next" button for each participant, then "Continue to Speaking Practice."
        *   If all users on the device have existing profiles with assessment data, this step is skipped.
    *   **View AP: Tap-to-Talk / Speaker Switching Training**
        *   **Headline:** "How to Speak: Tap-to-Talk."
        *   **Visual Demonstration:** An animation or short video showing how to use the tap-to-talk feature (e.g., a button with "[Participant Name], Tap to Speak").
        *   **Interactive Practice:**
            *   Each identified participant gets a chance to tap their "button" and say a sample phrase.
            *   Visual feedback on screen confirming "[Participant Name] is now speaking."
            *   e.g., "Okay, [Participant 1 Name], please tap your button and say 'Hello, this is my voice.'"
        *   **Reinforcement of Rules:** "Remember to tap your button before you speak and tap again when you're done, or pass to the next person."
        *   **"Ready to Join Session" / "Go to Waiting Room" Button.**

*   **Voice Agent Interactions (Alex):** Alex guides all users on the shared device through this setup.
    *   **Introduction (V):**
        *   **Alex:** "Welcome! It looks like you'll be sharing this device for the session. That's great! To make sure everyone is heard clearly and the transcript is accurate, we'll do a quick setup. First, how many people will be using this device today?"
    *   **User Identification (AN):**
        *   **Cue:** After number of participants is entered.
        *   **Alex:** "Okay, let's get everyone's name. We'll go one by one. Participant 1, could you please tell me your name? If you already have an 'Understand-me' profile, you can also log in to use it."
        *   (Repeats for each participant) "Thanks, [Participant 1 Name]. Now for Participant 2..."
    *   **Mini-Assessment (AO - if needed, per participant):**
        *   **Alex:** "Hi [Participant Name], since this is your first time or we don't have your preferences for this device, I'll ask just one quick question to help tailor the experience. When you're discussing ideas, do you generally prefer to [Option A] or [Option B]?"
        *   **Alex:** "Thanks! That's helpful."
    *   **Tap-to-Talk Training (AP):**
        *   **Alex:** "Great, everyone's identified! Now, let's practice how to speak in the session. Because you're sharing a device, you'll need to tap a button to let 'Understand-me' know who's talking. See the button with your name? When it's your turn, tap it, speak, and then tap again if needed, or the next person can tap their button."
        *   **Alex (During practice):** "Okay, [Participant 1 Name], your turn. Tap your button and say a short phrase like 'Testing my voice.'"
        *   **(After successful test):** "Perfect! I heard you, [Participant 1 Name]. Now, [Participant 2 Name], your turn."
        *   **Alex (If someone forgets to tap):** "Oops, it looks like someone spoke but didn't tap their button. Remember to tap your name before speaking so I can get the transcript right!"
    *   **Final Confirmation:**
        *   **Alex:** "Excellent, everyone's set up for same-device use! You're now ready to join the session. Remember the tap-to-talk rule, and have a productive discussion!"

*   **Navigation:**
    *   Typically initiated by the Host from Screen 6.2 or from the session's main control panel if "Same-Device Mode" is selected.
    *   Flows sequentially from V -> AN -> AO (if needed) -> AP.
    *   "Ready to Join Session" / "Go to Waiting Room" proceeds to the actual session or its waiting area.
    *   Option to "Go Back" to a previous step if a mistake was made (e.g., wrong number of participants).

*   **Multimedia Aspects:**
    *   **User Avatars/Color Indicators:** Assigned in step AN and used in AP for tap-to-talk buttons.
    *   **Animation/Short Video:** For demonstrating tap-to-talk in AP.
    *   **Visual Feedback:** Highlighting active speaker's button during practice in AP.
    *   **Alex's Avatar:** Prominently guiding the multi-user setup.

This concludes Part 6.
