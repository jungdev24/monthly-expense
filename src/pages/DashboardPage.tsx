import { MonthlyStats, RecurringItem } from '../types'
import { IconPlus } from '../components/common/Icons'
import MonthlySummary from '../components/summary/MonthlySummary'
import CategoryChart from '../components/summary/CategoryChart'
import TrendChart from '../components/summary/TrendChart'
import RecurringManager from '../components/recurring/RecurringManager'

interface DashboardPageProps {
  stats: MonthlyStats
  trendData: { month: string; income: number; expense: number }[]
  onNavigateToTransactions: () => void
  recurringItems: RecurringItem[]
  onAddRecurring: (data: Omit<RecurringItem, 'id'>) => void
  onRemoveRecurring: (id: string) => void
}

export default function DashboardPage({ stats, trendData, onNavigateToTransactions, recurringItems, onAddRecurring, onRemoveRecurring }: DashboardPageProps) {
  return (
    <div className="flex flex-col gap-3">
      <MonthlySummary stats={stats} />

      <button
        onClick={onNavigateToTransactions}
        className="bg-white rounded-2xl px-5 py-5 flex items-center gap-4 active:bg-[#f8f9fa] transition-colors"
      >
        <div className="w-11 h-11 rounded-full bg-[#e8f3ff] flex items-center justify-center text-[#3182f6]">
          <IconPlus size={20} />
        </div>
        <div className="text-left">
          <p className="text-[14px] font-semibold text-[#191f28]">내역 추가하기</p>
          <p className="text-[12px] text-[#8b95a1] mt-[1px]">수입이나 지출을 기록해보세요</p>
        </div>
      </button>

      <CategoryChart stats={stats} />
      <TrendChart data={trendData} />

      <RecurringManager
        type="income"
        items={recurringItems}
        onAdd={onAddRecurring}
        onRemove={onRemoveRecurring}
      />

      <RecurringManager
        type="expense"
        items={recurringItems}
        onAdd={onAddRecurring}
        onRemove={onRemoveRecurring}
      />
    </div>
  )
}
