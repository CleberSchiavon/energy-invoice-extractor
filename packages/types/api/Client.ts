export interface InvoiceDetails {
  quantity: string
  unitPrice: string
  totalPrice: string
}

export interface InvoicePDFData {
  fileName: string
  clientNumber: string
  installationNumber: string
  referenceMonth: string | null
  electricDetails: InvoiceDetails | null
  sceeIcmsDetails: InvoiceDetails | null
  compensatedEnergy: InvoiceDetails | null
  publicLightingContribution: string | null
}
