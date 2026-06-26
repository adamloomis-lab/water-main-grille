import { Flame, ArrowRight } from 'lucide-react'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import FactoryBackdrop from '../components/FactoryBackdrop'
import { historyTimeline, company } from '../data/site'

const works = [
  {
    src: '/images/history/factory-aerial.webp',
    alt: 'Period illustration of the sprawling Ohio Match Company works in Wadsworth, Ohio',
    cap: 'The Ohio Match Company complex, Wadsworth, Ohio.',
  },
  {
    src: '/images/history/factory-floor-1.webp',
    alt: 'Workers’ machinery lining the Ohio Match Company factory floor',
    cap: 'Inside the match works, line-shaft machinery as far as the eye could see.',
  },
  {
    src: '/images/history/factory-floor-2.webp',
    alt: 'Belt-driven machines running down the Ohio Match Company shop floor',
    cap: 'Hundreds of millions of matches a day came off floors like this one.',
  },
]

export default function History() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="steel-panel brick-texture relative overflow-hidden">
        <FactoryBackdrop src="/images/history/factory-aerial.webp" />
        <div className="container-x relative z-10 pt-36 pb-20 text-center">
          <p className="eyebrow rise rise-1 text-brick-light">The South End of Wadsworth, Ohio</p>
          <h1 className="rise rise-2 mx-auto mt-5 max-w-4xl font-display text-display-lg-mobile font-bold leading-[0.98] text-cream md:text-display-xl">
            Built where the
            <span className="block text-brick-light">matches were made.</span>
          </h1>
          <p className="rise rise-3 mx-auto mt-6 max-w-2xl text-body-lg text-cream-dim">
            We don&rsquo;t just cook in the old part of town, we&rsquo;re part of its story. This corner of
            Main Street grew up around the Ohio Match Company and the famous Ohio Blue Tip, the industry
            that put Wadsworth on the map.
          </p>
        </div>
      </section>

      {/* ---------- INTRO ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div className="reveal">
            <p className="eyebrow">Why a Grille Cares About Matches</p>
            <h2 className="mt-4 font-display text-headline-lg text-ink md:text-[40px]">
              The heritage behind the griddle.
            </h2>
            <span className="brick-rule mt-5 block w-[72px]" />
            <p className="mt-6 text-body-lg text-ink-soft">
              For nearly a century, the south end of Wadsworth ran on match time. Whistles set the rhythm of
              the day, brick smokestacks marked the skyline, and a workforce of more than a thousand turned
              out hundreds of millions of matches a day, including the legendary &ldquo;strike-anywhere&rdquo;
              Ohio Blue Tip.
            </p>
            <p className="mt-4 text-body-lg text-ink-soft">
              That same grit is on our sign. The smokestacks in our logo, the brick at your back, the 6 a.m.
              open that echoes the old factory whistle, it&rsquo;s all a tip of the cap to the neighborhood
              that built this town. We just trade matchsticks for hash browns.
            </p>
          </div>
          <div className="reveal overflow-hidden rounded-lg border border-line bg-card">
            <img
              src="/images/history/factory-railcars.webp"
              alt="The Ohio Match Company plant in Wadsworth with rail cars at the loading dock"
              loading="lazy"
              className="w-full"
            />
            <p className="px-5 py-3 text-[12px] uppercase tracking-[0.12em] text-ink-faint">
              The Ohio Match Company plant in Wadsworth, rail cars at the dock.
              <span className="block normal-case tracking-normal opacity-70">Historical photo, Ohio Match Company</span>
            </p>
          </div>
        </div>
      </section>

      {/* ---------- TIMELINE ---------- */}
      <section className="steel-panel brick-texture py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            eyebrow="From Cottage Trade to World's Largest"
            title="The Blue Tip timeline"
          />
          <ol className="reveal-group mx-auto mt-16 max-w-3xl">
            {historyTimeline.map((t, i) => (
              <li key={t.year} className="relative flex gap-6 pb-12 last:pb-0 md:gap-8">
                {/* rail + node */}
                <div className="relative flex w-16 shrink-0 flex-col items-center md:w-20">
                  <span className="z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-brick bg-steel text-brick-light">
                    <Flame size={18} />
                  </span>
                  {i < historyTimeline.length - 1 && (
                    <span className="absolute top-12 bottom-0 w-px bg-line-dark" aria-hidden="true" />
                  )}
                </div>
                <div className="pb-2">
                  <span className="font-display text-[15px] font-semibold uppercase tracking-[0.18em] text-bluetip-light">
                    {t.year}
                  </span>
                  <h3 className="mt-1 font-display text-headline-sm text-cream">{t.title}</h3>
                  <p className="mt-2 text-body-md text-cream-dim">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- INSIDE THE WORKS (archival photos) ---------- */}
      <section className="bg-paper-2 py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="The Ohio Match Company"
            title="Inside the works"
            intro="A look at the plant that crowned Wadsworth the match capital of the world."
          />
          <div className="reveal-group mt-14 grid gap-6 md:grid-cols-3">
            {works.map((w) => (
              <figure key={w.src} className="overflow-hidden rounded-lg border border-line bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={w.src} alt={w.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <figcaption className="px-5 py-4 text-[13px] text-ink-soft">
                  {w.cap}
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.12em] text-ink-faint">
                    Historical photo, Ohio Match Company
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LEGACY TODAY ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal overflow-hidden rounded-lg border border-line bg-card">
            <img
              src="/images/history/worlds-largest-match.webp"
              alt="Volunteers raising the World's Largest Match landmark in downtown Wadsworth, Ohio"
              loading="lazy"
              className="w-full"
            />
            <p className="px-5 py-3 text-[12px] uppercase tracking-[0.12em] text-ink-faint">
              Wadsworth still honors its Blue Tip legacy, including the &ldquo;World&rsquo;s Largest
              Match&rdquo; raised downtown.
              <span className="block normal-case tracking-normal opacity-70">Public domain · via Wikimedia Commons</span>
            </p>
          </div>
          <div className="reveal">
            <p className="eyebrow">The Legacy Lives On</p>
            <h2 className="mt-4 font-display text-headline-lg text-ink md:text-[40px]">
              Still striking, after all these years.
            </h2>
            <span className="brick-rule mt-5 block w-[72px]" />
            <p className="mt-6 text-body-lg text-ink-soft">
              The last factory whistle blew in 1987, but the south end never lost its spark. Today the brick
              buildings house new neighbors, like us, and the town still proudly claims the Blue Tip as its
              own.
            </p>
            <p className="mt-4 text-body-lg text-ink-soft">
              Come pull up a chair on Main Street. Have a plate of fresh hash where the matches were made,
              and you&rsquo;ll taste a little of that history in every bite.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/menu">
                See the Menu <ArrowRight size={16} />
              </Button>
              <Button href="/contact" variant="outline">
                Visit Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-brick">
        <div className="container-x flex flex-col items-center justify-between gap-6 py-14 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-headline-md text-on-brick">Taste the south-end story.</h2>
            <p className="mt-2 max-w-xl text-body-md text-on-brick/85">
              Open Tuesday through Saturday, 6 a.m. to 2 p.m., right on Main Street at {company.address.street}.
            </p>
          </div>
          <Button href="/menu" variant="cream">
            Explore the Menu
          </Button>
        </div>
      </section>
    </>
  )
}
