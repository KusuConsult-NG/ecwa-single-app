import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { signToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await db.getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: "No account found with this email address" },
        { status: 404 }
      )
    }

    // Create reset token (expires in 1 hour)
    const resetToken = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions,
      type: 'password-reset'
    })

    // In a real application, you would send an email here
    // For demo purposes, we'll just return the reset link
    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`

    console.log(`Password reset link for ${email}: ${resetUrl}`)

    return NextResponse.json({
      success: true,
      message: "Password reset instructions have been sent to your email.",
      // In development, include the reset link for testing
      resetUrl: process.env.NODE_ENV === 'development' ? resetUrl : undefined
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
