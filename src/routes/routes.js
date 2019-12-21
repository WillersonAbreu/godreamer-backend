import { Router } from 'express';

// Controllers
import UserController from '../app/controllers/UsersController';
import SessionController from '../app/controllers/SessionController';

// Middlewares
import AuthMiddleware from '../app/middlewares/AuthMiddleware';

const routes = new Router();

//Authentication Routes
routes.post('/login', SessionController.store);

//Create User Route
routes.post('/users', UserController.store);

// All routes under this middleware needs authorization by bearer token
routes.use(AuthMiddleware);

//Users Routes
routes.put('/users', UserController.update);
module.exports = routes;
