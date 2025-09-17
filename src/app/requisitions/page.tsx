"use client"

import { useState, useEffect } from 'react'


interface Requisition {
  id: string
  title: string
  description: string
  amount: number
  category: string
  requester: string
  requesterEmail: string
  status: 'pending' | 'approved' | 'declined' | 'in_review'
  currentApprover: string
  approvalChain: string[]
  createdAt: string
  updatedAt: string
  attachments?: string[]
}

export default function RequisitionsPage() {
  
  const [requisitions, setRequisitions] = useState<Requisition[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    category: '',
    requester: '',
    requesterEmail: ''
  })

  const categories = [
    'General Church Operations',
    'Agency Activities',
    'Building & Maintenance',
    'Missions & Evangelism',
    'Welfare & Support',
    'Events & Programs',
    'Equipment & Supplies',
    'Other'
  ]

  useEffect(() => {
    loadRequisitions()
  }, [])

  const loadRequisitions = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/requisitions`)
      const data = await response.json()
      setRequisitions(data.requisitions || [])
    } catch (error) {
      console.error('Error loading requisitions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/requisitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          status: 'pending'
        })
      })

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          amount: '',
          category: '',
          requester: '',
          requesterEmail: ''
        })
        setShowForm(false)
        loadRequisitions()
      }
    } catch (error) {
      console.error('Error creating requisition:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'in_review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getApprovalFlow = (level: string) => {
    switch (level) {
      case 'LC':
        return ['Financial Secretary', 'Secretary', 'Senior Minister', 'Treasurer']
      case 'LCC':
        return ['Financial Secretary', 'Secretary', 'LO', 'Treasurer']
      case 'DCC':
        return ['Secretary', 'Chairman', 'Accountant']
      case 'GCC':
        return ['Financial Secretary', 'General Secretary', 'Treasurer']
      default:
        return ['Financial Secretary', 'Secretary', 'Treasurer']
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading requisitions...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="section-title">
        <h2 className="text-2xl font-bold text-gray-900">Requisitions </h2>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Create Requisition
        </button>
      </div>

      {/* Create Requisition Form */}
      {showForm && (
        <div className="card mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Create New Requisition</h3>
            <button 
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (₦)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Requester Name</label>
                <input
                  type="text"
                  value={formData.requester}
                  onChange={(e) => setFormData({...formData, requester: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Requester Email</label>
              <input
                type="email"
                value={formData.requesterEmail}
                onChange={(e) => setFormData({...formData, requesterEmail: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Create Requisition
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Approval Flow Info */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-3">Approval Flow for ECWA</h3>
        <div className="flex items-center space-x-4 text-sm">
          {getApprovalFlow('ECWA').map((role, index) => (
            <div key={role} className="flex items-center">
              <div className="bg-ecwa-100 text-ecwa-800 px-3 py-1 rounded-full">
                {role}
              </div>
              {index < getApprovalFlow('ECWA').length - 1 && (
                <span className="text-gray-400 mx-2">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Requisitions List */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">All Requisitions</h3>
        {requisitions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No requisitions found. Create your first requisition to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Approver
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requisitions.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{req.title}</div>
                      <div className="text-sm text-gray-500">{req.requester}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₦{req.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {req.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                        {req.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {req.currentApprover}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-ecwa-600 hover:text-ecwa-900 mr-3">
                        View
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
