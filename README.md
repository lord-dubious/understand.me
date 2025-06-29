# understand.me 🤝

A comprehensive AI-powered conflict resolution platform that helps individuals and groups navigate conflicts with empathy, understanding, and effective communication strategies.

## 🌟 Features

### Core Capabilities
- **AI-Powered Mediation**: Advanced AI assistant (Udine) with emotional intelligence and conflict resolution expertise
- **Emotion Recognition**: Real-time emotion analysis and adaptive responses
- **Personalized Experiences**: Tailored conflict resolution approaches based on individual preferences and patterns
- **Multi-Party Conflict Resolution**: Group mediation with structured workflows and facilitation
- **Advanced Analytics**: Comprehensive insights into conflict patterns, emotional growth, and communication effectiveness

### Key Components

#### 🧠 **Intelligent AI Assistant**
- Emotion-aware responses with contextual understanding
- Personalized communication styles and intervention levels
- Real-time conflict analysis and strategy recommendations
- Adaptive learning from user interactions and outcomes

#### 👥 **Multi-Party Mediation**
- Structured group conflict resolution sessions
- Real-time chat with participant management
- Adaptive workflow management based on group dynamics
- Comprehensive session analytics and progress tracking

#### 📊 **Advanced Analytics & Insights**
- Emotional journey tracking with breakthrough moment identification
- Communication pattern analysis and effectiveness metrics
- Skill development tracking with personalized recommendations
- Predictive insights for conflict prevention and resolution success

#### 🎯 **Personalization Engine**
- Individual profile management with conflict preferences
- Adaptive AI personality and communication styles
- Learning pattern recognition and skill progress tracking
- Customized recommendations for continuous improvement

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- React Native development environment
- Expo CLI
- Google Generative AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/billyjeanrae/understand.me.git
   cd understand.me
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Add your API keys:
   ```env
   GOOGLE_GENAI_API_KEY=your_google_ai_api_key
   ```

4. **Start the development server**
   ```bash
   npx expo start
   ```

5. **Run on device/simulator**
   - iOS: Press `i` or scan QR code with Camera app
   - Android: Press `a` or scan QR code with Expo Go app

## 📱 App Structure

### Screens
- **AuthScreen**: User authentication and onboarding
- **HomeScreen**: Main dashboard with quick actions and insights
- **ChatScreen**: One-on-one conflict resolution sessions
- **GroupConflictScreen**: Multi-party conflict management
- **ProfileScreen**: User profile and analytics dashboard
- **ConflictDashboardScreen**: Conflict history and management

### Services
- **AI Services**: Emotion analysis, chat, and personalization
- **User Services**: Profile management and personalization engine
- **Conflict Services**: Multi-party conflict and group mediation
- **Analytics Services**: Conversation and user analytics

### Key Features

#### 🎭 **Emotion Recognition**
```typescript
// Real-time emotion analysis
const emotions = await analyzeEmotion(message, 'text', {
  includeRecommendations: true,
  conflictContext: true
});
```

#### 🤖 **Personalized AI Responses**
```typescript
// Adaptive AI personality
const response = await chatWithUdine(history, message, {
  conflictType: 'family',
  usePersonalization: true,
  emotionContext: currentEmotions
});
```

#### 👥 **Group Mediation**
```typescript
// Start multi-party session
const session = await multiPartyConflictService.startSession(
  conflictId,
  facilitatorId,
  customAgenda
);
```

#### 📈 **Analytics Insights**
```typescript
// Generate user analytics
const analytics = await userAnalyticsService.generateUserAnalytics(
  userId,
  timeframe
);
```

## 🏗️ Architecture

### Frontend (React Native + Expo)
- **Navigation**: React Navigation with stack and tab navigators
- **State Management**: Zustand for global state management
- **UI Components**: Custom components with consistent design system
- **Styling**: StyleSheet with responsive design patterns

### AI Integration
- **Google Generative AI**: Advanced language model for conversation
- **Emotion Analysis**: Real-time emotional intelligence
- **Personalization**: Adaptive user experience engine

### Data Management
- **Local Storage**: AsyncStorage for offline-first approach
- **Analytics**: Comprehensive tracking and insights
- **Conflict Management**: Structured data models for complex scenarios

## 🎨 Design System

### Color Palette
- **Primary**: Deep blues and teals for trust and calm
- **Secondary**: Warm oranges and yellows for energy and optimism
- **Neutral**: Sophisticated grays for balance
- **Semantic**: Green for success, red for alerts, blue for information

### Typography
- **Headers**: Bold, clear hierarchy
- **Body**: Readable, accessible font sizes
- **Interactive**: Distinct styling for buttons and links

### Components
- **Consistent spacing**: 4px grid system
- **Rounded corners**: Friendly, approachable feel
- **Shadows**: Subtle depth and elevation
- **Animations**: Smooth, purposeful transitions

## 🚀 Deployment

### Development
```bash
# Start development server
npx expo start

# Run on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web
```

### Production Build
```bash
# Build for web (Netlify)
npm run build

# Preview build locally
npm run preview

# Build for mobile
npx expo build:ios
npx expo build:android

# Or with EAS Build
eas build --platform all
```

### Netlify Deployment

#### Option 1: Connect GitHub Repository
1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub account and select the `understand.me` repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variables in Netlify dashboard:
   - `GOOGLE_GENAI_API_KEY`: Your Google AI API key
6. Deploy!

#### Option 2: Manual Deploy
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

#### Environment Variables
Set these in your Netlify dashboard under Site Settings > Environment Variables:
- `GOOGLE_GENAI_API_KEY`: Your Google Generative AI API key

## 📊 Analytics & Insights

### Conversation Analytics
- **Emotional Journey**: Track emotional progression throughout conversations
- **Communication Patterns**: Analyze communication effectiveness and style
- **Resolution Progress**: Monitor conflict resolution stages and success
- **AI Interaction**: Measure AI effectiveness and user satisfaction

### User Analytics
- **Skill Development**: Track progress across 12 core conflict resolution skills
- **Emotional Intelligence**: Monitor EQ growth and stability
- **Conflict Patterns**: Identify triggers, strategies, and success factors
- **Personalization**: Optimize AI interactions based on user preferences

### System Analytics
- **Platform Metrics**: User engagement, retention, and satisfaction
- **Feature Usage**: Track feature adoption and effectiveness
- **Performance**: Monitor system health and response times
- **Insights**: Generate actionable recommendations for improvement

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **TypeScript**: Strict typing for reliability
- **ESLint**: Consistent code formatting
- **Testing**: Comprehensive test coverage
- **Documentation**: Clear, helpful comments and docs

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Generative AI**: Powering our intelligent conversation capabilities
- **React Native Community**: For the amazing framework and ecosystem
- **Expo Team**: For simplifying React Native development
- **Conflict Resolution Experts**: For guidance on mediation best practices

## 📞 Support

- **Documentation**: [docs.understand.me](https://docs.understand.me)
- **Community**: [Discord Server](https://discord.gg/understand-me)
- **Issues**: [GitHub Issues](https://github.com/billyjeanrae/understand.me/issues)
- **Email**: support@understand.me

---

**understand.me** - Transforming conflict into connection, one conversation at a time. 🌟
