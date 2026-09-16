import { create } from 'zustand'
import { FACILITY_MAP } from '@/data/facilities'
import { DRUG_MAP } from '@/data/drugs'
import { distanceKm, FACILITIES } from '@/data/facilities'
import { scenarioForDay, TOTAL_DAYS } from '@/data/scenarios'
import { generateBatchNo, generateReferenceNo, resetReferenceCounter } from '@/lib/isto'
import type { RecommendedAction, SimulationScenario, ThemeMode, TransferOrder } from '@/types'

interface CommandState {
  currentDay: number
  isPlaying: boolean
  selectedDrugId: string | null
  selectedFacilityId: string | null
  selectedRouteId: string | null
  activeTransfers: TransferOrder[]
  simulationScenario: SimulationScenario
  theme: ThemeMode
  authorizingIds: Set<string>
  lastAuthorized: TransferOrder | null
  showIstoDocument: boolean

  setDay: (day: number) => void
  play: () => void
  pause: () => void
  tick: () => void
  reset: () => void
  selectFacility: (id: string | null) => void
  selectDrug: (id: string | null) => void
  selectRoute: (id: string | null) => void
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
  authorizeTransfer: (action: RecommendedAction) => void
  closeIstoDocument: () => void
  openIstoDocument: () => void
}

export const useCommandStore = create<CommandState>((set, get) => ({
  currentDay: 1,
  isPlaying: false,
  selectedDrugId: null,
  selectedFacilityId: null,
  selectedRouteId: null,
  activeTransfers: [],
  simulationScenario: scenarioForDay(1),
  // Always initialize to 'dark' so the first client render matches the
  // server-rendered markup exactly. ThemeSync reconciles this with the
  // persisted preference immediately after mount (see theme-sync.tsx).
  theme: 'dark',
  authorizingIds: new Set(),
  lastAuthorized: null,
  showIstoDocument: false,

  setDay: (day) =>
    set({
      currentDay: day,
      simulationScenario: scenarioForDay(day),
    }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  tick: () => {
    const { currentDay } = get()
    if (currentDay >= TOTAL_DAYS) {
      set({ isPlaying: false })
      return
    }
    const nextDay = currentDay + 1
    set({ currentDay: nextDay, simulationScenario: scenarioForDay(nextDay) })
  },

  reset: () => {
    resetReferenceCounter()
    set({
      currentDay: 1,
      isPlaying: false,
      selectedDrugId: null,
      selectedFacilityId: null,
      selectedRouteId: null,
      activeTransfers: [],
      simulationScenario: scenarioForDay(1),
      authorizingIds: new Set(),
      lastAuthorized: null,
      showIstoDocument: false,
    })
  },

  selectFacility: (id) => set({ selectedFacilityId: id }),
  selectDrug: (id) => set({ selectedDrugId: id }),
  selectRoute: (id) => set({ selectedRouteId: id }),

  setTheme: (theme) => {
    if (typeof window !== 'undefined') window.localStorage.setItem('aushadha-theme', theme)
    set({ theme })
  },
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark'
    get().setTheme(next)
  },

  authorizeTransfer: (action) => {
    const { authorizingIds, activeTransfers, currentDay, simulationScenario } = get()
    if (authorizingIds.has(action.id)) return

    // Idempotency guard: don't allow duplicate active dispatches for the
    // same deficit facility + drug pair.
    const alreadyActive = activeTransfers.some(
      (t) => t.toNode === action.deficitFacilityId && t.drugId === action.drugId && t.status === 'DISPATCHED',
    )
    if (alreadyActive) return

    const drug = DRUG_MAP[action.drugId]
    const fromFacility = FACILITY_MAP[action.donorFacilityId]
    const toFacility = FACILITY_MAP[action.deficitFacilityId]
    if (!drug || !fromFacility || !toFacility) return

    const nextAuthorizing = new Set(authorizingIds)
    nextAuthorizing.add(action.id)

    const referenceNo = generateReferenceNo(currentDay)
    const batchNo = generateBatchNo(drug.drugId, currentDay)
    const km = distanceKm(fromFacility, toFacility)

    const transfer: TransferOrder = {
      id: `TR-${referenceNo}`,
      referenceNo,
      drugId: drug.drugId,
      drugName: drug.genericName,
      strength: drug.strength,
      fromNode: fromFacility.facilityId,
      toNode: toFacility.facilityId,
      quantity: action.quantity,
      etaMin: action.etaMin,
      distanceKm: km,
      routeName: `${fromFacility.name} -> ${toFacility.name}`,
      status: 'DISPATCHED',
      timestamp: Date.now(),
      batchNo,
      reason: action.reason,
      simulationDay: currentDay,
      scenario: simulationScenario,
      donorReserveAfter: action.donorReserveAfter,
    }

    set({
      activeTransfers: [...activeTransfers, transfer],
      authorizingIds: nextAuthorizing,
      lastAuthorized: transfer,
      showIstoDocument: true,
    })
  },

  closeIstoDocument: () => set({ showIstoDocument: false }),
  openIstoDocument: () => set({ showIstoDocument: true }),
}))

export function allFacilities() {
  return FACILITIES
}
