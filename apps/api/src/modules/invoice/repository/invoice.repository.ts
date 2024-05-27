import { PrismaClient } from '@repo/database-tools'
import { LoggerReturn, LoggerTypes, InvoicePDFData, HttpStatusMessages } from '@repo/types/'
import { AppLogger } from '~/utils'
import { filterInvoiceDataToDatabase } from '~/utils/invoice/invoiceHandler'
import ClientRepository from '~/modules/client/repository/client.repository'
export default class InvoiceRepository {
  private static prismaClient: PrismaClient = new PrismaClient()

  static async getById(clientNumber: number): Promise<any[]> {
    try {
      const invoices = await this.prismaClient.invoice.findMany({
        where: {
          clientNumber: clientNumber,
        },
      })
      return invoices
    } catch (error) {
      AppLogger({
        logReturn: LoggerReturn.ERROR,
        type: LoggerTypes.DATABASE_ERROR,
        logMessage: `${HttpStatusMessages.ERROR_GETTING_INVOICE} ${error.message}`,
      })
      throw error
    }
  }

  static async get(): Promise<any[]> {
    try {
      const allInvoices = await this.prismaClient.invoice.findMany()
      return allInvoices
    } catch (error) {
      AppLogger({
        logReturn: LoggerReturn.ERROR,
        type: LoggerTypes.DATABASE_ERROR,
        logMessage: `${HttpStatusMessages.ERROR_GETIING_ALL_INVOICES} ${error.message}`,
      })
      throw error
    }
  }

  static async create(invoiceData: InvoicePDFData[]): Promise<{
    createdInvoices: any[]
    notCreatedInvoices: any[]
  }> {
    const newInvoiceData = filterInvoiceDataToDatabase(invoiceData)
    const createdInvoices: any[] = []
    const notCreatedInvoices: any[] = []

    try {
      for (const clientInvoice of newInvoiceData) {
        const existingClient = await this.prismaClient.client.findFirst({
          where: {
            clientNumber: clientInvoice.clientNumber,
          },
        })

        if (!existingClient) {
          try {
            await ClientRepository.create(clientInvoice)
            createdInvoices.push(clientInvoice)
          } catch (error) {
            notCreatedInvoices.push(clientInvoice)
          }
        } else {
          try {
            await ClientRepository.update(existingClient, clientInvoice)
            createdInvoices.push(clientInvoice)
          } catch (error) {
            notCreatedInvoices.push(clientInvoice)
          }
        }
      }
      return { createdInvoices, notCreatedInvoices }
    } catch (error) {
      AppLogger({
        type: LoggerTypes.DATABASE_ERROR,
        logReturn: LoggerReturn.ERROR,
        logMessage: `${HttpStatusMessages.ERROR_CREATING_INVOICES} ${error.message}`,
      })
      return error
    }
  }
}
