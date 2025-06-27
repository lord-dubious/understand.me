import { useState, useEffect } from 'react'
import { router } from 'expo-router'
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  ScrollView,
  Card,
  Badge,
  Pressable,
  Spinner
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '../../store/auth'
import { useSessionStore } from '../../store/sessions'

export default function DashboardScreen() {
  const { user } = useAuthStore()
  const { recentSessions, isLoading, fetchRecentSessions } = useSessionStore()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    // Fetch recent sessions
    fetchRecentSessions()
  }, [])

  const handleStartSession = () => {
    router.push('/session/create')
  }

  const handleJoinSession = () => {
    router.push('/session/join')
  }

  const handleViewSession = (sessionId: string) => {
    router.push(`/session/${sessionId}`)
  }

  return (
    <Box flex={1} bg="gray.50">
      <ScrollView>
        <VStack space={6} p={6}>
          {/* Header */}
          <VStack space={2}>
            <Text fontSize="2xl" fontWeight="bold" color="gray.800">
              {greeting}, {user?.name || 'there'}!
            </Text>
            <Text fontSize="md" color="gray.600">
              Ready to resolve conflicts with AI guidance?
            </Text>
          </VStack>

          {/* Quick Actions */}
          <VStack space={4}>
            <Text fontSize="lg" fontWeight="semibold" color="gray.800">
              Quick Actions
            </Text>
            
            <HStack space={4}>
              <Button
                flex={1}
                size="lg"
                colorScheme="primary"
                leftIcon={<Ionicons name="add-circle-outline" size={20} color="white" />}
                onPress={handleStartSession}
              >
                Start Session
              </Button>
              
              <Button
                flex={1}
                size="lg"
                variant="outline"
                colorScheme="primary"
                leftIcon={<Ionicons name="enter-outline" size={20} color="#3B82F6" />}
                onPress={handleJoinSession}
              >
                Join Session
              </Button>
            </HStack>
          </VStack>

          {/* Recent Sessions */}
          <VStack space={4}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="lg" fontWeight="semibold" color="gray.800">
                Recent Sessions
              </Text>
              <Button
                variant="link"
                size="sm"
                onPress={() => router.push('/(tabs)/sessions')}
              >
                View All
              </Button>
            </HStack>

            {isLoading ? (
              <Box py={8} alignItems="center">
                <Spinner size="lg" color="primary.500" />
                <Text mt={2} color="gray.600">Loading sessions...</Text>
              </Box>
            ) : recentSessions.length === 0 ? (
              <Card p={6} bg="white">
                <VStack space={3} alignItems="center">
                  <Ionicons name="chatbubbles-outline" size={48} color="#9CA3AF" />
                  <Text fontSize="md" color="gray.600" textAlign="center">
                    No sessions yet. Start your first conflict resolution session!
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="primary"
                    onPress={handleStartSession}
                  >
                    Get Started
                  </Button>
                </VStack>
              </Card>
            ) : (
              <VStack space={3}>
                {recentSessions.slice(0, 3).map((session) => (
                  <Pressable key={session.id} onPress={() => handleViewSession(session.id)}>
                    <Card p={4} bg="white">
                      <VStack space={2}>
                        <HStack justifyContent="space-between" alignItems="flex-start">
                          <VStack flex={1} space={1}>
                            <Text fontSize="md" fontWeight="medium" color="gray.800">
                              {session.title}
                            </Text>
                            <Text fontSize="sm" color="gray.600" numberOfLines={2}>
                              {session.description}
                            </Text>
                          </VStack>
                          <Badge
                            colorScheme={
                              session.status === 'completed' ? 'green' :
                              session.status === 'active' ? 'blue' :
                              session.status === 'cancelled' ? 'red' : 'gray'
                            }
                            variant="subtle"
                            ml={2}
                          >
                            {session.status}
                          </Badge>
                        </HStack>
                        
                        <HStack justifyContent="space-between" alignItems="center">
                          <Text fontSize="xs" color="gray.500">
                            {new Date(session.created_at).toLocaleDateString()}
                          </Text>
                          <HStack space={1} alignItems="center">
                            <Ionicons name="people-outline" size={14} color="#9CA3AF" />
                            <Text fontSize="xs" color="gray.500">
                              {session.participant_count || 1} participants
                            </Text>
                          </HStack>
                        </HStack>
                      </VStack>
                    </Card>
                  </Pressable>
                ))}
              </VStack>
            )}
          </VStack>

          {/* AI Insights Preview */}
          <VStack space={4}>
            <Text fontSize="lg" fontWeight="semibold" color="gray.800">
              Your Growth Insights
            </Text>
            
            <Card p={4} bg="white">
              <HStack space={3} alignItems="center">
                <Box p={2} bg="primary.100" borderRadius="full">
                  <Ionicons name="trending-up" size={20} color="#3B82F6" />
                </Box>
                <VStack flex={1} space={1}>
                  <Text fontSize="sm" fontWeight="medium" color="gray.800">
                    Communication Progress
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    View your latest insights and achievements
                  </Text>
                </VStack>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="primary"
                  onPress={() => router.push('/(tabs)/growth')}
                >
                  View
                </Button>
              </HStack>
            </Card>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  )
}
