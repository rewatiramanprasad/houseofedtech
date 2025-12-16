import React from 'react'
import  prisma  from '@/lib/prisma'
import Dashboard from './dasboard'

export interface Ideas {
  id: string
  userId: string
  originalText: string
  enhancedText: string
  title: string
  createdAt: Date
  updatedAt: Date
  user:{email:string}
}

async function page() {
    const ideas: Ideas[] = await prisma.idea.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            email:true
          }
        }
      }
    })
    
  return (
    <Dashboard ideas={ideas} />
  )
}

export default page
