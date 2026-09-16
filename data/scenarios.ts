import type { SimulationScenario } from '@/types'

export const SIMULATION_SEED = 'UDP-MONSOON-2026'

export const TOTAL_DAYS = 21

export interface PlayheadMarker {
  day: number
  label: string
}

export const PLAYHEAD_MARKERS: PlayheadMarker[] = [
  { day: 1, label: 'Baseline' },
  { day: 7, label: 'Coastal Surge' },
  { day: 11, label: 'Malpe Runout' },
  { day: 16, label: 'Inland Spillover' },
  { day: 21, label: 'Resolution' },
]

export const SCENARIO_LABELS: Record<SimulationScenario, string> = {
  NORMAL: 'Normal Operations',
  MONSOON_RISE: 'Monsoon Rise',
  COASTAL_LEPTOSPIROSIS_SURGE: 'Coastal Leptospirosis Surge',
  HOSPITAL_INFLUX: 'Hospital Influx',
  RESPIRATORY_SURGE: 'Respiratory Surge',
  SUPPLY_DELAY: 'Supply Delay',
}

// Deterministic scenario resolved purely from the simulation day, per the
// Udupi monsoon seed timeline. Days 1-4 baseline, 5-9 coastal surge onset,
// 10-15 leptospirosis peak + spillover, 16-21 inland spillover/resolution.
export function scenarioForDay(day: number): SimulationScenario {
  if (day <= 4) return 'NORMAL'
  if (day <= 9) return 'MONSOON_RISE'
  if (day <= 15) return 'COASTAL_LEPTOSPIROSIS_SURGE'
  if (day <= 19) return 'HOSPITAL_INFLUX'
  return 'RESPIRATORY_SURGE'
}

// Coastal surge multiplier curve referenced from the seed baseline notes.
export function coastalSurgeMultiplier(day: number): number {
  if (day <= 4) return 1.0
  if (day <= 9) return 2.2
  return 3.5
}
