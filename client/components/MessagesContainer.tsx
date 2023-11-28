"use client"

import "../styles/MessagesContainer.css"
import { useSocket } from "@/context/socket.context"
import Message from './Message';

const MessagesContainer = () => {
    
    const { socket, username, messages, setMessages } = useSocket();

    return (
    <div className="messages-container">
        {messages?.map((message, i) => (
            <Message username={message.username} text={message.text} key={i} />
        ))}
    </div>
    )
};

export default MessagesContainer;