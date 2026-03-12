import { getMonthLabel } from '../../utils/format'
import { IconChevronLeft, IconChevronRight } from './Icons'

interface MonthPickerProps {
  value: string
  onChange: (value: string) => void
}

export default function MonthPicker({ value, onChange }: MonthPickerProps) {
  function shift(delta: number) {
    const [y, m] = value.split('-').map(Number)
    const date = new Date(y, m - 1 + delta)
    const ny = date.getFullYear()
    const nm = String(date.getMonth() + 1).padStart(2, '0')
    onChange(`${ny}-${nm}`)
  }

  return (
    <div className="flex items-center gap-0">
      <button
        onClick={() => shift(-1)}
        className="w-8 h-8 flex items-center justify-center rounded-full active:bg-[#f2f4f6] text-[#8b95a1] transition-colors"
      >
        <IconChevronLeft size={18} />
      </button>
      <span className="text-[14px] font-semibold text-[#333d4b] min-w-[88px] text-center select-none">
        {getMonthLabel(value)}
      </span>
      <button
        onClick={() => shift(1)}
        className="w-8 h-8 flex items-center justify-center rounded-full active:bg-[#f2f4f6] text-[#8b95a1] transition-colors"
      >
        <IconChevronRight size={18} />
      </button>
    </div>
  )
}
