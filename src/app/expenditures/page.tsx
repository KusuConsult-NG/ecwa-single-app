"use client"

import Link from 'next/link'

export default function ExpendituresPage() {
  return (
    <section id="expenditures" className="container">
      <div className="section-title">
        <h2>Expenditures</h2>
        <div>
          <button className="btn ghost" onClick={() => alert('Exporting CSV…')}>
            Export CSV
          </button>
          <Link href="/expenditures/new" className="btn primary">New</Link>
        </div>
      </div>
      <div className="card" style={{ padding: '1rem' }}>
        <div className="row">
          <input placeholder="Search by purpose or ref…" />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <select>
              <option>Status (all)</option>
              <option>Pending</option>
              <option>Under Review</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
            <select>
              <option>Last 30 days</option>
              <option>Quarter</option>
              <option>YTD</option>
            </select>
          </div>
        </div>
        <table className="table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Ref</th>
              <th>Purpose</th>
              <th>Amount</th>
              <th>Raised By</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>EXP-0145</td>
              <td>Roof repair</td>
              <td>₦250,000</td>
              <td>Grace</td>
              <td><span className="status pending">Pending</span></td>
              <td><a href="/expenditures/0145">Open</a></td>
            </tr>
            <tr>
              <td>EXP-0144</td>
              <td>Youth retreat logistics</td>
              <td>₦740,000</td>
              <td>Kunle</td>
              <td><span className="status approved">Approved</span></td>
              <td><a href="/expenditures/0144">Open</a></td>
            </tr>
            <tr>
              <td>EXP-0143</td>
              <td>Generator maintenance</td>
              <td>₦180,000</td>
              <td>Mary</td>
              <td><span className="status rejected">Rejected</span></td>
              <td><a href="/expenditures/0143">Open</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}