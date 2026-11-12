import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { PLANT_TYPE_COLORS, PLANT_TYPE_LABELS, type PlantType } from '../data/powerPlants'

// MapLibre is ~1 MB of JS; split it out and only fetch it when the map is near the viewport.
const MapView = lazy(() => import('./MapView'))

function MapPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full animate-pulse items-center justify-center bg-panel motion-reduce:animate-none">
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  )
}

function MapSection() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="map" aria-labelledby="map-heading" className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 id="map-heading" className="text-2xl font-semibold">
            Interactive Map
          </h2>
          <p className="mt-1 text-sm text-gray-400">
            Hydropower plants sized by installed capacity. Click a plant for details.
          </p>
        </div>

        <ul className="flex flex-wrap gap-4 text-xs text-gray-400" aria-label="Map legend">
          {(Object.keys(PLANT_TYPE_LABELS) as PlantType[]).map((type) => (
            <li key={type} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: PLANT_TYPE_COLORS[type] }}
                aria-hidden="true"
              />
              {PLANT_TYPE_LABELS[type]}
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={sentinelRef}
        className="h-[60vh] min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-panel"
      >
        {shouldLoad ? (
          <Suspense fallback={<MapPlaceholder label="Loading map…" />}>
            <MapView />
          </Suspense>
        ) : (
          <MapPlaceholder label="Map loads as you scroll" />
        )}
      </div>

      <p className="mt-3 text-xs text-gray-600">
        Sample dataset with approximate locations, pending verification against NEA, DoED and
        OpenStreetMap records.
      </p>
    </section>
  )
}

export default MapSection
