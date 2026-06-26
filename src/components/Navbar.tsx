import { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, Phone } from 'lucide-react'
import Logo from './Logo'
import { company } from '../data/site'
import { useScrolled } from '../hooks/useScrolled'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Catering', href: '/catering' },
  { label: 'Our Story', href: '/history' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [location] = useLocation()
  const scrolled = useScrolled(40)

  // Solid parchment bar once scrolled (or menu open); translucent over the hero.
  const solid = scrolled || open

  const linkBase = 'font-body text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors'
  const linkColor = solid ? 'text-ink-soft hover:text-brick' : 'text-cream hover:text-cream/70'

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        solid
          ? 'border-b border-line bg-paper/95 backdrop-blur-md'
          : 'border-b border-transparent bg-gradient-to-b from-black/55 to-transparent'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Logo onDark={!solid} className="h-12 sm:h-14" />

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => {
            const active = l.href === location
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${linkBase} ${active ? 'text-brick' : linkColor}`}
              >
                {l.label}
              </Link>
            )
          })}
          <a
            href={company.phoneHref}
            className={`inline-flex items-center gap-2 ${linkBase} ${
              solid ? 'text-ink hover:text-brick' : 'text-cream hover:text-cream/70'
            }`}
          >
            <Phone size={15} className="text-brick" /> {company.phone}
          </a>
          <Link
            href="/menu"
            className="inline-flex items-center rounded bg-brick px-6 py-3 font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors hover:bg-brick-dark"
          >
            View Menu
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={solid ? 'text-ink lg:hidden' : 'text-cream lg:hidden'}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-paper lg:hidden">
          <div className="container-x flex flex-col gap-1 py-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 font-body text-sm font-semibold uppercase tracking-[0.16em] text-ink-soft hover:bg-paper-2 hover:text-brick"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={company.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded border border-brick/45 px-5 py-3 font-body text-sm font-semibold uppercase tracking-[0.14em] text-brick"
            >
              <Phone size={17} /> {company.phone}
            </a>
            <Link
              href="/menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center rounded bg-brick px-5 py-3 font-body text-sm font-semibold uppercase tracking-[0.14em] text-on-brick"
            >
              View Menu
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
