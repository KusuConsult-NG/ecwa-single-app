import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { verifyToken, hashPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()
    
    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      )
    }

    try {
      // Verify the reset token
      const payload = await verifyToken(token)
      
      if (payload.type !== 'password-reset') {
        return NextResponse.json(
          { error: "Invalid reset token" },
          { status: 400 }
        )
      }

      // Get user
      const user = await db.getUserById(payload.userId)
      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        )
      }

      // Update password
      const passwordHash = hashPassword(password)
      await db.updateUser(user.id, { passwordHash })

      return NextResponse.json({
        success: true,
        message: "Password reset successfully"
      })

    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}


