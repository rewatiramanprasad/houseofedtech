'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'


async function DeleteAction(id: string) {
  await prisma.idea.delete({
    where: { id: id },
  })
     revalidatePath('/dashboard')
}

export default DeleteAction
