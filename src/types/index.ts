export type TransactionType = 'income' | 'expense'
export type PaymentMethod = 'cash' | 'card' | 'transfer'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  category: string
  description: string
  date: string // YYYY-MM-DD
  createdAt: string
  paymentMethod?: PaymentMethod
  installmentMonths?: number // 할부 개월 수 (2~36), 없으면 일시불
  installmentCurrent?: number // 현재 할부 회차
  installmentGroupId?: string // 할부 그룹 ID (같은 결제의 할부끼리 묶기)
}

export interface Category {
  id: string
  label: string
  icon: string
  color: string
  type: TransactionType
}

export interface RecurringItem {
  id: string
  type: TransactionType
  amount: number
  category: string
  description: string
  dayOfMonth: number // 매월 몇일
}

// backward compat alias
export type RecurringIncome = RecurringItem

export interface MonthlyStats {
  totalIncome: number
  totalExpense: number
  balance: number
  byCategory: { category: string; label: string; amount: number; color: string; icon: string }[]
}
