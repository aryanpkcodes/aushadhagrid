'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCommandStore } from '@/store/command-store'
import { FACILITY_MAP, tierLabel } from '@/data/facilities'
import { DRUG_MAP } from '@/data/drugs'
import { SCENARIO_LABELS } from '@/data/scenarios'

export function IstoDocumentDialog() {
  const showIstoDocument = useCommandStore((s) => s.showIstoDocument)
  const closeIstoDocument = useCommandStore((s) => s.closeIstoDocument)
  const transfer = useCommandStore((s) => s.lastAuthorized)

  if (!transfer) return null

  const from = FACILITY_MAP[transfer.fromNode]
  const to = FACILITY_MAP[transfer.toNode]
  const drug = DRUG_MAP[transfer.drugId]

  return (
    <Dialog open={showIstoDocument} onOpenChange={(open) => !open && closeIstoDocument()}>
      <DialogContent className="max-w-lg font-mono">
        <DialogHeader>
          <DialogTitle className="font-sans text-base">Inter-Store Transfer Order</DialogTitle>
          <DialogDescription className="font-sans">
            Government of Karnataka · Department of Health &amp; Family Welfare · Udupi District Drug
            Warehousing Unit
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <dl className="grid grid-cols-2 gap-y-2 text-xs">
          <dt className="text-muted-foreground">Reference No.</dt>
          <dd className="text-right font-medium text-foreground">{transfer.referenceNo}</dd>

          <dt className="text-muted-foreground">Batch No.</dt>
          <dd className="text-right font-medium text-foreground">{transfer.batchNo}</dd>

          <dt className="text-muted-foreground">Simulation Day</dt>
          <dd className="text-right font-medium text-foreground">Day {transfer.simulationDay}</dd>

          <dt className="text-muted-foreground">Operating Scenario</dt>
          <dd className="text-right font-medium text-foreground">{SCENARIO_LABELS[transfer.scenario]}</dd>

          <dt className="text-muted-foreground">Issuing Facility</dt>
          <dd className="text-right font-medium text-foreground">
            {from?.name}
            <span className="ml-1 text-muted-foreground">({from ? tierLabel(from.tier) : ''})</span>
          </dd>

          <dt className="text-muted-foreground">Receiving Facility</dt>
          <dd className="text-right font-medium text-foreground">
            {to?.name}
            <span className="ml-1 text-muted-foreground">({to ? tierLabel(to.tier) : ''})</span>
          </dd>

          <dt className="text-muted-foreground">Item</dt>
          <dd className="text-right font-medium text-foreground">
            {drug?.genericName} {drug?.strength}
          </dd>

          <dt className="text-muted-foreground">Dosage Form</dt>
          <dd className="text-right font-medium text-foreground">{drug?.dosageForm}</dd>

          <dt className="text-muted-foreground">Quantity Dispatched</dt>
          <dd className="text-right font-medium text-foreground">
            {transfer.quantity} {drug?.unitType}(s)
          </dd>

          <dt className="text-muted-foreground">Route Distance</dt>
          <dd className="text-right font-medium text-foreground">{transfer.distanceKm} km</dd>

          <dt className="text-muted-foreground">Estimated Transit</dt>
          <dd className="text-right font-medium text-foreground">{transfer.etaMin} minutes</dd>

          <dt className="text-muted-foreground">Donor Reserve After</dt>
          <dd className="text-right font-medium text-foreground">{transfer.donorReserveAfter} units</dd>
        </dl>

        <Separator />

        <p className="font-sans text-[11px] text-muted-foreground">{transfer.reason}</p>

        <DialogFooter>
          <Button variant="outline" onClick={closeIstoDocument} className="font-sans">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
