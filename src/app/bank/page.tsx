"use client"

export default function BankPage() {
  return (
    <section id="bank" className="container">
      <div className="section-title">
        <h2>Bank Operator</h2>
      </div>
      <div className="grid cols-3">
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Inflows</small>
          <h3>₦9.4m</h3>
          <div className="muted">30 days</div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Outflows</small>
          <h3>₦6.8m</h3>
          <div className="muted">30 days</div>
        </div>
        <div className="card" style={{ padding: '1rem' }}>
          <small className="muted">Profitability</small>
          <h3>+₦1.1m</h3>
          <div className="muted">Net</div>
        </div>
      </div>
      <div className="card" style={{ padding: '1rem', marginTop: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>Reconciliation</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Bank Ref</th>
              <th>Entity</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>TRX-70331</td>
              <td>Income</td>
              <td>₦310,000</td>
              <td>No</td>
              <td>
                <button className="btn primary" onClick={() => alert('Reconciled')}>
                  Verify
                </button>
              </td>
            </tr>
            <tr>
              <td>TRX-71011</td>
              <td>Income</td>
              <td>₦1,240,000</td>
              <td>Yes</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
