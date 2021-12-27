import _dotenv from 'dotenv'
import express from 'express'
import { PORT } from './lib/constants'
import router from './routes/router'

_dotenv.config()

const app = express()

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
