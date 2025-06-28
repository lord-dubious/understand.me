const { Pool } = require('pg');
require('dotenv').config();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME || 'understand_me',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
};

// Create connection pool
const pool = new Pool(dbConfig);

// Handle pool errors
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');
    
    // Test query
    const result = await client.query('SELECT NOW()');
    console.log('📊 Database time:', result.rows[0].now);
    
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

// Initialize database tables
const initializeTables = async () => {
  const client = await pool.connect();
  
  try {
    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        preferences JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Sessions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        conflict_type VARCHAR(100) DEFAULT 'general',
        status VARCHAR(50) DEFAULT 'created',
        current_phase VARCHAR(50) DEFAULT 'preparation',
        phases JSONB DEFAULT '{}',
        participants JSONB DEFAULT '[]',
        metadata JSONB DEFAULT '{}',
        created_by UUID REFERENCES users(id),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Messages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        speaker VARCHAR(100) NOT NULL,
        message_type VARCHAR(50) DEFAULT 'user',
        emotional_analysis JSONB,
        udine_response JSONB,
        timestamp TIMESTAMP DEFAULT NOW()
      )
    `);

    // Emotional insights table
    await client.query(`
      CREATE TABLE IF NOT EXISTS emotional_insights (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id),
        emotions JSONB NOT NULL,
        sentiment JSONB NOT NULL,
        voice_analysis JSONB,
        recommendations JSONB,
        timestamp TIMESTAMP DEFAULT NOW()
      )
    `);

    // Session participants table
    await client.query(`
      CREATE TABLE IF NOT EXISTS session_participants (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id),
        role VARCHAR(50) DEFAULT 'participant',
        joined_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Conflict analysis table
    await client.query(`
      CREATE TABLE IF NOT EXISTS conflict_analyses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
        analysis_type VARCHAR(100) NOT NULL,
        analysis_data JSONB NOT NULL,
        recommendations JSONB,
        confidence_score DECIMAL(3,2),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create indexes for better performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_sessions_created_by ON sessions(created_by);
      CREATE INDEX IF NOT EXISTS idx_messages_session_id ON messages(session_id);
      CREATE INDEX IF NOT EXISTS idx_messages_timestamp ON messages(timestamp);
      CREATE INDEX IF NOT EXISTS idx_emotional_insights_session_id ON emotional_insights(session_id);
      CREATE INDEX IF NOT EXISTS idx_emotional_insights_user_id ON emotional_insights(user_id);
      CREATE INDEX IF NOT EXISTS idx_session_participants_session_id ON session_participants(session_id);
      CREATE INDEX IF NOT EXISTS idx_session_participants_user_id ON session_participants(user_id);
      CREATE INDEX IF NOT EXISTS idx_conflict_analyses_session_id ON conflict_analyses(session_id);
    `);

    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Database query helper functions
const dbHelpers = {
  // Generic query function
  async query(text, params) {
    const start = Date.now();
    try {
      const result = await pool.query(text, params);
      const duration = Date.now() - start;
      
      if (process.env.LOG_LEVEL === 'debug') {
        console.log('Executed query', { text, duration, rows: result.rowCount });
      }
      
      return result;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    }
  },

  // Transaction helper
  async transaction(callback) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  },

  // Get client for manual transaction management
  async getClient() {
    return await pool.connect();
  }
};

module.exports = {
  pool,
  testConnection,
  initializeTables,
  dbHelpers
};
