import { Router } from 'express'
import FollowGroupController from '../app/controllers/FollowGroupController'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'

const routes = new Router()

// All routes below this middleware needs authorization by bearer token
//routes.use(AuthMiddleware)

// Follow Group routes
routes.get('/followed-groups/:userId', FollowGroupController.index)
routes.post('/groups-follow', FollowGroupController.store)
routes.delete('/groups-unfollow/:groupId', FollowGroupController.delete)

module.exports = routes
