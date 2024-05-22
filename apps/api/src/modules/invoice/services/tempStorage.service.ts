import multer from 'multer'
import { RequestHandler } from 'express'

export class TempStorageService {
  private static fileStorage = multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })

  static uploadPdfs: RequestHandler = multer({ storage: this.fileStorage }).array('pdfInvoice')
}
