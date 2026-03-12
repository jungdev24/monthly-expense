import { v4 as uuidv4 } from 'uuid'
import { RecurringItem } from '../types'
import { useLocalStorage } from './useLocalStorage'

const STORAGE_KEY = 'monthly-recurring-items'

export function useRecurringItems() {
  const [items, setItems] = useLocalStorage<RecurringItem[]>(STORAGE_KEY, [])

  function addRecurring(data: Omit<RecurringItem, 'id'>) {
    setItems((prev) => [...prev, { ...data, id: uuidv4() }])
  }

  function removeRecurring(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function getRecurringTotal(type: 'income' | 'expense') {
    return items.filter((i) => i.type === type).reduce((sum, item) => sum + item.amount, 0)
  }

  return { recurringItems: items, addRecurring, removeRecurring, getRecurringTotal }
}
