// The Connection Hub - Server
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./database/init');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// ============================================
// AUTHENTICATION MIDDLEWARE
// ============================================
const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
        next();
    } else {
        res.status(401).json({ error: 'Authentication required' });
    }
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const logLogin = (userId, ipAddress, userAgent, success = true) => {
    const stmt = db.prepare(`
        INSERT INTO login_history (user_id, ip_address, user_agent, success)
        VALUES (?, ?, ?, ?)
    `);
    stmt.run(userId, ipAddress, userAgent, success ? 1 : 0);
};

// ============================================
// API ROUTES
// ============================================

// Sign Up
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        
        // Validation
        if (!email || !password || !firstName || !lastName) {
            return res.status(400).json({ error: 'All required fields must be filled' });
        }
        
        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long' });
        }
        
        // Check if user already exists
        const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        
        // Insert user
        const stmt = db.prepare(`
            INSERT INTO users (email, password_hash, first_name, last_name, phone)
            VALUES (?, ?, ?, ?, ?)
        `);
        
        const result = stmt.run(email, passwordHash, firstName, lastName, phone || null);
        const userId = result.lastInsertRowid;
        
        // Create user profile
        const profileStmt = db.prepare(`
            INSERT INTO user_profiles (user_id)
            VALUES (?)
        `);
        profileStmt.run(userId);
        
        // Log the signup/login
        logLogin(userId, req.ip, req.get('user-agent'));
        
        // Create session
        req.session.userId = userId;
        req.session.email = email;
        req.session.firstName = firstName;
        
        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: {
                id: userId,
                email,
                firstName,
                lastName
            }
        });
        
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Server error during signup' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        
        // Get user
        const user = db.prepare(`
            SELECT id, email, password_hash, first_name, last_name, is_active
            FROM users
            WHERE email = ?
        `).get(email);
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        if (!user.is_active) {
            return res.status(403).json({ error: 'Account is inactive' });
        }
        
        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!passwordMatch) {
            logLogin(user.id, req.ip, req.get('user-agent'), false);
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // Update last login
        db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);
        
        // Log successful login
        logLogin(user.id, req.ip, req.get('user-agent'));
        
        // Create session
        req.session.userId = user.id;
        req.session.email = user.email;
        req.session.firstName = user.first_name;
        
        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error during login' });
    }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error logging out' });
        }
        res.json({ success: true, message: 'Logged out successfully' });
    });
});

// Get current user
app.get('/api/auth/me', requireAuth, (req, res) => {
    const user = db.prepare(`
        SELECT id, email, first_name, last_name, phone, created_at, last_login
        FROM users
        WHERE id = ?
    `).get(req.session.userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
        success: true,
        user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            phone: user.phone,
            createdAt: user.created_at,
            lastLogin: user.last_login
        }
    });
});

// Get user profile
app.get('/api/user/profile', requireAuth, (req, res) => {
    const profile = db.prepare(`
        SELECT 
            u.id, u.email, u.first_name, u.last_name, u.phone,
            p.ministry_interests, p.small_group_id, p.volunteer_interests, p.bio, p.profile_image
        FROM users u
        LEFT JOIN user_profiles p ON u.id = p.user_id
        WHERE u.id = ?
    `).get(req.session.userId);
    
    if (!profile) {
        return res.status(404).json({ error: 'Profile not found' });
    }
    
    res.json({ success: true, profile });
});

// Update user profile
app.put('/api/user/profile', requireAuth, (req, res) => {
    try {
        const { ministryInterests, volunteerInterests, bio } = req.body;
        
        const stmt = db.prepare(`
            UPDATE user_profiles
            SET ministry_interests = ?, volunteer_interests = ?, bio = ?
            WHERE user_id = ?
        `);
        
        stmt.run(ministryInterests, volunteerInterests, bio, req.session.userId);
        
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ error: 'Error updating profile' });
    }
});

// Get login history (Admin or own history)
app.get('/api/user/login-history', requireAuth, (req, res) => {
    const history = db.prepare(`
        SELECT login_time, ip_address, success
        FROM login_history
        WHERE user_id = ?
        ORDER BY login_time DESC
        LIMIT 20
    `).all(req.session.userId);
    
    res.json({ success: true, history });
});

// Admin: Get all users (basic implementation)
app.get('/api/admin/users', requireAuth, (req, res) => {
    // In production, add role-based access control
    const users = db.prepare(`
        SELECT id, email, first_name, last_name, created_at, last_login, is_active
        FROM users
        ORDER BY created_at DESC
    `).all();
    
    res.json({ success: true, users });
});

// Admin: Get signup/login statistics
app.get('/api/admin/stats', requireAuth, (req, res) => {
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
    const activeUsers = db.prepare('SELECT COUNT(*) as count FROM users WHERE is_active = 1').get();
    const todaySignups = db.prepare(`
        SELECT COUNT(*) as count FROM users 
        WHERE DATE(created_at) = DATE('now')
    `).get();
    const todayLogins = db.prepare(`
        SELECT COUNT(*) as count FROM login_history 
        WHERE DATE(login_time) = DATE('now') AND success = 1
    `).get();
    
    res.json({
        success: true,
        stats: {
            totalUsers: totalUsers.count,
            activeUsers: activeUsers.count,
            todaySignups: todaySignups.count,
            todayLogins: todayLogins.count
        }
    });
});

// ============================================
// SERVE HTML
// ============================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// START SERVER
// ============================================
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════╗
║   🙏 The Connection Hub Server                ║
║   ✅ Server running on http://localhost:${PORT}  ║
║   📊 Database initialized                     ║
║   🔐 Authentication system active             ║
╚════════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGINT', () => {
    db.close();
    console.log('\n👋 Server shutting down gracefully...');
    process.exit(0);
});
