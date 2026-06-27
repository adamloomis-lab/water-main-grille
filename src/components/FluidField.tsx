import type { ChangeEvent } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight } from 'lucide-react'

// Shared "fluid" form controls for The Water Main Grille, tuned for the dark
// charcoal card surface and the brick accent: floating-label fields (brick
// center-out underline + focus glow), single-select icon cards, a drawn
// thank-you checkmark, and a sheened brick submit button. Used by the Contact
// and Careers forms.

interface FloatFieldProps {
  name: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  required?: boolean
  textarea?: boolean
  rows?: number
  idPrefix?: string
}

export function FloatField({
  name,
  label,
  value,
  onChange,
  type = 'text',
  required,
  textarea,
  rows = 5,
  idPrefix = 'f',
}: FloatFieldProps) {
  const id = `${idPrefix}-${name}`
  const input =
    'peer w-full bg-transparent px-4 pt-6 pb-2 font-body text-body-md text-ink placeholder-transparent outline-none'
  const labelCls =
    'pointer-events-none absolute left-4 top-4 origin-left font-body text-body-md text-ink-faint transition-all duration-200 ' +
    'peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-brick-light ' +
    'peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:text-ink-soft'
  return (
    <div className="group relative rounded border border-line bg-paper-2 transition-all duration-300 focus-within:border-brick/60 focus-within:bg-card focus-within:shadow-[0_10px_30px_-14px_rgba(176,58,40,0.5)]">
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={`${input} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          required={required}
          placeholder=" "
          value={value}
          onChange={onChange}
          className={input}
        />
      )}
      <label htmlFor={id} className={labelCls}>
        {label}
        {required && <span className="ml-1 text-brick-light">*</span>}
      </label>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-0.5 w-[calc(100%-2rem)] -translate-x-1/2 scale-x-0 bg-brick transition-transform duration-300 peer-focus:scale-x-100"
      />
    </div>
  )
}

// Single-select icon card. Submitted value is unchanged from the original
// select option; the active state fills brick.
interface IconCardProps {
  icon: LucideIcon
  label: string
  active: boolean
  onClick: () => void
}

export function IconCard({ icon: Icon, label, active, onClick }: IconCardProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex flex-col items-start gap-2 rounded border px-3.5 py-3.5 text-left font-body text-body-md transition-all duration-200 active:scale-[0.98] ${
        active
          ? 'border-brick bg-brick text-on-brick shadow-[0_10px_24px_-12px_rgba(176,58,40,0.7)]'
          : 'border-line bg-paper-2 text-ink hover:border-brick hover:bg-card'
      }`}
    >
      <Icon size={22} className={active ? 'text-on-brick' : 'text-brick'} strokeWidth={1.75} aria-hidden="true" />
      <span className="font-semibold leading-tight">{label}</span>
    </button>
  )
}

// Dashed cross-link card (e.g. "Join our team") that navigates instead of
// setting a value. Children render the icon + label.
interface CrossLinkCardProps {
  icon: LucideIcon
  label: string
  href: string
  ariaLabel: string
  LinkComponent: React.ComponentType<{ href: string; 'aria-label': string; className?: string; children: React.ReactNode }>
}

export function CrossLinkCard({ icon: Icon, label, href, ariaLabel, LinkComponent }: CrossLinkCardProps) {
  return (
    <LinkComponent
      href={href}
      aria-label={ariaLabel}
      className="group flex flex-col items-start gap-2 rounded border border-dashed border-brick/45 bg-paper-2 px-3.5 py-3.5 text-left font-body text-body-md text-ink transition-all duration-200 hover:border-solid hover:border-brick hover:bg-card active:scale-[0.98]"
    >
      <span className="flex w-full items-center justify-between">
        <Icon size={22} className="text-brick" strokeWidth={1.75} aria-hidden="true" />
        <ArrowUpRight
          size={16}
          className="text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brick"
          aria-hidden="true"
        />
      </span>
      <span className="font-semibold leading-tight">{label}</span>
    </LinkComponent>
  )
}

// Animated drawn checkmark for the personalized thank-you state.
export function SuccessCheck() {
  return (
    <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden="true">
      <circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="var(--color-brick)"
        strokeWidth="3"
        strokeDasharray="151"
        strokeDashoffset="151"
        style={{ animation: 'wmg-draw-check 0.6s ease forwards' }}
      />
      <path
        d="M15 27 l7 7 l15 -16"
        fill="none"
        stroke="var(--color-brick)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="40"
        strokeDashoffset="40"
        style={{ animation: 'wmg-draw-check 0.4s 0.5s ease forwards' }}
      />
    </svg>
  )
}

// Sheened brick submit button. Children are the inner label/icon content.
export function SheenSubmit({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded bg-brick px-9 py-5 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors duration-300 hover:bg-brick-dark active:scale-[0.99]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/25 blur-md group-hover:[animation:wmg-sheen_0.9s_ease]"
      />
      {children}
    </button>
  )
}
