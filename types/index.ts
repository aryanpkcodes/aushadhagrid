// Core domain types for Aushadha-Grid | Udupi District Health Logistics Command Tower

export type FacilityTier = 'PHC' | 'CHC' | 'TALUK_HOSPITAL' | 'DISTRICT_HOSPITAL' | 'DEPOT'

export interface Facility {
  facilityId: string
  name: string
  tier: FacilityTier
  lat: number
  lng: number
  corridor: 'COASTAL' | 'INLAND' | 'CENTRAL'
  formularySize: number
}

export type DrugCategory =
  | 'PHC_ESSENTIALS'
  | 'ANTIBIOTIC'
  | 'ANTIPYRETIC'
  | 'ANALGESIC'
  | 'GASTROINTESTINAL'
  | 'RESPIRATORY'
  | 'CARDIOVASCULAR'
  | 'DIABETES'
  | 'MATERNAL_HEALTH'
  | 'PEDIATRIC'
  | 'EMERGENCY'
  | 'IV_FLUID'
  | 'INJECTION'
  | 'INFECTION_CONTROL'
  | 'VITAMIN_MINERAL'
  | 'CHRONIC_DISEASE'
  | 'DERMATOLOGY'
  | 'ENT'
  | 'OPHTHALMOLOGY'
  | 'OBSTETRIC'

export interface Drug {
  drugId: string
  genericName: string
  strength: string
  dosageForm: string
  category: DrugCategory
  unitType: string
  coldChainRequired: boolean
  essentialMedicine: boolean
  typicalFacilityTier: FacilityTier[]
}

export type InventoryStatus = 'HEALTHY' | 'WATCH' | 'CRITICAL' | 'STOCKOUT'

export interface InventoryRecord {
  facilityId: string
  drugId: string
  currentUnits: number
  dailyBurn: number
  daysOfCover: number
  status: InventoryStatus
}

export type SimulationScenario =
  | 'NORMAL'
  | 'MONSOON_RISE'
  | 'COASTAL_LEPTOSPIROSIS_SURGE'
  | 'HOSPITAL_INFLUX'
  | 'RESPIRATORY_SURGE'
  | 'SUPPLY_DELAY'

export type TransferStatus = 'DISPATCHED' | 'DELIVERED'

export interface TransferOrder {
  id: string
  referenceNo: string
  drugId: string
  drugName: string
  strength: string
  fromNode: string
  toNode: string
  quantity: number
  etaMin: number
  distanceKm: number
  routeName: string
  status: TransferStatus
  timestamp: number
  batchNo: string
  reason: string
  simulationDay: number
  scenario: SimulationScenario
  donorReserveAfter: number
}

export interface ShortageCandidate {
  facilityId: string
  drugId: string
  daysOfCover: number
  currentUnits: number
  dailyBurn: number
  status: InventoryStatus
}

export interface DonorOption {
  facilityId: string
  currentUnits: number
  dailyBurn: number
  daysOfCover: number
  distanceKm: number
  reserveAfterTransfer: number
}

export interface RecommendedAction {
  id: string
  deficitFacilityId: string
  drugId: string
  donorFacilityId: string
  donorReserveAfter: number
  quantity: number
  etaMin: number
  distanceKm: number
  reason: string
  currentUnits: number
  dailyBurn: number
  daysOfCover: number
  severity: InventoryStatus
}

export type ThemeMode = 'dark' | 'light'

export interface KpiSnapshot {
  usableUnits: number
  burnVelocityPct: number
  stockoutThreatNodes: number
  activeInTransitVectors: number
}
