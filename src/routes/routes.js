import { Router } from 'express';
import multer from 'multer';
import path from 'path';

// Controllers
import UserController from '../app/controllers/UsersController';
import SessionController from '../app/controllers/SessionController';
import PostController from '../app/controllers/PostController';
import UploadProfileImageController from '../app/controllers/UploadProfileImageController';
import GroupController from '../app/controllers/GroupController';
import FeedController from '../app/controllers/FeedController';
import UserInfoDonationController from '../app/controllers/UserInfoDonationController';
import DonationController from '../app/controllers/DonationController';

// Middlewares
import AuthMiddleware from '../app/middlewares/AuthMiddleware';
import MulterProfileConfig from '../app/middlewares/MulterProfileConfigMiddleware';
import MulterPostConfig from '../app/middlewares/MulterPostConfigMiddleware';
import FriendshipController from '../app/controllers/FriendshipController';
import MulterGroupConfig from '../app/middlewares/MulterGroupConfigMiddleware';
import FollowGroupController from '../app/controllers/FollowGroupController';
import ChatController from '../app/controllers/ChatController';

const PostUpload = multer(MulterPostConfig);

const routes = new Router();

// Static files
routes.get('/static/profile/:file', (req, res) => {
  const { file } = req.params;
  console.log(file);
  const storedFile = path.resolve('temp', 'profile_images', `${file}`);
  return res.sendFile(storedFile);
});

routes.get('/static/post/:file', (req, res) => {
  const { file } = req.params;
  console.log(file);
  const storedFile = path.resolve('temp', 'post_images', `${file}`);
  return res.sendFile(storedFile);
});

routes.get('/static/group/:file', (req, res) => {
  const { file } = req.params;
  console.log(file);
  const storedFile = path.resolve('temp', 'group_images', `${file}`);
  return res.sendFile(storedFile);
});

const ProfileUpload = multer(MulterProfileConfig);
const GroupUpload = multer(MulterGroupConfig);

// Authentication Routes
routes.post('/login', SessionController.store);

// Create User Route
routes.post('/users', UserController.store);

// All routes below this middleware needs authorization by bearer token
routes.use(AuthMiddleware);

// Users Routes
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);
routes.get('/users', UserController.index);
routes.get('/users/:emailOrName', UserController.getUserByEmailOrName);

// Upload profile image
routes.post(
  '/profile-image',
  ProfileUpload.single('profile-image'),
  UploadProfileImageController.store
);

routes.delete('/profile-image', UploadProfileImageController.delete);

// Post routes
routes.get('/posts', PostUpload.any(), PostController.index);
routes.post('/posts', PostUpload.any(), PostController.store);
routes.put('/posts/:id', PostUpload.any(), PostController.update);
routes.delete('/posts/:id', PostUpload.any(), PostController.delete);

// Friendship routes
routes.get('/friendship', FriendshipController.index);
routes.post('/friendship', FriendshipController.store);
routes.delete('/friendship', FriendshipController.delete);

// Group routes
routes.get('/groups', GroupController.index);
routes.get('/groups/:groupName', GroupController.getByGroupName);
routes.post(
  '/groups',
  GroupUpload.single('group_image'),
  GroupController.store
);
routes.put(
  '/groups/:id',
  GroupUpload.single('group_image'),
  GroupController.update
);
routes.delete('/groups/:id', GroupController.delete);

// Feed routes
routes.get('/feed/posts/:userId', FeedController.getPosts);
routes.get('/feed/groups/:userId', FeedController.getGroups);
//funcao repetida
routes.get('/feed/user/:userId', FeedController.getPosts);
routes.get('/feed/user-feed/:userId', FeedController.getUserPosts);
routes.get('/feed/friends', FeedController.getFriends);

//Donation routes
routes.get('/donation/info', UserInfoDonationController.index);
routes.post('/donation/info', UserInfoDonationController.store);
routes.put('/donation/info', UserInfoDonationController.update);
routes.delete('/donation/info', UserInfoDonationController.delete);

routes.get('/donation/donate/', DonationController.index);
routes.post('/donation/donate/:targetId', DonationController.store);
routes.put('/donation/donate/:donationId', DonationController.update);
routes.delete('/donation/donate/:donationId', DonationController.delete);

// Follow Group routes
routes.get('/followed-groups', FollowGroupController.index);
routes.post('/groups-follow', FollowGroupController.store);
routes.delete('/unfollow-groups', FollowGroupController.delete);

// Chat routes
routes.get('/chat', ChatController.index);
routes.post('/chat/:conversation_id', ChatController.store);
routes.delete('/chat/:message_id', ChatController.delete);

module.exports = routes;
