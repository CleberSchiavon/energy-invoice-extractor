import { Request, Response } from 'express'
import { LoggerReturn, LoggerTypes, HttpStatusMessages } from '@repo/types/api'
import { AppLogger } from '~/utils'
import InvoiceService from '../services/invoice.service'
import InvoiceRepository from '../repository/invoice.repository'
import { ErrorHandling } from '~/utils/ErrorHandling'

export default class InvoiceController {
  static async getInvoicesByClientNumber(request: Request) {
    try {
      const clientNumberFormatted = Number(request.params.clientNumber)
      const invoices = await InvoiceRepository.getById(clientNumberFormatted)
      if (invoices.length < 1) {
        throw ErrorHandling(400, HttpStatusMessages.CLIENT_NUMBER_NOT_FOUND)
      }
      return invoices
    } catch (error) {
      AppLogger({
        logReturn: LoggerReturn.ERROR,
        type: LoggerTypes.SERVER,
        logMessage: `${HttpStatusMessages.ERROR_GETIING_ALL_INVOICES} ${error.errorMessage}`,
      })
      throw error
    }
  }

  static async getAllInvoices() {
    try {
      const invoices = await InvoiceRepository.get()
      return invoices
    } catch (error) {
      AppLogger({
        logReturn: LoggerReturn.ERROR,
        type: LoggerTypes.SERVER,
        logMessage: `${HttpStatusMessages.ERROR_GETIING_ALL_INVOICES} ${error.errorMessage}`,
      })
      throw error
    }
  }

  static async processInvoiceFile(invoiceFiles: Express.Multer.File[], response: Response) {
    try {
      const invoiceResults = await InvoiceService.handleInvoiceFiles(invoiceFiles)
      const { createdInvoices, notCreatedInvoices } = await InvoiceRepository.create(invoiceResults)

      const statusCode = createdInvoices.length > 0 ? 201 : 500

      return response.status(statusCode).json({
        error: statusCode !== 201,
        createdInvoices,
        notCreatedInvoices,
      })
    } catch (error) {
      AppLogger({
        type: LoggerTypes.SERVER,
        logReturn: LoggerReturn.ERROR,
        logMessage: `${HttpStatusMessages.ERROR_PROCESSING_INVOICES} ${error.errorMessage}`,
      })

      return ErrorHandling(500, error.message)
    }
  }
}
