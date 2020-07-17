import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

import routes from '@shared/infra/http/routes/index.routes'

import '@shared/infra/typeorm'
import '@shared/container/index'

const app = express()
app.use(cors())

app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

app.listen(3333, () => {
  console.log('all right')
})
