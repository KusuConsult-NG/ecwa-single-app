"use client"

import { useState, useEffect } from 'react'

export default function SettingsPage() {
  const [theme, setTheme] = useState('auto')
  const [formData, setFormData] = useState({
    organization: 'ECWA • LC – Tudun Wada',
    role: 'Financial Secretary'
  })

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('cf_theme') || 'auto'
    setTheme(savedTheme)
  }, [])

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value
    setTheme(newTheme)
    localStorage.setItem('cf_theme', newTheme)
    
    // Apply theme
    const html = document.documentElement
    html.classList.remove('theme-light', 'theme-dark')
    if (newTheme === 'light') {
      html.classList.add('theme-light')
    } else if (newTheme === 'dark') {
      html.classList.add('theme-dark')
    }
    
    // Show toast
    const toast = document.getElementById('toast')
    if (toast) {
      toast.textContent = 'Theme updated'
      toast.classList.add('show')
      setTimeout(() => toast.classList.remove('show'), 1200)
    }
  }

  const handleSave = () => {
    alert('Saved')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="settings" className="container">
      <div className="section-title">
        <h2>Settings</h2>
      </div>
      <div className="card" style={{ padding: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>Organization & Roles</h3>
        <div className="row">
          <div>
            <label>Organization</label>
            <input 
              value={formData.organization}
              name="organization"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="Financial Secretary">Financial Secretary</option>
              <option value="Secretary">Secretary</option>
              <option value="LO">LO</option>
              <option value="Accountant">Accountant</option>
              <option value="Auditor">Auditor</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button className="btn primary" onClick={handleSave}>Save</button>
        </div>
      </div>

      <div className="card" style={{ padding: '1rem', marginTop: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>Appearance</h3>
        <div className="row">
          <div>
            <label htmlFor="theme-select"><strong>Theme</strong></label>
            <select id="theme-select" value={theme} onChange={handleThemeChange}>
              <option value="auto">Auto (System)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
            <div className="muted" style={{ marginTop: '0.25rem' }}>
              Choose Light/Dark, or follow your device setting (Auto).
            </div>
          </div>
        </div>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button className="btn primary" onClick={() => handleThemeChange({ target: { value: theme } } as any)}>
            Save Theme
          </button>
        </div>
      </div>
    </section>
  )
}


