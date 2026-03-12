const currencyFormatter = new Intl.NumberFormat('ko-KR')

export function formatCurrency(amount: number): string {
  return `${currencyFormatter.format(amount)}원`
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  const month = date.getMonth() + 1
  const day = date.getDate()
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']
  const dayOfWeek = dayNames[date.getDay()]
  return `${month}월 ${day}일 (${dayOfWeek})`
}

export function getYearMonth(date: Date = new Date()): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export function getMonthLabel(yearMonth: string): string {
  const [y, m] = yearMonth.split('-')
  return `${y}년 ${parseInt(m)}월`
}
