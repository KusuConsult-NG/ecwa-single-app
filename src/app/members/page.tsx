"use client"

import { useState, useEffect } from 'react'


interface Member {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: 'active' | 'inactive'
  joinDate: string
  address: string
  createdAt: string
}

export default function MembersPage() {
  
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Member',
    address: ''
  })

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const response = await fetch(`/api/members`)
      const data = await response.json()
      setMembers(data.members || [])
    } catch (error) {
      console.error('Error loading members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/members`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'active',
          joinDate: new Date().toISOString()
        })
      })

      if (response.ok) {
        setFormData({ name: '', email: '', phone: '', role: 'Member', address: '' })
        setShowForm(false)
        loadMembers()
      }
    } catch (error) {
      console.error('Error adding member:', error)
    }
  }

  const activeMembers = members.filter(m => m.status === 'active').length
  const inactiveMembers = members.filter(m => m.status === 'inactive').length

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <div className="section-title">
        <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add Member
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid cols-3 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-blue-600">Total Members</h3>
          <p className="text-3xl font-bold text-blue-600">{members.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-green-600">Active Members</h3>
          <p className="text-3xl font-bold text-green-600">{activeMembers}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-600">Inactive Members</h3>
          <p className="text-3xl font-bold text-gray-600">{inactiveMembers}</p>
        </div>
      </div>

      {/* Add Member Form */}
      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Member</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter email address"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Member">Member</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Pastor">Pastor</option>
                  <option value="Elder">Elder</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter address"
                rows={3}
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">Add Member</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Members List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Members Directory</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {member.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      member.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(member.joinDate).toLocaleDateString()}
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
