import app from './app'

// For websocket
import http from 'http'
import io from 'socket.io'

http = http.createServer(app)
io = io(http)

import dotenv from 'dotenv'
dotenv.config()

// const [io, http] = Websocket.config();

io.on('connection', async function (socket) {
  // We need to register each event that the frontend can emit
  await socket.on('chatMessage', async function (messageObject) {
    await socket.broadcast.emit('messageReceived', messageObject)
  })

  await socket.on('newPost', async function (postObject) {
    // const post = await FeedBO.getUserPost(postObject);
    await socket.broadcast.emit('receivedNewPost', true)
  })
})

console.log(`Your application is running on port ${process.env.PORT}`)
http.listen(process.env.PORT)
