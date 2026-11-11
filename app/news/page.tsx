import type { Metadata } from 'next'
import Link from 'next/link'
import { PageIntro } from '@/components/page-intro'
import { getPublishedArticles } from '@/lib/articles-db'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'News',
  description: 'Project notes and product updates from CESELAVE.',
  alternates: { canonical: '/news' },
}

export default async function NewsPage() {
  const articles = await getPublishedArticles()
  if (!articles.length) {
    return (
      <PageIntro
        eyebrow="News"
        title="No articles published yet."
        lead="When the company releases a project note or product update, it will be listed here with the date and title."
      />
    )
  }
  return (
    <>
      <PageIntro eyebrow="News" title="Project notes and product updates." lead="Each note shows its publication date and title." />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:grid-cols-2 sm:px-8">
        {articles.map((article) => (
          <article key={article.slug} className="flex h-full flex-col border border-line p-5">
            <p className="text-sm text-ink-soft">
              {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
            </p>
            <h2 className="mt-2 text-2xl">
              <Link href={`/news/${article.slug}`}>{article.title}</Link>
            </h2>
            {article.excerpt ? <p className="mt-3 line-clamp-3 flex-1 text-ink-soft">{article.excerpt}</p> : <div className="flex-1" />}
            <Link href={`/news/${article.slug}`} className="mt-auto pt-4 text-sm font-semibold">
              Read the note
            </Link>
          </article>
        ))}
      </section>
    </>
  )
}
