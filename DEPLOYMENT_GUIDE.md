# MedXMentor Deployment Guide

Deploy your MedXMentor Assessment Portal to the cloud for 24/7 access.

## 🎯 Deployment Strategy

We'll deploy:
- **Backend**: Render (free hosting)
- **Database**: MongoDB Atlas (free cloud database)
- **Frontend**: Render Static Site (or GitHub Pages)

**Total Cost**: $0 (Free tier for everything!)

---

## Part 1: MongoDB Atlas Setup (Database)

### Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up with email or Google
3. Choose **Free Shared Cluster** (M0 - Free forever)

### Step 2: Create Cluster

1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select cloud provider: **AWS** (recommended)
4. Choose region closest to you
5. Cluster Name: `MedXMentor` (or leave default)
6. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 3: Create Database User

1. In Security → **Database Access**
2. Click **"Add New Database User"**
3. Authentication: **Password**
4. Username: `medxmentor_admin`
5. Password: Click **"Autogenerate Secure Password"** - SAVE THIS!
6. Database User Privileges: **"Atlas Admin"**
7. Click **"Add User"**

### Step 4: Whitelist IP Addresses

1. In Security → **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access From Anywhere"** (for now)
   - Shows: `0.0.0.0/0`
4. Click **"Confirm"**

⚠️ **Security Note**: In production, you should restrict to specific IPs. For Render deployment, "anywhere" is needed.

### Step 5: Get Connection String

1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string:
   ```
   mongodb+srv://medxmentor_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password from Step 3
6. Add database name at the end: `/medxmentor`
   ```
   mongodb+srv://medxmentor_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/medxmentor?retryWrites=true&w=majority
   ```

✅ **Save this connection string** - you'll need it for deployment!

---

## Part 2: Prepare Backend for Deployment

### Step 1: Update package.json

Your package.json already has the start script, but let's verify:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

✅ Already configured!

### Step 2: Verify .gitignore

Make sure `.env` is in `.gitignore` (already done):

```
node_modules/
.env
.env.local
```

---

## Part 3: Deploy Backend to Render

### Step 1: Push to GitHub

If not already done:

```bash
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - MedXMentor Assessment Portal"

# Create repo on GitHub (https://github.com/new)
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/medxmentor.git
git branch -M main
git push -u origin main
```

### Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended - easy linking)

### Step 3: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: **medxmentor**
3. Configure:
   - **Name**: `medxmentor-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: **Free**

### Step 4: Add Environment Variables

In Render dashboard, scroll to **Environment Variables** section:

Add these (click "+ Add Environment Variable" for each):

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | `mongodb+srv://medxmentor_admin:YOUR_PASSWORD@...` (from Atlas) |
| `JWT_SECRET` | `MedXMentor2026_Production_SecureKey_Change_This` |
| `JWT_EXPIRE` | `7d` |
| `FRONTEND_URL` | `https://medxmentor.onrender.com` (update after frontend deploy) |

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. You'll get a URL like: `https://medxmentor-backend.onrender.com`

### Step 6: Test Backend

Open: `https://medxmentor-backend.onrender.com/api/health`

You should see:
```json
{
  "success": true,
  "message": "Server is running"
}
```

✅ **Backend is live!**

---

## Part 4: Deploy Frontend to Render

### Step 1: Update Frontend API URLs

In all your HTML files, update the API endpoint:

Change from:
```javascript
const API_URL = 'http://localhost:5000/api';
```

To:
```javascript
const API_URL = 'https://medxmentor-backend.onrender.com/api';
```

Files to update:
- `login.html`
- `signup.html`
- `assessment-portal.html`
- `assessment-history.html`

### Step 2: Commit & Push Changes

```bash
git add .
git commit -m "Update API URLs for production"
git push
```

### Step 3: Deploy Frontend on Render

1. In Render, click **"New +"** → **"Static Site"**
2. Connect same GitHub repository
3. Configure:
   - **Name**: `medxmentor`
   - **Branch**: `main`
   - **Build Command**: (leave empty)
   - **Publish Directory**: `.` (root directory)

4. Click **"Create Static Site"**
5. Wait for deployment
6. You'll get a URL: `https://medxmentor.onrender.com`

### Step 4: Update CORS Settings

Go back to **backend** environment variables and update:
- `FRONTEND_URL` → `https://medxmentor.onrender.com`

Render will automatically redeploy backend.

---

## Part 5: Test Your Live Application

1. **Homepage**: `https://medxmentor.onrender.com`
2. **Sign Up**: `https://medxmentor.onrender.com/signup.html`
3. Create account and test all features!

---

## 📊 What You Get

✅ **24/7 Availability** - Access from anywhere  
✅ **Automatic Backups** - MongoDB Atlas handles it  
✅ **SSL Certificate** - Automatic HTTPS  
✅ **Global CDN** - Fast loading worldwide  
✅ **Free Tier** - No credit card required  

---

## ⚙️ Maintenance & Updates

### To Deploy Updates:

```bash
# Make your changes
git add .
git commit -m "Your update description"
git push
```

Render automatically deploys on push! ✨

### Monitor Your Services:

- **Backend Logs**: Render Dashboard → medxmentor-backend → Logs
- **Database**: MongoDB Atlas → Clusters → Metrics
- **Frontend**: Render Dashboard → medxmentor → Deploys

---

## 🔒 Security Best Practices

### After Initial Setup:

1. **MongoDB Atlas IP Whitelist**:
   - Get your Render service IP
   - Replace `0.0.0.0/0` with specific IPs

2. **Environment Variables**:
   - Never commit `.env` file
   - Use strong JWT_SECRET in production

3. **Rate Limiting** (Future):
   - Add express-rate-limit to prevent abuse

---

## 💰 Pricing (when you scale)

**Free Tier Limits:**
- Render: 750 hours/month (enough for 1 service 24/7)
- MongoDB Atlas: 512MB storage
- Perfect for development and small projects

**When you outgrow free tier:**
- Render: $7/month per service
- MongoDB: $9/month for 2GB

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot connect to database" | Check MONGODB_URI in Render env variables |
| "CORS Error" | Verify FRONTEND_URL matches frontend domain |
| "Site not loading" | Check Render deploy logs for errors |
| "500 Error on API" | Check Render backend logs |
| Render service "spinning down" | Free tier sleeps after 15 min inactivity (first request wakes it) |

---

## 📧 Need Help?

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Render Community**: https://community.render.com

---

**You're ready to deploy! 🚀**

Start with Part 1 (MongoDB Atlas) and work your way through each part.
