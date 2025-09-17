"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  role: string
  permissions: string[]
}

export default function Topbar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/me')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData.user)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="topbar">
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button id="menuBtn" className="btn ghost" aria-label="Toggle Menu">☰</button>
        <div className="badge">CHURCHFLOW <span style={{ opacity: 0.6 }}></span></div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {loading ? (
          <div className="btn ghost">Loading...</div>
        ) : user ? (
          <>
            <span className="btn ghost" style={{ cursor: 'default' }}>
              Welcome, {user.name}
            </span>
            <button className="btn primary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn secondary" href="/signup">Sign Up</Link>
            <Link className="btn primary" href="/login">Log In</Link>
          </>
        )}
      </div>
    </div>
  )
}