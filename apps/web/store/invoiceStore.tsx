'use client'
import { ClientDatabaseData, InvoiceDatabaseType } from '@repo/types'
import { useState, createContext, useContext } from 'react'
import { create } from 'zustand'

const createStore = (
  loading: boolean,
  clients?: ClientDatabaseData[],
  currentClient?: ClientDatabaseData,
  currentInvoice?: InvoiceDatabaseType,
  invoices?: InvoiceDatabaseType[],
) =>
  create<{
    clients?: ClientDatabaseData[]
    currentClient?: ClientDatabaseData
    currentInvoice?: InvoiceDatabaseType
    invoices?: InvoiceDatabaseType[]
    loading: boolean
    setLoading: (loading: boolean) => void
    setClients: (clients: ClientDatabaseData[]) => void
    setCurrentClient: (currentClient: ClientDatabaseData) => void
    setCurrentInvoice: (currentInvoice: InvoiceDatabaseType) => void
    setInvoices: (invoices: InvoiceDatabaseType[]) => void
  }>((set) => ({
    clients,
    currentClient,
    currentInvoice,
    invoices,
    loading,
    setLoading(loading) {
      set({ loading })
    },
    setClients(clients) {
      set({ clients })
    },
    setCurrentClient(currentClient) {
      set({ currentClient })
    },
    setCurrentInvoice(currentInvoice) {
      set({ currentInvoice })
    },
    setInvoices(invoices) {
      set({ invoices })
    },
  }))

const ClientInvoiceContext = createContext<ReturnType<typeof createStore> | null>(null)

export const useClientInvoice = () => {
  if (!ClientInvoiceContext)
    throw new Error('useClientInvoice must be used within a ClientInvoiceProvider')
  return useContext(ClientInvoiceContext)!
}

const ClientInvoiceProvider = ({
  loading = true,
  clients,
  currentClient,
  currentInvoice,
  invoices,
  children,
}: {
  clients?: ClientDatabaseData[]
  currentClient?: ClientDatabaseData
  currentInvoice?: InvoiceDatabaseType
  invoices?: InvoiceDatabaseType[]
  children: React.ReactNode
  loading: boolean
}) => {
  const [store] = useState(() =>
    createStore(loading, clients, currentClient, currentInvoice, invoices),
  )
  return <ClientInvoiceContext.Provider value={store}>{children}</ClientInvoiceContext.Provider>
}

export default ClientInvoiceProvider
