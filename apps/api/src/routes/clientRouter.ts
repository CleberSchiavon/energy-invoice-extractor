import express, { Request, Response, Router } from 'express'
import ClientContoller from '~/modules/client/controllers/client.controller'

const clientRouter: Router = express.Router()

clientRouter.get('', async (request: Request, response: Response) => {
  try {
    const clients = await ClientContoller.listAllClients(response)
    return response.status(200).json(clients)
  } catch (error) {
    return response.status(400).json(error)
  }
})

clientRouter.get('/:clientNumber', async (request: Request, response: Response) => {
  try {
    const client = await ClientContoller.listClient(request)
    return response.status(200).json(client)
  } catch (error) {
    return response.status(400).json(error)
  }
})

export default clientRouter
