import { CropImage } from '@/components/crop-image'
import type { Product } from '@/lib/catalog'
import { cn } from '@/lib/utils'

interface ProductVisualProps {
  product: Product
  index?: number
  className?: string
  priority?: boolean
}

/** Product image on a continuous warm ground. Products without photography stay empty. */
export function ProductVisual({ product, index, className, priority }: ProductVisualProps) {
  return (
    <div className={cn('relative aspect-[4/3] w-full overflow-hidden bg-sand', className)}>
      {product.image ? (
        <CropImage image={product.image} priority={priority} />
      ) : (
        <div className="flex size-full flex-col items-start justify-between border border-dashed border-[#B9AC99] p-5 m-0">
          <span className="font-display text-4xl text-ink-soft" aria-hidden="true">
            {typeof index === 'number' ? String(index + 1).padStart(2, '0') : ''}
          </span>
          <span className="text-sm font-medium text-ink-soft">Photography on request</span>
        </div>
      )}
    </div>
  )
}
