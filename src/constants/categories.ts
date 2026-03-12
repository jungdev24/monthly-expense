import { Category } from '../types'

export const EXPENSE_CATEGORIES: Category[] = [
  { id: 'food', label: '식비', icon: '🍚', color: '#ff6b6b', type: 'expense' },
  { id: 'cafe', label: '카페', icon: '☕', color: '#cc5de8', type: 'expense' },
  { id: 'transport', label: '교통', icon: '🚌', color: '#339af0', type: 'expense' },
  { id: 'housing', label: '주거', icon: '🏠', color: '#7950f2', type: 'expense' },
  { id: 'telecom', label: '통신', icon: '📱', color: '#22b8cf', type: 'expense' },
  { id: 'medical', label: '의료', icon: '🏥', color: '#f06595', type: 'expense' },
  { id: 'education', label: '교육', icon: '📚', color: '#20c997', type: 'expense' },
  { id: 'shopping', label: '쇼핑', icon: '🛒', color: '#fcc419', type: 'expense' },
  { id: 'leisure', label: '문화/여가', icon: '🎬', color: '#845ef7', type: 'expense' },
  { id: 'etc_expense', label: '기타', icon: '💸', color: '#868e96', type: 'expense' },
]

export const INCOME_CATEGORIES: Category[] = [
  { id: 'salary', label: '급여', icon: '💰', color: '#3182f6', type: 'income' },
  { id: 'side', label: '부수입', icon: '💵', color: '#12b886', type: 'income' },
  { id: 'allowance', label: '용돈', icon: '🎁', color: '#22b8cf', type: 'income' },
  { id: 'investment', label: '투자', icon: '📈', color: '#7950f2', type: 'income' },
  { id: 'etc_income', label: '기타', icon: '💳', color: '#868e96', type: 'income' },
]

export const ALL_CATEGORIES = [...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]

export function getCategoryById(id: string): Category | undefined {
  return ALL_CATEGORIES.find((c) => c.id === id)
}
