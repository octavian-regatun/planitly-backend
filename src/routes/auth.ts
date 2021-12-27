// authentication only with google at the moment

import { Router } from 'express'

const authRouter = Router()

authRouter.post('/', (req, res) => {
  return res.sendStatus(200)
})

export default authRouter
