# Quick Testing Guide - Recruiter Dashboard

## 🚀 Quick Start

### 1. Start Backend
```bash
cd jobconnect-backend
mvn spring-boot:run
```

### 2. Start Frontend
```bash
cd jobconnect-frontend
npm install
npm run dev
```

### 3. Access Application
- Frontend: http://localhost:5174
- Backend API: http://localhost:8080

## 🧪 Test Scenarios

### Scenario 1: Register and Login as Recruiter

1. **Register**
   - Go to http://localhost:5174/register
   - Fill in details
   - Select role: RECRUITER
   - Submit

2. **Login**
   - Go to http://localhost:5174/login
   - Enter credentials
   - Should redirect to /recruiter/dashboard

### Scenario 2: Create Company Profile (If Required)

1. Navigate to "Company Profile"
2. Fill in company details:
   - Company Name
   - Description
   - Industry
   - Location
   - Website
3. Save

### Scenario 3: Post a Job

**Method 1: Using PostJob Page**
1. Click "Post New Job" from dashboard
2. Fill in all fields:
   - Job Title: "Senior Full Stack Developer"
   - Location: "San Francisco, CA"
   - Job Type: Full Time
   - Experience Level: Senior
   - Salary Min: 100000
   - Salary Max: 150000
   - Description: (detailed description)
   - Requirements: (list requirements)
   - Responsibilities: (list responsibilities)
3. Click "Post Job"
4. Should see success message
5. Should redirect to dashboard

**Method 2: Using JobForm Page**
1. Go to /recruiter/jobs/create
2. Fill in form fields
3. Select company from dropdown
4. Submit
5. Verify job appears in dashboard

### Scenario 4: View and Filter Jobs

1. Navigate to "Manage Jobs" (/recruiter/jobs)
2. Verify all your jobs are displayed
3. Test filters:
   - **Search**: Type job title
   - **Status**: Select "Open"
   - **Job Type**: Select "Full Time"
4. Click "Clear Filters"
5. Verify all jobs show again

### Scenario 5: Manage Job

1. From ManageJobs page, for any job:
   - Click "View" - should open job detail
   - Click "Edit" - should open edit form
   - Click "Applications" - should show applications
   - Click "Close/Open" - should toggle status
   - Click "Delete" - should delete job (with confirmation)

### Scenario 6: View Applications

1. Navigate to "View Applications"
2. Verify applications load
3. Test status filters:
   - Click "PENDING"
   - Click "SHORTLISTED"
   - Click "ALL"
4. Change application status using dropdown
5. Verify status updates

### Scenario 7: Dashboard Statistics

1. Go to recruiter dashboard
2. Verify statistics show:
   - Total Jobs Posted (correct count)
   - Active Jobs (only OPEN jobs)
   - Total Applications (all applications)
   - Pending Review (PENDING/APPLIED status)
3. Verify recent jobs list shows your jobs
4. Verify recent applications show real data

## 🔍 What to Check

### ✅ Job Posting
- [ ] Form validation works
- [ ] All fields save correctly
- [ ] Job appears in dashboard immediately
- [ ] Job appears in ManageJobs page
- [ ] Success message displays
- [ ] No console errors

### ✅ Job Filtering
- [ ] Search filters by title
- [ ] Search filters by location
- [ ] Status filter works
- [ ] Job type filter works
- [ ] Multiple filters work together
- [ ] Clear filters resets all

### ✅ Real-Time Data
- [ ] Dashboard shows only your jobs
- [ ] Application count is accurate
- [ ] Statistics are calculated correctly
- [ ] No fake/mock data visible
- [ ] Data refreshes after actions

### ✅ Application Management
- [ ] Applications load correctly
- [ ] Status filters work
- [ ] Status updates save
- [ ] Job-specific applications work
- [ ] Candidate info displays

### ✅ UI/UX
- [ ] Pages load without errors
- [ ] Loading states show
- [ ] Error messages are clear
- [ ] Buttons are responsive
- [ ] Mobile view works
- [ ] Navigation is intuitive

## 🐛 Common Test Issues

### Issue: "User ID not found"
**Check**: 
```javascript
// In browser console
localStorage.getItem('userId')
```
**Fix**: Login again to set userId

### Issue: No jobs showing
**Check**:
1. Are you logged in as recruiter?
2. Have you posted any jobs?
3. Check browser console for errors
4. Check network tab for API responses

### Issue: Job posting fails
**Check**:
1. Is backend running?
2. Do you have a company profile?
3. Are all required fields filled?
4. Check browser console for errors

### Issue: Applications not loading
**Check**:
1. Do your jobs have applications?
2. Check API endpoint in network tab
3. Verify recruiter ID is correct

## 📊 Expected API Calls

### Dashboard Load
```
GET /api/v1/jobs/recruiter/{userId}?page=0&size=100
GET /api/v1/applications/recruiter/{userId}?page=0&size=100
```

### Post Job
```
POST /api/v1/jobs
Body: {
  title, description, requirements, location,
  jobType, experienceLevel, salaryMin, salaryMax,
  postedBy: { id }, company: { id }
}
```

### Update Application Status
```
PATCH /api/v1/applications/{id}/status?status=SHORTLISTED
```

## 🎯 Success Criteria

Your implementation is working correctly if:

1. ✅ You can post a job without errors
2. ✅ Posted job appears in dashboard immediately
3. ✅ You can filter jobs by status, type, and search
4. ✅ Statistics show correct numbers
5. ✅ Applications load and display correctly
6. ✅ You can update application status
7. ✅ All actions provide feedback (success/error)
8. ✅ No console errors during normal operation
9. ✅ Data persists after page refresh
10. ✅ Only your jobs and applications are visible

## 📝 Test Data Examples

### Sample Job Data
```javascript
{
  title: "Senior Full Stack Developer",
  description: "We are looking for an experienced full stack developer...",
  requirements: "5+ years experience\nReact and Node.js\nMySQL",
  responsibilities: "Develop features\nCode reviews\nMentor juniors",
  location: "San Francisco, CA",
  jobType: "FULL_TIME",
  experienceLevel: "SENIOR",
  salaryMin: 120000,
  salaryMax: 180000,
  applicationDeadline: "2024-12-31"
}
```

### Sample Company Data
```javascript
{
  name: "Tech Innovations Inc",
  description: "Leading technology company",
  industry: "Technology",
  companySize: "100-500",
  location: "San Francisco, CA",
  website: "https://techinnovations.com"
}
```

## 🔄 Refresh Testing

After making changes:
1. Clear browser cache
2. Clear localStorage: `localStorage.clear()`
3. Restart backend if needed
4. Refresh frontend
5. Login again
6. Test the feature

## 📞 Need Help?

If tests fail:
1. Check RECRUITER_DASHBOARD_FIXES.md for detailed documentation
2. Review browser console errors
3. Check backend logs
4. Verify database has correct data
5. Ensure all dependencies are installed

## ✨ Happy Testing!

All features should now work correctly. If you find any issues, refer to the detailed documentation in RECRUITER_DASHBOARD_FIXES.md.
