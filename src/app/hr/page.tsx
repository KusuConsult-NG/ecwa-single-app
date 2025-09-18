"use client"

export default function HRPage() {
  return (
    <section id="hr" className="container">
      <div className="section-title">
        <h2>HR Dashboard</h2>
      </div>
      <div className="grid cols-4">
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Staff</small>
          <h3>128</h3>
          <div className="muted">Active</div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Monthly Salary</small>
          <h3>₦8.2m</h3>
          <div className="muted">Obligation</div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Open Queries</small>
          <h3>4</h3>
          <div className="muted">HR attention</div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">On Leave</small>
          <h3>9</h3>
          <div className="muted">Today</div>
        </div>
      </div>
    </section>
  )
}


