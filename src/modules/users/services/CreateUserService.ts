import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequestDTO {
  name: string,
  email: string,
  password: string
}

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository) {}

  public async execute ({ name, email, password }: IRequestDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email adress already')
    }

    const hashedPass = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPass
    })

    return user
  }
}

export default CreateUserService
