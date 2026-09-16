import type { InventoryStatus } from '@/types'

export const STATUS_LABEL: Record<InventoryStatus, string> = {
  HEALTHY: 'Healthy',
  WATCH: 'Watch',
  CRITICAL: 'Critical',
  STOCKOUT: 'Stockout',
}

export const STATUS_DOT_CLASS: Record<InventoryStatus, string> = {
  HEALTHY: 'status-dot-healthy',
  WATCH: 'status-dot-watch',
  CRITICAL: 'status-dot-critical',
  STOCKOUT: 'status-dot-stockout',
}

export const STATUS_TEXT_CLASS: Record<InventoryStatus, string> = {
  HEALTHY: 'text-[var(--status-healthy)]',
  WATCH: 'text-[var(--status-watch)]',
  CRITICAL: 'text-[var(--status-critical)]',
  STOCKOUT: 'text-[var(--status-stockout)]',
}

// SVG shapes need `fill`, not the `background-color` utility the dot
// classes above provide, so expose the raw CSS var for inline styles.
export const STATUS_FILL_VAR: Record<InventoryStatus, string> = {
  HEALTHY: 'var(--status-healthy)',
  WATCH: 'var(--status-watch)',
  CRITICAL: 'var(--status-critical)',
  STOCKOUT: 'var(--status-stockout)',
}

export const STATUS_RANK: Record<InventoryStatus, number> = {
  STOCKOUT: 0,
  CRITICAL: 1,
  WATCH: 2,
  HEALTHY: 3,
}

export function worstStatus(statuses: InventoryStatus[]): InventoryStatus {
  if (statuses.length === 0) return 'HEALTHY'
  return statuses.reduce((worst, s) => (STATUS_RANK[s] < STATUS_RANK[worst] ? s : worst), 'HEALTHY' as InventoryStatus)
}
