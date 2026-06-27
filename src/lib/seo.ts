import {
  company,
  openingHours,
  reviews,
  ratingSummary,
  breakfastMenu,
  lunchMenu,
  type MenuGroup,
} from '../data/site'

// Production target domain. Canonicals, sitemap, OG and schema all point here so
// SEO value lands on the live host the moment DNS flips from the old Duda site.
export const SITE_URL = 'https://www.watermainwadsworth.com'

const OG_IMAGE = '/images/storefront-wide.webp'

export const abs = (path: string) => `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

// Netlify serves pages with a trailing slash; keep canonical/sitemap URLs aligned.
export const pageUrl = (path: string) =>
  abs(path === '/' ? '/' : path.endsWith('/') ? path : `${path}/`)

function openingHoursSpec() {
  return openingHours.map((o) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: o.days,
    opens: o.opens,
    closes: o.closes,
  }))
}

function aggregateRating() {
  return {
    '@type': 'AggregateRating',
    ratingValue: ratingSummary.value,
    reviewCount: String(ratingSummary.count),
    bestRating: '5',
    worstRating: '1',
  }
}

function reviewNodes() {
  return reviews.map((r) => ({
    '@type': 'Review',
    reviewBody: r.quote,
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
  }))
}

export function restaurantSchema() {
  const a = company.address
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#restaurant`,
    name: company.name,
    url: SITE_URL,
    image: abs(OG_IMAGE),
    logo: abs('/images/logo-dark.webp'),
    telephone: company.phone,
    priceRange: '$',
    servesCuisine: ['Breakfast', 'Brunch', 'American', 'Lunch'],
    description: company.shortBlurb,
    slogan: company.tagline,
    hasMenu: pageUrl('/menu'),
    acceptsReservations: 'False',
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    areaServed: [
      { '@type': 'City', name: 'Wadsworth, OH' },
      { '@type': 'AdministrativeArea', name: 'Medina County, OH' },
    ],
    openingHoursSpecification: openingHoursSpec(),
    aggregateRating: aggregateRating(),
    review: reviewNodes(),
    sameAs: [company.social.facebook],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    publisher: { '@id': `${SITE_URL}/#restaurant` },
  }
}

// Extract a numeric price (first number) for schema Offers; undefined if none.
function parsePrice(price?: string): string | undefined {
  if (!price) return undefined
  const m = price.match(/(\d+(?:\.\d+)?)/)
  return m ? m[1] : undefined
}

function menuSectionSchema(group: MenuGroup) {
  return {
    '@type': 'MenuSection',
    name: group.title,
    ...(group.note ? { description: group.note } : {}),
    hasMenuItem: group.items.map((it) => {
      const price = parsePrice(it.price)
      return {
        '@type': 'MenuItem',
        name: it.name,
        ...(it.desc ? { description: it.desc } : {}),
        ...(price ? { offers: { '@type': 'Offer', price, priceCurrency: 'USD' } } : {}),
      }
    }),
  }
}

export function menuSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_URL}/menu/#menu`,
    name: 'The Water Main Grille Menu',
    url: pageUrl('/menu'),
    inLanguage: 'en-US',
    provider: { '@id': `${SITE_URL}/#restaurant` },
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Breakfast, Served All Day',
        hasMenuSection: breakfastMenu.map(menuSectionSchema),
      },
      {
        '@type': 'MenuSection',
        name: 'Lunch, 11am to 2pm',
        hasMenuSection: lunchMenu.map(menuSectionSchema),
      },
    ],
  }
}

const FAQS = [
  {
    q: 'What are The Water Main Grille’s hours?',
    a: 'We’re open Tuesday through Saturday, 6:00 am to 2:00 pm, and closed Sunday and Monday. Breakfast is served all day; lunch runs 11am-2pm.',
  },
  {
    q: 'Where is The Water Main Grille located?',
    a: 'We’re right on Main Street at 339 Main St, Wadsworth, OH 44281, in the historic south end of town. There’s plenty of parking on Main Street, Water Street, or in the lot across from the Junk Store.',
  },
  {
    q: 'Do you offer carry-out or curbside pickup?',
    a: 'Yes, call us at (330) 331-7757 for carry-out or curbside pickup and we’ll have your order ready when you are.',
  },
  {
    q: 'Do you cater events?',
    a: 'We do. From weddings and corporate events to private parties and school functions, we bring the same homemade quality to your event. Call (330) 331-7757 to book.',
  },
]

function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: pageUrl(it.path),
    })),
  }
}

export const faqs = FAQS

export type PageMeta = {
  title: string
  description: string
  canonical: string
  ogImage: string
  jsonLd: object[]
}

export function getPageMeta(rawPath: string): PageMeta {
  const path = rawPath !== '/' ? rawPath.replace(/\/$/, '') : '/'
  const ogImage = abs(OG_IMAGE)

  switch (path) {
    case '/':
      return {
        title: "The Water Main Grille | Wadsworth's Breakfast & Lunch Spot",
        description: `${company.shortBlurb} Open Tue-Sat 6am-2pm. Call ${company.phone}.`,
        canonical: pageUrl('/'),
        ogImage,
        jsonLd: [restaurantSchema(), websiteSchema(), faqSchema()],
      }
    case '/menu':
      return {
        title: 'Menu | The Water Main Grille, Breakfast & Lunch in Wadsworth, OH',
        description:
          'Homemade breakfast served all day, "Perfect Matches" combos, fresh hash, cakes & french toast, plus lunch subs, melts, burgers, gyros & salads. Most lunch plates just $10.',
        canonical: pageUrl('/menu'),
        ogImage: abs('/images/bbq-burger.webp'),
        jsonLd: [
          restaurantSchema(),
          menuSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Menu', path: '/menu' },
          ]),
        ],
      }
    case '/catering':
      return {
        title: 'Catering | The Water Main Grille, Wadsworth, OH',
        description:
          'Let us cater your next event. Weddings, corporate events, private parties and school functions, fresh, homemade and tailored to you. Call (330) 331-7757 to book.',
        canonical: pageUrl('/catering'),
        ogImage: abs('/images/bbq-chicken-plate.webp'),
        jsonLd: [
          restaurantSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Event Catering',
            provider: { '@id': `${SITE_URL}/#restaurant` },
            areaServed: { '@type': 'AdministrativeArea', name: 'Medina County, OH' },
            url: pageUrl('/catering'),
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Catering', path: '/catering' },
          ]),
        ],
      }
    case '/history':
      return {
        title: 'Our Story | Blue Tip Heritage in Wadsworth’s South End',
        description:
          'The Water Main Grille sits in the historic south end of Wadsworth, home of the Ohio Match Company and the famous Ohio Blue Tip, once the largest match factory in the world. The heritage behind the grill.',
        canonical: pageUrl('/history'),
        ogImage,
        jsonLd: [
          restaurantSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            url: pageUrl('/history'),
            about: { '@id': `${SITE_URL}/#restaurant` },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Our Story', path: '/history' },
          ]),
        ],
      }
    case '/careers':
      return {
        title: 'Careers | Now Hiring at The Water Main Grille, Wadsworth OH',
        description:
          'Join the crew at The Water Main Grille. We’re hiring friendly, hard-working people for our Wadsworth breakfast & lunch spot. Daytime hours, family atmosphere. Apply online.',
        canonical: pageUrl('/careers'),
        ogImage,
        jsonLd: [
          restaurantSchema(),
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Careers', path: '/careers' },
          ]),
        ],
      }
    case '/contact':
      return {
        title: 'Contact & Hours | The Water Main Grille, Wadsworth OH',
        description: `Visit The Water Main Grille at ${company.addressOneLine}. Hours, directions, parking, carry-out and contact details. Call ${company.phone}.`,
        canonical: pageUrl('/contact'),
        ogImage: abs('/images/storefront.webp'),
        jsonLd: [
          restaurantSchema(),
          faqSchema(),
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            url: pageUrl('/contact'),
            about: { '@id': `${SITE_URL}/#restaurant` },
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Contact', path: '/contact' },
          ]),
        ],
      }
    case '/privacy':
      return {
        title: 'Privacy Policy | The Water Main Grille',
        description:
          'How The Water Main Grille collects, uses, and protects information submitted through this website.',
        canonical: pageUrl('/privacy'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }])],
      }
    case '/terms':
      return {
        title: 'Terms of Service | The Water Main Grille',
        description: 'The terms that govern your use of The Water Main Grille website.',
        canonical: pageUrl('/terms'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }])],
      }
    case '/accessibility':
      return {
        title: 'Accessibility Statement | The Water Main Grille',
        description:
          'Our commitment to making The Water Main Grille website accessible to everyone, and how to reach us about accessibility.',
        canonical: pageUrl('/accessibility'),
        ogImage,
        jsonLd: [breadcrumb([{ name: 'Home', path: '/' }, { name: 'Accessibility', path: '/accessibility' }])],
      }
    default:
      return {
        title: 'Page Not Found | The Water Main Grille',
        description:
          "Sorry, we couldn't find that page. The Water Main Grille is Wadsworth's family-run breakfast & lunch spot on Main Street.",
        canonical: pageUrl(path),
        ogImage,
        jsonLd: [restaurantSchema()],
      }
  }
}

export const ALL_ROUTES: string[] = [
  '/',
  '/menu',
  '/catering',
  '/history',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
  '/accessibility',
]
