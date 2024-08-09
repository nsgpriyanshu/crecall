'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import SimplePeer from 'simple-peer'
import { EyeClosedIcon, LinkBreak2Icon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

const Room = () => {
  const searchParams = useSearchParams()
  const roomId = searchParams.get('roomId')

  const [peer, setPeer] = (useState < SimplePeer.Instance) | (null > null)
  const [peerSignal, setPeerSignal] = useState < any > null
  const userVideo = useRef < HTMLVideoElement > null
  const peerVideo = useRef < HTMLVideoElement > null
  const [stream, setStream] = (useState < MediaStream) | (null > null)

  const socketRef = (useRef < WebSocket) | (null > null)

  useEffect(() => {
    // Initialize WebSocket connection
    socketRef.current = new WebSocket(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8080',
    )

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream
      }
      setStream(stream)

      const peerInstance = new SimplePeer({
        initiator: location.pathname.includes('create'),
        trickle: false,
        stream: stream,
      })

      peerInstance.on('signal', data => {
        setPeerSignal(data)
        socketRef.current?.send(JSON.stringify({ roomId, signal: data }))
      })

      peerInstance.on('stream', peerStream => {
        if (peerVideo.current) {
          peerVideo.current.srcObject = peerStream
        }
      })

      setPeer(peerInstance)
    })

    socketRef.current.onmessage = event => {
      const message = JSON.parse(event.data)
      if (message.roomId === roomId && peer) {
        peer.signal(message.signal)
      }
    }

    return () => {
      socketRef.current?.close()
    }
  }, [roomId])

  const handleHideCamera = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled
    }
  }

  const handleDisconnect = () => {
    peer?.destroy()
    socketRef.current?.close()
  }

  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center py-40 md:h-[20rem] lg:h-[30rem]">
      <h1 className="text-2xl font-bold text-neutral-400 md:text-3xl lg:text-4xl">
        Your Room ID:{' '}
        <span className="text-neutral-100 underline underline-offset-8"> {roomId}</span>
      </h1>
      <div className="flex items-center justify-center gap-4 rounded-lg">
        <video ref={userVideo} autoPlay muted className="w-1/2 rounded-lg" />
        <video ref={peerVideo} autoPlay className="w-1/2 rounded-lg" />
      </div>
      <textarea value={peerSignal ? JSON.stringify(peerSignal) : ''} readOnly rows={6} cols={50} />
      <div className="mt-4 flex gap-4">
        <Button onClick={handleHideCamera}>
          <EyeClosedIcon className="mr-2 size-6" /> Hide Camera
        </Button>
        <Button onClick={handleDisconnect}>
          <LinkBreak2Icon className="mr-2 size-6" /> Disconnect
        </Button>
      </div>
    </div>
  )
}

export default Room
