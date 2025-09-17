import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { selectedData, ecwaData } = body

    const importedData: {
      dccs: any[]
      lccs: any[]
      lcs: any[]
    } = {
      dccs: [],
      lccs: [],
      lcs: []
    }

    // Import selected DCCs
    for (const dccId of selectedData.dccs) {
      const dccData = ecwaData.dccs.find((dcc: any) => dcc.id === dccId)
      if (dccData) {
        // For single app, we'll just create a record in our database
        const importedDCC = {
          id: dccData.id,
          name: dccData.name,
          type: 'DCC',
          location: dccData.location,
          state: dccData.state,
          importedAt: new Date().toISOString()
        }
        importedData.dccs.push(importedDCC)
      }
    }

    // Import selected LCCs
    for (const lccId of selectedData.lccs) {
      const lccData = ecwaData.lccs.find((lcc: any) => lcc.id === lccId)
      if (lccData) {
        const importedLCC = {
          id: lccData.id,
          name: lccData.name,
          type: 'LCC',
          parentDcc: lccData.parentDcc,
          location: lccData.location,
          state: lccData.state,
          importedAt: new Date().toISOString()
        }
        importedData.lccs.push(importedLCC)
      }
    }

    // Import selected LCs
    for (const lcId of selectedData.lcs) {
      const lcData = ecwaData.lcs.find((lc: any) => lc.id === lcId)
      if (lcData) {
        const importedLC = {
          id: lcData.id,
          name: lcData.name,
          type: 'LC',
          parentLcc: lcData.parentLcc,
          location: lcData.location,
          state: lcData.state,
          importedAt: new Date().toISOString()
        }
        importedData.lcs.push(importedLC)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Data imported successfully',
      importedData
    })

  } catch (error) {
    console.error('Error importing data:', error)
    return NextResponse.json(
      { error: "Failed to import data" },
      { status: 500 }
    )
  }
}