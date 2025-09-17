import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const staff = await db.getStaff()
    return NextResponse.json({ staff })

  } catch (error) {
    console.error('Error fetching staff:', error)
    return NextResponse.json(
      { error: "Failed to fetch staff" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, position, department, salary, startDate } = body

    const staff = await db.createStaff({
      name,
      email,
      phone,
      position,
      department,
      salary,
      startDate: startDate || new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      staff,
      message: 'Staff member created successfully'
    })

  } catch (error) {
    console.error('Error creating staff member:', error)
    return NextResponse.json(
      { error: "Failed to create staff member" },
      { status: 500 }
    )
  }
}