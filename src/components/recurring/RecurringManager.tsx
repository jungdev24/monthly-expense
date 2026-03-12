import { useState } from 'react'
import { RecurringItem, TransactionType } from '../../types'
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../constants/categories'
import { formatCurrency } from '../../utils/format'
import { CategoryIcon } from '../common/CategoryIcons'
import { getCategoryById } from '../../constants/categories'
import { IconTrash } from '../common/Icons'

interface Props {
  type: TransactionType
  items: RecurringItem[]
  onAdd: (data: Omit<RecurringItem, 'id'>) => void
  onRemove: (id: string) => void
}

export default function RecurringManager({ type, items, onAdd, onRemove }: Props) {
  const [showForm, setShowForm] = useState(false)
  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0].id)
  const [description, setDescription] = useState('')
  const [dayOfMonth, setDayOfMonth] = useState('25')

  const filtered = items.filter((i) => i.type === type)
  const total = filtered.reduce((s, i) => s + i.amount, 0)
  const isIncome = type === 'income'
  const title = isIncome ? '고정 수입' : '고정 지출'
  const accentColor = isIncome ? '#3182f6' : '#f04452'

  function handleAdd() {
    const num = parseInt(amount)
    if (!num || num <= 0) return
    onAdd({
      type,
      amount: num,
      category,
      description,
      dayOfMonth: Math.min(Math.max(parseInt(dayOfMonth) || 1, 1), 28),
    })
    setAmount('')
    setDescription('')
    setShowForm(false)
  }

  return (
    <div className="bg-white rounded-2xl px-5 py-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-bold text-[#191f28]">{title}</h3>
        {total > 0 && (
          <span className="text-[13px] font-bold" style={{ color: accentColor }}>
            월 {isIncome ? '+' : '-'}{formatCurrency(total)}
          </span>
        )}
      </div>

      {filtered.length === 0 && !showForm && (
        <p className="text-[13px] text-[#8b95a1] mb-2">매달 {isIncome ? '들어오는 수입' : '나가는 지출'}을 등록해보세요</p>
      )}

      {filtered.map((item) => {
        const cat = getCategoryById(item.category)
        return (
          <div key={item.id} className="flex items-center gap-3 py-[10px]">
            <div
              className="w-9 h-9 rounded-[11px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: (cat?.color || accentColor) + '1A' }}
            >
              <CategoryIcon id={item.category} size={17} color={cat?.color || accentColor} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[14px] font-semibold text-[#191f28]">
                {item.description || cat?.label || title}
              </span>
              <p className="text-[11px] text-[#8b95a1] mt-[1px]">매월 {item.dayOfMonth}일</p>
            </div>
            <span className="text-[14px] font-bold tabular-nums mr-1" style={{ color: accentColor }}>
              {isIncome ? '+' : '-'}{formatCurrency(item.amount)}
            </span>
            <button
              onClick={() => onRemove(item.id)}
              className="text-[#b0b8c1] active:text-[#f04452] transition-colors p-1"
            >
              <IconTrash size={16} />
            </button>
          </div>
        )
      })}

      {showForm ? (
        <div className="mt-3 flex flex-col gap-3 p-4 bg-[#f8f9fa] rounded-xl">
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
            placeholder="금액"
            className="w-full h-[44px] px-3 rounded-xl bg-white text-[14px] font-semibold text-right focus:outline-none focus:ring-2 focus:ring-[#3182f6]"
            autoFocus
          />
          <div className="flex gap-2">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex-1 h-[44px] px-3 rounded-xl bg-white text-[13px] font-medium text-[#333d4b] focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            <input
              type="number"
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(e.target.value)}
              min={1}
              max={28}
              className="w-[80px] h-[44px] px-3 rounded-xl bg-white text-[13px] font-medium text-center focus:outline-none"
              placeholder="날짜"
            />
          </div>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={isIncome ? '설명 (예: 월급)' : '설명 (예: 넷플릭스)'}
            className="w-full h-[44px] px-3 rounded-xl bg-white text-[13px] font-medium focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(false)}
              className="flex-1 h-[42px] rounded-xl bg-white text-[13px] font-semibold text-[#8b95a1]"
            >
              취소
            </button>
            <button
              onClick={handleAdd}
              className="flex-1 h-[42px] rounded-xl text-white text-[13px] font-semibold active:scale-[0.98] transition-transform"
              style={{ backgroundColor: accentColor }}
            >
              추가
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full mt-2 py-[10px] rounded-xl border border-dashed border-[#d1d6db] text-[13px] font-semibold text-[#8b95a1] active:bg-[#f8f9fa] transition-colors"
        >
          + {title} 추가
        </button>
      )}
    </div>
  )
}
