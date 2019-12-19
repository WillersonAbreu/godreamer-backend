import { Router } from 'express';

// Controllers
import UserController from '../app/controllers/UsersController';
import SessionController from '../app/controllers/SessionController';

const routes = new Router();

//Authentication Routes
routes.post('/login', SessionController.store);

//Users Routes
routes.post('/users', UserController.store);

module.exports = routes;
