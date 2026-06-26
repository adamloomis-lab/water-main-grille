// All site content for The Water Main Grille. Single source of truth consumed
// by pages, components, and the SEO/JSON-LD layer.

export const company = {
  name: 'The Water Main Grille',
  shortName: 'Water Main Grille',
  tagline: "Wadsworth's Breakfast & Lunch Spot",
  // One-liner used in hero / meta.
  shortBlurb:
    "A family-run breakfast & lunch spot in the historic south end of Wadsworth, Ohio, homemade food, generous portions, honest prices, and a side of small-town charm.",
  phone: '(330) 331-7757',
  phoneHref: 'tel:+13303317757',
  address: {
    street: '339 Main St',
    city: 'Wadsworth',
    state: 'OH',
    zip: '44281',
  },
  addressOneLine: '339 Main St, Wadsworth, OH 44281',
  geo: { lat: 41.0236, lng: -81.729 },
  mapsDir:
    'https://www.google.com/maps/dir/?api=1&destination=The+Water+Main+Grille+339+Main+St+Wadsworth+OH+44281',
  mapsEmbed:
    'https://www.google.com/maps?q=339+Main+St+Wadsworth+OH+44281&output=embed',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=100057576364123',
  },
  parking:
    "There's plenty of parking on Main Street, Water Street, or in the lot across from the Junk Store.",
} as const

// ---------------------------------------------------------------------------
// Hours, Tue–Sat 6a–2p, closed Sun & Mon. dow matches Date.getDay() (0=Sun).
// ---------------------------------------------------------------------------
export const hours = [
  { day: 'Sunday', short: 'Sun', dow: 0, time: 'Closed' },
  { day: 'Monday', short: 'Mon', dow: 1, time: 'Closed' },
  { day: 'Tuesday', short: 'Tue', dow: 2, time: '6:00 am – 2:00 pm' },
  { day: 'Wednesday', short: 'Wed', dow: 3, time: '6:00 am – 2:00 pm' },
  { day: 'Thursday', short: 'Thu', dow: 4, time: '6:00 am – 2:00 pm' },
  { day: 'Friday', short: 'Fri', dow: 5, time: '6:00 am – 2:00 pm' },
  { day: 'Saturday', short: 'Sat', dow: 6, time: '6:00 am – 2:00 pm' },
]

export const hoursCompact = [
  { day: 'Tue – Sat', time: '6:00 am – 2:00 pm' },
  { day: 'Sun – Mon', time: 'Closed' },
]

// Schema.org openingHoursSpecification
export const openingHours = [
  {
    days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '06:00',
    closes: '14:00',
  },
]

export const featurePillars = [
  {
    title: "We're Local",
    blurb:
      'Proudly family-run, right on Main Street. We know what makes Wadsworth special because we are Wadsworth.',
  },
  {
    title: 'Community Focused',
    blurb:
      'We actively support local schools and events, go Grizzlies, because we care about the people we serve.',
  },
  {
    title: 'Quality You Can Trust',
    blurb:
      "Homemade gravy, hand-cut fries, fresh hash. From our kitchen to your table, we treat every plate like it's for our own family.",
  },
]

// ---------------------------------------------------------------------------
// MENU, transcribed verbatim from the in-house menu. Prices as printed.
// ---------------------------------------------------------------------------
export type MenuItem = { name: string; price?: string; desc?: string }
export type MenuGroup = { title: string; note?: string; items: MenuItem[] }

export const breakfastMenu: MenuGroup[] = [
  {
    title: 'Perfect Matches',
    note: 'Our signature breakfast combos.',
    items: [
      { name: 'The Sunriser', price: '$8', desc: '2 eggs, choice of meat, 1 side & toast.' },
      {
        name: 'Hungry Elijah Bear',
        price: '$9',
        desc: '4 eggs, sausage gravy & biscuit, choice of meat & homefries.',
      },
      {
        name: 'The Gully Buster',
        price: '$8',
        desc: '2 eggs, choice of meat, and either 2 cakes or 2 french toast.',
      },
      {
        name: 'Country Fried Steak',
        price: '$10',
        desc: 'Golden brown all-beef sirloin topped with our homemade sausage gravy. Served with 2 eggs, homefries & toast.',
      },
    ],
  },
  {
    title: 'Cakes & French Toast',
    note: 'Add a topping $2, banana walnut, homemade cinnamon apple, chocolate chips or blueberries.',
    items: [
      { name: '1 Cake or French Toast', price: '$3' },
      { name: '2 Cakes or French Toast', price: '$6' },
      { name: '3 Cakes or French Toast', price: '$8' },
    ],
  },
  {
    title: 'Biscuits & Gravy',
    note: "Yeahh… it's homemade goodness! Sausage or bacon gravy over biscuits, homefries, or toast.",
    items: [
      { name: 'Biscuits & Gravy, Small', price: '$5' },
      { name: 'Biscuits & Gravy, Large', price: '$8' },
      { name: 'Cup of Gravy', price: '$3' },
    ],
  },
  {
    title: 'Build-Your-Own Burrito, Bowl or Omelette',
    note: 'All omelettes & skillets served with toast. Meat: bacon, ham, country sausage, chorizo, corned beef, gyro, chicken, Hungarian smoked sausage, or Philly steak (+$1). Veggies: spinach, tomato, avocado, red onion, mushroom, peppers, jalapeño, salsa. Cheese: American, cheddar, Swiss, pepper jack, provolone, mozzarella, feta, queso.',
    items: [{ name: 'Build-Your-Own', price: '$9', desc: 'Choose 1 meat, 2 veggies & a cheese.' }],
  },
  {
    title: "Slingin' Fresh Hash",
    note: 'Served with 2 eggs & toast.',
    items: [
      {
        name: "Mike's Original Chorizo Hash",
        price: '$10',
        desc: 'Lyonnaise potatoes mixed with chorizo sausage, topped with minced jalapeños, melted cheddar & sour cream.',
      },
      {
        name: 'Corned Beef Hash',
        price: '$10',
        desc: 'Fresh ground corned beef & mixed potatoes with a little crisp.',
      },
      {
        name: 'Hungarian Hash',
        price: '$10',
        desc: 'Smoked Hungarian sausage, onions, peppers, mozzarella & provolone cheese.',
      },
    ],
  },
  {
    title: 'À La Carte',
    note: 'Not a big eater? À la carte it!',
    items: [
      {
        name: 'Bagels',
        price: '$3',
        desc: 'Served with guacamole or cream cheese. Everything seasoning available.',
      },
      { name: 'Grilled Croissant', price: '$3' },
      { name: 'Muffins', price: '$3', desc: 'Blueberry or banana nut.' },
      { name: 'Grilled Pita, English Muffin, or Toast', price: '$2' },
      {
        name: 'Breakfast Sandwich',
        price: '$5',
        desc: 'Grilled English muffin or bagel with 1 egg, American cheese & your choice of meat.',
      },
      { name: 'Fresh Hash', price: '$8', desc: 'Corned beef, chorizo, or Hungarian smoked sausage.' },
      {
        name: 'Breakfast Meats',
        price: '$4',
        desc: 'Hickory smoked bacon, sausage links, smoked ham, or grilled gyro slices.',
      },
      { name: 'Bowl of Grits or Oatmeal', price: '$4', desc: 'Served with brown sugar & raisins.' },
    ],
  },
  {
    title: 'Sides',
    items: [
      { name: 'Homefries', price: '$3' },
      { name: 'Grits', price: '$2' },
      { name: 'Fresh Fruit (seasonal)', price: '$3' },
      { name: 'Sliced Tomato', price: '$2' },
      { name: 'Cottage Cheese', price: '$2' },
      { name: 'Yogurt (vanilla or strawberry)', price: '$2' },
    ],
  },
  {
    title: 'Beverages',
    items: [
      { name: 'Coffee', price: '$2.50' },
      { name: 'Hot Tea', price: '$2.50' },
      { name: 'Hot Chocolate', price: '$2.50' },
      { name: 'Milk', price: '$2 / $3', desc: 'Small / Large.' },
      { name: 'Juice', price: '$2 / $3', desc: 'Orange, apple, cranberry or tomato. Small / Large.' },
      { name: 'Iced Tea', price: '$2.50' },
      { name: 'Soft Drinks', price: '$2.50' },
    ],
  },
  {
    title: 'Kids Meals',
    note: 'Ages 12 & under, $6.',
    items: [
      { name: 'Junior Breakfast', desc: '1 egg, choice of meat, 1 side.' },
      { name: 'Bear Cub', desc: '1 egg, 1 pancake or 1 french toast, choice of meat.' },
      { name: 'American Cheese Omelet', desc: 'Cheese omelet & 1 side.' },
      {
        name: 'Hot Cakes',
        desc: '2 cakes or 2 french toast. Add chocolate chips, cinnamon apples or blueberries $1.',
      },
    ],
  },
]

export const lunchMenu: MenuGroup[] = [
  {
    title: 'Toasted Subs',
    note: 'All $10. Includes choice of pub fries, fresh-cut fries, onion rings, cole slaw or cottage cheese.',
    items: [
      {
        name: 'Southwest Queso Cheese Steak',
        desc: 'Everything tastes better with good queso! Steak or chicken with roasted red peppers & caramelized red onions.',
      },
      {
        name: 'Philly Cheese Steak',
        desc: 'Steak or chicken with a blend of roasted red peppers, grilled onions, mushrooms & Swiss.',
      },
      {
        name: 'Italian Meatball Sub',
        desc: 'Italian-style meatballs with our homemade marinara, smothered in mozzarella & provolone.',
      },
      {
        name: 'The Hot New Yorker',
        desc: 'Grilled fresh-cut Italian bread, pastrami, salami, capicola, a swipe of mayo, spicy brown mustard, lettuce, tomato & Swiss.',
      },
    ],
  },
  {
    title: 'Gyros & Wraps',
    note: 'All $10. Includes choice of pub fries, fresh-cut fries, onion rings, cole slaw or cottage cheese.',
    items: [
      {
        name: 'Jumbo Gyro',
        desc: 'Traditional or chicken, with lettuce, tomato & onion. Made with our homemade tzatziki sauce.',
      },
      {
        name: 'Crispy Chicken, Bacon & Ranch Wrap',
        desc: 'Crispy (or grilled) chicken, romaine, applewood bacon, tomato & ranch dressing.',
      },
      {
        name: 'Turkey Club Wrap',
        desc: 'Smoked turkey, cheddar, applewood bacon, lettuce, tomato & mayo.',
      },
      {
        name: 'Buffalo Chicken Wrap',
        desc: 'Crispy (or grilled) chicken tossed in buffalo with lettuce, tomatoes, cheddar & ranch.',
      },
    ],
  },
  {
    title: 'Salads',
    note: 'All $10. Served with grilled pita bread. Dressings: ranch, Italian, 1000 island, blue cheese or house Greek.',
    items: [
      {
        name: 'Grilled Chicken Cobb',
        desc: 'Fresh tossed greens, grilled chicken, cucumbers, diced tomatoes, crumbled egg, hot bacon, cheddar & diced black olives.',
      },
      {
        name: 'Italian Chef Salad',
        desc: 'Fresh greens, pepperoni, salami, ham, mozzarella, tomatoes, cucumbers & black olives.',
      },
      {
        name: 'Buffalo Chicken Salad',
        desc: 'Crispy chicken tossed in buffalo, crumbled blue cheese, tomatoes & cucumbers on a bed of lettuce.',
      },
      {
        name: 'Pollo Loco Salad',
        desc: 'Grilled chicken, chorizo sausage, salsa, cheddar, avocado, red onion, a dollop of sour cream & tortilla strips.',
      },
    ],
  },
  {
    title: 'Melts',
    note: 'All $10. Includes choice of pub fries, fresh-cut fries, onion rings, cole slaw or cottage cheese.',
    items: [
      {
        name: 'Frisco Melt',
        desc: 'Grilled sourdough, American, shredded lettuce, thin red onion, fresh tomatoes & 1000 island, all on a ½ lb of beef.',
      },
      {
        name: 'B.A. Patty Melt',
        desc: 'Grilled rye, caramelized onions, Swiss & cheddar, a swipe of mayo, piled high on a ½ lb of beef.',
      },
      {
        name: 'Turkey Melt',
        desc: 'Grilled fresh-cut Italian bread, smoked turkey, applewood bacon, American & Swiss, grilled tomato & a swipe of mayo.',
      },
      {
        name: 'Texas Onion Melt',
        desc: 'Grilled Texas toast, American & caramelized onions on a ½ lb of beef.',
      },
      {
        name: '½ lb Jalapeño, Bacon, Cheddar Melt',
        desc: 'Double burger on grilled sourdough with sliced jalapeños, applewood bacon & cheddar.',
      },
    ],
  },
  {
    title: 'Burgers',
    note: 'All $10. Includes choice of pub fries, fresh-cut fries, onion rings, cole slaw or cottage cheese.',
    items: [
      { name: '½ lb Montana Burger', desc: 'BBQ sauce, bacon, onion ring & cheddar.' },
      {
        name: '½ lb Italian Burger',
        desc: 'Two ¼ lb patties topped with salami, Swiss, lettuce, tomato, onion, Italian dressing & mayo.',
      },
      {
        name: '½ lb Brickyard Burger',
        desc: "Two ¼ lb patties with hardwood smoked bacon, Velveeta cheese & an over-easy egg. You're gonna need napkins!",
      },
    ],
  },
  {
    title: 'Kids Menu',
    note: '$5.99.',
    items: [
      { name: 'Cheeseburger with fries' },
      { name: 'Chicken tender basket with fries' },
      { name: 'Chicken quesadilla' },
      { name: 'Mini corn dogs with fries' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Reviews, real Google reviews supplied by the owner. Verbatim quotes & names.
// ---------------------------------------------------------------------------
export const ratingSummary = { value: '4.7', count: 370 }

export const reviews = [
  {
    name: 'Jim Valiante',
    quote: 'Absolutely the best breakfast I ever had! Our waitress was amazing. All you can say is wow!',
  },
  {
    name: 'Cheryl Behrend',
    quote: 'Absolutely the best food with large portions and very reasonably priced!',
  },
  {
    name: 'Sara Patrick',
    quote:
      'Absolutely delicious breakfast spot. Atmosphere is nice, price is right, and staff is friendly and courteous. Highly recommend stopping in!',
  },
  {
    name: 'Josh Barton',
    quote:
      'Water Main Grille is a true hidden treasure, the kind of place locals swear by and visitors wish they had back home.',
  },
  {
    name: 'Terri Brown',
    quote:
      'Best place for breakfast, we love coming here. Food is great, service quick and prices are amazing. Highly recommend.',
  },
  {
    name: 'Brent Steiner',
    quote: 'A unique gem in Wadsworth! Great food, and great people.',
  },
  {
    name: 'Nathaniel Hills',
    quote:
      "I'm a regular at Water Main, both in person as well as to-go. They have kept their prices low (no clue how) and the food is great.",
  },
  {
    name: 'Mike Boudreaux',
    quote: 'The food was awesome and very affordable. The wait staff was great as well.',
  },
  {
    name: 'Jason Carroll',
    quote: 'The food and service here is great! Small place but well worth it. Hands down the best corned beef.',
  },
  {
    name: 'Richard Wilk',
    quote:
      'Favorite breakfast spot in town! Great food with generous portions and excellent service by the wonderful people who work there.',
  },
]

// ---------------------------------------------------------------------------
// History timeline, the Ohio Match Company / Ohio Blue Tip Match, the industry
// that put Wadsworth's south end on the map. Sourced from the Wadsworth Area
// Historical Society and Ohio History Connection.
// ---------------------------------------------------------------------------
export const historyTimeline = [
  {
    year: '1890s',
    title: 'A Spark in the South End',
    body: 'Matchmaking began as a Wadsworth cottage industry, made by hand in homes across town, before the Ohio Match Company organized it into a single south-end works.',
  },
  {
    year: 'By 1900',
    title: 'The Largest in the World',
    body: 'Within a few years the plant sprawled across 18 acres and more than 250,000 square feet, the largest match factory on earth, turning out over 300 million matches a day.',
  },
  {
    year: 'The Blue Tip',
    title: 'Strike Anywhere',
    body: 'Wadsworth’s famous Ohio Blue Tip was born of a new "double-dip" process that let a match strike and light on nearly any surface, the product the town is still known for.',
  },
  {
    year: 'Its Heyday',
    title: '1,100 Strong',
    body: 'At its peak the factory employed roughly 1,100 people, 600 of them women, with whistles marking the day at 6:30, 11:30 and 3:00. The whole south end ran on match time.',
  },
  {
    year: '1987',
    title: 'The Last Whistle',
    body: 'After nearly a century, the match works finally went quiet. But the brick, the smokestacks and the south-end grit never left, and you can still taste that heritage on Main Street.',
  },
]

// ---------------------------------------------------------------------------
// Food photo gallery (owner-supplied). alt text doubles as on-site captions.
// ---------------------------------------------------------------------------
export const gallery = [
  { src: '/images/eggs-benedict-hash.webp', alt: 'Eggs Benedict over crispy hash browns' },
  { src: '/images/french-toast.webp', alt: 'Berry-topped French toast with sausage links' },
  { src: '/images/chicken-waffles.webp', alt: "Chicken & waffles with Mike's Hot Honey" },
  { src: '/images/bbq-chicken-plate.webp', alt: 'BBQ chicken with mac & cheese, slaw and cornbread' },
  { src: '/images/pastrami-reuben.webp', alt: 'Pastrami on rye with hand-cut fries and a pickle' },
  { src: '/images/bbq-burger.webp', alt: 'BBQ burger piled with onion straws and onion rings' },
  { src: '/images/pulled-pork.webp', alt: 'Pulled pork sandwich with onion rings and slaw' },
  { src: '/images/nashville-hot-chicken.webp', alt: 'Nashville hot chicken sandwich with waffle fries' },
  { src: '/images/chicken-salad-ciabatta.webp', alt: 'Chicken salad on toasted ciabatta with fresh fruit' },
  { src: '/images/breakfast-quesadilla.webp', alt: 'Breakfast quesadilla in ranchero sauce' },
  { src: '/images/italian-melt.webp', alt: 'Italian melt with waffle fries' },
  { src: '/images/eggs-benedict-fruit.webp', alt: 'Eggs Benedict with a side of fresh fruit' },
]
