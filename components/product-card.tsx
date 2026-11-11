import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ProductVisual } from '@/components/product-visual'
import { Reveal } from '@/components/reveal'
import type { Product } from '@/lib/catalog'

interface ProductCardProps {
  product: Product
  index: number
  position?: number
}

export function ProductCard({ product, index, position = 0 }: ProductCardProps) {
  return (
    <Reveal index={position} className="h-full">
      <Link
        href={`/products/${product.slug}`}
        className="group flex h-full flex-col border border-line bg-plaster transition-colors hover:border-oak"
      >
        <ProductVisual product={product} index={index} />
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-2xl">{product.name}</h3>
          <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">{product.summary}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink group-hover:text-oak-deep">
            View details
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  )
}
