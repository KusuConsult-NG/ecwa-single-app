"use client"

import { useState } from 'react'

export default function HRLeavePage() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'Annual',
    dates: '',
    reason: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Leave submitted')
    setShowForm(false)
    setFormData({
      type: 'Annual',
      dates: '',
      reason: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="hr-leave" className="container">
      <div className="section-title">
        <h2>Leave Management</h2>
        <div>
          <button className="btn primary" onClick={() => setShowForm(!showForm)}>
            New Leave
          </button>
        </div>
      </div>
      <div className="grid cols-2">
        <div className="card" style={{ padding: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Requests</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Staff</th>
                <th>Type</th>
                <th>Dates</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mary J.</td>
                <td>Annual</td>
                <td>Sep 10–14</td>
                <td><span className="status pending">Pending</span></td>
                <td>
                  <button className="btn primary" onClick={() => alert('Leave approved')}>
                    Approve
                  </button>
                  <button className="btn ghost" onClick={() => alert('Leave rejected')}>
                    Reject
                  </button>
                </td>
              </tr>
              <tr>
                <td>Kunle A.</td>
                <td>Sick</td>
                <td>Sep 9–11</td>
                <td><span className="status approved">Approved</span></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Calendar (lite)</h3>
          <div className="grid cols-3">
            <div className="card" style={{ padding: '0.5rem' }}>
              <strong>Mon</strong>
              <div className="muted">Mary (A)</div>
            </div>
            <div className="card" style={{ padding: '0.5rem' }}>
              <strong>Tue</strong>
              <div className="muted">Mary (A)</div>
            </div>
            <div className="card" style={{ padding: '0.5rem' }}>
              <strong>Wed</strong>
              <div className="muted">Mary (A)</div>
            </div>
          </div>
        </div>
      </div>
      <div id="leave-form" className={`card ${showForm ? '' : 'hide'}`} style={{ padding: '1rem', marginTop: '1rem' }}>
        <h3>Request Leave</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <label>Type*</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="Annual">Annual</option>
                <option value="Sick">Sick</option>
                <option value="Study">Study</option>
              </select>
            </div>
            <div>
              <label>Dates*</label>
              <input 
                type="text" 
                placeholder="2025-09-10 to 2025-09-14" 
                name="dates"
                value={formData.dates}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label>Reason</label>
            <textarea 
              rows={3} 
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn ghost" onClick={() => setShowForm(false)}>
              Cancel
            </button>
            <button type="submit" className="btn primary">Submit</button>
          </div>
        </form>
      </div>
    </section>
  )
}
