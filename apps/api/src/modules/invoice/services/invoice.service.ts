import { InvoicePDFData, LoggerReturn, LoggerTypes } from '@repo/types/api'
import { PdfModule } from '~/modules/pdf/'
import { AppLogger } from '~/utils'

export default class InvoiceService {
  static async handleInvoiceFiles(invoiceFiles: Express.Multer.File[]): Promise<InvoicePDFData[]> {
    const clientResults: InvoicePDFData[] = []

    for (const document of invoiceFiles) {
      try {
        const {
          clientNumber,
          installationNumber,
          referenceMonth,
          electricDetails,
          sceeIcmsDetails,
          compensatedEnergy,
          publicLightingContribution,
        } = await PdfModule.pdfContentService(document.path, document.filename)

        const invoicePdfData: InvoicePDFData = {
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
          logMessage: `PDF ${invoicePdfData.fileName} processed successfully`,
        })
      } catch (error) {
        const errorPdfData: InvoicePDFData = {
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
          logMessage: `Error extracting data from PDF ${errorPdfData.fileName}: ${error}`,
        })
      }
    }

    return clientResults
  }
}
