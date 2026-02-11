import { NextRequest, NextResponse } from 'next/server'
import { validateInviteCode } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Test registration request:', body)
    
    const { inviteCode } = body
    
    if (!inviteCode) {
      return NextResponse.json({ error: 'No invite code provided' }, { status: 400 })
    }
    
    console.log('Testing invite code:', inviteCode)
    const isValid = await validateInviteCode(inviteCode)
    console.log('Validation result:', isValid)
    
    return NextResponse.json({
      inviteCode,
      isValid,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Test registration error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}