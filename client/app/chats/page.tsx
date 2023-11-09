"use client";

import ChatRoom from "@/components/ChatRoom";
import { Button } from "@mui/material";
import Link from "next/link";
import { useSocket } from "@/context/socket.context";

const Page = () => {
  const { socket, username } = useSocket();

  {
    /* Formatter for creating new user-message pairs */
  }
  function newUsrMsg_Pair(username: string, message: string) {
    const pair = "[" + username + "] " + message;
    return pair;
  }

  {
    /* Method for adding new users
    New users should be appended to the head of the list for all users */
  }
  function addToMsgBuffer(username: string, message: string) {
    chatBuffer.push(newUsrMsg_Pair(username, message));
  }

  {
    /* 1D array that holds all chat messages */
  }
  let chatBuffer = [newUsrMsg_Pair("SYSTEM", "Chat service started.")];

  addToMsgBuffer("TestUser", "Test Message");

  return (
    <main>
      <h1>Chat Room</h1>
      <h3>Username: {username}</h3>
      <ChatRoom socket="socket" username="username" />
      <Button>
        <Link href="/">Quit Chatroom</Link>
      </Button>

      <ul className="list-group">
        {chatBuffer.map((element, index) => (
          <li>{element}</li>
        ))}
      </ul>
    </main>
  );
};

export default Page;
