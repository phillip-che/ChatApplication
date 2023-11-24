'use client';

import { Button, TextField } from '@mui/material';
import { useSocket } from "@/context/socket.context"
import { useEffect, useState } from 'react'
import MessagesContainer from './MessagesContainer';
import EVENTS from '@/config/events';

const ChatRoom = () => {

  const { socket, username, setUsername, messages, setMessages } = useSocket();
  const [ textInput, setTextInput ] = useState("");

  const handleChange = (e: any) => {
    setTextInput(e.target.value);
  };

  const handleSendClick = () => {
    setMessages([...messages, {username: username, text: textInput}]);
    socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {username: username, text: textInput});
    setTextInput("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setMessages([...messages]);
  }, []);

  return (
    <div>
      <MessagesContainer />
      <TextField
        value={textInput}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        type="text"
        placeholder="Enter your message here.."
        fullWidth
      />
      <Button onClick={handleSendClick}> Send </Button>
    </div>
  );
};

export default ChatRoom;
