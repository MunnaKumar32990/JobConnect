# 🚀 START HERE - JobConnect Quick Start

## Prerequisites Check

Before starting, ensure you have:
- ✅ Java 17 or higher (`java -version`)
- ✅ Maven 3.8+ (`mvn -version`)
- ✅ Node.js 18+ (`node -version`)
- ✅ PostgreSQL 14+ (`psql --version`)

---

## 🎯 Quick Start (3 Steps)

### Step 1: Setup Database (1 minute)

Open Command Prompt or PowerShell and run:

```bash
psql -U postgres
```

Then in PostgreSQL prompt:
```sql
CREATE DATABASE jobconnect_db;
\q
```

**Note:** If your PostgreSQL password is NOT "postgres", update it in:
`jobconnect-backend/src/main/resources/application.yaml` (line 20)

---

### Step 2: Start Backend (2 minutes)

Open a NEW terminal window:

```bash
cd jobconnect-backend
mvn clean install
mvn spring-boot:run
```

**Wait for this message:**
```
Started JobConnectApplication in X.XXX seconds
```

✅ Backend is ready at: http://localhost:8080

---

### Step 3: Start Frontend (1 minute)

Open ANOTHER NEW terminal window:

```bash
cd jobconnect-frontend
npm install
npm run dev
```

**Wait for this message:**
```
Local: http://localhost:5173/
```

✅ Frontend is ready!

---

## 🎉 You're Done!

Open your browser and go to: **http://localhost:5173**

### Try These Actions:

1. **Register a new account**
   - Click "Get Started" or "Register"
   - Choose role: "Job Seeker" or "Recruiter"
   - Fill the form and submit

2. **Login**
   - Use the credentials you just created
   - You'll be redirected to the jobs page

3. **Browse Jobs**
   - Click "Jobs" in the navigation
   - View job listings with pagination

---

## 🐛 Having Issues?

### Backend won't start?

**Error: "Cannot connect to database"**
```bash
# Check if PostgreSQL is running
psql -U postgres

# If not, start PostgreSQL service:
# Windows: services.msc → Find PostgreSQL → Start
```

**Error: "Port 8080 already in use"**
```bash
# Windows - Kill process on port 8080
netstat -ano | findstr :8080
taskkill /PID <PID_NUMBER> /F
```

**Error: "Authentication failed"**
- Update password in `application.yaml` (line 20)

---

### Frontend won't start?

**Error: "Cannot find module"**
```bash
cd jobconnect-frontend
rm -rf node_modules
npm install
```

**Error: "Network Error" when calling API**
- Make sure backend is running (Step 2)
- Check: http://localhost:8080/actuator/health

---

## 📖 Full Documentation

- **Troubleshooting Guide:** `TROUBLESHOOTING.md`
- **API Documentation:** `API_DOCUMENTATION.md`
- **Deployment Guide:** `DEPLOYMENT_CHECKLIST.md`
- **Quick Start Guide:** `QUICK_START_GUIDE.md`

---

## 🎯 What You Can Do

### As a Job Seeker (Candidate):
1. Register with role "CANDIDATE"
2. Browse available jobs
3. View job details
4. Apply to jobs
5. Track your applications

### As a Recruiter:
1. Register with role "RECRUITER"
2. Post new job openings
3. View applications
4. Manage job listings
5. Update application status

---

## 🔧 Alternative: Use Automated Script

### Windows Users:
```bash
# Double-click or run:
start.bat
```

This will:
- Check PostgreSQL
- Create database
- Start backend
- Start frontend

---

## 📊 Verify Everything Works

### Test Backend:
```bash
curl http://localhost:8080/actuator/health
```
Should return: `{"status":"UP"}`

### Test Frontend:
Open browser: http://localhost:5173
Should see: JobConnect homepage

### Test Registration:
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@test.com\",\"password\":\"password123\",\"firstName\":\"Test\",\"lastName\":\"User\",\"role\":\"CANDIDATE\"}"
```

---

## 🆘 Need Help?

1. Check `TROUBLESHOOTING.md` for common issues
2. Verify all prerequisites are installed
3. Check terminal output for error messages
4. Ensure PostgreSQL is running
5. Make sure ports 8080 and 5173 are available

---

## 🎓 Project Structure

```
JOBPORTAL/
├── jobconnect-backend/     ← Spring Boot API
│   └── src/main/
│       ├── java/           ← Java source code
│       └── resources/      ← Configuration files
│
├── jobconnect-frontend/    ← React UI
│   └── src/
│       ├── pages/          ← Page components
│       ├── components/     ← Reusable components
│       └── services/       ← API services
│
├── start.bat              ← Windows startup script
├── TROUBLESHOOTING.md     ← Fix common issues
└── README.md              ← Project overview
```

---

## ✨ Features Implemented

✅ User authentication (JWT)
✅ Role-based access (Candidate, Recruiter, Admin)
✅ Job posting and browsing
✅ Job applications
✅ User profiles
✅ Company profiles
✅ Pagination
✅ Responsive UI

---

## 🚀 Next Steps

After getting it running:
1. Explore the API at: http://localhost:8080/api/v1/swagger-ui.html
2. Read `API_DOCUMENTATION.md` for all endpoints
3. Check `PHASE2_COMPLETION.md` for implementation details
4. Review `DEPLOYMENT_CHECKLIST.md` for production deployment

---

**Happy Coding! 🎉**

**Questions?** Check the documentation files or review the troubleshooting guide.
