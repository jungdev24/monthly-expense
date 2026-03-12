import { useState } from 'react'
import { Transaction } from '../../types'
import { getCategoryById } from '../../constants/categories'
import { formatCurrency } from '../../utils/format'
import { CategoryIcon } from '../common/CategoryIcons'

interface TransactionItemProps {
  transaction: Transaction
  onDelete: (id: string) => void
}

export default function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const [showDelete, setShowDelete] = useState(false)
  const cat = getCategoryById(transaction.category)
  const catColor = cat?.color || '#868e96'

  const installmentLabel = transaction.installmentMonths && transaction.installmentMonths > 1
    ? `${transaction.installmentCurrent || 1}/${transaction.installmentMonths}개월`
    : null

  const paymentLabel = transaction.paymentMethod === 'card' ? '카드' 
    : transaction.paymentMethod === 'cash' ? '현금' 
    : transaction.paymentMethod === 'transfer' ? '이체' : null

  return (
    <div
      className="flex items-center gap-3 py-[13px] active:bg-[#f8f9fa] transition-colors -mx-1 px-1 rounded-xl cursor-pointer"
      onClick={() => setShowDelete(!showDelete)}
    >
      <div
        className="w-[42px] h-[42px] rounded-[13px] flex items-center justify-center shrink-0"
        style={{ backgroundColor: catColor + '1A' }}
      >
        <CategoryIcon id={transaction.category} size={20} color={catColor} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-[6px]">
          <span className="text-[14px] font-semibold text-[#191f28]">{cat?.label || transaction.category}</span>
          {installmentLabel && (
            <span className="text-[10px] font-bold text-[#3182f6] bg-[#e8f3ff] px-[5px] py-[2px] rounded-[4px]">
              {installmentLabel}
            </span>
          )}
          {paymentLabel && !installmentLabel && (
            <span className="text-[11px] font-medium text-[#b0b8c1]">{paymentLabel}</span>
          )}
        </div>
        <p className="text-[12px] text-[#8b95a1] mt-[1px] truncate">
          {transaction.description || transaction.date.slice(5).replace('-', '/')}
        </p>
      </div>
      <div className="text-right shrink-0 ml-2">
        {showDelete ? (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(transaction.id) }}
            className="text-[13px] font-semibold text-[#f04452] bg-[#fff0f1] px-3 py-[6px] rounded-lg active:scale-95 transition-transform"
          >
            삭제
          </button>
        ) : (
          <span className={`text-[15px] font-bold tabular-nums ${
            transaction.type === 'income' ? 'text-[#3182f6]' : 'text-[#191f28]'
          }`}>
            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
          </span>
        )}
      </div>
    </div>
  )
}
