
import ListProviderAppointmentsService from './ListProviderAppointmentsService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

let listProviderAppointmentsService: ListProviderAppointmentsService
let fakeAppointmentsRepository: FakeAppointmentsRepository

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmentsRepository)
  })

  it('should be able to list the appointments of the especific day', async () => {
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
