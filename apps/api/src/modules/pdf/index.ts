import { TempStoragePdfService, parsePdfContent } from './service/pdf.service'

export const PdfModule = {
  pdfContentService: parsePdfContent,
  tempStorageService: TempStoragePdfService,
}
