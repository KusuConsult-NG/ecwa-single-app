"use client"

import { useState } from 'react'

export default function HRStaffPage() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    department: '',
    startDate: '',
    contractType: 'Permanent'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Staff saved')
    setShowForm(false)
    setFormData({
      firstName: '',
      lastName: '',
      role: '',
      department: '',
      startDate: '',
      contractType: 'Permanent'
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="hr-staff" className="container">
      <div className="section-title">
        <h2>Staff</h2>
        <div>
          <button className="btn primary" onClick={() => setShowForm(true)}>
            Add Staff
          </button>
        </div>
      </div>
      <div className="card" style={{ padding: '1rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Start</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Grace Ade</td>
              <td>Accountant</td>
              <td>Finance</td>
              <td>2023-02-01</td>
              <td><a href="/hr/staff/1">Open</a></td>
            </tr>
            <tr>
              <td>Kunle A.</td>
              <td>Secretary</td>
              <td>Admin</td>
              <td>2024-06-12</td>
              <td><a href="/hr/staff/2">Open</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="new-staff" className={`card ${showForm ? '' : 'hide'}`} style={{ padding: '1rem', marginTop: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>Create Staff</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <label>First name*</label>
              <input 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Last name*</label>
              <input 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label>Role*</label>
              <input 
                placeholder="e.g., Accountant" 
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Department</label>
              <input 
                placeholder="e.g., Finance" 
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label>Start Date*</label>
              <input 
                type="date" 
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Contract Type</label>
              <select name="contractType" value={formData.contractType} onChange={handleChange}>
                <option value="Permanent">Permanent</option>
                <option value="Temporary">Temporary</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn ghost" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit" className="btn primary">Save</button>
          </div>
        </form>
      </div>
    </section>
  )
}


