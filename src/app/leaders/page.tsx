"use client"

import { useState, useEffect } from 'react'

interface Leader {
  id: string
  name: string
  email: string
  phone: string
  role: string
  portfolio: string
  status: 'active' | 'inactive' | 'archived'
  startDate: string
  endDate?: string
  avatar?: string
}

export default function LeadersPage() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    portfolio: '',
    startDate: new Date().toISOString().split('T')[0]
  })

  const roles = [
    'President', 'General Secretary', 'Treasurer', 'Chairman', 'Secretary',
    'LO', 'Senior Minister', 'Financial Secretary', 'Youth Pastor', 'CEL', 'Admin'
  ]

  useEffect(() => {
    loadLeaders()
  }, [])

  const loadLeaders = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/leaders')
      const data = await response.json()
      setLeaders(data.leaders || [])
    } catch (error) {
      console.error('Error loading leaders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingLeader ? `/api/leaders/${editingLeader.id}` : '/api/leaders'
      const method = editingLeader ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        await loadLeaders()
        setShowForm(false)
        setEditingLeader(null)
        setFormData({
          name: '',
          email: '',
          phone: '',
          role: '',
          portfolio: '',
          startDate: new Date().toISOString().split('T')[0]
        })
      }
    } catch (error) {
      console.error('Error saving leader:', error)
    }
  }

  const handleEdit = (leader: Leader) => {
    setEditingLeader(leader)
    setFormData({
      name: leader.name,
      email: leader.email,
      phone: leader.phone,
      role: leader.role,
      portfolio: leader.portfolio,
      startDate: leader.startDate.split('T')[0]
    })
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this leader?')) {
      try {
        const response = await fetch(`/api/leaders/${id}`, { method: 'DELETE' })
        if (response.ok) {
          await loadLeaders()
        }
      } catch (error) {
        console.error('Error deleting leader:', error)
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="text-center py-8">
          <div className="text-lg">Loading leaders...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="section-title">
        <h1 className="text-3xl font-bold text-gray-900">Leadership Management</h1>
        <p className="text-gray-600 mt-2">Manage church leadership positions and roles</p>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Leaders ({leaders.length})</h2>
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            Add Leader
          </button>
        </div>

        {leaders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No leaders found. Add your first leader to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Leader
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Portfolio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaders.map((leader) => (
                  <tr key={leader.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-ecwa-100 flex items-center justify-center">
                            <span className="text-ecwa-600 font-medium text-sm">
                              {leader.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{leader.name}</div>
                          <div className="text-sm text-gray-500">{leader.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {leader.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {leader.portfolio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(leader.status)}`}>
                        {leader.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(leader.startDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(leader)}
                        className="text-ecwa-600 hover:text-ecwa-900 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(leader.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingLeader ? 'Edit Leader' : 'Add New Leader'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-ecwa-500 focus:border-ecwa-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-ecwa-500 focus:border-ecwa-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-ecwa-500 focus:border-ecwa-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-ecwa-500 focus:border-ecwa-500"
                  >
                    <option value="">Select Role</option>
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Portfolio</label>
                  <input
                    type="text"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-ecwa-500 focus:border-ecwa-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-ecwa-500 focus:border-ecwa-500"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingLeader(null)
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        role: '',
                        portfolio: '',
                        startDate: new Date().toISOString().split('T')[0]
                      })
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-ecwa-600 border border-transparent rounded-md hover:bg-ecwa-700"
                  >
                    {editingLeader ? 'Update' : 'Add'} Leader
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}