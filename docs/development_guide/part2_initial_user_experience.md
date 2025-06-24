# Part 2: Initial User Experience & Onboarding

This part of the guide details the initial user journey for the "Understand-me" **Expo (React Native) mobile application**, from first launch to becoming a proficient user. It focuses on a seamless and welcoming onboarding experience. Styling is done using **React Native StyleSheet API** (or NativeWind for Tailwind-like utilities).

## 2.1. Screen: Landing Page / Initial Welcome Screen (Mermaid: A)

*   **Mermaid Diagram ID:** A (Represents the initial screen users see on first app launch).

*   **Purpose:**
    *   Introduce "Understand-me" and its core value proposition clearly for new users.
    *   Create an engaging first impression.
    *   Establish brand identity and trust.
    *   Encourage users to explore the app's features through onboarding.

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<View>`):** Full screen, possibly with a background image or gradient. Styled using `StyleSheet`.
    *   **App Logo (`<Image>`):** Prominently displayed. Sourced from local assets.
    *   **Hero Section (`<View>`):**
        *   Compelling Headline (`<Text>` styled with `StyleSheet`): e.g., "Unlock Clearer Communication."
        *   Brief Sub-headline (`<Text>` styled with `StyleSheet`): Explaining what "Understand-me" does.
        *   Primary CTA Button (`<TouchableOpacity>` with `<Text>` inside, styled with `StyleSheet`): e.g., "Get Started" (leading to Onboarding).
        *   Engaging Visual: A subtle animation (e.g., Lottie with `lottie-react-native`) or a relevant static `<Image>` showcasing app benefits.
    *   **"Learn More" / "Watch Demo" (Optional):** `<TouchableOpacity>` that could navigate (using React Navigation) to a separate informational screen or play a video using **`expo-av`** within a `<Modal>` (Component 10.7).
    *   **Skip to Login (Small text link):** `<Text>` with `onPress` handler for users who already have accounts.

*   **Voice Agent Interactions (Alex - Component 10.2):**
    *   **Initial Greeting (Subtle & Optional, for new users):**
        *   **Cue:** User stays on the screen for a few seconds.
        *   **Alex (Visual cue via Alex's Avatar - `<Image>`/Lottie, possibly a gentle sound if enabled using `expo-av`):** "Welcome to Understand-me! Ready to transform your conversations?" (Text displayed in a `<Text>` component near avatar).
        *   User can tap avatar (`<TouchableOpacity>`) to hear more (Component 10.2 voice output) or get help (navigating to a help screen or a chat interface with Alex).

*   **Navigation (using React Navigation):**
    *   From this initial screen, "Get Started" (`<TouchableOpacity>`) navigates to the first Onboarding screen (2.2) within a **Stack Navigator**.
    *   "Skip to Login" (`<Text>` with `onPress`) would navigate to the Login/Sign-Up screen (2.5) within the same stack.

*   **Multimedia Aspects:**
    *   App Logo (`<Image>`), hero visual/animation (Lottie or `<Image>`).
    *   Demo video (if used) would leverage **`expo-av`** for playback.

## 2.2. Screen: Onboarding - Value Proposition (Mermaid: B)

*   **Mermaid Diagram ID:** B (First onboarding screen highlighting the app's core value).

*   **Purpose:**
    *   Communicate the primary benefits of using the app.
    *   Build excitement and set expectations.
    *   Begin establishing a connection with the user.

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<View>`):** Full screen with engaging background. Styled using `StyleSheet`.
    *   **Progress Indicator (`<View>` with dots or progress bar):** Shows position in onboarding flow (1 of 4).
    *   **Illustration (`<Image>` or Lottie animation):** Visually representing the main value proposition.
    *   **Headline (`<Text>`):** Bold, clear statement of primary benefit.
    *   **Description (`<Text>`):** 1-2 sentences elaborating on the headline.
    *   **Navigation Buttons:**
        *   "Next" (`<TouchableOpacity>` with `<Text>`): Proceeds to next onboarding screen.
        *   "Skip" (`<Text>` with `onPress`): Skips to the final onboarding screen.

*   **Voice Agent Interactions (Alex - Component 10.2):**
    *   **Subtle Introduction:**
        *   Alex's avatar appears with a brief welcome message.
        *   Optional voice greeting introducing the concept of AI-mediated communication.

*   **Navigation:**
    *   "Next" navigates to the second onboarding screen (2.3).
    *   "Skip" navigates to the final onboarding screen (2.4).

## 2.3. Screen: Onboarding - Key Features (Mermaid: C)

*   **Mermaid Diagram ID:** C (Second onboarding screen showcasing key features).

*   **Purpose:**
    *   Highlight 2-3 core features of the application.
    *   Demonstrate how the app solves user problems.
    *   Continue building user engagement.

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<View>`):** Full screen with consistent styling from previous screen.
    *   **Progress Indicator (`<View>`):** Shows position (2 of 4).
    *   **Feature Carousel (`<FlatList>` horizontal or `<ScrollView>` horizontal):**
        *   Each feature card (`<View>`) contains:
            *   Feature Icon (`<Image>`).
            *   Feature Title (`<Text>`).
            *   Brief Description (`<Text>`).
    *   **Navigation Buttons:**
        *   "Next" (`<TouchableOpacity>` with `<Text>`): Proceeds to next screen.
        *   "Back" (`<TouchableOpacity>` with `<Text>`): Returns to previous screen.
        *   "Skip" (`<Text>` with `onPress`): Skips to final onboarding screen.

*   **Voice Agent Interactions (Alex - Component 10.2):**
    *   **Feature Explanation:**
        *   Alex's avatar appears with contextual explanations for each feature.
        *   Subtle animations of Alex responding to user interactions.

*   **Navigation:**
    *   "Next" navigates to the third onboarding screen (2.4).
    *   "Back" returns to the first onboarding screen (2.2).
    *   "Skip" navigates to the final onboarding screen (2.4).

## 2.4. Screen: Onboarding - Personalization Introduction (Mermaid: D)

*   **Mermaid Diagram ID:** D (Final onboarding screen introducing personalization).

*   **Purpose:**
    *   Introduce the concept of personalization.
    *   Set expectations for the personality assessment.
    *   Transition to authentication or assessment.

*   **Key UI Elements (using React Native components):**
    *   **Main Container (`<View>`):** Full screen with consistent styling.
    *   **Progress Indicator (`<View>`):** Shows position (3 of 3).
    *   **Illustration (`<Image>` or Lottie):** Representing personalization concept.
    *   **Headline (`<Text>`):** e.g., "Personalized for You".
    *   **Description (`<Text>`):** Explaining how the app adapts to the user.
    *   **Action Buttons:**
        *   "Create Account" (`<TouchableOpacity>` with `<Text>`): Primary CTA.
        *   "I Already Have an Account" (`<TouchableOpacity>` with `<Text>`): Secondary CTA.
        *   "Back" (`<TouchableOpacity>` with `<Text>`): Returns to previous screen.

*   **Voice Agent Interactions (Alex - Component 10.2):**
    *   **Personalization Introduction:**
        *   Alex explains how the app will adapt to the user's communication style.
        *   Brief introduction to the personality assessment concept.

*   **Navigation:**
    *   "Create Account" navigates to the Sign-Up screen (2.5).
    *   "I Already Have an Account" navigates to the Login screen (2.5).
    *   "Back" returns to the previous onboarding screen (2.3).

## 2.5. Screen: Sign-Up / Login (Mermaid: E)

*   **Mermaid Diagram ID:** E (Authentication screen, potentially using tabs or separate views for Sign-Up and Login within a Stack Navigator context).

*   **Purpose:**
    *   Provide secure authentication options.
    *   Collect necessary user information.
    *   Establish user account for personalized experience.
    *   Secure handling of credentials might involve Dappier for enhanced security if integrating with native secure enclaves or specific cryptographic operations, orchestrated via Nodely.

*   **Key UI Elements (using React Native components, Forms Pattern 10.8):**
    *   **Main Container (`<KeyboardAvoidingView>` behavior="padding" with `<ScrollView>` for form content):** Ensures form is usable when keyboard is visible.
    *   **Shared Elements:**
        *   Segmented Control (e.g., using `react-native-segmented-control-tab`) or distinct `<TouchableOpacity>` buttons to switch between "Sign Up" and "Login" views, styled with `StyleSheet`.
        *   App Logo (`<Image>`).
        *   Links (`<Text>` with `onPress` and appropriate styling) to Privacy Policy and Terms of Service (opening in a `<Modal>` - Component 10.7 - with a `WebView` from `react-native-webview` or custom `<Text>` display).
    *   **Sign-Up Form (`<View>` containing form elements from Component 10.8):**
        *   Email Address Field (`<TextInput>` with `keyboardType="email-address"`, `textContentType="emailAddress"`, `autoCapitalize="none"`).
        *   Password Field (`<TextInput>` with `secureTextEntry={true}`, `textContentType="newPassword"`).
        *   Confirm Password Field (`<TextInput>` with `secureTextEntry={true}`, `textContentType="newPassword"`).
        *   Full Name Field (`<TextInput>` with `textContentType="name"`).
        *   [Optional] Picker for "Primary use case" (e.g., using `@react-native-picker/picker` or a custom modal).
        *   Checkbox (custom component with `<TouchableOpacity>` and icon - `<Image>`) for Terms agreement.
        *   "Create Account" Button (`<TouchableOpacity>` with `<Text>`).
        *   Social Login Buttons (`<TouchableOpacity>` with `<Image>` for logos like Google/Apple using Expo's `expo-auth-session` or `expo-apple-authentication`). Dappier could be involved here if decentralized identity (DID) options are supported for login, potentially using native modules bridged by Expo.
        *   Switch to Login: `<Text>` with `onPress`.
    *   **Login Form (`<View>`):**
        *   Email Address Field (`<TextInput>` with `textContentType="emailAddress"`).
        *   Password Field (`<TextInput>` with `secureTextEntry={true}`, `textContentType="password"`).
        *   "Login" Button (`<TouchableOpacity>` with `<Text>`).
        *   Social Login Buttons.
        *   "Forgot your password?" Link (`<Text>` with `onPress`).
        *   Switch to Sign-Up: `<Text>` with `onPress`.
    *   **Password Recovery Section (likely a separate screen in the Stack Navigator):**
        *   Email Address Field (`<TextInput>`). "Send Reset Link" Button (`<TouchableOpacity>`).

*   **Voice Agent Interactions (Alex - Component 10.2):**
    *   General: Alex's help icon (`<TouchableOpacity>` with Alex's avatar - Component 10.2) present.
    *   Password Strength Feedback: Visual only (e.g., a colored bar `<View>` using `StyleSheet`). Alex doesn't speak here to avoid intrusiveness.
    *   Error Handling: Errors displayed as `<Text>` (styled red) near the relevant field or as a Toast/Snackbar (Component 10.6). Alex might voice a summary if multiple errors: "Hmm, please check the highlighted fields." (Voice via Component 10.2).
    *   Accessibility Support (on tapping Alex's help icon): Alex uses voice output (Component 10.2) and text display in an overlay or dedicated help `<View>`.

*   **Navigation (React Navigation Stack):**
    *   Arrives from final Onboarding screen (2.4).
    *   Successful sign-up/login navigates (using stack navigator's `navigate` function) to:
        *   Conversational Personality Assessment (2.6) for new users.
        *   Main Dashboard (Part 3) or Interactive Tutorial (2.7) for returning users.
    *   "Forgot Password" navigates to a password reset screen.
    *   Nodely might orchestrate the backend calls to Supabase for authentication, including any Dappier-related security checks if implemented.

*   **Multimedia Aspects:**
    *   App Logo (`<Image>`), Social Login Logos (`<Image>`). Password strength indicator (`<View>` styled with `StyleSheet`).

## 2.6. Screen: Conversational Personality Assessment (Mermaid: F)

*   **Mermaid Diagram ID:** F (Personalization step using a conversational UI, presented within the main app Stack Navigator).

*   **Purpose:**
    *   Gather information about the user's communication style and preferences.
    *   Create a personalized experience tailored to the user's needs.
    *   Establish a connection between the user and Alex (the AI mediator).
    *   Data gathered might be processed by Nodely to create a user profile in Supabase that Google GenAI can later use for personalization.

*   **Key UI Elements (using React Native components):**
    *   **Chat-like Interface (`<ScrollView>` or `<FlatList>` for messages, with a sticky `<View>` at the bottom for input):**
        *   Alex's Avatar (`<Image>` or Lottie - Component 10.2).
        *   Speech bubbles (`<View>` with `<Text>` inside, styled with `StyleSheet` to differentiate Alex and user).
        *   Input area (`<View>`): `<TextInput>` for text, Microphone Icon Button (`<TouchableOpacity>` with `<Image>` icon - Component 10.1) for voice input via `expo-av`.
    *   **Progress Indicator (`<View>` with animated width or a library like `react-native-progress-bar-animated`).**
    *   **Visual Feedback:** Alex's avatar animations (Lottie).
    *   **Option to Skip/Postpone (`<TouchableOpacity>` with `<Text>`, styled as a button).**
    *   **Information/Privacy Note (`<Text>` or a `<TouchableOpacity>` linking to a Modal - Component 10.7 - with privacy details).**

*   **Voice Agent Interactions (Alex - Component 10.2) - Core of the Screen:**
    *   Introduction, Questioning Style, Example Questions, Feedback, Clarifications, Conclusion scripts remain largely the same. Alex's voice output via Component 10.2.
    *   User responses can be via voice (transcribed using Component 10.1, `expo-av`) or typed into the `<TextInput>`.
    *   User options often presented as tappable quick reply buttons (`<TouchableOpacity>` with `<Text>`) in addition to free-form input.

*   **Navigation (React Navigation Stack):**
    *   Arrives after successful Sign-Up. Stack navigator replaces the current screen with this one.
    *   "Skip for now" or completion navigates to Interactive Platform Tutorial (2.7) or Main Dashboard (Part 3).
    *   A link to access/update this assessment later should be available in a User Settings screen (navigated to via Stack or Tab navigator).

*   **Multimedia Aspects:**
    *   Alex's Avatar (`<Image>`/Lottie - Component 10.2).
    *   Icons (`<Image>` or icon font) for microphone, choice buttons.
    *   Subtle background `<Image>` or gradient `<View>` possible.

## 2.7. Screen: Interactive Platform Tutorial (Mermaid: G)

*   **Mermaid Diagram ID:** G (Interactive, guided tour, presented within the main app Stack Navigator, possibly using a library for guided tours/coach marks).

*   **Purpose:**
    *   Familiarize users with the app's interface and functionality.
    *   Demonstrate key features and how to use them effectively.
    *   Reduce learning curve and increase user confidence.
    *   Improve user retention by ensuring users understand the app's value.

*   **Key UI Elements & Interaction Flow (using React Native components):**
    *   **Guided Tour Overlays/Tooltips:** Implemented using absolutely positioned `<View>`s with `<Text>` and `<TouchableOpacity>` for "Next"/"Got it" buttons, or a library like `react-native-copilot` or similar. These overlays point to actual UI elements of the application.
    *   **Step-by-Step Instructions (`<Text>` within the overlay/tooltip).**
    *   **Interactive Tasks:** User interacts directly with the underlying app UI elements (e.g., tapping a `<TouchableOpacity>` that is part of the actual app UI).
    *   **Checkpoints/Progress Indicators (`<View>` or progress bar component).**
    *   **"Skip Tutorial" / "Exit Tutorial" (`<TouchableOpacity>` with `<Text>`).**
    *   **Simulated Environment:** May involve navigating (via React Navigation) through key screens of the application (e.g., a simplified Dashboard view, a mock session screen). Data shown would be pre-defined mock data.

*   **Voice Agent Interactions (Alex - Component 10.2):** Alex is the primary guide.
    *   Initiation, Guiding (scripts adapted for mobile UI: "Tap the 'New Session' button on the bottom tab bar," "This is your main dashboard. Swipe left to see..."), Encouragement, Error Handling, Conclusion scripts remain largely the same.
    *   Alex's guidance appears in `<Text>` components within the tutorial overlays and via voice output (Component 10.2).

*   **Navigation (React Navigation Stack):**
    *   Starts after Personality Assessment (2.6) or first login if assessment is skipped.
    *   Progresses step-by-step, potentially involving programmatic navigation (`navigation.navigate(...)`) to different screens as part of the tutorial.
    *   "Exit Tutorial" navigates to Main Dashboard (Part 3).
    *   Completion navigates to Main Dashboard.

*   **Multimedia Aspects:**
    *   **Screen Overlays & Highlights:** Styled `<View>`s, potentially with borders or spotlight effects.
    *   **Short Animated Explanations (Optional):** Lottie animations (`lottie-react-native`) could be used within tutorial steps to demonstrate gestures or flows.
    *   **Alex's Avatar (`<Image>`/Lottie - Component 10.2) integrated into tutorial prompts/overlays.**
    *   **Simulated Content:** Mock data displayed using standard `<Text>`, `<View>`, and `<Image>` components.
    *   PicaOS might be relevant if the tutorial involves demonstrating advanced on-device media processing features specific to PicaOS that users need to learn. For instance, if PicaOS provides a unique way to capture or annotate audio that is core to the app, the tutorial would need to guide the user through these PicaOS-specific interactions.

## 2.8. User Flow Summary

The revised user flow places onboarding before authentication, creating a more engaging and informative introduction to the app:

1. **Landing Page (2.1)** - Initial welcome screen with app introduction
2. **Onboarding - Value Proposition (2.2)** - First onboarding screen highlighting core value
3. **Onboarding - Key Features (2.3)** - Second onboarding screen showcasing features
4. **Onboarding - Personalization Introduction (2.4)** - Final onboarding screen introducing personalization
5. **Sign-Up / Login (2.5)** - Authentication screen after onboarding
6. **Conversational Personality Assessment (2.6)** - Personalization through conversation with Alex
7. **Interactive Platform Tutorial (2.7)** - Guided tour of the app's functionality

This flow allows users to understand the app's value proposition and features before committing to creating an account, which can increase conversion rates and user engagement. It also creates a smoother transition into the personalization process, as users already understand why personalization is important from the onboarding experience.
