import { Transaction } from '../types'
import { ThemeMode } from '../hooks/useTheme'
import { IconUpload, IconDownload, IconTrash } from '../components/common/Icons'

interface SettingsPageProps {
  transactions: Transaction[]
  onImport: (data: Transaction[]) => void
  themeMode: ThemeMode
  onThemeChange: (mode: ThemeMode) => void
}

export default function SettingsPage({ transactions, onImport, themeMode, onThemeChange }: SettingsPageProps) {
  function handleExport() {
    const json = JSON.stringify(transactions, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `가계부_${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string)
        if (Array.isArray(data)) {
          onImport(data)
          alert(`${data.length}건의 거래를 불러왔습니다.`)
        }
      } catch {
        alert('올바른 JSON 파일이 아닙니다.')
      }
    }
    reader.readAsText(file)
  }

  function handleClear() {
    if (confirm('모든 데이터를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
      onImport([])
    }
  }

  const themes: { value: ThemeMode; label: string }[] = [
    { value: 'system', label: '시스템' },
    { value: 'light', label: '라이트' },
    { value: 'dark', label: '다크' },
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* Theme */}
      <div className="bg-white rounded-2xl px-5 py-5">
        <h3 className="text-[15px] font-bold text-[#191f28] mb-3">화면 모드</h3>
        <div className="flex gap-2">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => onThemeChange(t.value)}
              className={`flex-1 py-[10px] rounded-xl text-[13px] font-semibold transition-all ${
                themeMode === t.value
                  ? 'bg-[#e8f3ff] text-[#3182f6] ring-[1.5px] ring-[#3182f6]'
                  : 'bg-[#f2f4f6] text-[#8b95a1]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Data */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <h3 className="text-[15px] font-bold text-[#191f28] px-5 pt-5 pb-2">데이터 관리</h3>

        <button
          onClick={handleExport}
          className="w-full px-5 py-[14px] flex items-center gap-4 active:bg-[#f8f9fa] transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-[14px] bg-[#e8f3ff] flex items-center justify-center text-[#3182f6]">
            <IconUpload size={18} />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#191f28]">데이터 내보내기</p>
            <p className="text-[12px] text-[#8b95a1] mt-[1px]">JSON 파일로 백업</p>
          </div>
        </button>

        <label className="w-full px-5 py-[14px] flex items-center gap-4 active:bg-[#f8f9fa] transition-colors cursor-pointer">
          <div className="w-10 h-10 rounded-[14px] bg-[#e5f8ee] flex items-center justify-center text-[#20c997]">
            <IconDownload size={18} />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#191f28]">데이터 불러오기</p>
            <p className="text-[12px] text-[#8b95a1] mt-[1px]">JSON 파일에서 복원</p>
          </div>
          <input type="file" accept=".json" onChange={handleImport} className="hidden" />
        </label>

        <button
          onClick={handleClear}
          className="w-full px-5 py-[14px] flex items-center gap-4 active:bg-[#f8f9fa] transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-[14px] bg-[#fff0f1] flex items-center justify-center text-[#f04452]">
            <IconTrash size={18} />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#f04452]">전체 삭제</p>
            <p className="text-[12px] text-[#8b95a1] mt-[1px]">모든 거래 내역을 삭제합니다</p>
          </div>
        </button>
      </div>

      {/* Info */}
      <div className="bg-white rounded-2xl px-5 py-5">
        <h3 className="text-[15px] font-bold text-[#191f28] mb-4">정보</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-[13px]">
            <span className="text-[#8b95a1]">총 거래 건수</span>
            <span className="font-semibold text-[#333d4b]">{transactions.length}건</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#8b95a1]">저장 위치</span>
            <span className="font-semibold text-[#333d4b]">브라우저 로컬 스토리지</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-[#8b95a1]">버전</span>
            <span className="font-semibold text-[#333d4b]">1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  )
}
