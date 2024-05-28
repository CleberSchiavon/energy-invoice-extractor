'use client'
import React from 'react'
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface BarData {
  [key: string]: any
}

interface BarConfig {
  dataKey: string
  fill: string
  activeFill: string
  stroke: string
}

interface CustomBarChartProps {
  chartData: BarData[]
  xAxisDataKey: string
  bars: BarConfig[]
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({ chartData, xAxisDataKey, bars }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisDataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((bar, index) => (
          <Bar
            key={index}
            dataKey={bar.dataKey}
            fill={bar.fill}
            activeBar={<Rectangle fill={bar.activeFill} stroke={bar.stroke} />}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CustomBarChart
