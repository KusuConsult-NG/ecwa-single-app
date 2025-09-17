"use client"

import Link from 'next/link'

export default function Topbar() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-ecwa-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ECWA Management System</h1>
              <p className="text-sm text-gray-500">Evangelical Church Winning All</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/financials" className="text-sm font-medium text-gray-700 hover:text-ecwa-600">
                Financials
              </Link>
              <Link href="/members" className="text-sm font-medium text-gray-700 hover:text-ecwa-600">
                Members
              </Link>
              <Link href="/reports" className="text-sm font-medium text-gray-700 hover:text-ecwa-600">
                Reports
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ecwa-100 text-ecwa-800">
                ECWA
              </span>
              <Link 
                href="/" 
                className="text-sm text-gray-600 hover:text-ecwa-600"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
