import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { db } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: "No authentication token" },
        { status: 401 }
      )
    }

    try {
      const payload = await verifyToken(token)
      const user = await db.getUserById(payload.userId)

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        )
      }

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          permissions: user.permissions,
          orgId: user.orgId,
          orgName: user.orgName
        }
      })

    } catch (error) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Me API error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        { error: "No authentication token" },
        { status: 401 }
      )
    }

    try {
      const payload = await verifyToken(token)
      const { orgId, orgName, role } = await request.json()

      const user = await db.updateUser(payload.userId, {
        orgId,
        orgName,
        role
      })

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          permissions: user.permissions,
          orgId: user.orgId,
          orgName: user.orgName
        }
      })

    } catch (error) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Me API update error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
