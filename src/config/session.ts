import { SessionOptions } from 'express-session'
import { IS_DEVELOPMENT } from './'

const HALF_HOUR = 1000 * 60 * 30

export const {
  SESSION_SECRET = 'sessionsecret',
  SESSION_NAME = 'sessioname',
  SESSION_IDLE_TIMEOUT = HALF_HOUR
} = process.env

export const SESSION_OPTIONS: SessionOptions = {
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: !IS_DEVELOPMENT,
    sameSite: true
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
}
