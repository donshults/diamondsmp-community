import { PrismaClient } from '@prisma/client'

// Separate Prisma client specifically for auth
// This allows us to handle auth-specific database issues separately
const globalForAuthPrisma = globalThis as unknown as {
  authPrisma: PrismaClient | undefined
}

export const authDb = globalForAuthPrisma.authPrisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasourceUrl: process.env.DATABASE_URL,
})

if (process.env.NODE_ENV !== 'production') {
  globalForAuthPrisma.authPrisma = authDb
}

// Test connection on initialization
export async function testAuthDbConnection() {
  try {
    await authDb.$connect()
    console.log('✅ Auth database connection established')
    return true
  } catch (error) {
    console.error('❌ Auth database connection failed:', error)
    return false
  }
}