import apiClient from './apiClient'

const companyApi = {
  getAllCompanies: (params) => apiClient.get('/companies', { params }),
  getCompanyById: (id) => apiClient.get(`/companies/${id}`),
  createCompany: (companyData) => apiClient.post('/companies', companyData),
  updateCompany: (id, companyData) => apiClient.put(`/companies/${id}`, companyData),
  deleteCompany: (id) => apiClient.delete(`/companies/${id}`)
}

export default companyApi
