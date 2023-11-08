"use client"

import { createContext, useContext, useState } from "react";
import io, { Socket } from "socket.io-client"

interface Context {
    socket: Socket,
    username?: string,
    setUsername: Function
}

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

const socket = io(SOCKET_URL, {
    reconnection: true,
    upgrade: true,
    transports: ["websocket", "polling"]
});

const SocketContext = createContext<Context>({ socket, setUsername: () => false });

const SocketsProvider = (props: any) => {
    const [username, setUsername] = useState("");

    return <SocketContext.Provider value={{ socket, username, setUsername }} {...props} />
}

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider