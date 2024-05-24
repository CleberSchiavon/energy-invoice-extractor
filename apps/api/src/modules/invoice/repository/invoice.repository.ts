import { PrismaClient } from '@repo/database-tools'
import { LoggerReturn, LoggerTypes, InvoicePDFData } from '@repo/types/'
import { AppLogger } from '~/utils'
import { filterInvoiceDataToDatabase } from '~/utils/invoice/invoiceHandler'

export default class InvoiceRepository {
  static prismaClient: PrismaClient = new PrismaClient()

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
        logMessage: `Error when creating invoices in the database: ${error}`,
      })
      throw error
    }
  }
}
