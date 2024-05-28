'use client'
import { TableComponent } from '@repo/ui'
import UploadInvoice from 'components/UploadInvoice'
import React, { useEffect, useState } from 'react'
import { useClientInvoice } from 'store/invoiceStore'

const InvoicesPage: React.FC = () => {
  const { invoices, loading } = useClientInvoice()((state) => state)
  const headers = [
    'ID',
    'Número da Instalação',
    'Número do Cliente',
    'Mês de referencia',
    'Energia compensada R$',
    'Quantidade de energia kHw',
    'Invoice UUID',
  ]
  const [tableRows, setTableRows] = useState<string[][]>([])

  useEffect(() => {
    const rows =
      invoices?.map((invoice, index) => [
        [index + 1].toString(),
        invoice.installationNumber,
        invoice.clientNumber.toString(),
        invoice.referenceMonth,
        invoice.compensatedEnergyTotalPrice.toString(),
        invoice.electricQuantity.toString(),
        invoice.invoiceUniqueId,
      ]) || []
    setTableRows(rows)
  }, [invoices])

  return (
    <div className="flex flex-col py-8 gap-4 h-screen overflow-hidden">
      <div className="py-4">
        <UploadInvoice />
      </div>
      <div className="overflow-x-auto">
        <p className="text-md text-gray-500 font-bold">Faturas registradas</p>
        <TableComponent headers={headers} rows={tableRows} />
      </div>
    </div>
  )
}

export default InvoicesPage
