import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { User, Lock, Mic, MessageCircle, Play } from 'lucide-react-native';
import { VoiceInteractionCore } from '../../components/VoiceInteractionCore';
import { useOnboardingStore } from '../../stores/onboardingStore';
import { supabase } from '../../lib/supabase';

const PERSONALITY_QUESTIONS = [
  "When a disagreement arises, do you prefer to address it immediately or take time to think?",
  "How do you typically express your feelings during conflicts?",
  "What's most important to you when resolving disagreements - being heard or finding a solution?",
  "Do you prefer direct communication or a more gentle approach when discussing sensitive topics?",
  "How do you usually feel after resolving a conflict with someone close to you?"
];

export default function LoginScreen() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [currentVoiceInput, setCurrentVoiceInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const {
    name,
    email,
    currentStep,
    personalityAnswers,
    currentQuestionIndex,
    setName,
    setEmail,
    addPersonalityAnswer,
    setCurrentStep,
    nextQuestion,
    reset,
  } = useOnboardingStore();

  useEffect(() => {
    // Start the voice interaction when component mounts
    startVoiceGreeting();
  }, []);

  const startVoiceGreeting = async () => {
    setIsSpeaking(true);
    // Simulate AI speaking
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSpeaking(false);
    setCurrentStep('name');
    startListening();
  };

  const startListening = () => {
    setIsListening(true);
    // Simulate voice input after 3 seconds
    setTimeout(() => {
      setIsListening(false);
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        handleVoiceInput();
      }, 1000);
    }, 3000);
  };

  const handleVoiceInput = () => {
    if (currentStep === 'name') {
      const mockName = 'John Doe';
      setName(mockName);
      setCurrentVoiceInput(mockName);
      setCurrentStep('email');
      setTimeout(() => {
        setIsSpeaking(true);
        setTimeout(() => {
          setIsSpeaking(false);
          startListening();
        }, 1500);
      }, 500);
    } else if (currentStep === 'email') {
      const mockEmail = 'john.doe@example.com';
      setEmail(mockEmail);
      setCurrentVoiceInput(mockEmail);
      setShowPasswordInput(true);
      setCurrentStep('password');
      setTimeout(() => {
        setIsSpeaking(true);
        setTimeout(() => {
          setIsSpeaking(false);
        }, 2000);
      }, 500);
    } else if (currentStep === 'personality') {
      const mockAnswer = 'I prefer to take time to think before addressing conflicts.';
      addPersonalityAnswer(PERSONALITY_QUESTIONS[currentQuestionIndex], mockAnswer);
      
      if (currentQuestionIndex < PERSONALITY_QUESTIONS.length - 1) {
        nextQuestion();
        setTimeout(() => {
          setIsSpeaking(true);
          setTimeout(() => {
            setIsSpeaking(false);
            startListening();
          }, 2000);
        }, 500);
      } else {
        setCurrentStep('complete');
        setTimeout(() => {
          router.replace('/(main)');
        }, 2000);
      }
    }
  };

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        setCurrentStep('personality');
        setIsSpeaking(true);
        setTimeout(() => {
          setIsSpeaking(false);
          startListening();
        }, 2000);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentQuestion = () => {
    return PERSONALITY_QUESTIONS[currentQuestionIndex];
  };

  const getStepText = () => {
    switch (currentStep) {
      case 'greeting':
        return "Hello, I am Udine\n\nLet us start by getting to know you better?";
      case 'name':
        return "What's your name?";
      case 'email':
        return "What's your email address?";
      case 'password':
        return "Please create a secure password";
      case 'personality':
        return getCurrentQuestion();
      case 'complete':
        return "Thank you! Let's begin your journey.";
      default:
        return "Let us start by getting to know you better?";
    }
  };

  const getProgressText = () => {
    if (currentStep === 'personality') {
      return `${currentQuestionIndex + 1}/${PERSONALITY_QUESTIONS.length}`;
    }
    return '';
  };

  return (
    <LinearGradient
      colors={['#4ECDC4', '#44A08D', '#45B7D1']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appName}>Understand{'\n'}.me</Text>
            <TouchableOpacity style={styles.menuButton}>
              <View style={styles.menuDot} />
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.subtitle}>
              {currentStep === 'greeting' ? 'Welcome back' : 'Create Account'}
            </Text>
            
            <Text style={styles.mainText}>{getStepText()}</Text>

            {/* Voice Interaction Orb */}
            <View style={styles.orbContainer}>
              <VoiceInteractionCore
                isListening={isListening}
                isSpeaking={isSpeaking}
                isThinking={isThinking}
              />
            </View>

            {/* Progress Indicator */}
            {getProgressText() && (
              <View style={styles.progressContainer}>
                <View style={styles.progressCircle}>
                  <Text style={styles.progressText}>{getProgressText()}</Text>
                </View>
              </View>
            )}

            {/* Input Card */}
            <View style={styles.inputCard}>
              {currentStep === 'name' && name && (
                <View style={styles.inputRow}>
                  <User size={20} color="#666" />
                  <Text style={styles.inputText}>{name}</Text>
                </View>
              )}

              {currentStep === 'email' && email && (
                <View style={styles.inputRow}>
                  <Text style={styles.inputText}>{email}</Text>
                </View>
              )}

              {showPasswordInput && (
                <>
                  <View style={styles.inputRow}>
                    <Lock size={20} color="#666" />
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Create password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                      autoCapitalize="none"
                    />
                  </View>

                  <Text style={styles.orText}>OR</Text>

                  {/* Social Login Buttons */}
                  <View style={styles.socialButtons}>
                    <TouchableOpacity style={styles.socialButton}>
                      <Text style={styles.socialButtonText}>G</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                      <Text style={styles.socialButtonText}>f</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                      <Text style={styles.socialButtonText}>🍎</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {currentStep === 'personality' && (
                <View style={styles.voiceInputContainer}>
                  <Text style={styles.voiceInputLabel}>Type response or use voice</Text>
                  <TouchableOpacity style={styles.voiceButton}>
                    <Mic size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              {showPasswordInput && (
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleSignUp}
                  disabled={isLoading}
                >
                  <Text style={styles.continueButtonText}>
                    {isLoading ? 'Creating Account...' : 'Continue the Journey'}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.newUserButton}>
                <User size={20} color="#fff" />
                <Text style={styles.newUserText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <TouchableOpacity style={styles.controlButton}>
                <MessageCircle size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <Mic size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.controlButton}>
                <Play size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: '300',
    color: '#fff',
    lineHeight: 32,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
    textAlign: 'center',
  },
  mainText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 32,
    paddingHorizontal: 20,
  },
  orbContainer: {
    marginBottom: 30,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  progressText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  inputCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inputText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  passwordInput: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    paddingVertical: 0,
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginVertical: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  socialButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  voiceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  voiceInputLabel: {
    fontSize: 16,
    color: '#999',
    flex: 1,
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtons: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  continueButton: {
    backgroundColor: '#2C3E50',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  newUserButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  newUserText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 5,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginTop: 40,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});