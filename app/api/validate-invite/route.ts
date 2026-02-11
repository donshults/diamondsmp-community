import { NextRequest, NextResponse } from 'next/server'
import { validateInviteCode } from '@/lib/data'

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()
    
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ valid: false, error: 'Invalid invite code format' })
    }
    
    const isValid = await validateInviteCode(code)
    
    return NextResponse.json({ valid: isValid })
  } catch (error) {
    console.error('Invite code validation API error:', error)
    return NextResponse.json({ valid: false, error: 'Server error' })
  }
}