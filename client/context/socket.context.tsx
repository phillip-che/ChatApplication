import { createContext, useContext } from "react";
import io from "socket.io-client"

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:4000";

const socket = io(SOCKET_URL, {
    reconnection: true,
    upgrade: true,
    transports: ["websocket", "polling"]
  });

const SocketContext = createContext({ socket });

const SocketsProvider = (props: any) => {
  return <SocketContext.Provider value={{ socket }} {...props} />
}

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider