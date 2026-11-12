import { useEffect, useRef, useState } from 'react'
import * as maplibregl from 'maplibre-gl'
import type { ErrorEvent, MapLayerMouseEvent } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
// MapLibre resolves its worker relative to its own module URL, which breaks once
// Vite bundles it. Emit the (self-contained) worker as an asset and point at it.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url'
import {
  powerPlants,
  PLANT_TYPE_COLORS,
  PLANT_TYPE_LABELS,
  type PowerPlantProperties,
} from '../data/powerPlants'
import { MAP_STYLE_URL, NEPAL_BOUNDS, NEPAL_MAX_BOUNDS } from '../config/site'

maplibregl.setWorkerUrl(workerUrl)

const SOURCE_ID = 'power-plants'
const LAYER_ID = 'power-plants-circles'

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
}

function popupHtml(p: PowerPlantProperties) {
  return `
    <div class="pm-popup">
      <strong>${escapeHtml(p.name)}</strong>
      <dl>
        <dt>Capacity</dt><dd>${p.capacityMW} MW</dd>
        <dt>Type</dt><dd>${escapeHtml(PLANT_TYPE_LABELS[p.type])}</dd>
        <dt>River</dt><dd>${escapeHtml(p.river)}</dd>
        <dt>District</dt><dd>${escapeHtml(p.district)}</dd>
      </dl>
    </div>`
}

function MapView() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const map = new maplibregl.Map({
      container,
      style: MAP_STYLE_URL,
      bounds: NEPAL_BOUNDS,
      maxBounds: NEPAL_MAX_BOUNDS,
      fitBoundsOptions: { padding: 24 },
      attributionControl: { compact: true },
      cooperativeGestures: true,
      dragRotate: false,
      pitchWithRotate: false,
    })
    map.touchZoomRotate.disableRotation()
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
    map.addControl(new maplibregl.FullscreenControl(), 'top-right')

    const popup = new maplibregl.Popup({ closeButton: true, maxWidth: '260px', offset: 12 })

    map.on('load', () => {
      map.addSource(SOURCE_ID, { type: 'geojson', data: powerPlants })
      map.addLayer({
        id: LAYER_ID,
        type: 'circle',
        source: SOURCE_ID,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['sqrt', ['get', 'capacityMW']], 4, 5, 22, 18],
          'circle-color': [
            'match',
            ['get', 'type'],
            'storage', PLANT_TYPE_COLORS.storage,
            'peaking-ror', PLANT_TYPE_COLORS['peaking-ror'],
            PLANT_TYPE_COLORS['run-of-river'],
          ],
          'circle-opacity': 0.8,
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#0b1120',
        },
      })
    })

    const onClick = (e: MapLayerMouseEvent) => {
      const feature = e.features?.[0]
      if (!feature || feature.geometry.type !== 'Point') return
      const [lng, lat] = feature.geometry.coordinates
      popup
        .setLngLat([lng, lat])
        .setHTML(popupHtml(feature.properties as PowerPlantProperties))
        .addTo(map)
    }
    const setPointer = () => (map.getCanvas().style.cursor = 'pointer')
    const clearPointer = () => (map.getCanvas().style.cursor = '')

    map.on('click', LAYER_ID, onClick)
    map.on('mouseenter', LAYER_ID, setPointer)
    map.on('mouseleave', LAYER_ID, clearPointer)
    map.on('error', (e: ErrorEvent) => {
      // Only surface failures that leave the map unusable (style/tiles), not
      // transient per-tile errors once the map is already showing.
      if (!map.isStyleLoaded()) setError(e.error?.message ?? 'The map failed to load.')
    })

    // Keep the canvas sized correctly when its container changes size.
    const resizeObserver = new ResizeObserver(() => map.resize())
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      popup.remove()
      map.remove()
    }
  }, [])

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="h-full w-full"
        role="region"
        aria-label="Interactive map of hydropower plants in Nepal"
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-panel/90 p-6 text-center">
          <p className="text-sm text-gray-400">
            The map could not be loaded. Check your connection and try again.
            <span className="mt-1 block text-xs text-gray-600">{error}</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default MapView
