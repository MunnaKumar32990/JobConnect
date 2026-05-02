import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Loading from '../../components/common/Loading'
import applicationApi from '../../services/api/applicationApi'

const ApplicationReview = () => {
  const { jobId } = useParams()
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState([])
  const [selectedApp, setSelectedApp] = useState(null)
  const [filterStatus, setFilterStatus] = useState('ALL')

  useEffect(() => {
    fetchApplications()
  }, [jobId])

  const fetchApplications = async () => {
    try {
      const response = await applicationApi.getApplicationsByJob(jobId, { page: 0, size: 100 })
      setApplications(response.data.content)
    } catch (error) {
      console.error('Failed to fetch applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (appId, status) => {
    try {
      await applicationApi.updateApplicationStatus(appId, status)
      await fetchApplications()
      if (selectedApp?.id === appId) {
        const updated = applications.find(a => a.id === appId)
        setSelectedApp({ ...updated, applicationStatus: status })
      }
    } catch (error) {
      console.error('Failed to update status:', error)
      alert('Failed to update application status')
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      APPLIED: 'default',
      SHORTLISTED: 'info',
      INTERVIEW: 'purple',
      HIRED: 'success',
      REJECTED: 'danger',
      WITHDRAWN: 'warning'
    }
    return colors[status] || 'default'
  }

  const filteredApps = filterStatus === 'ALL' 
    ? applications 
    : applications.filter(app => app.applicationStatus === filterStatus)

  if (loading) return <Loading fullScreen />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Application Review</h1>
          <p className="text-gray-600 mt-2">Review and manage job applications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-1">
            <Card padding="sm">
              <div className="mb-4 px-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="input"
                >
                  <option value="ALL">All Applications ({applications.length})</option>
                  <option value="APPLIED">Applied</option>
                  <option value="SHORTLISTED">Shortlisted</option>
                  <option value="INTERVIEW">Interview</option>
                  <option value="HIRED">Hired</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                {filteredApps.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No applications found</p>
                ) : (
                  filteredApps.map(app => (
                    <div
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedApp?.id === app.id
                          ? 'bg-primary-50 border-2 border-primary-500'
                          : 'bg-white hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {app.candidate?.user?.firstName} {app.candidate?.user?.lastName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {app.candidate?.headline || 'No headline'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge size="sm" variant={getStatusColor(app.applicationStatus)}>
                          {app.applicationStatus}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Applied {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>

          {/* Application Details */}
          <div className="lg:col-span-2">
            {!selectedApp ? (
              <Card className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select an Application</h3>
                <p className="text-gray-600">Choose an application from the list to view details</p>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Candidate Info */}
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedApp.candidate?.user?.firstName} {selectedApp.candidate?.user?.lastName}
                      </h2>
                      <p className="text-gray-600 mt-1">{selectedApp.candidate?.headline}</p>
                      <div className="flex gap-2 mt-3">
                        <Badge variant={getStatusColor(selectedApp.applicationStatus)}>
                          {selectedApp.applicationStatus}
                        </Badge>
                        {selectedApp.candidate?.experienceLevel && (
                          <Badge variant="info">{selectedApp.candidate.experienceLevel}</Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-medium">{selectedApp.candidate?.user?.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <p className="font-medium">{selectedApp.candidate?.phoneNumber || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Location:</span>
                      <p className="font-medium">{selectedApp.candidate?.location || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Experience:</span>
                      <p className="font-medium">{selectedApp.candidate?.totalYearsExperience || 0} years</p>
                    </div>
                  </div>
                </Card>

                {/* Cover Letter */}
                {selectedApp.coverLetter && (
                  <Card>
                    <h3 className="text-lg font-semibold mb-3">Cover Letter</h3>
                    <p className="text-gray-700 whitespace-pre-line">{selectedApp.coverLetter}</p>
                  </Card>
                )}

                {/* Actions */}
                <Card>
                  <h3 className="text-lg font-semibold mb-4">Update Application Status</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <Button
                      size="sm"
                      variant={selectedApp.applicationStatus === 'SHORTLISTED' ? 'primary' : 'outline'}
                      onClick={() => updateStatus(selectedApp.id, 'SHORTLISTED')}
                    >
                      Shortlist
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedApp.applicationStatus === 'INTERVIEW' ? 'primary' : 'outline'}
                      onClick={() => updateStatus(selectedApp.id, 'INTERVIEW')}
                    >
                      Interview
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedApp.applicationStatus === 'HIRED' ? 'success' : 'outline'}
                      onClick={() => updateStatus(selectedApp.id, 'HIRED')}
                    >
                      Hire
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedApp.applicationStatus === 'REJECTED' ? 'danger' : 'outline'}
                      onClick={() => updateStatus(selectedApp.id, 'REJECTED')}
                    >
                      Reject
                    </Button>
                  </div>
                </Card>

                {/* Notes */}
                <Card>
                  <h3 className="text-lg font-semibold mb-3">Review Notes</h3>
                  <textarea
                    className="input"
                    rows={4}
                    placeholder="Add notes about this candidate..."
                    defaultValue={selectedApp.reviewNotes || ''}
                  />
                  <Button size="sm" className="mt-3">Save Notes</Button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicationReview
