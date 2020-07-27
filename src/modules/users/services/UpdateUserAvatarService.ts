import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

interface IRequestDTO {
  user_id: string,
  avatarFileName: string
}

@injectable()
class UpdateUserAvatarService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageRepository: IStorageProvider
  ) { }

  public async execute ({ user_id, avatarFileName }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatars', 401)
    }

    if (user.avatar) {
      await this.storageRepository.deleteFile(user.avatar)
    }

    const fileName = await this.storageRepository.saveFile(avatarFileName)
    user.avatar = fileName

    await this.usersRepository.save(user)
    return user
  }
}

export default UpdateUserAvatarService
