interface EmptyStateProps {
  message: string
  sub?: string
}

export default function EmptyState({ message, sub }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mb-4">
        <rect width="48" height="48" rx="24" fill="#F2F4F6"/>
        <path d="M16 20h16M16 26h10M16 32h6" stroke="#D1D6DB" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <p className="text-[14px] font-medium text-[#8b95a1]">{message}</p>
      {sub && <p className="text-[13px] text-[#b0b8c1] mt-1">{sub}</p>}
    </div>
  )
}
