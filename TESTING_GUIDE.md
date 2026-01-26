# Assessment Portal - Testing Guide

Complete testing checklist to verify all features work correctly.

## Pre-Testing Setup

1. ✅ Backend running: `npm start` (port 5000)
2. ✅ MongoDB running: `mongod`
3. ✅ Frontend served: `python -m http.server 8000`
4. ✅ Browser open: http://localhost:8000

---

## Authentication Testing

### Test 1: User Registration
**Steps:**
1. Go to http://localhost:8000/login.html
2. Click "Sign up here" link
3. Fill in form:
   - First Name: John
   - Last Name: Doe
   - Email: john@example.com
   - Password: Test123456
   - Country: Uganda
   - University: Makerere University
   - Program: Medical School
4. Click "Sign Up"

**Expected Result:**
- ✅ Form validates
- ✅ Success alert appears
- ✅ Redirected to assessment-portal.html
- ✅ User name appears in top right

**Database Check:**
```bash
# MongoDB Shell
db.users.findOne({ email: "john@example.com" })
# Should show user with hashed password
```

### Test 2: User Login
**Steps:**
1. Go to http://localhost:8000/login.html
2. Enter email: john@example.com
3. Enter password: Test123456
4. Click "Login"

**Expected Result:**
- ✅ Success alert appears
- ✅ Redirected to assessment-portal.html
- ✅ User name displayed
- ✅ Token stored in localStorage

**Browser Check:**
```javascript
// Open DevTools Console
localStorage.getItem('token')
// Should return JWT token
localStorage.getItem('user')
// Should return user JSON
```

### Test 3: Invalid Login
**Steps:**
1. Go to http://localhost:8000/login.html
2. Enter email: john@example.com
3. Enter password: WrongPassword
4. Click "Login"

**Expected Result:**
- ✅ Error alert: "Invalid credentials"
- ✅ Stay on login page

### Test 4: Auto-Redirect
**Steps:**
1. With valid token in localStorage
2. Navigate to http://localhost:8000/login.html
3. Should auto-redirect

**Expected Result:**
- ✅ Automatically redirected to assessment-portal.html

### Test 5: Logout
**Steps:**
1. After login, click "Logout" button
2. Confirm localStorage is cleared

**Expected Result:**
- ✅ Redirected to login.html
- ✅ Token removed from localStorage
- ✅ User object removed from localStorage

---

## Assessment Portal Testing

### Test 6: Load Assessment Form
**Steps:**
1. Login successfully
2. You're on assessment-portal.html

**Expected Result:**
- ✅ Three tabs visible: Competencies, Milestones, Summary
- ✅ Competencies tab active by default
- ✅ All form fields visible
- ✅ Overall progress shows 0%

### Test 7: Rate Competencies
**Steps:**
1. On Competencies tab
2. Rate "Clinical Knowledge": Click "4"
3. Rate "Communication": Click "3"
4. Rate "Research Skills": Click "5"

**Expected Result:**
- ✅ Buttons highlight in blue
- ✅ Rating number appears next to title
- ✅ Progress bars update in real-time
- ✅ No need to save

### Test 8: Add Competency Comments
**Steps:**
1. Fill "Clinical Knowledge" to rating 4
2. Click comment textarea under it
3. Type: "Good understanding of patient care"
4. Move to next field

**Expected Result:**
- ✅ Comment saved to form state
- ✅ No errors

### Test 9: Enter Milestones
**Steps:**
1. Click "Milestones" tab
2. Enter:
   - Completed Rotations: 3
   - Certifications Earned: 2
   - Papers Published: 1
   - Presentations Given: 4
   - Projects Completed: 2

**Expected Result:**
- ✅ Numbers display in large blue text
- ✅ Progress bar updates in real-time
- ✅ Overall score increases

### Test 10: Add Text Feedback
**Steps:**
1. In Milestones tab
2. Fill "What are your key strengths?": "Strong clinical skills, good communication"
3. Fill "Areas for improvement": "Research methodology, writing skills"
4. Fill "Next steps and goals": "Complete research course, publish paper"

**Expected Result:**
- ✅ Text saved
- ✅ No validation errors

### Test 11: Tab Switching
**Steps:**
1. Fill Competencies tab
2. Click Milestones tab
3. Fill some milestones
4. Click Summary tab

**Expected Result:**
- ✅ All tabs switch smoothly
- ✅ Form data persists
- ✅ Progress bars show accumulated progress
- ✅ Overall score displays correctly

### Test 12: Summary Tab Progress
**Steps:**
1. Set competency ratings: all 5s
2. Set milestones: all 5 each
3. Go to Summary tab

**Expected Result:**
- ✅ Overall score: ~100%
- ✅ All progress bars at 100%
- ✅ Visual feedback clear

### Test 13: Reset Form
**Steps:**
1. Fill form completely
2. Click "Reset Form" button
3. Confirm dialog

**Expected Result:**
- ✅ Page reloads
- ✅ Form cleared
- ✅ Ratings reset to 0
- ✅ Progress bars reset

### Test 14: Submit Assessment
**Steps:**
1. Fill entire form:
   - All competencies: 4
   - All milestones: 3
   - Add text feedback
2. Click "Submit Assessment"

**Expected Result:**
- ✅ Button shows loading spinner
- ✅ Success alert appears
- ✅ Redirected to assessment-history.html
- ✅ New assessment appears in timeline

**Database Check:**
```bash
db.assessments.findOne({})
# Should show assessment with calculated overallProgress
```

---

## Assessment History Testing

### Test 15: View Assessment Timeline
**Steps:**
1. After submitting assessment
2. On assessment-history.html

**Expected Result:**
- ✅ Timeline shows assessments in reverse date order
- ✅ Date badges display correctly
- ✅ Progress bars show competency ratings
- ✅ Overall progress shows percentage

### Test 16: View Assessment Details
**Steps:**
1. Click "View Details" button on assessment

**Expected Result:**
- ✅ Modal opens
- ✅ Shows all competencies with ratings
- ✅ Shows all milestones
- ✅ Shows text feedback
- ✅ Can close modal

### Test 17: Statistics Section
**Steps:**
1. On assessment-history.html
2. Look at overview section

**Expected Result:**
- ✅ Total Assessments: counts correctly
- ✅ Current Score: shows latest assessment %
- ✅ Improvement Trend: shows comparison with previous

### Test 18: Line Chart
**Steps:**
1. Create multiple assessments with different scores
2. View assessment-history.html
3. Look at "Progress Over Time" chart

**Expected Result:**
- ✅ Chart displays
- ✅ Shows line progression
- ✅ X-axis: dates
- ✅ Y-axis: 0-100%
- ✅ Points at each assessment
- ✅ Smooth line connecting points

### Test 19: Radar Chart
**Steps:**
1. View assessment-history.html
2. Look at "Latest Assessment Snapshot" chart

**Expected Result:**
- ✅ Radar/spider chart displays
- ✅ 6 competency areas shown
- ✅ Blue shaded area shows ratings
- ✅ Scale 0-5

### Test 20: Delete Assessment
**Steps:**
1. Click "Delete" button on assessment
2. Confirm deletion
3. Refresh page

**Expected Result:**
- ✅ Assessment removed from timeline
- ✅ Statistics update
- ✅ Confirmation dialog appears first
- ✅ Can't undo (data deleted)

### Test 21: Create New Assessment
**Steps:**
1. Click "Create New Assessment" button
2. Fill new assessment with different data
3. Submit

**Expected Result:**
- ✅ Redirected back to history
- ✅ New assessment appears at top
- ✅ Both assessments visible
- ✅ Timeline updated

---

## Navigation Testing

### Test 22: Home Link
**Steps:**
1. From assessment-portal.html, click "Home" in nav
2. Should go to index.html

**Expected Result:**
- ✅ Redirected to home page

### Test 23: Navigation Links
**Steps:**
1. From assessment pages, test all nav links
2. Go to different pages (about, resources, etc.)
3. Return to assessment portal

**Expected Result:**
- ✅ Links work correctly
- ✅ No data loss when returning (only on first load)

### Test 24: Portal Link on Home
**Steps:**
1. On index.html
2. Look for Assessment Portal link
3. Click it

**Expected Result:**
- ✅ Link visible in navigation
- ✅ Clicking goes to login if not logged in
- ✅ Clicking goes to assessment-portal if logged in

---

## Responsive Design Testing

### Test 25: Mobile (< 768px)
**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar
3. Select iPhone 12 or similar
4. Test all pages

**Expected Result:**
- ✅ Single column layouts
- ✅ Buttons full width
- ✅ Form fields stack
- ✅ Text readable without scroll
- ✅ Charts responsive

### Test 26: Tablet (768px - 1199px)
**Steps:**
1. Set viewport to 1000px width
2. Test all pages

**Expected Result:**
- ✅ 2 column layouts where applicable
- ✅ Still readable
- ✅ Charts display well

### Test 27: Desktop (1200px+)
**Steps:**
1. Full screen (no device emulation)
2. Test all pages

**Expected Result:**
- ✅ Multi-column layouts
- ✅ Optimal spacing
- ✅ Charts full size

---

## Error Handling Testing

### Test 28: Form Validation
**Steps:**
1. Try to submit empty competency ratings
2. Leave required fields blank
3. Try invalid email on signup

**Expected Result:**
- ✅ Form prevents submission
- ✅ Error messages display
- ✅ Field highlights

### Test 29: Network Error
**Steps:**
1. Start backend
2. Stop backend mid-assessment submission
3. Try to submit assessment

**Expected Result:**
- ✅ Error alert appears
- ✅ Form state preserved
- ✅ Can retry

### Test 30: Database Error
**Steps:**
1. Stop MongoDB
2. Try to login/submit assessment

**Expected Result:**
- ✅ User-friendly error message
- ✅ No code errors in console
- ✅ Server logs show error

---

## Performance Testing

### Test 31: Page Load Speed
**Steps:**
1. Open DevTools Network tab
2. Reload assessment-portal.html
3. Check load time

**Expected Result:**
- ✅ Page loads < 2 seconds
- ✅ No failed requests
- ✅ All scripts loaded

### Test 32: Chart Rendering
**Steps:**
1. Go to assessment-history.html
2. Check how long charts take to render

**Expected Result:**
- ✅ Charts appear instantly
- ✅ No lag when updating
- ✅ Smooth animations

### Test 33: Large Dataset
**Steps:**
1. Create 10+ assessments
2. View assessment-history.html
3. Check performance

**Expected Result:**
- ✅ Page still loads quickly
- ✅ Charts still responsive
- ✅ No lag when scrolling

---

## Browser Compatibility Testing

### Test 34: Chrome
- ✅ All features work

### Test 35: Firefox
- ✅ All features work

### Test 36: Safari
- ✅ All features work

### Test 37: Edge
- ✅ All features work

---

## API Testing (Using Postman or curl)

### Test 38: Register API
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"Jane",
    "lastName":"Smith",
    "email":"jane@example.com",
    "password":"Test123456",
    "country":"Kenya"
  }'
```

**Expected Result:**
- ✅ 201 status code
- ✅ Returns token and user data

### Test 39: Login API
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"jane@example.com",
    "password":"Test123456"
  }'
```

**Expected Result:**
- ✅ 200 status code
- ✅ Returns valid JWT token

### Test 40: Create Assessment API
```bash
curl -X POST http://localhost:5000/api/assessments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "competencies": {
      "clinicalKnowledge": {"rating": 4, "comment": "Good"},
      ...
    },
    "milestones": {
      "completedRotations": 3,
      ...
    }
  }'
```

**Expected Result:**
- ✅ 201 status code
- ✅ Assessment created with calculated progress

---

## Final Checklist

- [ ] All authentication works
- [ ] Form submission successful
- [ ] Progress bars update in real-time
- [ ] Assessment history displays correctly
- [ ] Charts render properly
- [ ] Mobile responsive
- [ ] Navigation works
- [ ] Logout clears data
- [ ] Error messages clear
- [ ] API endpoints working
- [ ] Database persisting data
- [ ] No console errors
- [ ] All pages load quickly
- [ ] Cross-browser compatible

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank form after login | Check localStorage has user object |
| Progress not updating | Check JavaScript is enabled |
| Charts not showing | Ensure Chart.js loaded, refresh page |
| API errors | Check backend is running, port 5000 |
| Form won't submit | Check all required fields filled |
| No data persisting | Check MongoDB is running |

---

**✅ All tests passed? System is ready!**
