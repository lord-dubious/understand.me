# Understand.me

AI-mediated communication platform with Udine voice agent for conflict resolution and emotional intelligence.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- API keys for:
  - Google GenAI
  - ElevenLabs (Udine voice agent)
  - Hume AI (emotional intelligence)
  - LangChain (optional, for tracing)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd understand.me
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and database configuration
   ```

3. **Initialize database:**
   ```bash
   # Make sure PostgreSQL is running
   npm run db:init
   ```

4. **Start development servers:**
   ```bash
   # Start both backend and Expo simultaneously
   npm run dev
   
   # Or start individually:
   npm run dev:server  # Express server on port 3000
   npm run dev:expo    # Expo dev server
   ```

## 🏗️ Architecture

### Unified Technology Stack

- **Frontend:** Expo (React Native) + Web
- **Backend:** Express.js/Node.js (non-serverless)
- **Database:** PostgreSQL
- **AI Services:**
  - Google GenAI 1.5.0 (primary AI)
  - LangChain JS + LangGraph (orchestration)
  - Hume AI (emotional intelligence)
  - ElevenLabs (Udine voice agent with turn-taking)
- **Deployment:** Netlify
- **State Management:** Zustand

### 5-Phase Mediation Workflow

1. **Preparation** - Setting foundation and trust
2. **Exploration** - Understanding perspectives
3. **Understanding** - Finding common ground
4. **Resolution** - Developing solutions
5. **Healing** - Strengthening relationships

## 📁 Project Structure

```
understand.me/
├── components/           # Reusable React Native components
│   ├── UdineVoiceAgent.tsx
│   ├── EmotionalInsights.tsx
│   └── SessionPhases.tsx
├── screens/             # Main application screens
│   ├── DashboardScreen.tsx
│   └── SessionScreen.tsx
├── server/              # Express.js backend
│   ├── routes/          # API route handlers
│   ├── config/          # Database and app configuration
│   └── index.js         # Server entry point
├── services/            # API integration layer
│   └── api.ts           # Centralized API service
├── store/               # Zustand state management
│   └── useAppStore.ts   # Main application store
├── docs/                # Documentation
│   ├── prd.md           # Product Requirements Document
│   ├── development_guide/
│   └── integration_guides/
└── package.json         # Dependencies and scripts
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start both server and Expo
- `npm run dev:server` - Start Express server only
- `npm run dev:expo` - Start Expo development server
- `npm run build` - Build for production
- `npm run deploy` - Deploy to Netlify
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

### Environment Variables

Key environment variables (see `.env.example` for complete list):

```bash
# AI Services
GOOGLE_GENAI_API_KEY=your_key_here
ELEVENLABS_API_KEY=your_key_here
ELEVENLABS_AGENT_ID=udine_agent_id
HUME_API_KEY=your_key_here

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/understand_me

# Security
JWT_SECRET=your_jwt_secret
```

## 🤖 AI Integration

### Udine Voice Agent (ElevenLabs)

- Turn-taking conversation AI
- Natural voice interaction
- Phase-aware responses
- Emotional context integration

### Emotional Intelligence (Hume AI)

- Real-time emotion analysis
- Voice tone and sentiment detection
- Emotional journey tracking
- Intervention recommendations

### Conflict Analysis (LangChain + Google GenAI)

- Context-aware conversation processing
- Conflict pattern recognition
- Solution recommendation
- Workflow orchestration with LangGraph

## 📱 Platform Support

- **Mobile:** iOS and Android via Expo
- **Web:** Progressive Web App via Expo Web
- **Desktop:** Electron wrapper (future)

## 🚀 Deployment

### Netlify Deployment

1. **Connect repository to Netlify**
2. **Set environment variables in Netlify dashboard**
3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Manual Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting provider**

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📚 Documentation

- [Product Requirements Document](docs/prd.md)
- [Development Guide](docs/development_guide/README.md)
- [Integration Guides](docs/integration_guides/)
- [API Documentation](docs/api.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- Check the [documentation](docs/)
- Review [integration guides](docs/integration_guides/)
- Open an issue for bugs or feature requests

---

**Powered by:** Google GenAI • LangChain JS • Hume AI • ElevenLabs • Expo • Express.js
