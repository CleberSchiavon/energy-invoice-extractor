export interface EnergyDetails {
  quantity: string
  unitPrice: string
  totalPrice: string
}

export interface ClientPDFData {
  fileName: string
  clientNumber: string
  installationNumber: string
  referenceMonth: string | null
  electricDetails: EnergyDetails | null
  sceeIcmsDetails: EnergyDetails | null
  compensatedEnergy: EnergyDetails | null
  publicLightingContribution: string | null
}
