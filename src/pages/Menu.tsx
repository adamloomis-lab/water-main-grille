import { Phone } from 'lucide-react'
import Button from '../components/Button'
import FactoryBackdrop from '../components/FactoryBackdrop'
import { company, breakfastMenu, lunchMenu, type MenuGroup } from '../data/site'

function MenuGroupCard({ group }: { readonly group: MenuGroup }) {
  return (
    <div className="break-inside-avoid rounded-lg border border-line bg-card p-6 md:p-7">
      <h3 className="inline-block rounded bg-brick px-4 py-2 font-display text-[19px] font-semibold uppercase tracking-[0.04em] text-on-brick">
        {group.title}
      </h3>
      {group.note && <p className="mt-3 text-[13px] leading-relaxed text-ink-faint">{group.note}</p>}
      <ul className="mt-4 divide-y divide-line/70">
        {group.items.map((it) => (
          <li key={it.name} className="py-3 first:pt-0">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-display text-[17px] font-medium uppercase tracking-[0.02em] text-ink">
                {it.name}
              </span>
              {it.price && (
                <span className="shrink-0 font-display text-[17px] font-semibold text-brick">{it.price}</span>
              )}
            </div>
            {it.desc && <p className="mt-1 text-body-md text-ink-soft">{it.desc}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Menu() {
  return (
    <>
      {/* ---------- HEADER ---------- */}
      <section className="steel-panel brick-texture relative overflow-hidden">
        <FactoryBackdrop src="/images/history/factory-floor-1.webp" />
        <div className="container-x relative z-10 pt-36 pb-16 text-center">
          <p className="eyebrow text-brick-light">Dine-In · Carry-Out · Curbside</p>
          <h1 className="mt-4 font-display text-display-lg-mobile font-bold text-cream md:text-display-lg">
            The Menu
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-body-lg text-cream-dim">
            Homemade breakfast served all day, and a lunch lineup where almost everything is just $10.
            Call <a href={company.phoneHref} className="text-brick-light hover:underline">{company.phone}</a>{' '}
            for carry-out or curbside pickup.
          </p>
        </div>
      </section>

      {/* ---------- BREAKFAST ---------- */}
      <section className="bg-paper py-20 md:py-24">
        <div className="container-x">
          <div className="mb-12 text-center">
            <h2 className="font-display text-headline-lg text-ink md:text-[40px]">Breakfast</h2>
            <p className="mt-2 text-label-lg uppercase tracking-[0.2em] text-brick">Served All Day</p>
            <span className="brick-rule mx-auto mt-5 block w-[72px]" />
          </div>
          <div className="reveal-group columns-1 gap-7 md:columns-2 [&>*]:mb-7">
            {breakfastMenu.map((g) => (
              <MenuGroupCard key={g.title} group={g} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LUNCH ---------- */}
      <section className="bg-paper-2 py-20 md:py-24">
        <div className="container-x">
          <div className="mb-12 text-center">
            <h2 className="font-display text-headline-lg text-ink md:text-[40px]">Lunch</h2>
            <p className="mt-2 text-label-lg uppercase tracking-[0.2em] text-brick">11am – 2pm</p>
            <span className="brick-rule mx-auto mt-5 block w-[72px]" />
            <p className="mx-auto mt-5 max-w-xl text-body-md text-ink-soft">
              Subs, wraps, salads, melts &amp; burgers, all $10, with your choice of pub fries, fresh-cut
              fries, onion rings, cole slaw or cottage cheese.
            </p>
          </div>
          <div className="reveal-group columns-1 gap-7 md:columns-2 [&>*]:mb-7">
            {lunchMenu.map((g) => (
              <MenuGroupCard key={g.title} group={g} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="bg-brick">
        <div className="container-x flex flex-col items-center justify-between gap-6 py-12 text-center md:flex-row md:text-left">
          <div>
            <h2 className="font-display text-headline-md text-on-brick">Ready when you are.</h2>
            <p className="mt-2 text-body-md text-on-brick/85">
              Call ahead and we&rsquo;ll have your order hot and waiting. Prices subject to change.
            </p>
          </div>
          <Button href={company.phoneHref} variant="cream">
            <Phone size={18} /> {company.phone}
          </Button>
        </div>
      </section>
    </>
  )
}
