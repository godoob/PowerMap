import { useEffect, useState } from 'react'
import { Zap, Menu, X, ArrowUpRight, Map } from 'lucide-react'
import { GITHUB_URL, NAV_LINKS } from '../config/site'
import GithubIcon from './GithubIcon'

const MOBILE_NAV_ID = 'mobile-navigation'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  // Close the mobile menu on Escape and when the viewport grows past the md breakpoint.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onBreakpoint = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onBreakpoint)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onBreakpoint)
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-ink-950/85 backdrop-blur-2xl">
      <div className="mx-auto flex h-[76px] max-w-[1600px] items-center justify-between px-5 md:px-8">

        {/* Logo */}
        <a
          href="#top"
          onClick={closeMenu}
          aria-label="PowerMap home"
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 shadow-[0_0_25px_rgba(59,130,246,0.12)] transition-all duration-300 group-hover:bg-blue-500/20">
            <Zap className="h-5 w-5 fill-blue-400 text-blue-400" aria-hidden="true" />
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-white">
              Power<span className="text-blue-400">Map</span>
            </span>
            <span className="text-[9px] font-semibold tracking-[0.25em] text-gray-500">
              NEPAL ENERGY ATLAS
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.025] p-1 md:flex"
        >
          {NAV_LINKS.map((link, i) =>
            i === 0 ? (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 rounded-full bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-400 transition hover:bg-blue-500/20"
              >
                <Map className="h-4 w-4" aria-hidden="true" />
                {link.label}
              </a>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-5 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/[0.06] hover:text-white"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">

          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.05] px-3 py-2 lg:flex">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-emerald-400">
              Infrastructure Atlas
            </span>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="View PowerMap on GitHub (opens in a new tab)"
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm font-medium text-gray-300 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            <ArrowUpRight className="h-3.5 w-3.5 text-gray-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-400" aria-hidden="true" />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-gray-300 transition hover:bg-white/10 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_NAV_ID}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav
          id={MOBILE_NAV_ID}
          aria-label="Mobile"
          className="border-t border-white/[0.08] bg-ink-950 px-5 py-4 md:hidden"
        >
          <div className="mx-auto flex max-w-[1600px] flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={
                  i === 0
                    ? 'rounded-xl bg-blue-500/10 px-4 py-3 text-sm font-medium text-blue-400'
                    : 'rounded-xl px-4 py-3 text-sm text-gray-400 transition hover:bg-white/[0.05] hover:text-white'
                }
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header
