'use client'

import { ArrowRight, CircleCheck, TriangleAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { useCommandStore } from '@/store/command-store'
import { FACILITY_MAP } from '@/data/facilities'
import { DRUG_MAP } from '@/data/drugs'
import type { RecommendedAction } from '@/types'
import { cn } from '@/lib/utils'

interface RecommendedActionsPanelProps {
  actions: RecommendedAction[]
}

export function RecommendedActionsPanel({ actions }: RecommendedActionsPanelProps) {
  const authorizeTransfer = useCommandStore((s) => s.authorizeTransfer)
  const activeTransfers = useCommandStore((s) => s.activeTransfers)

  return (
    <div className="flex h-full flex-col rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Recommended Actions
        </h2>
        <Badge variant={actions.length > 0 ? 'destructive' : 'secondary'} className="text-[10px]">
          {actions.length} open
        </Badge>
      </div>

      {actions.length === 0 ? (
        <Empty className="flex-1 py-8">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CircleCheck />
            </EmptyMedia>
            <EmptyTitle>No shortages detected</EmptyTitle>
            <EmptyDescription>All facilities are holding healthy or watch-level cover.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ScrollArea className="min-h-0 flex-1">
          <ul className="flex flex-col gap-2 p-3">
            {actions.map((action) => {
              const deficitFacility = FACILITY_MAP[action.deficitFacilityId]
              const donorFacility = FACILITY_MAP[action.donorFacilityId]
              const drug = DRUG_MAP[action.drugId]
              const alreadyDispatched = activeTransfers.some(
                (t) => t.toNode === action.deficitFacilityId && t.drugId === action.drugId && t.status === 'DISPATCHED',
              )

              return (
                <li
                  key={action.id}
                  className={cn(
                    'flex flex-col gap-2 rounded-md border p-3',
                    action.severity === 'STOCKOUT'
                      ? 'border-[var(--status-stockout)]/40 bg-[var(--status-stockout)]/5'
                      : 'border-[var(--status-critical)]/40 bg-[var(--status-critical)]/5',
                  )}
                >
                  <div className="flex items-start gap-2">
                    <TriangleAlert
                      className={cn(
                        'mt-0.5 size-4 shrink-0',
                        action.severity === 'STOCKOUT' ? 'text-[var(--status-stockout)]' : 'text-[var(--status-critical)]',
                      )}
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-0.5">
                      <p className="text-xs font-medium text-foreground">
                        {drug?.genericName} {drug?.strength}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{action.reason}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 rounded-md bg-background/60 px-2 py-1.5 text-[11px]">
                    <span className="truncate font-medium text-foreground">{donorFacility?.name}</span>
                    <ArrowRight className="size-3 shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span className="truncate font-medium text-foreground">{deficitFacility?.name}</span>
                    <span className="ml-auto shrink-0 font-mono-tabular text-muted-foreground">
                      {action.quantity} u · {action.etaMin}m
                    </span>
                  </div>

                  <Button
                    size="sm"
                    className="w-full"
                    disabled={alreadyDispatched}
                    onClick={() => authorizeTransfer(action)}
                  >
                    {alreadyDispatched ? 'Dispatch in transit' : 'Authorize Transfer'}
                  </Button>
                </li>
              )
            })}
          </ul>
        </ScrollArea>
      )}
    </div>
  )
}
