// Database Initialization using sql.js (pure JavaScript, no compilation needed)
const initSqlJs = require('sql.js');
const path = require('path');
const fs = require('fs');

// Ensure database directory exists
const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(__dirname, 'users.db');

let db;
let SQL;

// Initialize database
async function initDatabase() {
    SQL = await initSqlJs();
    
    // Load existing database or create new one
    if (fs.existsSync(dbPath)) {
        const buffer = fs.readFileSync(dbPath);
        db = new SQL.Database(buffer);
    } else {
        db = new SQL.Database();
    }
    
    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON');
    
    return db;
}

// Helper to save database to disk
function saveDatabase() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);
    }
}

// Wrapper for prepare-like functionality
function prepare(sql) {
    return {
        run: (...params) => {
            try {
                db.run(sql, params);
                saveDatabase();
                const result = db.exec('SELECT last_insert_rowid() as id');
                return { lastInsertRowid: result[0]?.values[0]?.[0] || 0 };
            } catch (error) {
                console.error('SQL Error:', error);
                throw error;
            }
        },
        get: (...params) => {
            try {
                const result = db.exec(sql, params);
                if (result.length === 0) return null;
                const columns = result[0].columns;
                const values = result[0].values[0];
                if (!values) return null;
                const row = {};
                columns.forEach((col, i) => row[col] = values[i]);
                return row;
            } catch (error) {
                console.error('SQL Error:', error);
                throw error;
            }
        },
        all: (...params) => {
            try {
                const result = db.exec(sql, params);
                if (result.length === 0) return [];
                const columns = result[0].columns;
                return result[0].values.map(values => {
                    const row = {};
                    columns.forEach((col, i) => row[col] = values[i]);
                    return row;
                });
            } catch (error) {
                console.error('SQL Error:', error);
                throw error;
            }
        }
    };
}

// Export wrapper object
const dbWrapper = {
    prepare,
    exec: (sql) => {
        db.run(sql);
        saveDatabase();
    },
    close: () => {
        saveDatabase();
        if (db) db.close();
    },
    init: initDatabase
};

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

// Initialize and create tables
(async () => {
    try {
        await initDatabase();
        
        dbWrapper.exec(createUsersTable);
        dbWrapper.exec(createLoginHistoryTable);
        dbWrapper.exec(createUserProfilesTable);
        dbWrapper.exec(createSessionsTable);
        
        console.log('✅ Database tables created successfully');
        
        // Create indexes for better performance
        dbWrapper.exec('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
        dbWrapper.exec('CREATE INDEX IF NOT EXISTS idx_login_history_user_id ON login_history(user_id)');
        dbWrapper.exec('CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(session_token)');
        
        console.log('✅ Database indexes created successfully');
    } catch (error) {
        console.error('❌ Error creating database tables:', error);
    }
})();

module.exports = dbWrapper;
