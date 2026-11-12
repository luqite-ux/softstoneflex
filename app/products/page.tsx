import type { Metadata } from 'next'
import { PageIntro } from '@/components/page-intro'
import { ProductCard } from '@/components/product-card'
import { getProducts } from '@/lib/products-db'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Decorative and Acoustic Panels',
  description: 'PU stone veneer, simulated wood, translucent sheets, soft stone and acoustic grille panels from CESELAVE.',
  alternates: { canonical: '/products' },
}

export default async function ProductsPage() {
  const products = await getProducts()
  return (
    <>
      <PageIntro
        eyebrow="Products"
        title="Surfaces for walls that have to work in a real project."
        lead="PU stone, simulated wood, translucent sheets, soft stone and acoustic grille panels. Sizes and finishes are confirmed with the quotation."
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.slug} product={product} index={index} position={index} />
        ))}
      </section>
    </>
  )
}
