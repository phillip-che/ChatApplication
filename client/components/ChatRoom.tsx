"use client";
import Link from "next/link";
import { Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/material";

const ChatRoom = ({
  socket,
  username,
  room,
}: {
  socket: string;
  username: string;
  room?: string;
}) => {
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
    <>
      <TextField
        type="text"
        placeholder="Enter your message here.."
        fullWidth
      />
      <Button>Send</Button>
      <Button>
        <Link href="/">Quit Chatroom</Link>
      </Button>

      <ul className="list-group">
        {chatBuffer.map((element, index) => (
          <li>{element}</li>
        ))}
      </ul>
    </>
  );
};

export default ChatRoom;
