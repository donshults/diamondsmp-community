import { db } from './db'

export async function getUserByEmail(email: string) {
  try {
    return await db.user.findUnique({
      where: { email }
    })
  } catch {
    return null
  }
}

export async function getUserById(id: string) {
  try {
    return await db.user.findUnique({
      where: { id }
    })
  } catch {
    return null
  }
}

export async function validateInviteCode(code: string) {
  try {
    const inviteCode = await db.inviteCode.findUnique({
      where: { 
        code
      }
    })
    
    if (!inviteCode) return false
    
    // Check if active
    if (!inviteCode.isActive) {
      return false
    }
    
    // Check if expired
    if (inviteCode.expiresAt && inviteCode.expiresAt < new Date()) {
      return false
    }
    
    // Check if max uses reached
    if (inviteCode.useCount >= inviteCode.maxUses) {
      return false
    }
    
    return true
  } catch (error) {
    console.error('validateInviteCode error:', error)
    return false
  }
}

export async function useInviteCode(code: string) {
  try {
    return await db.inviteCode.update({
      where: { code },
      data: {
        useCount: {
          increment: 1
        }
      }
    })
  } catch {
    return null
  }
}