import { InvoiceDatabaseType } from '@repo/types'
import { AxiosClient } from '../client/axiosClient'

export const getInvoices = async (): Promise<InvoiceDatabaseType[]> => {
  const response = await AxiosClient.get('/invoices/')
  return response.data
}

export const postInvoice = async (formData: FormData) => {
  const response = await AxiosClient.post('/invoices/new-invoice', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response
}
