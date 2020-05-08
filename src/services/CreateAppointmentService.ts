import Appointment from '../models/Appointment'
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface RequestDTO {
  provider: string,
  date: Date
}

class CreateAppointmentService {
  public async execute ({ provider, date }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error('bad time to cut your hair, mate')
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
