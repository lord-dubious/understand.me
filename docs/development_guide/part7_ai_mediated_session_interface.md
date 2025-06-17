# Part 7: AI-Mediated Session Interface (The Five Phases)

This part of the Development Guide describes the user interface and interaction flow within an active "Understand-me" AI-mediated session. The session is structured around five distinct phases, each designed to guide participants towards understanding and resolution. This section details common UI elements present throughout the session, followed by specifics for each phase.

## 7.1. Common Session Interface Elements

These UI elements are generally visible and accessible throughout all five phases of an AI-mediated session, providing consistent functionality and context.

*   **Purpose:**
    *   To provide a consistent and predictable interface structure for users.
    *   To offer easy access to essential information, tools, and controls throughout the session.
    *   To clearly indicate the current state and progress of the session.

*   **Key UI Elements:**
    *   **A. Session Header:**
        *   **Content:** Session Title, Current Phase Name (e.g., "Phase 1: Prepare"), Estimated Time Remaining for current phase/overall session (dynamic).
        *   **Controls:** "Leave Session" button, "Help" button, "Settings" (for user-specific settings like font size, notifications).
        *   **Branding:** "Understand-me" logo.
    *   **B. AI Panel (Alex's Hub):**
        *   **Visibility:** Persistently visible, perhaps as a collapsible sidebar or a prominent section.
        *   **Content:**
            *   **Alex's Avatar & Current Status/Suggestion:** e.g., "Alex is listening," "Alex suggests focusing on [topic]," "Next, [Participant Name] will speak."
            *   **Key Instructions/Guidance:** Contextual instructions or tips from Alex relevant to the current phase or user action.
            *   **Session Goals & Rules Display:** Quick access to view the established goals and rules (from Screen 6.2).
            *   **AI-Generated Summaries/Insights (Dynamic):** As the session progresses, Alex might post concise summaries or relevant insights here.
            *   **Private Interaction with Alex:** A small text input or button for users to ask Alex a question privately (e.g., "Alex, what does this term mean?", "Alex, I'm feeling unsure how to phrase this.").
    *   **C. Main Interaction Area / Message Thread / Transcript View:**
        *   **Content:** Displays the real-time transcription of spoken dialogue, speaker attribution, and key interaction events (e.g., "Poll started," "[User] shared a file").
        *   **Appearance:** Chat-like bubbles or a continuous transcript. Timestamps for entries.
        *   **Features:** Searchable, scrollable. Users might be able to react (e.g., with emojis if appropriate for the session type) or privately bookmark certain messages.
    *   **D. Multimedia Context Panel:**
        *   **Visibility:** Collapsible panel or tabbed section.
        *   **Content:** Displays relevant multimedia files or contextual information shared by the Host (from Screen 4.1) or Participants (from Screen 5.4 or during the session).
        *   **Functionality:** Allows viewing of documents, images, or playing short audio/video snippets directly within the interface without losing context of the conversation. Helps ground the discussion in shared facts or previously stated perspectives.
    *   **E. Input Area (for Text-Based Contributions):**
        *   **Content:** A standard text input field for users to type messages, respond to prompts, or contribute to brainstorming activities.
        *   **Controls:** "Send" button, formatting options (bold, italics, lists - if applicable), attach file button (if allowed during the session).
        *   **Voice Input Toggle:** Microphone icon to switch to voice input for transcription directly into this area or for "tap-to-talk."
    *   **F. Same-Device Specifics (Overlay or Footer Controls when in Same-Device Mode - Screen 6.3):**
        *   **Active Speaker Indicator:** Clearly shows which participant (e.g., "[Participant 1 Name]'s turn") is currently designated to speak.
        *   **"Tap-to-Talk" Buttons:** Individual buttons for each participant sharing the device (e.g., "[P1 Name] - Tap to Speak," "[P2 Name] - Tap to Speak"). Only one can be active at a time.
        *   **Turn Management Visuals:** May show the speaking order if one has been established.
        *   **Pass Control Button:** A way to explicitly pass the "speaking turn" to the next person if not using individual tap-to-talk buttons for each utterance.

*   **Voice Agent Interactions (Alex):** Alex's presence is woven through these common elements, primarily via the AI Panel.
    *   **General Guidance:** Alex uses the AI Panel to provide ongoing instructions, reminders about goals/rules, and phase-specific guidance.
    *   **Facilitating Transitions:** "We're now moving to Phase 2: Express. In this phase, each of you will have a chance to..."
    *   **Responding to Private Queries:** If a user asks Alex a question via the AI Panel, Alex responds privately there.
    *   **Moderation Cues (Subtle):** "Let's remember to allow everyone a chance to speak." or "That's an interesting point. Let's see how it connects to our main goal of..."

*   **User Interactions:**
    *   Users interact with the various panels to get information, view context, type messages, or manage their speaking turn (in same-device mode).
    *   They can view the live transcript and refer to shared multimedia.
    *   They can interact with Alex privately for help or clarification.

*   **Navigation:**
    *   Navigation between phases is generally linear and guided by Alex or the Host.
    *   Users can expand/collapse panels (AI Panel, Multimedia Context Panel) as needed.
    *   Scrolling through the transcript/message thread.

*   **Multimedia Context Utilization:**
    *   The Multimedia Context Panel provides a central place to access files (documents, images, audio/video snippets) shared by the host or participants.
    *   Alex or the Host might prompt users to refer to a specific document in this panel during discussions (e.g., "Let's all look at the 'Budget Proposal' document in the Context Panel.").
    *   AI might extract key information from these documents to display as insights in the AI Panel or to inform its understanding during different phases.

## 7.2. Screen: Phase 1 - Prepare (Mermaid: AX)

*   **Mermaid Diagram ID:** AX (Represents the first phase of the AI-mediated session: "Prepare").

*   **Purpose:**
    *   To formally begin the session and welcome all participants.
    *   To reiterate the session's agreed-upon goals and communication rules (from Screen 6.2).
    *   To present a very brief, neutral summary of the key topic or situation, possibly drawing from the AI synthesis (Screen 6.1), to ensure everyone starts with a shared baseline.
    *   To allow participants a moment to mentally prepare and confirm their readiness.
    *   To set a calm and focused tone for the session.

*   **Key UI Elements:**
    *   **Common Elements:** Header, AI Panel, Message Thread, Multimedia Context Panel, Input Area, Same-Device Specifics are all present.
    *   **Main Interaction Area / Message Thread:**
        *   Displays a welcome message from Alex.
        *   Shows the Session Goals and Rules prominently at the start of this phase.
        *   May display a brief, AI-generated neutral summary of the session topic.
    *   **AI Panel (Alex's Hub):**
        *   Alex's current status: "Welcome! Let's prepare for the session."
        *   Key instruction: "Please review the Session Goals and Rules. We'll begin shortly."
        *   A "Ready to Start" or "Acknowledge" button might appear for each participant to click, signaling their preparedness.
    *   **Multimedia Context Panel:** May be highlighted if specific documents are key to understanding the initial context (e.g., "Alex suggests reviewing 'Project Brief.pdf' before we begin").

*   **Voice Agent Interactions (Alex):** Alex takes the lead in initiating this phase.
    *   **Welcoming Participants:**
        *   **Alex:** "Welcome everyone to the session: '[Session Title]'. I'm Alex, and I'll be helping to guide our conversation today."
        *   **Alex (If there are users on a same-device setup):** "For those sharing a device, please remember to use the 'tap-to-talk' feature so we can capture your contributions accurately."
    *   **Reviewing Goals and Rules:**
        *   **Alex:** "To start, let's quickly review the goals we aim to achieve and the communication guidelines we've agreed on. You can see them displayed in the main area now." (Pauses for participants to read).
        *   **Alex:** "Our main goals are: [Briefly lists 1-2 key goals]. And our key rules for interaction include: [Briefly lists 1-2 key rules, e.g., 'Listen respectfully' and 'Focus on the issue']."
        *   **Alex:** "Does anyone have any clarifying questions about the goals or rules before we proceed?" (Host or Alex can respond).
    *   **Presenting Neutral Summary (Optional):**
        *   **Alex:** "This session focuses on [brief, neutral summary of the topic from AI Synthesis, e.g., 'discussing the timeline for Project Omega and addressing potential challenges']. The aim is to reach a shared understanding and agree on the next steps."
    *   **Checking Readiness:**
        *   **Alex:** "Please take a moment to review this information. When you're ready to begin, you can select the 'Ready' button in the AI Panel, or I'll check in with each of you."
        *   **(If using voice check-in, especially for same-device):** "Let's quickly confirm everyone is ready. [Participant 1 Name], are you ready to begin?" (Waits for verbal confirmation or button tap). "[Participant 2 Name], are you ready?"

*   **User Interactions:**
    *   Participants read the goals, rules, and any summary information.
    *   They might ask clarifying questions about goals/rules via voice or text input.
    *   They indicate their readiness (e.g., by clicking a "Ready" button or verbally confirming).
    *   Host can also signal readiness or respond to questions.

*   **Navigation:**
    *   This is the first screen/phase upon entering the live session environment.
    *   Once all (or a quorum of) participants are ready, Alex will announce the transition to Phase 2: Express.
    *   "Alex, I have a question about the rules." (User can interrupt for clarification).

*   **Multimedia Context Utilization:**
    *   The Multimedia Context Panel might be pre-loaded with key documents referenced in the goals or initial summary.
    *   Alex might say: "As a reminder, the full project proposal that outlines [key point] is available in the Multimedia Context Panel for your reference during the session."

## 7.3. Screen: Phase 2 - Express (Mermaid: AY, BA, BB)

*   **Mermaid Diagram ID:** AY (General view of the Express phase), BA (Active Speaker's specific UI/highlight), BB (Listener's UI, including Same-Device turn indicators).

*   **Purpose:**
    *   To provide each participant with a dedicated opportunity to express their perspective, feelings, and information related to the session topic without interruption.
    *   To ensure all voices are heard systematically.
    *   To gather the raw input that will be used in subsequent phases for understanding and resolution.
    *   Alex manages speaking turns and time, ensuring adherence to the established rules.

*   **Key UI Elements:**
    *   **Common Elements:** Header, AI Panel, Message Thread, Multimedia Context Panel, Input Area, Same-Device Specifics are present.
    *   **Main Interaction Area / Message Thread (AY):**
        *   Real-time transcription of the current speaker's contribution.
        *   Clear visual indication of who is currently speaking (BA) (e.g., highlighted name, avatar, border around their video if video is on).
        *   For listeners (BB), this area primarily shows the ongoing transcription.
    *   **AI Panel (Alex's Hub):**
        *   **Speaker Turn Management:**
            *   Displays the speaking order (e.g., "Speaking Order: 1. [P1 Name], 2. [P2 Name], 3. [Host Name]").
            *   Current Speaker: "[P1 Name] is now speaking."
            *   Next Speaker: "Up next: [P2 Name]."
            *   Timer: Shows time remaining for the current speaker (if time limits are set).
        *   **Guidance for Current Speaker (BA):** "It's your turn, [P1 Name]. Please share your perspective on the session topic. What are your key thoughts, feelings, and any information you want to share?"
        *   **Guidance for Listeners (BB):** "Please listen actively while [P1 Name] is speaking. You'll have your turn soon. You can jot down notes privately if you wish [feature for private notes could exist]."
        *   **"Request to Speak" Button (Optional):** If the turn order is flexible or if someone needs to interject for urgent clarification (Alex would mediate this).
    *   **Same-Device UI Specifics (BB, integrated with common element F):**
        *   **Active Speaker Highlight:** The "Tap-to-Talk" button for the current speaker ([P1 Name]) is highlighted or shows an "Active" state.
        *   **Listener Buttons:** Buttons for other users on the same device ([P2 Name], [P3 Name]) are visible but inactive, perhaps showing "Wait for your turn."
        *   Visual cue for passing the turn (e.g., a "Done Speaking / Pass Turn" button appears for the active speaker).

*   **Voice Agent Interactions (Alex):** Alex actively manages this phase.
    *   **Initiating the Phase:**
        *   **Alex:** "We're now in Phase 2: Express. This is where each of you will have dedicated time to share your perspective on the topic. We'll go in the following order: [Lists names]. [Participant 1 Name], you're first. Please take a few minutes to share your thoughts. I'll keep an eye on the time."
    *   **Managing Turns:**
        *   **Alex:** "Thank you, [Participant 1 Name]. Now it's [Participant 2 Name]'s turn. [Participant 2 Name], please share your perspective."
        *   **Alex (If using Same-Device Mode):** "[Participant 1 Name], thank you. Please tap your button to indicate you're done, or pass the device to [Participant 2 Name]. [Participant 2 Name], please tap your button when you're ready to speak."
    *   **Time Management:**
        *   **Alex (Subtle reminder):** "[Participant 1 Name], you have about one minute remaining for your initial sharing."
        *   **Alex (Concluding a turn):** "[Participant 1 Name], thank you for sharing. We'll need to move to the next person now to ensure everyone gets a chance."
    *   **Encouraging Expression & Adherence to Rules:**
        *   **Alex (If a speaker is hesitant):** "Take your time, [Participant Name]. What's most important for you to express right now regarding this topic?"
        *   **Alex (If someone interrupts):** "Hold that thought, [Interrupting Person's Name]. Let's allow [Current Speaker Name] to finish their thoughts. There will be time for responses and discussion in the next phase." (Reinforces rule from 6.2).
        *   **Alex (If someone is off-topic):** "That's an interesting point. Could you connect that back to the main session goal of [mention specific goal]?"
    *   **Handling Multimedia References:**
        *   **Alex (If a speaker refers to a previously uploaded document):** "For everyone's reference, [Speaker Name] is discussing points related to the '[Document Name]' which you can find in the Multimedia Context Panel."

*   **User Interactions:**
    *   **Active Speaker (BA):** Speaks (using microphone or tap-to-talk on same device). Can refer to notes or the Multimedia Context Panel.
    *   **Listeners (BB):** Listen actively. May take private notes. Wait for their turn.
    *   Users see the live transcript populate in the Main Interaction Area.
    *   If on a same device, users tap their button to speak and indicate they are finished.

*   **Navigation:**
    *   Arrives from Phase 1 ("Prepare").
    *   Alex guides the sequential progression through each participant's turn.
    *   Once all participants have had their initial turn to express, Alex will announce the transition to Phase 3: Understand.

*   **Multimedia Context Utilization:**
    *   Speakers may refer to documents or images in the Multimedia Context Panel to support their statements.
    *   Alex might remind users that these files are available if a speaker is trying to describe complex information already present in a shared file.

## 7.4. Screen: Phase 3 - Understand (Mermaid: BC)

*   **Mermaid Diagram ID:** BC (Represents the Understand phase, focusing on AI-driven perspective mapping, summaries, and clarification).

*   **Purpose:**
    *   To help participants understand each other's expressed perspectives from Phase 2.
    *   To use AI to summarize key points, identify similarities and differences, and highlight potential misunderstandings.
    *   To facilitate clarification and active listening.
    *   To integrate insights from multimedia files shared by participants or the host, connecting them to expressed viewpoints.
    *   Alex guides the exploration of these AI-generated summaries and perspective maps.

*   **Key UI Elements:**
    *   **Common Elements:** Header, AI Panel, Message Thread, Multimedia Context Panel, Input Area, Same-Device Specifics are present.
    *   **Main Interaction Area / Message Thread:**
        *   May initially display AI-generated summaries of each participant's expressed points from Phase 2.
        *   Shows questions and answers as participants seek clarification.
        *   Visual cues (e.g., icons, color-coding) linking statements to AI-identified themes or sentiments.
    *   **AI Panel (Alex's Hub) - Key Focus for this Phase:**
        *   **Perspective Summary/Mapping:**
            *   Displays AI-generated summaries of each participant's core statements from Phase 2.
            *   "Key Themes from [P1 Name]: [Theme A, Theme B]."
            *   "Key Themes from [P2 Name]: [Theme B, Theme C]."
            *   **Visual Perspective Map (Optional but powerful):** A visual representation (e.g., concept map, Venn diagram) showing common themes, unique points, and relationships between different perspectives. Could also map how uploaded files support or contradict certain points.
        *   **Areas of Alignment:** "It sounds like both [P1 Name] and [P2 Name] agree on [Common Theme/Point]."
        *   **Potential Misunderstandings/Divergences:** "There seems to be a difference in how [Topic X] is viewed. [P1 Name] mentioned [Point A from P1's files/speech], while [P2 Name] focused on [Point B from P2's files/speech]. Could we explore this further?"
        *   **Clarification Prompts:** Alex might pose questions to the group or individuals to encourage deeper understanding, e.g., "[P1 Name], when you said [Quote], what did you mean by that in relation to [Topic]?" or "Can anyone rephrase what [P2 Name] shared about [Issue X] to ensure we all understood?"
        *   **Sentiment Analysis Recap:** Brief summary of emotions expressed, if significant, and how they relate to key topics.
    *   **Multimedia Context Panel:**
        *   Relevant files may be automatically highlighted by Alex/AI when they relate to a point being discussed or summarized. E.g., "The point about 'budget constraints' is detailed in 'Financials_Q3.pdf' (p.4) in the Context Panel."

*   **Voice Agent Interactions (Alex):** Alex facilitates understanding and clarification.
    *   **Initiating the Phase:**
        *   **Alex:** "Thank you all for sharing your perspectives. We're now in Phase 3: Understand. In this phase, we'll focus on making sure everyone has a clear understanding of what has been shared. I've summarized the key points from each of you in the AI Panel and highlighted some common themes and potential areas for clarification."
    *   **Guiding Exploration of AI Summaries/Maps:**
        *   **Alex:** "Let's start by looking at the key themes. It appears [Theme X] was mentioned by several people. [P1 Name], your perspective on this included [Point A], and [P2 Name], you mentioned [Point B]. Do you both feel these summaries capture your main ideas accurately?"
        *   **Alex (Referring to a visual map):** "If you look at the Perspective Map in the AI Panel, you can see where your points overlap and where they diverge. For example, the concern about 'deadlines' seems to be a shared one."
    *   **Facilitating Clarification:**
        *   **Alex:** "[P3 Name], you mentioned [Specific Point]. [P1 Name], could you share how you understood that point, or if you have any questions about it?" (Encouraging active listening and paraphrasing).
        *   **Alex:** "A question has been typed: '[User's typed question for clarification]'. Who would like to respond to that?"
    *   **Connecting to Multimedia Files:**
        *   **Alex:** "In the discussion about [Topic Y], several points were raised that are also covered in the '[Document Name]' file. I've highlighted the relevant section in the Multimedia Context Panel. Does reviewing this help clarify the different viewpoints?"
    *   **Managing Disagreements Constructively:**
        *   **Alex:** "It's clear there are different views on [Topic Z]. The goal here isn't to agree yet, but to ensure we fully understand each other's starting positions and the reasons behind them. Can we explore the 'why' behind these different views a bit more?"
    *   **Checking for Understanding:**
        *   **Alex:** "Before we move on, does everyone feel they have a clearer understanding of the different perspectives shared so far on the main topics? Are there any lingering points of confusion we should address?"

*   **User Interactions:**
    *   Users review AI summaries and perspective maps in the AI Panel.
    *   They ask clarifying questions about each other's statements (verbally or via text input).
    *   They respond to Alex's prompts for clarification or paraphrasing.
    *   They refer to the Multimedia Context Panel as guided by Alex or on their own initiative.
    *   In Same-Device Mode, turn-taking for questions/responses is still managed via tap-to-talk, guided by Alex.

*   **Navigation:**
    *   Arrives from Phase 2 ("Express").
    *   This phase is iterative; Alex will continue to facilitate discussion and clarification until a sufficient level of mutual understanding is perceived (or a time limit is reached).
    *   Once understanding is established, Alex will announce the transition to Phase 4: Resolve.

*   **Multimedia Context Utilization:**
    *   AI actively links points from the "Express" phase to relevant content within shared multimedia files.
    *   Alex directs attention to these files to aid understanding and ground discussion in factual information where available.
    *   Participants can refer to these files when asking or answering clarifying questions.

## 7.5. Screen: Phase 4 - Resolve (Mermaid: BD)

*   **Mermaid Diagram ID:** BD (Represents the Resolve phase, focusing on brainstorming solutions, evaluating options, and tracking agreements).

*   **Purpose:**
    *   To collaboratively brainstorm potential solutions or ways forward based on the shared understanding achieved in Phase 3.
    *   To evaluate the pros and cons of different options.
    *   To identify and track points of agreement or consensus.
    *   To formulate actionable steps if applicable.
    *   Alex facilitates this process, keeping discussions focused on the session goals and ensuring all participants have a chance to contribute to solutions.

*   **Key UI Elements:**
    *   **Common Elements:** Header, AI Panel, Message Thread, Multimedia Context Panel, Input Area, Same-Device Specifics are present.
    *   **Main Interaction Area / Message Thread:**
        *   Displays brainstormed ideas, proposed solutions, and discussions around them.
        *   Clearly highlights points of agreement as they are confirmed.
        *   May include interactive elements like polls (initiated by Host or Alex) to gauge preference for different solutions.
    *   **AI Panel (Alex's Hub):**
        *   **Brainstorming Prompts:** "Let's brainstorm some potential solutions. No idea is a bad idea at this stage. How can we address the key issue of [Identified Problem from Understand Phase]?"
        *   **Solution/Idea List:** As ideas are generated, Alex populates a list in the AI Panel (e.g., "Proposed Solutions: 1. [Solution A], 2. [Solution B]"). This list can be collaboratively edited or prioritized.
        *   **Pros & Cons Tool (Optional):** For selected solutions, a simple two-column list where participants can contribute pros and cons.
        *   **Agreement Tracker:**
            *   "Points of Agreement: [List of specific statements or solutions that have reached consensus]."
            *   Alex might ask: "Do we all agree on [Proposed Solution X] as a way forward?" and record visual confirmation.
        *   **Action Item List (Emerging):** "Next Steps: 1. [Action Item A - Owner, Due Date]."
        *   **Reference to Goals:** "Let's ensure these solutions align with our main goal of [Session Goal]."
    *   **Multimedia Context Panel:**
        *   Participants or Alex might refer to specific data, constraints, or resources from shared files that impact the feasibility or effectiveness of proposed solutions. E.g., "Solution A seems promising, but let's check the 'Budget Constraints.pdf' in the Context Panel."

*   **Voice Agent Interactions (Alex):** Alex guides brainstorming, evaluation, and agreement tracking.
    *   **Initiating the Phase:**
        *   **Alex:** "Now that we have a clearer understanding of everyone's perspectives, let's move to Phase 4: Resolve. The focus here is to brainstorm potential solutions and work towards agreements. Let's start by generating some ideas to address [key issue identified in Phase 3]."
    *   **Facilitating Brainstorming:**
        *   **Alex:** "What are some possible ways to approach this? Let's get all ideas on the table first, and then we can evaluate them."
        *   **Alex (If ideas are slow):** "Think about what a successful outcome would look like. What steps could get us there?" or "Are there any approaches we haven't considered from the documents or perspectives shared earlier?"
    *   **Guiding Evaluation of Solutions:**
        *   **Alex:** "We have several interesting ideas here: [Lists 2-3 key ideas]. Let's discuss the potential benefits and drawbacks of each. [Participant Name], what are your thoughts on [Solution A]?"
        *   **Alex (If using Pros & Cons tool):** "Let's list the pros and cons for [Solution B]. You can type them in the AI Panel or share them verbally."
    *   **Checking for Consensus & Tracking Agreement:**
        *   **Alex:** "There seems to be positive sentiment around [Solution C]. Can I confirm if everyone is comfortable with this as a point of agreement? Please say 'Yes' or 'No', or use the confirmation button." (Button appears in AI Panel).
        *   **Alex (After confirmation):** "Okay, I've noted that we agree on [Solution C]. This will be added to our summary of agreements."
    *   **Formulating Action Items:**
        *   **Alex:** "Since we've agreed on [Solution C], what's the first practical step to implement this? Who would be responsible for that, and what's a reasonable timeframe?"
    *   **Managing Disagreements on Solutions:**
        *   **Alex:** "It seems we have differing views on [Solution D]. Let's revisit the core needs this solution is trying to address. Is there a hybrid approach or an alternative that might satisfy more of those needs?"
    *   **Keeping Track of Goals:**
        *   **Alex:** "How does this proposed solution help us achieve our primary goal of [Session Goal]? Let's ensure we're staying aligned."

*   **User Interactions:**
    *   Participants verbally propose solutions or type them in the Input Area.
    *   They discuss and evaluate the pros and cons of different options.
    *   They indicate agreement or disagreement when prompted by Alex (verbally, by button click, or via poll).
    *   They can refer to the Multimedia Context Panel for data to support/refute solution ideas.
    *   Same-Device Mode: Turn-taking for proposing and discussing solutions is managed via tap-to-talk, guided by Alex.

*   **Navigation:**
    *   Arrives from Phase 3 ("Understand").
    *   This phase is iterative and may involve cycling through brainstorming, evaluation, and agreement on several points.
    *   Once sufficient resolution is achieved, or the allocated time is ending, Alex will announce the transition to Phase 5: Heal.

*   **Multimedia Context Utilization:**
    *   Previously shared files (e.g., budgets, project plans, technical specifications) are referenced to evaluate the feasibility and impact of proposed solutions.
    *   Alex might surface data from these files if relevant to a solution being discussed. For example, if a solution involves new software, Alex might pull up a comparison document if one was shared.

## 7.6. Screen: Phase 5 - Heal (Mermaid: BE)

*   **Mermaid Diagram ID:** BE (Represents the final Heal phase, focusing on reflection, positive affirmations, and future intentions).

*   **Purpose:**
    *   To formally conclude the session on a constructive and positive note, especially if it involved difficult conversations or conflict.
    *   To allow participants to reflect on the process and outcomes.
    *   To encourage affirmations or acknowledgments of positive contributions or progress made.
    *   To capture individual or group intentions for future actions or behaviors.
    *   Alex facilitates this reflective process, helping to solidify a sense of closure and forward momentum.

*   **Key UI Elements:**
    *   **Common Elements:** Header, AI Panel, Message Thread, Multimedia Context Panel, Input Area, Same-Device Specifics are present.
    *   **Main Interaction Area / Message Thread:**
        *   Displays prompts for reflection and intention setting.
        *   Shows shared reflections or affirmations (if participants choose to share them publicly within the group).
    *   **AI Panel (Alex's Hub):**
        *   **Summary of Agreements/Action Items (from Phase 4):** "Here's a quick recap of what we agreed upon: [Lists key agreements/actions]."
        *   **Reflection Prompts:**
            *   "Let's take a moment to reflect. What's one thing you appreciated about this session or someone's contribution?"
            *   "What's one takeaway or learning for you from this discussion?"
            *   "How are you feeling about the outcome of this session?" (Could use a simple sentiment poll or allow text/verbal responses).
        *   **Intention Setting Prompts:**
            *   "Looking ahead, what's one thing you will do differently or continue to do based on our discussion today?"
            *   "What is your commitment to implementing the agreed-upon actions?"
        *   **Affirmation/Acknowledgment Area (Optional):** A space where Alex might highlight positive interactions or progress noted by the AI during the session (e.g., "I noticed active listening from everyone when discussing [Topic X]," or "[P1 Name], your suggestion to [Y] was a key turning point.").
        *   **"Provide Private Feedback to Alex/Host" Button:** Allows users to discreetly share feedback about the session or facilitation.
    *   **Input Area:** Used for participants to type their reflections or intentions if they prefer not to share verbally. These can be marked as "Share with group" or "Private reflection."

*   **Voice Agent Interactions (Alex):** Alex facilitates reflection, affirmation, and commitment.
    *   **Initiating the Phase:**
        *   **Alex:** "We've reached the final phase: Heal. We've had a productive discussion and reached some important resolutions. This phase is about reflecting on our work together and looking forward. First, let's quickly recap the key agreements we made."
    *   **Guiding Reflection:**
        *   **Alex:** "Now, let's take a moment for personal reflection. In the AI Panel, you'll see a few prompts. Think about what you valued in this session or what you learned. You can share your reflections with the group, or just keep them private. Who would like to start by sharing something they appreciated?"
        *   **Alex (If sharing is slow):** "Sometimes just acknowledging that a difficult conversation happened is a step forward. Did anyone find value in simply having this discussion?"
    *   **Encouraging Affirmations/Acknowledgments:**
        *   **Alex:** "During the session, I observed [positive observation, e.g., 'a lot of constructive questions being asked,' or 'people building on each other's ideas']. Did anyone else notice a particularly positive moment or contribution they'd like to acknowledge?"
    *   **Facilitating Intention Setting:**
        *   **Alex:** "To make sure our work today has a lasting impact, let's think about future intentions. Based on what we discussed and agreed, what's one commitment each of you can make moving forward? This could be about your own actions or supporting the group's decisions. You can share this or note it privately."
    *   **Closing the Session:**
        *   **Alex:** "Thank you all for your active participation, your willingness to share, and your commitment to finding solutions. This concludes our session on '[Session Title]'. A summary of the agreements and action items will be made available to [Host/all participants as per settings]. I hope this was a valuable experience for everyone. Have a great day!"
    *   **Managing Feedback:**
        *   **Alex:** "Before you go, if you have any feedback on how this session was run or how I, Alex, assisted, please use the 'Provide Private Feedback' button in the AI Panel. Your input helps us improve."

*   **User Interactions:**
    *   Participants listen to Alex's prompts and the summary of agreements.
    *   They reflect individually.
    *   They may choose to share reflections, affirmations, or intentions verbally (using tap-to-talk in same-device mode) or by typing into the Input Area (and choosing to share or keep private).
    *   They can provide private feedback.

*   **Navigation:**
    *   Arrives from Phase 4 ("Resolve").
    *   This is the final phase of the session.
    *   After Alex's closing statement, the UI will likely navigate to a post-session summary screen or back to the user's dashboard.
    *   The "Leave Session" button in the header is always available.

*   **Multimedia Context Utilization:**
    *   Generally less focus on the Multimedia Context Panel in this phase, as the emphasis is on internal reflection and interpersonal dynamics.
    *   However, Alex might refer to a specific positive moment captured in the transcript (which is part of the session's multimedia record) if highlighting an affirmation.

This concludes Part 7.
