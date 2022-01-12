import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import JwtPayload from '../interfaces/jwtPayload.interface'
import { JWT_SECRET } from '../lib/constants'

export default function isAuthenticated (req: Request, res: Response, next: NextFunction): void {
  const bearerHeader = req.headers.authorization

  if (bearerHeader !== undefined) {
    const bearer = bearerHeader.split(' ')
    const token = bearer[1]

    jwt.verify(token, JWT_SECRET, (error, jwtPayload) => {
      if (error !== null) {
        res.sendStatus(403)
      } else {
        const { id } = jwtPayload as JwtPayload

        req.id = id

        next()
      }
    })
  } else {
    res.sendStatus(403)
  }
}
