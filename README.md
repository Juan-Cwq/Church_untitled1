<<<<<<< HEAD
# Church_untitled1
idk
=======
# The Connection Hub - Church Community Platform

A beautiful, modern full-stack web application for The Connection Church, designed to eliminate friction and help members find meaningful community. Features a complete authentication system with user management and database tracking.

## 🎯 Project Overview

This platform is built following the **Problem Aware** customer avatar strategy, targeting church members like "Sarah the Seeker" who feel disconnected despite attending regularly. The application validates their pain points and presents The Connection Hub as the solution for frictionless community connection.

## ✨ Features

### Frontend
- 🎨 Beautiful, modern UI with custom design system
- 📱 Fully responsive (mobile-first design)
- 🎭 Smooth animations and micro-interactions
- ♿ WCAG AA accessibility compliant
- 🌈 Custom gradient color palette

### Backend & Authentication
- 🔐 Secure user authentication (login/signup)
- 🔒 Password hashing with bcrypt
- 💾 SQLite database for user management
- 📊 Login history tracking
- 👤 User profile management
- 🎫 Session-based authentication
- 📈 Admin statistics dashboard

## 🎨 Design System

### Brand Essence
- **Authentic** - Genuine, non-performative community
- **Seamless** - Eliminating friction points
- **Uplifting** - Providing hope and positivity
- **Intuitive** - Accessible to all members
- **Reliable** - Accurate information and stability
- **Integrated** - Unified hub for all church activities

### Color Palette

**Primary Colors:**
- Ocean Blue: `#007bff` - Trust, stability, faith
- Sky Teal: `#00d4ff` - Clarity, transparency
- Mint Green: `#90ee90` - Growth, vitality
- Rose Pink: `#ffb6c1` - Warmth, community

**Gradient:**
```css
linear-gradient(135deg, #007bff 0%, #00d4ff 33%, #90ee90 66%, #ffb6c1 100%)
```

### Typography
- **Primary Font:** Inter (sans-serif) - Body text and UI
- **Secondary Font:** DM Serif Display (serif) - Headlines

## 🚀 Features

### Navigation Bar
- Fixed position with scroll effects
- Mobile-responsive hamburger menu
- Smooth transitions and hover states
- Accessible keyboard navigation

### Hero Section
- Compelling headline addressing pain points
- Clear value proposition
- Prominent CTA buttons with micro-interactions
- Trust indicators (member count, leadership endorsement)
- Animated gradient background
- Floating testimonial card
- Responsive grid layout

### Micro-Interactions
- Button hover effects with gradient transitions
- Smooth scroll animations
- Pulsating background orbs
- Floating testimonial card
- Icon animations on CTA buttons

## 📱 Responsive Design

Built with a **mobile-first** approach:
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl), 1536px (2xl)
- Stacked layouts on mobile
- Touch-friendly buttons (44x44px minimum)
- Simplified mobile navigation

## ♿ Accessibility

- WCAG AA compliant color contrast
- Full keyboard navigation support
- Visible focus indicators
- ARIA labels for screen readers
- Respects `prefers-reduced-motion` setting
- Semantic HTML structure

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations
- **Tailwind CSS** - Utility-first framework
- **DaisyUI** - Component library
- **Vanilla JavaScript** - Interactive features

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** (better-sqlite3) - Database
- **bcrypt** - Password hashing
- **express-session** - Session management
- **dotenv** - Environment configuration

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start the server:**
```bash
npm start
```

3. **Open your browser:**
```
http://localhost:3000
```

### Development Mode
For auto-restart on file changes:
```bash
npm run dev
```

## 📦 File Structure

```
/
├── index.html          # Main landing page
├── auth.html           # Login/Signup page
├── styles.css          # Custom styles and design tokens
├── script.js           # Main interactive JavaScript
├── auth.js             # Authentication JavaScript
├── server.js           # Express server & API endpoints
├── package.json        # Node.js dependencies
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── README.md           # This file
├── database/           # Database files
│   ├── init.js         # Database initialization
│   └── users.db        # SQLite database (auto-created)
└── context/            # Brand identity and specifications
    ├── Customer Avatar_ The Problem Aware Christian Seeker.md
    ├── Landing Page Specification_ The Church Connection Hub.md
    └── The Connection Church Brand Identity & Design System.md
```

## 🎯 Key Messaging

### Headline
"Stop Feeling Like a Stranger in Your Own Church."

### Sub-Headline
"The Connection Hub is your single, simple path to finding your people, your purpose, and your place."

### Pain Points Addressed
- No more broken links
- No more buried PDFs
- No more wasted time

### Primary CTA
"Find Your Group Now (1-Click)"

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/login-history` - Get login history

### Admin (Protected)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get platform statistics

## 💾 Database Schema

### Users Table
```sql
- id (INTEGER PRIMARY KEY)
- email (TEXT UNIQUE)
- password_hash (TEXT)
- first_name (TEXT)
- last_name (TEXT)
- phone (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)
- last_login (DATETIME)
- is_active (INTEGER)
- role (TEXT)
```

### Login History Table
```sql
- id (INTEGER PRIMARY KEY)
- user_id (INTEGER)
- login_time (DATETIME)
- ip_address (TEXT)
- user_agent (TEXT)
- success (INTEGER)
```

### User Profiles Table
```sql
- id (INTEGER PRIMARY KEY)
- user_id (INTEGER)
- ministry_interests (TEXT)
- small_group_id (INTEGER)
- volunteer_interests (TEXT)
- bio (TEXT)
- profile_image (TEXT)
```

## 🎨 Customization

### Colors
Edit the CSS custom properties in `styles.css`:
```css
:root {
    --ocean-blue: #007bff;
    --sky-teal: #00d4ff;
    --mint-green: #90ee90;
    --rose-pink: #ffb6c1;
}
```

### Typography
Update font imports in `index.html` and references in `styles.css`

### Content
Modify text content directly in `index.html`

## 📄 License

This project is built for The Connection Church.

---

**Built with care for authentic community and spiritual growth.** 🙏
>>>>>>> dabc532 (Update: 2025-10-23 17:36:52)
