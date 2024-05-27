import { PrismaClient } from '@prisma/client'
import {
  ClientDatabaseData,
  HttpStatusMessages,
  InvoiceDatabaseType,
  InvoiceFilterReturn,
  LoggerReturn,
  LoggerTypes,
} from '@repo/types'
import InvoiceRepository from '~/modules/invoice/repository/invoice.repository'
import { AppLogger } from '~/utils'
import { ErrorHandling } from '~/utils/ErrorHandling'
import { calculateAndReturnInvoices } from '~/utils/client/clientInvoice'

export default class ClientRepository {
  private static prismaClient: PrismaClient = new PrismaClient()

  static async create(clientInvoice: InvoiceFilterReturn): Promise<ClientDatabaseData> {
    try {
      const createdClient = await this.prismaClient.client.create({
        data: {
          clientNumber: clientInvoice.clientNumber,
        },
      })

      await this.prismaClient.invoice.create({
        data: clientInvoice,
      })
      const allUsersInvoices = await InvoiceRepository.getById(createdClient.clientNumber)

      const updatedClient = await this.prismaClient.client.update({
        where: {
          id: createdClient.id,
        },
        data: {
          ...calculateAndReturnInvoices(allUsersInvoices),
        },
      })
      return updatedClient
    } catch (error) {
      AppLogger({
        type: LoggerTypes.INFO,
        logReturn: LoggerReturn.ERROR,
        logMessage: `${HttpStatusMessages.CREATE_CLIENT_ERROR} ${error}`,
      })
      throw error
    }
  }

  static async update(
    client: ClientDatabaseData,
    clientInvoice: InvoiceFilterReturn,
  ): Promise<ClientDatabaseData> {
    try {
      const existingInvoice = await this.prismaClient.invoice.findFirst({
        where: {
          clientNumber: client.clientNumber,
          referenceMonth: clientInvoice.referenceMonth,
        },
      })
      if (existingInvoice) {
        throw ErrorHandling(
          400,
          `${HttpStatusMessages.INVOICE_ALREADY_EXISTS} ${existingInvoice.id}`,
        )
      }
      const allUsersInvoices = await InvoiceRepository.getById(client.clientNumber)
      const updatedClient = await this.prismaClient.client.update({
        where: {
          id: client.id,
          clientNumber: client.clientNumber,
        },
        data: {
          invoices: {
            create: clientInvoice,
          },
          ...calculateAndReturnInvoices(allUsersInvoices),
        },
      })
      return updatedClient
    } catch (error) {
      AppLogger({
        type: LoggerTypes.DATABASE_ERROR,
        logReturn: LoggerReturn.ERROR,
        logMessage: `${error.errorMessage}`,
      })
      throw error
    }
  }

  static async listAll(): Promise<ClientDatabaseData[]> {
    try {
      const allClients = await this.prismaClient.client.findMany()
      return allClients
    } catch (error) {
      AppLogger({
        type: LoggerTypes.DATABASE_ERROR,
        logReturn: LoggerReturn.ERROR,
        logMessage: `${HttpStatusMessages.GET_CLIENT_ERROR}`,
      })
      throw error
    }
  }

  static async getById(clientNumber: number): Promise<ClientDatabaseData | null> {
    try {
      const client = await this.prismaClient.client.findFirst({
        where: {
          clientNumber: clientNumber,
        },
      })
      return client
    } catch (error) {
      AppLogger({
        type: LoggerTypes.DATABASE_ERROR,
        logReturn: LoggerReturn.ERROR,
        logMessage: `${HttpStatusMessages.GET_CLIENT_ERROR} ${clientNumber} ${error}`,
      })
      throw error
    }
  }
}
