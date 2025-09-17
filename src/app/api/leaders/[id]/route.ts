import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const leaderId = params.id

    const updatedLeader = await db.updateLeader(leaderId, {
      ...body,
      updatedAt: new Date().toISOString()
    })

    if (!updatedLeader) {
      return NextResponse.json({ error: "Leader not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      leader: updatedLeader,
      message: 'Leader updated successfully'
    })

  } catch (error) {
    console.error('Error updating leader:', error)
    return NextResponse.json(
      { error: "Failed to update leader" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const leaderId = params.id
    const success = await db.deleteLeader(leaderId)

    if (!success) {
      return NextResponse.json({ error: "Leader not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: 'Leader deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting leader:', error)
    return NextResponse.json(
      { error: "Failed to delete leader" },
      { status: 500 }
    )
  }
}