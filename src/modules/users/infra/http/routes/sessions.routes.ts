import { Router } from 'express'
import { container } from 'tsyringe'

import SessionsController from '@modules/users/infra/http/controllers/SessionsController'

const sessionRouter = Router()
const sessionsController = new SessionsController()

sessionRouter.post('/', sessionsController.create)

export default sessionRouter
