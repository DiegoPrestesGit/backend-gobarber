import { Router } from 'express'

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import multer from 'multer'
import uploadConfig from '@config/upload'
import UsersController from '@modules/users/infra/http/controllers/UsersController'
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController'

const usersRouter = Router()
const upload = multer(uploadConfig)
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

usersRouter.post('/', usersController.create)

usersRouter.patch('/avatar',
  ensureAuthenticaded,
  upload.single('avatar'),
  userAvatarController.update
)

export default usersRouter
