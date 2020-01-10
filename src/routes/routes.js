import { Router } from 'express';
import multer from 'multer';

// Controllers
import UserController from '../app/controllers/UsersController';
import SessionController from '../app/controllers/SessionController';

// Middlewares
import AuthMiddleware from '../app/middlewares/AuthMiddleware';
import MulterConfig from '../config/multer';
import UploadProfileImageController from '../app/controllers/UploadProfileImageController';

const routes = new Router();
const ProfileUpload = multer(MulterConfig);

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

module.exports = routes;
