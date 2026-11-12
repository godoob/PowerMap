import { SOURCE_LINKS } from '../config/site'

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-2xl border border-white/10 bg-panel p-6 md:p-8">
        <h2 id="about-heading" className="text-2xl font-semibold">
          About PowerMap
        </h2>
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          <p className="text-sm leading-7 text-gray-400">
            PowerMap Nepal is an open-source, independent project that brings Nepal's electricity
            infrastructure — hydropower plants, transmission lines and substations — into a single
            interactive atlas. The aim is to make the country's energy landscape easier to explore
            for students, researchers, journalists and anyone curious about where Nepal's power
            comes from.
          </p>
          <div>
            <h3 className="text-sm font-semibold text-white">Data sources</h3>
            <p className="mt-2 text-sm leading-7 text-gray-400">
              Data is checked for accuracy and attribution requirements before it is shown. Sources
              include:
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {SOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
