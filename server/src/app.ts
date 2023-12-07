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
  UPDATE_USERS: 'update-users-connected',
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
      CREATE_ROOM: 's_create_room',
  }
};

app.get('/', (_, res) => {
  res.send(`Server is up and running.`);
});

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`);

  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    console.log(`User ${socket.id} connected.`);

    socket.on(EVENTS.DISCONNECT, async () => {
      if (socket.data.room) {
        socket.leave(socket.data.room);
        const sockets = await io.in(socket.data.room).fetchSockets();
        const usersConnected = [];
        sockets.forEach((socket) => {
          usersConnected.push(socket.data.username);
        });
        io.in(socket.data.room).emit(EVENTS.UPDATE_USERS, {usersConnected: usersConnected});
      }
      console.log(`User ${socket.id} disconnected.`);
    });

    socket.on(EVENTS.CLIENT.SEND_MESSAGE, (data) => {
      console.log(`${data.username} sent a ${data.type} to room: ${data.roomID}`);
      socket.to(data.roomID).emit(EVENTS.SERVER.SEND_MESSAGE, 
        {
          type: data.type,
          username: data.username,
          body: data.body,
          timestamp: data.timestamp,
          iv: data.iv,
          aesKey: data.aesKey
      });
    });

    socket.on(EVENTS.CLIENT.CREATE_ROOM, async (data) => {
      socket.data.username = data.username;
      const roomID = nanoid(10);
      socket.data.room = roomID;
      console.log(`${data.username} created room: ${roomID}`);
      socket.join(roomID);

      const sockets = await io.in(roomID).fetchSockets();
      const usersConnected = [];
      sockets.forEach((socket) => {
        usersConnected.push(socket.data.username);
      });

      io.in(roomID).emit(EVENTS.UPDATE_USERS, {usersConnected: usersConnected});
      
      socket.emit(EVENTS.SERVER.JOIN_ROOM, {roomID: roomID, usersConnected: usersConnected});
    });

    socket.on(EVENTS.CLIENT.JOIN_ROOM, async (data) => {
      console.log(`${data.username} joined ${data.roomID}`);
      socket.data.username = data.username;
      socket.join(data.roomID);
      socket.data.room = data.roomID;
      const sockets = await io.in(data.roomID).fetchSockets();
      const usersConnected = [];
      sockets.forEach((socket) => {
        usersConnected.push(socket.data.username);
      });

      io.in(data.roomID).emit(EVENTS.UPDATE_USERS, {usersConnected: usersConnected});
      
      socket.emit(EVENTS.SERVER.JOIN_ROOM, {roomID: data.roomID, usersConnected: usersConnected});
    });

    socket.on(EVENTS.CLIENT.LEAVE_ROOM, async (data) => {
      console.log(`User ${socket.id} left room ${data.roomID}`);
      socket.leave(data.roomID);

      const sockets = await io.in(data.roomID).fetchSockets();
      const usersConnected = [];
      sockets.forEach((socket) => {
        usersConnected.push(socket.data.username);
      });

      io.in(data.roomID).emit(EVENTS.UPDATE_USERS, {usersConnected: usersConnected});
      socket.emit(EVENTS.SERVER.LEAVE_ROOM, data);
    });
  });
});
