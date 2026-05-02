import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Loading from '../../components/common/Loading'
import candidateApi from '../../services/api/candidateApi'

export default function CandidateProfile() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: '',
    city: '',
    country: '',
    headline: '',
    bio: '',
    currentJobTitle: '',
    experienceLevel: 'ENTRY',
    totalYearsExperience: 0,
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    skills: [],
    isOpenToWork: true
  })
  const [newSkill, setNewSkill] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const response = await candidateApi.getProfileByUserId(userId)
      if (response.data) {
        setProfile({
          ...response.data,
          skills: response.data.skills || []
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({
        ...profile,
        skills: [...profile.skills, newSkill.trim()]
      })
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (index) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const userId = localStorage.getItem('userId')
      await candidateApi.updateProfile(profile.id, profile)
      alert('Profile updated successfully!')
      navigate('/candidate/dashboard')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loading fullScreen text="Loading profile..." />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-lg text-gray-600">Manage your professional information</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                required
              />

              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
              />

              <Input
                label="City"
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
              />

              <Input
                label="Country"
                type="text"
                name="country"
                value={profile.country}
                onChange={handleChange}
              />
            </div>

            <div className="mt-6">
              <Input
                label="Location"
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="e.g., San Francisco, CA"
              />
            </div>
          </Card>

          {/* Professional Information */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Professional Information</h2>

            <div className="space-y-6">
              <Input
                label="Professional Headline"
                type="text"
                name="headline"
                value={profile.headline}
                onChange={handleChange}
                placeholder="e.g., Full Stack Developer | React & Node.js Expert"
              />

              <Input
                label="Current Job Title"
                type="text"
                name="currentJobTitle"
                value={profile.currentJobTitle}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={profile.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="ENTRY">Entry Level (0-2 years)</option>
                    <option value="MID">Mid Level (2-5 years)</option>
                    <option value="SENIOR">Senior Level (5+ years)</option>
                  </select>
                </div>

                <Input
                  label="Years of Experience"
                  type="number"
                  name="totalYearsExperience"
                  value={profile.totalYearsExperience}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Tell us about yourself, your experience, and what you're looking for..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="isOpenToWork"
                  type="checkbox"
                  name="isOpenToWork"
                  checked={profile.isOpenToWork}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isOpenToWork" className="ml-2 block text-sm text-gray-700">
                  I'm open to work opportunities
                </label>
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                placeholder="Add a skill (e.g., React, Python, AWS)"
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Button type="button" onClick={handleAddSkill}>
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="hover:text-primary-900"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </Card>

          {/* Social Links */}
          <Card>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Links</h2>
            
            <div className="space-y-6">
              <Input
                label="LinkedIn URL"
                type="url"
                name="linkedinUrl"
                value={profile.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                }
              />

              <Input
                label="GitHub URL"
                type="url"
                name="githubUrl"
                value={profile.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/yourusername"
                icon={
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                }
              />

              <Input
                label="Portfolio URL"
                type="url"
                name="portfolioUrl"
                value={profile.portfolioUrl}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                icon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                }
              />
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              fullWidth
              loading={saving}
            >
              Save Profile
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => navigate('/candidate/dashboard')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
