import { DRUG_CATALOG } from '@/data/drugs'
import { FACILITIES } from '@/data/facilities'
import type { Drug, Facility } from '@/types'
import { seededValue } from './seeded-random'

// Deterministically assigns each facility a formulary subset sized to its
// tier (PHC ~50-100, CHC ~100-180, Taluk ~180-250, District/Depot ~250-350).
// Essential medicines eligible for the facility's tier are always included
// first, then filled deterministically by seeded rank.
function buildFormulary(facility: Facility): Drug[] {
  const eligible = DRUG_CATALOG.filter((d) => d.typicalFacilityTier.includes(facility.tier))
  const essential = eligible.filter((d) => d.essentialMedicine)
  const nonEssential = eligible
    .filter((d) => !d.essentialMedicine)
    .slice()
    .sort((a, b) => seededValue(`${facility.facilityId}:${a.drugId}`) - seededValue(`${facility.facilityId}:${b.drugId}`))

  const targetSize = Math.min(eligible.length, facility.formularySize)
  const remaining = Math.max(0, targetSize - essential.length)
  return [...essential, ...nonEssential.slice(0, remaining)]
}

export const FACILITY_FORMULARIES: Record<string, Drug[]> = FACILITIES.reduce(
  (acc, f) => {
    acc[f.facilityId] = buildFormulary(f)
    return acc
  },
  {} as Record<string, Drug[]>,
)

export function facilityCarriesDrug(facilityId: string, drugId: string): boolean {
  return FACILITY_FORMULARIES[facilityId]?.some((d) => d.drugId === drugId) ?? false
}
