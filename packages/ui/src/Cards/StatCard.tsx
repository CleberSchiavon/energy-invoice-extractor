'use client'
import React, { ReactElement } from 'react'
import { DataValueTypes, setDisplayStatData } from '../utils/dataDisplay'
import StatCardSkeleton from './StatCardSkeleton'
interface ICard {
  title: string
  subtitle?: string | number
  description?: string
  handleClick?: () => void
  statIcon?: ReactElement
  valueType?: DataValueTypes
  loading?: boolean
}

const StatCard = ({
  title,
  subtitle,
  description,
  handleClick,
  statIcon,
  valueType = 'string',
  loading,
}: ICard) => {
  const StatIcon = statIcon

  if (loading) {
    return <StatCardSkeleton />
  }

  return (
    <div
      className={`bg-gray-50 shadow rounded-2xl p-6 ${handleClick && 'cursor-pointer'}`}
      onClick={handleClick}
    >
      <div className="flex flex-row justify-between">
        <div className="text-gray-500 text-sm font-semibold">{title}</div>
        <div className="">{StatIcon}</div>
      </div>
      {subtitle && (
        <div className="text-2xl font-bold text-blue-700">
          {setDisplayStatData({ value: subtitle, valueType: valueType })}
        </div>
      )}
      {description && (
        <div className="font-normal text-gray-400 text-xs whitespace-pre-line">{description}</div>
      )}
    </div>
  )
}

export default StatCard
