import { ClientDatabaseData } from '@repo/types'
import { AxiosClient } from '../client/axiosClient'

export const getClients = async (): Promise<ClientDatabaseData[]> => {
  const response = await AxiosClient.get('/clients/')
  return response.data
}
