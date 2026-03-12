import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { getMonthLabel } from '../../utils/format'

interface TrendChartProps {
  data: { month: string; income: number; expense: number }[]
}

function shortMonth(ym: string) {
  return `${parseInt(ym.split('-')[1])}월`
}

export default function TrendChart({ data }: TrendChartProps) {
  if (data.length === 0) return null
  const hasData = data.some((d) => d.income > 0 || d.expense > 0)
  if (!hasData) return null

  return (
    <div className="bg-white rounded-2xl px-5 py-5">
      <h3 className="text-[15px] font-bold text-[#191f28] mb-5">월별 추이</h3>
      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={2} barCategoryGap="25%">
            <XAxis
              dataKey="month"
              tickFormatter={shortMonth}
              tick={{ fontSize: 11, fill: '#8b95a1', fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              labelFormatter={(label) => getMonthLabel(label as string)}
              formatter={(value, name) => [
                `${Number(value).toLocaleString()}원`,
                name === 'income' ? '수입' : '지출',
              ]}
              contentStyle={{
                borderRadius: 12,
                border: 'none',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                fontSize: 13,
                fontWeight: 600,
              }}
              cursor={{ fill: 'rgba(0,0,0,0.02)' }}
            />
            <Bar dataKey="income" fill="#3182f6" radius={[6, 6, 0, 0]} maxBarSize={16} />
            <Bar dataKey="expense" fill="#f04452" radius={[6, 6, 0, 0]} maxBarSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-5 mt-3">
        <div className="flex items-center gap-[6px] text-[12px] text-[#8b95a1] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#3182f6]" /> 수입
        </div>
        <div className="flex items-center gap-[6px] text-[12px] text-[#8b95a1] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#f04452]" /> 지출
        </div>
      </div>
    </div>
  )
}
