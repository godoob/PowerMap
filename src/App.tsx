import Header from './components/Header'
import Footer from './components/Footer'
import MapSection from './components/MapSection'
import Statistics from './components/Statistics'
import About from './components/About'

function App() {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-ink-900 text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-1">
        {/* Hero */}
        <section className="flex min-h-[500px] flex-col items-center justify-center px-5 text-center">
          <h1 className="text-4xl font-bold sm:text-6xl">
            Explore Nepal's
            <span className="block text-blue-400">
              Power Grid
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-gray-400">
            Discover hydropower stations, transmission lines,
            substations and electricity infrastructure across Nepal.
          </p>

          <a
            href="#map"
            className="mt-8 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-400"
          >
            Explore the map
          </a>
        </section>

        <MapSection />
        <Statistics />
        <About />
      </main>

      <Footer />
    </div>
  )
}

export default App
