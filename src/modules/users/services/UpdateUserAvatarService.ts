import { getRepository } from 'typeorm'

import path from 'path'
import fs from 'fs'

import AppError from '@shared/errors/AppError'
import User from '@modules/users/infra/typeorm/entities/User'
import uploadConfig from '@config/upload'

interface RequestDTO {
  user_id: string,
  avatarFileName: string
}

class UpdateUserAvatarService {
  public async execute ({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatars', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.diretory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFileName

    await usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
