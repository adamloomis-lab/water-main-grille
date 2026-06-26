import { Link } from 'wouter'

// The Water Main Grille badge (water tower + match-factory smokestacks).
// Always the original badge; the white interior linework reads on the dark
// charcoal theme. `onDark` is accepted for call-site compatibility but the
// original mark is used everywhere.
export default function Logo({
  onDark: _onDark = false,
  className = 'h-12',
}: {
  readonly onDark?: boolean
  readonly className?: string
}) {
  return (
    <Link href="/" aria-label="The Water Main Grille, home" className={`inline-flex ${className}`}>
      <img
        src="/images/logo-dark.webp"
        alt="The Water Main Grille"
        width={250}
        height={249}
        className="h-full w-auto"
      />
    </Link>
  )
}
