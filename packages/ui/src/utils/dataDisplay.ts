export type DataValueTypes = "string" | "money" | "kWh"

interface IDisplayStatData {
  valueType: DataValueTypes;
  value: string
}
const moneyOptions = { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 3 }
const formatMoneyValue = new Intl.NumberFormat('pt-BR', moneyOptions)

export const setDisplayStatData = ({valueType, value}:IDisplayStatData) => {
  switch(valueType) {
    case 'kWh':
      return `${value} kWh`
    case 'string':
      return value
    case 'money':
      return formatMoneyValue.format(Number(value))
  }
}