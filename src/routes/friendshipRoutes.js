import { Router } from 'express'
import FriendshipController from '../app/controllers/FriendshipController'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'

const routes = new Router()

// All routes below this middleware needs authorization by bearer token
routes.use(AuthMiddleware)

// Friendship routes
routes.get('/friendship', FriendshipController.index)
routes.post('/friendship', FriendshipController.store)
routes.delete(`/friendship/:idUser`, FriendshipController.delete)

module.exports = routes
