import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Card from '../../components/common/Card'
import Loading from '../../components/common/Loading'
import jobApi from '../../services/api/jobApi'
import companyApi from '../../services/api/companyApi'

const JobForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    city: '',
    country: '',
    jobType: 'FULL_TIME',
    experienceLevel: 'MID',
    salaryMin: '',
    salaryMax: '',
    currency: 'USD',
    applicationDeadline: '',
    isRemote: false,
    companyId: ''
  })

  useEffect(() => {
    fetchCompanies()
    if (id) fetchJob()
  }, [id])

  const fetchCompanies = async () => {
    try {
      const response = await companyApi.getAllCompanies({ page: 0, size: 100 })
      setCompanies(response.data.content)
    } catch (error) {
      console.error('Failed to fetch companies:', error)
    }
  }

  const fetchJob = async () => {
    try {
      setLoading(true)
      const response = await jobApi.getJobById(id)
      const job = response.data
      setFormData({
        title: job.title,
        description: job.description,
        requirements: job.requirements || '',
        location: job.location || '',
        city: job.city || '',
        country: job.country || '',
        jobType: job.jobType,
        experienceLevel: job.experienceLevel,
        salaryMin: job.salaryMin || '',
        salaryMax: job.salaryMax || '',
        currency: job.currency,
        applicationDeadline: job.applicationDeadline || '',
        isRemote: job.isRemote,
        companyId: job.company.id
      })
    } catch (error) {
      console.error('Failed to fetch job:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const jobData = {
        ...formData,
        company: { id: formData.companyId },
        postedBy: { id: localStorage.getItem('userId') }
      }
      
      if (id) {
        await jobApi.updateJob(id, jobData)
      } else {
        await jobApi.createJob(jobData)
      }
      navigate('/recruiter/dashboard')
    } catch (error) {
      console.error('Failed to save job:', error)
      alert('Failed to save job')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (loading && id) return <Loading fullScreen />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {id ? 'Edit Job' : 'Post New Job'}
          </h1>
          <p className="text-gray-600 mt-2">Fill in the details to {id ? 'update' : 'create'} a job posting</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="space-y-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Input
                    label="Job Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <select
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select Company</option>
                    {companies.map(company => (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                  <select name="jobType" value={formData.jobType} onChange={handleChange} className="input">
                    <option value="FULL_TIME">Full Time</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERN">Internship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="input">
                    <option value="ENTRY">Entry Level</option>
                    <option value="MID">Mid Level</option>
                    <option value="SENIOR">Senior Level</option>
                  </select>
                </div>
                <div>
                  <Input
                    label="Application Deadline"
                    name="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Job Description</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input"
                    placeholder="Describe the role, responsibilities, and what makes this opportunity great..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={6}
                    className="input"
                    placeholder="List the required skills, qualifications, and experience..."
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. New York, NY"
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. New York"
                />
                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g. USA"
                />
              </div>
              <div className="mt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isRemote"
                    checked={formData.isRemote}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remote Position</span>
                </label>
              </div>
            </div>

            {/* Salary */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Compensation</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Minimum Salary"
                  name="salaryMin"
                  type="number"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="50000"
                />
                <Input
                  label="Maximum Salary"
                  name="salaryMax"
                  type="number"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="80000"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select name="currency" value={formData.currency} onChange={handleChange} className="input">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="INR">INR</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t">
              <Button type="submit" loading={loading} className="flex-1">
                {id ? 'Update Job' : 'Post Job'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => navigate('/recruiter/dashboard')}>
                Cancel
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  )
}

export default JobForm
