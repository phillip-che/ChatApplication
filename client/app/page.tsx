"use client";

import "./page.module.css"
import { useEffect, useState } from "react"
import { useSocket } from "@/context/socket.context";
import UsernameInput from '@/components/UsernameInput';

export default function Home() {

  const [username, setUsername] = useState<String>("");
  const { socket } = useSocket();

  socket.on("test-client", (message) => {
    console.log(message.user);
    console.log(message.text);
    console.log(message.date);
  });
  
  useEffect(() => {
    socket.on("connection", () => {
      console.log(`Connected to socket id: ${socket.id}`);
    });

    socket.emit("test-server", {
      user: "test user",
      text: "test message",
      date: "11/7/23"
    });

  }, []);

  return (
    <main>
      <div className="username-container">
        <UsernameInput setUsername={setUsername} />      
      </div>
      <div>Socket ID: {socket.id} </div>
    </main>
  )
}