import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jobApi from '../../services/api/jobApi'
import Navbar from '../../components/common/Navbar'

const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetchJobs()
  }, [page])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await jobApi.getAllJobs({ page, size: 10 })
      setJobs(response.data.content)
      setTotalPages(response.data.totalPages)
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
        <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <Link to={`/jobs/${job.id}`}>
                <h2 className="text-xl font-semibold text-blue-600 mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.location}</p>
                <p className="text-gray-700 line-clamp-2">{job.description}</p>
                <div className="mt-4 flex gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">{job.jobType}</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">{job.experienceLevel}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {page + 1} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobList
