module.exports = {
  projectName: "understand.me",
  description: "AI-Mediated Conflict Resolution Platform",
  tasks: {
    "update-user-flow": {
      description: "Update user flow to have onboarding before authentication",
      status: "completed",
      priority: "high",
      assignee: "developer",
      dueDate: "2025-06-21"
    },
    "implement-elevenlabs-integration": {
      description: "Implement ElevenLabs voice synthesis with Expo React Native",
      status: "pending",
      priority: "high",
      assignee: "developer",
      dueDate: "2025-07-01"
    },
    "setup-multi-tenant-architecture": {
      description: "Set up multi-tenant architecture for the platform",
      status: "pending",
      priority: "medium",
      assignee: "architect",
      dueDate: "2025-07-15"
    },
    "implement-personality-assessment": {
      description: "Implement conversational personality assessment with Google GenAI",
      status: "pending",
      priority: "medium",
      assignee: "developer",
      dueDate: "2025-07-10"
    },
    "implement-voice-streaming": {
      description: "Implement real-time voice streaming with ElevenLabs",
      status: "pending",
      priority: "low",
      assignee: "developer",
      dueDate: "2025-07-20"
    }
  },
  dependencies: {
    "elevenlabs-node": "^1.2.0",
    "expo-av": "^13.0.0",
    "expo-speech": "^11.0.0",
    "@google/generative-ai": "^0.1.0",
    "@supabase/supabase-js": "^2.0.0",
    "react-native-dotenv": "^3.4.0"
  }
};
