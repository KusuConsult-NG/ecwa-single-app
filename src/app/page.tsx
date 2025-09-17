export default function Dashboard() {
  return (
    <div className="container">
      <div className="section-title">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to ECWA Management System
        </h1>
        <p className="text-gray-600 mt-2">Comprehensive church management platform</p>
      </div>
      
      <div className="grid cols-3">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Financial Overview</h3>
          <p className="text-3xl font-bold text-ecwa-600">₦2.4M</p>
          <p className="text-gray-600">This Quarter</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Active Members</h3>
          <p className="text-3xl font-bold text-ecwa-600">1,247</p>
          <p className="text-gray-600">Total Members</p>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
          <p className="text-3xl font-bold text-ecwa-600">12</p>
          <p className="text-gray-600">Awaiting Review</p>
        </div>
      </div>
      
      <div className="mt-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span>New expenditure request submitted</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span>Monthly tithe report generated</span>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span>New member registration</span>
              <span className="text-sm text-gray-500">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}