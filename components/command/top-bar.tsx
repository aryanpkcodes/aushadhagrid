'use client'

import { ShieldHalf, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCommandStore } from '@/store/command-store'
import { SCENARIO_LABELS, TOTAL_DAYS } from '@/data/scenarios'
import { cn } from '@/lib/utils'

const SCENARIO_ACCENT: Record<string, string> = {
  NORMAL: 'bg-[var(--status-healthy)]',
  MONSOON_RISE: 'bg-[var(--status-watch)]',
  COASTAL_LEPTOSPIROSIS_SURGE: 'bg-[var(--status-critical)]',
  HOSPITAL_INFLUX: 'bg-[var(--status-critical)]',
  RESPIRATORY_SURGE: 'bg-[var(--status-watch)]',
  SUPPLY_DELAY: 'bg-[var(--status-stockout)]',
}

export function TopBar() {
  const currentDay = useCommandStore((s) => s.currentDay)
  const scenario = useCommandStore((s) => s.simulationScenario)
  const theme = useCommandStore((s) => s.theme)
  const toggleTheme = useCommandStore((s) => s.toggleTheme)

  return (
    <header className="flex flex-col gap-3 border-b border-border bg-sidebar px-4 py-3 text-sidebar-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-sidebar-border bg-sidebar-accent">
          <ShieldHalf className="size-5 text-sidebar-primary" aria-hidden="true" />
        </div>
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-semibold tracking-tight text-sidebar-foreground sm:text-lg">
              AUSHADHA-GRID
            </h1>
            <Badge
              variant="outline"
              className="hidden border-sidebar-border text-[10px] font-medium uppercase tracking-wider text-sidebar-foreground/70 sm:inline-flex"
            >
              Command Tower
            </Badge>
          </div>
          <p className="text-[11px] text-sidebar-foreground/60 sm:text-xs">
            Udupi District Health Logistics · Dept. of Health &amp; Family Welfare, Karnataka
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/60 px-3 py-1.5">
          <span
            className={cn(
              'size-2 animate-pulse rounded-full',
              SCENARIO_ACCENT[scenario] ?? 'bg-[var(--status-healthy)]',
            )}
            aria-hidden="true"
          />
          <span className="text-xs font-medium text-sidebar-foreground">{SCENARIO_LABELS[scenario]}</span>
        </div>

        <div className="rounded-md border border-sidebar-border bg-sidebar-accent/60 px-3 py-1.5 font-mono text-xs font-medium text-sidebar-foreground">
          DAY <span className="font-mono-tabular">{String(currentDay).padStart(2, '0')}</span> /{' '}
          {String(TOTAL_DAYS).padStart(2, '0')}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="border-sidebar-border bg-sidebar-accent/60 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  )
}
