import app from './app';
import http from 'http';
import io from 'socket.io';

import dotenv from 'dotenv';
dotenv.config();

//#region Websocket Configuration
http = http.createServer(app);
io = io(http);
io.on('connection', function (socket) {
  // We need to register each event that the frontend can emit
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
  });
});
//#endregion Websocket close

console.log(`Your application is running on port ${process.env.PORT}`);
http.listen(process.env.PORT);
