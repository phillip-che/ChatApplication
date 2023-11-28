'use client';

import "../styles/ChatContainer.css"
import { Button, TextField } from '@mui/material';
import { useSocket } from "@/context/socket.context"
import { useEffect, useState } from 'react'
import MessagesContainer from './MessagesContainer';
import EVENTS from '@/config/events';

const ChatContainer = () => {

  const { socket, username, setUsername, messages, setMessages, roomID } = useSocket();
  const [ textInput, setTextInput ] = useState("");

  const handleChange = (e: any) => {
    setTextInput(e.target.value);
  };

  const handleSendClick = () => {
    if (textInput.length < 1) {
      return;
    }
    setMessages([...messages, {username: username, text: textInput}]);
    socket.emit(EVENTS.CLIENT.SEND_MESSAGE, {roomID: roomID, username: username, text: textInput});
    setTextInput("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") { 
      handleSendClick();
    }
  };

  useEffect(() => {
    console.log(roomID);
    setUsername(localStorage.getItem("username"));
    setMessages([...messages]);
  }, []);

  return (
    <div className="chat-container">
      <h1>Room: {roomID}</h1>
      <MessagesContainer />
      <div className="message-input">
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
    </div>
  );
};

export default ChatContainer;
