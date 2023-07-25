import { Router } from 'express'
import MetatagsController from '../app/controllers/MetatagsController'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'

const routes = new Router()

// All routes below this middleware needs authorization by bearer token
//routes.use(AuthMiddleware)

routes.post('/get-metas', MetatagsController.index)

module.exports = routes
