import type { Facility } from '@/types'

export const FACILITIES: Facility[] = [
  {
    facilityId: 'FAC-MALPE-PHC',
    name: 'Malpe PHC',
    tier: 'PHC',
    lat: 13.3512,
    lng: 74.7041,
    corridor: 'COASTAL',
    formularySize: 75,
  },
  {
    facilityId: 'FAC-DHU',
    name: 'District Hospital Udupi',
    tier: 'DISTRICT_HOSPITAL',
    lat: 13.3364,
    lng: 74.7468,
    corridor: 'CENTRAL',
    formularySize: 320,
  },
  {
    facilityId: 'FAC-KARKALA-TH',
    name: 'Karkala Taluk Hospital',
    tier: 'TALUK_HOSPITAL',
    lat: 13.2145,
    lng: 74.9984,
    corridor: 'INLAND',
    formularySize: 210,
  },
  {
    facilityId: 'FAC-KASTURBA-MANIPAL',
    name: 'Kasturba Hospital, Manipal',
    tier: 'DISTRICT_HOSPITAL',
    lat: 13.3525,
    lng: 74.7865,
    corridor: 'CENTRAL',
    formularySize: 340,
  },
  {
    facilityId: 'FAC-BRAHMAVAR-CHC',
    name: 'Brahmavar CHC',
    tier: 'CHC',
    lat: 13.4244,
    lng: 74.7478,
    corridor: 'COASTAL',
    formularySize: 140,
  },
  {
    facilityId: 'FAC-KUNDAPURA-TH',
    name: 'Kundapura Taluk Hospital',
    tier: 'TALUK_HOSPITAL',
    lat: 13.6272,
    lng: 74.6947,
    corridor: 'COASTAL',
    formularySize: 230,
  },
  {
    facilityId: 'FAC-SHIRVA-PHC',
    name: 'Shirva PHC',
    tier: 'PHC',
    lat: 13.2389,
    lng: 74.8083,
    corridor: 'INLAND',
    formularySize: 90,
  },
  {
    facilityId: 'FAC-KSMSCL-DEPOT',
    name: 'KSMSCL District Drug Depot',
    tier: 'DEPOT',
    lat: 13.3421,
    lng: 74.7472,
    corridor: 'CENTRAL',
    formularySize: 350,
  },
]

export const FACILITY_MAP: Record<string, Facility> = FACILITIES.reduce(
  (acc, f) => {
    acc[f.facilityId] = f
    return acc
  },
  {} as Record<string, Facility>,
)

export function tierLabel(tier: Facility['tier']): string {
  switch (tier) {
    case 'PHC':
      return 'Primary Health Centre'
    case 'CHC':
      return 'Community Health Centre'
    case 'TALUK_HOSPITAL':
      return 'Taluk Hospital'
    case 'DISTRICT_HOSPITAL':
      return 'District / Tertiary Hospital'
    case 'DEPOT':
      return 'District Drug Depot'
  }
}

// Haversine distance in km between two facilities
export function distanceKm(a: Facility, b: Facility): number {
  const R = 6371
  const dLat = ((b.lat - a.lat) * Math.PI) / 180
  const dLng = ((b.lng - a.lng) * Math.PI) / 180
  const lat1 = (a.lat * Math.PI) / 180
  const lat2 = (b.lat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
  return Math.round(R * c * 10) / 10
}
