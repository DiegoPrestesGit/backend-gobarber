import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProfileController from '@modules/users/infra/http/controllers/ProfileController'

const profileRouter = Router()
profileRouter.use(ensureAuthenticaded)

const profileController = new ProfileController()

profileRouter.get('/', profileController.show)
profileRouter.put('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
  }),
  profileController.update
)

export default profileRouter
