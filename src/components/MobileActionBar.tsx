import { Phone, MapPin, UtensilsCrossed } from 'lucide-react'
import { company } from '../data/site'

// High-end floating action bar: an elevated, blurred charcoal capsule that
// stands off the edge with glassy Call + Directions buttons and a glowing,
// sheened brick Menu button as the primary action. Mobile only (hidden lg+).
const c = company as Record<string, any>
const directions =
  c.mapsDir ||
  'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent(c.addressOneLine || c.name || '')
const phone = c.phoneHref || 'tel:' + String(c.phone || '').replace(/[^\d+]/g, '')

export default function MobileActionBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 px-3 lg:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex gap-2 rounded-2xl border border-white/10 bg-steel/85 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <a
          href={phone}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-cream transition-all active:scale-95"
        >
          <Phone size={18} className="text-bluetip-light" aria-hidden="true" /> Call
        </a>
        <a
          href={directions}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-cream transition-all active:scale-95"
        >
          <MapPin size={18} className="text-bluetip-light" aria-hidden="true" /> Directions
        </a>
        <a
          href="/menu"
          className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-brick py-3.5 font-body text-[11px] font-semibold uppercase tracking-[0.12em] text-on-brick animate-glow-pulse transition-all active:scale-95"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:wmg-sheen_0.9s_ease]"
          />
          <UtensilsCrossed size={18} aria-hidden="true" /> Menu
        </a>
      </div>
    </nav>
  )
}
