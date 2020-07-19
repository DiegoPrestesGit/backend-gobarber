import { injectable, inject } from 'tsyringe'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string
  month: number
  year: number
}

type IResponse = Array <{
  day: number
  available: boolean
}>

@injectable()
export default class ListProviderAvailabilityService {
  constructor (
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute ({ provider_id, month, year }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      year
    })

    return appointments
  }
}
