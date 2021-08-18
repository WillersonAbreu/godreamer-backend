import { Router } from 'express'
import multer from 'multer'

import PostController from '../app/controllers/PostController'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'
import MulterPostConfig from '../app/middlewares/MulterPostConfigMiddleware'

const PostUpload = multer(MulterPostConfig)
const routes = new Router()

// All routes below this middleware needs authorization by bearer token
routes.use(AuthMiddleware)

// Post routes
routes.get('/posts', PostUpload.any(), PostController.index)
routes.post('/posts', PostUpload.any(), PostController.store)
routes.put('/posts/:id', PostUpload.any(), PostController.update)
routes.delete('/posts/:id', PostUpload.any(), PostController.delete)

module.exports = routes
