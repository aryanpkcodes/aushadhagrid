// Deterministic pseudo-random utilities. No Math.random() is used anywhere
// in the simulation — every value is derived from a stable string hash so
// resets and re-plays always reproduce identical state.

function hashString(input: string): number {
  let h = 2166136261 >>> 0
  for (let i = 0; i < input.length; i++) {
    h = Math.imul(h ^ input.charCodeAt(i), 16777619)
    h >>>= 0
  }
  return h >>> 0
}

// mulberry32 PRNG seeded from a hashed string key.
export function seededValue(key: string): number {
  let a = hashString(key)
  a |= 0
  a = (a + 0x6d2b79f5) | 0
  let t = Math.imul(a ^ (a >>> 15), 1 | a)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

// Deterministic value in [min, max]
export function seededRange(key: string, min: number, max: number): number {
  return min + seededValue(key) * (max - min)
}

// Deterministic integer in [min, max]
export function seededInt(key: string, min: number, max: number): number {
  return Math.floor(seededRange(key, min, max + 1))
}
