export interface Article {
  slug: string
  title: string
  excerpt: string
  publishedAt: string
  body: string[]
}

export const articles: Article[] = []

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}
