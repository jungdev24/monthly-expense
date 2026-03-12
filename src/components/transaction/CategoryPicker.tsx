import { TransactionType } from '../../types'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants/categories'
import { CategoryIcon } from '../common/CategoryIcons'

interface CategoryPickerProps {
  type: TransactionType
  selected: string
  onSelect: (id: string) => void
}

export default function CategoryPicker({ type, selected, onSelect }: CategoryPickerProps) {
  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isSelected = selected === cat.id
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelect(cat.id)}
            className={`flex items-center gap-[6px] px-3 py-[8px] rounded-xl text-[13px] font-semibold transition-all active:scale-95 ${
              isSelected
                ? 'bg-[#e8f3ff] text-[#3182f6] ring-[1.5px] ring-[#3182f6]'
                : 'bg-[#f2f4f6] text-[#6b7684]'
            }`}
          >
            <CategoryIcon id={cat.id} size={16} color={isSelected ? '#3182f6' : cat.color} />
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
