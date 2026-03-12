import MonthPicker from '../common/MonthPicker'

interface HeaderProps {
  currentMonth: string
  onMonthChange: (month: string) => void
}

export default function Header({ currentMonth, onMonthChange }: HeaderProps) {
  return (
    <header className="bg-white sticky top-0 z-40 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="max-w-lg mx-auto flex items-center justify-between h-[56px] px-5">
        <h1 className="text-[18px] font-bold text-[#191f28]">가계부</h1>
        <MonthPicker value={currentMonth} onChange={onMonthChange} />
      </div>
    </header>
  )
}
