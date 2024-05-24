import pdfParser from 'pdf-parse'
import fs from 'fs'
import { InvoicePDFData, LoggerTypes, LoggerReturn } from '@repo/types/api'
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
    return extractPdfData(textContent, pdfFileName)
  } catch (err) {
    AppLogger({
      type: LoggerTypes.INFO,
      logReturn: LoggerReturn.ERROR,
      logMessage: `Error extracting PDF: ${err}`,
    })
    throw new Error('Error extracting PDF data')
  }
}
