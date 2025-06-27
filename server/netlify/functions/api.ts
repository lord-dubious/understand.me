import express, { Router } from "express";
import serverless from "serverless-http";
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Import routes
import authRoutes from '../../src/routes/auth';
import sessionRoutes from '../../src/routes/sessions';
import aiRoutes from '../../src/routes/ai';
import voiceRoutes from '../../src/routes/voice';

// Import utilities
import { logger } from '../../src/utils/logger';

// Load environment variables
dotenv.config();

const api = express();
const router = Router();

// Security middleware
api.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
api.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:8081",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Compression and logging
api.use(compression());
api.use(morgan('combined'));

// Body parsing
api.use(express.json({ limit: '10mb' }));
api.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
api.use(limiter);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Hello world endpoint
router.get('/hello', (req, res) => {
  res.json({ 
    message: 'Hello from Understand.me API!',
    timestamp: new Date().toISOString()
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/sessions', sessionRoutes);
router.use('/ai', aiRoutes);
router.use('/voice', voiceRoutes);

// Use router with /api prefix
api.use('/api', router);

// Error handling middleware
api.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
api.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export const handler = serverless(api);
