import express, { Response } from 'express'
import session, { Store } from 'express-session'

import { SESSION_OPTIONS } from "./config"

import userRouter from './User/router'

const createApp = (store: Store) => {
  const app = express()
  app.use(express.json())

  app.use(session({
    ...SESSION_OPTIONS,
    store
  }))

  app.get('/', (req, res: Response) => res.send('Working.'))

  app.use(userRouter)

  return app
}

export default createApp
