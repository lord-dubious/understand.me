import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Phase {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface SessionPhasesProps {
  phases: Phase[];
  onPhaseSelect?: (phaseId: string) => void;
  allowNavigation?: boolean;
}

export const SessionPhases: React.FC<SessionPhasesProps> = ({
  phases,
  onPhaseSelect,
  allowNavigation = false
}) => {
  const getPhaseIcon = (phaseId: string) => {
    switch (phaseId) {
      case 'preparation':
        return '🎯';
      case 'exploration':
        return '🔍';
      case 'understanding':
        return '💡';
      case 'resolution':
        return '🤝';
      case 'healing':
        return '🌱';
      default:
        return '📋';
    }
  };

  const getPhaseColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'current':
        return '#2196F3';
      case 'upcoming':
        return '#9E9E9E';
      default:
        return '#9E9E9E';
    }
  };

  const getPhaseDescription = (phaseId: string) => {
    switch (phaseId) {
      case 'preparation':
        return 'Setting the foundation for productive dialogue';
      case 'exploration':
        return 'Understanding different perspectives and viewpoints';
      case 'understanding':
        return 'Finding common ground and shared values';
      case 'resolution':
        return 'Developing solutions and agreements';
      case 'healing':
        return 'Strengthening relationships and planning forward';
      default:
        return 'Phase description';
    }
  };

  const renderPhase = (phase: Phase, index: number) => {
    const isClickable = allowNavigation && (phase.status === 'completed' || phase.status === 'current');
    
    return (
      <TouchableOpacity
        key={phase.id}
        style={[
          styles.phaseContainer,
          { borderLeftColor: getPhaseColor(phase.status) },
          phase.status === 'current' && styles.currentPhase
        ]}
        onPress={() => isClickable && onPhaseSelect?.(phase.id)}
        disabled={!isClickable}
      >
        <View style={styles.phaseHeader}>
          <View style={styles.phaseIconContainer}>
            <Text style={styles.phaseIcon}>{getPhaseIcon(phase.id)}</Text>
            <View 
              style={[
                styles.statusIndicator,
                { backgroundColor: getPhaseColor(phase.status) }
              ]}
            />
          </View>
          
          <View style={styles.phaseInfo}>
            <Text style={[
              styles.phaseName,
              phase.status === 'current' && styles.currentPhaseText
            ]}>
              {phase.name}
            </Text>
            <Text style={styles.phaseDescription}>
              {phase.description || getPhaseDescription(phase.id)}
            </Text>
          </View>

          <View style={styles.phaseStatus}>
            <Text style={[
              styles.statusText,
              { color: getPhaseColor(phase.status) }
            ]}>
              {phase.status === 'completed' ? '✓' : 
               phase.status === 'current' ? '●' : '○'}
            </Text>
          </View>
        </View>

        {phase.status === 'current' && (
          <View style={styles.currentPhaseDetails}>
            <Text style={styles.currentPhaseLabel}>Current Phase</Text>
            <Text style={styles.currentPhaseGuidance}>
              Udine is guiding you through the {phase.name.toLowerCase()} phase. 
              Focus on {getPhaseGuidance(phase.id)}.
            </Text>
          </View>
        )}

        {index < phases.length - 1 && (
          <View style={styles.phaseConnector} />
        )}
      </TouchableOpacity>
    );
  };

  const getPhaseGuidance = (phaseId: string) => {
    switch (phaseId) {
      case 'preparation':
        return 'establishing trust and setting clear intentions';
      case 'exploration':
        return 'sharing perspectives without judgment';
      case 'understanding':
        return 'identifying underlying needs and concerns';
      case 'resolution':
        return 'creating mutually beneficial solutions';
      case 'healing':
        return 'rebuilding connection and planning next steps';
      default:
        return 'following Udine\'s guidance';
    }
  };

  const getCurrentPhaseIndex = () => {
    return phases.findIndex(phase => phase.status === 'current');
  };

  const getProgressPercentage = () => {
    const completedCount = phases.filter(phase => phase.status === 'completed').length;
    const currentIndex = getCurrentPhaseIndex();
    const totalPhases = phases.length;
    
    if (currentIndex >= 0) {
      return ((completedCount + 0.5) / totalPhases) * 100;
    }
    return (completedCount / totalPhases) * 100;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mediation Progress</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${getProgressPercentage()}%` }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(getProgressPercentage())}% Complete
          </Text>
        </View>
      </View>

      <View style={styles.phasesContainer}>
        {phases.map((phase, index) => renderPhase(phase, index))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Udine will guide you through each phase at the right pace
        </Text>
      </View>
    </View>
  );
};

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  phasesContainer: {
    flex: 1,
    padding: 20,
  },
  phaseContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  currentPhase: {
    backgroundColor: '#E3F2FD',
    borderLeftColor: '#2196F3',
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  phaseIconContainer: {
    alignItems: 'center',
    gap: 4,
  },
  phaseIcon: {
    fontSize: 24,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  phaseInfo: {
    flex: 1,
    gap: 4,
  },
  phaseName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  currentPhaseText: {
    color: '#1976D2',
  },
  phaseDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  phaseStatus: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentPhaseDetails: {
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderRadius: 8,
  },
  currentPhaseLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 4,
  },
  currentPhaseGuidance: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  phaseConnector: {
    position: 'absolute',
    bottom: -8,
    left: 32,
    width: 2,
    height: 8,
    backgroundColor: '#E0E0E0',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
