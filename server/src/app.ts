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
  CLIENT: {
    SEND_MESSAGE: 'c_send_message',
    JOIN_ROOM: 'c_join_room',
    LEAVE_ROOM: 'c_leave_room'
  },
  SERVER: {
    SEND_MESSAGE: 's_send_message',
    JOIN_ROOM: 's_join_room',
    LEAVE_ROOM: 's_leave_room'
  }
};

app.get('/', (_, res) => {
  res.send(`Server is up and running.`);
});

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);

  io.on(EVENTS.CONNECTION, (socket: Socket) => {

    console.log(`User ${socket.id} connected.`);

    socket.on(EVENTS.DISCONNECT, () => {
      console.log(`User ${socket.id} disconnected.`);
    });

    socket.on(EVENTS.CLIENT.SEND_MESSAGE, (data) => {
      console.log(`${data.username} sent ${data.text} to ${data.roomID}`);
      socket.to(data.roomID).emit(EVENTS.SERVER.SEND_MESSAGE, (data));
    });

    socket.on(EVENTS.CLIENT.JOIN_ROOM, (data) => {
      console.log(`${data.username} joined ${data.roomID}`);
      socket.join(data.roomID);
      socket.emit(EVENTS.SERVER.JOIN_ROOM, (data));
    });

    socket.on(EVENTS.CLIENT.LEAVE_ROOM, (room) => {
      console.log(`User ${socket.id} left room ${room.id}`);
    });
  });
});
