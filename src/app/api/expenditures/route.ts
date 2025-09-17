import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const expenditures = await db.getExpenditures()
    return NextResponse.json({ expenditures })

  } catch (error) {
    console.error('Error fetching expenditures:', error)
    return NextResponse.json(
      { error: "Failed to fetch expenditures" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, description, category, date, status } = body

    const expenditure = await db.createExpenditure({
      amount,
      description,
      category,
      date: date || new Date().toISOString(),
      status: status || 'pending'
    })

    return NextResponse.json({
      success: true,
      expenditure,
      message: 'Expenditure created successfully'
    })

  } catch (error) {
    console.error('Error creating expenditure:', error)
    return NextResponse.json(
      { error: "Failed to create expenditure" },
      { status: 500 }
    )
  }
}