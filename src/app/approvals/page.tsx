"use client"

export default function ApprovalsPage() {
  return (
    <section id="approvals" className="container">
      <div className="section-title">
        <h2>My Approvals</h2>
      </div>
      <div className="card" style={{ padding: '1rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Ref</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Stage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EXP-0145</td>
              <td>Roof repair</td>
              <td>₦250,000</td>
              <td>Secretary Review</td>
              <td>
                <button className="btn primary" onClick={() => alert('Approved & forwarded')}>
                  Approve
                </button>
                <button className="btn ghost" onClick={() => alert('Changes requested')}>
                  Request changes
                </button>
                <button className="btn ghost" onClick={() => alert('Rejected')}>
                  Reject
                </button>
              </td>
            </tr>
            <tr>
              <td>EXP-0146</td>
              <td>Choir microphones</td>
              <td>₦410,000</td>
              <td>LO Approval</td>
              <td>
                <button className="btn primary" onClick={() => alert('Approved')}>
                  Approve
                </button>
                <button className="btn ghost" onClick={() => alert('Rejected')}>
                  Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}