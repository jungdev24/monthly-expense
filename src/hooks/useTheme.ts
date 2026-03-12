import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export type ThemeMode = 'system' | 'light' | 'dark'

export function useTheme() {
  const [mode, setMode] = useLocalStorage<ThemeMode>('monthly-theme', 'system')

  useEffect(() => {
    const root = document.documentElement

    function apply() {
      if (mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }

    apply()

    if (mode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [mode])

  return { mode, setMode }
}
