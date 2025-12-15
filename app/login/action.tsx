'use server'
import React from 'react'
import { LoginFormSchemaType } from './page'
import prisma from '@/lib/prisma'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

type LoginResponse = { success: true } | { success: false; message: string }
export default async function loginAction(
  input: LoginFormSchemaType
): Promise<LoginResponse> {
  try {
    const { email, password } = input
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return { success: false, message: 'Invalid email or password' }
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return { success: false, message: 'Invalid email or password' }
    }
    const token: string = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    )

    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return { success: true }
  } catch (error) {
    console.error('Login error:', error)

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    }
  }
}
