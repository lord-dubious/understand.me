import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { VoiceInteractionCore } from '../components/VoiceInteractionCore';
import ChatUI from '../components/ChatUI';
import tools from '../utils/tools';

/**
 * Main home screen that combines voice interaction and chat interface
 * This is where users interact with Udine for conflict resolution
 */
export default function HomeScreen() {
  const [lastVoiceInput, setLastVoiceInput] = useState<string>('');
  const [lastAIResponse, setLastAIResponse] = useState<string>('');

  const handleVoiceInput = (text: string) => {
    setLastVoiceInput(text);
    console.log('Voice input received:', text);
  };

  const handleAIResponse = (response: string) => {
    setLastAIResponse(response);
    console.log('AI response received:', response);
    
    // Show a brief notification of the AI response
    Alert.alert('Udine says:', response.length > 100 ? response.substring(0, 100) + '...' : response);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#0F172A', '#1E293B']} style={StyleSheet.absoluteFill} />

      <View style={styles.topContent}>
        <Text style={styles.description}>
          Talk with Udine, your AI conflict resolution specialist, or use the chat below for text-based interaction.
        </Text>

        <View style={styles.voiceSection}>
          <Text style={styles.sectionTitle}>Voice Interaction</Text>
          <Text style={styles.sectionSubtitle}>
            Tap the microphone to start speaking with Udine
          </Text>
          
          <View style={styles.voiceContainer}>
            <VoiceInteractionCore
              onVoiceInput={handleVoiceInput}
              onAIResponse={handleAIResponse}
            />
          </View>

          {lastVoiceInput && (
            <View style={styles.lastInteraction}>
              <Text style={styles.lastInputLabel}>Last voice input:</Text>
              <Text style={styles.lastInputText}>{lastVoiceInput}</Text>
            </View>
          )}
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
  description: { 
    color: '#E2E8F0', 
    fontSize: 16, 
    marginBottom: 24, 
    textAlign: 'center',
    lineHeight: 24,
  },
  voiceSection: {
    marginBottom: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#F1F5F9',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  voiceContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  lastInteraction: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 12,
    maxWidth: '90%',
  },
  lastInputLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginBottom: 4,
  },
  lastInputText: {
    color: '#F1F5F9',
    fontSize: 14,
    lineHeight: 20,
  },
  chatContainer: { flex: 1 },
});
