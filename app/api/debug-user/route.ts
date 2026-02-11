import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true, // We need to see if password exists
        tier: true,
        createdAt: true,
      }
    })
    
    return NextResponse.json({
      status: 'SUCCESS',
      user: user ? {
        ...user,
        hasPassword: !!user.password,
        passwordLength: user.password ? user.password.length : 0,
        passwordStart: user.password ? user.password.substring(0, 10) + '...' : null,
      } : null,
      message: user ? 'User found' : 'User not found'
    })
    
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}