import app from './app';

// BO import
import FeedBO from './app/BO/FeedBO';

// For websocket
import http from 'http';
import io from 'socket.io';

http = http.createServer(app);
io = io(http);

import dotenv from 'dotenv';
dotenv.config();

// const [io, http] = Websocket.config();

io.on('connection', function (socket) {
  // We need to register each event that the frontend can emit
  socket.on('chatMessage', function (messageObject) {
    console.log('message: ', messageObject);
  });

  socket.on('newPost', async function (postObject) {
    const post = await FeedBO.getUserPost(postObject);
    socket.broadcast.emit('receivedNewPost', post.toJSON());
  });
});

console.log(`Your application is running on port ${process.env.PORT}`);
http.listen(process.env.PORT);
