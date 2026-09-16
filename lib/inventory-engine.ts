import { FACILITIES, FACILITY_MAP } from '@/data/facilities'
import { FACILITY_FORMULARIES } from './formulary'
import { coastalSurgeMultiplier, TOTAL_DAYS } from '@/data/scenarios'
import type { Drug, Facility, InventoryRecord, InventoryStatus, SimulationScenario, TransferOrder } from '@/types'
import { seededRange } from './seeded-random'

const LEPTO_DRUG_NAMES = new Set([
  'Doxycycline',
  'Doxycycline Dispersible',
  'Doxycycline Prophylaxis (Flood Relief Pack)',
  'Ceftriaxone',
  'Normal Saline',
  'Normal Saline (100 ml)',
  'Ringer Lactate',
  'Ringer Lactate (1000 ml)',
  'Dextrose 5%',
  'Dextrose 5% (1000 ml)',
  'Dextrose Normal Saline',
  'Leptospira IgM Rapid Test Kit',
])

const TIER_STOCK_RANGE: Record<Facility['tier'], [number, number]> = {
  PHC: [180, 650],
  CHC: [350, 1100],
  TALUK_HOSPITAL: [500, 1800],
  DISTRICT_HOSPITAL: [900, 2600],
  DEPOT: [2000, 6000],
}

const TIER_BURN_RANGE: Record<Facility['tier'], [number, number]> = {
  PHC: [4, 45],
  CHC: [10, 70],
  TALUK_HOSPITAL: [15, 100],
  DISTRICT_HOSPITAL: [25, 140],
  DEPOT: [30, 160],
}

// Anchor seed values for the reference drug (Doxycycline) at named
// facilities, per the district baseline notes. All other facility/drug
// combinations are derived deterministically from seeded ranges.
const DOXY_ANCHORS: Record<string, { stock: number; burn: number }> = {
  'FAC-MALPE-PHC': { stock: 500, burn: 40 },
  'FAC-DHU': { stock: 1800, burn: 90 },
  'FAC-KARKALA-TH': { stock: 1600, burn: 35 },
  'FAC-KUNDAPURA-TH': { stock: 1200, burn: 40 },
}

function isDoxycycline(drug: Drug): boolean {
  return drug.genericName === 'Doxycycline'
}

function baselineFor(facility: Facility, drug: Drug): { stock: number; burn: number } {
  const anchor = DOXY_ANCHORS[facility.facilityId]
  if (anchor && isDoxycycline(drug)) return anchor

  const [stockMin, stockMax] = TIER_STOCK_RANGE[facility.tier]
  const [burnMin, burnMax] = TIER_BURN_RANGE[facility.tier]
  const key = `${facility.facilityId}:${drug.drugId}`
  const essentialBoost = drug.essentialMedicine ? 1.25 : 1
  const stock = Math.round(seededRange(`${key}:stock`, stockMin, stockMax) * essentialBoost)
  const burn = Math.max(1, Math.round(seededRange(`${key}:burn`, burnMin, burnMax) * essentialBoost * 0.4))
  return { stock, burn }
}

function scenarioMultiplier(facility: Facility, drug: Drug, day: number, scenario: SimulationScenario): number {
  const isCoastal = facility.corridor === 'COASTAL'
  const isLepto = LEPTO_DRUG_NAMES.has(drug.genericName)
  let m = 1

  switch (scenario) {
    case 'NORMAL':
      m = 1
      break
    case 'MONSOON_RISE':
      m = isCoastal ? 1.4 : 1.1
      if (drug.category === 'GASTROINTESTINAL' || drug.category === 'RESPIRATORY') m *= 1.15
      break
    case 'COASTAL_LEPTOSPIROSIS_SURGE':
      m = isCoastal ? coastalSurgeMultiplier(day) : 1.3
      if (isLepto) m *= isCoastal ? 1.6 : 1.2
      break
    case 'HOSPITAL_INFLUX':
      m =
        facility.tier === 'DISTRICT_HOSPITAL' || facility.tier === 'TALUK_HOSPITAL' || facility.tier === 'CHC'
          ? 1.8
          : 1.1
      if (isLepto) m *= 1.3
      break
    case 'RESPIRATORY_SURGE':
      m = drug.category === 'RESPIRATORY' ? 2.0 : 1.15
      break
    case 'SUPPLY_DELAY':
      m = 1
      break
  }
  return m
}

export function statusFromDaysOfCover(daysOfCover: number, currentUnits: number): InventoryStatus {
  if (currentUnits <= 0) return 'STOCKOUT'
  if (daysOfCover < 2) return 'CRITICAL'
  if (daysOfCover < 4) return 'WATCH'
  return 'HEALTHY'
}

export interface EngineState {
  facilityId: string
  drugId: string
  stock: number
  burnToday: number
}

// Applies a transfer's quantity delta at the day it was authorized, and on
// every subsequent day, so authorized ISTOs permanently shift stock levels
// forward in the deterministic timeline.
function transferDeltaOnDay(transfers: TransferOrder[], facilityId: string, drugId: string, day: number): number {
  let delta = 0
  for (const t of transfers) {
    if (t.drugId !== drugId || t.simulationDay !== day) continue
    if (t.toNode === facilityId) delta += t.quantity
    if (t.fromNode === facilityId) delta -= t.quantity
  }
  return delta
}

// Builds the full 1..TOTAL_DAYS timeline for every facility/drug pair,
// sequentially, so day-over-day depletion, scenario multipliers, transfer
// deltas, and the Malpe -> District Hospital deficit-absorption coupling
// all compound deterministically. Cheap enough (~1500 pairs x 21 days) to
// recompute whenever transfers change.
export function buildInventoryTimeline(
  transfers: TransferOrder[],
  scenarioForDayFn: (day: number) => SimulationScenario,
): Map<number, Map<string, EngineState>> {
  const timeline = new Map<number, Map<string, EngineState>>()
  const running = new Map<string, number>() // facilityId:drugId -> current stock

  for (const facility of FACILITIES) {
    for (const drug of FACILITY_FORMULARIES[facility.facilityId]) {
      const { stock } = baselineFor(facility, drug)
      running.set(`${facility.facilityId}:${drug.drugId}`, stock)
    }
  }

  // Track Malpe's unmet Doxycycline demand for the district-hospital
  // spillover coupling described in the baseline notes.
  let malpeUnmetCarry = 0

  for (let day = 1; day <= TOTAL_DAYS; day++) {
    const scenario = scenarioForDayFn(day)
    const dayMap = new Map<string, EngineState>()

    let dhuExtraDoxyBurn = 0
    if (day >= 8) {
      dhuExtraDoxyBurn = malpeUnmetCarry * 0.75
    }

    for (const facility of FACILITIES) {
      for (const drug of FACILITY_FORMULARIES[facility.facilityId]) {
        const key = `${facility.facilityId}:${drug.drugId}`
        const { burn: baseBurn } = baselineFor(facility, drug)
        const mult = scenarioMultiplier(facility, drug, day, scenario)
        let burnToday = baseBurn * mult

        if (facility.facilityId === 'FAC-DHU' && isDoxycycline(drug)) {
          burnToday += dhuExtraDoxyBurn
        }

        const stockBefore = running.get(key) ?? 0
        const delta = transferDeltaOnDay(transfers, facility.facilityId, drug.drugId, day)
        const availableToday = Math.max(0, stockBefore + delta)
        const actualBurn = Math.min(availableToday, burnToday)
        const unmet = burnToday - actualBurn
        const stockAfter = Math.max(0, availableToday - actualBurn)

        running.set(key, stockAfter)
        dayMap.set(key, { facilityId: facility.facilityId, drugId: drug.drugId, stock: stockAfter, burnToday })

        if (facility.facilityId === 'FAC-MALPE-PHC' && isDoxycycline(drug)) {
          malpeUnmetCarry = unmet
        }
      }
    }

    timeline.set(day, dayMap)
  }

  return timeline
}

export function toInventoryRecord(state: EngineState): InventoryRecord {
  const daysOfCover = state.burnToday > 0 ? state.stock / state.burnToday : 99
  return {
    facilityId: state.facilityId,
    drugId: state.drugId,
    currentUnits: Math.round(state.stock),
    dailyBurn: Math.round(state.burnToday * 10) / 10,
    daysOfCover: Math.round(daysOfCover * 10) / 10,
    status: statusFromDaysOfCover(daysOfCover, state.stock),
  }
}

export { FACILITY_MAP }
