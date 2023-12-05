"use client"

import "../styles/HomeContainer.css"
import LoginFields from '@/components/LoginFields';
import ChatContainer from '@/components/ChatContainer';
import { useSocket } from '@/context/socket.context';

const HomeContainer = () => {
  const { roomID } = useSocket();

  return (
    <div className="home-container">
      {!roomID ? 
        <div className="login">
          <h2>Start Chatting...</h2>
          <LoginFields />
        </div>
        :
        <div className="chat">
          <ChatContainer />
        </div>
      }
    </div>
  )
}

export default HomeContainer