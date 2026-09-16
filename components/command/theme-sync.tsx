'use client'

import { useEffect } from 'react'
import { useCommandStore } from '@/store/command-store'

// Keeps the <html> class in sync with the store's theme so Tailwind's
// dark-mode variant tracks the toggle in the top bar. The store always
// initializes to 'dark' (matching the server-rendered markup); right after
// mount this reconciles it with the persisted preference, then keeps the
// class attribute updated on every subsequent toggle.
export function ThemeSync() {
  const theme = useCommandStore((s) => s.theme)
  const setTheme = useCommandStore((s) => s.setTheme)

  useEffect(() => {
    const stored = window.localStorage.getItem('aushadha-theme')
    if (stored === 'light') setTheme('light')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return null
}
