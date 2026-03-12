import { Transaction, MonthlyStats } from '../types'
import { formatCurrency } from '../utils/format'
import { IconPlus } from '../components/common/Icons'
import TransactionList from '../components/transaction/TransactionList'

interface TransactionsPageProps {
  transactions: Transaction[]
  stats: MonthlyStats
  onDelete: (id: string) => void
  onAdd: () => void
}

export default function TransactionsPage({ transactions, stats, onDelete, onAdd }: TransactionsPageProps) {
  return (
    <div className="relative min-h-[60vh]">
      {transactions.length > 0 && (
        <div className="bg-white rounded-2xl px-5 py-5 mb-3 flex items-center justify-between">
          <div>
            <p className="text-[12px] text-[#8b95a1] font-medium">이번 달 지출</p>
            <p className="text-[20px] font-bold text-[#191f28] mt-[2px]">{formatCurrency(stats.totalExpense)}</p>
          </div>
          <span className="text-[12px] text-[#8b95a1] font-medium bg-[#f2f4f6] px-3 py-[6px] rounded-lg">
            {transactions.length}건
          </span>
        </div>
      )}

      <TransactionList transactions={transactions} onDelete={onDelete} />

      <button
        onClick={onAdd}
        className="fixed bottom-[76px] right-5 w-[54px] h-[54px] bg-[#3182f6] text-white rounded-full shadow-[0_6px_20px_rgba(49,130,246,0.35)] flex items-center justify-center transition-all active:scale-90 z-30"
      >
        <IconPlus size={22} />
      </button>
    </div>
  )
}
