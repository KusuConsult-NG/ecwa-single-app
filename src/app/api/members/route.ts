import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const members = await db.getMembers()
    return NextResponse.json({ members })

  } catch (error) {
    console.error('Error fetching members:', error)
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, membershipDate, status } = body

    const member = await db.createMember({
      name,
      email,
      phone,
      address,
      membershipDate: membershipDate || new Date().toISOString(),
      status: status || 'active'
    })

    return NextResponse.json({
      success: true,
      member,
      message: 'Member created successfully'
    })

  } catch (error) {
    console.error('Error creating member:', error)
    return NextResponse.json(
      { error: "Failed to create member" },
      { status: 500 }
    )
  }
}