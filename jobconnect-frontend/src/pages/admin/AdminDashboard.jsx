import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Button from '../../components/common/Button'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0,
    activeRecruiters: 0,
    activeCandidates: 0,
    pendingApplications: 0
  })

  useEffect(() => {
    setStats({
      totalUsers: 1250,
      totalJobs: 342,
      totalApplications: 5678,
      activeRecruiters: 89,
      activeCandidates: 1161,
      pendingApplications: 234
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Manage and monitor your job portal</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Users</p>
                <p className="text-4xl font-bold mb-2">{stats.totalUsers}</p>
                <p className="text-blue-100 text-sm">↑ 12% from last month</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">👥</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Total Jobs</p>
                <p className="text-4xl font-bold mb-2">{stats.totalJobs}</p>
                <p className="text-purple-100 text-sm">↑ 8% from last month</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">💼</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Applications</p>
                <p className="text-4xl font-bold mb-2">{stats.totalApplications}</p>
                <p className="text-green-100 text-sm">↑ 23% from last month</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">📨</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">Active Recruiters</p>
                <p className="text-4xl font-bold mb-2">{stats.activeRecruiters}</p>
                <p className="text-indigo-100 text-sm">Companies hiring</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">🏢</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-1">Active Candidates</p>
                <p className="text-4xl font-bold mb-2">{stats.activeCandidates}</p>
                <p className="text-yellow-100 text-sm">Job seekers</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">👤</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium mb-1">Pending Reviews</p>
                <p className="text-4xl font-bold mb-2">{stats.pendingApplications}</p>
                <p className="text-orange-100 text-sm">Needs attention</p>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <span className="text-3xl">⏰</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/users">
            <Card hover className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Users</h3>
                  <p className="text-gray-600 text-sm">View and manage all users</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </Card>
          </Link>

          <Link to="/admin/jobs">
            <Card hover className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Manage Jobs</h3>
                  <p className="text-gray-600 text-sm">Review and moderate jobs</p>
                </div>
                <div className="text-4xl">💼</div>
              </div>
            </Card>
          </Link>

          <Link to="/admin/reports">
            <Card hover className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">View Reports</h3>
                  <p className="text-gray-600 text-sm">Analytics and insights</p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </Card>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent User Registrations</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      U{i}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">User {i}</p>
                      <p className="text-sm text-gray-500">user{i}@example.com</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="primary" size="sm">CANDIDATE</Badge>
                    <p className="text-xs text-gray-500 mt-1">{i}h ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Jobs */}
          <Card>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Job Postings</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Senior Developer Position {i}</p>
                    <p className="text-sm text-gray-500">Company {i} • Remote</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="success" size="sm">OPEN</Badge>
                    <p className="text-xs text-gray-500 mt-1">{i}h ago</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
