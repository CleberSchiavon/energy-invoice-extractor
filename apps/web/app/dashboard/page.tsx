'use client'
import { StatCard } from '@repo/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { MdOutlineAttachMoney, MdOutlineEnergySavingsLeaf } from 'react-icons/md'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { TbPigMoney } from 'react-icons/tb'
import { AxiosClient } from 'client/axiosClient'

const DashboardPage = () => {
  const [invoiceData, setInvoiceData] = useState()
  const [loadingData, setLoadingData] = useState<boolean>(false)
  const fetchInitialData = async () => {
    try {
      const response = await AxiosClient.get('/invoices')
      setInvoiceData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    setLoadingData(true)
    AxiosClient.get(`/invoices`)
      .then((res) => {
        setInvoiceData(res.data)
      })
      .catch((error) => console.error(error))
      .finally(() => setLoadingData(false))
  }, [])

  useEffect(() => {
    console.log(invoiceData)
  }, [invoiceData])

  return (
    <div className="flex justify-center h-screen">
      <section id="Stats" className="pt-8">
        <div className="">
          <p className="text-lg font-medium text-gray-500">Suas estatísticas</p>
        </div>
        <div className="mt-5 gap-4 flex md:flex-row flex-col">
          <StatCard
            handleClick={() => console.log('Teste')}
            title="Valor Total s/GD"
            valueType="money"
            subtitle="100"
            statIcon={<MdOutlineAttachMoney size={30} color="#f40000aa" />}
            description='"Energia Elétrica + "Energia SCEE s/ ICMS" + "Contrib Ilum Publica Municipal"'
          />
          <StatCard
            title="Consumo de energia"
            valueType="kWh"
            subtitle="250"
            statIcon={<AiOutlineThunderbolt size={30} color="#f40000aa" />}
            description="corresponde ao somatório da Energia Elétrica + Energia SCEEE s/ICMS"
          />
          <StatCard
            title="Economia GD"
            valueType="money"
            subtitle="2000"
            statIcon={<TbPigMoney color="#05CD99" size={30} />}
            description='corresponde ao campo "Energia Compensada GD I" na sua fatura'
          />
          <StatCard
            title="Energia Compensada"
            valueType="kWh"
            subtitle="10"
            statIcon={<MdOutlineEnergySavingsLeaf size={30} color="#05CD99" />}
            description='está escrito na sua fatura como "Energia Compensada GD I kWh"'
          />
        </div>
      </section>
      <section id="Faturas"></section>
    </div>
  )
}

export default DashboardPage
