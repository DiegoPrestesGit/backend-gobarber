import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequestDTO {
  user_id: string,
  name: string,
  email: string,
  old_password?: string,
  password?: string
}

@injectable()
export default class UpdateProfileService {
  constructor (
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute ({ user_id, name, email, old_password, password }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('User not found')
    }

    const userUpdatedEmail = await this.usersRepository.findByEmail(email)

    if (userUpdatedEmail && userUpdatedEmail.id !== user.id) {
      throw new AppError('Email already taken')
    }

    user.name = name
    user.email = email

    if (password && !old_password) {
      throw new AppError('Inform the old password, mate')
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password
      )

      if (!checkOldPassword) {
        throw new AppError('old password does not match')
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    return this.usersRepository.save(user)
  }
}
