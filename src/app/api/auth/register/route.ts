import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"
import { signToken, hashPassword } from "@/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role = 'Member' } = await request.json()
    
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      )
    }

    // Create user
    const user = await db.createUser({
      email,
      name,
      role,
      permissions: getDefaultPermissions(role)
    })

    // Hash password and update user
    const passwordHash = hashPassword(password)
    await db.updateUser(user.id, { passwordHash })

    // Create session
    const sessionId = await db.createSession(user.id)

    // Create JWT token
    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      permissions: user.permissions
    })

    // Set cookie
    const cookieStore = cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        permissions: user.permissions
      }
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

function getDefaultPermissions(role: string): string[] {
  const rolePermissions: Record<string, string[]> = {
    'Admin': ['*'],
    'Treasurer': ['financials.read', 'financials.write', 'expenditures.read', 'expenditures.write'],
    'Secretary': ['members.read', 'members.write', 'expenditures.read'],
    'Accountant': ['financials.read', 'financials.write', 'expenditures.read', 'expenditures.write'],
    'Auditor': ['financials.read', 'expenditures.read', 'reports.read'],
    'Member': ['profile.read', 'profile.write']
  }
  
  return rolePermissions[role] || ['profile.read']
}