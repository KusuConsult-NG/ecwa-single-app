import { SignJWT, jwtVerify } from "jose"

const SECRET = process.env.AUTH_SECRET || "ecwa-multitenant-secret-key"
const KEY = new TextEncoder().encode(SECRET)

export interface AuthToken {
  userId: string
  email: string
  name: string
  tenantId?: string
  role: string
  permissions: string[]
  iat: number
  exp: number
}

export async function signToken(payload: Omit<AuthToken, 'iat' | 'exp'>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(KEY)
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, KEY)
  return payload as unknown as AuthToken
}

export function hashPassword(password: string): string {
  // In production, use bcrypt or similar
  return Buffer.from(password + 'ecwa-salt').toString('base64')
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}
