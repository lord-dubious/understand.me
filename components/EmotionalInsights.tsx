import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface EmotionalData {
  emotions: {
    primary: string;
    secondary: string[];
    intensity: number;
    confidence: number;
  };
  sentiment: {
    polarity: string;
    score: number;
    confidence: number;
  };
  voiceAnalysis?: {
    tone: string;
    pace: string;
    volume: string;
    stress_indicators: string[];
  };
  timestamp: string;
}

interface EmotionalInsightsProps {
  sessionId: string;
  currentData?: EmotionalData;
  showHistory?: boolean;
}

export const EmotionalInsights: React.FC<EmotionalInsightsProps> = ({
  sessionId,
  currentData,
  showHistory = true
}) => {
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showHistory) {
      fetchEmotionalInsights();
    }
  }, [sessionId]);

  const fetchEmotionalInsights = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/emotions/session/${sessionId}/insights`);
      const data = await response.json();
      
      if (data.success) {
        setInsights(data.insights);
      }
    } catch (error) {
      console.error('Failed to fetch emotional insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEmotionColor = (emotion: string) => {
    const emotionColors: { [key: string]: string } = {
      joy: '#4CAF50',
      sadness: '#2196F3',
      anger: '#F44336',
      fear: '#9C27B0',
      surprise: '#FF9800',
      disgust: '#795548',
      anxiety: '#FF5722',
      hope: '#8BC34A',
      frustration: '#E91E63',
      calm: '#00BCD4',
      concern: '#FFC107',
      empathy: '#3F51B5',
      relief: '#CDDC39'
    };
    return emotionColors[emotion.toLowerCase()] || '#9E9E9E';
  };

  const getIntensityWidth = (intensity: number) => {
    return `${Math.max(10, intensity * 100)}%`;
  };

  const renderCurrentEmotions = () => {
    if (!currentData) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Emotional State</Text>
        
        <View style={styles.emotionCard}>
          <View style={styles.primaryEmotion}>
            <Text style={styles.emotionLabel}>Primary Emotion</Text>
            <View style={styles.emotionRow}>
              <View 
                style={[
                  styles.emotionIndicator, 
                  { backgroundColor: getEmotionColor(currentData.emotions.primary) }
                ]} 
              />
              <Text style={styles.emotionText}>{currentData.emotions.primary}</Text>
              <Text style={styles.intensityText}>
                {Math.round(currentData.emotions.intensity * 100)}%
              </Text>
            </View>
          </View>

          {currentData.emotions.secondary.length > 0 && (
            <View style={styles.secondaryEmotions}>
              <Text style={styles.emotionLabel}>Secondary Emotions</Text>
              {currentData.emotions.secondary.map((emotion, index) => (
                <View key={index} style={styles.emotionRow}>
                  <View 
                    style={[
                      styles.emotionIndicator, 
                      { backgroundColor: getEmotionColor(emotion) }
                    ]} 
                  />
                  <Text style={styles.emotionText}>{emotion}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.sentimentSection}>
            <Text style={styles.emotionLabel}>Sentiment</Text>
            <View style={styles.sentimentBar}>
              <View 
                style={[
                  styles.sentimentFill,
                  { 
                    width: getIntensityWidth(Math.abs(currentData.sentiment.score)),
                    backgroundColor: currentData.sentiment.score >= 0 ? '#4CAF50' : '#F44336',
                    alignSelf: currentData.sentiment.score >= 0 ? 'flex-start' : 'flex-end'
                  }
                ]}
              />
            </View>
            <Text style={styles.sentimentText}>
              {currentData.sentiment.polarity} ({currentData.sentiment.score.toFixed(2)})
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderVoiceAnalysis = () => {
    if (!currentData?.voiceAnalysis) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Voice Analysis</Text>
        <View style={styles.voiceCard}>
          <View style={styles.voiceMetric}>
            <Text style={styles.metricLabel}>Tone:</Text>
            <Text style={styles.metricValue}>{currentData.voiceAnalysis.tone}</Text>
          </View>
          <View style={styles.voiceMetric}>
            <Text style={styles.metricLabel}>Pace:</Text>
            <Text style={styles.metricValue}>{currentData.voiceAnalysis.pace}</Text>
          </View>
          <View style={styles.voiceMetric}>
            <Text style={styles.metricLabel}>Volume:</Text>
            <Text style={styles.metricValue}>{currentData.voiceAnalysis.volume}</Text>
          </View>
          
          {currentData.voiceAnalysis.stress_indicators.length > 0 && (
            <View style={styles.stressIndicators}>
              <Text style={styles.metricLabel}>Stress Indicators:</Text>
              {currentData.voiceAnalysis.stress_indicators.map((indicator, index) => (
                <Text key={index} style={styles.stressItem}>• {indicator.replace('_', ' ')}</Text>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderEmotionalJourney = () => {
    if (!insights?.emotionalJourney) return null;

    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emotional Journey</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {insights.emotionalJourney.map((phase: any, index: number) => (
            <View key={index} style={styles.journeyPhase}>
              <Text style={styles.phaseTitle}>{phase.phase}</Text>
              <View style={styles.phaseEmotions}>
                {phase.dominantEmotions.map((emotion: string, emotionIndex: number) => (
                  <View key={emotionIndex} style={styles.phaseEmotion}>
                    <View 
                      style={[
                        styles.emotionDot,
                        { backgroundColor: getEmotionColor(emotion) }
                      ]}
                    />
                    <Text style={styles.phaseEmotionText}>{emotion}</Text>
                  </View>
                ))}
              </View>
              <Text style={styles.intensityLabel}>
                Intensity: {Math.round(phase.averageIntensity * 100)}%
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading emotional insights...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {renderCurrentEmotions()}
      {renderVoiceAnalysis()}
      {showHistory && renderEmotionalJourney()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  emotionCard: {
    gap: 16,
  },
  primaryEmotion: {
    gap: 8,
  },
  secondaryEmotions: {
    gap: 8,
  },
  emotionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  emotionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emotionIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  emotionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  emotionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  intensityText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  sentimentSection: {
    gap: 8,
  },
  sentimentBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  sentimentFill: {
    height: '100%',
    borderRadius: 4,
  },
  sentimentText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  voiceCard: {
    gap: 12,
  },
  voiceMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 14,
    color: '#333',
  },
  stressIndicators: {
    gap: 4,
  },
  stressItem: {
    fontSize: 12,
    color: '#F44336',
  },
  journeyPhase: {
    width: 120,
    marginRight: 16,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  phaseTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  phaseEmotions: {
    gap: 4,
    marginBottom: 8,
  },
  phaseEmotion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  phaseEmotionText: {
    fontSize: 12,
    color: '#666',
  },
  intensityLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 50,
  },
});
