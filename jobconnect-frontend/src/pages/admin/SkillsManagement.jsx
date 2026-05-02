import { useState, useEffect } from 'react'
import Navbar from '../../components/common/Navbar'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import Loading from '../../components/common/Loading'
import apiClient from '../../services/api/apiClient'

const SkillsManagement = () => {
  const [loading, setLoading] = useState(true)
  const [skills, setSkills] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('ALL')
  const [formData, setFormData] = useState({
    name: '',
    category: 'PROGRAMMING',
    isActive: true
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await apiClient.get('/skills')
      setSkills(response.data)
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingSkill) {
        await apiClient.put(`/skills/${editingSkill.id}`, formData)
      } else {
        await apiClient.post('/skills', formData)
      }
      await fetchSkills()
      closeModal()
    } catch (error) {
      console.error('Failed to save skill:', error)
      alert('Failed to save skill')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this skill?')) return
    try {
      await apiClient.delete(`/skills/${id}`)
      await fetchSkills()
    } catch (error) {
      console.error('Failed to delete skill:', error)
      alert('Failed to delete skill')
    }
  }

  const openModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill)
      setFormData({
        name: skill.name,
        category: skill.category,
        isActive: skill.isActive
      })
    } else {
      setEditingSkill(null)
      setFormData({ name: '', category: 'PROGRAMMING', isActive: true })
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingSkill(null)
    setFormData({ name: '', category: 'PROGRAMMING', isActive: true })
  }

  const getCategoryColor = (category) => {
    const colors = {
      PROGRAMMING: 'primary',
      FRAMEWORK: 'success',
      TOOL: 'info',
      LANGUAGE: 'purple',
      SOFT_SKILL: 'warning'
    }
    return colors[category] || 'default'
  }

  const filteredSkills = skills
    .filter(skill => 
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === 'ALL' || skill.category === filterCategory)
    )

  if (loading) return <Loading fullScreen />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Skills Management</h1>
            <p className="text-gray-600 mt-2">Manage the skills database</p>
          </div>
          <Button onClick={() => openModal()}>Add New Skill</Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="input"
            >
              <option value="ALL">All Categories</option>
              <option value="PROGRAMMING">Programming</option>
              <option value="FRAMEWORK">Framework</option>
              <option value="TOOL">Tool</option>
              <option value="LANGUAGE">Language</option>
              <option value="SOFT_SKILL">Soft Skill</option>
            </select>
          </div>
        </Card>

        {/* Skills Grid */}
        <Card padding="sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skill Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSkills.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                      No skills found
                    </td>
                  </tr>
                ) : (
                  filteredSkills.map(skill => (
                    <tr key={skill.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={getCategoryColor(skill.category)}>
                          {skill.category}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={skill.isActive ? 'success' : 'danger'}>
                          {skill.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => openModal(skill)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => handleDelete(skill.id)}>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Skill Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. React, Python, Communication"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input"
                    required
                  >
                    <option value="PROGRAMMING">Programming</option>
                    <option value="FRAMEWORK">Framework</option>
                    <option value="TOOL">Tool</option>
                    <option value="LANGUAGE">Language</option>
                    <option value="SOFT_SKILL">Soft Skill</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Active</span>
                  </label>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingSkill ? 'Update' : 'Create'}
                  </Button>
                  <Button type="button" variant="secondary" onClick={closeModal}>
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default SkillsManagement
