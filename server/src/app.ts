import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { nanoid } from 'nanoid';

const port = process.env.PORT || 4000;
const corsOrigin = '*';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
  maxHttpBufferSize: 1e8
});

const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  CLIENT: {
      SEND_MESSAGE: 'c_send_message',
      JOIN_ROOM: 'c_join_room',
      LEAVE_ROOM: 'c_leave_room',
      CREATE_ROOM: 'c_create_room'
  },
  SERVER: {
      SEND_MESSAGE: 's_send_message',
      JOIN_ROOM: 's_join_room',
      LEAVE_ROOM: 's_leave_room',
      CREATE_ROOM: 's_create_room'
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
      console.log(`${data.username} sent a ${data.type} to room: ${data.roomID}`);
      socket.to(data.roomID).emit(EVENTS.SERVER.SEND_MESSAGE, 
        {
          type: data.type,
          username: data.username,
          body: data.body,
          timestamp: data.timestamp
      });
    });

    socket.on(EVENTS.CLIENT.CREATE_ROOM, (data) => {
      socket.data.username = data.username;
      const roomID = nanoid(10);
      console.log(`Created room: ${roomID}`);
      socket.join(roomID);
      socket.emit(EVENTS.SERVER.JOIN_ROOM, {roomID});
    });

    socket.on(EVENTS.CLIENT.JOIN_ROOM, async (data) => {
      console.log(`${data.username} joined ${data.roomID}`);
      socket.data.username = data.username;
      socket.join(data.roomID);
      const sockets = await io.in(data.roomID).fetchSockets();
      
      console.log(`Connected Users in ${data.roomID}: ${sockets.length}`);
      sockets.forEach((socket, i) => {
        console.log(`user #${i+1}: ${socket.data.username}`);
      });
      
      socket.emit(EVENTS.SERVER.JOIN_ROOM, data);
    });

    socket.on(EVENTS.CLIENT.LEAVE_ROOM, (data) => {
      console.log(`User ${socket.id} left room ${data.roomID}`);
      socket.leave(data.roomID);
      socket.emit(EVENTS.SERVER.LEAVE_ROOM, data);
    });
  });
});
