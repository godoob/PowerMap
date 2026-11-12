import { Zap, Info } from 'lucide-react'
import { GITHUB_URL, NAV_LINKS, SOURCE_LINKS } from '../config/site'

const CURRENT_YEAR = new Date().getFullYear()

const linkClass = 'hover:text-blue-400'

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <div className="mx-auto max-w-[1600px] px-5 py-10 md:px-8">

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-400" aria-hidden="true" />

              <span className="text-lg font-bold">
                Power<span className="text-blue-400">Map</span>
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
              An interactive visual atlas of Nepal's
              electricity infrastructure.
            </p>
          </div>

          {/* Explore */}
          <nav aria-labelledby="footer-explore">
            <h3 id="footer-explore" className="mb-4 text-sm font-semibold text-white">
              Explore
            </h3>

            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={linkClass}>
                    {link.footerLabel}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Information */}
          <nav aria-labelledby="footer-info">
            <h3 id="footer-info" className="mb-4 text-sm font-semibold text-white">
              Information
            </h3>

            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              {[...SOURCE_LINKS, { href: GITHUB_URL, label: 'GitHub Repository' }].map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>
            © {CURRENT_YEAR} PowerMap Nepal. Built with purpose.
          </p>

          <p className="flex items-center gap-1">
            <Info className="h-3 w-3" aria-hidden="true" />
            Independent visualization project
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
