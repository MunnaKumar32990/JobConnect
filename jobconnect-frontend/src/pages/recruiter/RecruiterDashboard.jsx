import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import jobApi from '../../services/api/jobApi'
import applicationApi from '../../services/api/applicationApi'

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingReview: 0,
    shortlisted: 0,
    interviewed: 0
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const userId = localStorage.getItem('userId')
      
      // Fetch jobs posted by recruiter
      const jobsResponse = await jobApi.getAllJobs({ page: 0, size: 10 })
      const jobsData = jobsResponse.data.content || []
      setJobs(jobsData)

      // Fetch recent applications
      const appsResponse = await applicationApi.getAllApplications({ page: 0, size: 10 })
      const appsData = appsResponse.data.content || []
      setApplications(appsData)

      // Calculate stats
      setStats({
        totalJobs: jobsData.length,
        activeJobs: jobsData.filter(j => j.status === 'OPEN').length,
        totalApplications: appsData.length,
        pendingReview: appsData.filter(a => a.applicationStatus === 'APPLIED').length,
        shortlisted: appsData.filter(a => a.applicationStatus === 'SHORTLISTED').length,
        interviewed: appsData.filter(a => a.applicationStatus === 'INTERVIEW').length
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      APPLIED: 'info',
      SHORTLISTED: 'warning',
      INTERVIEW: 'purple',
      REJECTED: 'danger',
      HIRED: 'success'
    }
    return variants[status] || 'default'
  }

  if (loading) return <Loading fullScreen text="Loading dashboard..." />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Recruiter Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your job postings and applications</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Jobs Posted</p>
                <p className="text-4xl font-bold mb-2">{stats.totalJobs}</p>
                <p className="text-blue-100 text-sm">{stats.activeJobs} active</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">💼</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Total Applications</p>
                <p className="text-4xl font-bold mb-2">{stats.totalApplications}</p>
                <p className="text-purple-100 text-sm">{stats.pendingReview} pending review</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">📨</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">In Progress</p>
                <p className="text-4xl font-bold mb-2">{stats.shortlisted + stats.interviewed}</p>
                <p className="text-green-100 text-sm">{stats.interviewed} interviews scheduled</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link to="/recruiter/jobs/new">
            <Card hover className="text-center bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200">
              <div className="text-4xl mb-3">➕</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Post New Job</h3>
              <p className="text-sm text-gray-600">Create job listing</p>
            </Card>
          </Link>

          <Link to="/recruiter/applications">
            <Card hover className="text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View Applications</h3>
              <p className="text-sm text-gray-600">Review candidates</p>
            </Card>
          </Link>

          <Link to="/recruiter/company">
            <Card hover className="text-center bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <div className="text-4xl mb-3">🏢</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Profile</h3>
              <p className="text-sm text-gray-600">Update details</p>
            </Card>
          </Link>

          <Link to="/recruiter/analytics">
            <Card hover className="text-center bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
              <p className="text-sm text-gray-600">View insights</p>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Jobs */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Active Job Postings</h2>
              <Link to="/recruiter/jobs">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>

            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
                <p className="text-gray-600 mb-6">Create your first job posting</p>
                <Link to="/recruiter/jobs/create">
                  <Button variant="gradient">Post a Job</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.slice(0, 5).map((job) => (
                  <div
                    key={job.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{job.location}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={job.status === 'OPEN' ? 'success' : 'warning'}>
                            {job.status}
                          </Badge>
                          <Badge variant="default">{job.jobType?.replace('_', ' ')}</Badge>
                          <Badge variant="info">
                            {job.applicationCount || 0} applications
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link to={`/jobs/${job.id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                        <Link to={`/recruiter/jobs/${job.id}/edit`}>
                          <Button variant="ghost" size="sm">Edit</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Recent Applications */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
              <Link to="/recruiter/applications">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </div>

            {applications.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">📭</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
                <p className="text-gray-600">Applications will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 5).map((application) => (
                  <div
                    key={application.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {application.candidate?.user?.firstName?.charAt(0) || 'C'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {application.candidate?.user?.firstName} {application.candidate?.user?.lastName}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Applied for: {application.job?.title}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant={getStatusBadge(application.applicationStatus)}>
                              {application.applicationStatus}
                            </Badge>
                            <Badge variant="default" size="sm">
                              {new Date(application.createdAt).toLocaleDateString()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Performance Chart Placeholder */}
        <Card className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Trends</h2>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Coming Soon</h3>
            <p className="text-gray-600">Track your hiring performance and application trends</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
