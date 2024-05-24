import { HttpStatusMessages, InvoicePDFData, LoggerReturn, LoggerTypes } from '@repo/types/api'
import { Response } from 'express'
import { PdfModule } from '~/modules/pdf/'
import { AppLogger } from '~/utils'

export default class InvoiceService {
  static async handleInvoiceFiles(invoiceFiles: Express.Multer.File[]): Promise<InvoicePDFData[]> {
    const clientResults: InvoicePDFData[] = []

    for (const document of invoiceFiles) {
      try {
        const {
          isCemigInvoice,
          clientNumber,
          installationNumber,
          referenceMonth,
          electricDetails,
          sceeIcmsDetails,
          compensatedEnergy,
          publicLightingContribution,
        } = await PdfModule.pdfContentService(document.path, document.filename)

        const invoicePdfData: InvoicePDFData = {
          isCemigInvoice,
          fileName: document.filename,
          clientNumber,
          installationNumber,
          referenceMonth,
          electricDetails,
          sceeIcmsDetails,
          compensatedEnergy,
          publicLightingContribution,
        }

        clientResults.push(invoicePdfData)
        AppLogger({
          type: LoggerTypes.INFO,
          logReturn: LoggerReturn.SUCCESS,
          logMessage: `${HttpStatusMessages.PDF_PROCESSING_SUCCESSFULLY} ${invoicePdfData.fileName}`,
        })
      } catch (error) {
        const errorPdfData: InvoicePDFData = {
          isCemigInvoice: null,
          fileName: document.filename,
          clientNumber: '',
          installationNumber: '',
          referenceMonth: null,
          electricDetails: null,
          sceeIcmsDetails: null,
          compensatedEnergy: null,
          publicLightingContribution: null,
        }

        clientResults.push(errorPdfData)
        AppLogger({
          type: LoggerTypes.INFO,
          logReturn: LoggerReturn.ERROR,
          logMessage: `${HttpStatusMessages.PDF_EXTRACT_DATA_ERROR} ${errorPdfData.fileName}: ${error}`,
        })
      }
    }

    return clientResults
  }
}
