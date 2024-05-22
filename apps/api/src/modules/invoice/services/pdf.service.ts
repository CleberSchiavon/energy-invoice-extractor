import pdfParser from 'pdf-parse'
import fs from 'fs'
import { ClientPDFData, LoggerTypes, LoggerReturn } from '@repo/types/api'
import { AppLogger } from '../../../utils/'
import { extractPdfData } from '../../../utils/pdf/pdfHandlers'

export const parsePdfContent = async (
  pdfFilePath: string,
  pdfFileName: string,
): Promise<ClientPDFData> => {
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
