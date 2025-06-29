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
import { User, Lock, Mic, MessageCircle, Play, Mail } from 'lucide-react-native';
import { VoiceInteractionCore } from '../../components/VoiceInteractionCore';
import { useOnboardingStore } from '../../stores/onboardingStore';
import { useAuthStore } from '../../stores/authStore';
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
  const [currentVoiceInput, setCurrentVoiceInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [authError, setAuthError] = useState('');

  const { isLoading, isSignUp, setLoading, toggleAuthMode } = useAuthStore();

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
    if (isSignUp) {
      startVoiceGreeting();
    } else {
      // For returning users, show inputs immediately
      setShowInputs(true);
      setCurrentStep('email');
    }
  }, [isSignUp]);

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
      setShowInputs(true);
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
      setAuthError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setAuthError('');
    
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
        // Check if email confirmation is required
        if (!data.session) {
          Alert.alert(
            'Check your email',
            'We sent you a confirmation link. Please check your email and click the link to verify your account.',
            [{ text: 'OK' }]
          );
        } else {
          // User is signed up and logged in, proceed to personality assessment
          setCurrentStep('personality');
          setIsSpeaking(true);
          setTimeout(() => {
            setIsSpeaking(false);
            startListening();
          }, 2000);
        }
      }
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      setAuthError('Please enter your email and password');
      return;
    }

    setLoading(true);
    setAuthError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        // User is signed in, redirect to main app
        router.replace('/(main)');
      }
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setAuthError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: Platform.OS === 'web' 
            ? `${window.location.origin}/(main)` 
            : 'understand-me:///(main)',
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    if (Platform.OS !== 'ios') {
      setAuthError('Apple Sign In is only available on iOS');
      return;
    }

    setLoading(true);
    setAuthError('');
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: 'understand-me:///(main)',
        },
      });

      if (error) throw error;
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentQuestion = () => {
    return PERSONALITY_QUESTIONS[currentQuestionIndex];
  };

  const getStepText = () => {
    if (!isSignUp) {
      return "Welcome back!\n\nLet's continue your journey.";
    }

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

  const shouldShowVoiceOrb = () => {
    return isSignUp && (isListening || isSpeaking || isThinking);
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
            <TouchableOpacity 
              style={styles.menuButton}
              onPress={toggleAuthMode}
            >
              <Text style={styles.menuText}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.subtitle}>
              {isSignUp ? 'Create Account' : 'Welcome back'}
            </Text>
            
            <Text style={styles.mainText}>{getStepText()}</Text>

            {/* Voice Interaction Orb - Only for sign up flow */}
            {shouldShowVoiceOrb() && (
              <View style={styles.orbContainer}>
                <VoiceInteractionCore
                  isListening={isListening}
                  isSpeaking={isSpeaking}
                  isThinking={isThinking}
                />
              </View>
            )}

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
              {/* Error Message */}
              {authError ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{authError}</Text>
                </View>
              ) : null}

              {/* Name Input - Only for sign up */}
              {isSignUp && (currentStep === 'name' && name || showInputs) && (
                <View style={styles.inputRow}>
                  <User size={20} color="#666" />
                  <TextInput
                    style={styles.input}
                    placeholder="Full name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    editable={!name || showInputs}
                  />
                </View>
              )}

              {/* Email Input */}
              {(currentStep === 'email' && email || showInputs || !isSignUp) && (
                <View style={styles.inputRow}>
                  <Mail size={20} color="#666" />
                  <TextInput
                    style={styles.input}
                    placeholder="Email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!email || showInputs || !isSignUp}
                  />
                </View>
              )}

              {/* Password Input */}
              {(showInputs || !isSignUp) && (
                <View style={styles.inputRow}>
                  <Lock size={20} color="#666" />
                  <TextInput
                    style={styles.input}
                    placeholder={isSignUp ? "Create password" : "Password"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
              )}

              {/* Social Login Section */}
              {(showInputs || !isSignUp) && (
                <>
                  <Text style={styles.orText}>OR</Text>

                  <View style={styles.socialButtons}>
                    <TouchableOpacity 
                      style={styles.socialButton}
                      onPress={handleGoogleSignIn}
                      disabled={isLoading}
                    >
                      <Text style={styles.socialButtonText}>G</Text>
                    </TouchableOpacity>
                    
                    {Platform.OS === 'ios' && (
                      <TouchableOpacity 
                        style={styles.socialButton}
                        onPress={handleAppleSignIn}
                        disabled={isLoading}
                      >
                        <Text style={styles.socialButtonText}>🍎</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </>
              )}

              {/* Voice Input for Personality Questions */}
              {currentStep === 'personality' && (
                <View style={styles.voiceInputContainer}>
                  <Text style={styles.voiceInputLabel}>Type response or use voice</Text>
                  <TouchableOpacity 
                    style={styles.voiceButton}
                    onPress={startListening}
                  >
                    <Mic size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              {(showInputs || !isSignUp) && (
                <TouchableOpacity
                  style={[styles.continueButton, isLoading && styles.disabledButton]}
                  onPress={isSignUp ? handleSignUp : handleSignIn}
                  disabled={isLoading}
                >
                  <Text style={styles.continueButtonText}>
                    {isLoading 
                      ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
                      : (isSignUp ? 'Continue the Journey' : 'Welcome Back')
                    }
                  </Text>
                </TouchableOpacity>
              )}

              {/* Mode Toggle Button */}
              <TouchableOpacity 
                style={styles.newUserButton}
                onPress={toggleAuthMode}
              >
                <User size={20} color="#fff" />
                <Text style={styles.newUserText}>
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Controls */}
            <View style={styles.bottomControls}>
              <TouchableOpacity style={styles.controlButton}>
                <MessageCircle size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={isSignUp ? startListening : undefined}
              >
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
    fontFamily: 'Inter-Regular',
  },
  menuButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  menuText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
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
    fontFamily: 'Inter-Regular',
  },
  mainText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 32,
    paddingHorizontal: 20,
    fontFamily: 'Inter-SemiBold',
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
    fontFamily: 'Inter-SemiBold',
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
  errorContainer: {
    backgroundColor: '#ffebee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  input: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    paddingVertical: 0,
    fontFamily: 'Inter-Regular',
  },
  orText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginVertical: 20,
    fontFamily: 'Inter-Regular',
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
    fontFamily: 'Inter-Regular',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.6,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  newUserButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  newUserText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
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