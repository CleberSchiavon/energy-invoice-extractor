'use client'
import React, { useEffect, useState } from 'react'
import { CustomBarChart, Select, StatCard } from '@repo/ui'
import { MdOutlineAttachMoney, MdOutlineEnergySavingsLeaf } from 'react-icons/md'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { TbPigMoney } from 'react-icons/tb'
import { AxiosClient } from 'client/axiosClient'
import { useClientInvoice } from 'store/invoiceStore'

const DashboardPage = () => {
  const { setClients, setCurrentClient, clients, currentClient, setCurrentInvoice, setInvoices } =
    useClientInvoice()((state) => state)
  const [loadingData, setLoadingData] = useState(false)

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoadingData(true)
        const [invoiceAPIData, clientAPIData] = await Promise.all([
          AxiosClient.get('/invoices/'),
          AxiosClient.get('/clients/'),
        ])
        console.log(clients)
        const clientAPIResponse = clientAPIData.data
        const invoiceAPIResponse = invoiceAPIData.data
        setClients(clientAPIResponse)
        setCurrentClient(clientAPIResponse[0])
        setInvoices(invoiceAPIResponse)
        setCurrentInvoice(invoiceAPIResponse[0])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoadingData(false)
      }
    }

    fetchInitialData()
  }, [])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedClientId = event.target.value
    const selectedClient = clients?.find(
      (client) => Number(client.clientNumber) === Number(selectedClientId),
    )
    setCurrentClient(selectedClient)
  }

  const formatedEconomyValue = Math.abs(currentClient?.gdEconomyValue)
  const selectOptions = clients?.map((client) => ({
    name: String(client.clientNumber),
    value: client.clientNumber,
  }))

  const energyConsumedChartData = [
    {
      name: 'Consumo de Energia x Energia Compensada',
      electricConsumption: currentClient ? currentClient.electricConsumption : 0,
      compensatedEnergy: currentClient ? currentClient.compensatedEnergy : 0,
    },
  ]

  const economyChartData = [
    {
      name: 'Gasto total com GD x Economia GD',
      totalValueWithoutGd: currentClient ? currentClient.totalValueWithoutGd : 0,
      gdEconomyValue: currentClient ? formatedEconomyValue : 0,
    },
  ]

  return (
    <div className="flex flex-col py-8 gap-4 md:h-screen h-50 overflow-hidden">
      <section id="Stats" className="">
        <div className="flex gap-4 flex-row justify-between">
          <Select
            label="Selecione o número do cliente"
            selectDisabled={loadingData}
            options={selectOptions}
            onChange={handleSelectChange}
          />
        </div>
        <p className="text-lg font-medium text-gray-500 text-center">Suas estatísticas</p>
        <div className="mt-5 gap-4 flex md:flex-row flex-col">
          <StatCard
            handleClick={() => console.log(clients)}
            title="Valor Total s/GD"
            valueType="money"
            loading={loadingData}
            subtitle={currentClient ? currentClient.totalValueWithoutGd : ''}
            statIcon={<MdOutlineAttachMoney size={30} color="#f40000aa" />}
            description='"Energia Elétrica + "Energia SCEE s/ ICMS" + "Contrib Ilum Publica Municipal"'
          />
          <StatCard
            title="Consumo de energia"
            valueType="kWh"
            subtitle={currentClient ? currentClient.electricConsumption : ''}
            statIcon={<AiOutlineThunderbolt size={30} color="#f40000aa" />}
            description="corresponde ao somatório da Energia Elétrica + Energia SCEEE s/ICMS"
          />
          <StatCard
            title="Economia GD"
            valueType="money"
            loading={loadingData}
            subtitle={currentClient ? formatedEconomyValue : ''}
            statIcon={<TbPigMoney color="#05CD99" size={30} />}
            description='corresponde ao campo "Energia Compensada GD I" na sua fatura'
          />
          <StatCard
            title="Energia Compensada"
            valueType="kWh"
            loading={loadingData}
            subtitle={currentClient ? currentClient.compensatedEnergy : ''}
            statIcon={<MdOutlineEnergySavingsLeaf size={30} color="#05CD99" />}
            description='está escrito na sua fatura como "Energia Compensada GD I kWh"'
          />
        </div>
      </section>
      <section id="graphics">
        <p className="text-lg font-medium text-gray-500 text-center">Gráficos da sua economia</p>
        <div className="container flex flex-col md:flex-row pt-6">
          <CustomBarChart
            chartData={energyConsumedChartData}
            xAxisDataKey="name"
            bars={[
              { dataKey: 'electricConsumption', fill: 'red', activeFill: 'pink', stroke: 'blue' },
              {
                dataKey: 'compensatedEnergy',
                fill: 'green',
                activeFill: 'gold',
                stroke: 'purple',
              },
            ]}
          />
          <CustomBarChart
            chartData={economyChartData}
            xAxisDataKey="name"
            bars={[
              { dataKey: 'totalValueWithoutGd', fill: 'red', activeFill: 'pink', stroke: 'blue' },
              { dataKey: 'gdEconomyValue', fill: 'green', activeFill: 'gold', stroke: 'purple' },
            ]}
          />
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
