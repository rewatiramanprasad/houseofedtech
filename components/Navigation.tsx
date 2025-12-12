import React from 'react'
import { Button } from './ui/button'
import { Lightbulb } from 'lucide-react'

function Navigation() {
  return (
    <nav className="p-6  w-full flex flex-row items-baseline justify-between">
      <div className='flex flex-row gap-2 justify-center'>
        <Lightbulb className='text-primary' />
        <h1 className="tracking-wider text-2xl">IdeaFlow</h1>
      </div>
      <div className=" flex  gap-4">
        <Button variant={'outline'}>Login</Button>
        <Button variant={'default'}>Signup</Button>
      </div>
    </nav>
  )
}

export default Navigation
