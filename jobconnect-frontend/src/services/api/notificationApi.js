import apiClient from './apiClient'

const notificationApi = {
  getNotifications: (userId, params) => apiClient.get(`/notifications/user/${userId}`, { params }),
  
  getUnreadNotifications: (userId, params) => apiClient.get(`/notifications/user/${userId}/unread`, { params }),
  
  getUnreadCount: (userId) => apiClient.get(`/notifications/user/${userId}/unread-count`),
  
  createNotification: (userId, type, title, message, relatedEntityId, relatedEntityType) => 
    apiClient.post('/notifications', null, {
      params: { userId, type, title, message, relatedEntityId, relatedEntityType }
    }),
  
  markAsRead: (notificationId) => apiClient.patch(`/notifications/${notificationId}/read`),
  
  markAllAsRead: (userId) => apiClient.patch(`/notifications/user/${userId}/read-all`),
  
  deleteNotification: (notificationId) => apiClient.delete(`/notifications/${notificationId}`)
}

export default notificationApi
