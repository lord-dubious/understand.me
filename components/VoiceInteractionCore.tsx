import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useOnboardingStore } from '../stores/onboardingStore';

interface VoiceInteractionCoreProps {
  onVoiceInput?: (text: string) => void;
  isListening?: boolean;
  isSpeaking?: boolean;
  isThinking?: boolean;
}

export function VoiceInteractionCore({
  onVoiceInput,
  isListening = false,
  isSpeaking = false,
  isThinking = false
}: VoiceInteractionCoreProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const { setVoiceActive } = useOnboardingStore();

  useEffect(() => {
    setVoiceActive(isListening || isSpeaking || isThinking);
  }, [isListening, isSpeaking, isThinking, setVoiceActive]);

  useEffect(() => {
    if (isListening) {
      // Pulsing animation for listening
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (isSpeaking) {
      // Glowing animation for speaking
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else if (isThinking) {
      // Subtle breathing animation for thinking
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Stop all animations
      pulseAnim.stopAnimation();
      glowAnim.stopAnimation();
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isListening, isSpeaking, isThinking, pulseAnim, glowAnim]);

  const getOrbColor = () => {
    if (isListening) return '#4ECDC4';
    if (isSpeaking) return '#45B7D1';
    if (isThinking) return '#96CEB4';
    return '#E8F4FD';
  };

  const getGlowColor = () => {
    if (isListening) return 'rgba(78, 205, 196, 0.3)';
    if (isSpeaking) return 'rgba(69, 183, 209, 0.4)';
    if (isThinking) return 'rgba(150, 206, 180, 0.2)';
    return 'rgba(232, 244, 253, 0.1)';
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.outerGlow,
          {
            backgroundColor: getGlowColor(),
            transform: [{ scale: pulseAnim }],
            opacity: glowAnim,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.orb,
          {
            backgroundColor: getOrbColor(),
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />
      <View style={[styles.innerRing, { borderColor: getOrbColor() }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  orb: {
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  innerRing: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});