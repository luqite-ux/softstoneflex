import type { Metadata } from 'next'
import { Suspense } from 'react'
import { QuoteForm } from '@/components/quote-form'
import { PageIntro } from '@/components/page-intro'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Contact CESELAVE for decorative panels and acoustic grille quotations.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Send the wall size, pattern and destination."
        lead="Quotes are prepared for distributors and project buyers. There is no online price or checkout."
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2">
        <address className="not-italic text-lg leading-relaxed">
          <p className="font-semibold">{SITE.legalName}</p>
          <p className="mt-4">{SITE.addressLines.join(', ')}</p>
          <p className="mt-4">
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
          <p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </address>
        <Suspense fallback={<p>Loading the form…</p>}>
          <QuoteForm />
        </Suspense>
      </section>
    </>
  )
}
