"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
      <div className="auth card">
        <h2>Sign Up & Create Organization</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <label>Full name*</label>
              <input 
                placeholder="Your name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Email*</label>
              <input 
                type="email" 
                placeholder="you@church.org" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label>Password*</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Confirm password*</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label>Organization Type*</label>
              <select name="orgType" value={formData.orgType} onChange={handleChange}>
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
              <label>Organization Name*</label>
              <input 
                placeholder="ECWA LC • Tudun Wada" 
                name="orgName"
                value={formData.orgName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div>
              <label>Phone</label>
              <input 
                placeholder="+234 ..." 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Address</label>
              <input 
                placeholder="Address" 
                name="address"
                value={formData.address}
                onChange={handleChange}
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
            <div style={{ marginTop: '1rem', color: 'var(--danger)', fontSize: '14px' }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
