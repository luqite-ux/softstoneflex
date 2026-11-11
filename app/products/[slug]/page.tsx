import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FinishViewer } from '@/components/finish-viewer'
import { ProductVisual } from '@/components/product-visual'
import { getProduct, getProducts } from '@/lib/products-db'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamicParams = true
export const revalidate = 60

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}
  return {
    title: product.metaTitle,
    description: product.metaDescription,
    alternates: { canonical: `/products/${product.slug}` },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  return (
    <article className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-2">
      <div>
        {product.slug === 'polyester-acoustic-grille' ? <FinishViewer /> : <ProductVisual product={product} priority />}
      </div>
      <div>
        <p className="eyebrow">{product.group === 'acoustic' ? 'Acoustic' : 'Surface'}</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">{product.name}</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
          {product.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl className="mt-8 divide-y divide-line border-y border-line">
          {product.specs.map((spec) => (
            <div key={spec.label} className="grid gap-1 py-3 sm:grid-cols-3">
              <dt className="text-sm font-semibold">{spec.label}</dt>
              <dd className="text-ink-soft sm:col-span-2">{spec.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-sm text-ink-soft">Used for: {product.applications.join(', ')}.</p>
        <Link href={`/contact?product=${product.slug}#quote`} className="btn btn-primary mt-8">
          Request a quote
        </Link>
      </div>
    </article>
  )
}
