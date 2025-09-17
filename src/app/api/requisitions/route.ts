import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const requisitions = await db.getRequisitions()
    return NextResponse.json({ requisitions })

  } catch (error) {
    console.error('Error fetching requisitions:', error)
    return NextResponse.json(
      { error: "Failed to fetch requisitions" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, amount, category, priority, requestedBy } = body

    const requisition = await db.createRequisition({
      title,
      description,
      amount,
      category,
      priority: priority || 'medium',
      requestedBy,
      status: 'pending',
      approvalHistory: []
    })

    return NextResponse.json({
      success: true,
      requisition,
      message: 'Requisition created successfully'
    })

  } catch (error) {
    console.error('Error creating requisition:', error)
    return NextResponse.json(
      { error: "Failed to create requisition" },
      { status: 500 }
    )
  }
}