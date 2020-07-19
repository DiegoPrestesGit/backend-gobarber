import { uuid } from 'uuidv4'
import { isEqual, getMonth, getYear } from 'date-fns'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async create ({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }

  public async findByDate (date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(app => isEqual(app.date, date))

    return findAppointment
  }

  public async findAllInMonthFromProvider ({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const allAppointments = this.appointments.filter(app =>
      app.provider_id === provider_id &&
      getMonth(app.date) + 1 === month &&
      getYear(app.date) === year
    )

    return allAppointments
  }
}

export default FakeAppointmentsRepository
