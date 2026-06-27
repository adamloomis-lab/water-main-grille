import { useState, useRef } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import {
  Clock,
  HeartHandshake,
  HandCoins,
  UtensilsCrossed,
  ChefHat,
  Soup,
  Droplets,
  ConciergeBell,
  CircleHelp,
} from 'lucide-react'
import { company } from '../data/site'
import FactoryBackdrop from '../components/FactoryBackdrop'
import { FloatField, IconCard, SuccessCheck, SheenSubmit } from '../components/FluidField'

const perks = [
  { icon: HeartHandshake, title: 'Family Atmosphere', blurb: 'A tight-knit, family-run crew that has each other’s backs, shift after shift.' },
  { icon: Clock, title: 'Daytime Hours', blurb: 'We’re open 6am-2pm, Tuesday through Saturday. Your nights and Sundays stay yours.' },
  { icon: HandCoins, title: 'Honest Pay & Tips', blurb: 'Competitive pay, a busy breakfast rush, and a loyal local following that tips well.' },
]

// Single-select cards. `value` is byte-identical to the original <select>
// options so the Netlify submission is unchanged.
const POSITION_OPTIONS = [
  { value: 'Server / Waitstaff', label: 'Server / Waitstaff', icon: UtensilsCrossed },
  { value: 'Line Cook', label: 'Line cook', icon: ChefHat },
  { value: 'Prep Cook', label: 'Prep cook', icon: Soup },
  { value: 'Dishwasher', label: 'Dishwasher', icon: Droplets },
  { value: 'Host / Counter', label: 'Host / Counter', icon: ConciergeBell },
  { value: 'Anything available', label: 'Anything available', icon: CircleHelp },
]

const AVAILABILITY_OPTIONS = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Either', label: 'Either' },
]

export default function Careers() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', position: '', availability: '', experience: '' })
  const formRef = useRef<HTMLFormElement>(null)
  const formCardRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const formEl = e.currentTarget
    const fd = new FormData(formEl)
    const first = form.name.trim().split(/\s+/)[0] || ''
    try {
      // Multipart submit so an attached resume file uploads to Netlify.
      const res = await fetch('/', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setFirstName(first)
      setSent(true)
      setForm({ name: '', phone: '', email: '', position: '', availability: '', experience: '' })
      formEl.reset()
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setError(true)
    }
  }

  const fileField =
    'w-full rounded border border-line bg-paper-2 px-4 py-3 text-body-md text-ink-soft file:mr-4 file:rounded file:border-0 file:bg-brick file:px-4 file:py-2 file:font-display file:text-[12px] file:uppercase file:tracking-[0.14em] file:text-on-brick hover:file:bg-brick-dark'

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="steel-panel brick-texture relative overflow-hidden">
        <FactoryBackdrop src="/images/history/factory-floor-2.webp" />
        <div className="container-x relative z-10 pt-36 pb-16 text-center">
          <p className="eyebrow text-brick-light">Now Hiring on Main Street</p>
          <h1 className="mt-4 font-display text-display-lg-mobile font-bold text-cream md:text-display-lg">
            Join the crew.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-dim">
            We&rsquo;re always looking for friendly, hard-working people to help us serve Wadsworth its
            favorite breakfast and lunch. Fill out the quick application below and we&rsquo;ll be in touch.
          </p>
        </div>
      </section>

      {/* ---------- WHY WORK HERE ---------- */}
      <section className="bg-paper py-20 md:py-24">
        <div className="container-x">
          <div className="reveal-group grid gap-10 sm:grid-cols-3">
            {perks.map((p) => (
              <div key={p.title}>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brick/12 text-brick">
                  <p.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-headline-sm text-ink">{p.title}</h3>
                <p className="mt-2 text-body-md text-ink-soft">{p.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- APPLICATION ---------- */}
      <section className="bg-paper-2 py-20 md:py-24">
        <div className="container-x max-w-2xl">
          <div ref={formCardRef} className="scroll-mt-28 rounded-lg border border-line bg-card p-8 md:p-10">
            <p className="eyebrow">Apply Online</p>
            <h2 className="mt-4 font-display text-headline-md text-ink">Tell us about yourself</h2>

            {sent ? (
              <div
                className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-brick/40 bg-brick/5 px-6 py-12 text-center"
                style={{ animation: 'wmg-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) both' }}
              >
                <SuccessCheck />
                <p className="font-display text-headline-md text-ink">
                  Thank You{firstName ? `, ${firstName}` : ''}!
                </p>
                <p className="text-body-md text-ink-soft">
                  {firstName ? `${firstName}, we` : 'We'}&rsquo;ve got your application and we&rsquo;ll
                  review it soon. If it looks like a fit, we&rsquo;ll reach out to set up a time to chat.
                  Questions? Call us at{' '}
                  <a href={company.phoneHref} className="font-semibold text-brick hover:text-brick-light">
                    {company.phone}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                name="application"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                encType="multipart/form-data"
                onSubmit={onSubmit}
                className="mt-7 space-y-5"
              >
                <input type="hidden" name="form-name" value="application" />
                <p className="hidden">
                  <label>
                    Don’t fill this out: <input name="bot-field" />
                  </label>
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatField idPrefix="careers" name="name" label="Full name" value={form.name} onChange={handleChange} required />
                  <FloatField idPrefix="careers" name="phone" label="Phone" type="tel" value={form.phone} onChange={handleChange} required />
                </div>
                <FloatField idPrefix="careers" name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />

                {/* Position as single-select icon cards (value still submits via form.position) */}
                <fieldset>
                  <legend className="mb-3 block font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    Position of interest
                  </legend>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {POSITION_OPTIONS.map((o) => (
                      <IconCard
                        key={o.value}
                        icon={o.icon}
                        label={o.label}
                        active={form.position === o.value}
                        onClick={() =>
                          setForm((prev) => ({ ...prev, position: prev.position === o.value ? '' : o.value }))
                        }
                      />
                    ))}
                  </div>
                  <input type="hidden" name="position" value={form.position} required />
                </fieldset>

                {/* Availability as single-select pills */}
                <fieldset>
                  <legend className="mb-3 block font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                    Availability
                  </legend>
                  <div className="flex flex-wrap gap-2.5">
                    {AVAILABILITY_OPTIONS.map((o) => {
                      const active = form.availability === o.value
                      return (
                        <button
                          key={o.value}
                          type="button"
                          aria-pressed={active}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, availability: active ? '' : o.value }))
                          }
                          className={`rounded-full border px-5 py-2.5 font-body text-body-md font-semibold transition-all duration-200 active:scale-[0.98] ${
                            active
                              ? 'border-brick bg-brick text-on-brick shadow-[0_10px_24px_-12px_rgba(176,58,40,0.7)]'
                              : 'border-line bg-paper-2 text-ink hover:border-brick hover:bg-card'
                          }`}
                        >
                          {o.label}
                        </button>
                      )
                    })}
                  </div>
                  <input type="hidden" name="availability" value={form.availability} required />
                </fieldset>

                <FloatField
                  idPrefix="careers"
                  name="experience"
                  label="Tell us a little about your experience and when you can start"
                  value={form.experience}
                  onChange={handleChange}
                  textarea
                  rows={4}
                />
                <div>
                  <label className="mb-2 block text-[13px] uppercase tracking-[0.14em] text-ink-faint">
                    Resume (optional, PDF or Word)
                  </label>
                  <input className={fileField} type="file" name="resume" accept=".pdf,.doc,.docx" />
                </div>
                {error && (
                  <p className="text-body-md text-error">
                    Oops, something went wrong sending your application. Please try again, or call us at{' '}
                    {company.phone}.
                  </p>
                )}
                <SheenSubmit>Submit Application</SheenSubmit>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
