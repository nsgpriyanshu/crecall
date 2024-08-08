import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Link1Icon, MagicWandIcon } from '@radix-ui/react-icons'

function Landing() {
  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center py-40 md:h-[20rem] lg:h-[30rem]">
      <div className="p-4 text-center">
        <h1 className="text-4xl font-bold text-neutral-400 md:text-5xl lg:text-6xl">
          Create <span className="text-neutral-100 underline underline-offset-8">calls</span>{' '}
          without exposing your <span className="text-neutral-100">privacy</span>!
        </h1>
      </div>
      <div className="flex gap-4 py-4">
        <div>
          <Button asChild className="font-bold">
            <Link href="/join">
              <Link1Icon className="mr-2 size-6" />
              Join
            </Link>
          </Button>
        </div>
        <div>
          <Button asChild className="font-bold">
            <Link href="/create">
              <MagicWandIcon className="mr-2 size-6" />
              Create
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Landing
