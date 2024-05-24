import { Response } from 'express'
import { LoggerReturn, LoggerTypes } from '@repo/types/api'
import { AppLogger } from '~/utils'
import InvoiceService from '../services/invoice.service'
import InvoiceRepository from '../repository/invoice.repository'
import { ErrorHandling } from '~/utils/ErrorHandling'

export default class InvoiceController {
  static async processInvoiceFile(invoiceFiles: Express.Multer.File[], response: Response) {
    try {
      const invoiceResults = await InvoiceService.handleInvoiceFiles(invoiceFiles)
      invoiceResults.map((result) => {
        if (!result.isCemigInvoice) {
          response
            .status(400)
            .send(
              ErrorHandling(
                400,
                'Error when trying to process your invoice, check if the document you sent is a CEMIG invoice',
              ),
            )
        }
      })
      const { createdInvoices, notCreatedInvoices } = await InvoiceRepository.create(invoiceResults)

      const statusCode = createdInvoices.length > 0 ? 201 : 500

      return response.status(statusCode).json({
        error: statusCode !== 201,
        allInvoicesCreated: notCreatedInvoices.length < 1,
        createdInvoices,
        notCreatedInvoices,
      })
    } catch (error) {
      AppLogger({
        type: LoggerTypes.SERVER,
        logReturn: LoggerReturn.ERROR,
        logMessage: `Error processing Invoices: ${error}`,
      })

      return response.status(500).json({ errorStatusCode: 500, errorMessage: error.message })
    }
  }
  static async getAllInvoices(request, response) {
    try {
    } catch (error) {
      AppLogger({
        type: LoggerTypes.SERVER,
        logReturn: LoggerReturn.ERROR,
        logMessage: `Error getting all invoices: ${error}`,
      })
    }
  }
}
