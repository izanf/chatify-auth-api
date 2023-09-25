import { Request, Response } from 'express'
import { SESSION_NAME } from './config'

declare module 'express-session' {
  interface Session {
    token: string
  }
}

export const isLoggedIn = (req: Request) => !!req.session!.token

export const logOut = (req: Request, res: Response) =>
  new Promise((resolve, reject) => {
    req.session!.destroy((error: Error) => {
      if (error) reject(error)

      res.clearCookie(SESSION_NAME)

      resolve(null)
    })
  }
)
