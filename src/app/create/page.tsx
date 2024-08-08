// src/app/create/page.tsx
'use client' // Mark this as a client component

import { Button } from '@/components/ui/button'
import { MagicWandIcon } from '@radix-ui/react-icons'

import { useRouter } from 'next/navigation'
import React from 'react'

const CreateCall = () => {
  const router = useRouter()

  const handleCreate = () => {
    // Generate a unique room ID
    const roomId = Math.random().toString(36).substr(2, 9)
    // Navigate to the newly created room
    router.push(`/room/${roomId}`)
  }

  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center py-40 md:h-[20rem] lg:h-[30rem]">
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-neutral-400 md:text-3xl lg:text-4xl">
          Create a new Call to have some good time with your friends
        </h1>
      </div>
      <div className="flex gap-4 py-4">
        <div>
          <Button variant="secondary" onClick={handleCreate} className="font-bold">
            <MagicWandIcon className="mr-2 size-6" />
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreateCall
