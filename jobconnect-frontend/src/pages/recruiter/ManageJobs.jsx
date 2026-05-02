import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import jobApi from '../../services/api/jobApi'

export default function ManageJobs() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    status: 'ALL',
    search: '',
    jobType: 'ALL'
  })
  const navigate = useNavigate()

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [filters, jobs])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const userId = localStorage.getItem('userId')
      const response = await jobApi.getJobsByRecruiter(userId, { page: 0, size: 100 })
      const jobsData = response.data.content || []
      setJobs(jobsData)
      setFilteredJobs(jobsData)
    } catch (error) {
      console.error('Error fetching jobs:', error)
      alert('Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...jobs]

    if (filters.status !== 'ALL') {
      filtered = filtered.filter(job => job.status === filters.status)
    }

    if (filters.jobType !== 'ALL') {
      filtered = filtered.filter(job => job.jobType === filters.jobType)
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.location?.toLowerCase().includes(searchLower)
      )
    }

    setFilteredJobs(filtered)
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleDelete = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return

    try {
      await jobApi.deleteJob(jobId)
      alert('Job deleted successfully')
      fetchJobs()
    } catch (error) {
      console.error('Error deleting job:', error)
      alert('Failed to delete job')
    }
  }

  const handleStatusToggle = async (jobId, currentStatus) => {
    const newStatus = currentStatus === 'OPEN' ? 'CLOSED' : 'OPEN'
    try {
      await jobApi.updateJob(jobId, { status: newStatus })
      alert(`Job ${newStatus === 'OPEN' ? 'opened' : 'closed'} successfully`)
      fetchJobs()
    } catch (error) {
      console.error('Error updating job status:', error)
      alert('Failed to update job status')
    }
  }

  if (loading) return <Loading fullScreen text="Loading jobs..." />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Jobs</h1>
            <p className="text-lg text-gray-600">View and manage your job postings</p>
          </div>
          <Link to="/recruiter/jobs/create">
            <Button variant="gradient" size="lg">
              ➕ Post New Job
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by title or location..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="ALL">All Status</option>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="ALL">All Types</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Internship</option>
                <option value="REMOTE">Remote</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => setFilters({ status: 'ALL', search: '', jobType: 'ALL' })}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="text-center">
              <p className="text-sm text-blue-600 font-medium">Total Jobs</p>
              <p className="text-3xl font-bold text-blue-900">{jobs.length}</p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="text-center">
              <p className="text-sm text-green-600 font-medium">Active</p>
              <p className="text-3xl font-bold text-green-900">
                {jobs.filter(j => j.status === 'OPEN').length}
              </p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="text-center">
              <p className="text-sm text-orange-600 font-medium">Closed</p>
              <p className="text-3xl font-bold text-orange-900">
                {jobs.filter(j => j.status === 'CLOSED').length}
              </p>
            </div>
          </Card>
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="text-center">
              <p className="text-sm text-purple-600 font-medium">Total Applications</p>
              <p className="text-3xl font-bold text-purple-900">
                {jobs.reduce((sum, job) => sum + (job.applicationCount || 0), 0)}
              </p>
            </div>
          </Card>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">
                {filters.search || filters.status !== 'ALL' || filters.jobType !== 'ALL'
                  ? 'Try adjusting your filters'
                  : 'Start by posting your first job'}
              </p>
              {jobs.length === 0 && (
                <Link to="/recruiter/jobs/create">
                  <Button variant="gradient">Post Your First Job</Button>
                </Link>
              )}
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} hover className="transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                        {job.title.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant={job.status === 'OPEN' ? 'success' : job.status === 'CLOSED' ? 'danger' : 'warning'}>
                            {job.status}
                          </Badge>
                          <Badge variant="default">{job.jobType?.replace('_', ' ')}</Badge>
                          {job.location && <Badge variant="info">📍 {job.location}</Badge>}
                          {job.experienceLevel && <Badge variant="purple">{job.experienceLevel}</Badge>}
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span>👁️ {job.viewCount || 0} views</span>
                          <span>📨 {job.applicationCount || 0} applications</span>
                          {job.salaryMin && job.salaryMax && (
                            <span>💰 ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}</span>
                          )}
                          <span>📅 {new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4">
                    <Link to={`/jobs/${job.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        👁️ View
                      </Button>
                    </Link>
                    <Link to={`/recruiter/jobs/${job.id}/edit`}>
                      <Button variant="ghost" size="sm" className="w-full">
                        ✏️ Edit
                      </Button>
                    </Link>
                    <Link to={`/recruiter/jobs/${job.id}/applications`}>
                      <Button variant="primary" size="sm" className="w-full">
                        📋 Applications ({job.applicationCount || 0})
                      </Button>
                    </Link>
                    <Button
                      variant={job.status === 'OPEN' ? 'warning' : 'success'}
                      size="sm"
                      onClick={() => handleStatusToggle(job.id, job.status)}
                      className="w-full"
                    >
                      {job.status === 'OPEN' ? '🔒 Close' : '🔓 Open'}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(job.id)}
                      className="w-full"
                    >
                      🗑️ Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
