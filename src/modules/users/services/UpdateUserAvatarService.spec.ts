import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatarService: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()
    updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider)
  })
  it('should be able to update an user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should not be able to update avatar from a non existing user', async () => {
    await expect(updateUserAvatarService.execute({
      user_id: 'do-not-exist',
      avatarFileName: 'avatar.jpg'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when a new one is updated', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const user = await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    })

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg')
  })
})
