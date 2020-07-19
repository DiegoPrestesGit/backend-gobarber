import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

export default interface IFindAllInMonthProviderDTO {
  provider_id: string
  month: number
  year: number
}
