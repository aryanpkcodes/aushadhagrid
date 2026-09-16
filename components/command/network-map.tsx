'use client'

import { useMemo } from 'react'
import { FACILITIES, FACILITY_MAP } from '@/data/facilities'
import { useCommandStore } from '@/store/command-store'
import { STATUS_DOT_CLASS, STATUS_FILL_VAR } from '@/lib/status-styles'
import type { InventoryStatus, TransferOrder } from '@/types'
import { cn } from '@/lib/utils'

const VIEW_W = 640
const VIEW_H = 460
const PADDING = 64

// A cluster of central facilities sit within a couple of kilometres of one
// another on the real map (Malpe PHC, District Hospital Udupi, Kasturba
// Manipal, KSMSCL Depot). Nudge their labels so they stay legible without
// distorting the underlying geographic node positions.
const LABEL_OFFSETS: Record<string, { dx: number; dy: number }> = {
  'FAC-MALPE-PHC': { dx: -60, dy: -6 },
  'FAC-DHU': { dx: -46, dy: 20 },
  'FAC-KASTURBA-MANIPAL': { dx: 58, dy: -6 },
  'FAC-KSMSCL-DEPOT': { dx: 54, dy: 20 },
}

const LAT_MIN = Math.min(...FACILITIES.map((f) => f.lat)) - 0.04
const LAT_MAX = Math.max(...FACILITIES.map((f) => f.lat)) + 0.04
const LNG_MIN = Math.min(...FACILITIES.map((f) => f.lng)) - 0.04
const LNG_MAX = Math.max(...FACILITIES.map((f) => f.lng)) + 0.04

function project(lat: number, lng: number): { x: number; y: number } {
  const x = PADDING + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (VIEW_W - PADDING * 2)
  const y = PADDING + (1 - (lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * (VIEW_H - PADDING * 2)
  return { x, y }
}

interface NetworkMapProps {
  facilityStatus: Map<string, InventoryStatus>
  activeTransfers: TransferOrder[]
  currentDay: number
}

export function NetworkMap({ facilityStatus, activeTransfers, currentDay }: NetworkMapProps) {
  const selectFacility = useCommandStore((s) => s.selectFacility)
  const selectedFacilityId = useCommandStore((s) => s.selectedFacilityId)

  const positions = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>()
    for (const f of FACILITIES) map.set(f.facilityId, project(f.lat, f.lng))
    return map
  }, [])

  const inFlight = activeTransfers.filter((t) => t.simulationDay === currentDay)

  return (
    <div className="relative flex h-full min-h-[320px] flex-col rounded-md border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          District Logistics Network
        </h2>
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <LegendDot statusClass="status-dot-healthy" label="Healthy" />
          <LegendDot statusClass="status-dot-watch" label="Watch" />
          <LegendDot statusClass="status-dot-critical" label="Critical" />
          <LegendDot statusClass="status-dot-stockout" label="Stockout" />
        </div>
      </div>

      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="h-full w-full flex-1"
        role="img"
        aria-label="Map of district health facilities and active transfer routes"
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="url(#mapGlow)" />

        {/* static corridor guide lines from every facility to the depot */}
        {FACILITIES.filter((f) => f.tier !== 'DEPOT').map((f) => {
          const depot = FACILITIES.find((d) => d.tier === 'DEPOT')
          if (!depot) return null
          const a = positions.get(f.facilityId)!
          const b = positions.get(depot.facilityId)!
          return (
            <line
              key={`corridor-${f.facilityId}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="currentColor"
              strokeOpacity={0.08}
              strokeWidth={1}
              className="text-foreground"
            />
          )
        })}

        {/* animated in-transit transfer vectors */}
        {inFlight.map((t) => {
          const from = FACILITY_MAP[t.fromNode]
          const to = FACILITY_MAP[t.toNode]
          if (!from || !to) return null
          const a = positions.get(from.facilityId)!
          const b = positions.get(to.facilityId)!
          return (
            <g key={t.id}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--accent)"
                strokeWidth={1.5}
                strokeDasharray="5 4"
              />
              <circle r={4} fill="var(--accent)">
                <animateMotion dur="1.8s" repeatCount="indefinite" path={`M${a.x},${a.y} L${b.x},${b.y}`} />
              </circle>
            </g>
          )
        })}

        {FACILITIES.map((facility) => {
          const pos = positions.get(facility.facilityId)!
          const status = facilityStatus.get(facility.facilityId) ?? 'HEALTHY'
          const isSelected = selectedFacilityId === facility.facilityId
          const isAlerting = status === 'CRITICAL' || status === 'STOCKOUT'
          return (
            <g
              key={facility.facilityId}
              transform={`translate(${pos.x}, ${pos.y})`}
              className="cursor-pointer"
              onClick={() => selectFacility(facility.facilityId)}
              role="button"
              tabIndex={0}
              aria-label={`${facility.name}, status ${status}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') selectFacility(facility.facilityId)
              }}
            >
              {isAlerting && (
                <circle r={12} fill={STATUS_FILL_VAR[status]} opacity={0.4}>
                  <animate attributeName="r" values="8;16;8" dur="1.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.45;0.05;0.45" dur="1.6s" repeatCount="indefinite" />
                </circle>
              )}
              <circle
                r={isSelected ? 9 : 7}
                fill={STATUS_FILL_VAR[status]}
                stroke="var(--card)"
                strokeWidth={2}
              />
              <text
                x={LABEL_OFFSETS[facility.facilityId]?.dx ?? 0}
                y={LABEL_OFFSETS[facility.facilityId]?.dy ?? -14}
                textAnchor="middle"
                className="fill-foreground text-[9px] font-medium"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {facility.name.length > 20 ? `${facility.name.slice(0, 18)}…` : facility.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function LegendDot({ statusClass, label }: { statusClass: string; label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span className={cn('size-1.5 rounded-full', statusClass)} />
      {label}
    </span>
  )
}
