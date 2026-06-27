import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'wouter'
import { X, Phone, MapPin, Clock, ArrowRight, Facebook } from 'lucide-react'
import { company } from '../data/site'

export interface MobileMenuProps {
  readonly open: boolean
  readonly onClose: () => void
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Catering', href: '/catering' },
  { label: 'Our Story', href: '/history' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

// Full-screen, high-trust mobile navigation. Backdrop-blurred charcoal panel
// slides in from the right with a brick glow, a real trust line, staggered
// link entrance, and prominent Call + Menu CTAs. Scroll-locked, aria-modal,
// closes on Escape.
export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', onKey)
      // Double rAF: ensures the panel paints in its closed (off-screen) state
      // before flipping `shown`, so the slide-in transition reliably runs.
      let raf2 = 0
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setShown(true))
      })
      return () => {
        cancelAnimationFrame(raf1)
        cancelAnimationFrame(raf2)
        window.removeEventListener('keydown', onKey)
        document.body.style.overflow = ''
      }
    }
    setShown(false)
    document.body.style.overflow = ''
  }, [open, onClose])

  if (!open) return null
  // SSR guard — document only exists in the browser.
  if (typeof document === 'undefined') return null

  // IMPORTANT: render at document.body via portal so the panel's `position:
  // fixed` escapes the header's containing block. The header applies
  // `backdrop-blur-md` once scrolled/open, which makes it a containing block
  // for fixed descendants — that's why the menu clipped to the ~80px header
  // strip before this portal was added.
  return createPortal(
    <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-300 ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        className={`steel-panel brick-texture relative ml-auto h-full w-full max-w-sm overflow-y-auto text-cream shadow-[0_0_60px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          shown ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative flex min-h-full flex-col px-7 pt-6 pb-10">
          <div className="flex items-center justify-between">
            <img src="/images/logo-dark.webp" alt={company.name} className="h-12 w-auto" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-cream transition-colors hover:bg-white/10"
            >
              <X size={24} />
            </button>
          </div>

          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-brick px-3 py-1.5 text-label-sm uppercase tracking-[0.14em] font-semibold text-on-brick">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> 4.7&#9733; · 370 Google reviews
          </span>

          <nav className="mt-6 flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className={`group flex items-center justify-between border-b border-white/10 py-4 font-display text-headline-md uppercase text-cream/90 transition-transform duration-500 motion-reduce:transition-none hover:text-brick-light ${
                  shown ? 'translate-x-0' : 'translate-x-6'
                }`}
                style={{ transitionDelay: `${120 + i * 70}ms` }}
              >
                {l.label}
                <ArrowRight
                  size={20}
                  className="text-cream/30 transition-all group-hover:translate-x-1 group-hover:text-brick-light"
                />
              </Link>
            ))}
          </nav>

          <div
            className={`mt-8 flex flex-col gap-3 transition-transform duration-500 motion-reduce:transition-none ${
              shown ? 'translate-y-0' : 'translate-y-4'
            }`}
            style={{ transitionDelay: `${120 + links.length * 70 + 60}ms` }}
          >
            <a
              href={company.phoneHref}
              className="flex items-center justify-center gap-2 rounded bg-brick px-6 py-4 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-on-brick"
            >
              <Phone size={18} /> Call {company.phone}
            </a>
            <Link
              href="/menu"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded border-2 border-white/70 px-6 py-4 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-cream hover:text-steel"
            >
              View Menu
            </Link>
          </div>

          <div className="mt-auto space-y-3 pt-10 font-body text-body-md text-cream/70">
            <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-cream">
              <MapPin size={18} className="shrink-0 text-brick-light" /> {company.addressOneLine}
            </a>
            <p className="flex items-center gap-3">
              <Clock size={18} className="shrink-0 text-brick-light" /> Tue to Sat, 6am to 2pm
            </p>
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-cream"
            >
              <Facebook size={18} className="shrink-0 text-brick-light" /> Water Main Grille on Facebook
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
