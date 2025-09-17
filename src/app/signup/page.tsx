"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import AutofillInput from '@/components/AutofillInput'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    orgType: 'LC',
    orgName: '',
    phone: '',
    address: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'Member'
        }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/dashboard')
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="signup" className="container">
      <div className="auth card" style={{ background: 'white', color: 'black' }}>
        <h2 style={{ color: 'black' }}>Sign Up & Create Organization</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <label style={{ color: 'black' }}>Full name*</label>
              <AutofillInput
                fieldName="name"
                placeholder="Your name"
                value={formData.name}
                onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                required
                style={{ background: 'white', color: 'black' }}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>Email*</label>
              <AutofillInput
                fieldName="email"
                type="email"
                placeholder="you@church.org"
                value={formData.email}
                onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                required
                style={{ background: 'white', color: 'black' }}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label style={{ color: 'black' }}>Password*</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ background: 'white', color: 'black' }}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>Confirm password*</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{ background: 'white', color: 'black' }}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label style={{ color: 'black' }}>Organization Type*</label>
              <select name="orgType" value={formData.orgType} onChange={handleChange} style={{ background: 'white', color: 'black' }}>
                <option value="LC">LC</option>
                <option value="LCC">LCC</option>
                <option value="DCC">DCC</option>
                <option value="GCC">GCC</option>
                <option value="HQ">HQ</option>
                <option value="Agency">Agency</option>
                <option value="Bank">Bank</option>
              </select>
            </div>
            <div>
              <label style={{ color: 'black' }}>Organization Name*</label>
              <AutofillInput
                fieldName="orgName"
                placeholder="ECWA LC • Tudun Wada"
                value={formData.orgName}
                onChange={(value) => setFormData(prev => ({ ...prev, orgName: value }))}
                required
                style={{ background: 'white', color: 'black' }}
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label style={{ color: 'black' }}>Phone</label>
              <AutofillInput
                fieldName="phone"
                placeholder="+234 ..."
                value={formData.phone}
                onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                style={{ background: 'white', color: 'black' }}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>Address</label>
              <AutofillInput
                fieldName="address"
                placeholder="Address"
                value={formData.address}
                onChange={(value) => setFormData(prev => ({ ...prev, address: value }))}
                style={{ background: 'white', color: 'black' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <Link className="btn ghost" href="/">Cancel</Link>
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
          {error && (
            <div style={{ marginTop: '1rem', color: 'red', fontSize: '14px' }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
