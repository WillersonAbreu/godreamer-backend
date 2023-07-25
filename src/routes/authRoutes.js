import { Router } from 'express'
import SessionController from '../app/controllers/SessionController'

const routes = new Router()

// Authentication Routes
routes.post('/login', SessionController.store)

module.exports = routes
