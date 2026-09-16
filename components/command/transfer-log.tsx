'use client'

import { FileText, Truck } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { useCommandStore } from '@/store/command-store'
import { FACILITY_MAP } from '@/data/facilities'
import type { TransferOrder } from '@/types'

interface TransferLogProps {
  transfers: TransferOrder[]
}

export function TransferLog({ transfers }: TransferLogProps) {
  const openIstoDocument = useCommandStore((s) => s.openIstoDocument)
  const setLastAuthorized = useCommandStore.setState

  const ordered = [...transfers].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <div className="flex h-full flex-col rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Inter-Store Transfer Log
        </h2>
        <Badge variant="secondary" className="text-[10px]">
          {transfers.length} dispatched
        </Badge>
      </div>

      {ordered.length === 0 ? (
        <Empty className="flex-1 py-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Truck />
            </EmptyMedia>
            <EmptyTitle>No transfers yet</EmptyTitle>
            <EmptyDescription>Authorized dispatches will appear here with a live ISTO reference.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          <ul className="flex flex-col gap-2 p-3">
            {ordered.map((t) => {
              const from = FACILITY_MAP[t.fromNode]
              const to = FACILITY_MAP[t.toNode]
              return (
                <li key={t.id} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tabular text-[11px] font-medium text-foreground">
                      {t.referenceNo}
                    </span>
                    <button
                      className="flex items-center gap-1 text-[11px] text-primary hover:underline"
                      onClick={() => {
                        setLastAuthorized({ lastAuthorized: t })
                        openIstoDocument()
                      }}
                    >
                      <FileText className="size-3" aria-hidden="true" />
                      ISTO
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-foreground">
                    {t.drugName} {t.strength} · {t.quantity} units
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {from?.name} → {to?.name} · {t.distanceKm} km · ETA {t.etaMin}m
                  </p>
                </li>
              )
            })}
          </ul>
        </ScrollArea>
      )}
    </div>
  )
}
