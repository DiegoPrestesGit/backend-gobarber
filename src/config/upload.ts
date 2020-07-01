import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

const tempFolder = path.resolve(__dirname, '..', '..', 'temp')

export default {
  tempFolder,
  uploadsFolder: path.resolve(tempFolder, 'uploads'),
  diretory: tempFolder,
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'temp'),
    filename (request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}
