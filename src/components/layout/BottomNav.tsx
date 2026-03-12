import { ReactNode } from 'react'
import { IconHome, IconHomeFill, IconList, IconListFill, IconMore, IconMoreFill } from '../common/Icons'

export type TabType = 'dashboard' | 'transactions' | 'settings'

interface BottomNavProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs: { id: TabType; label: string; icon: (active: boolean) => ReactNode }[] = [
  {
    id: 'dashboard',
    label: '홈',
    icon: (active) => active ? <IconHomeFill size={22} /> : <IconHome size={22} />,
  },
  {
    id: 'transactions',
    label: '내역',
    icon: (active) => active ? <IconListFill size={22} /> : <IconList size={22} />,
  },
  {
    id: 'settings',
    label: '더보기',
    icon: (active) => active ? <IconMoreFill size={22} /> : <IconMore size={22} />,
  },
]

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#eee] z-40 pb-[max(env(safe-area-inset-bottom),4px)]">
      <div className="max-w-lg mx-auto flex">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 flex flex-col items-center pt-[10px] pb-[6px] gap-[2px] active:opacity-60 transition-opacity ${
                isActive ? 'text-[#191f28]' : 'text-[#ADB5BD]'
              }`}
            >
              {tab.icon(isActive)}
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
