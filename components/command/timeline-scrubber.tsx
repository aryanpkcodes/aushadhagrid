'use client'

import { Pause, Play, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useCommandStore } from '@/store/command-store'
import { PLAYHEAD_MARKERS, TOTAL_DAYS } from '@/data/scenarios'
import { useSimulationClock } from '@/hooks/use-simulation-clock'
import { cn } from '@/lib/utils'

export function TimelineScrubber() {
  useSimulationClock()

  const currentDay = useCommandStore((s) => s.currentDay)
  const isPlaying = useCommandStore((s) => s.isPlaying)
  const play = useCommandStore((s) => s.play)
  const pause = useCommandStore((s) => s.pause)
  const reset = useCommandStore((s) => s.reset)
  const setDay = useCommandStore((s) => s.setDay)

  return (
    <div className="flex flex-col gap-2 border-b border-border bg-card/60 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant={isPlaying ? 'secondary' : 'default'}
          onClick={() => (isPlaying ? pause() : play())}
          aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button size="icon" variant="outline" onClick={reset} aria-label="Reset simulation">
          <RotateCcw />
        </Button>

        <div className="relative flex-1 pt-4">
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-0.5 text-[9px] uppercase tracking-wide text-muted-foreground">
            {PLAYHEAD_MARKERS.map((marker) => (
              <span
                key={marker.day}
                className="absolute -translate-x-1/2"
                style={{ left: `${((marker.day - 1) / (TOTAL_DAYS - 1)) * 100}%` }}
              >
                {marker.label}
              </span>
            ))}
          </div>
          <Slider
            min={1}
            max={TOTAL_DAYS}
            step={1}
            value={[currentDay]}
            onValueChange={(next) => {
              const value = Array.isArray(next) ? next[0] : next
              setDay(value)
            }}
            aria-label="Simulation day"
          />
        </div>

        <span className="w-16 shrink-0 text-right font-mono-tabular text-sm font-medium tabular-nums text-foreground">
          Day {currentDay}
        </span>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pl-[3.25rem]">
        {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => setDay(day)}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              day <= currentDay ? 'bg-primary' : 'bg-muted',
            )}
            aria-label={`Jump to day ${day}`}
          />
        ))}
      </div>
    </div>
  )
}
