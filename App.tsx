import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import ConvAiDOMComponent from './components/ConvAiDOMComponent';
import ChatUI from './components/ChatUI';
import tools from './utils/tools';

/**
 * Renders the main application UI for a cross-platform conversational AI agent using Expo and ElevenLabs.
 *
 * Displays a gradient background, descriptive text, a list of available client tools with supported platforms, a conversational AI DOM component, and a chat interface.
 *
 * @returns The root React element for the application.
 */
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={StyleSheet.absoluteFill} />

      <View style={styles.topContent}>
        <Text style={styles.description}>
          Cross-platform conversational AI agents with ElevenLabs and Expo React Native.
        </Text>

        <View style={styles.toolsList}>
          <Text style={styles.toolsTitle}>Available Client Tools:</Text>
          <View style={styles.toolItem}>
            <Text style={styles.toolText}>Get battery level</Text>
            <View style={styles.platformTags}>
              <Text style={styles.platformTag}>web</Text>
              <Text style={styles.platformTag}>ios</Text>
              <Text style={styles.platformTag}>android</Text>
            </View>
          </View>
          <View style={styles.toolItem}>
            <Text style={styles.toolText}>Change screen brightness</Text>
            <View style={styles.platformTags}>
              <Text style={styles.platformTag}>ios</Text>
              <Text style={styles.platformTag}>android</Text>
            </View>
          </View>
          <View style={styles.toolItem}>
            <Text style={styles.toolText}>Flash screen</Text>
            <View style={styles.platformTags}>
              <Text style={styles.platformTag}>ios</Text>
              <Text style={styles.platformTag}>android</Text>
            </View>
          </View>
        </View>

        <View style={styles.domComponentContainer}>
          <ConvAiDOMComponent
            dom={{ style: styles.domComponent }}
            platform={Platform.OS}
            get_battery_level={tools.get_battery_level}
            change_brightness={tools.change_brightness}
            flash_screen={tools.flash_screen}
          />
        </View>

        <View style={styles.chatContainer}>
          <ChatUI />
        </View>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topContent: { flex: 1, padding: 16 },
  description: { color: '#E2E8F0', fontSize: 16, marginBottom: 16 },
  toolsList: { marginBottom: 24 },
  toolsTitle: { color: '#94A3B8', fontSize: 14, marginBottom: 8 },
  toolItem: { marginBottom: 8 },
  toolText: { color: '#F1F5F9', fontSize: 14 },
  platformTags: { flexDirection: 'row', marginTop: 4 },
  platformTag: {
    color: '#CBD5E1',
    backgroundColor: '#334155',
    borderRadius: 4,
    paddingHorizontal: 6,
    marginRight: 4,
    fontSize: 12,
  },
  domComponentContainer: { alignItems: 'center', marginBottom: 24 },
  domComponent: { width: 120, height: 120 },
  chatContainer: { flex: 1 },
});
