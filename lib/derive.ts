import { buildInventoryTimeline, toInventoryRecord } from './inventory-engine'
import { scenarioForDay } from '@/data/scenarios'
import type { InventoryRecord, KpiSnapshot, TransferOrder } from '@/types'

export function getInventoryMapForDay(
  day: number,
  transfers: TransferOrder[],
): Map<string, InventoryRecord> {
  const timeline = buildInventoryTimeline(transfers, scenarioForDay)
  const dayStates = timeline.get(day)
  const result = new Map<string, InventoryRecord>()
  if (!dayStates) return result
  for (const [key, state] of dayStates) {
    result.set(key, toInventoryRecord(state))
  }
  return result
}

export function computeKpis(
  inventory: Map<string, InventoryRecord>,
  previousDayInventory: Map<string, InventoryRecord> | null,
  activeTransferCount: number,
): KpiSnapshot {
  let usableUnits = 0
  let burnToday = 0
  let stockoutThreatNodes = 0

  for (const record of inventory.values()) {
    usableUnits += record.currentUnits
    burnToday += record.dailyBurn
    if (record.daysOfCover < 2) stockoutThreatNodes += 1
  }

  let burnVelocityPct = 0
  if (previousDayInventory) {
    let burnYesterday = 0
    for (const record of previousDayInventory.values()) burnYesterday += record.dailyBurn
    burnVelocityPct = burnYesterday > 0 ? ((burnToday - burnYesterday) / burnYesterday) * 100 : 0
  }

  return {
    usableUnits: Math.round(usableUnits),
    burnVelocityPct: Math.round(burnVelocityPct * 10) / 10,
    stockoutThreatNodes,
    activeInTransitVectors: activeTransferCount,
  }
}
