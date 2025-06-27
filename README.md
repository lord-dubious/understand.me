# Understand.me

AI-mediated conflict resolution platform with universal cross-platform support (iOS, Android, Web).

## 🌟 Features

- **Universal Platform Support**: Single codebase for iOS, Android, and Web
- **AI-Powered Mediation**: LangChain.js + Google GenAI for intelligent conflict analysis
- **Emotional Intelligence**: Hume AI for real-time emotion detection
- **Natural Voice Interactions**: ElevenLabs turn-taking AI for seamless conversations
- **Real-time Collaboration**: Socket.io for live session management
- **Secure & Scalable**: Supabase backend with Express.js API

## 🏗️ Simplified Architecture

```
understand-me/
├── app/                 # Expo Universal App (iOS, Android, Web)
├── server/              # Simple Express.js API Server
├── docs/                # Documentation
└── shared/              # Shared types and utilities
```

### **Easy Development Stack**
- **Frontend**: Expo universal app → Deploy to Netlify as static site (FREE)
- **Backend**: Express.js server → Deploy to Netlify Functions (FREE)
- **Database**: Supabase PostgreSQL + Realtime (FREE tier)
- **AI Services**: Direct API calls (Google GenAI, Hume AI, ElevenLabs)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 8+
- Expo CLI
- Supabase account
- API keys for: Google GenAI, Hume AI, ElevenLabs

### Why This Approach is EASIER
✅ **Unified hosting** - Everything on Netlify (frontend + backend)
✅ **No Socket.io setup** - Use Supabase Realtime instead
✅ **Free tier everything** - $0 monthly cost
✅ **Single deployment** - One command deploys everything
✅ **Simple development** - Standard Express.js patterns

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/understand-me.git
   cd understand-me
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Server
   cp server/.env.example server/.env
   # Edit server/.env with your API keys

   # Frontend
   cp app/.env.example app/.env
   # Edit app/.env with your configuration
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

This will start:
- Express.js server on `http://localhost:3000`
- Expo development server on `http://localhost:8081`

### Platform-Specific Development

#### iOS Development
```bash
cd app
npm run ios
```

#### Android Development
```bash
cd app
npm run android
```

#### Web Development
```bash
cd app
npm run web
```

## 📱 Universal App Features

### Cross-Platform Components
- **Voice Interface**: Works on all platforms with ElevenLabs integration
- **Emotion Detection**: Hume AI analysis across text, voice, and facial expressions
- **Real-time Sessions**: Socket.io for live collaboration
- **Responsive Design**: Adapts to mobile, tablet, and desktop

### Platform-Specific Optimizations
- **iOS**: Native camera/microphone access, push notifications
- **Android**: Material Design components, background processing
- **Web**: Progressive Web App features, keyboard shortcuts

## 🔧 Backend Services

### Express.js API
- RESTful endpoints for all app functionality
- Real-time WebSocket connections
- AI service integrations
- Authentication middleware

### AI Services Integration
- **LangChain.js**: AI workflow orchestration
- **Google GenAI**: Language model for conflict analysis
- **Hume AI**: Emotion detection and analysis
- **ElevenLabs**: Voice synthesis and turn-taking AI

### Database (Supabase)
- PostgreSQL with real-time subscriptions
- Row Level Security (RLS)
- File storage for session artifacts
- Authentication and user management

## 🌐 Deployment

### Backend (Netlify Functions - FREE)
```bash
cd server
# Deploy to Netlify
netlify login
netlify init
netlify deploy --prod
```

### Universal App

#### Web Deployment
```bash
cd app
npm run build:web
netlify deploy --prod --dir dist
```

#### Mobile App Stores
```bash
cd app
# iOS
npm run build:ios

# Android
npm run build:android
```

## 📚 Documentation

- [API Documentation](./docs/UNDERSTAND_ME_UNIFIED_DOCUMENTATION.md)
- [Database Schema](./docs/developer_guide/part3_core_backend_data_management_supabase.md)
- [Expo Best Practices](./docs/developer_guide/part7_expo_react_native_best_practices.md)

## 🔑 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_key
GOOGLE_GENAI_API_KEY=your_genai_key
HUME_API_KEY=your_hume_key
ELEVENLABS_API_KEY=your_elevenlabs_key
```

### Frontend (.env)
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
EXPO_PUBLIC_API_URL=http://localhost:3000/api
```

## 🧪 Testing

```bash
# Backend tests
npm run test:backend

# Linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- [GitHub Issues](https://github.com/your-username/understand-me/issues)
- [Documentation](./docs/)
- [API Reference](./docs/UNDERSTAND_ME_UNIFIED_DOCUMENTATION.md)

---

Built with ❤️ using Expo, Express.js, and cutting-edge AI technologies.
