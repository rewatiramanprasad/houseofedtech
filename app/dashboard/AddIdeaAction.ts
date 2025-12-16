'use server'

import prisma from '@/lib/prisma'
import { IdeaFormSchemaType } from '@/components/ideaForm'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { revalidatePath } from 'next/cache'

export type ActionResponse =
  | { success: true }
  | { success: false; message: string }

export default async function addIdeaAction(
  input: IdeaFormSchemaType
): Promise<ActionResponse> {
  try {
    const { title, description, aiSuggestion } = input

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return { success: false, message: 'Unauthorized' }
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string
    }

    await prisma.idea.create({
      data: {
        title,
        originalText: description,
        enhancedText: aiSuggestion ?? '',
        userId: payload.userId,
      },
    })

    revalidatePath('/dashboard')

    return { success: true }
  } catch (error) {
    console.error('Add idea error:', error)
    return {
      success: false,
      message: 'Failed to create idea',
    }
  }
}
