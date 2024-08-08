// src/app/join/page.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Link1Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const JoinCall = () => {
  const [roomId, setRoomId] = useState('')
  const router = useRouter()

  const handleJoin = () => {
    if (roomId.trim()) {
      router.push(`/room/${roomId}`)
    }
  }

  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center py-40 md:h-[20rem] lg:h-[30rem]">
      <h1 className="text-2xl font-bold text-neutral-400 md:text-3xl lg:text-4xl">
        Join a call of your friend
      </h1>
      <div className="items-center justify-center py-4">
        <Input
          type="text"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
          placeholder="What is your Room ID"
        />
      </div>
      <Button onClick={handleJoin} className="font-bold">
        <Link1Icon className="mr-2 size-6" />
        Join Call
      </Button>
    </div>
  )
}

export default JoinCall
