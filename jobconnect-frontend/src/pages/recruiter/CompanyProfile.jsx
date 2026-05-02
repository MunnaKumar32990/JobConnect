import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Loading from '../../components/common/Loading'
import companyApi from '../../services/api/companyApi'
import jobApi from '../../services/api/jobApi'

const CompanyProfile = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [company, setCompany] = useState(null)
  const [jobs, setJobs] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    companySize: 'MEDIUM',
    website: '',
    location: '',
    city: '',
    country: '',
    description: '',
    logoUrl: '',
    foundedYear: ''
  })

  useEffect(() => {
    fetchCompany()
    fetchCompanyJobs()
  }, [id])

  const fetchCompany = async () => {
    try {
      const response = await companyApi.getCompanyById(id)
      setCompany(response.data)
      setFormData({
        name: response.data.name,
        industry: response.data.industry || '',
        companySize: response.data.companySize || 'MEDIUM',
        website: response.data.website || '',
        location: response.data.location || '',
        city: response.data.city || '',
        country: response.data.country || '',
        description: response.data.description || '',
        logoUrl: response.data.logoUrl || '',
        foundedYear: response.data.foundedYear || ''
      })
    } catch (error) {
      console.error('Failed to fetch company:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCompanyJobs = async () => {
    try {
      const response = await jobApi.getJobsByCompany(id, { page: 0, size: 10 })
      setJobs(response.data.content)
    } catch (error) {
      console.error('Failed to fetch jobs:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await companyApi.updateCompany(id, formData)
      await fetchCompany()
      setEditing(false)
    } catch (error) {
      console.error('Failed to update company:', error)
      alert('Failed to update company')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (loading) return <Loading fullScreen />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!editing ? (
          <>
            {/* Company Header */}
            <Card className="mb-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl flex items-center justify-center">
                    {company.logoUrl ? (
                      <img src={company.logoUrl} alt={company.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span className="text-3xl font-bold text-primary-600">
                        {company.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                    <div className="flex gap-3 mt-2">
                      {company.industry && <Badge variant="primary">{company.industry}</Badge>}
                      {company.companySize && <Badge>{company.companySize}</Badge>}
                      {company.isActive && <Badge variant="success">Active</Badge>}
                    </div>
                    <div className="flex gap-4 mt-3 text-sm text-gray-600">
                      {company.location && (
                        <span className="flex items-center gap-1">
                          📍 {company.location}
                        </span>
                      )}
                      {company.foundedYear && (
                        <span className="flex items-center gap-1">
                          📅 Founded {company.foundedYear}
                        </span>
                      )}
                      {company.website && (
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                          🌐 Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <Button onClick={() => setEditing(true)}>Edit Profile</Button>
              </div>
            </Card>

            {/* About */}
            <Card className="mb-6">
              <h2 className="text-xl font-semibold mb-4">About Company</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {company.description || 'No description available.'}
              </p>
            </Card>

            {/* Open Positions */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Open Positions ({jobs.length})</h2>
                <Button size="sm" onClick={() => navigate('/recruiter/jobs/new')}>
                  Post New Job
                </Button>
              </div>
              {jobs.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No open positions</p>
              ) : (
                <div className="space-y-3">
                  {jobs.map(job => (
                    <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                        <div className="flex gap-2 mt-1">
                          <Badge size="sm">{job.jobType}</Badge>
                          <Badge size="sm" variant="info">{job.experienceLevel}</Badge>
                          {job.isRemote && <Badge size="sm" variant="success">Remote</Badge>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => navigate(`/jobs/${job.id}`)}>
                          View
                        </Button>
                        <Button size="sm" onClick={() => navigate(`/recruiter/jobs/${job.id}/edit`)}>
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <Card className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Edit Company Profile</h2>
                <Button type="button" variant="ghost" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Company Name" name="name" value={formData.name} onChange={handleChange} required />
                <Input label="Industry" name="industry" value={formData.industry} onChange={handleChange} />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <select name="companySize" value={formData.companySize} onChange={handleChange} className="input">
                    <option value="STARTUP">Startup (1-10)</option>
                    <option value="SMALL">Small (11-50)</option>
                    <option value="MEDIUM">Medium (51-200)</option>
                    <option value="LARGE">Large (201-1000)</option>
                    <option value="ENTERPRISE">Enterprise (1000+)</option>
                  </select>
                </div>
                <Input label="Founded Year" name="foundedYear" type="number" value={formData.foundedYear} onChange={handleChange} />
                <Input label="Website" name="website" value={formData.website} onChange={handleChange} placeholder="https://example.com" />
                <Input label="Logo URL" name="logoUrl" value={formData.logoUrl} onChange={handleChange} placeholder="https://example.com/logo.png" />
                <Input label="Location" name="location" value={formData.location} onChange={handleChange} />
                <Input label="City" name="city" value={formData.city} onChange={handleChange} />
                <Input label="Country" name="country" value={formData.country} onChange={handleChange} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className="input"
                  placeholder="Tell us about your company..."
                />
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <Button type="submit" loading={loading}>Save Changes</Button>
                <Button type="button" variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </Card>
          </form>
        )}
      </div>
    </div>
  )
}

export default CompanyProfile
