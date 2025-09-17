"use client"

import Link from 'next/link'

export default function Topbar() {
  return (
    <div className="topbar">
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button id="menuBtn" className="btn ghost" aria-label="Toggle Menu">☰</button>
        <div className="badge">CHURCHFLOW <span style={{ opacity: 0.6 }}></span></div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <Link className="btn secondary" href="/signup">Sign Up</Link>
        <Link className="btn primary" href="/login">Log In</Link>
      </div>
    </div>
  )
}