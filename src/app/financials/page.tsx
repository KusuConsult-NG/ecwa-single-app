"use client"

import { useState, useEffect } from 'react'


interface FinancialData {
  id: string
  type: 'income' | 'expense'
  category: string
  amount: number
  description: string
  date: string
  createdAt: string
}

export default function FinancialsPage() {
  
  const [financials, setFinancials] = useState<FinancialData[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'income' as 'income' | 'expense',
    category: '',
    amount: '',
    description: ''
  })

  useEffect(() => {
    loadFinancials()
  }, [])

  const loadFinancials = async () => {
    try {
      const response = await fetch(`/api/financials`)
      const data = await response.json()
      setFinancials(data.financials || [])
    } catch (error) {
      console.error('Error loading financials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/financials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount),
          date: new Date().toISOString()
        })
      })

      if (response.ok) {
        setFormData({ type: 'income', category: '', amount: '', description: '' })
        setShowForm(false)
        loadFinancials()
      }
    } catch (error) {
      console.error('Error adding financial record:', error)
    }
  }

  const totalIncome = financials
    .filter(f => f.type === 'income')
    .reduce((sum, f) => sum + f.amount, 0)

  const totalExpenses = financials
    .filter(f => f.type === 'expense')
    .reduce((sum, f) => sum + f.amount, 0)

  const netIncome = totalIncome - totalExpenses

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <div className="container">
      <div className="section-title">
        <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          Add Transaction
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid cols-3 mb-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-green-600">Total Income</h3>
          <p className="text-3xl font-bold text-green-600">₦{totalIncome.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-red-600">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">₦{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold text-blue-600">Net Income</h3>
          <p className="text-3xl font-bold text-blue-600">₦{netIncome.toLocaleString()}</p>
        </div>
      </div>

      {/* Add Transaction Form */}
      {showForm && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Financial Transaction</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as 'income' | 'expense'})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Tithe, Offering, Maintenance"
                />
              </div>
            </div>
            <div className="row">
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (₦)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="0.00"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Transaction description"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">Add Transaction</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Transactions List */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financials.map((financial) => (
                <tr key={financial.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(financial.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      financial.type === 'income' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {financial.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {financial.category}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {financial.description}
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                    financial.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ₦{financial.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
