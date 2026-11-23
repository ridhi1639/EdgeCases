import http from 'node:http';
import { config } from './config.js';
import { createApp } from './app.js';

const server = http.createServer(createApp());

server.listen(config.port, () => {
  console.log(`Edge Cases API listening on http://localhost:${config.port}`);
});