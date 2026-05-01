import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jobApi from '../../services/api/jobApi'
import Navbar from '../../components/common/Navbar'

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await jobApi.getAllJobs({ page: 0, size: 10 })
      setJobs(response.data.content)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Job Postings</h1>
          <Link to="/jobs/create" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Post New Job
          </Link>
        </div>
        <div className="grid gap-4">
          {jobs.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-600 mb-4">You haven't posted any jobs yet</p>
              <Link to="/jobs/create" className="text-blue-600 hover:underline">Post Your First Job</Link>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                    <p className="text-gray-600 mb-2">{job.location}</p>
                    <p className="text-gray-500 text-sm">Applications: {job.applicationCount || 0}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/jobs/${job.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                    <Link to={`/jobs/${job.id}/applications`} className="text-green-600 hover:underline">View Applications</Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default RecruiterDashboard
