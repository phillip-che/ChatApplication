"use client"

import { createContext, useContext, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client"
import EVENTS from "@/config/events";

interface Context {
    socket: Socket,
    username?: string,
    setUsername: Function,
    messages: {username: string, text: string}[],
    setMessages: Function,
    roomID?: string
}

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

const socket = io(SOCKET_URL, {
    reconnection: true,
    upgrade: true,
    transports: ["websocket", "polling"]
});

const SocketContext = createContext<Context>({ 
    socket, 
    setUsername: () => false,
    setMessages: () => false,
    messages: []
});

const SocketsProvider = (props: any) => {
    const [username, setUsername] = useState<string>("");
    const [messages, setMessages] = useState<{username: string, text: string}[]>([]);
    const [roomID, setRoomID] = useState<string>("");

    useEffect(() => {
        socket.on(EVENTS.SERVER.SEND_MESSAGE, ({username, text}) => {
            setMessages([...messages, {username, text}]);
        });
    }, [socket]);

    useEffect(() => {
        setMessages([]);
    }, [roomID]);

    socket.on(EVENTS.SERVER.SEND_MESSAGE, ({username, text}) => {
        setMessages([...messages, {username, text}]);
    });

    socket.on(EVENTS.SERVER.JOIN_ROOM, ({roomID}) => {
        setRoomID(roomID);
        setMessages([]);
    });

    socket.on(EVENTS.SERVER.LEAVE_ROOM, ({roomID}) => {
        setRoomID("");
    });

    return <SocketContext.Provider value={{ socket, username, setUsername, messages, setMessages, roomID }} {...props} />
}

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider;