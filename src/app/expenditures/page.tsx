"use client"

import { useState, useEffect } from 'react'


interface Expenditure {
  id: string
  title: string
  description: string
  amount: number
  category: string
  status: 'pending' | 'approved' | 'rejected'
  requestedBy: string
  approvedBy?: string
  requestDate: string
  approvalDate?: string
  createdAt: string
}

export default function ExpendituresPage() {
  
  const [expenditures, setExpenditures] = useState<Expenditure[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    category: ''
  })

  useEffect(() => {
    loadExpenditures()
  }, [])

  const loadExpenditures = async () => {
    try {
      const response = await fetch(`/api/expenditures`)
      const data = await response.json()
      setExpenditures(data.expenditures || [])
    } catch (error) {
      console.error('Error loading expenditures:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/expenditures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          status: 'pending',
          requestedBy: 'Current User', // In real app, get from auth context
          requestDate: new Date().toISOString()
        })
      })

      if (response.ok) {
        setFormData({ title: '', description: '', amount: '', category: '' })
        setShowForm(false)
        loadExpenditures()
      }
    } catch (error) {
      console.error('Error adding expenditure:', error)
    }
  }

  const pendingExpenditures = expenditures.filter(e => e.status === 'pending').length
  const approvedExpenditures = expenditures.filter(e => e.status === 'approved').length
  const totalPendingAmount = expenditures
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0)

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <div className="section-title">
        <h1 className="text-3xl font-bold text-gray-900">Expenditure Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Request Expenditure
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid cols-3 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-yellow-600">Pending Requests</h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingExpenditures}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-green-600">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{approvedExpenditures}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-red-600">Pending Amount</h3>
          <p className="text-3xl font-bold text-red-600">₦{totalPendingAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Request Expenditure Form */}
      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Request New Expenditure</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Church Maintenance"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Equipment">Equipment</option>
                  <option value="Events">Events</option>
                  <option value="Outreach">Outreach</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (₦)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Detailed description of the expenditure"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">Submit Request</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Expenditures List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Expenditure Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenditures.map((expenditure) => (
                <tr key={expenditure.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{expenditure.title}</div>
                    <div className="text-sm text-gray-500">{expenditure.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {expenditure.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₦{expenditure.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      expenditure.status === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : expenditure.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {expenditure.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expenditure.requestedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(expenditure.requestDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
