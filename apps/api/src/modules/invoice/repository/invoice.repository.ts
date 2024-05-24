import { PrismaClient } from '@repo/database-tools'
import { LoggerReturn, LoggerTypes, InvoicePDFData, HttpStatusMessages } from '@repo/types/'
import { AppLogger } from '~/utils'
import { filterInvoiceDataToDatabase } from '~/utils/invoice/invoiceHandler'

export default class InvoiceRepository {
  static prismaClient: PrismaClient = new PrismaClient()

  static async getById(clientNumber: string) {
    const clientNumberFormatted = Number(clientNumber)
    try {
      const invoices = await this.prismaClient.invoice.findMany({
        where: {
          clientNumber: clientNumberFormatted,
        },
      })
      return invoices
    } catch (error) {
      AppLogger({
        logReturn: LoggerReturn.ERROR,
        type: LoggerTypes.DATABASE_ERROR,
        logMessage: `${HttpStatusMessages.ERROR_GETIING_ALL_INVOICES} ${error.errorMessage}`,
      })
      return error
    }
  }

  static async get() {
    try {
      const allInvoices = await this.prismaClient.invoice.findMany()
      return allInvoices
    } catch (error) {
      AppLogger({
        logReturn: LoggerReturn.ERROR,
        type: LoggerTypes.DATABASE_ERROR,
        logMessage: `${HttpStatusMessages.ERROR_GETIING_ALL_INVOICES} ${error.errorMessage}`,
      })
    }
  }
  static async create(invoiceData: InvoicePDFData[]) {
    const newInvoiceData = filterInvoiceDataToDatabase(invoiceData)
    const createdInvoices = []
    const notCreatedInvoices = []

    try {
      for (const data of newInvoiceData) {
        const existingInvoice = await this.prismaClient.invoice.findFirst({
          where: {
            clientNumber: data.clientNumber,
            referenceMonth: data.referenceMonth,
          },
        })

        if (!existingInvoice) {
          await this.prismaClient.invoice.create({
            data,
          })
          createdInvoices.push(data)
        } else {
          notCreatedInvoices.push(data)
        }
      }
      return { createdInvoices, notCreatedInvoices }
    } catch (error) {
      AppLogger({
        type: LoggerTypes.INFO,
        logReturn: LoggerReturn.ERROR,
        logMessage: `${HttpStatusMessages.ERROR_CREATING_INVOICES} ${error}`,
      })
      throw error
    }
  }
}
