import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { LogOut, User as UserIcon } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../stores/authStore';

export default function MainDashboard() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const { setUser } = useAuthStore();
  const [badgeScale] = useState(new Animated.Value(1));

  useEffect(() => {
    // Get user profile
    const getUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserProfile(user);
      }
    };

    getUserProfile();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleBadgePress = () => {
    // Animate badge on press
    Animated.sequence([
      Animated.timing(badgeScale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(badgeScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Open Bolt.new link
    Linking.openURL('https://bolt.new/?rid=os72mi');
  };

  return (
    <LinearGradient
      colors={['#4ECDC4', '#44A08D', '#45B7D1']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Bolt.new Badge */}
      <TouchableOpacity 
        style={styles.boltBadge} 
        onPress={handleBadgePress}
        activeOpacity={0.8}
      >
        <Animated.View style={{ transform: [{ scale: badgeScale }] }}>
          <Image
            source={{ uri: 'https://storage.bolt.army/white_circle_360x360.png' }}
            style={styles.boltBadgeImage}
            resizeMode="contain"
          />
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <UserIcon size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.userName}>
              {userProfile?.user_metadata?.full_name || userProfile?.email || 'User'}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Understand.me</Text>
        <Text style={styles.subtitle}>Your journey begins here</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Conflicts Resolved</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Growth Points</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start New Session</Text>
        </TouchableOpacity>

        {/* Hackathon & Sponsors Section */}
        <View style={styles.hackathonSection}>
          <Text style={styles.hackathonTitle}>🏆 Built at Bolt.new Hackathon</Text>
          <Text style={styles.hackathonSubtitle}>Powered by cutting-edge AI technology</Text>
          
          <View style={styles.sponsorsContainer}>
            <Text style={styles.sponsorsTitle}>Our Technology Partners</Text>
            
            <View style={styles.sponsorRow}>
              <TouchableOpacity 
                style={styles.sponsorCard}
                onPress={() => Linking.openURL('https://elevenlabs.io')}
              >
                <Text style={styles.sponsorName}>ElevenLabs</Text>
                <Text style={styles.sponsorDescription}>Voice AI</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sponsorCard}
                onPress={() => Linking.openURL('https://hume.ai')}
              >
                <Text style={styles.sponsorName}>Hume AI</Text>
                <Text style={styles.sponsorDescription}>Emotion Analysis</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.sponsorRow}>
              <TouchableOpacity 
                style={styles.sponsorCard}
                onPress={() => Linking.openURL('https://supabase.com')}
              >
                <Text style={styles.sponsorName}>Supabase</Text>
                <Text style={styles.sponsorDescription}>Database & Auth</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sponsorCard}
                onPress={() => Linking.openURL('https://ai.google.dev')}
              >
                <Text style={styles.sponsorName}>Google AI</Text>
                <Text style={styles.sponsorDescription}>Gemini Models</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.sponsorRow}>
              <TouchableOpacity 
                style={styles.sponsorCard}
                onPress={() => Linking.openURL('https://expo.dev')}
              >
                <Text style={styles.sponsorName}>Expo</Text>
                <Text style={styles.sponsorDescription}>Mobile Platform</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.sponsorCard}
                onPress={() => Linking.openURL('https://vercel.com')}
              >
                <Text style={styles.sponsorName}>Vercel</Text>
                <Text style={styles.sponsorDescription}>AI SDK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boltBadge: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  boltBadgeImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Inter-Regular',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    fontFamily: 'Inter-SemiBold',
  },
  signOutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Inter-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Inter-Bold',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 5,
    fontFamily: 'Inter-Regular',
  },
  startButton: {
    backgroundColor: '#2C3E50',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter-SemiBold',
  },
  hackathonSection: {
    marginTop: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  hackathonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter-Bold',
  },
  hackathonSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Inter-Regular',
  },
  sponsorsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sponsorsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Inter-SemiBold',
  },
  sponsorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  sponsorCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  sponsorName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 2,
    fontFamily: 'Inter-SemiBold',
  },
  sponsorDescription: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
});
