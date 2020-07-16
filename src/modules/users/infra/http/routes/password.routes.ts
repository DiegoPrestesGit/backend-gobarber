import { Router } from 'express'

import ForgotPasswordController from '@modules/users/infra/http/controllers/ForgotPasswordController'
import ResetPasswordController from '@modules/users/infra/http/controllers/ResetPasswordController'

const sessionRouter = Router()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

sessionRouter.post('/forgot', forgotPasswordController.create)
sessionRouter.post('/reset', resetPasswordController.create)

export default sessionRouter
