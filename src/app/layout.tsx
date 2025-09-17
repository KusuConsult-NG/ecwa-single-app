import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Topbar from "@/components/Topbar"
import Sidebar from "@/components/Sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ECWA Management System",
  description: "Evangelical Church Winning All - Digital Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Top Navigation */}
          <Topbar />
          
          <div className="flex">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Main Content */}
            <div className="flex-1">
              <main className="p-6">
                {children}
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}