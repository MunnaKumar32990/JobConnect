import apiClient from './apiClient'

const authApi = {
  login: (email, password) => apiClient.post('/auth/login', { email, password }),
  register: (userData) => apiClient.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    return Promise.resolve()
  },
  refreshToken: (refreshToken) => apiClient.post('/auth/refresh', null, { params: { refreshToken } })
}

export default authApi
