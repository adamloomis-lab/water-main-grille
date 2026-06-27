import { Phone, Clock, ArrowRight, Star, Flame, MapPin, Users, ChefHat, Newspaper } from 'lucide-react'
import Button from '../components/Button'
import Logo from '../components/Logo'
import SectionHeading from '../components/SectionHeading'
import MatchDivider from '../components/MatchDivider'
import { company, featurePillars, reviews, ratingSummary, gallery, historyTimeline } from '../data/site'

// Icons paired to featurePillars (We're Local / Community Focused / Quality).
const pillarIcons = [MapPin, Users, ChefHat]

const signatures = [
  {
    name: '½ lb Montana Burger',
    desc: 'A half pound of beef with BBQ sauce, bacon, an onion ring and cheddar. Comes with hand-cut fries, onion rings or slaw.',
    img: '/images/bbq-burger.webp',
  },
  {
    name: 'Cakes & French Toast',
    desc: 'Fluffy cakes or thick-cut french toast. Add banana walnut, homemade cinnamon apple, chocolate chips or blueberries.',
    img: '/images/french-toast.webp',
  },
  {
    name: 'Toasted Subs & Melts',
    desc: 'Philly cheese steaks, the Hot New Yorker, patty melts and more. Almost everything on the lunch board is just $10 with a side.',
    img: '/images/italian-melt.webp',
  },
]

export default function Home() {
  return (
    <>
      {/* ---------- HERO ---------- */}
      <section id="hero" className="relative flex min-h-[92vh] items-center overflow-hidden">
        <img
          src="/images/storefront-wide.webp"
          alt="The brick storefront of The Water Main Grille on Main Street in Wadsworth, Ohio"
          fetchPriority="high"
          className="kenburns absolute inset-0 h-full w-full object-cover"
        />
        <div className="smoke-overlay absolute inset-0" />
        <div className="container-x relative z-10 pt-28 pb-16">
          <div className="max-w-2xl">
            <p className="eyebrow rise rise-1 text-brick-light">Wadsworth, Ohio · Est. on Main Street</p>
            <h1 className="rise rise-2 mt-5 font-display text-display-lg-mobile font-bold leading-[0.98] text-cream md:text-display-xl">
              Breakfast &amp; lunch,
              <span className="block text-brick-light">forged on Main Street.</span>
            </h1>
            <p className="rise rise-3 mt-6 max-w-xl text-body-lg text-cream/85">{company.shortBlurb}</p>
            <div className="rise rise-4 mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href="/menu">See the Menu</Button>
              <Button href={company.phoneHref} variant="ghost">
                <Phone size={16} /> Call for Carry-Out
              </Button>
            </div>
            <div className="rise rise-5 mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-label-lg uppercase tracking-[0.16em] text-cream/75">
              <span className="inline-flex items-center gap-2">
                <Clock size={15} className="text-brick-light" /> Tue-Sat · 6am-2pm
              </span>
              <span className="inline-flex items-center gap-2">
                <Star size={15} className="fill-brick-light text-brick-light" /> {ratingSummary.value}★ ·{' '}
                {ratingSummary.count}+ reviews
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-brick-light" /> 339 Main St
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- MISSION ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="reveal">
              <p className="eyebrow">The Breakfast &amp; Lunch Mission</p>
              <h2 className="mt-4 max-w-xl font-display text-headline-lg text-ink md:text-[44px]">
                Crafting flavor in the old part of town.
              </h2>
              <span className="brick-rule mt-5 block w-[72px]" />
              <p className="mt-6 max-w-xl text-body-lg text-ink-soft">
                Start your day the right way. Located right on Main Street in Wadsworth&rsquo;s historic
                south end, we serve up your favorites with a side of small-town charm, homemade gravy,
                hand-cut fries, fresh-ground hash, and portions that mean it.
              </p>
              <p className="mt-4 max-w-xl text-body-lg text-ink-soft">
                Whether you&rsquo;re grabbing a quick bite or settling in with friends, we&rsquo;ve got you
                covered. {company.parking}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/menu">
                  Browse the Menu <ArrowRight size={16} />
                </Button>
                <Button href="/history" variant="outline">
                  Our Blue Tip Story
                </Button>
              </div>
            </div>

            {/* Framed photo with an offset brick frame for a custom, gallery feel */}
            <div className="reveal relative mx-auto w-full max-w-md lg:mr-0">
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-lg border-2 border-brick/45 sm:block"
              />
              <img
                src="/images/chicken-waffles.webp"
                alt="Chicken and waffles with Mike's Hot Honey on the table at The Water Main Grille"
                loading="lazy"
                className="relative aspect-[4/5] w-full rounded-lg object-cover shadow-[0_30px_60px_-30px_rgba(0,0,0,0.75)]"
              />
              <span className="absolute bottom-3 left-3 right-3 rounded bg-steel/85 px-4 py-2 text-center font-display text-[12px] uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
                Made fresh on Main Street
              </span>
            </div>
          </div>

          {/* Values — clean icon row instead of stacked boxes */}
          <div className="reveal-group mt-20 grid gap-x-10 gap-y-12 border-t border-line pt-14 sm:grid-cols-3">
            {featurePillars.map((p, i) => {
              const Icon = pillarIcons[i]
              return (
                <div key={p.title}>
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brick/12 text-brick">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-headline-sm text-ink">{p.title}</h3>
                  <p className="mt-2 text-body-md text-ink-soft">{p.blurb}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <MatchDivider bg="bg-paper" />

      {/* ---------- SIGNATURE DISHES ---------- */}
      <section className="bg-paper-2 py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Off the Griddle"
            title="A few of the regulars' favorites"
            intro="Homemade breakfast served all day, and a lunch lineup where almost everything is just $10."
          />
          <div className="reveal-group mt-14 grid gap-7 md:grid-cols-3">
            {signatures.map((s) => (
              <article
                key={s.name}
                className="group overflow-hidden rounded-lg border border-line bg-card shadow-[0_18px_45px_-30px_rgba(34,27,21,0.55)]"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-headline-sm text-ink">{s.name}</h3>
                  <p className="mt-2 text-body-md text-ink-soft">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/menu">See the Full Menu</Button>
          </div>
        </div>
      </section>

      <MatchDivider bg="bg-paper-2" />

      {/* ---------- HERITAGE TEASER (dark steel) ---------- */}
      <section className="steel-panel brick-texture relative overflow-hidden py-24 md:py-28">
        <img
          src="/images/history/factory-floor-1.webp"
          alt=""
          aria-hidden="true"
          className="parallax pointer-events-none absolute inset-x-0 top-0 h-[120%] w-full object-cover opacity-[0.10] mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-steel/40 via-transparent to-steel/70" />
        <div className="container-x relative z-10">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="reveal">
              <p className="eyebrow text-brick-light">Wadsworth&rsquo;s Industrial Heartbeat</p>
              <h2 className="mt-4 font-display text-headline-lg text-cream md:text-[44px]">
                Built on the south end&rsquo;s grit.
              </h2>
              <span className="brick-rule mt-5 block w-[72px]" />
              <p className="mt-6 max-w-xl text-body-lg text-cream-dim">
                Our corner of Main Street sits in the shadow of the old Ohio Match Company, once the
                largest match factory on earth, and the home of the famous Ohio Blue Tip that put
                Wadsworth on the map. The brick, the smokestacks and the south-end work ethic are baked
                into everything we cook.
              </p>
              <div className="mt-8">
                <Button href="/history" variant="ghost">
                  <Flame size={16} className="text-brick-light" /> Read the Blue Tip Story
                </Button>
              </div>
            </div>

            {/* Even vertical timeline (rail + dots); year sits above each title so
                the differing label widths never knock the text out of alignment. */}
            <ol className="reveal-group rounded-lg border border-line-dark bg-steel-2/60 p-8 md:p-10">
              {historyTimeline.slice(0, 3).map((t, i, arr) => (
                <li key={t.year} className="relative flex gap-5 pb-8 last:pb-0">
                  <div className="relative flex w-4 shrink-0 justify-center">
                    <span className="z-10 mt-1.5 h-4 w-4 rounded-full border-2 border-brick bg-steel" />
                    {i < arr.length - 1 && (
                      <span
                        className="absolute top-1.5 bottom-0 left-1/2 w-px -translate-x-1/2 bg-line-dark"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <div className="-mt-0.5">
                    <span className="font-display text-[13px] font-semibold uppercase tracking-[0.18em] text-brick-light">
                      {t.year}
                    </span>
                    <h3 className="mt-1 font-display text-headline-sm text-cream">{t.title}</h3>
                    <p className="mt-1.5 text-body-md text-cream-dim">{t.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- GALLERY STRIP ---------- */}
      <section className="bg-paper py-24 md:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Straight From the Kitchen"
            title="Plates worth the drive"
            intro="Generous portions, honest prices, and the kind of food locals swear by."
          />
        </div>
        <div className="mt-12 grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.slice(0, 8).map((g) => (
            <div key={g.src} className="group relative aspect-square overflow-hidden rounded">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </section>

      <MatchDivider bg="bg-paper" />

      {/* ---------- REVIEWS ---------- */}
      <section className="bg-paper-2 py-24 md:py-28">
        <div className="container-x">
          {/* As Featured In, Akron Beacon Journal */}
          <div className="reveal mx-auto mb-16 max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-brick-light">
              <Newspaper size={15} /> As Featured In
            </p>
            <p className="mt-4 font-display text-headline-md text-ink">Akron Beacon Journal</p>
            <p className="mt-3 text-body-lg italic text-ink-soft">
              &ldquo;The Water Main Grille is a friendly diner in Wadsworth.&rdquo;
            </p>
            <p className="mt-2 text-[12px] uppercase tracking-[0.16em] text-ink-faint">May 7, 2025</p>
            <a
              href="https://www.beaconjournal.com/story/entertainment/dining/2025/05/07/the-water-main-grille-is-a-friendly-diner-in-wadsworth/83461076007/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-brick-light transition-colors hover:text-brick"
            >
              Read the article <ArrowRight size={14} />
            </a>
          </div>

          <div className="brick-rule mx-auto mb-14 block w-[72px]" />

          <SectionHeading
            eyebrow={`${ratingSummary.value}★ · ${ratingSummary.count}+ Google Reviews`}
            title="Wadsworth keeps coming back"
          />
          <div className="reveal-group mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((r) => (
              <figure key={r.name} className="rounded-lg border border-line bg-card p-7">
                <div className="flex gap-0.5 text-brick">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-brick text-brick" />
                  ))}
                </div>
                <blockquote className="mt-4 text-body-md text-ink-soft">&ldquo;{r.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 font-display text-sm uppercase tracking-[0.14em] text-brick-light">
                  {r.name}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href={company.social.facebook} variant="outline" external>
              See More on Facebook
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- CTA BAND ---------- */}
      <section className="bg-brick">
        <div className="container-x flex flex-col items-center justify-between gap-8 py-14 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-6">
            <Logo onDark className="hidden h-20 shrink-0 sm:block" />
            <div>
              <h2 className="font-display text-headline-md text-on-brick">Hungry for the heritage?</h2>
              <p className="mt-2 max-w-xl text-body-md text-on-brick/85">
                Skip the wait, call ahead for carry-out or curbside, and we&rsquo;ll have it ready when you are.
              </p>
            </div>
          </div>
          <a
            href={company.phoneHref}
            className="inline-flex shrink-0 items-center gap-2.5 rounded bg-cream px-8 py-4 font-body text-[14px] font-semibold uppercase tracking-[0.14em] text-steel transition-colors hover:bg-cream-dim"
          >
            <Phone size={18} /> {company.phone}
          </a>
        </div>
      </section>
    </>
  )
}
