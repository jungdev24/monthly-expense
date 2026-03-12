import { useState } from 'react'
import { TransactionType, PaymentMethod } from '../../types'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants/categories'
import Modal from '../common/Modal'
import CategoryPicker from './CategoryPicker'

interface TransactionFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    type: TransactionType
    amount: number
    category: string
    description: string
    date: string
    paymentMethod?: PaymentMethod
    installmentMonths?: number
  }) => void
}

const INSTALLMENT_OPTIONS = [1, 2, 3, 6, 10, 12, 24, 36]

export default function TransactionForm({ isOpen, onClose, onSubmit }: TransactionFormProps) {
  const today = new Date().toISOString().split('T')[0]
  const [type, setType] = useState<TransactionType>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].id)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(today)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [installmentMonths, setInstallmentMonths] = useState(1)

  function handleTypeChange(newType: TransactionType) {
    setType(newType)
    setCategory(newType === 'expense' ? EXPENSE_CATEGORIES[0].id : INCOME_CATEGORIES[0].id)
    if (newType === 'income') {
      setPaymentMethod('transfer')
      setInstallmentMonths(1)
    }
  }

  function formatDisplayAmount(val: string) {
    const num = parseInt(val)
    if (!num) return ''
    return num.toLocaleString('ko-KR')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const numAmount = parseInt(amount)
    if (!numAmount || numAmount <= 0) return
    onSubmit({
      type,
      amount: numAmount,
      category,
      description,
      date,
      paymentMethod,
      installmentMonths: paymentMethod === 'card' && installmentMonths > 1 ? installmentMonths : undefined,
    })
    setAmount('')
    setDescription('')
    setDate(today)
    setType('expense')
    setCategory(EXPENSE_CATEGORIES[0].id)
    setPaymentMethod('card')
    setInstallmentMonths(1)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="내역 추가">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Type Toggle - 토스 스타일 세그먼트 */}
        <div className="flex rounded-xl bg-[#f2f4f6] p-[3px]">
          <button
            type="button"
            onClick={() => handleTypeChange('expense')}
            className={`flex-1 py-[10px] rounded-[10px] text-[14px] font-semibold transition-all ${
              type === 'expense' ? 'bg-white text-[#f04452] shadow-sm' : 'text-[#8b95a1]'
            }`}
          >
            지출
          </button>
          <button
            type="button"
            onClick={() => handleTypeChange('income')}
            className={`flex-1 py-[10px] rounded-[10px] text-[14px] font-semibold transition-all ${
              type === 'income' ? 'bg-white text-[#3182f6] shadow-sm' : 'text-[#8b95a1]'
            }`}
          >
            수입
          </button>
        </div>

        {/* Amount */}
        <div>
          <label className="text-[13px] font-semibold text-[#6b7684] mb-2 block">금액</label>
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={formatDisplayAmount(amount)}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
              placeholder="0"
              className="w-full h-[52px] px-4 text-[22px] font-bold rounded-2xl bg-[#f2f4f6] focus:outline-none focus:ring-2 focus:ring-[#3182f6] text-right pr-12 text-[#191f28] placeholder:text-[#d1d6db]"
              autoFocus
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-[#8b95a1] font-semibold">원</span>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-[13px] font-semibold text-[#6b7684] mb-2 block">카테고리</label>
          <CategoryPicker type={type} selected={category} onSelect={setCategory} />
        </div>

        {/* Payment method (expense only) */}
        {type === 'expense' && (
          <div>
            <label className="text-[13px] font-semibold text-[#6b7684] mb-2 block">결제 방법</label>
            <div className="flex gap-2">
              {([['card', '카드'], ['cash', '현금'], ['transfer', '이체']] as [PaymentMethod, string][]).map(([method, label]) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(method)
                    if (method !== 'card') setInstallmentMonths(1)
                  }}
                  className={`flex-1 py-[10px] rounded-xl text-[13px] font-semibold transition-all ${
                    paymentMethod === method
                      ? 'bg-[#e8f3ff] text-[#3182f6] ring-[1.5px] ring-[#3182f6]'
                      : 'bg-[#f2f4f6] text-[#8b95a1]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Installment (card only) */}
        {type === 'expense' && paymentMethod === 'card' && (
          <div>
            <label className="text-[13px] font-semibold text-[#6b7684] mb-2 block">할부</label>
            <div className="flex gap-[6px] overflow-x-auto no-scrollbar pb-1">
              {INSTALLMENT_OPTIONS.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setInstallmentMonths(m)}
                  className={`shrink-0 px-4 py-[9px] rounded-xl text-[13px] font-semibold transition-all ${
                    installmentMonths === m
                      ? 'bg-[#e8f3ff] text-[#3182f6] ring-[1.5px] ring-[#3182f6]'
                      : 'bg-[#f2f4f6] text-[#8b95a1]'
                  }`}
                >
                  {m === 1 ? '일시불' : `${m}개월`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Date */}
        <div>
          <label className="text-[13px] font-semibold text-[#6b7684] mb-2 block">날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-[48px] px-4 rounded-2xl bg-[#f2f4f6] text-[14px] font-medium text-[#333d4b] focus:outline-none focus:ring-2 focus:ring-[#3182f6]"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-[13px] font-semibold text-[#6b7684] mb-2 block">메모</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="어디서 사용했나요?"
            className="w-full h-[48px] px-4 rounded-2xl bg-[#f2f4f6] text-[14px] font-medium text-[#333d4b] placeholder:text-[#d1d6db] focus:outline-none focus:ring-2 focus:ring-[#3182f6]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full h-[52px] rounded-2xl text-white font-bold text-[15px] transition-all active:scale-[0.98] bg-[#3182f6] hover:bg-[#1b64da]"
        >
          추가하기
        </button>
      </form>
    </Modal>
  )
}
