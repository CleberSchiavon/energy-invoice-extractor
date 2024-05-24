import pdfParser from 'pdf-parse'
import fs from 'fs'
import { InvoicePDFData, LoggerTypes, LoggerReturn, HttpStatusMessages } from '@repo/types/api'
import { AppLogger, extractPdfData, verifyIfIsCemigInvoice } from '~/utils/'
import multer from 'multer'
import { RequestHandler, Response } from 'express'
import { ErrorHandling } from '~/utils/ErrorHandling'

export class TempStoragePdfService {
  private static fileStorage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })

  static uploadPdfs: RequestHandler = multer({ storage: this.fileStorage }).array('pdfInvoice')
}

export const parsePdfContent = async (
  pdfFilePath: string,
  pdfFileName: string,
): Promise<InvoicePDFData> => {
  try {
    const fileBuffer = fs.readFileSync(pdfFilePath)
    const parsedData = await pdfParser(fileBuffer)
    const textContent = parsedData.text
    if (verifyIfIsCemigInvoice(textContent) == true) {
      return extractPdfData(textContent, pdfFileName)
    } else {
      throw ErrorHandling(500, HttpStatusMessages.IS_NOT_CEMIG_INVOICE)
    }
  } catch (err) {
    AppLogger({
      type: LoggerTypes.INFO,
      logReturn: LoggerReturn.ERROR,
      logMessage: `${HttpStatusMessages.PDF_EXTRACT_DATA_ERROR} ${JSON.stringify(err.errorMessage)}`,
    })
    throw err
  }
}
