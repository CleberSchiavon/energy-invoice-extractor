export interface InvoiceDetails {
  quantity: string
  unitPrice: string
  totalPrice: string
}

export interface InvoicePDFData {
  isCemigInvoice: boolean
  invoiceFileName: string
  clientNumber: string
  installationNumber: string
  referenceMonth: string | null
  electricDetails: InvoiceDetails | null
  sceeIcmsDetails: InvoiceDetails | null
  compensatedEnergy: InvoiceDetails | null
  publicLightingContribution: string | null
}
