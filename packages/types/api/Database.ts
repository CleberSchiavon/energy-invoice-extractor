import { InvoicePDFData } from './Invoice'

export type RemovingInvoice = Omit<
  InvoicePDFData,
  | 'clientNumber'
  | 'publicLightingContribution'
  | 'isCemigInvoice'
  | 'electricDetails'
  | 'sceeIcmsDetails'
  | 'compensatedEnergy'
>
export interface InvoiceFilterReturn extends RemovingInvoice {
  clientNumber: number | null
  publicLightingContribution: number | null
}

export interface InvoiceDatabaseType extends RemovingInvoice {
  invoiceFileName: string
  invoiceUniqueId: string
  installationNumber: string
  referenceMonth: string
  clientNumber: number
  electricQuantity: number | null
  electricUnitPrice: number | null
  electricTotalPrice: number | null
  sceeIcmsQuantity: number | null
  sceeIcmsUnitPrice: number | null
  sceeIcmsTotalPrice: number | null
  compensatedEnergyQuantity: number | null
  compensatedEnergyUnitPrice: number | null
  compensatedEnergyTotalPrice: number | null
  publicLightingContribution: number | null
}
