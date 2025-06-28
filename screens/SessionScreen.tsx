import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { UdineVoiceAgent } from '../components/UdineVoiceAgent';
import { EmotionalInsights } from '../components/EmotionalInsights';
import { SessionPhases } from '../components/SessionPhases';

interface SessionScreenProps {
  sessionId: string;
  onSessionEnd?: () => void;
}

export const SessionScreen: React.FC<SessionScreenProps> = ({
  sessionId,
  onSessionEnd
}) => {
  const [currentPhase, setCurrentPhase] = useState<string>('preparation');
  const [emotionalData, setEmotionalData] = useState<any>(null);
  const [sessionData, setSessionData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'conversation' | 'emotions' | 'phases'>('conversation');

  const phases = [
    {
      id: 'preparation',
      name: 'Preparation',
      description: 'Setting the foundation for productive dialogue',
      status: currentPhase === 'preparation' ? 'current' : 
              ['exploration', 'understanding', 'resolution', 'healing'].includes(currentPhase) ? 'completed' : 'upcoming'
    },
    {
      id: 'exploration',
      name: 'Exploration',
      description: 'Understanding different perspectives and viewpoints',
      status: currentPhase === 'exploration' ? 'current' : 
              ['understanding', 'resolution', 'healing'].includes(currentPhase) ? 'completed' : 
              currentPhase === 'preparation' ? 'upcoming' : 'completed'
    },
    {
      id: 'understanding',
      name: 'Understanding',
      description: 'Finding common ground and shared values',
      status: currentPhase === 'understanding' ? 'current' : 
              ['resolution', 'healing'].includes(currentPhase) ? 'completed' : 'upcoming'
    },
    {
      id: 'resolution',
      name: 'Resolution',
      description: 'Developing solutions and agreements',
      status: currentPhase === 'resolution' ? 'current' : 
              currentPhase === 'healing' ? 'completed' : 'upcoming'
    },
    {
      id: 'healing',
      name: 'Healing',
      description: 'Strengthening relationships and planning forward',
      status: currentPhase === 'healing' ? 'current' : 'upcoming'
    }
  ] as const;

  useEffect(() => {
    fetchSessionData();
  }, [sessionId]);

  const fetchSessionData = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/sessions/${sessionId}`);
      const data = await response.json();
      
      if (data.success) {
        setSessionData(data.session);
        setCurrentPhase(data.session.phases?.current || 'preparation');
      }
    } catch (error) {
      console.error('Failed to fetch session data:', error);
      Alert.alert('Error', 'Failed to load session data');
    }
  };

  const handlePhaseChange = async (newPhase: string) => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/sessions/${sessionId}/advance-phase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPhase: currentPhase,
          nextPhase: newPhase
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setCurrentPhase(newPhase);
        Alert.alert('Phase Updated', `Moved to ${newPhase} phase`);
      }
    } catch (error) {
      console.error('Failed to advance phase:', error);
      Alert.alert('Error', 'Failed to advance to next phase');
    }
  };

  const handleEmotionalInsight = (insight: any) => {
    setEmotionalData(insight);
    
    // TODO: Send to Hume AI for analysis
    // TODO: Update session with emotional context
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'conversation':
        return (
          <UdineVoiceAgent
            sessionId={sessionId}
            phase={currentPhase as any}
            onPhaseChange={handlePhaseChange}
            onEmotionalInsight={handleEmotionalInsight}
          />
        );
      case 'emotions':
        return (
          <EmotionalInsights
            sessionId={sessionId}
            currentData={emotionalData}
            showHistory={true}
          />
        );
      case 'phases':
        return (
          <SessionPhases
            phases={phases}
            onPhaseSelect={handlePhaseChange}
            allowNavigation={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TabButton
          title="Conversation"
          active={activeTab === 'conversation'}
          onPress={() => setActiveTab('conversation')}
          icon="💬"
        />
        <TabButton
          title="Emotions"
          active={activeTab === 'emotions'}
          onPress={() => setActiveTab('emotions')}
          icon="❤️"
        />
        <TabButton
          title="Phases"
          active={activeTab === 'phases'}
          onPress={() => setActiveTab('phases')}
          icon="📋"
        />
      </View>

      <View style={styles.content}>
        {renderTabContent()}
      </View>
    </View>
  );
};

interface TabButtonProps {
  title: string;
  active: boolean;
  onPress: () => void;
  icon: string;
}

const TabButton: React.FC<TabButtonProps> = ({ title, active, onPress, icon }) => (
  <TouchableOpacity
    style={[styles.tabButton, active && styles.activeTab]}
    onPress={onPress}
  >
    <Text style={styles.tabIcon}>{icon}</Text>
    <Text style={[styles.tabText, active && styles.activeTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
});
