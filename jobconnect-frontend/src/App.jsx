import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/public/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import JobList from './pages/jobs/JobList'
import JobDetail from './pages/jobs/JobDetail'
import CandidateDashboard from './pages/candidate/CandidateDashboard'
import CandidateProfile from './pages/candidate/CandidateProfile'
import SavedJobs from './pages/candidate/SavedJobs'
import ResumeManagement from './pages/candidate/ResumeManagement'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import JobForm from './pages/recruiter/JobForm'
import CompanyProfile from './pages/recruiter/CompanyProfile'
import ApplicationReview from './pages/recruiter/ApplicationReview'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageUsers from './pages/admin/ManageUsers'
import SkillsManagement from './pages/admin/SkillsManagement'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        
        {/* Candidate Routes */}
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/candidate/profile" element={<CandidateProfile />} />
        <Route path="/candidate/saved-jobs" element={<SavedJobs />} />
        <Route path="/candidate/resumes" element={<ResumeManagement />} />
        
        {/* Recruiter Routes */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/jobs/new" element={<JobForm />} />
        <Route path="/recruiter/jobs/:id/edit" element={<JobForm />} />
        <Route path="/recruiter/company/:id" element={<CompanyProfile />} />
        <Route path="/recruiter/applications/:jobId" element={<ApplicationReview />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/skills" element={<SkillsManagement />} />
      </Routes>
    </Router>
  )
}

export default App
