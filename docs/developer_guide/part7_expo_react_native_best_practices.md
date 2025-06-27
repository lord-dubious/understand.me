# Part 7: Expo (React Native) Best Practices

This part of the Developer Guide outlines best practices, conventions, and common patterns to be followed when developing the "Understand.me" mobile application using Expo and React Native with TypeScript. Adherence to these practices will help ensure code quality, maintainability, performance, and a consistent developer experience.

## 7.1. Project Structure for Expo App

A well-organized project structure is key to managing a growing codebase. The following structure is recommended for the `/app` (or similarly named Expo project) directory:

```
/app
|-- assets/                 # Static assets like images, fonts, Lottie files
|   |-- fonts/
|   |-- images/
|   |-- lottie/
|-- components/             # Shared, reusable UI components (dumb components)
|   |-- common/             # Basic elements like Button, Card, Icon, InputWrapper
|   |-- layout/             # Structural components like Header, Container, Grid
|   |-- featureX/           # Components specific to a feature (e.g., session, growth)
|-- constants/              # Application-wide constants (colors, spacing, routes, enums)
|   |-- colors.ts
|   |-- theme.ts
|   |-- navigationRoutes.ts
|-- navigation/             # React Navigation setup and navigators
|   |-- AppNavigator.tsx    # Main app navigator (e.g., Auth vs. Main App stack)
|   |-- AuthStackNavigator.tsx
|   |-- MainTabNavigator.tsx
|   |-- HomeStackNavigator.tsx # Example stack for a tab
|   |-- index.ts            # Exports for navigators
|-- screens/                # Top-level screen components (smart components)
|   |-- auth/               # Authentication screens (Login, SignUp, ForgotPassword)
|   |-- main/               # Screens after login, grouped by tab/feature
|   |   |-- dashboard/
|   |   |-- sessions/
|   |   |-- growth/
|   |   |-- settings/
|   |-- onboarding/         # Onboarding flow screens
|-- services/               # Modules for interacting with external APIs and backend
|   |-- supabaseClient.ts   # Supabase client initialization
|   |-- picaosApiService.ts # Service for AI Orchestration Layer interactions
|   |-- authService.ts      # Authentication related functions
|   |-- sessionService.ts
|   |-- fileService.ts      # File upload/download logic
|-- store/                  # State management (e.g., Zustand or Redux Toolkit)
|   |-- index.ts            # Root store setup
|   |-- userStore.ts        # Slice/store for user-related state
|   |-- sessionStore.ts     # Slice/store for session-related state
|-- hooks/                  # Custom React Hooks for reusable logic
|   |-- useAuth.ts
|   |-- useKeyboardVisibility.ts
|-- types/                  # TypeScript type definitions
|   |-- supabase.ts         # Auto-generated Supabase types
|   |-- navigation.ts       # Types for React Navigation params
|   |-- api.ts              # Types for API request/response
|   |-- index.ts            # Global or shared types
|-- utils/                  # Utility functions (formatting, validation, helpers)
|-- App.tsx                 # Main application entry point
|-- app.config.js           # Expo app configuration
|-- babel.config.js         # Babel configuration
|-- .env                    # Environment variables (gitignored)
|-- .env.example            # Example environment variables
|-- tsconfig.json           # TypeScript configuration
```

**Key Principles:**
*   **Separation of Concerns:** Screens are "smart" components that fetch data and manage high-level state, while `components/` are generally "dumb" presentational components.
*   **Modularity:** Group files by feature (e.g., `screens/main/sessions/`, `components/featureX/`) or by type (e.g., `hooks/`, `services/`).
*   **Clear Naming:** Use consistent and descriptive naming conventions for files and folders.

## 7.2. Navigation with React Navigation

React Navigation is the standard for routing and navigation in React Native applications.

*   **Navigator Types:**
    *   **Stack Navigator (`@react-navigation/stack`):** For managing hierarchical navigation where screens are pushed onto and popped off a stack (e.g., drilling down into details, multi-step forms).
    *   **Bottom Tab Navigator (`@react-navigation/bottom-tabs`):** For primary, top-level navigation sections of the app (e.g., Dashboard, Sessions, Growth, Settings - See UI Guide 1.5).
    *   **Drawer Navigator (`@react-navigation/drawer`):** Can be used for auxiliary navigation items if a "More" tab approach isn't sufficient.
    *   **Top Tab Navigator (`@react-navigation/material-top-tabs`):** Useful for swipable tabs within a specific screen (e.g., different views of session details - UI Guide 1.5).
*   **Best Practices:**
    *   **Typed Routes:** Define types for your route names and parameters for type safety (see `types/navigation.ts`).
        ```typescript
        // types/navigation.ts
        export type RootStackParamList = {
          Auth: undefined; // No params for Auth stack itself
          MainApp: { screen: string }; // Example: navigate to a specific tab
          SessionDetail: { sessionId: string };
          // ... other screens
        };
        ```
    *   **Centralized Navigation Setup:** Configure navigators in the `navigation/` directory. The `AppNavigator.tsx` can handle logic for switching between Auth and Main app stacks based on user authentication state.
    *   **Passing Parameters:**
        ```typescript
        // Navigating to a route with params
        navigation.navigate('SessionDetail', { sessionId: '123' });

        // Accessing params in the screen component
        import { RouteProp, useRoute } from '@react-navigation/native';
        type SessionDetailRouteProp = RouteProp<RootStackParamList, 'SessionDetail'>;
        const route = useRoute<SessionDetailRouteProp>();
        const { sessionId } = route.params;
        ```
    *   **Deep Linking:** Configure deep linking for handling incoming links (e.g., email invitations `understandmeapp://invitation/[inviteId]`, session joining `understandmeapp://join/[code]`). This is set up in `app.config.js` and handled within your navigation configuration. Refer to Expo and React Navigation documentation for detailed setup.
    *   **Header Customization:** Utilize Stack Navigator's `options` prop to customize headers (title, buttons, styling) per screen or for the entire navigator.
    *   **Preventing Double Taps:** Use a mechanism (e.g., a custom hook or utility) to prevent navigation actions from being triggered multiple times on rapid taps.

## 7.3. State Management Strategy

For "Understand.me," **Zustand** is recommended for its simplicity, flexibility, and minimal boilerplate. Redux Toolkit is a viable alternative if the team has strong prior experience or if more complex middleware patterns are anticipated early on.

*   **Zustand Store Setup (`store/index.ts`, `store/userStore.ts`, etc.):**
    *   **Create Stores (Slices):** Create separate stores for different logical domains (e.g., `userStore`, `sessionStore`, `settingsStore`).
        ```typescript
        // store/userStore.ts
        import { create } from 'zustand';

        interface UserState {
          profile: Profile | null;
          isLoading: boolean;
          error: string | null;
          setProfile: (profile: Profile) => void;
          fetchProfile: (userId: string, supabaseClient: SupabaseClient) => Promise<void>;
        }

        export const useUserStore = create<UserState>((set) => ({
          profile: null,
          isLoading: false,
          error: null,
          setProfile: (profile) => set({ profile }),
          fetchProfile: async (userId, supabaseClient) => {
            set({ isLoading: true, error: null });
            try {
              const { data, error } = await supabaseClient
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
              if (error) throw error;
              set({ profile: data, isLoading: false });
            } catch (err: any) {
              set({ error: err.message, isLoading: false });
            }
          },
        }));
        ```
    *   **Combining Stores (Optional):** While Zustand stores are independent, you can create a root hook or context if you need to easily access multiple stores, though direct imports are common.
*   **Connecting Components:**
    *   Import the store hook directly into your React Native components:
        ```typescript
        // In a screen component
        import { useUserStore } from '../store/userStore';

        function ProfileScreen() {
          const profile = useUserStore((state) => state.profile);
          const fetchProfile = useUserStore((state) => state.fetchProfile);
          const isLoading = useUserStore((state) => state.isLoading);

          // useEffect(() => { fetchProfile(userId, supabase); }, [userId]);
          // ...
        }
        ```
*   **Async Actions:** Perform async operations (like API calls) within store actions, updating state with `set()`.
*   **Persisting State (Optional):** For persisting parts of the store (e.g., user preferences, session tokens if not handled by Supabase client) to AsyncStorage, use Zustand's `persist` middleware.
    *   **Handling Server-Side Cached Data (e.g., from Upstash Redis via AI Orchestration Layer/Edge Functions):**
        *   The client typically doesn't need to know *if* data was served from a server-side cache like Upstash Redis; this is an optimization handled by the backend (AI Orchestration Layer, Supabase Edge Functions).
        *   However, the app should still employ good client-side caching strategies for data it fetches (e.g., using React Query, RTK Query, or custom context/store logic with AsyncStorage for fetched server data).
        *   If data is known to be aggressively cached server-side and might become stale on the client, implement appropriate cache-busting mechanisms in API requests (e.g., versioning, ETags if supported by AI Orchestration Layer API) or rely on real-time updates (Supabase Realtime) to refresh client-side state when underlying data changes.
        *   For critical data, ensure there's a way to force a refresh from the server, bypassing any client-side cache, if needed.

## 7.4. Styling with StyleSheet API / NativeWind

*   **StyleSheet API (Primary):**
    *   **Convention:** Define styles in a `StyleSheet.create({...})` block at the bottom of the component file or in a separate `styles.ts` file for very complex components.
    *   **Theming:** Create a `constants/theme.ts` file defining common colors, font sizes, spacing units, etc. Import these into your StyleSheets.
        ```typescript
        // constants/colors.ts
        export const COLORS = { primary: '#007AFF', text: '#333333', background: '#FFFFFF' };
        // constants/theme.ts
        import { COLORS } from './colors';
        export const THEME = {
          colors: COLORS,
          spacing: (unit: number) => unit * 8,
          fontSize: { small: 12, medium: 16, large: 20 },
        };

        // In a component
        // import { THEME } from '../../constants/theme';
        // const styles = StyleSheet.create({
        //   container: { padding: THEME.spacing(2), backgroundColor: THEME.colors.background },
        //   title: { fontSize: THEME.fontSize.large, color: THEME.colors.primary },
        // });
        ```
    *   **Platform-Specific Styles:** Use `Platform.select({...})` for minor OS-specific style adjustments.
*   **NativeWind (Optional, for Tailwind CSS utility-first syntax):**
    *   If the team prefers utility-first styling and consistency with a web project using Tailwind CSS, NativeWind can be integrated.
    *   **Setup:** Follow NativeWind installation instructions (`npm install nativewind`, `tailwind-rn` or `twrnc`, configure `tailwind.config.js` and `babel.config.js`).
    *   **Usage:**
        ```typescript
        import { Text, View } from 'react-native';
        import { styled } from 'nativewind';

        const StyledView = styled(View);
        const StyledText = styled(Text);

        function MyComponent() {
          return (
            <StyledView className="p-4 bg-blue-500">
              <StyledText className="text-white text-lg">Hello NativeWind!</StyledText>
            </StyledView>
          );
        }
        ```
*   **Responsive Design:**
    *   Use Flexbox for layout (default in React Native).
    *   Employ percentage-based widths/heights or `Dimensions` API for screen-size-dependent layouts.
    *   Consider using libraries like `react-native-responsive-screen` for more fine-grained control if needed.
    *   Test on various device sizes and orientations.

## 7.5. Working with Expo APIs

Expo provides a rich set of APIs for accessing native device features.

*   **`expo-av` (Audio/Video):**
    *   **Recording Audio (Component 10.1):**
        ```typescript
        // const { sound, status } = await Audio.Recording.createAsync(
        //   Audio.RecordingOptionsPresets.HIGH_QUALITY
        // );
        // await sound.startAsync();
        // const uri = sound.getURI(); // Send this URI to STT service
        ```
    *   **Playing Audio (Component 10.2 - Udine's voice):**
        ```typescript
        // const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
        // await sound.playAsync();
        ```
    *   Remember to request `AudioRecordingPermission` before recording.
*   **`expo-document-picker` / `expo-image-picker` (Component 10.3):**
    *   Used for selecting files or images from the device.
        ```typescript
        // import * as DocumentPicker from 'expo-document-picker';
        // const result = await DocumentPicker.getDocumentAsync({ type: '*/*' }); // or specific types
        // if (result.type === 'success') { /* result.uri, result.name, result.size */ }

        // import * as ImagePicker from 'expo-image-picker';
        // const result = await ImagePicker.launchImageLibraryAsync(); // or launchCameraAsync
        // if (!result.canceled) { /* result.assets[0].uri */ }
        ```
    *   Request necessary permissions (`MediaLibraryPermissions`, `CameraPermissions`).
*   **`expo-notifications` (Component 10.6):**
    *   For scheduling and receiving local and push notifications.
    *   Request `NotificationPermissions`.
    *   Get `ExpoPushToken` and send to your backend (e.g., Supabase) for sending push notifications.
*   **`expo-file-system`:**
    *   For managing files on the device's local file system (e.g., downloading and storing session summaries, caching).
        ```typescript
        // import * as FileSystem from 'expo-file-system';
        // const downloadResumable = FileSystem.createDownloadResumable(...);
        // const { uri } = await downloadResumable.downloadAsync();
        ```
*   **`expo-secure-store`:**
    *   For storing small amounts of sensitive data securely (e.g., API keys if not using build secrets, though build secrets are preferred for keys not needed directly by client at runtime). Data stored here is encrypted.
        ```typescript
        // import * as SecureStore from 'expo-secure-store';
        // await SecureStore.setItemAsync('myKey', 'myValue');
        // const value = await SecureStore.getItemAsync('myKey');
        ```
*   **Permissions Handling:** Always check and request permissions using `expo-permissions` (or specific module's permission functions) before accessing sensitive APIs. Provide clear explanations to the user why permissions are needed.

## 7.6. Performance Optimization in React Native

*   **`FlatList` / `SectionList` / `VirtualizedList`:** Use these for long lists of data instead of mapping over items in a `<ScrollView>` to ensure off-screen items are not rendered (windowing). Implement `keyExtractor` correctly.
*   **`React.memo`:** Wrap components in `React.memo` to prevent re-renders if their props haven't changed. Use a custom comparison function if needed.
*   **`useCallback` and `useMemo`:** Memoize functions and values to prevent unnecessary re-renders of child components that depend on them.
*   **Image Optimization (`<Image>` component and `expo-image`):**
    *   Use appropriate image sizes; don't load oversized images.
    *   Consider using `expo-image` for advanced features like caching, placeholders, and better performance.
    *   Use WEBP format where possible for better compression.
*   **Bundle Size Reduction:**
    *   Analyze bundle with `expo-bundle-analyzer`.
    *   Avoid importing large libraries if only a small part is used (tree-shaking).
    *   Optimize assets (compress images, use vector graphics where possible).
*   **Avoid Anonymous Functions in Props:** Defining functions directly in props (e.g., `onPress={() => console.log('hi')}`) can cause unnecessary re-renders because a new function instance is created each time. Define them outside the JSX or memoize with `useCallback`.
*   **Native Modules:** For computationally intensive tasks that block the JS thread, consider writing custom native modules (though this adds complexity and ejects from Expo Go compatibility if not using EAS Build with development clients). AI Orchestration Layer might handle some of these heavy tasks off the JS thread if it involves native components.
*   **Minimize Bridge Traffic:** Each call over the React Native bridge (JS to Native) has overhead. Batch operations where possible.

## 7.7. Cross-Platform Considerations (iOS/Android)

*   **UI Differences:**
    *   Some React Native components render differently by default on iOS and Android (e.g., `<Picker>`, `<Switch>`, `<DatePickerIOS/DatePickerAndroid>` before community versions). Aim for consistency using custom components or libraries that abstract these, or accept minor platform differences where they align with native look and feel.
    *   Use `Platform.OS === 'ios'` or `Platform.OS === 'android'` for small style or logic adjustments.
    *   `Platform.select({...})` is useful for platform-specific style objects.
*   **Native APIs:** Some Expo APIs might have platform-specific behaviors or options. Read documentation carefully.
*   **Permissions:** Permission request flows and dialogs can differ. Test on both platforms.
*   **File System Paths:** Directory structures can vary (`FileSystem.documentDirectory`, etc.).
*   **Testing:** Thoroughly test on both iOS and Android devices and simulators/emulators.
*   **Shadows/Elevation:** Android uses `elevation`, iOS uses `shadow*` properties for shadows. `StyleSheet` often abstracts this, but custom shadows may need platform-specific code.
