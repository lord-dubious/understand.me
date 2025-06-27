# 🚀 Easy Deployment Guide

## Overview
This simplified architecture uses **FREE TIER** services for easy development and deployment:

- **Frontend**: Expo universal app → Netlify (FREE)
- **Backend**: Express.js server → Netlify Functions (FREE)
- **Database**: Supabase PostgreSQL + Realtime (FREE)
- **Real-time**: Supabase Realtime (no Socket.io needed)

## 1. 📱 Frontend Deployment (Netlify - FREE)

### Build for Web
```bash
cd app
npm run build:web
```

### Deploy to Netlify
1. **Option A: Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod --dir app/dist
   ```

2. **Option B: GitHub Integration**
   - Push code to GitHub
   - Connect repository in Netlify dashboard
   - Set build command: `cd app && npm run build:web`
   - Set publish directory: `app/dist`

## 2. 🖥️ Backend Deployment (Netlify Functions - FREE)

### Deploy to Netlify Functions
1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**
   ```bash
   cd server
   netlify login
   netlify init
   netlify deploy --prod
   ```

3. **Set Environment Variables**
   ```bash
   netlify env:set SUPABASE_URL your_url
   netlify env:set SUPABASE_ANON_KEY your_key
   netlify env:set GOOGLE_GENAI_API_KEY your_key
   # ... other variables
   ```

### Alternative: GitHub Integration
1. Connect GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set functions directory: `netlify/functions`
4. Add environment variables in dashboard

## 3. 🗄️ Database Setup (Supabase - FREE)

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project (FREE tier)
3. Note your project URL and anon key

### Set up Database Schema
```sql
-- Run in Supabase SQL Editor
-- (Schema will be provided in Task 2)
```

## 4. 🔧 Environment Variables

### Frontend (.env)
```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_API_URL=your_netlify_backend_url
```

### Backend (.env)
```bash
NODE_ENV=production
FRONTEND_URL=your_netlify_frontend_url
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_GENAI_API_KEY=your_google_api_key
HUME_API_KEY=your_hume_api_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

## 5. ✅ Verification

### Test Deployment
1. **Frontend**: Visit your Netlify URL
2. **Backend**: Visit `your-netlify-url/api/health`
3. **Database**: Check Supabase dashboard
4. **Real-time**: Test live features

## 6. 💰 Cost Breakdown (FREE TIER)

| Service | Free Tier Limits | Cost |
|---------|------------------|------|
| Netlify | 100GB bandwidth, 125k function invocations | $0 |
| Supabase | 500MB database, 2GB bandwidth | $0 |
| Google GenAI | Generous free tier | $0 |
| Hume AI | Free tier available | $0 |
| ElevenLabs | 10,000 characters/month | $0 |

**Total Monthly Cost: $0** 🎉

## 7. 🔄 Development Workflow

### Local Development
```bash
# Start everything locally
npm run dev

# Or individually
npm run dev:app    # Expo app
npm run dev:server # Express server
```

### Deploy Changes
```bash
# Both Frontend and Backend
git push origin main  # Auto-deploys both via Netlify

# Or manual deploy
cd server && netlify deploy --prod
```

## 8. 🛠️ Troubleshooting

### Common Issues
1. **CORS errors**: Check FRONTEND_URL in backend env
2. **Build failures**: Verify Node.js version (18+)
3. **Database connection**: Check Supabase keys
4. **Real-time not working**: Verify Supabase Realtime is enabled

### Logs
- **Netlify**: Check build and function logs in dashboard
- **Supabase**: Check dashboard logs

This unified Netlify approach provides the simplest possible deployment while maintaining all functionality!
