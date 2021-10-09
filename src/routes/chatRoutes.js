import { Router } from 'express'
import ChatController from '../app/controllers/ChatController'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'

const routes = new Router()

// Chat routes
routes.get('/chat', ChatController.index)
routes.get('/chat/get/:conversation_id', ChatController.getConversations)
routes.post('/chat/:conversation_id', ChatController.store)
routes.delete('/chat/:message_id', ChatController.delete)

// All routes below this middleware needs authorization by bearer token
routes.use(AuthMiddleware)

module.exports = routes
