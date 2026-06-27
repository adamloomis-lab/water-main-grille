import { useState, useRef } from 'react'
import type { FormEvent, ChangeEvent } from 'react'
import { Link } from 'wouter'
import {
  MapPin,
  Phone,
  Clock,
  Facebook,
  Car,
  HelpCircle,
  UtensilsCrossed,
  PartyPopper,
  MessageCircle,
  Briefcase,
} from 'lucide-react'
import { company } from '../data/site'
import { faqs } from '../lib/seo'
import HoursList from '../components/HoursList'
import FactoryBackdrop from '../components/FactoryBackdrop'
import { FloatField, IconCard, CrossLinkCard, SuccessCheck, SheenSubmit } from '../components/FluidField'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

// Single-select subject cards. `value` is byte-identical to the original
// <select> options so the Netlify submission is unchanged.
const SUBJECT_OPTIONS = [
  { value: 'General Question', label: 'General question', icon: HelpCircle },
  { value: 'Catering', label: 'Catering', icon: UtensilsCrossed },
  { value: 'Private Event', label: 'Private event', icon: PartyPopper },
  { value: 'Feedback', label: 'Feedback', icon: MessageCircle },
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const formCardRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const first = form.name.trim().split(/\s+/)[0] || ''
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          name: form.name,
          phone: form.phone,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })
      if (!res.ok) throw new Error()
      setFirstName(first)
      setSent(true)
      setForm({ name: '', phone: '', email: '', subject: '', message: '' })
      // Bring the confirmation into view so it's seen in place, not below the fold.
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setError(true)
    }
  }

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <section className="steel-panel brick-texture relative overflow-hidden">
        <FactoryBackdrop src="/images/history/factory-floor-2.webp" />
        <div className="container-x relative z-10 pt-36 pb-16 text-center">
          <p className="eyebrow text-brick-light">Right on Main Street</p>
          <h1 className="mt-4 font-display text-display-lg-mobile font-bold text-cream md:text-display-lg">
            Visit &amp; Contact
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-dim">
            Find us in Wadsworth&rsquo;s historic south end. Stop in for breakfast or lunch, call ahead for
            carry-out, or send us a note and we&rsquo;ll get right back to you.
          </p>
        </div>
      </section>

      {/* ---------- DETAILS + FORM ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          {/* Details */}
          <div className="reveal">
            <p className="eyebrow">Our Location</p>
            <h2 className="mt-4 font-display text-headline-lg text-ink">339 Main St</h2>
            <span className="brick-rule mt-5 block w-[72px]" />

            <ul className="mt-8 space-y-5 text-body-md">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-brick" />
                <a href={company.mapsDir} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-brick">
                  {company.addressOneLine}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Phone size={20} className="mt-0.5 shrink-0 text-brick" />
                <a href={company.phoneHref} className="text-ink-soft hover:text-brick">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Car size={20} className="mt-0.5 shrink-0 text-brick" />
                <span className="text-ink-soft">{company.parking}</span>
              </li>
            </ul>

            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-11 w-11 items-center justify-center rounded border border-line text-ink-soft transition-colors hover:border-brick hover:text-brick"
              aria-label="The Water Main Grille on Facebook"
            >
              <Facebook size={18} />
            </a>

            <div className="mt-10 rounded-lg border border-line bg-card p-7">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-brick" />
                <h3 className="font-display text-headline-sm text-ink">Hours</h3>
              </div>
              <HoursList className="mt-4 -mx-2" />
              <p className="mt-3 px-1 text-[13px] text-ink-faint">
                Breakfast served all day · Lunch 11am-2pm
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal">
            <div ref={formCardRef} className="scroll-mt-28 rounded-lg border border-line bg-card p-8 md:p-10">
              <p className="eyebrow">Send a Message</p>
              <h2 className="mt-4 font-display text-headline-md text-ink">Get in Touch</h2>

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
                    {firstName ? `${firstName}, your` : 'Your'} request is on its way to The Water Main
                    Grille. We&rsquo;ll get back to you as soon as we can. For a faster reply, give us a
                    call at{' '}
                    <a href={company.phoneHref} className="font-semibold text-brick hover:text-brick-light">
                      {company.phone}
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={onSubmit}
                  className="mt-7 space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FloatField idPrefix="contact" name="name" label="Name" value={form.name} onChange={handleChange} required />
                    <FloatField idPrefix="contact" name="phone" label="Phone" type="tel" value={form.phone} onChange={handleChange} />
                  </div>
                  <FloatField idPrefix="contact" name="email" label="Email" type="email" value={form.email} onChange={handleChange} required />

                  {/* Subject as single-select icon cards (value still submits via form.subject) */}
                  <fieldset>
                    <legend className="mb-3 block font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                      What can we help with?
                    </legend>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {SUBJECT_OPTIONS.map((o) => (
                        <IconCard
                          key={o.value}
                          icon={o.icon}
                          label={o.label}
                          active={form.subject === o.value}
                          onClick={() =>
                            setForm((prev) => ({ ...prev, subject: prev.subject === o.value ? '' : o.value }))
                          }
                        />
                      ))}
                      <CrossLinkCard
                        icon={Briefcase}
                        label="Join our team"
                        href="/careers"
                        ariaLabel="Join our team, opens the job application form"
                        LinkComponent={Link}
                      />
                    </div>
                    {/* Hidden input carries the selected subject; required mirrors original. */}
                    <input type="hidden" name="subject" value={form.subject} required />
                  </fieldset>

                  <FloatField
                    idPrefix="contact"
                    name="message"
                    label="How can we help?"
                    value={form.message}
                    onChange={handleChange}
                    required
                    textarea
                    rows={5}
                  />

                  {error && (
                    <p className="text-body-md text-error">
                      Oops, there was an error sending your message. Please try again later, or call{' '}
                      {company.phone}.
                    </p>
                  )}
                  <SheenSubmit>Send Message</SheenSubmit>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-paper-2 py-20 md:py-24">
        <div className="container-x max-w-3xl">
          <h2 className="text-center font-display text-headline-lg text-ink">Good to Know</h2>
          <span className="brick-rule mx-auto mt-5 block w-[72px]" />
          <dl className="mt-10 divide-y divide-line">
            {faqs.map((f) => (
              <div key={f.q} className="py-5">
                <dt className="font-display text-headline-sm text-ink">{f.q}</dt>
                <dd className="mt-2 text-body-md text-ink-soft">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- MAP ---------- */}
      <section className="border-t border-line">
        <iframe
          title="The Water Main Grille location, 339 Main St, Wadsworth, OH"
          src={company.mapsEmbed}
          className="h-[460px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <p className="bg-steel py-3 text-center text-label-sm uppercase tracking-[0.16em] text-cream-faint">
          Serving Wadsworth &amp; Medina County, Ohio
        </p>
      </section>
    </>
  )
}
