import type { MetadataRoute } from 'next'
import { getPublishedArticles } from '@/lib/articles-db'
import { getProducts } from '@/lib/products-db'
import { SITE } from '@/lib/site'

export const revalidate = 60

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, articles] = await Promise.all([getProducts(), getPublishedArticles()])
  const now = new Date()
  const staticRoutes = ['', '/products', '/applications', '/about', '/news', '/contact']
  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE.url}${path || '/'}`,
      lastModified: now,
    })),
    ...products.map((product) => ({
      url: `${SITE.url}/products/${product.slug}`,
      lastModified: now,
    })),
    ...articles.map((article) => ({
      url: `${SITE.url}/news/${article.slug}`,
      lastModified: article.publishedAt ? new Date(article.publishedAt) : now,
    })),
  ]
}
