'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import EVENTS from '@/config/events';
import crypto from 'crypto'

interface Context {
  socket: Socket;
  username?: string;
  setUsername: Function;
  messages: {
    type: string;
    username: string;
    body: any;
    timestamp: string;
  }[];
  setMessages: Function;
  roomID?: string;
  usersConnected: [];
  aesKey: Buffer;
}

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || 'https://cypherchat.lol:4000';

const socket = io(SOCKET_URL, {
  reconnection: true,
  upgrade: true,
  transports: ['websocket', 'polling'],
});

const aesKeyString = "fcba69ac69c7182417c68a5f6f78f6a24072156dd444013e69a2820f631164e7";
const aesKey = Buffer.from(aesKeyString, 'hex');

const SocketContext = createContext<Context>({
  socket,
  messages: [],
  usersConnected: [],
  aesKey,
  setUsername: () => false,
  setMessages: () => false
});

const SocketsProvider = (props: any) => {
  const [username, setUsername] = useState<string>('');
  const [messages, setMessages] = useState<
    { type: string; username: string; body: string; timestamp: string }[]
  >([]);
  const [roomID, setRoomID] = useState<string>('');
  const [usersConnected, setUsersConnected] = useState<any>([]);

  useEffect(() => {
    socket.on(
      EVENTS.SERVER.SEND_MESSAGE,
    ({ type, username, body, timestamp, iv }) => {

      if(type === 'text') {
        const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, Buffer.from(iv, 'hex'));
        let decryptedMessage: any= decipher.update(body, 'hex', 'utf-8');
        decryptedMessage += decipher.final('utf-8');
        body = decryptedMessage;
      }

      setMessages([...messages, { type, username, body, timestamp }]);
    }
    );
  }, [socket]);

  useEffect(() => {
    setMessages([]);
  }, [roomID]);

  socket.on(
    EVENTS.SERVER.SEND_MESSAGE,
    ({ type, username, body, timestamp, iv }) => {

      if(type === "text") {
        const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, Buffer.from(iv, 'hex'));
        let decryptedMessage: any= decipher.update(body, 'hex', 'utf-8');
        decryptedMessage += decipher.final('utf-8');
        body = decryptedMessage;
      }

      setMessages([...messages, { type, username, body, timestamp }]);
    }
  );

  socket.on(EVENTS.UPDATE_USERS, ({ usersConnected }) => {
    setUsersConnected(usersConnected);
  });

  socket.on(EVENTS.SERVER.JOIN_ROOM, ({ roomID }) => {
    setRoomID(roomID);
    setMessages([]);
  });

  socket.on(EVENTS.SERVER.LEAVE_ROOM, () => {
    setRoomID('');
  });

  return (
    <SocketContext.Provider
      value={{ socket, username, setUsername, messages, setMessages, roomID, usersConnected, aesKey }}
      {...props}
    />
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketsProvider;
