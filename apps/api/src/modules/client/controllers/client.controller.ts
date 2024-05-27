import { HttpStatusMessages, LoggerReturn, LoggerTypes } from '@repo/types'
import { Request, Response } from 'express'
import { ErrorHandling } from '~/utils/ErrorHandling'
import { AppLogger } from '~/utils'
import ClientRepository from '../repository/client.repository'

export default class ClientContoller {
  static async listAllClients(response: Response) {
    try {
      const clients = await ClientRepository.listAll()
      response.status(200).json(clients)
    } catch (error) {
      ErrorHandling(500, HttpStatusMessages.GET_CLIENT_ERROR)
    }
  }
  static async listClient(request: Request) {
    const clientNumber = Number(request.params.clientNumber)
    console.log(clientNumber)
    try {
      const client = await ClientRepository.getById(clientNumber)
      if (!client) {
        throw ErrorHandling(400, HttpStatusMessages.GET_CLIENT_NOT_FOUND)
      }
      return client
    } catch (error) {
      AppLogger({
        logMessage: HttpStatusMessages.GET_CLIENT_ERROR,
        logReturn: LoggerReturn.ERROR,
        type: LoggerTypes.SERVER,
      })
      throw error
    }
  }
}
