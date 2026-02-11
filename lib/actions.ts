import { signIn } from '@/auth'
import { db } from './db'
import { validateInviteCode, useInviteCode } from './data'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { redirect } from 'next/navigation'

const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  inviteCode: z.string().min(1, 'Invite code is required'),
})

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export async function register(formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
    inviteCode: formData.get('inviteCode'),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password, name, inviteCode } = validatedFields.data

  // Validate invite code
  const isValidCode = await validateInviteCode(inviteCode)
  if (!isValidCode) {
    return {
      error: 'Invalid or expired invite code',
    }
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      error: 'User with this email already exists',
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    // Create user
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        inviteCodeUsed: inviteCode,
        tier: 'FREE',
      },
    })

    // Use invite code
    await useInviteCode(inviteCode)

    // Sign in the user
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    })
  } catch (error) {
    return {
      error: 'Failed to create account',
    }
  }
}

export async function login(formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    })
  } catch (error) {
    return {
      error: 'Invalid email or password',
    }
  }
}