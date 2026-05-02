# ⚡ Quick Start Guide - Get Running in 5 Minutes

## 🎯 Goal
Get your JobConnect recruiter dashboard up and running quickly!

## 📋 Prerequisites Check

Before starting, ensure you have:
- ✅ Java 17+ installed (`java -version`)
- ✅ Node.js 16+ installed (`node -v`)
- ✅ MySQL 8.0+ running
- ✅ Maven installed (`mvn -v`)

## 🚀 5-Minute Setup

### Step 1: Database Setup (1 minute)

```sql
-- Open MySQL and run:
CREATE DATABASE jobconnect_db;
```

### Step 2: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd jobconnect-backend

# Update application.yaml with your MySQL credentials
# Edit: src/main/resources/application.yaml
# Change: username and password to your MySQL credentials

# Start backend
mvn spring-boot:run
```

**Wait for**: "Started JobConnectApplication" message

### Step 3: Frontend Setup (2 minutes)

```bash
# Open NEW terminal
cd jobconnect-frontend

# Install dependencies (first time only)
npm install

# Start frontend
npm run dev
```

**Wait for**: "Local: http://localhost:5174"

### Step 4: Access Application

Open browser: **http://localhost:5174**

## 🎮 Quick Test

### 1. Register as Recruiter (30 seconds)
1. Click "Register"
2. Fill in:
   - Email: `recruiter@test.com`
   - Password: `password123`
   - First Name: `John`
   - Last Name: `Doe`
   - Role: **RECRUITER**
3. Click "Register"

### 2. Login (10 seconds)
1. Click "Login"
2. Enter credentials
3. Click "Login"
4. Should redirect to Recruiter Dashboard

### 3. Post Your First Job (1 minute)
1. Click "Post New Job"
2. Fill in:
   - Title: `Senior Developer`
   - Description: `Great opportunity`
   - Requirements: `5+ years experience`
   - Location: `San Francisco`
   - Job Type: `Full Time`
   - Experience Level: `Senior`
   - Salary Min: `100000`
   - Salary Max: `150000`
3. Click "Post Job"
4. ✅ Success! Job appears in dashboard

### 4. Test Filtering (30 seconds)
1. Click "Manage Jobs" or "View All"
2. Try search: Type job title
3. Try filter: Select status
4. Click "Clear Filters"
5. ✅ Filtering works!

## ✅ Verification Checklist

After setup, verify:
- [ ] Backend running on port 8080
- [ ] Frontend running on port 5174
- [ ] Can register as recruiter
- [ ] Can login
- [ ] Dashboard shows statistics
- [ ] Can post a job
- [ ] Job appears in dashboard
- [ ] Can filter jobs
- [ ] No console errors

## 🐛 Quick Troubleshooting

### Backend won't start?
```bash
# Check if port 8080 is in use
netstat -ano | findstr :8080  # Windows
lsof -i :8080                 # Mac/Linux

# Kill process if needed
# Then restart backend
```

### Frontend won't start?
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Database connection error?
```yaml
# Check application.yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/jobconnect_db
    username: root  # Your MySQL username
    password: your_password  # Your MySQL password
```

### "User ID not found" error?
```javascript
// In browser console, check:
localStorage.getItem('userId')

// If null, login again
```

## 📱 Quick Navigation

Once running, access these pages:

| Page | URL | Description |
|------|-----|-------------|
| Home | http://localhost:5174 | Landing page |
| Login | http://localhost:5174/login | Login page |
| Register | http://localhost:5174/register | Registration |
| Dashboard | http://localhost:5174/recruiter/dashboard | Main dashboard |
| Post Job | http://localhost:5174/recruiter/jobs/create | Create job |
| Manage Jobs | http://localhost:5174/recruiter/jobs | Job management |
| Applications | http://localhost:5174/recruiter/applications | View applications |

## 🎨 What You'll See

### Dashboard
- 📊 Statistics cards (Jobs, Applications, etc.)
- 📝 Recent jobs list
- 📨 Recent applications
- ⚡ Quick action buttons

### Manage Jobs
- 🔍 Search and filter bar
- 📊 Statistics overview
- 📋 Job cards with actions
- ✏️ Edit, Delete, View buttons

### Post Job
- 📝 Comprehensive form
- ✅ Validation
- 💾 Save functionality
- ↩️ Cancel option

## 🎯 Next Steps

Now that it's running:

1. **Create Company Profile**
   - Go to "Company Profile"
   - Fill in company details
   - Save

2. **Post More Jobs**
   - Try different job types
   - Test all fields
   - Verify they appear correctly

3. **Test Filtering**
   - Post multiple jobs
   - Try different filters
   - Test search functionality

4. **Explore Features**
   - View job details
   - Edit jobs
   - Toggle job status
   - Delete jobs

## 📚 Learn More

For detailed information:
- **SUMMARY.md** - Complete overview
- **RECRUITER_DASHBOARD_FIXES.md** - Technical details
- **TESTING_GUIDE.md** - Comprehensive testing
- **API_DOCUMENTATION.md** - API reference
- **DEPLOYMENT_CHECKLIST.md** - Production deployment

## 💡 Pro Tips

1. **Keep Both Terminals Open**
   - One for backend
   - One for frontend

2. **Check Console for Errors**
   - Backend: Terminal output
   - Frontend: Browser console (F12)

3. **Use Browser DevTools**
   - Network tab for API calls
   - Console for errors
   - Application tab for localStorage

4. **Test Incrementally**
   - Test each feature after implementation
   - Don't wait until the end

5. **Save Your Work**
   - Commit to Git regularly
   - Keep backups

## 🆘 Need Help?

If stuck:
1. Check browser console (F12)
2. Check backend terminal for errors
3. Review TESTING_GUIDE.md
4. Check API_DOCUMENTATION.md
5. Verify database connection

## ✨ Success!

If you can:
- ✅ See the dashboard
- ✅ Post a job
- ✅ Filter jobs
- ✅ View statistics

**Congratulations! Everything is working! 🎉**

## 🚀 You're Ready!

Your recruiter dashboard is now fully functional. Start building amazing features!

---

**Time to Complete**: ~5 minutes  
**Difficulty**: Easy  
**Status**: Ready to Use ✅

**Happy Coding! 🚀**
