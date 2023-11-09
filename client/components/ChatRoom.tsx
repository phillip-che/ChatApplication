"use client";

import { Button, TextField } from "@mui/material";

const ChatRoom = ({
  socket,
  username,
  room,
}: {
  socket: string;
  username: string;
  room?: string;
}) => {
  return (
    <>
      <TextField
        type="text"
        placeholder="Enter your message here.."
        fullWidth
      />
      <Button>Send</Button>
    </>
  );
};

export default ChatRoom;
