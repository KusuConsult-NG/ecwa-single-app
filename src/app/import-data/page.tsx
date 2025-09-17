"use client"

import { useState, useEffect } from 'react'


interface ECWAData {
  dccs: any[]
  lccs: any[]
  lcs: any[]
}

export default function ImportDataPage() {
  
  const [ecwaData, setEcwaData] = useState<ECWAData>({ dccs: [], lccs: [], lcs: [] })
  const [loading, setLoading] = useState(true)
  const [importing, setImporting] = useState(false)
  const [selectedData, setSelectedData] = useState<{
    dccs: string[]
    lccs: string[]
    lcs: string[]
  }>({ dccs: [], lccs: [], lcs: [] })

  useEffect(() => {
    loadECWAData()
  }, [])

  const loadECWAData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ecwa-data')
      const data = await response.json()
      setEcwaData(data.data)
    } catch (error) {
      console.error('Error loading ECWA data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectDCC = (dccId: string) => {
    setSelectedData(prev => ({
      ...prev,
      dccs: prev.dccs.includes(dccId) 
        ? prev.dccs.filter(id => id !== dccId)
        : [...prev.dccs, dccId]
    }))
  }

  const handleSelectLCC = (lccId: string) => {
    setSelectedData(prev => ({
      ...prev,
      lccs: prev.lccs.includes(lccId) 
        ? prev.lccs.filter(id => id !== lccId)
        : [...prev.lccs, lccId]
    }))
  }

  const handleSelectLC = (lcId: string) => {
    setSelectedData(prev => ({
      ...prev,
      lcs: prev.lcs.includes(lcId) 
        ? prev.lcs.filter(id => id !== lcId)
        : [...prev.lcs, lcId]
    }))
  }

  const handleImport = async () => {
    setImporting(true)
    try {
      const response = await fetch(`/api/import-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selectedData,
          ecwaData
        })
      })

      if (response.ok) {
        alert('Data imported successfully!')
        setSelectedData({ dccs: [], lccs: [], lcs: [] })
      }
    } catch (error) {
      console.error('Error importing data:', error)
      alert('Error importing data. Please try again.')
    } finally {
      setImporting(false)
    }
  }

  if (loading) {
    return (
      <div className="container">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading ECWA data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="section-title">
        <h2 className="text-2xl font-bold text-gray-900">Import ECWA Data </h2>
        <p className="text-gray-600">Import existing ECWA organizational data into your system</p>
      </div>

      {/* Import Summary */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">Import Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700">DCCs Selected</span>
              <span className="text-lg font-bold text-blue-900">{selectedData.dccs.length}</span>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-700">LCCs Selected</span>
              <span className="text-lg font-bold text-green-900">{selectedData.lccs.length}</span>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-700">LCs Selected</span>
              <span className="text-lg font-bold text-purple-900">{selectedData.lcs.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* DCCs */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">District Church Councils (DCCs)</h3>
        <div className="space-y-3">
          {ecwaData.dccs.map((dcc) => (
            <div key={dcc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedData.dccs.includes(dcc.id)}
                  onChange={() => handleSelectDCC(dcc.id)}
                  className="h-4 w-4 text-ecwa-600 focus:ring-ecwa-500 border-gray-300 rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{dcc.name}</h4>
                  <p className="text-sm text-gray-500">{dcc.location}</p>
                  <p className="text-xs text-gray-400">
                    Chairman: {dcc.chairman} | Secretary: {dcc.secretary}
                  </p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{dcc.totalLCCs} LCCs</p>
                <p>{dcc.totalLCs} LCs</p>
                <p>{dcc.totalMembers.toLocaleString()} Members</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LCCs */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">Local Church Councils (LCCs)</h3>
        <div className="space-y-3">
          {ecwaData.lccs.map((lcc) => (
            <div key={lcc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedData.lccs.includes(lcc.id)}
                  onChange={() => handleSelectLCC(lcc.id)}
                  className="h-4 w-4 text-ecwa-600 focus:ring-ecwa-500 border-gray-300 rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{lcc.name}</h4>
                  <p className="text-sm text-gray-500">{lcc.location}</p>
                  <p className="text-xs text-gray-400">
                    LO: {lcc.lo} | Secretary: {lcc.secretary}
                  </p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{lcc.totalLCs} LCs</p>
                <p>{lcc.totalMembers.toLocaleString()} Members</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LCs */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold mb-4">Local Churches (LCs)</h3>
        <div className="space-y-3">
          {ecwaData.lcs.map((lc) => (
            <div key={lc.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={selectedData.lcs.includes(lc.id)}
                  onChange={() => handleSelectLC(lc.id)}
                  className="h-4 w-4 text-ecwa-600 focus:ring-ecwa-500 border-gray-300 rounded"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{lc.name}</h4>
                  <p className="text-sm text-gray-500">{lc.location}</p>
                  <p className="text-xs text-gray-400">
                    Senior Minister: {lc.seniorMinister} | Secretary: {lc.secretary}
                  </p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{lc.totalMembers.toLocaleString()} Members</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Import Actions */}
      <div className="card">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Import Selected Data</h3>
            <p className="text-sm text-gray-500">
              This will import the selected organizations and their basic information
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setSelectedData({ dccs: [], lccs: [], lcs: [] })}
              className="btn-secondary"
            >
              Clear Selection
            </button>
            <button
              onClick={handleImport}
              disabled={importing || (selectedData.dccs.length === 0 && selectedData.lccs.length === 0 && selectedData.lcs.length === 0)}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {importing ? 'Importing...' : 'Import Selected Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
