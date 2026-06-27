import { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { UtensilsCrossed, ArrowRight } from 'lucide-react'

// Desktop-only floating "View Menu" pill, revealed once the visitor scrolls
// past the hero. A glowing, sheened brick capsule that reads as premium.
export default function StickyMenu() {
  const [show, setShow] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const threshold =
        hero && hero.offsetHeight > 0
          ? hero.offsetTop + hero.offsetHeight - 80
          : window.innerHeight * 0.6
      setShow(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location])

  // Hide on the Menu page itself.
  if (location === '/menu') return null

  return (
    <Link
      href="/menu"
      className={`group fixed bottom-8 right-8 z-40 hidden items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-br from-brick to-brick-dark px-7 py-4 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-on-brick shadow-[0_16px_44px_-8px_rgba(176,58,40,0.6)] ring-1 ring-white/15 transition-all duration-300 hover:scale-[1.04] lg:flex ${
        show
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-5 opacity-0'
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md group-hover:[animation:wmg-sheen_1s_ease]"
      />
      <UtensilsCrossed size={18} aria-hidden="true" /> View Menu
      <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}
