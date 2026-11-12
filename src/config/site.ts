export const GITHUB_URL = 'https://github.com/naaavv/PowerMap'

export const NAV_LINKS = [
  { href: '#map', label: 'Explore Map', footerLabel: 'Interactive Map' },
  { href: '#statistics', label: 'Statistics', footerLabel: 'Statistics' },
  { href: '#about', label: 'About', footerLabel: 'About PowerMap' },
] as const

export const SOURCE_LINKS = [
  { href: 'https://www.nea.org.np/', label: 'Nepal Electricity Authority' },
  { href: 'https://doed.gov.np/', label: 'Department of Electricity Development' },
  { href: 'https://www.openstreetmap.org/', label: 'OpenStreetMap' },
] as const

/** Free, key-less vector basemap. Override with VITE_MAP_STYLE_URL. */
export const MAP_STYLE_URL =
  import.meta.env.VITE_MAP_STYLE_URL ?? 'https://tiles.openfreemap.org/styles/dark'

/** Nepal bounding box: [west, south, east, north], padded slightly. */
export const NEPAL_BOUNDS: [number, number, number, number] = [79.8, 26.0, 88.5, 30.7]
export const NEPAL_MAX_BOUNDS: [number, number, number, number] = [77.5, 24.5, 90.5, 32.0]
