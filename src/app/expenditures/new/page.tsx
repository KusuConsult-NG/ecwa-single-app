"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewExpenditurePage() {
  const [formData, setFormData] = useState({
    purpose: '',
    category: 'Maintenance',
    amount: '',
    beneficiary: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/expenditures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Submitted for review')
        router.push('/approvals')
      } else {
        alert('Failed to submit expenditure')
      }
    } catch (err) {
      console.error('Error submitting expenditure:', err)
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="expenditures-new" className="container">
      <div className="section-title">
        <h2>Raise Expenditure</h2>
      </div>
      <div className="card" style={{ padding: '1rem' }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <label>Purpose*</label>
              <input 
                placeholder="e.g., Roof repair" 
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Category*</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="Maintenance">Maintenance</option>
                <option value="Welfare">Welfare</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div>
              <label>Amount (₦)*</label>
              <input 
                type="number" 
                placeholder="0.00" 
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Beneficiary</label>
              <input 
                placeholder="Vendor/Staff name" 
                name="beneficiary"
                value={formData.beneficiary}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label>Notes</label>
            <textarea 
              rows={3} 
              placeholder="Add any details…" 
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Attachments</label>
            <input type="file" multiple />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Link className="btn ghost" href="/expenditures">Cancel</Link>
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
