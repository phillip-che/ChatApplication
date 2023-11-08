"use client";

import "./page.module.css"
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

  const [username, setUsername] = useState<String>("");
  const socket = useSocket();

  socket?.on("test-client", (message) => {
    console.log(message.user);
    console.log(message.text);
    console.log(message.date);
  });
  

  useEffect(() => {
    socket?.on("connection", () => {
      console.log(`Connected to socket id: ${socket.id}`);
    });

    socket?.emit("test-server", {
      user: "test user",
      text: "test message",
      date: "11/7/23"
    });

  }, [socket]);

  return (
    <main>
      <div className="username-container">
        <UsernameInput setUsername={setUsername} />      
      </div>
    </main>
  )
}