# MedXMentor Assessment Portal - Complete Setup Guide

## Project Structure

```
MedXMentor/
├── backend/                    # Node.js/Express backend
│   ├── config/
│   │   └── database.js        # MongoDB connection
│   ├── models/
│   │   ├── User.js            # User schema
│   │   └── Assessment.js       # Assessment schema
│   ├── controllers/
│   │   ├── authController.js  # Auth logic (register, login, etc.)
│   │   └── assessmentController.js  # Assessment CRUD
│   ├── routes/
│   │   ├── auth.js            # Auth endpoints
│   │   └── assessments.js      # Assessment endpoints
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── server.js              # Express app entry point
│   ├── package.json           # Dependencies
│   ├── .env.example           # Environment variables template
│   └── .gitignore             # Git ignore file
│
└── frontend/                   # HTML files in root
    ├── login.html             # Login page
    ├── signup.html            # Registration page
    ├── assessment-portal.html  # Main assessment form
    ├── assessment-history.html # View past assessments
    ├── index.html             # Home page (updated with portal link)
    └── ... (other pages)
```

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local MongoDB installation [Download](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (Cloud) - [Sign up free](https://www.mongodb.com/cloud/atlas)

## Installation Steps

### 1. Install Node.js Dependencies

```bash
cd backend
npm install
```

This will install:
- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- cors: Cross-Origin Resource Sharing
- dotenv: Environment variables

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```plaintext
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration (choose one):

# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/medxmentor

# Option B: MongoDB Atlas (Cloud)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/medxmentor

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 3. Set Up Database

#### Option A: Local MongoDB

```bash
# Windows
# Download from https://www.mongodb.com/try/download/community
# Run the installer and follow installation steps

# macOS (with Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux (Ubuntu)
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Create a database user
5. Get your connection string
6. Update `MONGODB_URI` in `.env` with your connection string

### 4. Start the Backend Server

```bash
# From the backend directory
npm start

# For development with auto-reload
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
```

## API Endpoints

### Authentication Routes

#### Register New User
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "country": "Uganda",
  "university": "Makerere University",
  "program": "Medical School"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": { ... user info ... }
}
```

### Assessment Routes

#### Create Assessment
```
POST /api/assessments
Authorization: Bearer {token}
Content-Type: application/json

{
  "competencies": {
    "clinicalKnowledge": {
      "rating": 4,
      "comment": "Good understanding of clinical concepts"
    },
    "communication": { "rating": 3, "comment": "" },
    ...
  },
  "milestones": {
    "completedRotations": 2,
    "certificationsEarned": 1,
    ...
  },
  "strengths": "Strong technical skills",
  "areasForImprovement": "Need to improve presentation skills",
  "nextSteps": "Work on public speaking"
}

Response:
{
  "success": true,
  "data": { ... assessment with calculated overall progress ... }
}
```

#### Get All Assessments
```
GET /api/assessments
Authorization: Bearer {token}

Response:
{
  "success": true,
  "count": 3,
  "data": [ ... array of assessments ... ]
}
```

#### Get Single Assessment
```
GET /api/assessments/{assessmentId}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": { ... assessment details ... }
}
```

#### Get Dashboard Summary
```
GET /api/assessments/dashboard/summary
Authorization: Bearer {token}

Response:
{
  "success": true,
  "data": {
    "latestAssessment": { ... },
    "totalAssessments": 3,
    "overallProgress": 65,
    "progressTrend": [ ... last 5 assessments ... ]
  }
}
```

#### Update Assessment
```
PUT /api/assessments/{assessmentId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "competencies": { ... },
  "milestones": { ... },
  ...
}

Response:
{
  "success": true,
  "data": { ... updated assessment ... }
}
```

#### Delete Assessment
```
DELETE /api/assessments/{assessmentId}
Authorization: Bearer {token}

Response:
{
  "success": true,
  "message": "Assessment deleted successfully"
}
```

## Frontend Configuration

### Update API URL

The frontend pages use `http://localhost:5000/api` for development. To deploy to production, update the `apiUrl` variable in each HTML file:

**login.html, signup.html, assessment-portal.html, assessment-history.html:**

```javascript
const apiUrl = 'http://localhost:5000/api'; // Change this to your production URL
// Production example:
// const apiUrl = 'https://api.yourdomain.com/api';
```

Or better yet, store it in localStorage during setup.

## Running the Full Application

### Development Setup

**Terminal 1: Start MongoDB**
```bash
# If using local MongoDB
mongod
```

**Terminal 2: Start Backend Server**
```bash
cd backend
npm run dev
```

**Terminal 3: Serve Frontend**
```bash
# Using Python
python -m http.server 8000

# Or using Node.js
npx serve .

# Or use VS Code Live Server extension
```

Then open your browser and navigate to:
- Frontend: `http://localhost:8000` (or `http://localhost:3000` if using Live Server)
- Backend API: `http://localhost:5000/api`

### Access Points

- **Login**: http://localhost:8000/login.html
- **Sign Up**: http://localhost:8000/signup.html
- **Assessment Portal**: http://localhost:8000/assessment-portal.html (after login)
- **Assessment History**: http://localhost:8000/assessment-history.html (after login)

## Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  menteeId: String,
  country: String,
  university: String,
  program: String,
  role: String ('mentee', 'mentor', 'admin'),
  profileComplete: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Assessment Model
```javascript
{
  _id: ObjectId,
  menteeId: ObjectId (ref: User),
  assessmentDate: Date,
  competencies: {
    clinicalKnowledge: { rating: 1-5, comment: String },
    communication: { rating: 1-5, comment: String },
    researchSkills: { rating: 1-5, comment: String },
    leadership: { rating: 1-5, comment: String },
    professionalism: { rating: 1-5, comment: String },
    timeManagement: { rating: 1-5, comment: String }
  },
  milestones: {
    completedRotations: Number,
    certificationsEarned: Number,
    papersPublished: Number,
    presentationsGiven: Number,
    projectsCompleted: Number
  },
  overallProgress: Number (0-100),
  strengths: String,
  areasForImprovement: String,
  nextSteps: String,
  submittedBy: String ('self', 'mentor'),
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Backend Deployment (Example: Heroku)

1. Create account at [Heroku](https://www.heroku.com/)
2. Install Heroku CLI
3. In the backend directory:

```bash
heroku login
heroku create your-app-name
heroku addons:create mongolab
git push heroku main
```

### Frontend Deployment (Example: Netlify)

1. Build/test locally
2. Connect your GitHub repository to Netlify
3. Set build command: (none, it's static files)
4. Set publish directory: `.` (root)
5. Deploy

Update API_URL in frontend files to your deployed backend.

## Troubleshooting

### "MongoDB Connection Error"
- Ensure MongoDB is running (`mongod` for local)
- Check MONGODB_URI in .env
- For Atlas, whitelist your IP address

### "CORS Error"
- Ensure FRONTEND_URL in .env matches your frontend address
- Backend needs CORS middleware (already configured)

### "Invalid Token"
- Ensure token is sent in Authorization header
- Token format: `Authorization: Bearer {token}`

### "Port 5000 already in use"
- Change PORT in .env
- Or kill the process using the port

## Security Notes

**Production Checklist:**
1. ✅ Change JWT_SECRET to a strong, random string
2. ✅ Use HTTPS for all communications
3. ✅ Set NODE_ENV=production
4. ✅ Use environment-specific .env files
5. ✅ Add rate limiting middleware
6. ✅ Add request validation
7. ✅ Use strong password requirements
8. ✅ Enable MongoDB authentication
9. ✅ Use secure session management
10. ✅ Add logging and monitoring

## Support

For issues or questions:
1. Check the API response error messages
2. Review console logs (browser and server)
3. Verify environment variables are set correctly
4. Ensure database is running
5. Check network requests in browser DevTools

## Next Steps

1. Customize assessment categories based on your needs
2. Add email notifications when assessments are submitted
3. Create admin dashboard to view all mentees' progress
4. Add progress charts and analytics
5. Implement mentor feedback functionality
6. Add PDF export for assessments
7. Create progress reports
