import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'

import AppDataSource from '../config/db'
import UserModel from './model'

import { JWT_SECRET } from '../config'
import { logOut } from '../auth'

declare module 'express-session' {
  interface Session {
    token: string
  }
}

export default class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { email, name, password } = req.body
      const found = await AppDataSource.manager.exists(UserModel, { where: { email } })
      
      if (found) throw 'User already exists'
      if (!name.length || !password.length) throw 'Invalid name or password'

      const newUser = new UserModel()
      newUser.email = email
      newUser.name = name
      newUser.password = password
      newUser.isActive = true

      await AppDataSource.manager.save(newUser)
      
      res.status(201).send('User created successfully.')
    } catch (error) {
      res.status(400).send(error)
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const response = await AppDataSource.manager.findOne(UserModel, { where: { email } })
      const passwordValid = await compare(password, response!.password)

      if (!response || !passwordValid) throw 'Email or password is invalid.'
      if (!response.isActive) throw 'User is not active'

      const token = jwt.sign({ response }, JWT_SECRET, { expiresIn: '1d' })

      req.session!.token = token

      res.send({ token })
    } catch (error) {
      res.status(400).send(error) 
    }
  }

  async verifyJWT(req: Request, res: Response) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, JWT_SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    })

    return true
  }

  async logout(req: Request, res: Response) {
    await logOut(req, res)

    res.send('User logged out successfully.')
  }
}
