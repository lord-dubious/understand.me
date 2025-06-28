#!/usr/bin/env node

/**
 * Database initialization script for Understand.me
 * Run with: npm run db:init
 */

const { testConnection, initializeTables } = require('../server/config/database');

async function initializeDatabase() {
  console.log('🚀 Initializing Understand.me database...\n');

  try {
    // Test database connection
    console.log('1. Testing database connection...');
    const connected = await testConnection();
    
    if (!connected) {
      console.error('❌ Database connection failed. Please check your configuration.');
      process.exit(1);
    }

    // Initialize tables
    console.log('\n2. Creating database tables...');
    await initializeTables();

    console.log('\n✅ Database initialization completed successfully!');
    console.log('\n📊 Created tables:');
    console.log('   • users');
    console.log('   • sessions');
    console.log('   • messages');
    console.log('   • emotional_insights');
    console.log('   • session_participants');
    console.log('   • conflict_analyses');
    
    console.log('\n🎯 Next steps:');
    console.log('   1. Start the development server: npm run dev');
    console.log('   2. Open your browser to http://localhost:19006');
    console.log('   3. Begin your first AI-mediated conversation with Udine!');

  } catch (error) {
    console.error('\n❌ Database initialization failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('   • Ensure PostgreSQL is running');
    console.error('   • Check your DATABASE_URL in .env');
    console.error('   • Verify database credentials');
    console.error('   • Make sure the database exists');
    process.exit(1);
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
