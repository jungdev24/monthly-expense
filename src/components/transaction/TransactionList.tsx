import { Transaction } from '../../types'
import { formatDate, formatCurrency } from '../../utils/format'
import TransactionItem from './TransactionItem'
import EmptyState from '../common/EmptyState'

interface TransactionListProps {
  transactions: Transaction[]
  onDelete: (id: string) => void
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl py-4">
        <EmptyState message="아직 내역이 없어요" sub="+ 버튼을 눌러 내역을 추가해 보세요" />
      </div>
    )
  }

  const grouped = new Map<string, Transaction[]>()
  for (const tx of transactions) {
    const list = grouped.get(tx.date) || []
    list.push(tx)
    grouped.set(tx.date, list)
  }

  return (
    <div className="flex flex-col gap-3">
      {Array.from(grouped.entries()).map(([date, txs]) => {
        const dayExpense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
        return (
          <div key={date} className="bg-white rounded-2xl px-5 py-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[13px] font-semibold text-[#6b7684]">{formatDate(date)}</span>
              {dayExpense > 0 && (
                <span className="text-[12px] font-semibold text-[#f04452]">-{formatCurrency(dayExpense)}</span>
              )}
            </div>
            <div>
              {txs.map((tx) => (
                <TransactionItem key={tx.id} transaction={tx} onDelete={onDelete} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
