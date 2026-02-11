import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    // Test basic database connection
    const result = await db.$queryRaw`SELECT 1 as test`
    
    // Test invite codes table
    const inviteCodeCount = await db.inviteCode.count()
    
    return NextResponse.json({
      status: 'SUCCESS',
      timestamp: new Date().toISOString(),
      connection: 'OK',
      rawQuery: result,
      inviteCodeCount,
      message: 'Database connection working properly'
    })
  } catch (error) {
    return NextResponse.json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 })
  }
}