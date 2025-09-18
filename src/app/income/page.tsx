"use client"

import { useState } from 'react'

export default function IncomePage() {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    source: 'Tithe',
    amount: '',
    bankRef: '',
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Income recorded')
    setShowForm(false)
    setFormData({
      source: 'Tithe',
      amount: '',
      bankRef: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="income" className="container">
      <div className="section-title">
        <h2>Income</h2>
      </div>
      <div className="card" style={{ padding: '1rem' }}>
        <div className="row">
          <input placeholder="Search…" />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn secondary" onClick={() => setShowForm(!showForm)}>
              Record Income
            </button>
            <button className="btn ghost" onClick={() => alert('Reconciling with bank…')}>
              Reconcile
            </button>
          </div>
        </div>
        <div id="income-form" className={`form ${showForm ? '' : 'hide'}`} style={{ marginTop: '1rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div>
                <label>Source*</label>
                <select name="source" value={formData.source} onChange={handleChange}>
                  <option value="Tithe">Tithe</option>
                  <option value="Offering">Offering</option>
                  <option value="Transfer">Transfer</option>
                </select>
              </div>
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
            </div>
            <div className="row">
              <div>
                <label>Bank Ref</label>
                <input 
                  placeholder="e.g., TRX-55320" 
                  name="bankRef"
                  value={formData.bankRef}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button type="submit" className="btn primary">Save</button>
            </div>
          </form>
        </div>
        <table className="table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Ref</th>
              <th>Source</th>
              <th>Amount</th>
              <th>Bank Ref</th>
              <th>Reconciled</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>INC-0204</td>
              <td>Tithe</td>
              <td>₦1,240,000</td>
              <td>TRX-71011</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>INC-0203</td>
              <td>Offering</td>
              <td>₦310,000</td>
              <td>TRX-70331</td>
              <td>No</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}


