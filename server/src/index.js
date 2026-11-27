import http from 'http';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { config } from './config.js';
import { setupMatchmaking } from './socket/matchmaking.js';

const app = createApp();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

setupMatchmaking(io);

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});