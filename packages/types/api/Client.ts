import { InvoiceDatabaseType } from './Database'

export interface ClientDatabaseData {
  clientNumber: number
  id?: number
  invoices?: InvoiceDatabaseType[]
  electricConsumption: number
  compensatedEnergy: number
  totalValueWithoutGd: number
  gdEconomyValue: number
}

export interface CalculateInvoiceReturn {
  electricConsumption: number
  compensatedEnergy: number
  totalValueWithoutGd: number
  gdEconomyValue: number
}
