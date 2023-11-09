import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';

const port = process.env.PORT || 4000;
const corsOrigin = 'http://localhost:3000';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  SEND_MESSAGE: 'send_message',
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
};

app.get('/', (_, res) => {
  res.send(`Server is up and running.`);
});

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    console.log(`User ${socket.id} connected.`);

    socket.emit('test-client', {
      user: 'test user',
      text: 'test message',
      date: '11/7/23',
    });

    socket.on('test-server', (message) => {
      console.log(message.user);
      console.log(message.text);
      console.log(message.date);
    });

    socket.on(EVENTS.DISCONNECT, () => {
      console.log(`User ${socket.id} disconnected.`);
    });

    socket.on(EVENTS.SEND_MESSAGE, (message) => {
      console.log(message.username);
    });

    socket.on(EVENTS.JOIN_ROOM, (room) => {
      console.log(`User ${socket.id} joined room ${room.id}`);
    });

    socket.on(EVENTS.LEAVE_ROOM, (room) => {
      console.log(`User ${socket.id} left room ${room.id}`);
    });
  });
});
