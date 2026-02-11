import { NextRequest, NextResponse } from 'next/server'
import { authDb } from '@/lib/auth-db'
import { getUserByEmail } from '@/lib/data'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    console.log('🔍 Auth debug - Email:', email)
    
    // Test database connection
    const dbTest = await authDb.$queryRaw`SELECT 1 as test`
    console.log('✅ Database connection test:', dbTest)
    
    // Test user lookup
    const user = await getUserByEmail(email)
    console.log('🔍 User lookup result:', user ? { id: user.id, email: user.email, hasPassword: !!user.password } : 'No user found')
    
    if (!user || !user.password) {
      return NextResponse.json({
        status: 'NO_USER',
        message: 'User not found or no password set'
      })
    }
    
    // Test password comparison
    const passwordsMatch = await bcrypt.compare(password, user.password)
    console.log('🔍 Password match:', passwordsMatch)
    
    return NextResponse.json({
      status: 'SUCCESS',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        tier: user.tier,
      },
      passwordMatch: passwordsMatch,
      dbConnection: 'OK'
    })
    
  } catch (error) {
    console.error('❌ Auth debug error:', error)
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 })
  }
}