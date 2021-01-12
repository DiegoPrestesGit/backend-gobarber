import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

export default class ProfileController {
  public async show (request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const showProfile = container.resolve(ShowProfileService)
    const user = await showProfile.execute({ user_id })

    delete user.password

    return response.json(classToClass(user))
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, email, old_password, password, password_confirmation } = request.body

    const updateUser = container.resolve(UpdateProfileService)

    const user = await updateUser.execute({ user_id, name, email, old_password, password, password_confirmation })

    return response.json(classToClass(user))
  }
}
