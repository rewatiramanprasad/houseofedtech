import React from 'react'
import { Button } from './ui/button'
import { Lightbulb } from 'lucide-react'
import Link from 'next/link'

function Navigation() {
  return (
    <nav className="p-6  w-full flex flex-row items-baseline justify-between">
      <div className="flex flex-row gap-2 justify-center">
        <Lightbulb className="text-primary" />
        <h1 className="tracking-wider text-2xl">IdeaFlow</h1>
      </div>
      <div className=" flex  gap-4">
        <Link href="/login">
          <Button variant={'outline'}>Login</Button>
        </Link>
        <Link href="/signup">
          <Button variant={'default'}>Signup</Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navigation
