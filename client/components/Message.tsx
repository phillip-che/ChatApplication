"use client"

import "../styles/Message.css"
import { useSocket } from "@/context/socket.context"
import Image from '@/components/Image';

const Message = ({type, author, body, timestamp} : {type: string, author: string, body: string, timestamp: string}) => {

  const { username } = useSocket();

  return (
    <div>
      <div className="message" id={username === author ? "you" : "other"}>
        {type === "text" ? (
          <>
            <p className="user">{author}</p>
            <p className="text">{body}</p>
            <p className="timestamp">{timestamp}</p> 
          </> 
        ): (
          <>
            <p className="user">{author}</p>
            <Image src={body} type={type} />
            <p className="timestamp">{timestamp}</p> 
          </>
        )}
      </div> 
    </div>
  )
};

export default Message;