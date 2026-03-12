import { useEffect, useRef, ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end justify-center animate-fade-in"
      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="w-full max-w-lg bg-white rounded-t-[20px] max-h-[92vh] flex flex-col animate-slide-up">
        <div className="shrink-0 px-6 pt-6 pb-4">
          <div className="w-9 h-[3px] rounded-full bg-[#d1d6db] mx-auto mb-5" />
          <h2 className="text-[18px] font-bold text-[#191f28]">{title}</h2>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-[max(env(safe-area-inset-bottom),24px)]">
          {children}
        </div>
      </div>
    </div>
  )
}
