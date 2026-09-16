import { FACILITIES, FACILITY_MAP, distanceKm } from '@/data/facilities'
import { DRUG_MAP } from '@/data/drugs'
import type { InventoryRecord, RecommendedAction } from '@/types'

const MIN_DONOR_RESERVE_DAYS = 3
const AVG_ROAD_SPEED_KMPH = 42

// Minimum stock a donor must retain for its own population after transfer,
// expressed in days of cover equivalent.
function minReserveUnits(dailyBurn: number): number {
  return Math.ceil(dailyBurn * MIN_DONOR_RESERVE_DAYS)
}

function etaMinutesForDistance(km: number): number {
  return Math.max(15, Math.round((km / AVG_ROAD_SPEED_KMPH) * 60))
}

// Given the full inventory snapshot for a day, finds facilities in
// CRITICAL/STOCKOUT status and, for each, searches every other facility
// that carries the same drug for a valid donor: sufficient stock, keeps a
// minimum reserve, and is a different node. No hardcoded facility/drug
// pairing — every recommendation is derived from live inventory state.
export function findRecommendedActions(
  inventory: Map<string, InventoryRecord>,
): RecommendedAction[] {
  const deficits = [...inventory.values()].filter(
    (r) => r.status === 'CRITICAL' || r.status === 'STOCKOUT',
  )

  const actions: RecommendedAction[] = []

  for (const deficit of deficits) {
    const deficitFacility = FACILITY_MAP[deficit.facilityId]
    const drug = DRUG_MAP[deficit.drugId]
    if (!deficitFacility || !drug) continue

    let bestDonor: { facilityId: string; record: InventoryRecord; distance: number } | null = null

    for (const facility of FACILITIES) {
      if (facility.facilityId === deficit.facilityId) continue
      const donorRecord = inventory.get(`${facility.facilityId}:${deficit.drugId}`)
      if (!donorRecord) continue
      if (donorRecord.status === 'CRITICAL' || donorRecord.status === 'STOCKOUT') continue

      const reserve = minReserveUnits(donorRecord.dailyBurn)
      const spareUnits = donorRecord.currentUnits - reserve
      if (spareUnits <= 0) continue

      const distance = distanceKm(deficitFacility, facility)
      if (!bestDonor || distance < bestDonor.distance) {
        bestDonor = { facilityId: facility.facilityId, record: donorRecord, distance }
      }
    }

    if (!bestDonor) continue

    const reserve = minReserveUnits(bestDonor.record.dailyBurn)
    const spareUnits = bestDonor.record.currentUnits - reserve
    const targetCoverDays = 5
    const desiredQty = Math.round(deficit.dailyBurn * targetCoverDays)
    const quantity = Math.max(10, Math.min(spareUnits, desiredQty))
    const roundedQuantity = Math.round(quantity / 10) * 10 || quantity

    const reason =
      deficit.status === 'STOCKOUT'
        ? `${deficitFacility.name} has exhausted supply of ${drug.genericName} ${drug.strength}. Immediate inter-store transfer required to restore continuity of care.`
        : `${deficitFacility.name} is projected to fall below 2 days of cover for ${drug.genericName} ${drug.strength} at current burn rate.`

    actions.push({
      id: `RA-${deficit.facilityId}-${deficit.drugId}`,
      deficitFacilityId: deficit.facilityId,
      drugId: deficit.drugId,
      donorFacilityId: bestDonor.facilityId,
      donorReserveAfter: Math.round(bestDonor.record.currentUnits - roundedQuantity),
      quantity: roundedQuantity,
      etaMin: etaMinutesForDistance(bestDonor.distance),
      distanceKm: bestDonor.distance,
      reason,
      currentUnits: deficit.currentUnits,
      dailyBurn: deficit.dailyBurn,
      daysOfCover: deficit.daysOfCover,
      severity: deficit.status,
    })
  }

  // Surface most severe (stockout) first, then by lowest days of cover.
  return actions.sort((a, b) => {
    if (a.severity !== b.severity) return a.severity === 'STOCKOUT' ? -1 : 1
    return a.daysOfCover - b.daysOfCover
  })
}
