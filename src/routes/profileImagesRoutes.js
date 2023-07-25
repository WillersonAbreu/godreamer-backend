import { Router } from 'express'
import multer from 'multer'

import MulterProfileConfig from '../app/middlewares/MulterProfileConfigMiddleware'
import UploadProfileImageController from '../app/controllers/UploadProfileImageController'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'

const routes = new Router()

const ProfileUpload = multer(MulterProfileConfig)

// All routes below this middleware needs authorization by bearer token
routes.use(AuthMiddleware)

// Upload profile image
routes.get('/profile-image/:userId', UploadProfileImageController.index)

routes.post(
  '/profile-image/:userId',
  ProfileUpload.single('profile_image'),
  UploadProfileImageController.store,
)

routes.patch(
  '/profile-image/:userId',
  ProfileUpload.single('profile_image'),
  UploadProfileImageController.update,
)

routes.delete('/profile-image/:userId', UploadProfileImageController.delete)

module.exports = routes
