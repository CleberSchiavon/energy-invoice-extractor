import { InvoicePDFData } from '@repo/types/api'
import { InvoiceFilterReturn } from '@repo/types/api/Database'

export const filterInvoiceDataToDatabase = (invoices: InvoicePDFData[]): InvoiceFilterReturn[] => {
  return invoices.map(
    ({
      isCemigInvoice,
      clientNumber,
      electricDetails,
      publicLightingContribution,
      sceeIcmsDetails,
      compensatedEnergy,
      ...rest
    }) => {
      return {
        clientNumber: Number(clientNumber),
        publicLightingContribution: parseFloat(publicLightingContribution.replace(/,/g, '.')),
        electricQuantity: Number(electricDetails?.quantity) || null,
        electricUnitPrice: parseFloat(electricDetails?.unitPrice.replace(/,/g, '.')) || null,
        electricTotalPrice: parseFloat(electricDetails?.totalPrice.replace(/,/g, '.')) || null,
        sceeIcmsQuantity: Number(sceeIcmsDetails?.quantity) || null,
        sceeIcmsUnitPrice: parseFloat(sceeIcmsDetails?.unitPrice.replace(/,/g, '.')) || null,
        sceeIcmsTotalPrice: parseFloat(sceeIcmsDetails?.totalPrice.replace(/,/g, '.')) || null,
        compensatedEnergyQuantity: Number(compensatedEnergy?.quantity) || null,
        compensatedEnergyUnitPrice:
          parseFloat(compensatedEnergy?.unitPrice.replace(/,/g, '.')) || null,
        compensatedEnergyTotalPrice:
          parseFloat(compensatedEnergy?.totalPrice.replace(/,/g, '.')) || null,
        ...rest,
      }
    },
  )
}
