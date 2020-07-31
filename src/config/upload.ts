import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'

const tempFolder = path.resolve(__dirname, '..', '..', 'temp')

interface IUploadConfig {
  tempFolder: string
  uploadsFolder: string
  driver: 's3' | 'disk'

  config: {
    multer: {
      storage: StorageEngine
    }

    disk: {}

    aws: {
      bucket: string
    }
  }
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),
  diretory: tempFolder,

  config: {
    multer: {
      storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'temp'),
        filename (request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('HEX')
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      })
    },

    disk: {},

    aws: {
      bucket: 'gobarber-gostack2020'
    }
  }

} as IUploadConfig
