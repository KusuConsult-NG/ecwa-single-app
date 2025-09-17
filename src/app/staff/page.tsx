"use client"

import { useState, useEffect } from 'react'


interface Staff {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  salary: number
  startDate: string
  status: 'active' | 'inactive' | 'on-leave'
  qualifications: string
  createdAt: string
}

export default function StaffPage() {
  
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    salary: '',
    qualifications: ''
  })

  useEffect(() => {
    loadStaff()
  }, [])

  const loadStaff = async () => {
    try {
      const response = await fetch(`/api/staff`)
      const data = await response.json()
      setStaff(data.staff || [])
    } catch (error) {
      console.error('Error loading staff:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/staff`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          salary: parseFloat(formData.salary),
          status: 'active',
          startDate: new Date().toISOString()
        })
      })

      if (response.ok) {
        setFormData({ name: '', position: '', department: '', email: '', phone: '', salary: '', qualifications: '' })
        setShowForm(false)
        loadStaff()
      }
    } catch (error) {
      console.error('Error adding staff:', error)
    }
  }

  const activeStaff = staff.filter(s => s.status === 'active').length
  const onLeaveStaff = staff.filter(s => s.status === 'on-leave').length
  const totalSalary = staff
    .filter(s => s.status === 'active')
    .reduce((sum, s) => sum + s.salary, 0)

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <div className="section-title">
        <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add Staff
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid cols-3 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-blue-600">Total Staff</h3>
          <p className="text-3xl font-bold text-blue-600">{staff.length}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-green-600">Active</h3>
          <p className="text-3xl font-bold text-green-600">{activeStaff}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-yellow-600">On Leave</h3>
          <p className="text-3xl font-bold text-yellow-600">{onLeaveStaff}</p>
        </div>
      </div>

      {/* Add Staff Form */}
      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Staff</h2>
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
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Pastor, Secretary, Treasurer"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select department</option>
                  <option value="Administration">Administration</option>
                  <option value="Finance">Finance</option>
                  <option value="Ministry">Ministry</option>
                  <option value="Education">Education</option>
                  <option value="Youth">Youth</option>
                  <option value="Children">Children</option>
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Outreach">Outreach</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter email address"
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
                <label className="block text-sm font-medium text-gray-700">Salary (₦)</label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Qualifications</label>
              <textarea
                value={formData.qualifications}
                onChange={(e) => setFormData({...formData, qualifications: e.target.value})}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter qualifications and certifications"
                rows={3}
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">Add Staff</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Staff List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Staff Directory</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Salary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staff.map((staffMember) => (
                <tr key={staffMember.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{staffMember.name}</div>
                    <div className="text-sm text-gray-500">{staffMember.qualifications}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {staffMember.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {staffMember.department}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{staffMember.email}</div>
                    <div className="text-sm text-gray-500">{staffMember.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₦{staffMember.salary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      staffMember.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : staffMember.status === 'on-leave'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {staffMember.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(staffMember.startDate).toLocaleDateString()}
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
