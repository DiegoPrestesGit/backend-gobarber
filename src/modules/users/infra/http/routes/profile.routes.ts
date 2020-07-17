import { Router } from 'express'

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

const profileRouter = Router()
profileRouter.use(ensureAuthenticaded)

const profileController = new ProfileController()

profileRouter.put('/', profileController.update)

export default profileRouter
