"use client"

export default function HRPayrollPage() {
  return (
    <section id="hr-payroll" className="container">
      <div className="section-title">
        <h2>Payroll</h2>
        <div>
          <button className="btn primary" onClick={() => alert('Payroll run started')}>
            Run Payroll
          </button>
        </div>
      </div>
      <div className="card" style={{ padding: '1rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Total Staff</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-09</td>
              <td>128</td>
              <td>₦8,200,000</td>
              <td><span className="status pending">Pending</span></td>
              <td><a href="#">Open</a></td>
            </tr>
            <tr>
              <td>2025-08</td>
              <td>127</td>
              <td>₦8,050,000</td>
              <td><span className="status approved">Completed</span></td>
              <td><a href="#">Open</a></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
