import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  FlatList 
} from 'react-native';

interface Session {
  id: string;
  title: string;
  status: 'active' | 'completed' | 'scheduled';
  participants: number;
  createdAt: string;
  currentPhase?: string;
}

interface DashboardScreenProps {
  onSessionSelect: (sessionId: string) => void;
  onCreateSession: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onSessionSelect,
  onCreateSession
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalSessions: 0,
    activeSessions: 0,
    completedSessions: 0,
    emotionalGrowth: 0
  });

  useEffect(() => {
    fetchSessions();
    fetchStats();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/sessions');
      const data = await response.json();
      
      if (data.success) {
        setSessions(data.sessions);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      Alert.alert('Error', 'Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // TODO: Replace with actual API call
      // Mock data for now
      setStats({
        totalSessions: 12,
        activeSessions: 2,
        completedSessions: 10,
        emotionalGrowth: 85
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const getSessionStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#4CAF50';
      case 'completed':
        return '#2196F3';
      case 'scheduled':
        return '#FF9800';
      default:
        return '#9E9E9E';
    }
  };

  const getSessionStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'completed':
        return '✅';
      case 'scheduled':
        return '📅';
      default:
        return '⚪';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderSession = ({ item }: { item: Session }) => (
    <TouchableOpacity
      style={styles.sessionCard}
      onPress={() => onSessionSelect(item.id)}
    >
      <View style={styles.sessionHeader}>
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionTitle}>{item.title}</Text>
          <Text style={styles.sessionDate}>{formatDate(item.createdAt)}</Text>
        </View>
        <View style={styles.sessionStatus}>
          <Text style={styles.statusIcon}>{getSessionStatusIcon(item.status)}</Text>
          <Text style={[styles.statusText, { color: getSessionStatusColor(item.status) }]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.sessionDetails}>
        <Text style={styles.participantCount}>
          👥 {item.participants} participant{item.participants !== 1 ? 's' : ''}
        </Text>
        {item.currentPhase && (
          <Text style={styles.currentPhase}>
            📍 {item.currentPhase} phase
          </Text>
        )}
      </View>

      {item.status === 'active' && (
        <View style={styles.activeSessionBadge}>
          <Text style={styles.activeSessionText}>Continue Session</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderStatsCard = (title: string, value: number | string, icon: string, color: string) => (
    <View style={[styles.statsCard, { borderLeftColor: color }]}>
      <Text style={styles.statsIcon}>{icon}</Text>
      <View style={styles.statsInfo}>
        <Text style={styles.statsValue}>{value}</Text>
        <Text style={styles.statsTitle}>{title}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to Understand.me</Text>
        <Text style={styles.subtitle}>AI-mediated communication with Udine</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.statsGrid}>
          {renderStatsCard('Total Sessions', stats.totalSessions, '📊', '#2196F3')}
          {renderStatsCard('Active', stats.activeSessions, '🟢', '#4CAF50')}
          {renderStatsCard('Completed', stats.completedSessions, '✅', '#9C27B0')}
          {renderStatsCard('Growth Score', `${stats.emotionalGrowth}%`, '📈', '#FF9800')}
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.createButton} onPress={onCreateSession}>
          <Text style={styles.createButtonIcon}>➕</Text>
          <Text style={styles.createButtonText}>Start New Session</Text>
          <Text style={styles.createButtonSubtext}>Begin AI-mediated conversation</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sessionsContainer}>
        <View style={styles.sessionsHeader}>
          <Text style={styles.sectionTitle}>Recent Sessions</Text>
          <TouchableOpacity onPress={fetchSessions}>
            <Text style={styles.refreshButton}>🔄</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading sessions...</Text>
          </View>
        ) : sessions.length > 0 ? (
          <FlatList
            data={sessions}
            renderItem={renderSession}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.emptyTitle}>No sessions yet</Text>
            <Text style={styles.emptyText}>
              Start your first AI-mediated conversation with Udine
            </Text>
          </View>
        )}
      </View>

      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Udine's Capabilities</Text>
        <View style={styles.featuresList}>
          <FeatureItem 
            icon="🎯" 
            title="5-Phase Mediation" 
            description="Structured approach to conflict resolution"
          />
          <FeatureItem 
            icon="❤️" 
            title="Emotional Intelligence" 
            description="Real-time emotion analysis with Hume AI"
          />
          <FeatureItem 
            icon="🗣️" 
            title="Turn-Taking Voice" 
            description="Natural conversation flow with ElevenLabs"
          />
          <FeatureItem 
            icon="🧠" 
            title="AI Analysis" 
            description="LangChain-powered conflict understanding"
          />
        </View>
      </View>
    </ScrollView>
  );
};

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsContainer: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statsCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsIcon: {
    fontSize: 24,
  },
  statsInfo: {
    flex: 1,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statsTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actionsContainer: {
    padding: 20,
  },
  createButton: {
    backgroundColor: '#2196F3',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  createButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  sessionsContainer: {
    padding: 20,
  },
  sessionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  refreshButton: {
    fontSize: 20,
  },
  sessionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sessionDate: {
    fontSize: 12,
    color: '#666',
  },
  sessionStatus: {
    alignItems: 'center',
    gap: 4,
  },
  statusIcon: {
    fontSize: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sessionDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  participantCount: {
    fontSize: 14,
    color: '#666',
  },
  currentPhase: {
    fontSize: 14,
    color: '#666',
  },
  activeSessionBadge: {
    backgroundColor: '#E8F5E8',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  activeSessionText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  featuresContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
});
