'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import EVENTS from '@/config/events';

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages: {
    type: string;
    username: string;
    body: string;
    timestamp: string;
  }[];
  setMessages: Function;
  roomID?: string;
  usersConnected: [];
  setUsersConnected: Function;
}

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || 'https://cypherchat.lol:4000';

const socket = io(SOCKET_URL, {
  reconnection: true,
  upgrade: true,
  transports: ['websocket', 'polling'],
});

const SocketContext = createContext<Context>({
  socket,
  messages: [],
  usersConnected: [],
  setUsername: () => false,
  setMessages: () => false,
  setUsersConnected: () => false
});

const SocketsProvider = (props: any) => {
  const [username, setUsername] = useState<string>('');
  const [messages, setMessages] = useState<
    { type: string; username: string; body: string; timestamp: string }[]
  >([]);
  const [roomID, setRoomID] = useState<string>('');
  const [ usersConnected, setUsersConnected ] = useState<any>([]);

  useEffect(() => {
    socket.on(
      EVENTS.SERVER.SEND_MESSAGE,
      ({ type, username, body, timestamp }) => {
        setMessages([...messages, { type, username, body, timestamp }]);
      }
    );
  }, [socket]);

  useEffect(() => {
    setMessages([]);
  }, [roomID]);

  socket.on(EVENTS.UPDATE_USERS, ({ usersConnected }) => {
    setUsersConnected(usersConnected);
  });

  socket.on(
    EVENTS.SERVER.SEND_MESSAGE,
    ({ type, username, body, timestamp }) => {
      setMessages([...messages, { type, username, body, timestamp }]);
    }
  );

  socket.on(EVENTS.SERVER.JOIN_ROOM, ({ roomID }) => {
    setRoomID(roomID);
    setMessages([]);
  });

  socket.on(EVENTS.SERVER.LEAVE_ROOM, () => {
    setRoomID('');
  });

  return (
    <SocketContext.Provider
      value={{ socket, username, setUsername, messages, setMessages, roomID, usersConnected, setUsersConnected }}
      {...props}
    />
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider;
