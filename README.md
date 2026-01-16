BlogSite - Astro Blogging Platform
A full-featured blogging website built with Astro, SQLite3, and Tailwind CSS.
📋 Project Information
Course: MSc. Interactive Digital Media
Module: Web Frameworks
Assignment: Database backed Dynamic Web Application
Framework: Astro
Database: SQLite3
Styling: Tailwind CSS

✨ Features

User registration and authentication
Create, edit, and delete blog posts
Comment on posts
User account management
Responsive design with animated gradient background
Last 5 posts displayed on homepage


🚀 Quick Start
Prerequisites

Node.js (v20.x or higher)
npm (v10.x or higher)

Installation
bash# Extract and navigate to project
cd blog-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Access the application at: `http://localhost:4321`

---

## 📁 Project Structure
```
blog-website/
├── src/
│   ├── components/          # UI components
│   ├── layouts/             # Page layouts
│   ├── pages/               # Routes and pages
│   │   ├── api/            # API endpoints
│   │   └── post/           # Dynamic post pages
│   ├── lib/                 # Database & auth utilities
│   └── styles/             # CSS styles
├── database/               # SQLite database
└── public/                 # Static assets

🗄️ Database Schema
Tables

users - User accounts (id, username, email, password)
posts - Blog posts (id, title, content, user_id, timestamps)
comments - Post comments (id, content, post_id, user_id)

Relationships

One user → Many posts
One user → Many comments
One post → Many comments
CASCADE delete for referential integrity


🎨 Pages
PageRouteDescriptionHome/Shows last 5 blog postsLogin/loginUser authenticationSign Up/signupUser registrationDashboard/dashboardManage your postsCreate Post/create-postWrite new postEdit Post/edit-post?id=[id]Edit existing postPost Detail/post/[id]View post & commentsAccount/accountUpdate profile

🔒 Security Features

Password hashing with bcrypt
HTTP-only cookies for sessions
SQL injection prevention (prepared statements)
Protected routes with authentication guards
Users can only edit/delete own posts


🛠️ Technologies

Astro - Web framework
TypeScript - Type safety
SQLite3 - Database (better-sqlite3)
Tailwind CSS - Styling (via CDN)
bcryptjs - Password hashing


📝 Available Commands
bashnpm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build

🧪 Test the Application

Create an account at /signup
Login at /login
Create a blog post from dashboard
View posts on homepage
Click a post to view details
Add comments to posts
Edit/delete your posts from dashboard
Update account settings


✅ Assignment Requirements

✅ Astro framework
✅ SQLite3 database
✅ User signup & login
✅ Create/Edit/Delete posts
✅ Comment functionality
✅ Account management
✅ Last 5 posts on homepage
✅ Tailwind CSS styling
✅ Responsive design


🐛 Troubleshooting
Database not found: Database is auto-created on first run
Port in use: Kill process on port 4321 or change port
Styles not loading: Check internet connection for Tailwind CDN
Login issues: Ensure cookies are enabled in browser

📦 Dependencies
json{
  "dependencies": {
    "astro": "^5.1.4",
    "better-sqlite3": "^11.8.1",
    "bcryptjs": "^2.4.3"
  }
}

🚢 Deployment
Can be deployed to: Vercel, Netlify, Render, or Railway
bashnpm run build
Note: Ensure output: 'server' is set in astro.config.mjs

⚠️ Academic Integrity
NO AI USE PERMITTED - This project was developed without AI tools as per assignment requirements.

Last Updated: January 2026
Version: 1.0.0
Institution: Griffith College Dublin