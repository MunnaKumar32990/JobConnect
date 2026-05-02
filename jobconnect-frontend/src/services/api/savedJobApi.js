import apiClient from './apiClient'

const savedJobApi = {
  getSavedJobs: (candidateId, params) => apiClient.get(`/saved-jobs/candidate/${candidateId}`, { params }),
  
  saveJob: (candidateId, jobId) => apiClient.post('/saved-jobs', null, {
    params: { candidateId, jobId }
  }),
  
  unsaveJob: (candidateId, jobId) => apiClient.delete('/saved-jobs', {
    params: { candidateId, jobId }
  }),
  
  isJobSaved: (candidateId, jobId) => apiClient.get('/saved-jobs/check', {
    params: { candidateId, jobId }
  })
}

export default savedJobApi
