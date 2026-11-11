import type { Metadata } from 'next'
import Image from 'next/image'
import { PageIntro } from '@/components/page-intro'
import { SHOWROOM_PHOTO } from '@/lib/catalog'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About CESELAVE',
  description: 'Ceselave develops decorative surface panels and acoustic grille systems for commercial and residential projects.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About" title="A surface supplier for projects that need a finished wall." lead={SITE.summary} />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed text-ink-soft">
          <p>
            The company focuses on simulated decorative panels: PU stone veneer, simulated wood, translucent sheets and soft stone, plus the acoustic wood-slat and PET grid systems in the 2026 catalog.
          </p>
          <p>
            Orders can be discussed as pattern customization, project packages or bulk supply for fit-out customers and overseas trade partners.
          </p>
          <p>
            The showroom photograph shows pattern samples, a wood-slat wall and ceiling elements. Factory capacity figures from a differently branded catalog page are not used here.
          </p>
        </div>
        <Image
          src={SHOWROOM_PHOTO.src}
          alt={SHOWROOM_PHOTO.alt}
          width={SHOWROOM_PHOTO.width}
          height={SHOWROOM_PHOTO.height}
          className="h-auto w-full object-contain bg-sand"
        />
      </section>
    </>
  )
}
