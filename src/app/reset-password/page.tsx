"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      setMessage('Invalid or missing reset token')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Password reset successfully! You can now log in with your new password.')
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setMessage(data.error || 'Failed to reset password')
      }
    } catch (err) {
      console.error('Reset password error:', err)
      setMessage('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="reset-password" className="container">
      <div className="auth card" style={{ background: 'white', color: 'black' }}>
        <h2 style={{ color: 'black' }}>Reset Password</h2>
        <p style={{ color: 'black', marginBottom: '1rem' }}>
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div>
              <label style={{ color: 'black' }}>New Password*</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ background: 'white', color: 'black' }}
              />
            </div>
            <div>
              <label style={{ color: 'black' }}>Confirm Password*</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ background: 'white', color: 'black' }}
              />
            </div>
          </div>
          {message && (
            <div style={{ 
              marginTop: '1rem', 
              color: message.includes('successfully') ? 'green' : 'red', 
              fontSize: '14px' 
            }}>
              {message}
            </div>
          )}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/login" className="muted">Back to Login</Link>
            <button type="submit" className="btn primary" disabled={loading || !token}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
