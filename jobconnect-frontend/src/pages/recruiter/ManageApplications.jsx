import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'
import applicationApi from '../../services/api/applicationApi'

export default function ManageApplications() {
  const { id: jobId } = useParams()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetchApplications()
  }, [filter, jobId])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const userId = localStorage.getItem('userId')
      let response
      
      if (jobId) {
        // Fetch applications for specific job
        response = await applicationApi.getApplicationsByJob(jobId, { page: 0, size: 100 })
      } else {
        // Fetch all applications for recruiter's jobs
        response = await applicationApi.getApplicationsByRecruiter(userId, { page: 0, size: 100 })
      }
      
      setApplications(response.data.content || [])
    } catch (error) {
      console.error('Error fetching applications:', error)
      alert('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await applicationApi.updateApplicationStatus(applicationId, newStatus)
      alert('Application status updated successfully')
      fetchApplications()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      REVIEWED: 'bg-blue-100 text-blue-800',
      SHORTLISTED: 'bg-purple-100 text-purple-800',
      INTERVIEWED: 'bg-indigo-100 text-indigo-800',
      OFFERED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const filteredApplications = filter === 'ALL' 
    ? applications 
    : applications.filter(app => app.applicationStatus === filter)

  if (loading) {
    return <Loading fullScreen text="Loading applications..." />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {jobId ? 'Job Applications' : 'Manage Applications'}
          </h1>
          <p className="mt-2 text-gray-600">
            {jobId ? 'Review applications for this job' : 'Review and manage candidate applications'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-6 border border-gray-100">
          <div className="flex flex-wrap gap-2">
            {['ALL', 'PENDING', 'REVIEWED', 'SHORTLISTED', 'INTERVIEWED', 'OFFERED', 'REJECTED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === status
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No applications found</h3>
            <p className="mt-2 text-gray-500">No applications match the selected filter</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((application) => (
              <div key={application.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                        {application.candidate.firstName.charAt(0)}{application.candidate.lastName.charAt(0)}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {application.candidate.firstName} {application.candidate.lastName}
                        </h3>
                        <p className="text-gray-600">{application.candidate.email}</p>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>Applied for: <Link to={`/jobs/${application.job.id}`} className="text-blue-600 hover:underline">{application.job.title}</Link></span>
                          <span>•</span>
                          <span>{new Date(application.appliedAt).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(application.applicationStatus)}`}>
                            {application.applicationStatus}
                          </span>
                          
                          {application.resume && (
                            <a
                              href={`/api/resumes/${application.resume}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline flex items-center"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              View Resume
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <select
                      value={application.applicationStatus}
                      onChange={(e) => handleStatusChange(application.id, e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="REVIEWED">Reviewed</option>
                      <option value="SHORTLISTED">Shortlisted</option>
                      <option value="INTERVIEWED">Interviewed</option>
                      <option value="OFFERED">Offered</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
