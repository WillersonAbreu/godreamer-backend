import { Router } from 'express'
import DonationController from '../app/controllers/DonationController'
import UserInfoDonationController from '../app/controllers/UserInfoDonationController'
import AuthMiddleware from '../app/middlewares/AuthMiddleware'

const routes = new Router()

// All routes below this middleware needs authorization by bearer token
routes.use(AuthMiddleware)

//Donation routes
routes.get('/donation/info/:groupOwnerId', UserInfoDonationController.index)
routes.post('/donation/info', UserInfoDonationController.store)
routes.put('/donation/info/:userId', UserInfoDonationController.update)
routes.delete('/donation/info', UserInfoDonationController.delete)

routes.get('/donation/donate/', DonationController.index)
routes.post('/donation/donate/:targetId', DonationController.store)
routes.put('/donation/donate/:donationId', DonationController.update)
routes.delete('/donation/donate/:donationId', DonationController.delete)

module.exports = routes
