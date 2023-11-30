"use client"

import "../styles/Message.css"
import { useSocket } from "@/context/socket.context"

const Message = ({author, text, timestamp} : {author: string, text: string, timestamp: string}) => {

  const { username } = useSocket();

  return (
    <div>
      <div className="message" id={username === author ? "you" : "other"}>
        <p className="user">{author}</p>
        <p className="text">{text}</p>
        <p className="timestamp">{timestamp}</p>
      </div> 
    </div>
  )
}

export default Message;