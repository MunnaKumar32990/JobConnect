import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import jobApi from '../../services/api/jobApi'
import Navbar from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'

const JobList = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    minSalary: '',
    isRemote: ''
  })

  useEffect(() => {
    fetchJobs()
  }, [page])

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await jobApi.getAllJobs({ page, size: 12 })
      setJobs(response.data.content || [])
      setTotalPages(response.data.totalPages || 0)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      const searchParams = {
        ...filters,
        page,
        size: 12
      }
      Object.keys(searchParams).forEach(key => {
        if (!searchParams[key]) delete searchParams[key]
      })
      
      const response = await jobApi.searchJobs(searchParams)
      setJobs(response.data.content || [])
      setTotalPages(response.data.totalPages || 0)
    } catch (error) {
      console.error('Error searching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const clearFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      jobType: '',
      experienceLevel: '',
      minSalary: '',
      isRemote: ''
    })
    setPage(0)
    fetchJobs()
  }

  const getJobTypeBadge = (type) => {
    const variants = {
      FULL_TIME: 'primary',
      PART_TIME: 'warning',
      CONTRACT: 'info',
      INTERN: 'purple',
      REMOTE: 'success'
    }
    return variants[type] || 'default'
  }

  if (loading && jobs.length === 0) return <Loading fullScreen text="Loading jobs..." />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Your Dream Job</h1>
          <p className="text-lg text-gray-600">Discover thousands of opportunities from top companies</p>
        </div>

        {/* Search & Filters */}
        <Card className="mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                  placeholder="Job title, keywords, or company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  placeholder="City, state, or remote"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <Button variant="gradient" size="lg" onClick={handleSearch}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </Button>
            </div>

            {/* Advanced Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <select
                name="jobType"
                value={filters.jobType}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Job Types</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERN">Internship</option>
              </select>

              <select
                name="experienceLevel"
                value={filters.experienceLevel}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Experience Levels</option>
                <option value="ENTRY">Entry Level</option>
                <option value="MID">Mid Level</option>
                <option value="SENIOR">Senior Level</option>
              </select>

              <select
                name="isRemote"
                value={filters.isRemote}
                onChange={handleFilterChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                <option value="true">Remote Only</option>
                <option value="false">On-site Only</option>
              </select>

              <Button variant="ghost" onClick={clearFilters} fullWidth>
                Clear Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{jobs.length}</span> jobs found
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500">
            <option>Most Recent</option>
            <option>Salary: High to Low</option>
            <option>Salary: Low to High</option>
          </select>
        </div>

        {/* Job Grid */}
        {loading ? (
          <Loading text="Searching jobs..." />
        ) : jobs.length === 0 ? (
          <Card className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search filters</p>
            <Button variant="primary" onClick={clearFilters}>Clear All Filters</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Card key={job.id} hover className="flex flex-col">
                <Link to={`/jobs/${job.id}`} className="flex-1">
                  {/* Company Logo */}
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      {job.company?.name?.charAt(0) || 'C'}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                    {job.title}
                  </h3>

                  {/* Company Name */}
                  <p className="text-gray-600 mb-3">{job.company?.name || 'Company'}</p>

                  {/* Job Details */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant={getJobTypeBadge(job.jobType)}>
                      {job.jobType?.replace('_', ' ')}
                    </Badge>
                    {job.isRemote && <Badge variant="success">Remote</Badge>}
                    {job.experienceLevel && (
                      <Badge variant="default">{job.experienceLevel}</Badge>
                    )}
                  </div>

                  {/* Location & Salary */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {job.location || 'Not specified'}
                    </div>
                    {job.salaryMin && job.salaryMax && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                      </div>
                    )}
                  </div>
                </Link>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  <Link to={`/jobs/${job.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = page < 3 ? i : page - 2 + i
                if (pageNum >= totalPages) return null
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? 'primary' : 'outline'}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum + 1}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobList
