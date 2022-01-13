import express from 'express'
import { PORT } from './lib/constants'
import router from './routes/router'

const app = express()



app.use('/', router)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
