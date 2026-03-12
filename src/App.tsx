import { useState, useMemo } from 'react'
import { getYearMonth } from './utils/format'
import { useTransactions } from './hooks/useTransactions'
import { useRecurringItems } from './hooks/useRecurringIncome'
import { useTheme } from './hooks/useTheme'
import Header from './components/layout/Header'
import BottomNav, { TabType } from './components/layout/BottomNav'
import TransactionForm from './components/transaction/TransactionForm'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import SettingsPage from './pages/SettingsPage'
import { Transaction } from './types'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [currentMonth, setCurrentMonth] = useState(getYearMonth())
  const [showForm, setShowForm] = useState(false)

  const { transactions, addTransaction, deleteTransaction, getMonthlyTransactions, getMonthlyStats } =
    useTransactions()
  const { recurringItems, addRecurring, removeRecurring, getRecurringTotal } =
    useRecurringItems()
  const { mode: themeMode, setMode: setThemeMode } = useTheme()

  const [, setRawTransactions] = useLocalStorage<Transaction[]>('monthly-transactions', [])

  const monthlyTx = useMemo(() => getMonthlyTransactions(currentMonth), [transactions, currentMonth])
  const recurringIncome = getRecurringTotal('income')
  const recurringExpense = getRecurringTotal('expense')
  const stats = useMemo(() => {
    const base = getMonthlyStats(currentMonth)
    return {
      ...base,
      totalIncome: base.totalIncome + recurringIncome,
      totalExpense: base.totalExpense + recurringExpense,
      balance: (base.totalIncome + recurringIncome) - (base.totalExpense + recurringExpense),
    }
  }, [transactions, currentMonth, recurringIncome, recurringExpense])

  const trendData = useMemo(() => {
    const months: string[] = []
    const [y, m] = currentMonth.split('-').map(Number)
    for (let i = 5; i >= 0; i--) {
      const d = new Date(y, m - 1 - i)
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      months.push(ym)
    }
    return months.map((month) => {
      const s = getMonthlyStats(month)
      return {
        month,
        income: s.totalIncome + recurringIncome,
        expense: s.totalExpense + recurringExpense,
      }
    })
  }, [transactions, currentMonth, recurringIncome, recurringExpense])

  function handleNavigateToTransactions() {
    setActiveTab('transactions')
    setShowForm(true)
  }

  return (
    <div className="min-h-screen bg-[#f2f4f6] pb-[68px]">
      <Header currentMonth={currentMonth} onMonthChange={setCurrentMonth} />

      <main className="max-w-lg mx-auto px-4 pt-3">
        {activeTab === 'dashboard' && (
          <DashboardPage
            stats={stats}
            trendData={trendData}
            onNavigateToTransactions={handleNavigateToTransactions}
            recurringItems={recurringItems}
            onAddRecurring={addRecurring}
            onRemoveRecurring={removeRecurring}
          />
        )}
        {activeTab === 'transactions' && (
          <TransactionsPage
            transactions={monthlyTx}
            stats={stats}
            onDelete={deleteTransaction}
            onAdd={() => setShowForm(true)}
          />
        )}
        {activeTab === 'settings' && (
          <SettingsPage
            transactions={transactions}
            onImport={setRawTransactions}
            themeMode={themeMode}
            onThemeChange={setThemeMode}
          />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <TransactionForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={(data) => addTransaction(data)}
      />
    </div>
  )
}
