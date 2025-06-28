import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Alert } from 'react-native';
import { DashboardScreen } from './screens/DashboardScreen';
import { SessionScreen } from './screens/SessionScreen';
import { useAppStore } from './store/useAppStore';

export default function App() {
  const {
    isAuthenticated,
    activeScreen,
    currentSession,
    loadUser,
    loadSessions,
    selectSession,
    createSession,
    setActiveScreen
  } = useAppStore();

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // TODO: Check for stored auth token and load user
      // For now, we'll simulate being logged in
      await loadUser();
      await loadSessions();
      setIsInitialized(true);
    } catch (error) {
      console.error('App initialization error:', error);
      setIsInitialized(true);
    }
  };

  const handleSessionSelect = async (sessionId: string) => {
    try {
      await selectSession(sessionId);
    } catch (error) {
      console.error('Session selection error:', error);
      Alert.alert('Error', 'Failed to load session');
    }
  };

  const handleCreateSession = async () => {
    try {
      const sessionId = await createSession('New Mediation Session');
      if (sessionId) {
        await selectSession(sessionId);
      } else {
        Alert.alert('Error', 'Failed to create session');
      }
    } catch (error) {
      console.error('Session creation error:', error);
      Alert.alert('Error', 'Failed to create session');
    }
  };

  const handleSessionEnd = () => {
    setActiveScreen('dashboard');
  };

  if (!isInitialized) {
    // TODO: Add proper loading screen
    return <View style={styles.container} />;
  }

  // TODO: Add authentication screens when not authenticated
  // For now, we'll show the main app

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {activeScreen === 'dashboard' ? (
        <DashboardScreen
          onSessionSelect={handleSessionSelect}
          onCreateSession={handleCreateSession}
        />
      ) : activeScreen === 'session' && currentSession ? (
        <SessionScreen
          sessionId={currentSession.id}
          onSessionEnd={handleSessionEnd}
        />
      ) : (
        <DashboardScreen
          onSessionSelect={handleSessionSelect}
          onCreateSession={handleCreateSession}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
