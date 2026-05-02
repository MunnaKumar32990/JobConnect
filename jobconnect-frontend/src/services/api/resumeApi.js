import apiClient from './apiClient'

const resumeApi = {
  getResumesByCandidate: (candidateId) => apiClient.get(`/resumes/candidate/${candidateId}`),
  
  getPrimaryResume: (candidateId) => apiClient.get(`/resumes/candidate/${candidateId}/primary`),
  
  uploadResume: (candidateId, file, isPrimary = false) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('candidateId', candidateId)
    formData.append('isPrimary', isPrimary)
    
    return apiClient.post('/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  
  setPrimaryResume: (resumeId) => apiClient.patch(`/resumes/${resumeId}/set-primary`),
  
  deleteResume: (resumeId) => apiClient.delete(`/resumes/${resumeId}`),
  
  downloadResume: (fileName) => {
    return apiClient.get(`/resumes/download/${fileName}`, {
      responseType: 'blob'
    })
  }
}

export default resumeApi
