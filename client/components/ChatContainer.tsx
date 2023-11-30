'use client';

import "../styles/ChatContainer.css"
import { useSocket } from "@/context/socket.context"
import { useEffect } from 'react'
import MessagesContainer from './MessagesContainer';
import MessageInput from "./MessageInput";

const ChatContainer = () => {

  const { setUsername, messages, setMessages } = useSocket();

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
    setMessages([...messages]);
  }, []);

  return (
    <div className="chat-container">
      <MessagesContainer />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
