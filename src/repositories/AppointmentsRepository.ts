import Appointment from '../models/Appointment'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate (date: Date): Promise<Appointment | null> {
    const findAppointent = await this.findOne({
      where: { date }

    })

    return findAppointent || null
  }
}

export default AppointmentsRepository
