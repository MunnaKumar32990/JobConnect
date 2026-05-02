import { useState, useEffect } from 'react'
import Navbar from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // Mock data
      setUsers([
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'CANDIDATE', accountStatus: 'ACTIVE', createdAt: new Date().toISOString() },
        { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', role: 'RECRUITER', accountStatus: 'ACTIVE', createdAt: new Date().toISOString() },
        { id: 3, firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', role: 'CANDIDATE', accountStatus: 'SUSPENDED', createdAt: new Date().toISOString() },
        { id: 4, firstName: 'Sarah', lastName: 'Williams', email: 'sarah@example.com', role: 'RECRUITER', accountStatus: 'ACTIVE', createdAt: new Date().toISOString() },
        { id: 5, firstName: 'Tom', lastName: 'Brown', email: 'tom@example.com', role: 'ADMIN', accountStatus: 'ACTIVE', createdAt: new Date().toISOString() }
      ])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (userId, newStatus) => {
    try {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, accountStatus: newStatus } : user
      ))
      alert('User status updated successfully')
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setUsers(users.filter(user => user.id !== userId))
        alert('User deleted successfully')
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Failed to delete user')
      }
    }
  }

  const getRoleBadge = (role) => {
    const variants = {
      ADMIN: 'danger',
      RECRUITER: 'purple',
      CANDIDATE: 'primary'
    }
    return variants[role] || 'default'
  }

  const getStatusBadge = (status) => {
    const variants = {
      ACTIVE: 'success',
      SUSPENDED: 'warning',
      INACTIVE: 'default'
    }
    return variants[status] || 'default'
  }

  const filteredUsers = users
    .filter(user => filter === 'ALL' || user.role === filter)
    .filter(user => 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

  if (loading) return <Loading fullScreen text="Loading users..." />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Users</h1>
          <p className="text-lg text-gray-600">View and manage all platform users</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              {['ALL', 'CANDIDATE', 'RECRUITER', 'ADMIN'].map((role) => (
                <Button
                  key={role}
                  variant={filter === role ? 'primary' : 'outline'}
                  onClick={() => setFilter(role)}
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Users Table */}
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getRoleBadge(user.role)}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusBadge(user.accountStatus)}>
                        {user.accountStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <select
                          value={user.accountStatus}
                          onChange={(e) => handleStatusChange(user.id, e.target.value)}
                          className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="ACTIVE">Active</option>
                          <option value="SUSPENDED">Suspended</option>
                          <option value="INACTIVE">Inactive</option>
                        </select>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {filteredUsers.length === 0 && (
          <Card className="text-center py-16 mt-6">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </Card>
        )}
      </div>
    </div>
  )
}
