import { getHours, isAfter } from 'date-fns'
import 'reflect-metadata'
import { inject, injectable } from 'tsyringe'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string
  day: number
  month: number
  year: number
}

type IResponse = Array <{
  hour: number
  available: boolean
}>

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor (
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository) {}

  public async execute ({ provider_id, day, month, year }: IRequestDTO): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year
    })

    const hourStart = 8

    const eachHourArray = Array.from({ length: 10 }, (_, index) => index + hourStart)

    const currentDate = new Date(Date.now())

    const availability = eachHourArray.map(hour => {
      const hasAppointment = appointments.find(appointment =>
        getHours(appointment.date) === hour)

      const appointmentDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppointment && isAfter(appointmentDate, currentDate)
      }
    })

    return availability
  }
}
