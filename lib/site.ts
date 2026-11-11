export const SITE = {
  brand: 'CESELAVE',
  brandLocal: '塞拉维家居',
  legalName: 'Shanghai Zhengxia Home Decoration Co., Ltd.',
  url: 'https://softstoneflex.com',
  email: 'support@softstoneflex.com',
  phone: '+86 13524628041',
  phoneHref: 'tel:+8613524628041',
  addressLines: [
    'Room J1317, Building 2, No. 988 Jingtang Road',
    'Nanxiang Town, Jiading District',
    'Shanghai, China',
  ],
  summary:
    'Ceselave develops and supplies decorative surface panels, including PU stone veneer, simulated wood, translucent sheets, soft stone and acoustic wood-slat systems, for commercial and residential projects. The company supports pattern customization, project packages and bulk supply.',
} as const

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/applications', label: 'Applications' },
  { href: '/about', label: 'About' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
] as const

export interface Application {
  slug: string
  name: string
  note: string
  products: string[]
  named: 'customer' | 'catalog'
  image?: { src: string; alt: string }
}

export const APPLICATIONS: Application[] = [
  {
    slug: 'retail-shops',
    name: 'Retail shops',
    note: 'Back walls and feature walls that give a shop interior a finished surface.',
    products: ['pu-stone-veneer', 'simulated-wood', 'polyester-acoustic-grille', 'artistic-acoustic-panels'],
    named: 'customer',
  },
  {
    slug: 'bars',
    name: 'Bars',
    note: 'Wood-slat walls and felt backing for rooms where noise builds up.',
    products: ['polyester-acoustic-grille', 'light-integrated-acoustic-grille', 'artistic-acoustic-panels'],
    named: 'customer',
  },
  {
    slug: 'garages',
    name: 'Garages',
    note: 'Wall surfaces and sound-absorbing panels for private and showroom garages.',
    products: ['pu-stone-veneer', 'pet-grid-acoustic-panel', 'polyester-acoustic-grille'],
    named: 'customer',
  },
  {
    slug: 'villa-feature-walls',
    name: 'Villa feature walls',
    note: 'Pattern panels and wood-grain surfaces for living rooms, stairwells and entrances.',
    products: ['artistic-acoustic-panels', 'simulated-wood', 'soft-stone-panels', 'polyester-acoustic-grille'],
    named: 'customer',
    image: {
      src: '/images/hero/02-artistic-chevron.jpg',
      alt: 'Chevron wood-and-felt acoustic panel above a sofa in a living room',
    },
  },
  {
    slug: 'shopfronts',
    name: 'Shopfronts',
    note: 'Stone-look and light-transmitting surfaces for the street side of a unit.',
    products: ['pu-stone-veneer', 'translucent-panels', 'simulated-wood', 'soft-stone-panels'],
    named: 'customer',
  },
  {
    slug: 'renovation',
    name: 'Renovation of existing rooms',
    note: 'Panels that fix to an existing wall with screws or construction adhesive, cut on site with basic tools.',
    products: ['polyester-acoustic-grille', 'pu-stone-veneer', 'soft-stone-panels'],
    named: 'customer',
    image: {
      src: '/images/hero/01-acoustic-wall.jpg',
      alt: 'Black felt and oak slat acoustic wall behind a bed',
    },
  },
  {
    slug: 'offices',
    name: 'Offices',
    note: 'Open-plan and cellular rooms that need calmer acoustics and a warmer finish.',
    products: ['pet-grid-acoustic-panel', 'polyester-acoustic-grille'],
    named: 'catalog',
  },
  {
    slug: 'hotels',
    name: 'Hotels',
    note: 'Lobbies, corridors and receptions that combine wood-slat texture with light.',
    products: ['light-integrated-acoustic-grille', 'bendable-acoustic-grille', 'polyester-acoustic-grille'],
    named: 'catalog',
  },
  {
    slug: 'meeting-rooms',
    name: 'Meeting rooms',
    note: 'Felt and slat walls that reduce echo and improve speech clarity.',
    products: ['pet-grid-acoustic-panel', 'polyester-acoustic-grille', 'artistic-acoustic-panels'],
    named: 'catalog',
  },
  {
    slug: 'schools',
    name: 'Schools',
    note: 'Classrooms and halls where polyester felt panels help control reverberation.',
    products: ['pet-grid-acoustic-panel', 'polyester-acoustic-grille'],
    named: 'catalog',
  },
  {
    slug: 'home-cinema-walls',
    name: 'Home cinema walls',
    note: 'Dark felt and slat walls for rooms where sound quality matters.',
    products: ['polyester-acoustic-grille', 'pet-grid-acoustic-panel', 'artistic-acoustic-panels'],
    named: 'catalog',
  },
]
