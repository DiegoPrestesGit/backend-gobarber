export default interface IHashProider {
  generateHash(payload: string): Promise<string>
  compareHash(payload:string, hashed: string): Promise<boolean>
}
