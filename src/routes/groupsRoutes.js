import { Router } from 'express'
import multer from 'multer'
import GroupController from '../app/controllers/GroupController'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'
import MulterGroupConfig from '../app/middlewares/MulterGroupConfigMiddleware'

const GroupUpload = multer(MulterGroupConfig)
const routes = new Router()

// All routes below this middleware needs authorization by bearer token
routes.use(AuthMiddleware)

// Group routes
routes.get('/groups', GroupController.index)
routes.get('/groups/by-id/:groupId', GroupController.byId)
routes.get('/groups/:groupName', GroupController.getByGroupName)
routes.post('/groups', GroupUpload.single('group_image'), GroupController.store)
routes.put(
  '/groups/:id',
  GroupUpload.single('group_image'),
  GroupController.update,
)
routes.delete('/groups/:id', GroupController.delete)

module.exports = routes
