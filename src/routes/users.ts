import { Router } from 'express'
import db from '../lib/prisma'

const usersRouter = Router()

interface Params {
  id: string
}

usersRouter.get('/', (req, res) => {
  void (async () => {
    return res.sendStatus(200)
  })()
})

usersRouter.get('/:id', (req, res) => {
  void (async () => {
    const { id }: Params = req.params

    if (id === req.id) {
      return res.send(await db.user.findUnique({ where: { id } }))
    } else {
      return res.sendStatus(404)
    }
  })()
})

export default usersRouter
