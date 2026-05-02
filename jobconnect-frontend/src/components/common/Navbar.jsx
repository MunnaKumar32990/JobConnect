import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import authApi from '../../services/api/authApi'
import NotificationCenter from './NotificationCenter'

export default function Navbar() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const userRole = localStorage.getItem('userRole')
  const isAuthenticated = !!localStorage.getItem('accessToken')

  const handleLogout = async () => {
    await authApi.logout()
    navigate('/login')
  }

  const navLinks = {
    CANDIDATE: [
      { name: 'Browse Jobs', path: '/jobs', icon: '🔍' },
      { name: 'My Applications', path: '/candidate/dashboard', icon: '📋' },
      { name: 'Saved Jobs', path: '/candidate/saved-jobs', icon: '💾' },
      { name: 'Profile', path: '/candidate/profile', icon: '👤' }
    ],
    RECRUITER: [
      { name: 'Dashboard', path: '/recruiter/dashboard', icon: '📊' },
      { name: 'Post Job', path: '/recruiter/jobs/create', icon: '➕' },
      { name: 'Applications', path: '/recruiter/applications', icon: '📨' },
      { name: 'Company', path: '/recruiter/company', icon: '🏢' }
    ],
    ADMIN: [
      { name: 'Dashboard', path: '/admin/dashboard', icon: '⚙️' },
      { name: 'Users', path: '/admin/users', icon: '👥' },
      { name: 'Jobs', path: '/admin/jobs', icon: '💼' },
      { name: 'Reports', path: '/admin/reports', icon: '📈' }
    ]
  }

  const currentLinks = navLinks[userRole] || []

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              JobConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1">
              {currentLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-all font-medium flex items-center gap-2"
                >
                  <span>{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <NotificationCenter />
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {userRole?.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userRole}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-accent-700 transition-all shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-slide-down">
          <div className="px-4 py-3 space-y-1">
            {isAuthenticated ? (
              <>
                {currentLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-primary-600 transition-all font-medium"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-semibold text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
