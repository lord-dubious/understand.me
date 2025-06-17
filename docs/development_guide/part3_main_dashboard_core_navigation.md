# Part 3: Main Dashboard & Core Navigation

This part of the Development Guide focuses on the central hub of the "Understand-me" application: the Main Dashboard. It also covers navigation to other key areas like Session History and the Personal Growth Dashboard, which are integral to the user's ongoing interaction with the platform.

## 3.1. Screen: Main Dashboard (Mermaid: G/H)

*   **Mermaid Diagram ID:** G/H (Represents the main dashboard, potentially with variations G for Host/Individual focus and H for Participant focus, or a combined view that adapts).

*   **Purpose:**
    *   Serve as the primary landing spot for users after login (once onboarding is complete).
    *   Provide a quick overview of relevant information and quick access to key actions.
    *   Personalize the experience based on user role and recent activity.
    *   Facilitate easy navigation to core features of the application.

*   **Key UI Elements (Hypothetical, based on common dashboard practices and "Understand-me" features):**
    *   **Persistent Left-Hand Sidebar Navigation (as defined in Part 1.5):**
        *   Links: Dashboard, Start/Schedule Session, Session History, Recordings, Personal Growth, Settings, Help.
        *   User Profile section at the bottom.
    *   **Main Content Area:**
        *   **Welcome Message:** Personalized greeting (e.g., "Good morning, Sarah!").
        *   **Quick Actions Section:**
            *   Prominent button: "Start New Session" / "Schedule Session" (especially for Hosts/Individuals).
            *   Button: "Join a Session" (if applicable, with an input for a session code).
            *   Link to "View Upcoming Sessions."
        *   **Recent Activity Overview (Dynamic Content):**
            *   **For Hosts/Individuals:**
                *   List of 2-3 most recent sessions with links to their summaries or recordings.
                *   Upcoming scheduled sessions (if any).
                *   Quick stats: e.g., "Total sessions hosted," "Average engagement score this month."
            *   **For Participants:**
                *   List of recent sessions they participated in, with links to shared materials or transcripts (if permitted by host).
                *   Upcoming registered sessions.
        *   **"Alex's Insights" / "Tips from Alex" Card (Dynamic & Contextual):**
            *   A dedicated card where Alex can offer proactive suggestions, tips for using features, or surface interesting data points. (e.g., "You've hosted 3 sessions on 'Project Phoenix'. Consider creating a custom vocabulary for it to improve transcription!").
            *   Could also highlight new features or tutorials.
        *   **Personal Growth Snapshot (Optional Teaser):**
            *   A small card linking to the Personal Growth Dashboard, perhaps showing one key stat (e.g., "Your 'Clarity Score' improved by 5% last week!").
        *   **Search Bar (Global or Contextual):** For searching sessions, recordings, or help content.

*   **Voice Agent Interactions (Alex):** Alex plays a significant role in making the dashboard feel dynamic and supportive.
    *   **Personalized Greeting:**
        *   **Cue:** User lands on the dashboard.
        *   **Alex (Voice or Prominent Text in "Alex's Insights" card):** "Welcome back, [User's Name]! Ready to make your communications clearer today?" or "Good afternoon, [User's Name]! You have an upcoming session on 'XYZ' in 2 hours. Need to review the details?"
    *   **Contextual Suggestions & Tips (via "Alex's Insights" card):**
        *   **Cue:** Based on user's past activity, role, or unused features.
        *   **Alex:**
            *   "I noticed you often host long sessions. Did you know you can enable automatic summaries to save time?" (Links to relevant setting or tutorial).
            *   "Many users find that enabling [specific feature, e.g., 'Non-verbal feedback'] boosts participant engagement. Want to try it in your next session?"
            *   "Your last session on '[Topic]' had high participation in the Q&A. Great job fostering interaction!"
            *   "New feature alert! You can now [describe new feature]. Want to learn more?"
    *   **Responding to User Queries (If a voice input is available or search bar interaction):**
        *   **User:** "Alex, show me my sessions from last week."
        *   **Alex:** "Okay, pulling up your sessions from last week now." (Navigates to Session History with appropriate filters).
        *   **User:** "Alex, how do I invite someone to a session?"
        *   **Alex:** "You can invite participants when you set up a new session or from an active session's participant panel. I can show you more in the Help section if you like."
    *   **Proactive Notifications (Subtle, within Alex's card or as a soft notification):**
        *   **Alex:** "Reminder: Your session '[Session Name]' is starting in 15 minutes."
        *   **Alex:** "A new recording from '[Past Session Name]' is now processed and available."

*   **Navigation:**
    *   **Primary Navigation:** The left sidebar provides access to all main sections of the application.
    *   **Dashboard Widgets/Cards:** Clickable elements within cards navigate to specific sessions, recordings, settings, or other relevant areas (e.g., clicking a recent session navigates to its detailed view).
    *   **CTA Buttons:** "Start New Session" leads to the session creation flow.
    *   **Search Results:** Navigate to specific items found.

*   **Multimedia Aspects:**
    *   **Alex's Avatar:** Could be present in the "Alex's Insights" card, making the suggestions feel more personal.
    *   **Icons:** Used extensively for quick actions, navigation links, and to visually represent different types of information (e.g., session icons, alert icons).
    *   **Charts/Graphs (Subtle):** The "Personal Growth Snapshot" or quick stats might use very simple, easy-to-understand mini-charts.
    *   **Profile Pictures/Avatars:** For users in lists of recent sessions, if applicable.

## 3.2. Screen: Session History (Mermaid: J, LA)

*   **Mermaid Diagram ID:** J (Main list/table view of past sessions), LA (Detailed view of a selected past session, including transcripts, recordings, analytics).

*   **Purpose:**
    *   Allow users to easily find, review, and manage their past sessions (for Hosts/Individuals) or sessions they attended (for Participants).
    *   Provide access to session recordings, transcripts, Q&A logs, and other associated artifacts.
    *   Offer search, filtering, and sorting capabilities for efficient browsing.
    *   (LA) Provide a detailed breakdown and analytics for a specific past session.

*   **Key UI Elements:**
    *   **View J: Session List/Table View**
        *   **Search Bar:** Prominent search functionality (by session title, date, participants, keywords within transcripts if feasible).
        *   **Filter Controls:**
            *   Date Range Selector.
            *   Filter by Role (if user has been both Host and Participant).
            *   Filter by Custom Tags (if users can tag sessions).
            *   Filter by "Starred" or "Favorite" sessions.
        *   **Sortable Columns:** Session Title, Date, Duration, Host, Number of Participants, [Quick Stats like Engagement Score - for hosts].
        *   **Session List Items:** Each item representing a session should display:
            *   Session Title
            *   Date & Time
            *   Duration
            *   Key action buttons: "View Details," "Play Recording," "View Transcript," "Share" (if host), "Delete" (if host).
            *   Visual indicator if a recording/transcript is available.
        *   **Pagination:** If the list is long.
        *   **Bulk Actions (Optional, for Hosts):** Select multiple sessions to delete, tag, or export (summary data).
    *   **View LA: Detailed Past Session View (Accessed by clicking "View Details" or a session title from View J)**
        *   **Header:** Session Title, Date, Time, Duration, Host Name.
        *   **Tabs or Sections for:**
            *   **Summary/Overview:** Key metrics (e.g., participant count, peak engagement, key topics discussed - AI generated), list of attendees.
            *   **Transcript:** Full, searchable, and time-stamped transcript. Option to edit (for hosts), highlight, and add notes. Speaker identification if possible.
            *   **Recording:** Embedded audio/video player for the session recording. Playback controls, speed adjustment, speaker timeline.
            *   **Q&A Log:** Chronological list of questions asked and answers provided (if the Q&A feature was used).
            *   **Poll Results (if applicable):** Visual display of poll questions and their outcomes.
            *   **Shared Files (if applicable):** Links to any files shared during the session.
            *   **Analytics (for Hosts):** More detailed engagement graphs, talk time analysis per participant, sentiment analysis trends over the session.
        *   **Action Buttons:** "Download Transcript," "Download Recording," "Share Session Summary," "Edit Session Title/Details" (for hosts).

*   **Voice Agent Interactions (Alex):**
    *   **On View J (Session List):**
        *   **Cue:** User navigates to Session History.
        *   **Alex (Subtle text prompt or help icon):** "Looking for a specific session? Try using the search bar or filters. You can ask me to find sessions too, like 'Alex, find sessions from last Tuesday' or 'Search for sessions about Project Alpha'."
        *   **Cue:** User performs a search that yields many results.
        *   **Alex:** "That's quite a few results! You can use the filters for date range or tags to narrow them down further."
    *   **On View LA (Detailed Session View):**
        *   **Cue:** User opens a session's detailed view.
        *   **Alex:** "Here are the details for '[Session Name]'. You can navigate through the transcript, recording, and analytics using the tabs. Let me know if you need help finding something specific within this session."
        *   **Cue:** User is viewing the transcript.
        *   **Alex (Contextual tip):** "You can click on any part of the transcript to jump to that point in the recording." or "Need to correct something? Hosts can edit the transcript directly."
        *   **Cue:** User is viewing analytics (Host).
        *   **Alex:** "This engagement graph shows peak discussion moments. You might want to review what was being discussed at [time point] in the recording."

*   **Navigation:**
    *   Accessed from the main sidebar ("Session History").
    *   From View J, clicking a session title or "View Details" navigates to View LA for that session.
    *   Within View LA, tabs or internal links allow navigation between different aspects of the session (Transcript, Recording, etc.).
    *   Breadcrumbs might be useful: e.g., "Dashboard > Session History > [Session Name]".
    *   Search and filter results update the list in View J.

*   **Multimedia Aspects:**
    *   **View J:** Icons for session types (e.g., audio-only, video), recording availability.
    *   **View LA:**
        *   Embedded audio/video player for recordings.
        *   Graphs and charts for analytics (e.g., engagement timelines, sentiment scores, talk time distribution).
        *   Speaker avatars or initials next to transcript lines can improve readability.

## 3.3. Screen: Personal Growth Dashboard (Mermaid: K, CF-CI)

*   **Mermaid Diagram ID:** K (Main Personal Growth Dashboard view), CF-CI (Representing various Component Features or Cards for different Insights, like Clarity Focus, Filler word Index, Confidence Index, Inclusivity metrics, etc.)

*   **Purpose:**
    *   To provide users with actionable insights into their communication patterns and habits over time, derived from their participation in "Understand-me" sessions.
    *   To help users identify areas for improvement in their speaking style, clarity, engagement, and inclusivity.
    *   To track progress on personal communication goals.
    *   To empower users to become more effective and confident communicators.
    *   This dashboard is primarily for users who actively speak in sessions (Hosts, Individuals, and active Participants).

*   **Key UI Elements (View K - Main Dashboard):**
    *   **Overall Communication Score (Optional):** A composite score that gives a general idea of communication effectiveness, with a clear explanation of how it's derived.
    *   **Date Range Filter:** Allow users to see trends over specific periods (e.g., last week, last month, last quarter, custom range).
    *   **Key Metrics Cards/Widgets (These are the CF-CI components):** Each card focuses on a specific aspect of communication. Examples:
        *   **Clarity Focus (CF1):**
            *   Metric: Percentage of speech identified as clear vs. potentially ambiguous.
            *   Visualization: Line graph showing clarity trend over selected period.
            *   Insight: "Your clarity score has improved by X% this month!"
        *   **Filler Word Index (CF2):**
            *   Metric: Average filler words (um, uh, like) per minute of speech.
            *   Visualization: Bar chart showing filler word frequency, perhaps benchmarked against an optimal range.
            *   Insight: "You're using fewer filler words! Keep practicing active pauses."
        *   **Pace & Pauses (CF3):**
            *   Metric: Average speaking pace (words per minute), frequency and duration of pauses.
            *   Visualization: Gauge or line graph for pace, bar chart for pause behavior.
            *   Insight: "Your speaking pace is [X WPM], which is great for listener comprehension."
        *   **Question Handling (for Hosts - CF4):**
            *   Metric: Average time to address questions, percentage of questions acknowledged.
            *   Visualization: Trend lines.
            *   Insight: "You're quick to address questions, keeping participants engaged!"
        *   **Inclusivity Metrics (CF5):**
            *   Metric (for Hosts): Speaking time distribution among participants (if identifiable), use of inclusive language (based on a predefined lexicon).
            *   Metric (for Participants): Own speaking time relative to session length or other participants.
            *   Visualization: Pie chart for speaking time distribution, progress bar for inclusive language use.
        *   **Sentiment Trend (CF6):**
            *   Metric: Predominant sentiment of the user's speech (and potentially of participant feedback if a host).
            *   Visualization: Line graph showing sentiment shifts over time or across sessions.
        *   **Custom Goals Section:** Allow users to set specific goals (e.g., "Reduce filler words by 10%", "Increase use of positive framing") and track progress.
    *   **"Alex's Coaching Corner" / "Growth Tips":** A section where Alex provides personalized advice based on the data.
    *   **Links to Relevant Sessions:** Ability to click on a data point in a graph and see which sessions contributed to it (linking to View LA of Session History).

*   **Voice Agent Interactions (Alex):** Alex acts as a data interpreter and coach.
    *   **Dashboard Overview Greeting:**
        *   **Cue:** User opens the Personal Growth Dashboard.
        *   **Alex:** "Welcome to your Personal Growth Dashboard, [User's Name]! Here, we can explore insights about your communication style. Remember, these are just tools to help you. What area are you curious about today?"
    *   **Explaining Metrics (On hover/click of a metric or via direct question):**
        *   **User:** "Alex, what does 'Filler Word Index' mean?"
        *   **Alex:** "The 'Filler Word Index' measures how often you use words like 'um,' 'uh,' or 'like.' A lower score here usually means your speech is more direct and clear. We can look at trends and I can offer some tips if you're interested!"
    *   **Interpreting Trends & Data (Proactive in "Alex's Coaching Corner"):**
        *   **Alex:** "I see your 'Clarity Focus' score has been consistently high for the past month – that's fantastic! It means your messages are likely being well understood."
        *   **Alex:** "It looks like your speaking pace tends to be a bit fast in longer sessions. Taking a brief pause or a sip of water can help recalibrate. Want some exercises for pacing?"
        *   **Alex (If user set a goal):** "You're making good progress on your goal to reduce filler words! You're already down by X% from when you started."
    *   **Offering Actionable Advice & Resources:**
        *   **Alex:** "To improve your pause effectiveness, you could try the '3-second pause' technique before answering questions. There's a quick guide on this in our Help Center." (Provides a link).
        *   **Alex:** "For practicing inclusive language, I can suggest some common phrases to try incorporating. Would you like to see them?"
    *   **Celebrating Successes:**
        *   **Alex:** "Wow, your engagement scores in the sessions you hosted last week were outstanding! Participants asked 30% more questions than your average. Keep up the great work!"

*   **Navigation:**
    *   Accessed from the main sidebar ("Personal Growth").
    *   Clicking on specific data points or "see related sessions" links might navigate to filtered views in Session History (View LA) or to specific moments in recordings.
    *   Links to help center articles or resources for communication tips.

*   **Multimedia Aspects:**
    *   **Rich Charts and Graphs:** Various types (line, bar, pie, gauge) to visually represent data effectively, as described under Key UI Elements. These should be interactive (e.g., tooltips on hover showing exact values).
    *   **Icons:** To represent different metrics or goal statuses (e.g., trophy for achieved goals, up/down arrows for trends).
    *   **Alex's Avatar:** Present in the "Coaching Corner" to make the advice feel more personal and interactive.
    *   **Color-Coding:** Used thoughtfully in charts to indicate positive/negative trends or to differentiate data series, ensuring accessibility (e.g., not relying on color alone).
