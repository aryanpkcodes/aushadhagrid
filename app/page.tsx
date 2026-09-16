'use client'

import { TopBar } from '@/components/command/top-bar'
import { KpiStrip } from '@/components/command/kpi-strip'
import { TimelineScrubber } from '@/components/command/timeline-scrubber'
import { NetworkMap } from '@/components/command/network-map'
import { RecommendedActionsPanel } from '@/components/command/recommended-actions-panel'
import { TransferLog } from '@/components/command/transfer-log'
import { FacilityDetailSheet } from '@/components/command/facility-detail-sheet'
import { IstoDocumentDialog } from '@/components/command/isto-document-dialog'
import { useCommandData } from '@/hooks/use-command-data'
import { DRUG_COUNT } from '@/data/drugs'
import { FACILITIES } from '@/data/facilities'

export default function CommandTowerPage() {
  const { currentDay, inventory, recommendedActions, kpis, facilityStatus, activeTransfers } = useCommandData()

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <TopBar />
      <KpiStrip kpis={kpis} />
      <TimelineScrubber />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 overflow-y-auto p-3 lg:grid-cols-[1fr_360px] lg:gap-4 lg:overflow-hidden lg:p-4">
        <div className="min-h-[380px] lg:min-h-0">
          <NetworkMap facilityStatus={facilityStatus} activeTransfers={activeTransfers} currentDay={currentDay} />
        </div>

        <div className="grid min-h-0 grid-rows-2 gap-3 lg:gap-4">
          <div className="min-h-[280px] lg:min-h-0">
            <RecommendedActionsPanel actions={recommendedActions} />
          </div>
          <div className="min-h-[280px] lg:min-h-0">
            <TransferLog transfers={activeTransfers} />
          </div>
        </div>
      </div>

      <footer className="border-t border-border px-4 py-2 text-center text-[10px] text-muted-foreground sm:px-6">
        Simulation seed UDP-MONSOON-2026 · {FACILITIES.length} facilities · {DRUG_COUNT} tracked formulary
        lines · Deterministic replay, no live patient data.
      </footer>

      <FacilityDetailSheet inventory={inventory} />
      <IstoDocumentDialog />
    </main>
  )
}
