"use client"

import "../styles/MessagesContainer.css"
import Message from './Message';
import { useSocket } from "@/context/socket.context"
import { useRef, useEffect } from "react";

const MessagesContainer = () => {
    
    const { messages } = useSocket();

    const messagesEndRef: any = useRef();

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView(
              {
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest'
              })
          }
    }, [messages]);

    return (
    <div className="messages-container">
        {messages?.map((message, i) => (
            <Message author={message.username} text={message.text} key={i} />
        ))}
        <div ref={messagesEndRef} />
    </div>
    )
};

export default MessagesContainer;