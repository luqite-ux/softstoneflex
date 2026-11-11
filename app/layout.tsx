import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, Newsreader } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { SITE } from '@/lib/site'
import './globals.css'

const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken', display: 'swap' })
const newsreader = Newsreader({ subsets: ['latin'], variable: '--font-newsreader', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'CESELAVE | Decorative Surface Panels and Acoustic Grille Supplier',
    template: '%s | CESELAVE',
  },
  description:
    'CESELAVE supplies decorative surface panels and acoustic wood-slat systems to distributors, contractors and interior projects worldwide.',
  applicationName: 'CESELAVE',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'CESELAVE',
    url: SITE.url,
    images: [{ url: '/images/hero/01-acoustic-wall.jpg', width: 1280, height: 720, alt: 'Black felt and oak slat acoustic wall' }],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#F3EEE6',
  width: 'device-width',
  initialScale: 1,
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CESELAVE',
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/images/ceselave-logo.jpg`,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Room J1317, Building 2, No. 988 Jingtang Road, Nanxiang Town, Jiading District',
    addressLocality: 'Shanghai',
    addressCountry: 'CN',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hanken.variable} ${newsreader.variable}`}>
      <body className="min-h-screen bg-plaster font-sans text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:text-plaster"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
