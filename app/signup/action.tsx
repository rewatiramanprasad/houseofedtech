'use server'
import { SingUpFormSchemaType } from './page'
import  prisma  from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export type ActionResponse =
  | { success: true }
  | { success: false; message: string }

export default async function AddUser(
  input: SingUpFormSchemaType
): Promise<ActionResponse> {
  try {
    const { email, password } = input

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return {
        success: false,
        message: 'Email already registered',
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
     await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })
    return { success: true }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          message: 'Email already exists',
        }
      }
    }
    console.error('Signup error:', error)

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    }
  }
}
