import { useEffect } from 'react'
import { Redirect } from 'expo-router'
import { Box, Spinner, Text } from 'native-base'
import { useAuthStore } from '../store/auth'

export default function Index() {
  const { user, isLoading, hasCompletedOnboarding } = useAuthStore()

  useEffect(() => {
    // This will trigger the auth state check
  }, [])

  if (isLoading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="white">
        <Spinner size="lg" color="primary.500" />
        <Text mt={4} fontSize="md" color="gray.600">
          Loading Understand.me...
        </Text>
      </Box>
    )
  }

  // Redirect based on auth state
  if (!user) {
    return <Redirect href="/(auth)/login" />
  }

  if (!hasCompletedOnboarding) {
    return <Redirect href="/onboarding" />
  }

  return <Redirect href="/(tabs)/dashboard" />
}
