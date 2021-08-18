import { Router } from 'express'
import path from 'path'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'

const routes = new Router()

// All routes below this middleware needs authorization by bearer token
routes.use(AuthMiddleware)

// Static files
routes.get('/static/profile/:file', (req, res) => {
  const { file } = req.params
  const storedFile = path.resolve('temp', 'profile_images', `${file}`)
  return res.sendFile(storedFile)
})

routes.get('/static/post/:file', (req, res) => {
  const { file } = req.params
  const storedFile = path.resolve('temp', 'post_images', `${file}`)
  return res.sendFile(storedFile)
})

routes.get('/static/group/:file', (req, res) => {
  const { file } = req.params
  const storedFile = path.resolve('temp', 'group_images', `${file}`)
  return res.sendFile(storedFile)
})

module.exports = routes
