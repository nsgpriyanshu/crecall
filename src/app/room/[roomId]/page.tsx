"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import SimplePeer from 'simple-peer';
import { Button } from '@/components/ui/button'; // Importing a button component
import { EyeClosedIcon, LinkBreak2Icon, LinkNone1Icon } from '@radix-ui/react-icons';

const Room = () => {
  const { roomId } = useParams();

  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const [peerSignal, setPeerSignal] = useState<string | null>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peerVideo = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraOn, setCameraOn] = useState(true);

  useEffect(() => {
    // Access the user's camera and microphone
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
      setStream(stream);

      const peerInstance = new SimplePeer({
        initiator: location.pathname.includes('create'),
        trickle: false,
        stream: stream,
      });

      peerInstance.on('signal', (data) => {
        setPeerSignal(JSON.stringify(data));
      });

      peerInstance.on('stream', (peerStream) => {
        if (peerVideo.current) {
          peerVideo.current.srcObject = peerStream;
        }
      });

      setPeer(peerInstance);
    });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [roomId]);

  const handleConnect = () => {
    if (peerSignal && peer) {
      const signalData = JSON.parse(peerSignal);
      peer.signal(signalData);
    }
  };

  const handleHideCamera = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !cameraOn;
      setCameraOn(!cameraOn);
    }
  };

  const handleDisconnect = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
      setPeerSignal(null);
      if (peerVideo.current) {
        peerVideo.current.srcObject = null;
      }
    }
  };

  return (
    <div className="relative flex h-auto w-full flex-col items-center justify-center py-40 md:h-[20rem] lg:h-[30rem]">
      <h1 className="text-2xl font-bold text-neutral-400 md:text-3xl lg:text-4xl">
        Your Room ID: <span className="text-neutral-100 underline underline-offset-8">{roomId}</span>
      </h1>
      <div className="flex items-center justify-center gap-4 py-4 rounded-lg">
        <video ref={userVideo} autoPlay muted className="rounded-lg border border-neutral-600" style={{ width: '45%' }} />
        <video ref={peerVideo} autoPlay className="rounded-lg border border-neutral-600" style={{ width: '45%' }} />
      </div>
      <textarea value={peerSignal || ''} readOnly rows={6} cols={50} className="mt-4" />
      <div className="flex gap-4 mt-4">
        <Button onClick={handleConnect} className="font-bold">
          <LinkNone1Icon className="mr-2 size-6"/>
          Connect
        </Button>
        <Button onClick={handleHideCamera} className="font-bold">
          <EyeClosedIcon className="mr-2 size-6"/>
          {cameraOn ? 'Hide Camera' : 'Show Camera'}
        </Button>
        <Button onClick={handleDisconnect} className="font-bold">
          <LinkBreak2Icon className="mr-2 size-6"/>
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default Room;

