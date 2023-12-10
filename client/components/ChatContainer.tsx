'use client';

import '../styles/ChatContainer.css';
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';
import ChatRoomInfo from './ChatRoomInfo';
import { useSocket } from '@/context/socket.context';
import { useEffect } from 'react';

const ChatContainer = () => {
  const { setUsername, messages, setMessages } = useSocket();

  useEffect(() => {
    setUsername(sessionStorage.getItem('username'));
    setMessages([...messages]);
  }, []);

  return (
    <div className="chat-container">
      <ChatRoomInfo />
      <div>
        <MessagesContainer />
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
