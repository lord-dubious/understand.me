import { useState } from 'react'
import { Link, router } from 'expo-router'
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  FormControl,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from 'native-base'
import { Platform } from 'react-native'
import { useAuthStore } from '../../store/auth'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { signIn } = useAuthStore()

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      await signIn(email, password)
      router.replace('/(tabs)/dashboard')
    } catch (err: any) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView flex={1} contentContainerStyle={{ flexGrow: 1 }}>
        <Box flex={1} bg="white" px={6} py={8} justifyContent="center">
          <VStack space={6} alignItems="center">
            {/* Logo/Title */}
            <VStack space={2} alignItems="center">
              <Text fontSize="3xl" fontWeight="bold" color="primary.600">
                Understand.me
              </Text>
              <Text fontSize="md" color="gray.600" textAlign="center">
                AI-mediated conflict resolution
              </Text>
            </VStack>

            {/* Login Form */}
            <VStack space={4} width="100%" maxWidth="400px">
              {error ? (
                <Alert status="error">
                  <Alert.Icon />
                  <Text>{error}</Text>
                </Alert>
              ) : null}

              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </FormControl>

              <FormControl>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </FormControl>

              <Button
                onPress={handleLogin}
                isLoading={isLoading}
                isLoadingText="Signing in..."
                size="lg"
                colorScheme="primary"
              >
                Sign In
              </Button>

              <Link href="/(auth)/forgot-password" asChild>
                <Button variant="link" size="sm">
                  Forgot Password?
                </Button>
              </Link>
            </VStack>

            {/* Sign Up Link */}
            <HStack space={2} alignItems="center">
              <Text color="gray.600">Don't have an account?</Text>
              <Link href="/(auth)/register" asChild>
                <Button variant="link" size="sm">
                  Sign Up
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
