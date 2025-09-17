"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar" id="sidebar">
      <div className="badge" style={{ background: '#0b3f86', color: '#fff', borderColor: 'rgba(255,255,255,.2)' }}>
        ✚ CHURCHFLOW
      </div>
      <nav className="nav" id="nav">
        <Link href="/" data-route className={pathname === '/' ? 'active' : ''}>🏠 Home</Link>
        <Link href="/dashboard" data-route className={pathname === '/dashboard' ? 'active' : ''}>📊 Dashboard</Link>
        <Link href="/expenditures" data-route className={pathname === '/expenditures' ? 'active' : ''}>🧾 Expenditures</Link>
        <Link href="/expenditures/new" data-route className={pathname === '/expenditures/new' ? 'active' : ''}>➕ Raise Expenditure</Link>
        <Link href="/approvals" data-route className={pathname === '/approvals' ? 'active' : ''}>✅ Approvals</Link>
        <Link href="/income" data-route className={pathname === '/income' ? 'active' : ''}>💰 Income</Link>
        <Link href="/reports" data-route className={pathname === '/reports' ? 'active' : ''}>📈 Reports</Link>
        <Link href="/audit" data-route className={pathname === '/audit' ? 'active' : ''}>🔍 Audit Logs</Link>
        <Link href="/hr" data-route className={pathname === '/hr' ? 'active' : ''}>🧑‍💼 HR Dashboard</Link>
        <Link href="/hr/staff" data-route className={pathname === '/hr/staff' ? 'active' : ''}>👥 Staff</Link>
        <Link href="/hr/payroll" data-route className={pathname === '/hr/payroll' ? 'active' : ''}>🧾 Payroll</Link>
        <Link href="/hr/leave" data-route className={pathname === '/hr/leave' ? 'active' : ''}>🏖️ Leave</Link>
        <Link href="/hr/queries" data-route className={pathname === '/hr/queries' ? 'active' : ''}>📨 Queries</Link>
        <Link href="/bank" data-route className={pathname === '/bank' ? 'active' : ''}>🏦 Bank</Link>
        <Link href="/executive" data-route className={pathname === '/executive' ? 'active' : ''}>⭐ Executive</Link>
        <Link href="/settings" data-route className={pathname === '/settings' ? 'active' : ''}>⚙️ Settings</Link>
        <Link href="/login" data-route className={pathname === '/login' ? 'active' : ''}>🔐 Login</Link>
        <Link href="/signup" data-route className={pathname === '/signup' ? 'active' : ''}>📝 Sign Up</Link>
      </nav>
    </aside>
  )
}