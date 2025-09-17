import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const agencies = await db.getAgencies()
    return NextResponse.json({ agencies })

  } catch (error) {
    console.error('Error fetching agencies:', error)
    return NextResponse.json(
      { error: "Failed to fetch agencies" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, description, leader, members } = body

    const agency = await db.createAgency({
      name,
      type,
      description,
      leader,
      members: members || []
    })

    return NextResponse.json({
      success: true,
      agency,
      message: 'Agency created successfully'
    })

  } catch (error) {
    console.error('Error creating agency:', error)
    return NextResponse.json(
      { error: "Failed to create agency" },
      { status: 500 }
    )
  }
}