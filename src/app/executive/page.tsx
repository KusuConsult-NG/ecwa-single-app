"use client"

export default function ExecutivePage() {
  return (
    <section id="executive" className="container">
      <div className="section-title">
        <h2>Executive Dashboard (GCC/DCC/HQ)</h2>
      </div>
      <div className="grid cols-4">
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Org Units</small>
          <h3>64</h3>
          <div className="muted">Active</div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Total Income</small>
          <h3>₦142m</h3>
          <div className="muted">YTD</div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Total Expenditure</small>
          <h3>₦98m</h3>
          <div className="muted">YTD</div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Pending</small>
          <h3>37</h3>
          <div className="muted">Approvals</div>
        </div>
      </div>
    </section>
  )
}


