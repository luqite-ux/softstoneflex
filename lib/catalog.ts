export type Locale = 'en'

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

export interface CatalogImage {
  src: string
  alt: string
  width: number
  height: number
  crop?: Rect
  blend?: boolean
}

export interface Spec {
  label: string
  value: string
}

export interface PatternCut {
  id: string
  name: string
  size: string
  crop: Rect
}

export interface Product {
  slug: string
  locale: Locale
  group: 'surface' | 'acoustic'
  name: string
  summary: string
  description: string[]
  highlights: string[]
  specs: Spec[]
  applications: string[]
  image?: CatalogImage
  extraImages?: CatalogImage[]
  metaTitle: string
  metaDescription: string
}

const SPREAD = { width: 1754, height: 1154 }

export const GRILLE_PHOTO: CatalogImage = {
  src: '/images/products/p12-polyester-grille.jpg',
  alt: 'Polyester fibre acoustic grille panels in walnut, light oak, black and honey oak, with a stacked finish sample',
  ...SPREAD,
  crop: { x: 0, y: 90, w: 1754, h: 1064 },
  blend: true,
}

export const PATTERN_SHEET: CatalogImage = {
  src: '/images/products/p14-artistic-patterns.jpg',
  alt: 'Pattern sheet of chevron, wave, lattice and geometric wood-and-felt acoustic panels with printed sizes',
  ...SPREAD,
  crop: { x: 40, y: 90, w: 1680, h: 1010 },
  blend: true,
}

export const PATTERN_CUTS: PatternCut[] = [
  { id: 'chevron-light', name: 'Chevron, light oak', size: '1200 × 600 × 21 mm', crop: { x: 52, y: 108, w: 246, h: 450 } },
  { id: 'chevron-walnut', name: 'Chevron, walnut', size: '1200 × 600 × 21 mm', crop: { x: 52, y: 598, w: 246, h: 450 } },
  { id: 'wave', name: 'Wave', size: '2400 × 600 × 21 mm', crop: { x: 328, y: 104, w: 250, h: 942 } },
  { id: 'lattice-wave', name: 'Lattice wave', size: '2400 × 600 × 21 mm', crop: { x: 600, y: 104, w: 246, h: 942 } },
  { id: 'stepped-wave', name: 'Stepped wave', size: '2400 × 600 × 21 mm', crop: { x: 898, y: 104, w: 247, h: 942 } },
  { id: 'swell-wave', name: 'Swell wave', size: '2400 × 600 × 21 mm', crop: { x: 1176, y: 104, w: 255, h: 942 } },
  { id: 'hex-lattice', name: 'Hexagon lattice', size: '2400 × 600 × 21 mm', crop: { x: 1460, y: 104, w: 250, h: 942 } },
]

export const INSTALLATION_SHEET: CatalogImage = {
  src: '/images/products/installation-sheet.jpg',
  alt: 'Export carton packing and three-step installation guide for acoustic wood slat panels',
  width: 1024,
  height: 1024,
  crop: { x: 0, y: 0, w: 1024, h: 925 },
  blend: true,
}

export const SHOWROOM_PHOTO: CatalogImage = {
  src: '/images/about/p17-showroom.jpg',
  alt: 'Showroom with pattern panel samples on the wall, a wood-slat feature wall and acoustic ceiling elements',
  ...SPREAD,
  crop: { x: 0, y: 90, w: 1754, h: 1064 },
}

export const PRODUCTS: Product[] = [
  {
    slug: 'pu-stone-veneer',
    locale: 'en',
    group: 'surface',
    name: 'PU Stone Veneer',
    summary: 'Lightweight simulated stone surface for feature walls, shopfronts and renovation.',
    description: [
      'PU Stone Veneer gives a feature wall or shopfront the look of natural stone in a lightweight surface.',
      'Pattern customization, project packages and bulk supply are available for distributors and contractors. Tell us the wall area and the stone look you need, and we will confirm the options.',
    ],
    highlights: ['Lightweight simulated stone surface', 'Feature walls, shopfronts and renovation', 'Pattern customization and bulk supply'],
    specs: [
      { label: 'Form', value: 'Lightweight simulated stone surface' },
      { label: 'Typical use', value: 'Feature walls, shopfronts, renovation of existing rooms' },
      { label: 'Supply', value: 'Pattern customization, project packages, bulk supply' },
      { label: 'Sizes and finishes', value: 'Confirmed with the quotation for each project' },
    ],
    applications: ['Retail shops', 'Shopfronts', 'Renovation of existing rooms', 'Garages'],
    metaTitle: 'PU Stone Veneer for Feature Walls and Shopfronts',
    metaDescription:
      'Lightweight simulated stone surface for feature walls, shopfronts and renovation. Request a quote for pattern customization and bulk supply.',
  },
  {
    slug: 'simulated-wood',
    locale: 'en',
    group: 'surface',
    name: 'Simulated Wood Panels',
    summary: 'Wood-grain decorative panels for commercial and residential walls.',
    description: [
      'Simulated Wood Panels bring a wood-grain finish to commercial and residential walls.',
      'We supply them for retail interiors, villa feature walls and shopfronts, with pattern customization and project packages on request.',
    ],
    highlights: ['Wood-grain decorative surface', 'Commercial and residential walls', 'Project packages and bulk supply'],
    specs: [
      { label: 'Form', value: 'Wood-grain decorative panels' },
      { label: 'Typical use', value: 'Commercial and residential walls' },
      { label: 'Supply', value: 'Pattern customization, project packages, bulk supply' },
      { label: 'Sizes and finishes', value: 'Confirmed with the quotation for each project' },
    ],
    applications: ['Retail shops', 'Villa feature walls', 'Shopfronts'],
    metaTitle: 'Simulated Wood Panels for Commercial and Residential Walls',
    metaDescription:
      'Wood-grain decorative panels for commercial and residential walls, supplied to distributors and contractors. Ask for patterns, sizes and project packages.',
  },
  {
    slug: 'translucent-panels',
    locale: 'en',
    group: 'surface',
    name: 'Translucent Decorative Panels',
    summary: 'Light-transmitting decorative sheet for feature walls and shopfronts.',
    description: [
      'Translucent Decorative Panels let light pass through a decorative sheet, which suits backlit feature walls and shopfronts.',
      'Send us the opening size and lighting concept, and we will confirm sheet options and supply terms.',
    ],
    highlights: ['Light-transmitting decorative sheet', 'Feature walls and shopfronts', 'Quoted per project'],
    specs: [
      { label: 'Form', value: 'Light-transmitting decorative sheet' },
      { label: 'Typical use', value: 'Feature walls and shopfronts' },
      { label: 'Supply', value: 'Pattern customization, project packages, bulk supply' },
      { label: 'Sizes and finishes', value: 'Confirmed with the quotation for each project' },
    ],
    applications: ['Shopfronts', 'Retail shops', 'Hotels'],
    metaTitle: 'Translucent Decorative Panels for Backlit Walls',
    metaDescription:
      'Light-transmitting decorative sheet for feature walls and shopfronts. Share your project size and request a quote from CESELAVE.',
  },
  {
    slug: 'soft-stone-panels',
    locale: 'en',
    group: 'surface',
    name: 'Soft Stone Panels',
    summary: 'Flexible stone-look surface for curved and lightweight wall applications.',
    description: [
      'Soft Stone Panels combine a stone look with a flexible, lightweight build, so they can follow curved walls and suit renovation work.',
      'Ask us about patterns, sizes and bulk supply for your project.',
    ],
    highlights: ['Flexible stone-look surface', 'Curved and lightweight wall applications', 'Bulk supply on request'],
    specs: [
      { label: 'Form', value: 'Flexible stone-look surface' },
      { label: 'Typical use', value: 'Curved and lightweight wall applications' },
      { label: 'Supply', value: 'Pattern customization, project packages, bulk supply' },
      { label: 'Sizes and finishes', value: 'Confirmed with the quotation for each project' },
    ],
    applications: ['Villa feature walls', 'Shopfronts', 'Renovation of existing rooms'],
    metaTitle: 'Soft Stone Panels for Curved and Lightweight Walls',
    metaDescription:
      'Flexible stone-look wall surface for curved and lightweight applications. Request a quote for patterns, sizes and bulk supply.',
  },
  {
    slug: 'polyester-acoustic-grille',
    locale: 'en',
    group: 'acoustic',
    name: 'Polyester Fibre Acoustic Grille Panels',
    summary:
      '9 mm polyester felt base with 12 mm MDF slats. Usual size 2400 × 605 × 21 mm, with veneer, melamine and PVC finishes.',
    description: [
      'Polyester Fibre Acoustic Grille Panels pair a 9 mm polyester felt base with 12 mm MDF slats. The felt absorbs sound that passes through the gaps between slats, and the slats give the wall its finished wood look.',
      'The usual panel is 2400 × 605 × 21 mm. Heights from 1200 to 3000 mm can be discussed for your project.',
    ],
    highlights: [
      '9 mm polyester felt base, 12 mm MDF slats',
      'Four finishes and three slat builds',
      'Four felt colours: black, bright camel, light camel, silver gray',
    ],
    specs: [
      { label: 'Construction', value: '9 mm polyester felt base and 12 mm MDF slats' },
      { label: 'Usual size', value: '2400 × 605 × 21 mm' },
      { label: 'Heights', value: '1200–3000 mm can be discussed' },
      { label: 'Slats', value: 'Usual width 27 mm with about 13 mm gaps' },
      { label: 'Slat builds', value: 'One face, three faces, or half-round' },
      { label: 'Finishes', value: 'Natural wood veneer, tech veneer, melamine, PVC' },
      { label: 'Felt colours', value: 'Black, bright camel, light camel, silver gray' },
      {
        label: 'Acoustics',
        value:
          'Polyester base rated up to NRC 0.9 across 125–4000 Hz. The catalog states 10–28 dB noise reduction for the dense felt base.',
      },
      {
        label: 'Eco and fire',
        value:
          'Eco and fire grades are available to project specification, including P2/E0 and Class A/B1 discussions. Grades are confirmed per project and are not assumed on every panel.',
      },
    ],
    applications: ['Offices', 'Hotels', 'Meeting rooms', 'Home cinema walls', 'Bars', 'Retail shops'],
    image: {
      src: '/images/products/polyester-wall.jpg',
      alt: 'Four polyester fibre acoustic grille finishes: walnut, light oak, black and honey oak',
      width: 1008,
      height: 778,
    },
    metaTitle: 'Polyester Fibre Acoustic Grille Panels, 2400 × 605 × 21 mm',
    metaDescription:
      'Polyester felt and MDF slat acoustic grille panels with veneer, melamine and PVC finishes. See sizes, felt colours and acoustic data, then request a quote.',
  },
  {
    slug: 'light-integrated-acoustic-grille',
    locale: 'en',
    group: 'acoustic',
    name: 'Light-Integrated Acoustic Grille',
    summary: 'Same grille family with linear light slots for lobbies, media walls and receptions.',
    description: [
      'Light-Integrated Acoustic Grille belongs to the same family as the Polyester Fibre Acoustic Grille Panels, with linear light slots built into the wall pattern.',
      'It suits lobbies, media walls and receptions where the wall should carry both texture and light. Share the wall size and lighting layout, and we will confirm the build.',
    ],
    highlights: ['Same grille family', 'Linear light slots', 'Lobbies, media walls and receptions'],
    specs: [
      { label: 'Family', value: 'Polyester felt and slat acoustic grille' },
      { label: 'Feature', value: 'Linear light slots' },
      { label: 'Typical use', value: 'Lobbies, media walls, receptions' },
      { label: 'Sizes and slot layout', value: 'Confirmed with the quotation for each project' },
    ],
    applications: ['Hotels', 'Offices', 'Home cinema walls', 'Bars'],
    image: {
      src: '/images/products/light-integrated-wall.jpg',
      alt: 'Black acoustic grille wall with vertical light slots, shown beside a leather chair',
      width: 821,
      height: 1008,
    },
    metaTitle: 'Light-Integrated Acoustic Grille with Linear Light Slots',
    metaDescription:
      'Acoustic grille panels with linear light slots for lobbies, media walls and receptions. Send your wall size to request a quote.',
  },
  {
    slug: 'bendable-acoustic-grille',
    locale: 'en',
    group: 'acoustic',
    name: 'Bendable Acoustic Grille Panels',
    summary: 'Flexible polyester grille for curved walls and columns.',
    description: [
      'Bendable Acoustic Grille Panels use a flexible polyester build so the grille can follow curved walls and wrap columns.',
      'Send the radius and wall height of your project, and we will confirm the panel build and supply details.',
    ],
    highlights: ['Flexible polyester grille', 'Curved walls and columns', 'Quoted per project'],
    specs: [
      { label: 'Form', value: 'Flexible polyester acoustic grille' },
      { label: 'Typical use', value: 'Curved walls and columns' },
      { label: 'Radius and size', value: 'Confirmed with the quotation for each project' },
    ],
    applications: ['Hotels', 'Retail shops', 'Offices'],
    image: {
      src: '/images/hero/03-bendable-curve.jpg',
      alt: 'Curved corridor wall clad in oak slats on black felt, with a sample board leaning against it',
      width: 1280,
      height: 720,
    },
    metaTitle: 'Bendable Acoustic Grille Panels for Curved Walls and Columns',
    metaDescription:
      'Flexible polyester acoustic grille for curved walls and columns. Share your radius and height to request a quote.',
  },
  {
    slug: 'artistic-acoustic-panels',
    locale: 'en',
    group: 'acoustic',
    name: 'Artistic Acoustic Panels',
    summary: 'Chevron, wave, lattice and geometric wood-and-felt patterns.',
    description: [
      'Artistic Acoustic Panels turn wood slats and felt into chevron, wave, lattice and geometric patterns for feature walls.',
      'The pattern sheet shows the available cuts: 1200 × 600 × 21 mm for the chevron panels and 2400 × 600 × 21 mm for the wave and lattice panels. Pattern customization is available for projects.',
    ],
    highlights: ['Chevron, wave, lattice and geometric patterns', 'Cuts of 1200 and 2400 mm length', 'Pattern customization'],
    specs: [
      { label: 'Patterns', value: 'Chevron, wave, lattice, geometric' },
      { label: 'Construction', value: 'Wood pattern on a felt base' },
      { label: 'Available cuts', value: '1200 × 600 × 21 mm and 2400 × 600 × 21 mm' },
      { label: 'Custom patterns', value: 'Available on request' },
    ],
    applications: ['Villa feature walls', 'Retail shops', 'Meeting rooms', 'Bars'],
    image: {
      src: '/images/hero/02-artistic-chevron.jpg',
      alt: 'Chevron acoustic wood panel above a sofa',
      width: 1280,
      height: 720,
    },
    extraImages: [PATTERN_SHEET],
    metaTitle: 'Artistic Acoustic Panels in Chevron, Wave and Lattice Patterns',
    metaDescription:
      'Wood-and-felt pattern panels in chevron, wave, lattice and geometric designs, in 1200 and 2400 mm cuts. Request a quote or a custom pattern.',
  },
  {
    slug: 'pet-grid-acoustic-panel',
    locale: 'en',
    group: 'acoustic',
    name: 'PET Grid Acoustic Panel',
    summary: 'Polyester felt grid with straight or V grooves and multiple felt colors.',
    description: [
      'PET Grid Acoustic Panel is a polyester felt panel with a grid of straight or V grooves, available in multiple felt colors.',
      'Stock colors can be discussed. Tell us the colors and groove style you need, and we will confirm what is available for your order.',
    ],
    highlights: ['Polyester felt grid', 'Straight or V grooves', 'Multiple felt colors, stock colors can be discussed'],
    specs: [
      { label: 'Material', value: 'Polyester felt' },
      { label: 'Surface', value: 'Grid with straight or V grooves' },
      { label: 'Colours', value: 'Multiple felt colors' },
      { label: 'Stock', value: 'Stock colors can be discussed' },
    ],
    applications: ['Offices', 'Meeting rooms', 'Schools', 'Home cinema walls'],
    image: {
      src: '/images/products/p7-pet-grid.jpg',
      alt: 'Grey polyester felt grid acoustic panel wall behind a sofa and side table',
      ...SPREAD,
      crop: { x: 0, y: 100, w: 870, h: 1054 },
    },
    extraImages: [
      {
        src: '/images/products/p7-pet-grid.jpg',
        alt: 'Felt colour and groove pattern swatches for the PET grid acoustic panel',
        ...SPREAD,
        crop: { x: 935, y: 560, w: 765, h: 175 },
      },
    ],
    metaTitle: 'PET Grid Acoustic Panel in Straight and V-Groove Felt',
    metaDescription:
      'Polyester felt acoustic panel with straight or V grooves in multiple colors. Ask about stock colors and request a quote.',
  },
]

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug)
}

export function getProducts(slugs: string[]): Product[] {
  return slugs.map((slug) => getProduct(slug)).filter((product): product is Product => Boolean(product))
}
