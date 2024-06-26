import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import { LoggerReturn, LoggerTypes } from '@repo/types/api'
import { AppLogger } from './utils'
import validateEnv from './utils/validateEnv'
import invoiceRouter from './routes/invoiceRouter'
import clientRouter from './routes/clientRouter'
validateEnv()

export async function startServer() {
  const app: Express = express()
  const port = process.env.API_PORT || 3000
  app.use(require('express-status-monitor')())
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  )

  app.use(helmet())
  app.use(cors())
  app.use(express.json())
  app.use('/invoices', invoiceRouter)
  app.use('/clients', clientRouter)
  app.get('/', (req: Request, res: Response) => {
    res.send(400).json({ apiHealthy: true, apiMessage: 'API is Healthy' })
  })

  app.listen(port, () => {
    AppLogger({
      type: LoggerTypes.INFO,
      logReturn: LoggerReturn.SUCCESS,
      logMessage: `Server is running on port ${port}.`,
    })
  })
}

startServer().catch((error) => {
  console.error(`Error starting server: ${error}`)
  process.exit(1)
})
