interface IMailConfig {
  driver: 'ethereal' | 'ses'

  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'diego@dpsynth.com',
      name: 'Diego Prestes'
    }
  }
} as IMailConfig
