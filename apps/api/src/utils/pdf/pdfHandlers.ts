import { InvoicePDFData, InvoiceDetails } from '@repo/types/api'

export const getClientNumber = (text: string): string => {
  const words = text.split(' ').filter(Boolean)
  const clientIndex = words.indexOf('CLIENTE')
  return clientIndex !== -1 ? words[clientIndex + 4] : ''
}

export const getInstallationNumber = (text: string): string => {
  const words = text.split(' ').filter(Boolean)
  const clientIndex = words.indexOf('CLIENTE')
  return clientIndex !== -1 ? words[clientIndex + 5].replace(/\n/g, '') : ''
}

export const getReferenceMonth = (text: string): string | null => {
  const match = text.match(/[A-Z]{3}\/\d{4}/)
  return match ? match[0] : null
}

export const getElectricDetails = (text: string): InvoiceDetails | null => {
  const match = text.match(/Energia Elétrica\s*kWh\s*([\d.]+)\s*[\d.,]+\s*([\d.,]+)/)
  return match
    ? {
        quantity: match[1],
        unitPrice: match[0].split(' ').filter(Boolean)[3],
        totalPrice: match[2],
      }
    : null
}

export const getSceeIcmsDetails = (text: string): InvoiceDetails | null => {
  const match = text.match(
    /Energia SCEE s\/ ICMSkWh\s+(\d+(?:\.\d+)?)\s+(\d+(?:,\d+)?)\s+(\d+(?:,\d+)?)/,
  )
  return match
    ? {
        quantity: match[1],
        unitPrice: match[2],
        totalPrice: match[3],
      }
    : null
}

export const getCompensatedEnergyDetails = (text: string): InvoiceDetails | null => {
  const match = text.match(
    /Energia compensada GD IkWh\s+(\d+(?:[,.]\d+)?)\s+(\d+(?:[,.]\d+)?)\s+(-?\d+(?:[,.]\d+)?)/,
  )
  return match
    ? {
        quantity: match[1],
        unitPrice: match[2],
        totalPrice: match[3],
      }
    : null
}

export const getPublicLightingContribution = (text: string): string | null => {
  const match = text.match(/Contrib Ilum Publica Municipal\s*([\d.,]+)/)
  return match ? match[1] : null
}

export const verifyIfIsCemigInvoice = (text: string) => {
  const match = text.includes('CEMIG DISTRIBUIÇÃO S.A')
  return match
}
export const extractPdfData = (textContent: string, pdfFileName: string) => {
  return {
    fileName: pdfFileName,
    isCemigInvoice: verifyIfIsCemigInvoice(textContent),
    clientNumber: getClientNumber(textContent),
    installationNumber: getInstallationNumber(textContent),
    referenceMonth: getReferenceMonth(textContent),
    electricDetails: getElectricDetails(textContent),
    sceeIcmsDetails: getSceeIcmsDetails(textContent),
    compensatedEnergy: getCompensatedEnergyDetails(textContent),
    publicLightingContribution: getPublicLightingContribution(textContent),
  }
}
