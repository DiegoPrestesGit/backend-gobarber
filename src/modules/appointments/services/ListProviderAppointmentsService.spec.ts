
import ListProviderAppointmentsService from './ListProviderAppointmentsService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCashProvider'

let fakeCacheProvider: FakeCacheProvider
let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderAppointmentsService: ListProviderAppointmentsService

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()
    listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository, fakeCacheProvider)
  })

  it('should be able to list the appointments of the specific day', async () => {
    const app1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    })

    const app2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    })

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20
    })

    expect(appointments).toEqual([app1, app2])
  })
})
