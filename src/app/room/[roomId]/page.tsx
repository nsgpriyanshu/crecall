// src/app/room/[roomId]/page.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Link1Icon, LinkNone2Icon } from '@radix-ui/react-icons'
import React, { useEffect, useRef, useState } from 'react'
import SimplePeer from 'simple-peer'

// The component receives `params` as a prop from the Next.js App Router
const Room = ({ params }: { params: { roomId: string } }) => {
  const roomId = params.roomId // Access roomId from params

  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null)
  const [peerSignal, setPeerSignal] = useState<string | null>(null)
  const userVideo = useRef<HTMLVideoElement>(null)
  const peerVideo = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    // Access the user's camera and microphone
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream
      }
      setStream(stream)

      const peerInstance = new SimplePeer({
        initiator: window.location.pathname.includes('create'), // Using window.location for path check
        trickle: false,
        stream: stream,
      })

      peerInstance.on('signal', data => {
        setPeerSignal(JSON.stringify(data))
      })

      peerInstance.on('stream', peerStream => {
        if (peerVideo.current) {
          peerVideo.current.srcObject = peerStream
        }
      })

      setPeer(peerInstance)
    })
  }, [roomId])

  const handleConnect = () => {
    if (peerSignal && peer) {
      const signalData = JSON.parse(peerSignal)
      peer.signal(signalData)
    }
  }

  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center py-40 md:h-[20rem] lg:h-[30rem]">
      <h1 className="text-2xl font-bold text-neutral-400 md:text-3xl lg:text-4xl">
        Your Room ID:{' '}
        <span className="text-neutral-100 underline underline-offset-8"> {roomId}</span>
      </h1>
      <div className="mt-4 flex items-center justify-center gap-4">
        <video ref={userVideo} autoPlay muted className="h-[200px] w-[300px] rounded-lg" />
        <video ref={peerVideo} autoPlay className="h-[200px] w-[300px] rounded-lg" />
      </div>
      <textarea value={peerSignal || ''} readOnly rows={6} cols={50} className="mt-4" />
      <Button onClick={handleConnect} className="mt-4 font-bold">
        <LinkNone2Icon className="mr-2 size-6" />
        Connect
      </Button>
    </div>
  )
}

export default Room
