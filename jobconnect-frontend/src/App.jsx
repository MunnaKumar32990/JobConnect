import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/public/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import JobList from './pages/jobs/JobList'
import JobDetail from './pages/jobs/JobDetail'
import CandidateDashboard from './pages/candidate/CandidateDashboard'
import CandidateProfile from './pages/candidate/CandidateProfile'
import SavedJobs from './pages/candidate/SavedJobs'
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard'
import PostJob from './pages/recruiter/PostJob'
import JobForm from './pages/recruiter/JobForm'
import ManageJobs from './pages/recruiter/ManageJobs'
import ManageApplications from './pages/recruiter/ManageApplications'
import CompanyProfile from './pages/recruiter/CompanyProfile'
import AdminDashboard from './pages/admin/AdminDashboard'

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
        
        {/* Recruiter Routes */}
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/jobs" element={<ManageJobs />} />
        <Route path="/recruiter/jobs/create" element={<JobForm />} />
        <Route path="/recruiter/jobs/new" element={<PostJob />} />
        <Route path="/recruiter/jobs/:id/edit" element={<JobForm />} />
        <Route path="/recruiter/applications" element={<ManageApplications />} />
        <Route path="/recruiter/jobs/:id/applications" element={<ManageApplications />} />
        <Route path="/recruiter/company" element={<CompanyProfile />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
