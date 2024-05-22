import express, { Request, Response, Router } from 'express'
import { LoggerReturn, LoggerTypes } from '@repo/types/api'
import { AppLogger } from '~/utils'
import { InvoiceModule } from '~/modules/invoice'
import { PdfModule } from '~/modules/pdf/'

const invoiceRouter: Router = express.Router()
invoiceRouter.post(
  '/new-invoice',
  PdfModule.tempStorageService.uploadPdfs,
  async (request: Request, response: Response) => {
    const invoiceFiles = request.files as Express.Multer.File[]
    try {
      if (!invoiceFiles) {
        AppLogger({
          type: LoggerTypes.SERVER,
          logReturn: LoggerReturn.ERROR,
          logMessage: `An error occurred when calling /new-invoice route: No file uploaded`,
        })
        return response.status(400).json({ errorStatusCode: 400, errorMessage: 'No file uploaded' })
      }
      return await InvoiceModule.controller.processInvoiceFile(invoiceFiles, response)
    } catch (error) {
      AppLogger({
        type: LoggerTypes.SERVER,
        logReturn: LoggerReturn.ERROR,
        logMessage: `An error occurred when calling /new-invoice route: ${error}`,
      })
    }
  },
)

export default invoiceRouter
