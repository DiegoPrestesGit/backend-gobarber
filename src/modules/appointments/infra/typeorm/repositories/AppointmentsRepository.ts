import { getMonth, getYear } from 'date-fns'
import { getRepository, Repository, Raw } from 'typeorm'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor () {
    this.ormRepository = getRepository(Appointment)
  }

  public async create ({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date })

    await this.ormRepository.save(appointment)

    return appointment
  }

  public async findByDate (date: Date): Promise<Appointment | undefined> {
    const findAppointent = await this.ormRepository.findOne({
      where: { date }
    })

    return findAppointent || undefined
  }

  public async findAllInMonthFromProvider ({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0')

    const allAppointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        )
      }
    })

    return allAppointments
  }
}

export default AppointmentsRepository
