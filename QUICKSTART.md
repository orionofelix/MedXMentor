# MedXMentor PORTAL - Quick Start

Get the PORTAL up and running in 5 minutes!

## What You'll Get

✅ **Mentee Login/Registration** - Secure authentication  
✅ **Assessment Form** - 6 competency areas with 1-5 rating scale  
✅ **Progress Tracking** - Real-time progress bars that update as you enter data  
✅ **Milestone Tracking** - Track rotations, certifications, papers, presentations  
✅ **Assessment History** - View all past assessments with charts  
✅ **Progress Charts** - Line and radar charts showing your development  
✅ **Overall Score** - Calculated based on competencies and milestones  

## Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Create .env File
```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/medxmentor
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:8000
```

### 3. Start MongoDB
```bash
# Windows: Run mongod.exe
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
mongod
```

### 4. Start Backend Server
```bash
# From backend directory
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

### 5. Serve Frontend
Open another terminal in the root directory:

```bash
# Option A: Python
python -m http.server 8000

# Option B: Node.js
npx serve .

# Option C: VS Code Live Server
# Right-click index.html → Open with Live Server
```

### 6. Access the Portal

Open your browser:

1. **Homepage**: http://localhost:8000
2. **Login/Sign Up**: Click "PORTAL" link or go to http://localhost:8000/login.html
3. **Create Account**: Fill in signup form
4. **Fill Assessment**: Rate your competencies and track milestones
5. **View History**: See all past assessments and progress charts

## Features Overview

### 1. Authentication
- Secure registration with password hashing
- JWT-based login tokens
- Token stored in browser localStorage
- Auto-redirect to login if not authenticated

### 2. Assessment Form
**6 Competency Areas:**
- Clinical Knowledge
- Communication
- Research Skills
- Leadership
- Professionalism
- Time Management

Each with:
- 1-5 rating scale (visual buttons)
- Optional comment field
- Real-time progress bar updates

**5 Milestone Counters:**
- Completed Rotations
- Certifications Earned
- Papers Published
- Presentations Given
- Projects Completed

**Text Fields:**
- Key Strengths
- Areas for Improvement
- Next Steps & Goals

### 3. Progress Tracking
- **Real-time Progress Bars** - Update as you enter ratings
- **Overall Score** - Calculated as:
  - 50% from average competency ratings
  - 50% from milestone achievements
- **Visual Feedback** - Color-coded bars and ratings

### 4. Assessment History
- **Timeline View** - All assessments sorted by date
- **Statistics** - Total assessments, current score, trend
- **Line Chart** - Overall progress over time
- **Radar Chart** - Competency distribution in latest assessment
- **Detailed View** - Modal popup with all assessment details
- **Delete Option** - Remove assessments if needed

## API Endpoints Cheat Sheet

```bash
# Register
POST http://localhost:5000/api/auth/register

# Login
POST http://localhost:5000/api/auth/login

# Get all assessments
GET http://localhost:5000/api/assessments
Authorization: Bearer {token}

# Create assessment
POST http://localhost:5000/api/assessments
Authorization: Bearer {token}

# Get dashboard summary
GET http://localhost:5000/api/assessments/dashboard/summary
Authorization: Bearer {token}

# View single assessment
GET http://localhost:5000/api/assessments/{id}
Authorization: Bearer {token}

# Delete assessment
DELETE http://localhost:5000/api/assessments/{id}
Authorization: Bearer {token}
```

## File Structure

```
MedXMentor/
├── backend/
│   ├── config/database.js          # MongoDB setup
│   ├── models/User.js              # User data model
│   ├── models/Assessment.js        # Assessment data model
│   ├── controllers/authController.js    # Login/signup logic
│   ├── controllers/assessmentController.js  # Assessment logic
│   ├── routes/auth.js              # /api/auth routes
│   ├── routes/assessments.js       # /api/assessments routes
│   ├── middleware/auth.js          # JWT verification
│   ├── server.js                   # Express app
│   ├── package.json                # Node dependencies
│   └── .env                        # Configuration (create from .env.example)
│
├── login.html                      # Login page
├── signup.html                     # Registration page
├── assessment-portal.html          # Assessment form
├── assessment-history.html         # View past assessments
├── index.html                      # Updated with portal link
└── ASSESSMENT_PORTAL_SETUP.md      # Full setup guide
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot GET /api/assessments" | Ensure backend is running on port 5000 |
| "MongoDB Connection Error" | Ensure mongod is running |
| "Login failed" | Check email/password are correct, or create new account |
| "CORS Error" | Check FRONTEND_URL in .env matches your frontend address |
| "Progress bars not updating" | Ensure JavaScript is enabled in browser |

## Next Steps

After getting up and running:

1. **Customize Competencies** - Edit assessment-portal.html to match your needs
2. **Add Email Notifications** - Notify mentors when assessments are submitted
3. **Create Admin Dashboard** - View all mentees' progress
4. **Export Assessments** - Generate PDF reports
5. **Mobile App** - Build React Native app using the same API
6. **Analytics** - Add data visualization for organization-wide insights

## Support & Documentation

- **Full Setup Guide**: See `ASSESSMENT_PORTAL_SETUP.md`
- **Database Schema**: Check backend models in `backend/models/`
- **API Docs**: See ASSESSMENT_PORTAL_SETUP.md for complete endpoint reference

---

**You're all set!** 🚀

Start by signing up at http://localhost:8000/signup.html
