import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const financials = await db.getFinancials()
    return NextResponse.json({ financials })

  } catch (error) {
    console.error('Error fetching financials:', error)
    return NextResponse.json(
      { error: "Failed to fetch financials" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, amount, description, category, date } = body

    const financial = await db.createFinancial({
      type,
      amount,
      description,
      category,
      date: date || new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      financial,
      message: 'Financial record created successfully'
    })

  } catch (error) {
    console.error('Error creating financial record:', error)
    return NextResponse.json(
      { error: "Failed to create financial record" },
      { status: 500 }
    )
  }
}