"use client";

import io from "socket.io-client"
import { useEffect, useState } from "react"
import { Socket } from "socket.io-client"
import UsernameInput from '@/components/UsernameInput';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_URL, {
      reconnection: true,
      upgrade: true,
      transports: ["websocket", "polling"]
    });
    
    setSocket(socket);
    
  }, []);

  return socket;
}

export default function Home() {

  const [user, setUser] = useState(null);
  const socket = useSocket();

  useEffect(() => {
    socket?.on("connection", () => {
      console.log(`Connected to socket id: ${socket.id}`);
    });
  }, [socket]);

  return (
    <main>
      <UsernameInput />
      {socket ? 
      <div>
        Socket ID: {socket.id}
      </div> : null }
    </main>
  )
}