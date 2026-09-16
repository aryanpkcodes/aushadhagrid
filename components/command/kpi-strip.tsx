'use client'

import { Boxes, Gauge, TriangleAlert, Truck } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { KpiSnapshot } from '@/types'

interface KpiStripProps {
  kpis: KpiSnapshot
}

export function KpiStrip({ kpis }: KpiStripProps) {
  const items = [
    {
      label: 'Usable Units, District-Wide',
      value: kpis.usableUnits.toLocaleString('en-IN'),
      icon: Boxes,
      tone: 'default' as const,
    },
    {
      label: 'Burn Velocity',
      value: `${kpis.burnVelocityPct > 0 ? '+' : ''}${kpis.burnVelocityPct}%`,
      icon: Gauge,
      tone: kpis.burnVelocityPct > 15 ? ('critical' as const) : kpis.burnVelocityPct > 0 ? ('watch' as const) : ('default' as const),
    },
    {
      label: 'Stockout Threat Nodes',
      value: String(kpis.stockoutThreatNodes),
      icon: TriangleAlert,
      tone: kpis.stockoutThreatNodes > 0 ? ('critical' as const) : ('default' as const),
    },
    {
      label: 'Active In-Transit Vectors',
      value: String(kpis.activeInTransitVectors),
      icon: Truck,
      tone: 'default' as const,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2 border-b border-border bg-card/40 px-4 py-3 sm:grid-cols-4 sm:gap-3 sm:px-6">
      {items.map((item) => (
        <div
          key={item.label}
          className={cn(
            'flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2.5',
            item.tone === 'critical' && 'border-[var(--status-critical)]/40 bg-[var(--status-critical)]/5',
            item.tone === 'watch' && 'border-[var(--status-watch)]/40 bg-[var(--status-watch)]/5',
          )}
        >
          <item.icon
            className={cn(
              'size-4 shrink-0 text-muted-foreground',
              item.tone === 'critical' && 'text-[var(--status-critical)]',
              item.tone === 'watch' && 'text-[var(--status-watch)]',
            )}
            aria-hidden="true"
          />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {item.label}
            </span>
            <span className="font-mono-tabular text-lg font-semibold tabular-nums text-foreground">
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
