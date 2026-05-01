import apiClient from './apiClient'

const jobApi = {
  getAllJobs: (params) => apiClient.get('/jobs', { params }),
  getJobById: (id) => apiClient.get(`/jobs/${id}`),
  getJobsByCompany: (companyId, params) => apiClient.get(`/jobs/company/${companyId}`, { params }),
  getJobsByStatus: (status, params) => apiClient.get(`/jobs/status/${status}`, { params }),
  createJob: (jobData) => apiClient.post('/jobs', jobData),
  updateJob: (id, jobData) => apiClient.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => apiClient.delete(`/jobs/${id}`)
}

export default jobApi
