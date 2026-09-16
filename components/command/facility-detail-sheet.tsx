'use client'

import { useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useCommandStore } from '@/store/command-store'
import { FACILITY_MAP, tierLabel } from '@/data/facilities'
import { FACILITY_FORMULARIES } from '@/lib/formulary'
import { STATUS_DOT_CLASS, STATUS_LABEL, STATUS_RANK } from '@/lib/status-styles'
import type { InventoryRecord } from '@/types'
import { cn } from '@/lib/utils'

interface FacilityDetailSheetProps {
  inventory: Map<string, InventoryRecord>
}

export function FacilityDetailSheet({ inventory }: FacilityDetailSheetProps) {
  const selectedFacilityId = useCommandStore((s) => s.selectedFacilityId)
  const selectFacility = useCommandStore((s) => s.selectFacility)
  const [query, setQuery] = useState('')

  const facility = selectedFacilityId ? FACILITY_MAP[selectedFacilityId] : null
  const formulary = selectedFacilityId ? FACILITY_FORMULARIES[selectedFacilityId] ?? [] : []

  const rows = useMemo(() => {
    if (!facility) return []
    return formulary
      .map((drug) => {
        const record = inventory.get(`${facility.facilityId}:${drug.drugId}`)
        return { drug, record }
      })
      .filter((row) => row.record)
      .filter((row) =>
        query.trim() === ''
          ? true
          : row.drug.genericName.toLowerCase().includes(query.trim().toLowerCase()),
      )
      .sort((a, b) => STATUS_RANK[a.record!.status] - STATUS_RANK[b.record!.status])
  }, [facility, formulary, inventory, query])

  return (
    <Sheet open={!!facility} onOpenChange={(open) => !open && selectFacility(null)}>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-2xl">
        {facility && (
          <>
            <SheetHeader>
              <SheetTitle>{facility.name}</SheetTitle>
              <SheetDescription>
                {tierLabel(facility.tier)} · {facility.corridor.toLowerCase()} corridor · formulary of{' '}
                {formulary.length} lines
              </SheetDescription>
            </SheetHeader>

            <div className="flex flex-col gap-3 overflow-hidden px-4 pb-4">
              <input
                type="search"
                placeholder="Filter formulary by drug name…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              />

              <ScrollArea className="h-[calc(100vh-13rem)] rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Drug</TableHead>
                      <TableHead className="text-right">Units</TableHead>
                      <TableHead className="text-right">Burn/day</TableHead>
                      <TableHead className="text-right">DoC</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rows.map(({ drug, record }) => (
                      <TableRow key={drug.drugId}>
                        <TableCell className="max-w-[180px]">
                          <div className="truncate text-xs font-medium text-foreground">{drug.genericName}</div>
                          <div className="truncate text-[10px] text-muted-foreground">
                            {drug.strength} · {drug.dosageForm}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-mono-tabular text-xs">
                          {record!.currentUnits}
                        </TableCell>
                        <TableCell className="text-right font-mono-tabular text-xs">
                          {record!.dailyBurn}
                        </TableCell>
                        <TableCell className="text-right font-mono-tabular text-xs">
                          {record!.daysOfCover}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="outline" className="gap-1.5 text-[10px]">
                            <span className={cn('size-1.5 rounded-full', STATUS_DOT_CLASS[record!.status])} />
                            {STATUS_LABEL[record!.status]}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
