"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Password reset instructions have been sent to your email.')
      } else {
        setMessage(data.error || 'Failed to send reset instructions')
      }
    } catch (err) {
      console.error('Forgot password error:', err)
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="forgot-password" className="container">
      <div className="auth card" style={{ background: 'white', color: 'black' }}>
        <h2 style={{ color: 'black' }}>Forgot Password</h2>
        <p style={{ color: 'black', marginBottom: '1rem' }}>
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <label style={{ color: 'black' }}>Email*</label>
              <input
                type="email"
                placeholder="you@church.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ background: 'white', color: 'black' }}
              />
            </div>
          </div>
          {message && (
            <div style={{ 
              marginTop: '1rem', 
              color: message.includes('sent') ? 'green' : 'red', 
              fontSize: '14px' 
            }}>
              {message}
            </div>
          )}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/login" className="muted">Back to Login</Link>
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
