import { MonthlyStats } from '../../types'
import { formatCurrency } from '../../utils/format'

interface MonthlySummaryProps {
  stats: MonthlyStats
}

export default function MonthlySummary({ stats }: MonthlySummaryProps) {
  const isPositive = stats.balance >= 0

  return (
    <div className="bg-white rounded-2xl px-5 pt-6 pb-5">
      <p className="text-[13px] text-[#8b95a1] font-medium mb-[6px]">이번 달 남은 돈</p>
      <p className={`text-[28px] font-bold tracking-tight leading-tight ${isPositive ? 'text-[#191f28]' : 'text-[#f04452]'}`}>
        {isPositive ? '' : '-'}{formatCurrency(Math.abs(stats.balance))}
      </p>

      <div className="mt-6 flex gap-3">
        <div className="flex-1 bg-[#f8f9fa] rounded-[14px] px-4 py-[14px]">
          <p className="text-[11px] text-[#8b95a1] font-semibold mb-[4px]">수입</p>
          <p className="text-[15px] font-bold text-[#3182f6] leading-tight">
            {stats.totalIncome > 0 ? '+' : ''}{formatCurrency(stats.totalIncome)}
          </p>
        </div>
        <div className="flex-1 bg-[#f8f9fa] rounded-[14px] px-4 py-[14px]">
          <p className="text-[11px] text-[#8b95a1] font-semibold mb-[4px]">지출</p>
          <p className="text-[15px] font-bold text-[#f04452] leading-tight">
            {formatCurrency(stats.totalExpense)}
          </p>
        </div>
      </div>
    </div>
  )
}
