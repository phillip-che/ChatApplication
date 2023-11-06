import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const port = process.env.PORT || 4000;
const corsOrigin = "http://localhost:3000";

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    }
});

app.get('/', (_, res) => {
    res.send(`Server is up and running.`);
});

httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`);

    io.on("connection", (socket: Socket) => {
        console.log(`User ${socket.id} connected.`);

        socket.on("disconnect", () => {
            console.log(`User ${socket.id} disconncted.`);
        });
    });
});