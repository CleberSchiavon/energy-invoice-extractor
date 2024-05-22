import { Response } from 'express'
import { LoggerReturn, LoggerTypes } from '@repo/types/api'
import { AppLogger } from '~/utils'
import InvoiceService from '../services/invoice.service'

export default class InvoiceController {
  static async processInvoiceFile(invoiceFiles: Express.Multer.File[], response: Response) {
    try {
      const invoiceResults = await InvoiceService.handleInvoiceFiles(invoiceFiles)
      return response.status(201).json(invoiceResults)
    } catch (error) {
      AppLogger({
        type: LoggerTypes.SERVER,
        logReturn: LoggerReturn.ERROR,
        logMessage: `Error processing PDF: ${error}`,
      })
      return response.status(500).json({ errorStatusCode: 500, errorMessage: error })
    }
  }
}
