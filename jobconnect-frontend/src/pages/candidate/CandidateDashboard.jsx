import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import applicationApi from '../../services/api/applicationApi'

export default function CandidateDashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    shortlisted: 0,
    interview: 0,
    rejected: 0
  })

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const candidateId = localStorage.getItem('candidateId') || 1
      const response = await applicationApi.getApplicationsByCandidate(candidateId, { page: 0, size: 20 })
      const apps = response.data.content || []
      setApplications(apps)
      
      // Calculate stats
      setStats({
        total: apps.length,
        applied: apps.filter(a => a.applicationStatus === 'APPLIED').length,
        shortlisted: apps.filter(a => a.applicationStatus === 'SHORTLISTED').length,
        interview: apps.filter(a => a.applicationStatus === 'INTERVIEW').length,
        rejected: apps.filter(a => a.applicationStatus === 'REJECTED').length
      })
    } catch (error) {
      console.error('Error fetching applications:', error)
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
      WITHDRAWN: 'default',
      HIRED: 'success'
    }
    return variants[status] || 'default'
  }

  const getStatusIcon = (status) => {
    const icons = {
      APPLIED: '📝',
      SHORTLISTED: '⭐',
      INTERVIEW: '🎯',
      REJECTED: '❌',
      WITHDRAWN: '↩️',
      HIRED: '🎉'
    }
    return icons[status] || '📄'
  }

  if (loading) return <Loading fullScreen text="Loading your dashboard..." />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-lg text-gray-600">Track your job applications and career progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Applications</p>
                <p className="text-4xl font-bold">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Applied</p>
                <p className="text-4xl font-bold">{stats.applied}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📝</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">Shortlisted</p>
                <p className="text-4xl font-bold">{stats.shortlisted}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Interviews</p>
                <p className="text-4xl font-bold">{stats.interview}</p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Success Rate</p>
                <p className="text-4xl font-bold">
                  {stats.total > 0 ? Math.round(((stats.shortlisted + stats.interview) / stats.total) * 100) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link to="/jobs">
            <Card hover className="text-center bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Jobs</h3>
              <p className="text-sm text-gray-600">Discover new opportunities</p>
            </Card>
          </Link>

          <Link to="/candidate/profile">
            <Card hover className="text-center bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <div className="text-4xl mb-3">👤</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Update Profile</h3>
              <p className="text-sm text-gray-600">Keep your profile current</p>
            </Card>
          </Link>

          <Link to="/candidate/resumes">
            <Card hover className="text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-sm text-gray-600">Update your resume</p>
            </Card>
          </Link>
        </div>

        {/* Applications List */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">My Applications</h2>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-sm">
                <option>All Status</option>
                <option>Applied</option>
                <option>Shortlisted</option>
                <option>Interview</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600 mb-6">Start applying to jobs to see them here</p>
              <Link to="/jobs">
                <Button variant="gradient">Browse Jobs</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application.id}
                  className="border border-gray-200 rounded-lg p-6 hover:border-primary-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getStatusIcon(application.applicationStatus)}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.job?.title || 'Job Title'}
                          </h3>
                          <p className="text-gray-600">{application.job?.company?.name || 'Company'}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant={getStatusBadge(application.applicationStatus)}>
                          {application.applicationStatus}
                        </Badge>
                        {application.job?.jobType && (
                          <Badge variant="default">{application.job.jobType.replace('_', ' ')}</Badge>
                        )}
                        {application.job?.location && (
                          <Badge variant="default">
                            📍 {application.job.location}
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Applied {new Date(application.createdAt).toLocaleDateString()}
                        </div>
                        {application.rating && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            Rating: {application.rating}/5
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Link to={`/jobs/${application.job?.id}`}>
                        <Button variant="outline" size="sm">View Job</Button>
                      </Link>
                      {application.applicationStatus === 'APPLIED' && (
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          Withdraw
                        </Button>
                      )}
                    </div>
                  </div>

                  {application.reviewNotes && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 mb-1">Recruiter Notes:</p>
                      <p className="text-sm text-blue-800">{application.reviewNotes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
