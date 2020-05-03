import Appointment from '../models/Appointment'
import appointmentsRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'

interface RequestDTO {
  provider: string,
  date: Date
}

class CreateAppointmentService {
  private appointmentsRepository: appointmentsRepository

  constructor (appointmentsRepository: appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute ({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error('bad time to cut your hair, mate')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
