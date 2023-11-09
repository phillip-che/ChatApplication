"use client";

import ChatRoom from "@/components/ChatRoom";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSocket } from "@/context/socket.context";

const Page = () => {
  const { socket, username } = useSocket();

  return (
    <main>
      <h1>Chat Room</h1>
      <h3>Username: {username}</h3>
      <ChatRoom socket="socket" username="username" />
    </main>
  );
};

export default Page;
