import IMailTemplateProvider from '../models/IMailTemplateProvider'
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO'

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse ({ template, variable }: IParseMailTemplateDTO): Promise<string> {
    return template
  }
}
