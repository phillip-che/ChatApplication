"use client"

import { useSocket } from "@/context/socket.context"
import Message from './Message';

const MessagesContainer = () => {
    
    const { socket, username, messages, setMessages } = useSocket();

    return (
    <div>
        {messages?.map((message, i) => (
            <Message username={message.username} text={message.text} key={i} />
        ))}
    </div>
    )
}

export default MessagesContainer;