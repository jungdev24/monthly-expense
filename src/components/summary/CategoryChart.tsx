import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { MonthlyStats } from '../../types'
import { formatCurrency } from '../../utils/format'
import { CategoryIcon } from '../common/CategoryIcons'

interface CategoryChartProps {
  stats: MonthlyStats
}

export default function CategoryChart({ stats }: CategoryChartProps) {
  const { byCategory, totalExpense } = stats
  const filtered = byCategory.filter(c => c.amount > 0)

  if (filtered.length === 0) return null

  return (
    <div className="bg-white rounded-2xl px-5 py-5">
      <h3 className="text-[15px] font-bold text-[#191f28] mb-5">지출 분석</h3>

      <div className="flex items-center gap-6">
        <div className="w-[110px] h-[110px] shrink-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={filtered}
                cx="50%"
                cy="50%"
                innerRadius={34}
                outerRadius={52}
                dataKey="amount"
                stroke="none"
                startAngle={90}
                endAngle={-270}
              >
                {filtered.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] text-[#8b95a1] font-medium">총 지출</span>
            <span className="text-[11px] font-bold text-[#333d4b] mt-[1px]">
              {totalExpense >= 1000000
                ? `${Math.round(totalExpense / 10000)}만원`
                : formatCurrency(totalExpense)}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[14px] min-w-0">
          {filtered.slice(0, 4).map((cat) => {
            const pct = totalExpense > 0 ? Math.round((cat.amount / totalExpense) * 100) : 0
            return (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-[4px]">
                  <div className="flex items-center gap-[6px]">
                    <CategoryIcon id={cat.category} size={16} color={cat.color} />
                    <span className="text-[13px] font-semibold text-[#333d4b]">{cat.label}</span>
                  </div>
                  <span className="text-[12px] font-bold text-[#191f28] tabular-nums">{pct}%</span>
                </div>
                <div className="h-[5px] bg-[#f2f4f6] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${Math.max(pct, 2)}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
