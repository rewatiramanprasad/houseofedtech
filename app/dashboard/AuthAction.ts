import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'

type JwtPayload = {
  userId: string
}

export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { email: true },
    })

    return user
  } catch {
    return null
  }
}
