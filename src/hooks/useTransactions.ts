import { v4 as uuidv4 } from 'uuid'
import { Transaction, MonthlyStats, PaymentMethod } from '../types'
import { getCategoryById } from '../constants/categories'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'monthly-transactions'

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>(STORAGE_KEY, [])

  function addTransaction(data: {
    type: Transaction['type']
    amount: number
    category: string
    description: string
    date: string
    paymentMethod?: PaymentMethod
    installmentMonths?: number
  }) {
    const { installmentMonths, ...rest } = data

    // 할부 처리: N개월 할부면 N개의 거래를 각 월에 생성
    if (installmentMonths && installmentMonths > 1 && data.type === 'expense') {
      const monthlyAmount = Math.round(data.amount / installmentMonths)
      const remainder = data.amount - monthlyAmount * installmentMonths
      const groupId = uuidv4()
      const [year, month, day] = data.date.split('-').map(Number)

      const newTxs: Transaction[] = []
      for (let i = 0; i < installmentMonths; i++) {
        const txDate = new Date(year, month - 1 + i, Math.min(day, 28))
        const ym = `${txDate.getFullYear()}-${String(txDate.getMonth() + 1).padStart(2, '0')}`
        const d = String(Math.min(day, new Date(txDate.getFullYear(), txDate.getMonth() + 1, 0).getDate())).padStart(2, '0')

        newTxs.push({
          ...rest,
          id: uuidv4(),
          amount: i === 0 ? monthlyAmount + remainder : monthlyAmount,
          date: `${ym}-${d}`,
          createdAt: new Date().toISOString(),
          installmentMonths,
          installmentCurrent: i + 1,
          installmentGroupId: groupId,
        })
      }

      setTransactions((prev) => [...newTxs.reverse(), ...prev])
    } else {
      const newTx: Transaction = {
        ...rest,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      }
      setTransactions((prev) => [newTx, ...prev])
    }
  }

  function deleteTransaction(id: string) {
    const tx = transactions.find((t) => t.id === id)
    if (tx?.installmentGroupId) {
      // 할부 거래는 전체 삭제 여부 확인
      if (confirm('이 할부의 모든 내역을 삭제하시겠습니까?')) {
        setTransactions((prev) => prev.filter((t) => t.installmentGroupId !== tx.installmentGroupId))
      }
    } else {
      setTransactions((prev) => prev.filter((t) => t.id !== id))
    }
  }

  function getMonthlyTransactions(yearMonth: string): Transaction[] {
    return transactions
      .filter((t) => t.date.startsWith(yearMonth))
      .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
  }

  function getMonthlyStats(yearMonth: string): MonthlyStats {
    const monthly = getMonthlyTransactions(yearMonth)
    const totalIncome = monthly.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
    const totalExpense = monthly.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)

    const categoryMap = new Map<string, number>()
    monthly
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        categoryMap.set(t.category, (categoryMap.get(t.category) || 0) + t.amount)
      })

    const byCategory = Array.from(categoryMap.entries())
      .map(([catId, amount]) => {
        const cat = getCategoryById(catId)
        return {
          category: catId,
          label: cat?.label || catId,
          amount,
          color: cat?.color || '#868e96',
          icon: cat?.icon || '💸',
        }
      })
      .sort((a, b) => b.amount - a.amount)

    return { totalIncome, totalExpense, balance: totalIncome - totalExpense, byCategory }
  }

  return { transactions, addTransaction, deleteTransaction, getMonthlyTransactions, getMonthlyStats }
}
