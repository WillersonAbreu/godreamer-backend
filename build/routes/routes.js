"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

// Controllers
var _UsersController = require('../app/controllers/UsersController'); var _UsersController2 = _interopRequireDefault(_UsersController);
var _SessionController = require('../app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _PostController = require('../app/controllers/PostController'); var _PostController2 = _interopRequireDefault(_PostController);
var _UploadProfileImageController = require('../app/controllers/UploadProfileImageController'); var _UploadProfileImageController2 = _interopRequireDefault(_UploadProfileImageController);
var _GroupController = require('../app/controllers/GroupController'); var _GroupController2 = _interopRequireDefault(_GroupController);
var _FeedController = require('../app/controllers/FeedController'); var _FeedController2 = _interopRequireDefault(_FeedController);
var _UserInfoDonationController = require('../app/controllers/UserInfoDonationController'); var _UserInfoDonationController2 = _interopRequireDefault(_UserInfoDonationController);
var _DonationController = require('../app/controllers/DonationController'); var _DonationController2 = _interopRequireDefault(_DonationController);
var _MetatagsController = require('../app/controllers/MetatagsController'); var _MetatagsController2 = _interopRequireDefault(_MetatagsController);

// Middlewares
var _AuthMiddleware = require('../app/middlewares/AuthMiddleware'); var _AuthMiddleware2 = _interopRequireDefault(_AuthMiddleware);
var _MulterProfileConfigMiddleware = require('../app/middlewares/MulterProfileConfigMiddleware'); var _MulterProfileConfigMiddleware2 = _interopRequireDefault(_MulterProfileConfigMiddleware);
var _MulterPostConfigMiddleware = require('../app/middlewares/MulterPostConfigMiddleware'); var _MulterPostConfigMiddleware2 = _interopRequireDefault(_MulterPostConfigMiddleware);
var _FriendshipController = require('../app/controllers/FriendshipController'); var _FriendshipController2 = _interopRequireDefault(_FriendshipController);
var _MulterGroupConfigMiddleware = require('../app/middlewares/MulterGroupConfigMiddleware'); var _MulterGroupConfigMiddleware2 = _interopRequireDefault(_MulterGroupConfigMiddleware);
var _FollowGroupController = require('../app/controllers/FollowGroupController'); var _FollowGroupController2 = _interopRequireDefault(_FollowGroupController);
var _ChatController = require('../app/controllers/ChatController'); var _ChatController2 = _interopRequireDefault(_ChatController);

const PostUpload = _multer2.default.call(void 0, _MulterPostConfigMiddleware2.default);

const routes = new (0, _express.Router)();

// Static files
routes.get('/static/profile/:file', (req, res) => {
  const { file } = req.params;
  console.log(file);
  const storedFile = _path2.default.resolve('temp', 'profile_images', `${file}`);
  return res.sendFile(storedFile);
});

routes.get('/static/post/:file', (req, res) => {
  const { file } = req.params;
  console.log(file);
  const storedFile = _path2.default.resolve('temp', 'post_images', `${file}`);
  return res.sendFile(storedFile);
});

routes.get('/static/group/:file', (req, res) => {
  const { file } = req.params;
  console.log(file);
  const storedFile = _path2.default.resolve('temp', 'group_images', `${file}`);
  return res.sendFile(storedFile);
});

const ProfileUpload = _multer2.default.call(void 0, _MulterProfileConfigMiddleware2.default);
const GroupUpload = _multer2.default.call(void 0, _MulterGroupConfigMiddleware2.default);

// Authentication Routes
routes.post('/login', _SessionController2.default.store);

// Create User Route
routes.post('/users', _UsersController2.default.store);

// All routes below this middleware needs authorization by bearer token
routes.use(_AuthMiddleware2.default);

// Users Routes
routes.put('/users', _UsersController2.default.update);
routes.delete('/users', _UsersController2.default.delete);
routes.get('/users', _UsersController2.default.index);
routes.get('/users/:emailOrName', _UsersController2.default.getUserByEmailOrName);

// Upload profile image
routes.post(
  '/profile-image',
  ProfileUpload.single('profile-image'),
  _UploadProfileImageController2.default.store
);

routes.delete('/profile-image', _UploadProfileImageController2.default.delete);

// Post routes
routes.get('/posts', PostUpload.any(), _PostController2.default.index);
routes.post('/posts', PostUpload.any(), _PostController2.default.store);
routes.put('/posts/:id', PostUpload.any(), _PostController2.default.update);
routes.delete('/posts/:id', PostUpload.any(), _PostController2.default.delete);

// Friendship routes
routes.get('/friendship', _FriendshipController2.default.index);
routes.post('/friendship', _FriendshipController2.default.store);
routes.delete('/friendship', _FriendshipController2.default.delete);

// Group routes
routes.get('/groups', _GroupController2.default.index);
routes.get('/groups/:groupName', _GroupController2.default.getByGroupName);
routes.post(
  '/groups',
  GroupUpload.single('group_image'),
  _GroupController2.default.store
);
routes.put(
  '/groups/:id',
  GroupUpload.single('group_image'),
  _GroupController2.default.update
);
routes.delete('/groups/:id', _GroupController2.default.delete);

// Feed routes
routes.get('/feed/posts/:userId', _FeedController2.default.getPosts);
routes.get('/feed/groups/:userId', _FeedController2.default.getGroups);
routes.get('/feed/own/groups/:userId', _FeedController2.default.getOwnGroups);
//funcao repetida
routes.get('/feed/user/:userId', _FeedController2.default.getPosts);
routes.get('/feed/user-feed/:userId', _FeedController2.default.getUserPosts);
routes.get('/feed/friends', _FeedController2.default.getFriends);

//Donation routes
routes.get('/donation/info', _UserInfoDonationController2.default.index);
routes.post('/donation/info', _UserInfoDonationController2.default.store);
routes.put('/donation/info', _UserInfoDonationController2.default.update);
routes.delete('/donation/info', _UserInfoDonationController2.default.delete);

routes.get('/donation/donate/', _DonationController2.default.index);
routes.post('/donation/donate/:targetId', _DonationController2.default.store);
routes.put('/donation/donate/:donationId', _DonationController2.default.update);
routes.delete('/donation/donate/:donationId', _DonationController2.default.delete);

// Follow Group routes
routes.get('/followed-groups', _FollowGroupController2.default.index);
routes.post('/groups-follow', _FollowGroupController2.default.store);
routes.delete('/unfollow-groups', _FollowGroupController2.default.delete);

// Chat routes
routes.get('/chat', _ChatController2.default.index);
routes.post('/chat/:conversation_id', _ChatController2.default.store);
routes.delete('/chat/:message_id', _ChatController2.default.delete);

routes.post('/get-metas', _MetatagsController2.default.index);

module.exports = routes;
