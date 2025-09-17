import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CHURCHFLOW – Full Clickable (All Screens + Auth)",
  description: "A closed-loop financial management for ECWA",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="topbar">
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button id="menuBtn" className="btn ghost" aria-label="Toggle Menu">☰</button>
            <div className="badge">CHURCHFLOW <span style={{ opacity: 0.6 }}></span></div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <a className="btn secondary" href="/signup">Sign Up</a>
            <a className="btn primary" href="/login">Log In</a>
          </div>
        </div>

        <div className="layout">
          <aside className="sidebar" id="sidebar">
            <div className="badge" style={{ background: '#0b3f86', color: '#fff', borderColor: 'rgba(255,255,255,.2)' }}>
              ✚ CHURCHFLOW
            </div>
            <nav className="nav" id="nav">
              <a href="/" data-route>🏠 Home</a>
              <a href="/dashboard" data-route>📊 Dashboard</a>
              <a href="/expenditures" data-route>🧾 Expenditures</a>
              <a href="/expenditures/new" data-route>➕ Raise Expenditure</a>
              <a href="/approvals" data-route>✅ Approvals</a>
              <a href="/income" data-route>💰 Income</a>
              <a href="/reports" data-route>📈 Reports</a>
              <a href="/audit" data-route>🔍 Audit Logs</a>
              <a href="/hr" data-route>🧑‍💼 HR Dashboard</a>
              <a href="/hr/staff" data-route>👥 Staff</a>
              <a href="/hr/payroll" data-route>🧾 Payroll</a>
              <a href="/hr/leave" data-route>🏖️ Leave</a>
              <a href="/hr/queries" data-route>📨 Queries</a>
              <a href="/bank" data-route>🏦 Bank</a>
              <a href="/executive" data-route>⭐ Executive</a>
              <a href="/settings" data-route>⚙️ Settings</a>
              <a href="/login" data-route>🔐 Login</a>
              <a href="/signup" data-route>📝 Sign Up</a>
            </nav>
          </aside>

          <main className="content">
            {children}
          </main>
        </div>

        <nav className="bottomnav" id="bottomnav">
          <a href="/dashboard" data-route>Home</a>
          <a href="/expenditures/new" data-route>Action</a>
          <a href="/approvals" data-route>Approvals</a>
          <a href="/hr" data-route>HR</a>
          <a href="/login" data-route>Login</a>
        </nav>

        {/* Toast */}
        <div id="toast" className="toast" role="status" aria-live="polite">Action completed</div>
      </body>
    </html>
  )
}