import { Router } from 'express'
import UserController from '../app/controllers/UsersController'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'

const routes = new Router()

// Create User Route
routes.post('/users', UserController.store)

// All routes below this middleware needs authorization by bearer token
routes.use(AuthMiddleware)

// Users Routes
routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)
routes.get('/users', UserController.index)
routes.get('/users/:emailOrName', UserController.getUsersByLikeEmailOrName)

module.exports = routes
