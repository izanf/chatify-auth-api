import { Router } from 'express'
import { guest, auth, catchAsync } from '../middlewares'

import UserController from './controller'

const router = Router()
const userController = new UserController()

router.post('/v1/signup', guest, catchAsync(userController.createUser))

router.post('/v1/signin', guest, catchAsync(userController.login))

router.post('/v1/signout', auth, catchAsync(userController.logout))

export default router
