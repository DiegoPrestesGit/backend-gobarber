import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import { isAfter, addHours } from 'date-fns'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequestDTO {
  password: string,
  token: string
}

@injectable()
export default class ResetPasswordService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute ({ password, token }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User token does not exists')
    }

    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.usersRepository.save(user)
  }
}
