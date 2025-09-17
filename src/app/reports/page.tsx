"use client"

import { useState, useEffect } from 'react'


interface ReportData {
  financials: any[]
  members: any[]
  expenditures: any[]
}

export default function ReportsPage() {
  
  const [reportData, setReportData] = useState<ReportData>({ financials: [], members: [], expenditures: [] })
  const [loading, setLoading] = useState(true)
  const [selectedReport, setSelectedReport] = useState('financial')

  useEffect(() => {
    loadReportData()
  }, [])

  const loadReportData = async () => {
    try {
      const [financialsRes, membersRes, expendituresRes] = await Promise.all([
        fetch(`/api/financials`),
        fetch(`/api/members`),
        fetch(`/api/expenditures`)
      ])

      const [financials, members, expenditures] = await Promise.all([
        financialsRes.json(),
        membersRes.json(),
        expendituresRes.json()
      ])

      setReportData({
        financials: financials.financials || [],
        members: members.members || [],
        expenditures: expenditures.expenditures || []
      })
    } catch (error) {
      console.error('Error loading report data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateFinancialReport = () => {
    const income = reportData.financials.filter(f => f.type === 'income')
    const expenses = reportData.financials.filter(f => f.type === 'expense')
    
    const totalIncome = income.reduce((sum, f) => sum + f.amount, 0)
    const totalExpenses = expenses.reduce((sum, f) => sum + f.amount, 0)
    const netIncome = totalIncome - totalExpenses

    return {
      totalIncome,
      totalExpenses,
      netIncome,
      incomeCount: income.length,
      expenseCount: expenses.length
    }
  }

  const generateMemberReport = () => {
    const activeMembers = reportData.members.filter(m => m.status === 'active')
    const inactiveMembers = reportData.members.filter(m => m.status === 'inactive')
    
    const roleDistribution = reportData.members.reduce((acc, member) => {
      acc[member.role] = (acc[member.role] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      totalMembers: reportData.members.length,
      activeMembers: activeMembers.length,
      inactiveMembers: inactiveMembers.length,
      roleDistribution
    }
  }

  const generateExpenditureReport = () => {
    const pending = reportData.expenditures.filter(e => e.status === 'pending')
    const approved = reportData.expenditures.filter(e => e.status === 'approved')
    const rejected = reportData.expenditures.filter(e => e.status === 'rejected')
    
    const totalPendingAmount = pending.reduce((sum, e) => sum + e.amount, 0)
    const totalApprovedAmount = approved.reduce((sum, e) => sum + e.amount, 0)

    const categoryDistribution = reportData.expenditures.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      totalRequests: reportData.expenditures.length,
      pending: pending.length,
      approved: approved.length,
      rejected: rejected.length,
      totalPendingAmount,
      totalApprovedAmount,
      categoryDistribution
    }
  }

  if (loading) {
    return <div className="container">Loading...</div>
  }

  const financialReport = generateFinancialReport()
  const memberReport = generateMemberReport()
  const expenditureReport = generateExpenditureReport()

  return (
    <div className="container">
      <div className="section-title">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedReport('financial')}
            className={`btn ${selectedReport === 'financial' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Financial Report
          </button>
          <button
            onClick={() => setSelectedReport('members')}
            className={`btn ${selectedReport === 'members' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Member Report
          </button>
          <button
            onClick={() => setSelectedReport('expenditures')}
            className={`btn ${selectedReport === 'expenditures' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Expenditure Report
          </button>
        </div>
      </div>

      {/* Financial Report */}
      {selectedReport === 'financial' && (
        <div className="space-y-6">
          <div className="grid cols-3">
            <div className="card">
              <h3 className="text-lg font-semibold text-green-600">Total Income</h3>
              <p className="text-3xl font-bold text-green-600">₦{financialReport.totalIncome.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{financialReport.incomeCount} transactions</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-red-600">Total Expenses</h3>
              <p className="text-3xl font-bold text-red-600">₦{financialReport.totalExpenses.toLocaleString()}</p>
              <p className="text-sm text-gray-500">{financialReport.expenseCount} transactions</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-blue-600">Net Income</h3>
              <p className="text-3xl font-bold text-blue-600">₦{financialReport.netIncome.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Profit/Loss</p>
            </div>
          </div>
        </div>
      )}

      {/* Member Report */}
      {selectedReport === 'members' && (
        <div className="space-y-6">
          <div className="grid cols-3">
            <div className="card">
              <h3 className="text-lg font-semibold text-blue-600">Total Members</h3>
              <p className="text-3xl font-bold text-blue-600">{memberReport.totalMembers}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-green-600">Active Members</h3>
              <p className="text-3xl font-bold text-green-600">{memberReport.activeMembers}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-600">Inactive Members</h3>
              <p className="text-3xl font-bold text-gray-600">{memberReport.inactiveMembers}</p>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Role Distribution</h3>
            <div className="space-y-2">
              {Object.entries(memberReport.roleDistribution).map(([role, count]) => (
                <div key={role} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{role}</span>
                  <span className="text-sm text-gray-500">{count as number} members</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Expenditure Report */}
      {selectedReport === 'expenditures' && (
        <div className="space-y-6">
          <div className="grid cols-3">
            <div className="card">
              <h3 className="text-lg font-semibold text-blue-600">Total Requests</h3>
              <p className="text-3xl font-bold text-blue-600">{expenditureReport.totalRequests}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-yellow-600">Pending</h3>
              <p className="text-3xl font-bold text-yellow-600">{expenditureReport.pending}</p>
              <p className="text-sm text-gray-500">₦{expenditureReport.totalPendingAmount.toLocaleString()}</p>
            </div>
            <div className="card">
              <h3 className="text-lg font-semibold text-green-600">Approved</h3>
              <p className="text-3xl font-bold text-green-600">{expenditureReport.approved}</p>
              <p className="text-sm text-gray-500">₦{expenditureReport.totalApprovedAmount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
            <div className="space-y-2">
              {Object.entries(expenditureReport.categoryDistribution).map(([category, count]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{category}</span>
                  <span className="text-sm text-gray-500">{count as number} requests</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Export Report</h3>
        <div className="flex space-x-4">
          <button className="btn-secondary">Export as PDF</button>
          <button className="btn-secondary">Export as Excel</button>
          <button className="btn-secondary">Print Report</button>
        </div>
      </div>
    </div>
  )
}
