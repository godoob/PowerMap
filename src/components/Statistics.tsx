import { Factory, Gauge, MapPin, Trophy } from 'lucide-react'
import { plantStats, PLANT_TYPE_COLORS } from '../data/powerPlants'

const numberFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 })

const tiles = [
  { icon: Factory, label: 'Plants mapped', value: numberFormat.format(plantStats.count) },
  { icon: Gauge, label: 'Combined capacity', value: `${numberFormat.format(plantStats.totalMW)} MW` },
  { icon: Trophy, label: 'Largest plant', value: plantStats.largest?.name ?? '—' },
  { icon: MapPin, label: 'Districts covered', value: numberFormat.format(plantStats.districts) },
]

function Statistics() {
  const max = plantStats.largest?.capacityMW ?? 1

  return (
    <section id="statistics" aria-labelledby="statistics-heading" className="mx-auto max-w-7xl px-5 py-10">
      <h2 id="statistics-heading" className="text-2xl font-semibold">
        Statistics
      </h2>
      <p className="mt-1 text-sm text-gray-400">
        Figures below are computed from the plants currently on the map, not national totals.
      </p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-white/10 bg-panel p-5">
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
              <Icon className="h-4 w-4 text-blue-400" aria-hidden="true" />
              {label}
            </dt>
            <dd className="mt-2 text-2xl font-semibold text-white">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 rounded-2xl border border-white/10 bg-panel p-5">
        <h3 className="text-sm font-semibold text-white">Installed capacity by plant</h3>
        <ul className="mt-4 space-y-3">
          {plantStats.byCapacity.map((plant) => (
            <li key={plant.id} className="grid grid-cols-[minmax(0,9rem)_1fr_auto] items-center gap-3 text-sm">
              <span className="truncate text-gray-300">{plant.name}</span>
              <span className="h-2 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${(plant.capacityMW / max) * 100}%`,
                    backgroundColor: PLANT_TYPE_COLORS[plant.type],
                  }}
                />
              </span>
              <span className="tabular-nums text-gray-400">{numberFormat.format(plant.capacityMW)} MW</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Statistics
