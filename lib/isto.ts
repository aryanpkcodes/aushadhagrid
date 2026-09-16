import { seededInt } from './seeded-random'

let sequenceCounter = 0

// Deterministic-looking reference numbers. A monotonically increasing
// in-memory counter keeps them unique within a session while remaining
// reproducible for the same authorization order after a reset (the counter
// itself is reset by the store).
export function generateReferenceNo(day: number): string {
  sequenceCounter += 1
  const seq = String(sequenceCounter).padStart(3, '0')
  return `KA-UDP-${String(day).padStart(2, '0')}${seq}`
}

export function resetReferenceCounter(): void {
  sequenceCounter = 0
}

export function generateBatchNo(drugId: string, day: number): string {
  const n = seededInt(`${drugId}:batch:${day}`, 1000, 9999)
  return `UDP${day}${n}`
}
