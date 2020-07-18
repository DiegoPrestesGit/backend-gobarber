import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfile from './UpdateProfileService'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let fakeHashProvider: FakeHashProvider

let updateProfile: UpdateProfile

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeStorageProvider = new FakeStorageProvider()
    fakeHashProvider = new FakeHashProvider()
    updateProfile = new UpdateProfile(fakeUsersRepository, fakeHashProvider)
  })
  it('should be able to update his profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Johnny Dogs',
      email: 'johnnydogs@gloiro.com'
    })

    expect(updatedUser.name).toBe('Johnny Dogs')
    expect(updatedUser.email).toBe('johnnydogs@gloiro.com')
  })

  it('should not be able to update the file of a non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'IT DOES NOT EXISTS',
      name: 'Izzy Stradlin',
      email: 'hedoesnotexist@xesquedele.com'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the file of a non-existing user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycash@gloiro.com',
      password: '123456'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Johnny Cash',
      email: 'johnnycash@gloiro.com',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update his email to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const user = await fakeUsersRepository.create({
      name: 'Johnny Dogs',
      email: 'johnnydogs@gloiro.com',
      password: '123456'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Johnny Test',
      email: 'johnnycasher@gloiro.com'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Johnny Dogs',
      email: 'johnnydogs@gloiro.com',
      old_password: '123456',
      password: '123123'
    })

    expect(updatedUser.password).toBe('123123')
  })

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Johnny Dogs',
      email: 'johnnydogs@gloiro.com',
      old_password: '123456',
      password: '123123'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Johnny Dogs',
      email: 'johnnydogs@gloiro.com',
      old_password: 'wrong-old-password',
      password: '123123'
    })).rejects.toBeInstanceOf(AppError)
  })
})
