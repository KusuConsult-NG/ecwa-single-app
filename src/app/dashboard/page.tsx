"use client"

import Link from 'next/link'

export default function DashboardPage() {
  return (
    <section id="dashboard" className="container">
      <div className="section-title">
        <h2>Dashboard</h2>
        <div>
          <Link className="btn primary" href="/expenditures/new">
            Raise Expenditure
          </Link>
        </div>
      </div>
      <div className="grid cols-3">
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Income</small>
          <h3>₦12.4m</h3>
          <div className="muted">This Quarter</div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Expenditure</small>
          <h3>₦7.9m</h3>
          <div className="muted">This Quarter</div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Pending Approvals</small>
          <h3>8</h3>
          <div className="muted">Avg 1.2 days</div>
        </div>
      </div>
      <div className="card" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
          <strong>Income vs Expenditure</strong>
          <select>
            <option>Last 12 months</option>
            <option>YTD</option>
          </select>
        </div>
        <div className="chart">
          <div className="bar" style={{ height: '40%' }}></div>
          <div className="bar" style={{ height: '65%' }}></div>
          <div className="bar" style={{ height: '58%' }}></div>
          <div className="bar" style={{ height: '70%' }}></div>
          <div className="bar" style={{ height: '52%' }}></div>
          <div className="bar" style={{ height: '75%' }}></div>
          <div className="bar" style={{ height: '60%' }}></div>
          <div className="bar" style={{ height: '68%' }}></div>
          <div className="bar" style={{ height: '55%' }}></div>
          <div className="bar" style={{ height: '72%' }}></div>
          <div className="bar" style={{ height: '59%' }}></div>
          <div className="bar" style={{ height: '77%' }}></div>
        </div>
      </div>
    </section>
  )
}
