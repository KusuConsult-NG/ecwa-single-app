"use client"

export default function ReportsPage() {
  return (
    <section id="reports" className="container">
      <div className="section-title">
        <h2>Reports</h2>
        <div>
          <button className="btn ghost" onClick={() => alert('Exporting PDF…')}>
            Export PDF
          </button>
        </div>
      </div>
      <div className="grid cols-2">
        <div className="card">
          <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <strong>Monthly Trend</strong>
            <select>
              <option>12 months</option>
              <option>YTD</option>
            </select>
          </div>
          <div className="chart">
            <div className="bar" style={{ height: '35%' }}></div>
            <div className="bar" style={{ height: '52%' }}></div>
            <div className="bar" style={{ height: '61%' }}></div>
            <div className="bar" style={{ height: '44%' }}></div>
            <div className="bar" style={{ height: '70%' }}></div>
            <div className="bar" style={{ height: '58%' }}></div>
          </div>
        </div>
        <div className="card">
          <div style={{ padding: '1rem' }}>
            <strong>Pending Aging</strong>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Bucket</th>
                <th>Count</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0-3 days</td>
                <td>5</td>
                <td>₦520,000</td>
              </tr>
              <tr>
                <td>4-7 days</td>
                <td>2</td>
                <td>₦140,000</td>
              </tr>
              <tr>
                <td>8+ days</td>
                <td>1</td>
                <td>₦250,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}