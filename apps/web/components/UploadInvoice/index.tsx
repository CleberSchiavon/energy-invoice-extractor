'use client'
import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useClientInvoice } from 'store/invoiceStore'
import { getInvoices, postInvoice } from 'api/invoice'

export default function UploadInvoice() {
  const [formInvoices, setFormInvoices] = useState<FileList | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const { setInvoices, invoices } = useClientInvoice()((state) => state)
  const docInputRef = useRef<HTMLInputElement>(null)

  const handleDocChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInvoices(event.target.files)
  }

  const handleUpload = async () => {
    if (!formInvoices) {
      return
    }

    const formData = new FormData()

    try {
      toast.info('Enviando sua fatura')
      setLoading(true)

      for (let i = 0; i < formInvoices.length; i++) {
        formData.append('pdfInvoice', formInvoices[i])
      }

      const response = await postInvoice(formData)
      if (response.status === 201 && !response.data.error) {
        const invoices = await getInvoices()
        setInvoices(invoices)
        toast.success('Fatura enviada com sucesso')
        if (docInputRef.current) {
          docInputRef.current.value = ''
          setFormInvoices(null)
        }
      }
    } catch (error) {
      toast.error('Erro ao processar sua fatura, confira se ela é uma fatura já existente/válida')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-5 bg-white">
      <div className="flex justify-center">
        <div className="flex gap-2 flex-col py-4 justify-center items-center">
          <p className="text-md text-center">Área de upload</p>
          <div className="">
            <input
              type="file"
              id="docsSelected"
              multiple
              accept="application/pdf"
              onChange={handleDocChange}
              ref={docInputRef}
              className="file-input"
            />
          </div>
          <div>
            <button
              onClick={handleUpload}
              disabled={!formInvoices || loading}
              className="btn btn-accent"
            >
              {loading && (
                <span className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"></span>
              )}
              Enviar fatura
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
