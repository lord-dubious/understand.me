# Part 8: Testing Strategies for Developers

This part of the Developer Guide outlines the testing strategies and best practices to be followed by developers working on the "Understand.me" Expo (React Native) application. A comprehensive testing approach is crucial for ensuring code quality, application stability, and a reliable user experience.

## 8.1. Unit Testing

Unit tests focus on testing individual, isolated pieces of code, such as utility functions, custom hooks, or React Native components in isolation.

*   **Tools:**
    *   **Jest:** The primary JavaScript testing framework. Expo projects are typically pre-configured with Jest.
    *   **React Native Testing Library (`@testing-library/react-native`):** For testing React Native components by interacting with them as a user would (querying by text, accessibility labels, etc.).
    *   **TypeScript:** Use TypeScript for writing tests to leverage type safety.
*   **What to Test:**
    *   **Utility Functions:** Test business logic, data transformations, and helper functions with various inputs, including edge cases.
    *   **Custom Hooks:** Test the logic within custom hooks by mocking their dependencies and asserting their return values or side effects.
    *   **React Native Components (Presentational/Dumb Components):**
        *   Verify that components render correctly based on given props.
        *   Test that event handlers (e.g., `onPress`) are called when expected.
        *   Check for correct display of text, images, and other UI elements.
        *   Test accessibility props like `accessibilityLabel`.
*   **Example: Testing a Utility Function (Jest):**
    ```typescript
    // utils/formatDate.ts
    export const formatDate = (timestamp: string): string => {
      if (!timestamp) return "N/A";
      const date = new Date(timestamp);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // utils/__tests__/formatDate.test.ts
    import { formatDate }    from '../formatDate';

    describe('formatDate', () => {
      it('should format a valid timestamp correctly', () => {
        expect(formatDate('2023-10-26T10:00:00.000Z')).toBe('Oct 26, 2023');
      });
      it('should return "N/A" for invalid input', () => {
        expect(formatDate('')).toBe('N/A');
        expect(formatDate(null as any)).toBe('N/A');
      });
    });
    ```
*   **Example: Testing a React Native Component (React Native Testing Library):**
    ```typescript
    // components/common/PrimaryButton.tsx
    import React from 'react';
    import { TouchableOpacity, Text, StyleSheet } from 'react-native';
    import { THEME } from '../../constants/theme'; // Assuming theme constants

    interface PrimaryButtonProps {
      title: string;
      onPress: () => void;
      disabled?: boolean;
    }

    export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, disabled }) => (
      <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, disabled && styles.disabledButton]}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );

    const styles = StyleSheet.create({
      button: { backgroundColor: THEME.colors.primary, padding: THEME.spacing(2), borderRadius: 5 },
      disabledButton: { backgroundColor: THEME.colors.disabled },
      text: { color: THEME.colors.white, textAlign: 'center', fontWeight: 'bold' },
    });

    // components/common/__tests__/PrimaryButton.test.tsx
    import React from 'react';
    import { render, fireEvent } from '@testing-library/react-native';
    import { PrimaryButton } from '../PrimaryButton';

    describe('PrimaryButton', () => {
      it('renders correctly with given title', () => {
        const { getByText } = render(<PrimaryButton title="Submit" onPress={() => {}} />);
        expect(getByText('Submit')).toBeTruthy();
      });

      it('calls onPress when tapped', () => {
        const mockOnPress = jest.fn();
        const { getByText } = render(<PrimaryButton title="Press Me" onPress={mockOnPress} />);
        fireEvent.press(getByText('Press Me'));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
      });

      it('is disabled when disabled prop is true', () => {
        const mockOnPress = jest.fn();
        const { getByText } = render(<PrimaryButton title="Disabled" onPress={mockOnPress} disabled={true} />);
        fireEvent.press(getByText('Disabled'));
        expect(mockOnPress).not.toHaveBeenCalled();
        // You might also check for style changes if they are significant for disabled state
      });
    });
    ```
*   **Location:** Place test files in a `__tests__` directory adjacent to the file being tested (e.g., `utils/__tests__/formatDate.test.ts`).
*   **Running Tests:** `yarn test` or `npm test`.

## 8.2. Integration Testing

Integration tests verify the interactions between different parts of the application, such as between the Expo app and backend services (Supabase, AI Orchestration Layer).

*   **Strategies:**
    *   **Expo App <-> Supabase:**
        *   **Mocking Supabase Client:** For testing components that directly interact with Supabase, you can mock the `@supabase/supabase-js` client. This allows you to simulate successful responses, errors, and different data scenarios without making actual network calls. Jest's mocking capabilities (`jest.mock`) are used here.
        *   **Test Database (Caution):** For more comprehensive tests, a dedicated test Supabase instance can be used. This is more complex to set up and manage but provides higher fidelity. Ensure proper data seeding and cleanup. This is usually reserved for specific E2E or critical integration tests rather than frequent developer tests.
    *   **Expo App <-> AI Orchestration Layer (or other custom backend services like Nodely/Dappier if they expose APIs):**
        *   **Mocking API Service Modules:** If you have service modules (e.g., `picaosApiService.ts`) that encapsulate API calls (e.g., using `fetch` or `axios`), mock these modules in your tests. This allows you to control the responses from AI Orchestration Layer and test how your app handles different scenarios (success, various errors, specific data payloads).
*   **What to Test:**
    *   Data fetching and display from Supabase.
    *   User authentication flows (sign-up, login) and their effect on app state and RLS.
    *   Submitting data from forms to Supabase or AI Orchestration Layer.
    *   Correct handling of API responses (success and error states) from AI Orchestration Layer.
    *   Data flow between chained service calls (e.g., app calls AI Orchestration Layer, AI Orchestration Layer calls Google GenAI, AI Orchestration Layer returns result to app).
*   **Example: Mocking a AI Orchestration Layer API Service Call (Jest):**
    ```typescript
    // services/picaosApiService.ts (Simplified)
    // export const analyzeConflict = async (data: any): Promise<any> => {
    //   const response = await fetch(`${process.env.EXPO_PUBLIC_PICAOS_API_ENDPOINT}/session/analyze_conflict`, { /* ... */ });
    //   if (!response.ok) throw new Error('Analysis failed');
    //   return response.json();
    // };

    // screens/host/__tests__/DescribeConflictScreen.integration.test.tsx
    import React from 'react';
    import { render, fireEvent, waitFor } from '@testing-library/react-native';
    // import DescribeConflictScreen from '../DescribeConflictScreen'; // Assume this screen uses analyzeConflict
    // import * as picaosApiService from '../../../services/picaosApiService';

    // jest.mock('../../../services/picaosApiService'); // Mock the entire module

    // describe('DescribeConflictScreen - Integration with AI Orchestration Layer', () => {
    //   it('should call analyzeConflict and navigate on successful submission', async () => {
    //     const mockAnalyzeConflict = picaosApiService.analyzeConflict as jest.Mock;
    //     mockAnalyzeConflict.mockResolvedValueOnce({ analysisId: '123', themes: ['budget'] });

    //     // const navigation = { navigate: jest.fn() };
    //     // const { getByTestId, getByText } = render(<DescribeConflictScreen navigation={navigation} />);

    //     // fireEvent.changeText(getByTestId('titleInput'), 'Test Title');
    //     // fireEvent.changeText(getByTestId('descriptionInput'), 'Test Description');
    //     // fireEvent.press(getByText('Next: AI Analysis'));

    //     // await waitFor(() => expect(mockAnalyzeConflict).toHaveBeenCalledWith(expect.objectContaining({
    //     //   title: 'Test Title',
    //     //   description: 'Test Description',
    //     // })));
    //     // await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('AIProblemAnalysisReview', { analysisId: '123' }));
    //     expect(true).toBe(true); // Placeholder for actual test
    //   });
    // });
    ```
    *(Note: Full component for DescribeConflictScreen not provided, so test is conceptual).*

## 8.3. End-to-End Testing (Expo focus)

E2E tests simulate real user scenarios by interacting with the application UI as a whole.

*   **Tools for Expo/React Native:**
    *   **Detox:** A gray box E2E testing and automation library for mobile apps. It offers good performance and reliability by interacting directly with native components. Requires more setup.
    *   **Appium:** An open-source tool for automating native, mobile web, and hybrid applications on iOS, Android, and Windows. More language bindings but can be slower than Detox.
    *   **Playwright with Appium (Experimental/Emerging):** Playwright is gaining capabilities for mobile testing, often by connecting to an Appium server.
    *   **Expo's Test Suites (Experimental):** Expo is working on more integrated E2E testing solutions; check current Expo documentation.
*   **What to Test:**
    *   Critical user flows (e.g., onboarding, session creation, joining a session, completing a core task).
    *   Navigation between screens.
    *   Form submissions and data persistence.
    *   Basic UI element presence and interactivity across key screens.
*   **Example: Simple E2E Test Case (Conceptual Detox-like syntax):**
    ```javascript
    // e2e/onboarding.test.js
    // describe('Onboarding Flow', () => {
    //   beforeAll(async () => {
    //     await device.launchApp({ newInstance: true });
    //   });

    //   it('should complete the sign-up process', async () => {
    //     await element(by.id('getStartedButton')).tap(); // Assuming testIDs
    //     await element(by.id('fullNameInput')).typeText('Test User');
    //     await element(by.id('emailInput')).typeText('test@example.com');
    //     await element(by.id('passwordInput')).typeText('password123');
    //     await element(by.id('confirmPasswordInput')).typeText('password123');
    //     await element(by.id('termsCheckbox')).tap();
    //     await element(by.id('createAccountButton')).tap();

    //     // Expect to navigate to the next screen (e.g., Personality Assessment or Dashboard)
    //     await expect(element(by.id('personalityAssessmentScreen'))).toBeVisible();
    //   });
    // });
    ```
*   **Considerations:** E2E tests are powerful but can be slower and more brittle than unit or integration tests. Focus them on the most critical paths.

## 8.4. Testing AI Interactions

Testing AI-driven features requires specific strategies due to the non-deterministic nature of some AI outputs.

*   **Mocking AI Service Responses:**
    *   When testing components that rely on AI Orchestration Layer (which in turn calls Google GenAI, ElevenLabs, etc.), mock the AI Orchestration Layer API responses (as in 8.2) to return predictable, structured data.
    *   This allows testing of how the UI handles various AI outputs (e.g., different generated scripts for Udine, different analysis results, empty results, errors).
*   **Snapshot Testing for AI-Generated Content (Use with caution):**
    *   For features where AI generates relatively stable textual content (e.g., a specific type of summary based on fixed input), Jest snapshot testing can be used. However, if prompts or models change frequently, snapshots can become brittle.
*   **Testing Conversational Flow Branches:**
    *   For features like the Conversational Personality Assessment (Screen 2.3) or Udine's in-session guidance (Part 7), design tests that provide specific inputs to trigger different conversational branches and verify that Udine's responses and the UI state change as expected according to the defined logic in AI Orchestration Layer.
*   **Validating Structure of AI-Generated Data:**
    *   Even if the exact content varies, the *structure* of data returned by AI Orchestration Layer (after processing GenAI output) should be consistent. Write tests to validate this schema.
    *   For example, if AI Orchestration Layer is expected to return a list of themes, test that it's an array of strings, even if the strings themselves differ.
*   **Fixed Inputs for Core Logic Testing:**
    *   For testing the AI Orchestration Layer layer itself, use a set of fixed inputs (text, dummy file data) and verify that AI Orchestration Layer calls the correct downstream services (Google GenAI, etc.) with the expected parameters and handles their responses appropriately. This is more backend-focused testing for AI Orchestration Layer developers.
*   **Human Review for Subjective Outputs:** For aspects like the quality of Udine's advice or the relevance of AI-generated insights, automated tests have limitations. Incorporate human review and feedback loops (e.g., during UAT or internal testing) for these subjective elements.

## 8.5. Sentry for Debugging & Monitoring (Developer Focus)

Sentry (as set up in Part 5.4 and Dev Guide 2.7) is not just for production monitoring but also a valuable tool during development and debugging.

*   **Development Cycle Debugging:**
    *   Ensure `enableInExpoDevelopment: true` is set in Sentry init during development to capture errors in dev builds.
    *   When an error occurs, the Sentry dashboard provides detailed stack traces (with source maps if configured), breadcrumbs (user actions leading to the error), and device/OS context. This can be much more informative than relying solely on console logs.
*   **Tracking Issues Across Services:**
    *   **Correlation ID:** If AI Orchestration Layer, Supabase Edge Functions, and Nodely also integrate with Sentry (ideally in the same Sentry organization but different projects), ensure a `correlationId` is passed along in API requests between the Expo app and these backend services. Log this `correlationId` with any Sentry events. This allows you to trace a single user interaction or data flow across multiple services in Sentry, making it easier to pinpoint the source of an issue.
    *   **Example:** Expo app makes a call to AI Orchestration Layer. AI Orchestration Layer includes the received `correlationId` when it logs an error to Sentry related to that request.
*   **Monitoring AI Service Interactions:**
    *   AI Orchestration Layer should explicitly capture and report errors from Google GenAI, ElevenLabs, Dappier, etc., to Sentry, including relevant request parameters (excluding sensitive data) and the error response from the service. This helps identify if issues are due to our logic or the external AI service.
*   **Performance Monitoring in Dev:** Use Sentry's performance monitoring tools during development to identify slow screen loads, unresponsive UI elements, or lengthy API calls to AI Orchestration Layer/Supabase.
*   **User Feedback Reports:** If Sentry's User Feedback feature is integrated, review feedback submitted during testing phases directly in Sentry, linked to any related errors or traces.
*   **Preparing for Production:** Familiarity with Sentry during development makes it easier to interpret and act on production alerts once the app is live. Test alert configurations in a staging environment.
