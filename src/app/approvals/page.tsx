"use client"

import { useState, useEffect } from 'react'


interface Requisition {
  id: string
  title: string
  description: string
  amount: number
  category: string
  requester: string
  requesterEmail: string
  status: 'pending' | 'approved' | 'declined' | 'in_review'
  currentApprover: string
  approvalChain: string[]
  createdAt: string
  updatedAt: string
  attachments?: string[]
  approvalHistory?: Array<{
    approver: string
    action: 'approved' | 'declined' | 'pending'
    comment?: string
    date: string
  }>
}

export default function ApprovalsPage() {
  
  const [requisitions, setRequisitions] = useState<Requisition[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedReq, setSelectedReq] = useState<Requisition | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState<'approve' | 'decline'>('approve')
  const [comment, setComment] = useState('')

  useEffect(() => {
    loadPendingApprovals()
  }, [])

  const loadPendingApprovals = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/approvals`)
      const data = await response.json()
      setRequisitions(data.requisitions || [])
    } catch (error) {
      console.error('Error loading approvals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async (reqId: string, action: 'approve' | 'decline', comment: string) => {
    try {
      const response = await fetch(`/api/approvals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requisitionId: reqId,
          action,
          comment
        })
      })

      if (response.ok) {
        setShowModal(false)
        setSelectedReq(null)
        setComment('')
        loadPendingApprovals()
      }
    } catch (error) {
      console.error('Error processing approval:', error)
    }
  }

  const openModal = (req: Requisition, actionType: 'approve' | 'decline') => {
    setSelectedReq(req)
    setAction(actionType)
    setComment('')
    setShowModal(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'declined': return 'bg-red-100 text-red-800'
      case 'in_review': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getApprovalProgress = (req: Requisition) => {
    const totalSteps = req.approvalChain.length
    const completedSteps = req.approvalHistory?.filter(h => h.action === 'approved').length || 0
    return Math.round((completedSteps / totalSteps) * 100)
  }

  if (loading) {
    return (
      <div className="container">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading approvals...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="section-title">
        <h2 className="text-2xl font-bold text-gray-900">Approvals </h2>
        <div className="text-sm text-gray-600">
          Review and approve pending requisitions
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">Pending Your Approval</h3>
        {requisitions.filter(req => req.status === 'pending').length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No pending approvals at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requisitions.filter(req => req.status === 'pending').map((req) => (
              <div key={req.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-medium text-gray-900">{req.title}</h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                        {req.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">Amount:</span>
                        <span className="ml-2 text-sm text-gray-900">₦{req.amount.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Category:</span>
                        <span className="ml-2 text-sm text-gray-900">{req.category}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Requester:</span>
                        <span className="ml-2 text-sm text-gray-900">{req.requester}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{req.description}</p>
                    
                    {/* Approval Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Approval Progress</span>
                        <span>{getApprovalProgress(req)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-ecwa-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getApprovalProgress(req)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Approval Chain */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm font-medium text-gray-500">Approval Chain:</span>
                      <div className="flex items-center space-x-1">
                        {req.approvalChain.map((role, index) => (
                          <div key={role} className="flex items-center">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              index < (req.approvalHistory?.length || 0) ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {role}
                            </span>
                            {index < req.approvalChain.length - 1 && (
                              <span className="text-gray-400 mx-1">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => openModal(req, 'approve')}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => openModal(req, 'decline')}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Requisitions */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">All Requisitions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requisitions.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{req.title}</div>
                    <div className="text-sm text-gray-500">{req.requester}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₦{req.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                      {req.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-ecwa-600 h-2 rounded-full"
                          style={{ width: `${getApprovalProgress(req)}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{getApprovalProgress(req)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(req.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-ecwa-600 hover:text-ecwa-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval Modal */}
      {showModal && selectedReq && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {action === 'approve' ? 'Approve' : 'Decline'} Requisition
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Title:</strong> {selectedReq.title}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Amount:</strong> ₦{selectedReq.amount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Description:</strong> {selectedReq.description}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment (Optional)
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ecwa-500"
                  placeholder="Add a comment about your decision..."
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleApproval(selectedReq.id, action, comment)}
                  className={`px-4 py-2 rounded-md text-white ${
                    action === 'approve' 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {action === 'approve' ? 'Approve' : 'Decline'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
