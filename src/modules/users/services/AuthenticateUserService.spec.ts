import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCashProvider'
import AuthenticateUser from './AuthenticateUserService'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let fakeCacheProvider: FakeCacheProvider
let authenticateUser: AuthenticateUser

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()
    authenticateUser = new AuthenticateUser(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(authenticateUser.execute({
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    await expect(authenticateUser.execute({
      email: 'johnnycasher@gloiro.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError)
  })
})
