import fs from 'fs'
import path from 'path'

import aws, { S3 } from 'aws-sdk'
import uploadConfig from '@config/upload'
import IStorageProvider from '../models/IStorageProvider'

export default class DiskStorageProvider implements IStorageProvider {
  private client: S3

  constructor () {
    this.client = new aws.S3({
      region: 'us-east-2'
    })
  }

  public async saveFile (file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tempFolder, file)

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8'
    })

    await this.client.putObject({
      Bucket: 'gobarber-gostack2020',
      Key: __filename,
      ACL: 'public-read',
      Body: fileContent
    }).promise()

    return file
  }

  public async deleteFile (file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file)

    try {
      await fs.promises.stat(filePath)
    } catch {
    }

    await fs.promises.unlink(filePath)
  }
}
