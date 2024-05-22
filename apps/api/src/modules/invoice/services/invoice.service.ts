import { ClientPDFData, LoggerReturn, LoggerTypes } from '@repo/types/api'
import { parsePdfContent } from './pdf.service'
import { AppLogger } from '../../../utils'

export default class InvoiceService {
  static async handleInvoiceFiles(invoiceFiles: Express.Multer.File[]): Promise<ClientPDFData[]> {
    const clientResults: ClientPDFData[] = []

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
        } = await parsePdfContent(document.path, document.filename)

        const clientPdfData: ClientPDFData = {
          fileName: document.filename,
          clientNumber,
          installationNumber,
          referenceMonth,
          electricDetails,
          sceeIcmsDetails,
          compensatedEnergy,
          publicLightingContribution,
        }

        clientResults.push(clientPdfData)

        AppLogger({
          type: LoggerTypes.INFO,
          logReturn: LoggerReturn.SUCCESS,
          logMessage: `PDF ${clientPdfData.fileName} processed successfully`,
        })
      } catch (error) {
        const errorPdfData: ClientPDFData = {
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
