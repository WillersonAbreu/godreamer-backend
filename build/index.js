"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

// BO import
var _FeedBO = require('./app/BO/FeedBO'); var _FeedBO2 = _interopRequireDefault(_FeedBO);

// For websocket
var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _socketio = require('socket.io'); var _socketio2 = _interopRequireDefault(_socketio);

_http2.default = _http2.default.createServer(_app2.default);
_socketio2.default = _socketio2.default.call(void 0, _http2.default);

var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
_dotenv2.default.config();

// const [io, http] = Websocket.config();

_socketio2.default.on('connection', function (socket) {
  // We need to register each event that the frontend can emit
  socket.on('chatMessage', function (messageObject) {
    socket.broadcast.emit('messageReceived', messageObject);
  });

  socket.on('newPost', async function (postObject) {
    // const post = await FeedBO.getUserPost(postObject);
    socket.broadcast.emit('receivedNewPost', true);
  });
});

console.log(`Your application is running on port ${process.env.PORT}`);
_http2.default.listen(process.env.PORT);
