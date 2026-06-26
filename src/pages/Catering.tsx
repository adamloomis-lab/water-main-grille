import { Phone, Heart, Briefcase, PartyPopper, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import FactoryBackdrop from '../components/FactoryBackdrop'
import { company, featurePillars } from '../data/site'

const services = [
  {
    icon: Heart,
    title: 'Weddings',
    blurb: "Tie the knot with food that's as unforgettable as your vows. We'll make your big day deliciously special.",
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    blurb: "Boost office morale with a meal that's better than any meeting agenda. Fresh, fast and crowd-pleasing.",
  },
  {
    icon: PartyPopper,
    title: 'Private Parties',
    blurb: "Turn your celebration up a notch with food that's bound to be the life of the party.",
  },
]

export default function Catering() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="steel-panel brick-texture relative flex min-h-[58vh] items-center overflow-hidden">
        <FactoryBackdrop src="/images/history/factory-railcars.webp" />
        <div className="container-x relative z-10 pt-28 text-center">
          <p className="eyebrow rise rise-1 text-brick-light">Catering by The Water Main Grille</p>
          <h1 className="rise rise-2 mx-auto mt-5 max-w-3xl font-display text-display-lg-mobile font-bold text-cream md:text-display-lg">
            Let us cater your next event.
          </h1>
          <p className="rise rise-3 mx-auto mt-6 max-w-2xl text-body-lg text-cream/85">
            We bring the same homemade quality and local love to your table. Whether it&rsquo;s a family
            gathering, corporate event or school function, we&rsquo;ve got you covered, fresh, flavorful
            and tailored to your needs.
          </p>
          <div className="rise rise-4 mt-9 flex justify-center">
            <Button href={company.phoneHref} variant="cream">
              <Phone size={18} /> Call to Book
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- SERVICES ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="What We Cater" title="From here to your event" />
          <div className="reveal-group mt-14 grid gap-7 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title} className="rounded-lg border border-line bg-card p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brick/12 text-brick">
                  <s.icon size={22} />
                </span>
                <h3 className="mt-5 font-display text-headline-sm text-ink">{s.title}</h3>
                <p className="mt-2.5 text-body-md text-ink-soft">{s.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY US (dark) ---------- */}
      <section className="steel-panel brick-texture py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            eyebrow="Why The Water Main Grille"
            title="The perfect catering partner"
          />
          <div className="reveal-group mt-14 grid gap-7 md:grid-cols-3">
            {featurePillars.map((p) => (
              <div key={p.title} className="rounded-lg border border-line-dark bg-steel-2/70 p-8">
                <h3 className="font-display text-headline-sm text-cream">{p.title}</h3>
                <p className="mt-2.5 text-body-md text-cream-dim">{p.blurb}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-xl text-center text-body-lg text-cream-dim">
            From our kitchen to your event, we treat every meal like it&rsquo;s for our own family.
          </p>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-brick">
        <div className="container-x flex flex-col items-center justify-between gap-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-headline-md text-on-brick">Book your event today.</h2>
            <p className="mt-2 max-w-xl text-body-md text-on-brick/85">
              Give us a call to talk menus, headcount and timing, we&rsquo;ll handle the rest.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={company.phoneHref} variant="cream">
              <Phone size={18} /> {company.phone}
            </Button>
            <Button href="/contact" variant="ghost">
              Contact Us <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
