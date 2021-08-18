import { Router } from 'express'
import FeedController from '../app/controllers/FeedController'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'

const routes = new Router()

// All routes below this middleware needs authorization by bearer token
routes.use(AuthMiddleware)

// Feed routes
routes.get('/feed/posts/:userId', FeedController.getPosts)
routes.get('/feed/specific/user/:userId', FeedController.getSpecificUserPosts)
routes.get('/feed/groups/:userId', FeedController.getGroups)
routes.get('/feed/own/groups/:userId', FeedController.getOwnGroups)
//funcao repetida
routes.get('/feed/user/:userId', FeedController.getPosts)
routes.get('/feed/user-feed/:userId', FeedController.getUserPosts)
routes.get('/feed/friends', FeedController.getFriends)

module.exports = routes
