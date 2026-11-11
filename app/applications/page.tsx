import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'
import { APPLICATIONS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Panel Applications',
  description: 'Retail shops, bars, garages, villa walls, shopfronts, renovation, offices, hotels, meeting rooms, schools and home cinema walls.',
  alternates: { canonical: '/applications' },
}

export default function ApplicationsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Applications"
        title="Rooms and storefronts these panels are specified for."
        lead="The first group comes from the company brief. Offices, hotels, meeting rooms, schools and home cinema walls come from the acoustic catalog."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:px-8 md:grid-cols-2">
        {APPLICATIONS.map((item) => (
          <article key={item.slug} className="border border-line p-6">
            <h2 className="text-3xl">{item.name}</h2>
            <p className="mt-3 leading-relaxed text-ink-soft">{item.note}</p>
          </article>
        ))}
      </section>
    </>
  )
}
