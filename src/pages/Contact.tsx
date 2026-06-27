import { useState, useRef } from 'react'
import type { FormEvent } from 'react'
import { MapPin, Phone, Clock, Facebook, Check, Car, ChevronDown } from 'lucide-react'
import { company } from '../data/site'
import { faqs } from '../lib/seo'
import HoursList from '../components/HoursList'
import FactoryBackdrop from '../components/FactoryBackdrop'

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(false)
  const [firstName, setFirstName] = useState('')
  const formCardRef = useRef<HTMLDivElement>(null)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(false)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form) as never) as Record<string, string>
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'contact', ...data }),
      })
      if (!res.ok) throw new Error()
      setFirstName((data.name || '').trim().split(/\s+/)[0] || '')
      setSent(true)
      form.reset()
      // Bring the confirmation into view so it's seen in place, not below the fold.
      requestAnimationFrame(() =>
        formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      )
    } catch {
      setError(true)
    }
  }

  const field =
    'w-full rounded border border-line bg-card px-4 py-3.5 text-body-md text-ink placeholder:text-ink-faint focus:border-brick focus-visible:outline-none focus:ring-1 focus:ring-brick/40'

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
                <div className="mt-8 flex flex-col items-center gap-4 rounded-lg border border-brick/40 bg-brick/5 px-6 py-12 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brick text-on-brick">
                    <Check size={28} />
                  </span>
                  <p className="font-display text-headline-md text-ink">
                    Thank you{firstName ? `, ${firstName}` : ''}!
                  </p>
                  <p className="text-body-md text-ink-soft">
                    {firstName ? `${firstName}, your` : 'Your'} request is on its way to The Water Main
                    Grille. We&rsquo;ll get back to you as soon as we can. For a faster reply, give us a
                    call at {company.phone}.
                  </p>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={onSubmit}
                  className="mt-7 space-y-4"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="sr-only">Name</label>
                      <input id="contact-name" className={field} type="text" name="name" placeholder="Name" required />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="sr-only">Phone</label>
                      <input id="contact-phone" className={field} type="tel" name="phone" placeholder="Phone" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">Email</label>
                    <input id="contact-email" className={field} type="email" name="email" placeholder="Email" required />
                  </div>
                  <div className="relative">
                    <label htmlFor="contact-subject" className="sr-only">Subject</label>
                    <select
                      id="contact-subject"
                      name="subject"
                      defaultValue=""
                      required
                      className={`${field} appearance-none pr-11`}
                    >
                      <option value="" disabled>
                        What can we help with?
                      </option>
                      <option>General Question</option>
                      <option>Catering</option>
                      <option>Private Event</option>
                      <option>Careers / Employment</option>
                      <option>Feedback</option>
                    </select>
                    <ChevronDown
                      size={18}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea
                      id="contact-message"
                      className={field}
                      name="message"
                      rows={5}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-body-md text-error">
                      Oops, there was an error sending your message. Please try again later, or call{' '}
                      {company.phone}.
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full rounded bg-brick px-8 py-4 font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-on-brick transition-colors hover:bg-brick-dark"
                  >
                    Send Message
                  </button>
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
