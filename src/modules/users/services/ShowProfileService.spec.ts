import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Johnny Cash',
      email: 'johnnycasher@gloiro.com',
      password: '123456'
    })

    const profile = await showProfile.execute({ user_id: user.id })

    expect(profile.email).toBe('johnnycasher@gloiro.com')
    expect(profile.name).toBe('Johnny Cash')
  })

  it('should not be able to show the profile of a non-existing user', async () => {
    expect(showProfile.execute({
      user_id: 'DO. NOT. EXISTS'
    })).rejects.toBeInstanceOf(AppError)
  })
})
