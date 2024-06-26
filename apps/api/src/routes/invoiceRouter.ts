import express, { Request, Response, Router } from 'express'
import { HttpStatusMessages, LoggerReturn, LoggerTypes } from '@repo/types/api'
import { AppLogger } from '~/utils'
import { InvoiceModule } from '~/modules/invoice'
import { PdfModule } from '~/modules/pdf/'
import { ErrorHandling } from '~/utils/ErrorHandling'
const invoiceRouter: Router = express.Router()

invoiceRouter.get('', async (request: Request, response: Response) => {
  try {
    const invoices = await InvoiceModule.controller.getAllInvoices()
    return response.status(200).json(invoices)
  } catch (error) {
    return response.status(400).json(error)
  }
})

invoiceRouter.get('/:clientNumber', async (request: Request, response: Response) => {
  try {
    const invoices = await InvoiceModule.controller.getInvoicesByClientNumber(request)
    return response.status(200).json(invoices)
  } catch (error) {
    return response.status(error.errorStatusCode).json(error)
  }
})

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
        return response.status(400).json(ErrorHandling(400, 'No file uploaded'))
      }
      return await InvoiceModule.controller.processInvoiceFile(invoiceFiles, response)
    } catch (error) {
      AppLogger({
        type: LoggerTypes.SERVER,
        logReturn: LoggerReturn.ERROR,
        logMessage: `${HttpStatusMessages.ERROR_CALLING_NEW_INVOICE} ${error}`,
      })
      return response
        .status(500)
        .json(ErrorHandling(500, HttpStatusMessages.ERROR_CALLING_NEW_INVOICE))
    }
  },
)

export default invoiceRouter
