import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import jobApi from '../../services/api/jobApi'
import applicationApi from '../../services/api/applicationApi'
import Navbar from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  const [showApplyModal, setShowApplyModal] = useState(false)
  const userRole = localStorage.getItem('userRole')
  const isAuthenticated = !!localStorage.getItem('accessToken')

  useEffect(() => {
    fetchJobDetails()
  }, [id])

  const fetchJobDetails = async () => {
    try {
      setLoading(true)
      const response = await jobApi.getJobById(id)
      setJob(response.data)
    } catch (error) {
      console.error('Error fetching job:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      setApplying(true)
      const candidateId = localStorage.getItem('candidateId') || 1
      await applicationApi.createApplication({
        job: { id: job.id },
        candidate: { id: candidateId },
        coverLetter
      })
      alert('Application submitted successfully!')
      setShowApplyModal(false)
      setCoverLetter('')
    } catch (error) {
      console.error('Error applying:', error)
      alert(error.response?.data?.message || 'Failed to submit application')
    } finally {
      setApplying(false)
    }
  }

  if (loading) return <Loading fullScreen text="Loading job details..." />
  if (!job) return <div className="text-center py-20">Job not found</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Jobs
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header */}
            <Card>
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-bold text-primary-600">
                      {job.company?.name?.charAt(0) || 'C'}
                    </span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <p className="text-xl text-gray-600 mb-3">{job.company?.name || 'Company'}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="primary">{job.jobType?.replace('_', ' ')}</Badge>
                      {job.isRemote && <Badge variant="success">Remote</Badge>}
                      <Badge variant="default">{job.experienceLevel}</Badge>
                      <Badge variant="info">{job.status}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-semibold text-gray-900">{job.location || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                  <p className="font-semibold text-gray-900">
                    {job.salaryMin && job.salaryMax 
                      ? `$${job.salaryMin.toLocaleString()} - $${job.salaryMax.toLocaleString()}`
                      : 'Competitive'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Posted</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Deadline</p>
                  <p className="font-semibold text-gray-900">
                    {job.applicationDeadline 
                      ? new Date(job.applicationDeadline).toLocaleDateString()
                      : 'Open'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Job Description */}
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                {job.description}
              </div>
            </Card>

            {/* Requirements */}
            {job.requirements && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                  {job.requirements}
                </div>
              </Card>
            )}

            {/* Company Info */}
            {job.company && (
              <Card>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {job.company.name}</h2>
                <div className="space-y-3">
                  {job.company.description && (
                    <p className="text-gray-700">{job.company.description}</p>
                  )}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    {job.company.industry && (
                      <div>
                        <p className="text-sm text-gray-600">Industry</p>
                        <p className="font-semibold text-gray-900">{job.company.industry}</p>
                      </div>
                    )}
                    {job.company.companySize && (
                      <div>
                        <p className="text-sm text-gray-600">Company Size</p>
                        <p className="font-semibold text-gray-900">{job.company.companySize}</p>
                      </div>
                    )}
                    {job.company.website && (
                      <div>
                        <p className="text-sm text-gray-600">Website</p>
                        <a href={job.company.website} target="_blank" rel="noopener noreferrer" 
                           className="font-semibold text-primary-600 hover:text-primary-700">
                          Visit Website →
                        </a>
                      </div>
                    )}
                    {job.company.location && (
                      <div>
                        <p className="text-sm text-gray-600">Location</p>
                        <p className="font-semibold text-gray-900">{job.company.location}</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            {userRole === 'CANDIDATE' && (
              <Card className="sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Apply for this job</h3>
                <Button 
                  variant="gradient" 
                  fullWidth 
                  size="lg"
                  onClick={() => setShowApplyModal(true)}
                >
                  Apply Now
                </Button>
                <div className="mt-4 space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Quick application process
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Direct contact with recruiter
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Track application status
                  </div>
                </div>
              </Card>
            )}

            {/* Job Stats */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Job Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-semibold text-gray-900">{job.viewCount || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Applications</span>
                  <span className="font-semibold text-gray-900">{job.applicationCount || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge variant={job.status === 'OPEN' ? 'success' : 'warning'}>
                    {job.status}
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Share */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Share this job</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" fullWidth>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Button>
                <Button variant="outline" size="sm" fullWidth>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Button>
                <Button variant="outline" size="sm" fullWidth>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Apply for {job.title}</h2>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter <span className="text-gray-500">(Optional)</span>
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={8}
                  placeholder="Tell the employer why you're a great fit for this role..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Tip:</strong> A well-written cover letter increases your chances of getting noticed by 40%!
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowApplyModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="gradient"
                  fullWidth
                  loading={applying}
                  onClick={handleApply}
                >
                  Submit Application
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

export default JobDetail
