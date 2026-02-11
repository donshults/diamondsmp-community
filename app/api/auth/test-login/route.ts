import { NextRequest, NextResponse } from 'next/server'
import { signIn } from '@/auth'

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Test login route called')
    
    const { email, password } = await request.json()
    console.log('🔍 Login attempt for:', email)
    
    // Try the signIn function directly
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    
    console.log('✅ SignIn result:', result)
    
    return NextResponse.json({
      status: 'SUCCESS',
      message: 'Login test completed',
      result: result
    })
    
  } catch (error) {
    console.error('❌ Test login error:', error)
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 })
  }
}