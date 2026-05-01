import apiClient from './apiClient'

const applicationApi = {
  getAllApplications: (params) => apiClient.get('/applications', { params }),
  getApplicationById: (id) => apiClient.get(`/applications/${id}`),
  getApplicationsByJob: (jobId, params) => apiClient.get(`/applications/job/${jobId}`, { params }),
  getApplicationsByCandidate: (candidateId, params) => apiClient.get(`/applications/candidate/${candidateId}`, { params }),
  getApplicationsByStatus: (status, params) => apiClient.get(`/applications/status/${status}`, { params }),
  createApplication: (applicationData) => apiClient.post('/applications', applicationData),
  updateApplicationStatus: (id, status) => apiClient.patch(`/applications/${id}/status`, null, { params: { status } }),
  deleteApplication: (id) => apiClient.delete(`/applications/${id}`)
}

export default applicationApi
