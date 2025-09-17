"use client"

import { useState, useEffect } from 'react'


interface Agency {
  id: string
  name: string
  type: 'Women Fellowship' | 'Men Fellowship' | 'Youth Fellowship' | 'Children Ministry' | 'Choir' | 'Ushering' | 'Evangelism' | 'Prayer Group' | 'Bible Study' | 'Other'
  description: string
  leader: string
  contact: string
  status: 'active' | 'inactive'
  establishedDate: string
  createdAt: string
}

export default function AgenciesPage() {
  
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'Women Fellowship' as 'Women Fellowship' | 'Men Fellowship' | 'Youth Fellowship' | 'Children Ministry' | 'Choir' | 'Ushering' | 'Evangelism' | 'Prayer Group' | 'Bible Study' | 'Other',
    description: '',
    leader: '',
    contact: ''
  })

  useEffect(() => {
    loadAgencies()
  }, [])

  const loadAgencies = async () => {
    try {
      const response = await fetch(`/api/agencies`)
      const data = await response.json()
      setAgencies(data.agencies || [])
    } catch (error) {
      console.error('Error loading agencies:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/agencies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'active',
          establishedDate: new Date().toISOString()
        })
      })

      if (response.ok) {
        setFormData({ name: '', type: 'Women Fellowship', description: '', leader: '', contact: '' })
        setShowForm(false)
        loadAgencies()
      }
    } catch (error) {
      console.error('Error adding agency:', error)
    }
  }

  const activeAgencies = agencies.filter(a => a.status === 'active').length
  const inactiveAgencies = agencies.filter(a => a.status === 'inactive').length

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <div className="section-title">
        <h1 className="text-3xl font-bold text-gray-900">Agency Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add Agency
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid cols-3 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-blue-600">Total Agencies</h3>
          <p className="text-3xl font-bold text-blue-600">{agencies.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-green-600">Active</h3>
          <p className="text-3xl font-bold text-green-600">{activeAgencies}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-600">Inactive</h3>
          <p className="text-3xl font-bold text-gray-600">{inactiveAgencies}</p>
        </div>
      </div>

      {/* Add Agency Form */}
      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Agency</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Agency Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter agency name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Women Fellowship">Women Fellowship</option>
                  <option value="Men Fellowship">Men Fellowship</option>
                  <option value="Youth Fellowship">Youth Fellowship</option>
                  <option value="Children Ministry">Children Ministry</option>
                  <option value="Choir">Choir</option>
                  <option value="Ushering">Ushering</option>
                  <option value="Evangelism">Evangelism</option>
                  <option value="Prayer Group">Prayer Group</option>
                  <option value="Bible Study">Bible Study</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Leader</label>
                <input
                  type="text"
                  value={formData.leader}
                  onChange={(e) => setFormData({...formData, leader: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter leader name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter contact information"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter agency description"
                rows={3}
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">Add Agency</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Agencies List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Agencies Directory</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leader</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Established</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {agencies.map((agency) => (
                <tr key={agency.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{agency.name}</div>
                    <div className="text-sm text-gray-500">{agency.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {agency.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agency.leader}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {agency.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      agency.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {agency.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(agency.establishedDate).toLocaleDateString()}
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
