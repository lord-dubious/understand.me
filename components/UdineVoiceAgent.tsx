import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useConversation } from '@elevenlabs/react';

interface UdineVoiceAgentProps {
  sessionId: string;
  phase: 'preparation' | 'exploration' | 'understanding' | 'resolution' | 'healing';
  onPhaseChange?: (newPhase: string) => void;
  onEmotionalInsight?: (insight: any) => void;
}

export const UdineVoiceAgent: React.FC<UdineVoiceAgentProps> = ({
  sessionId,
  phase,
  onPhaseChange,
  onEmotionalInsight
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const conversation = useConversation({
    onConnect: () => {
      console.log('Udine connected');
      setIsActive(true);
    },
    onDisconnect: () => {
      console.log('Udine disconnected');
      setIsActive(false);
    },
    onMessage: (message) => {
      console.log('Udine message:', message);
      setCurrentMessage(message.message);
      
      // TODO: Process message for emotional insights
      // TODO: Integrate with Hume AI analysis
      if (onEmotionalInsight) {
        onEmotionalInsight({
          message: message.message,
          timestamp: new Date().toISOString(),
          phase: phase
        });
      }
    },
    onError: (error) => {
      console.error('Udine error:', error);
    }
  });

  const startConversation = async () => {
    try {
      await conversation.startSession({
        agentId: process.env.EXPO_PUBLIC_ELEVENLABS_AGENT_ID || 'udine-agent',
        sessionConfig: {
          sessionId: sessionId,
          phase: phase,
          context: `AI mediation session in ${phase} phase`
        }
      });
    } catch (error) {
      console.error('Failed to start Udine conversation:', error);
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end Udine conversation:', error);
    }
  };

  const getPhaseMessage = () => {
    switch (phase) {
      case 'preparation':
        return 'Welcome to your mediation session. I\'m Udine, and I\'ll be guiding you through this process.';
      case 'exploration':
        return 'Let\'s explore the different perspectives and understand what brought us here.';
      case 'understanding':
        return 'Now let\'s work on understanding each other\'s underlying needs and concerns.';
      case 'resolution':
        return 'Great progress! Let\'s focus on finding solutions that work for everyone.';
      case 'healing':
        return 'Let\'s take time to acknowledge the progress made and plan for moving forward.';
      default:
        return 'I\'m here to help facilitate your conversation.';
    }
  };

  useEffect(() => {
    // Update conversation context when phase changes
    if (conversation.status === 'connected') {
      conversation.setSessionConfig({
        phase: phase,
        context: `AI mediation session in ${phase} phase`
      });
    }
  }, [phase]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Udine - AI Mediator</Text>
        <View style={[styles.statusIndicator, { backgroundColor: isActive ? '#4CAF50' : '#9E9E9E' }]} />
      </View>

      <View style={styles.phaseIndicator}>
        <Text style={styles.phaseText}>Current Phase: {phase.charAt(0).toUpperCase() + phase.slice(1)}</Text>
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          {currentMessage || getPhaseMessage()}
        </Text>
      </View>

      <View style={styles.controls}>
        {!isActive ? (
          <TouchableOpacity style={styles.startButton} onPress={startConversation}>
            <Text style={styles.buttonText}>Start Conversation with Udine</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.endButton} onPress={endConversation}>
            <Text style={styles.buttonText}>End Conversation</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Udine's Capabilities:</Text>
        <Text style={styles.featureItem}>• Turn-taking conversation flow</Text>
        <Text style={styles.featureItem}>• Emotional intelligence analysis</Text>
        <Text style={styles.featureItem}>• 5-phase mediation guidance</Text>
        <Text style={styles.featureItem}>• Real-time conflict analysis</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  phaseIndicator: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  phaseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
    textAlign: 'center',
  },
  messageContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  controls: {
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  endButton: {
    backgroundColor: '#F44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  features: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
});
