import type { Feature, FeatureCollection, Point } from 'geojson'

export type PlantType = 'run-of-river' | 'storage' | 'peaking-ror'

export interface PowerPlantProperties {
  id: string
  name: string
  capacityMW: number
  type: PlantType
  district: string
  river: string
}

export type PowerPlantFeature = Feature<Point, PowerPlantProperties>

/**
 * SAMPLE DATASET: a handful of well-known hydropower plants so the map has
 * something to render. Locations are approximate (district level) and every
 * entry must be checked against NEA / DoED / OpenStreetMap before it is
 * presented as authoritative.
 */
const plants: Array<PowerPlantProperties & { lngLat: [number, number] }> = [
  { id: 'upper-tamakoshi', name: 'Upper Tamakoshi', capacityMW: 456, type: 'peaking-ror', district: 'Dolakha', river: 'Tamakoshi', lngLat: [86.21, 27.89] },
  { id: 'kaligandaki-a', name: 'Kaligandaki A', capacityMW: 144, type: 'peaking-ror', district: 'Syangja', river: 'Kali Gandaki', lngLat: [83.72, 27.96] },
  { id: 'middle-marsyangdi', name: 'Middle Marsyangdi', capacityMW: 70, type: 'peaking-ror', district: 'Lamjung', river: 'Marsyangdi', lngLat: [84.41, 28.2] },
  { id: 'marsyangdi', name: 'Marsyangdi', capacityMW: 69, type: 'peaking-ror', district: 'Tanahun', river: 'Marsyangdi', lngLat: [84.5, 27.93] },
  { id: 'kulekhani-1', name: 'Kulekhani I', capacityMW: 60, type: 'storage', district: 'Makwanpur', river: 'Kulekhani', lngLat: [85.16, 27.59] },
  { id: 'khimti-1', name: 'Khimti I', capacityMW: 60, type: 'run-of-river', district: 'Dolakha', river: 'Khimti Khola', lngLat: [86.1, 27.56] },
  { id: 'upper-bhotekoshi', name: 'Upper Bhote Koshi', capacityMW: 45, type: 'run-of-river', district: 'Sindhupalchok', river: 'Bhote Koshi', lngLat: [85.92, 27.93] },
  { id: 'kulekhani-2', name: 'Kulekhani II', capacityMW: 32, type: 'storage', district: 'Makwanpur', river: 'Kulekhani', lngLat: [85.08, 27.52] },
  { id: 'trishuli', name: 'Trishuli', capacityMW: 24, type: 'run-of-river', district: 'Nuwakot', river: 'Trishuli', lngLat: [85.15, 27.92] },
  { id: 'chilime', name: 'Chilime', capacityMW: 22.1, type: 'run-of-river', district: 'Rasuwa', river: 'Chilime Khola', lngLat: [85.31, 28.17] },
]

export const powerPlants: FeatureCollection<Point, PowerPlantProperties> = {
  type: 'FeatureCollection',
  features: plants.map(({ lngLat, ...properties }) => ({
    type: 'Feature',
    id: properties.id,
    geometry: { type: 'Point', coordinates: lngLat },
    properties,
  })),
}

export const PLANT_TYPE_LABELS: Record<PlantType, string> = {
  'run-of-river': 'Run-of-river',
  'peaking-ror': 'Peaking run-of-river',
  storage: 'Storage',
}

export const PLANT_TYPE_COLORS: Record<PlantType, string> = {
  'run-of-river': '#60a5fa',
  'peaking-ror': '#34d399',
  storage: '#fbbf24',
}

/** Summary figures derived from the dataset above (not national totals). */
export const plantStats = (() => {
  const list = powerPlants.features.map((f) => f.properties)
  const totalMW = list.reduce((sum, p) => sum + p.capacityMW, 0)
  const sorted = [...list].sort((a, b) => b.capacityMW - a.capacityMW)
  return {
    count: list.length,
    totalMW,
    largest: sorted[0],
    byCapacity: sorted,
    districts: new Set(list.map((p) => p.district)).size,
  }
})()
