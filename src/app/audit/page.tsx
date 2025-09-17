"use client"

export default function AuditPage() {
  return (
    <section id="audit" className="container">
      <div className="section-title">
        <h2>Audit Logs</h2>
        <div>
          <button className="btn ghost" onClick={() => alert('Downloading CSV…')}>
            Export
          </button>
        </div>
      </div>
      <div className="card" style={{ padding: '1rem' }}>
        <div className="row">
          <select>
            <option>Role (all)</option>
            <option>Fin. Secretary</option>
            <option>Secretary</option>
            <option>LO</option>
            <option>Accountant</option>
            <option>Auditor</option>
          </select>
          <input type="date" />
        </div>
        <table className="table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Action</th>
              <th>Actor</th>
              <th>Entity</th>
              <th>Ref</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>raised</td>
              <td>Grace</td>
              <td>expenditure</td>
              <td>EXP-0145</td>
              <td>2025-09-08 10:12</td>
              <td>pending</td>
            </tr>
            <tr>
              <td>reviewed</td>
              <td>Mary</td>
              <td>expenditure</td>
              <td>EXP-0144</td>
              <td>2025-09-08 09:02</td>
              <td>approved</td>
            </tr>
            <tr>
              <td>approved</td>
              <td>Rev. John</td>
              <td>expenditure</td>
              <td>EXP-0144</td>
              <td>2025-09-08 09:15</td>
              <td>posted</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
