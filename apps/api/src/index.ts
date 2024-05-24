import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import { LoggerReturn, LoggerTypes } from '@repo/types/api'
import { AppLogger } from './utils'
import validateEnv from './utils/validateEnv'
import invoiceRouter from './routes/invoiceRouter'
import { PrismaClient } from '@repo/database-tools'
validateEnv()

export async function startServer() {
  const app: Express = express()
  const port = process.env.API_PORT || 3000
  const prisma = new PrismaClient()
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
  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript')
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
