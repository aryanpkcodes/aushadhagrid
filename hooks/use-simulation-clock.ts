'use client'

import { useEffect } from 'react'
import { useCommandStore } from '@/store/command-store'

const TICK_MS = 1800

export function useSimulationClock() {
  const isPlaying = useCommandStore((s) => s.isPlaying)
  const tick = useCommandStore((s) => s.tick)

  useEffect(() => {
    if (!isPlaying) return
    const interval = window.setInterval(() => {
      tick()
    }, TICK_MS)
    return () => window.clearInterval(interval)
  }, [isPlaying, tick])
}
