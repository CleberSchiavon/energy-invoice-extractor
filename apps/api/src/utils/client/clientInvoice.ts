import { InvoiceDatabaseType } from '@repo/types'
import { CalculateInvoiceReturn } from '@repo/types/api/Client'

export const calculateAndReturnInvoices = (
  clientInvoices: InvoiceDatabaseType[],
): CalculateInvoiceReturn => {
  let totalElectricConsumption = 0
  let totalCompensatedEnergy = 0
  let totalValueWithoutGd = 0
  let totalGdEconomyValue = 0

  clientInvoices.forEach((clientInvoice) => {
    const electricConsumption =
      (clientInvoice.electricQuantity || 0) + (clientInvoice.sceeIcmsQuantity || 0)
    const {
      compensatedEnergyQuantity,
      electricTotalPrice,
      sceeIcmsTotalPrice,
      publicLightingContribution,
      compensatedEnergyTotalPrice,
    } = clientInvoice

    totalElectricConsumption += electricConsumption
    totalCompensatedEnergy += compensatedEnergyQuantity || 0

    const invoiceTotalValueWithoutGd =
      (electricTotalPrice || 0) + (sceeIcmsTotalPrice || 0) + (publicLightingContribution || 0)
    totalValueWithoutGd += invoiceTotalValueWithoutGd

    totalGdEconomyValue += compensatedEnergyTotalPrice || 0
  })

  return {
    electricConsumption: totalElectricConsumption,
    compensatedEnergy: totalCompensatedEnergy,
    totalValueWithoutGd,
    gdEconomyValue: totalGdEconomyValue,
  }
}
