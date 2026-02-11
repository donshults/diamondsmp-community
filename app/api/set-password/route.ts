import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    console.log('🔍 Setting password for:', email)
    
    // Find user
    const user = await db.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }
    
    console.log('✅ User found:', user.email, 'Current password exists:', !!user.password)
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12)
    
    // Update user password
    await db.user.update({
      where: { email },
      data: { password: hashedPassword }
    })
    
    console.log('✅ Password updated for:', email)
    
    return NextResponse.json({
      success: true,
      message: `Password set for ${email}`,
      user: {
        email: user.email,
        name: user.name,
        tier: user.tier,
      }
    })
    
  } catch (error) {
    console.error('❌ Set password error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}