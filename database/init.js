// Database Initialization
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(__dirname, 'users.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create users table
const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME,
        is_active INTEGER DEFAULT 1,
        role TEXT DEFAULT 'member'
    )
`;

// Create login_history table
const createLoginHistoryTable = `
    CREATE TABLE IF NOT EXISTS login_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        login_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address TEXT,
        user_agent TEXT,
        success INTEGER DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
`;

// Create user_profiles table for additional info
const createUserProfilesTable = `
    CREATE TABLE IF NOT EXISTS user_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE NOT NULL,
        ministry_interests TEXT,
        small_group_id INTEGER,
        volunteer_interests TEXT,
        bio TEXT,
        profile_image TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
`;

// Create sessions table
const createSessionsTable = `
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        session_token TEXT UNIQUE NOT NULL,
        expires_at DATETIME NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
`;

// Execute table creation
try {
    db.exec(createUsersTable);
    db.exec(createLoginHistoryTable);
    db.exec(createUserProfilesTable);
    db.exec(createSessionsTable);
    
    console.log('✅ Database tables created successfully');
    
    // Create indexes for better performance
    db.exec('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
    db.exec('CREATE INDEX IF NOT EXISTS idx_login_history_user_id ON login_history(user_id)');
    db.exec('CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token)');
    
    console.log('✅ Database indexes created successfully');
} catch (error) {
    console.error('❌ Error creating database tables:', error);
}

module.exports = db;
