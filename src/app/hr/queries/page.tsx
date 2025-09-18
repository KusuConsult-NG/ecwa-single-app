"use client"

export default function HRQueriesPage() {
  return (
    <section id="hr-queries" className="container">
      <div className="section-title">
        <h2>Queries & Discipline</h2>
        <div>
          <button className="btn primary" onClick={() => alert('New query issued')}>
            Issue Query
          </button>
        </div>
      </div>
      <div className="card" style={{ padding: '1rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Staff</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Last Update</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Grace Ade</td>
              <td>Lateness</td>
              <td><span className="status pending">Open</span></td>
              <td>2025-09-06</td>
            </tr>
            <tr>
              <td>Mary J.</td>
              <td>Conduct</td>
              <td><span className="status approved">Resolved</span></td>
              <td>2025-08-28</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}


