// authentication only with google at the moment

import { User } from '@prisma/client'
import { Router } from 'express'
import { createJwt, getPayload } from '../lib/jwt'
import db from '../lib/prisma'
import { isUserInDatabase, saveUser } from '../lib/user'

const authRouter = Router()

interface Body{
  tokenId?: string
}

authRouter.post('/', (req, res) => {
  void (async () => {
    const { tokenId }: Body = req.body

    if (tokenId === undefined) return res.sendStatus(400)

    const payload = await getPayload(tokenId)

    if (await isUserInDatabase(parseInt(payload.sub, 10))) {
      const existingUser = await db.user.findUnique({ where: { id: parseInt(payload.sub, 10) } }) as User

      return res.send(createJwt(existingUser))
    } else {
      const newUser = await saveUser(payload)

      const jwt = createJwt(newUser)

      res.send(jwt)
    }
  })()
})

export default authRouter
