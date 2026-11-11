import Link from 'next/link'
import { AcousticDiagram } from '@/components/acoustic-diagram'
import { HeroPanel } from '@/components/hero-panel'
import { ProductCard } from '@/components/product-card'
import { SectionHeading } from '@/components/section-heading'
import { getPublishedArticles } from '@/lib/articles-db'
import { getProducts } from '@/lib/products-db'
import { APPLICATIONS, SITE } from '@/lib/site'

export const revalidate = 60

const FAQ = [
  {
    question: 'Can panel patterns and sizes be customized?',
    answer: 'Yes. Ceselave supports pattern customization, project packages and bulk supply. Share the wall size, pattern and quantity, and the options are confirmed with the quotation.',
  },
  {
    question: 'How are the acoustic grille panels installed?',
    answer: 'Measure the wall, cut the felt with a utility knife and trim the slats with a fine saw. Fix through the felt with black screws, or apply construction adhesive to the felt and press the panel to the wall.',
  },
  {
    question: 'Do you publish prices online?',
    answer: 'No. Panels are quoted for distributors and projects. Use the quote form with the product, area and destination.',
  },
]

export default async function HomePage() {
  const [products, articles] = await Promise.all([getProducts(), getPublishedArticles()])
  return (
    <>
      <HeroPanel
        tall
        priority
        reveal="load"
        headingLevel="h1"
        textSide="right"
        eyebrow="Decorative surfaces"
        headline="Wood, stone and felt surfaces for real rooms."
        sentence="Ceselave supplies PU stone veneer, simulated wood, translucent sheets, soft stone and acoustic grille panels for shops, bars, villas and renovation projects."
        image={{
          src: '/images/hero/01-acoustic-wall.jpg',
          alt: 'Oak and black felt acoustic slat wall beside a bed',
          objectPosition: 'left center',
        }}
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Products"
          title="Nine panel families, from stone looks to acoustic grilles."
          lead="Four surface lines are described from the company brief. Acoustic families include the photographs and sizes from the 2026 catalog."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} position={index} />
          ))}
        </div>
      </section>

      <HeroPanel
        reveal="view"
        headingLevel="h2"
        textSide="left"
        eyebrow="Pattern panels"
        headline="Chevron, wave and lattice cuts for feature walls."
        sentence="Artistic acoustic panels keep the wood-and-felt pattern intact, with 1200 mm and 2400 mm cuts shown in the catalog."
        image={{
          src: '/images/hero/02-artistic-chevron.jpg',
          alt: 'Chevron acoustic wood panel above a sofa',
          objectPosition: 'right center',
        }}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Acoustics"
            title="Felt and spaced slats, for rooms that need less echo."
            lead="The catalog describes a polyester felt base and spaced MDF slats. The dense felt base is stated to reduce noise by 10–28 dB, with absorption focused on mid and high frequencies."
          />
          <Link href="/products/polyester-acoustic-grille" className="btn btn-primary mt-8">
            View the grille panels
          </Link>
        </div>
        <AcousticDiagram />
      </section>

      <section className="border-y border-line bg-sand">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionHeading eyebrow="Applications" title="Where the panels are used." />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {APPLICATIONS.map((item) => (
              <li key={item.slug} className="border border-line bg-plaster p-5">
                <h3 className="text-2xl">{item.name}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{item.note}</p>
              </li>
            ))}
          </ul>
          <Link href="/applications" className="mt-8 inline-flex text-sm font-semibold text-ink hover:text-oak-deep">
            See application notes
          </Link>
        </div>
      </section>

      <HeroPanel
        reveal="view"
        headingLevel="h2"
        textSide="right"
        eyebrow="Curved walls"
        headline="Bendable grilles follow the wall, not the other way around."
        sentence="Flexible polyester grille panels are for curved walls and columns. Radius and height are confirmed with the quotation."
        image={{
          src: '/images/hero/03-bendable-curve.jpg',
          alt: 'Curved oak slat wall with a sample board in the foreground',
          objectPosition: 'center',
        }}
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Questions"
          title="Before you send a project note."
          lead={SITE.summary}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {FAQ.map((item) => (
            <article key={item.question} className="border border-line p-5">
              <h3 className="text-xl">{item.question}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionHeading
            eyebrow="News"
            title={articles.length ? 'Project notes' : 'Project notes will appear here.'}
            lead={articles.length ? 'Published notes from the company.' : 'There are no published articles yet. New notes from the company will show on this page after they are released.'}
          />
          {articles.length ? (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {articles.slice(0, 4).map((article) => (
                <li key={article.slug} className="border border-line p-5">
                  <p className="text-sm text-ink-soft">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
                  <h3 className="mt-2 text-2xl">
                    <Link href={`/news/${article.slug}`}>{article.title}</Link>
                  </h3>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
    </>
  )
}
