import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import jobApi from '../../services/api/jobApi'
import applicationApi from '../../services/api/applicationApi'
import Navbar from '../../components/common/Navbar'

const JobDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    try {
      const response = await jobApi.getJobById(id)
      setJob(response.data)
    } catch (error) {
      console.error('Error fetching job:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    try {
      setApplying(true)
      await applicationApi.createApplication({ jobId: id })
      alert('Application submitted successfully!')
      navigate('/applications')
    } catch (error) {
      console.error('Error applying:', error)
      alert('Failed to submit application')
    } finally {
      setApplying(false)
    }
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>
  if (!job) return <div className="text-center mt-10">Job not found</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <div className="flex gap-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">{job.jobType}</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded">{job.experienceLevel}</span>
            <span className="text-gray-600">{job.location}</span>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>
          {job.requirements && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Requirements</h2>
              <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
            </div>
          )}
          {job.salaryMin && job.salaryMax && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Salary Range</h2>
              <p className="text-gray-700">
                {job.currency} {job.salaryMin.toLocaleString()} - {job.salaryMax.toLocaleString()}
              </p>
            </div>
          )}
          <button
            onClick={handleApply}
            disabled={applying}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          >
            {applying ? 'Applying...' : 'Apply Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobDetail
