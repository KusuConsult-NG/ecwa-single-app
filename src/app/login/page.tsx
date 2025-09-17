"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/dashboard')
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="login" className="container">
      <div className="auth card">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <label>Email*</label>
              <input 
                type="email" 
                placeholder="you@church.org" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password*</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="#/reset" className="muted">Forgot password?</a>
            <button type="submit" className="btn primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
          {error && (
            <div style={{ marginTop: '1rem', color: 'var(--danger)', fontSize: '14px' }}>
              {error}
            </div>
          )}
        </form>
        <div style={{ marginTop: '1rem' }} className="muted">
          No account? <Link href="/signup">Sign up</Link>
        </div>
      </div>
    </section>
  )
}