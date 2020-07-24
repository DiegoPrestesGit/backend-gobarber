import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

let listProviderDayAvailabilityService: ListProviderDayAvailabilityService
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository)
  })

  it('should be able to list the hours availability from provider in the day', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0)
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime()
    })

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 5,
      day: 20
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: true },
      { hour: 10, available: false },
      { hour: 11, available: true }
    ]))
  })
})
