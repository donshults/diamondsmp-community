import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test database connection
    const inviteCodes = await db.inviteCode.findMany({
      select: {
        code: true,
        isActive: true,
        expiresAt: true,
        useCount: true,
        maxUses: true,
      }
    })

    return NextResponse.json({
      database: 'connected',
      environment: {
        DATABASE_URL: process.env.DATABASE_URL ? 'set' : 'missing',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'set' : 'missing',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'missing',
      },
      inviteCodes,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json({
      database: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        DATABASE_URL: process.env.DATABASE_URL ? 'set' : 'missing',
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'set' : 'missing',
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'missing',
      },
    }, { status: 500 })
  }
}