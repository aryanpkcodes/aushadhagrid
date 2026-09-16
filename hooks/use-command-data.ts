'use client'

import { useMemo } from 'react'
import { useCommandStore } from '@/store/command-store'
import { getInventoryMapForDay, computeKpis } from '@/lib/derive'
import { findRecommendedActions } from '@/lib/shortage-engine'
import { FACILITIES } from '@/data/facilities'
import { worstStatus } from '@/lib/status-styles'
import type { InventoryStatus } from '@/types'

export function useCommandData() {
  const currentDay = useCommandStore((s) => s.currentDay)
  const activeTransfers = useCommandStore((s) => s.activeTransfers)
  const simulationScenario = useCommandStore((s) => s.simulationScenario)

  const inventory = useMemo(
    () => getInventoryMapForDay(currentDay, activeTransfers),
    [currentDay, activeTransfers],
  )

  const previousInventory = useMemo(
    () => (currentDay > 1 ? getInventoryMapForDay(currentDay - 1, activeTransfers) : null),
    [currentDay, activeTransfers],
  )

  const recommendedActions = useMemo(() => findRecommendedActions(inventory), [inventory])

  const dispatchedCount = useMemo(
    () => activeTransfers.filter((t) => t.simulationDay <= currentDay).length,
    [activeTransfers, currentDay],
  )

  const kpis = useMemo(
    () => computeKpis(inventory, previousInventory, dispatchedCount),
    [inventory, previousInventory, dispatchedCount],
  )

  const facilityStatus = useMemo(() => {
    const map = new Map<string, InventoryStatus>()
    for (const facility of FACILITIES) {
      const statuses: InventoryStatus[] = []
      for (const [key, record] of inventory) {
        if (key.startsWith(`${facility.facilityId}:`)) statuses.push(record.status)
      }
      map.set(facility.facilityId, worstStatus(statuses))
    }
    return map
  }, [inventory])

  return {
    currentDay,
    simulationScenario,
    inventory,
    recommendedActions,
    kpis,
    facilityStatus,
    activeTransfers,
  }
}
