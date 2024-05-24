import { InvoicePDFData } from './Client'

export type RemovingInvoice = Omit<InvoicePDFData, 'clientNumber' | 'publicLightingContribution'>

export interface InvoiceDatabaseType extends RemovingInvoice {
  clientNumber: string | null
  publicLightingContribution: string | null
}
