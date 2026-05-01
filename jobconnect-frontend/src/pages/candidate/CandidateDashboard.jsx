import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import applicationApi from '../../services/api/applicationApi'
import Navbar from '../../components/common/Navbar'

const CandidateDashboard = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const candidateId = localStorage.getItem('userId')
      const response = await applicationApi.getApplicationsByCandidate(candidateId, { page: 0, size: 10 })
      setApplications(response.data.content)
    } catch (error) {
      console.error('Error fetching applications:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center mt-10">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Applications</h1>
        <div className="grid gap-4">
          {applications.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-600 mb-4">You haven't applied to any jobs yet</p>
              <Link to="/jobs" className="text-blue-600 hover:underline">Browse Jobs</Link>
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">{app.job?.title}</h2>
                <p className="text-gray-600 mb-2">Status: <span className="font-semibold">{app.applicationStatus}</span></p>
                <p className="text-gray-500 text-sm">Applied: {new Date(app.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CandidateDashboard
