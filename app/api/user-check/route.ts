import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Check if any users exist
    const userCount = await db.user.count()
    
    // Get first few users (without passwords)
    const users = await db.user.findMany({
      take: 5,
      select: {
        id: true,
        email: true,
        name: true,
        tier: true,
        createdAt: true,
        inviteCodeUsed: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json({
      status: 'SUCCESS',
      userCount,
      users,
      message: userCount > 0 ? 'Users found in database' : 'No users in database - need to register first'
    })
    
  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 })
  }
}