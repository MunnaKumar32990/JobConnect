import apiClient from './apiClient'

const candidateApi = {
  getProfileById: (id) => apiClient.get(`/candidates/${id}`),
  getProfileByUserId: (userId) => apiClient.get(`/candidates/user/${userId}`),
  createProfile: (profileData) => apiClient.post('/candidates', profileData),
  updateProfile: (id, profileData) => apiClient.put(`/candidates/${id}`, profileData),
  deleteProfile: (id) => apiClient.delete(`/candidates/${id}`)
}

export default candidateApi
