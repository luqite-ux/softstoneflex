import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getPublishedArticles } from '@/lib/articles-db'

export const dynamicParams = true
export const revalidate = 60

export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: article.image?.startsWith('https://') ? { images: [article.image] } : undefined,
  }
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()
  const html = /<[a-z][\s\S]*>/i.test(article.content)

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <p className="text-sm text-ink-soft">
        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
      </p>
      <h1 className="mt-3 text-4xl">{article.title}</h1>
      {html ? (
        <div className="article-prose mt-6" dangerouslySetInnerHTML={{ __html: article.content }} />
      ) : (
        <div className="mt-6 space-y-4 text-lg leading-relaxed">
          {article.content.split(/\n+/).filter(Boolean).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      )}
    </article>
  )
}
