import { Router } from 'express'
import authRouter from './auth'

const router = Router()

router.use('/auth', authRouter)

router.get('/', (req, res) => {
  return res.sendStatus(200)
})

export default router
