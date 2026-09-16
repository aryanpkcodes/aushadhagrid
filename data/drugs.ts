import type { Drug } from '@/types'
import { BASE_DRUGS } from './drug-catalog-source'

function slugify(name: string, strength: string, form: string): string {
  const raw = `${name}-${strength}-${form}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `DRG-${raw}`
}

// Flatten the base catalog into individual drug entries. Deterministic —
// no randomness, stable ordering, stable IDs.
export const DRUG_CATALOG: Drug[] = BASE_DRUGS.flatMap((base) =>
  base.variants.map((variant, idx) => ({
    drugId: slugify(base.name, variant.strength, variant.form) + (idx > 0 ? `-${idx}` : ''),
    genericName: base.name,
    strength: variant.strength,
    dosageForm: variant.form,
    category: base.category,
    unitType: variant.unitType,
    coldChainRequired: Boolean(base.coldChain),
    essentialMedicine: Boolean(base.essential),
    typicalFacilityTier: base.tiers,
  })),
)

export const DRUG_MAP: Record<string, Drug> = DRUG_CATALOG.reduce(
  (acc, d) => {
    acc[d.drugId] = d
    return acc
  },
  {} as Record<string, Drug>,
)

export const DRUG_COUNT = DRUG_CATALOG.length

export const CATEGORY_LABELS: Record<string, string> = {
  PHC_ESSENTIALS: 'PHC Essentials',
  ANTIBIOTIC: 'Antibiotics',
  ANTIPYRETIC: 'Antipyretic',
  ANALGESIC: 'Analgesic',
  GASTROINTESTINAL: 'Gastrointestinal',
  RESPIRATORY: 'Respiratory',
  CARDIOVASCULAR: 'Cardiovascular',
  DIABETES: 'Diabetes',
  MATERNAL_HEALTH: 'Maternal Health',
  PEDIATRIC: 'Pediatric',
  EMERGENCY: 'Emergency',
  IV_FLUID: 'IV Fluids',
  INJECTION: 'Injections',
  INFECTION_CONTROL: 'Infection Control',
  VITAMIN_MINERAL: 'Vitamins & Minerals',
  CHRONIC_DISEASE: 'Chronic Disease',
  DERMATOLOGY: 'Dermatology',
  ENT: 'ENT',
  OPHTHALMOLOGY: 'Ophthalmology',
  OBSTETRIC: 'Obstetric',
}
