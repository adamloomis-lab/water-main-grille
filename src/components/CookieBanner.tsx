import { useState, useEffect } from 'react'
import { Link } from 'wouter'

const STORAGE_KEY = 'cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setVisible(true), 700)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-3 left-3 right-3 z-50 mx-auto max-w-2xl rounded border border-line-dark steel-panel shadow-[0_8px_32px_rgba(0,0,0,0.45)] px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
    >
      <p className="text-body-md text-cream-dim flex-1">
        This site uses cookies to keep things running smoothly. We never sell your data.{' '}
        <Link href="/privacy" className="text-brick-light underline underline-offset-2 hover:text-cream transition-colors">
          Privacy Policy
        </Link>
      </p>

      <div className="flex shrink-0 items-center gap-3">
        <button
          onClick={accept}
          className="inline-flex items-center justify-center font-body font-semibold uppercase tracking-[0.16em] text-[13px] px-5 py-2.5 rounded transition-all active:scale-[0.98] bg-brick text-on-brick hover:bg-brick-dark shadow-[0_6px_20px_-8px_rgba(176,58,40,0.7)]"
        >
          Sounds Good
        </button>
        <button
          onClick={decline}
          className="inline-flex items-center justify-center font-body font-semibold uppercase tracking-[0.16em] text-[13px] px-5 py-2.5 rounded transition-all active:scale-[0.98] border border-cream/30 text-cream hover:border-cream/70 hover:bg-cream/8"
        >
          No Thanks
        </button>
      </div>
    </div>
  )
}
