import Link from 'next/link'

export default function HomePage() {
  return (
    <section id="home" className="card hero">
      <div className="container">
        <h1 style={{ fontSize: '2.2rem', margin: '0.25rem 0' }}>
          A closed-loop financial management for ECWA
        </h1>
        <p className="muted">
          Remittances, payroll, expenditures, audit, and HR—integrated with Gowans MFB.
        </p>
        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <Link className="btn primary" href="/signup">Create Organization</Link>
          <Link className="btn secondary" href="/login">Log In</Link>
        </div>
        <div style={{ marginTop: '2rem' }} className="grid cols-3">
          <div className="card" style={{ padding: '1rem' }}>
            <small className="muted">Transparency</small>
            <h3>Audit Trails</h3>
            <div className="muted">Every action logged</div>
          </div>
          <div className="card" style={{ padding: '1rem' }}>
            <small className="muted">Efficiency</small>
            <h3>3-Step Approvals</h3>
            <div className="muted">Raise → Review → Approve</div>
          </div>
          <div className="card" style={{ padding: '1rem' }}>
            <small className="muted">People</small>
            <h3>HR & Payroll</h3>
            <div className="muted">Self-service portal</div>
          </div>
        </div>
      </div>
    </section>
  )
}