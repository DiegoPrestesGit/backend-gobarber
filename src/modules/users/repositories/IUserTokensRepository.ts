import UserToken from '../infra/typeorm/entities/UserToken'

export default interface IUserTokensRepository {
  generage(user_id: string): Promise<UserToken>
}
