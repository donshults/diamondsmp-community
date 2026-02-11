import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail } from '@/lib/data'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { SignJWT } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret')

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    console.log('🔍 Simple auth login for:', email)
    
    // Get user from database
    const user = await getUserByEmail(email)
    if (!user || !user.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      )
    }
    
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' }, 
        { status: 401 }
      )
    }
    
    // Create JWT token
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      name: user.name,
      tier: user.tier,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .setIssuedAt()
      .sign(JWT_SECRET)
    
    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })
    
    console.log('✅ Simple auth login successful for:', email)
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tier: user.tier,
      }
    })
    
  } catch (error) {
    console.error('❌ Simple auth error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}