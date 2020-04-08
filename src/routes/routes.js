import { Router } from 'express';
import multer from 'multer';

// Controllers
import UserController from '../app/controllers/UsersController';
import SessionController from '../app/controllers/SessionController';
import PostController from '../app/controllers/PostController';
import UploadProfileImageController from '../app/controllers/UploadProfileImageController';
import GroupController from '../app/controllers/GroupController';

// Middlewares
import AuthMiddleware from '../app/middlewares/AuthMiddleware';
import MulterProfileConfig from '../app/middlewares/MulterProfileConfigMiddleware';
import MulterPostConfig from '../app/middlewares/MulterPostConfigMiddleware';
import FriendshipController from '../app/controllers/FriendshipController';
import MulterGroupConfig from '../app/middlewares/MulterGroupConfigMiddleware';

const PostUpload = multer(MulterPostConfig);

const routes = new Router();
const ProfileUpload = multer(MulterProfileConfig);
const GroupUpload = multer(MulterGroupConfig);

// Websocket test
routes.get('/', (req, res) => {
  res.sendFile(`index.html`, { root: __dirname });
});

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
// routes.put('/friendship', FriendshipController.update);
routes.delete('/friendship', FriendshipController.delete);
// Group routes
routes.post(
  '/groups',
  GroupUpload.single('group_image'),
  GroupController.store
);

// Upload images in post
// routes.post(
//   '/post-image',
//   PostUpload.single(),
//   UploadPostImageController.store
// );

module.exports = routes;
