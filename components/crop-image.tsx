import type { CSSProperties } from 'react'
import type { CatalogImage } from '@/lib/catalog'
import { cn } from '@/lib/utils'

interface CropImageProps {
  image: CatalogImage
  className?: string
  priority?: boolean
  decorative?: boolean
}

/**
 * Renders a catalog image (or a rectangle of it) so the whole subject stays visible.
 * The parent supplies a definite box; the image is contained inside it without cropping
 * beyond the declared crop rectangle.
 */
export function CropImage({ image, className, priority = false, decorative = false }: CropImageProps) {
  const rect = image.crop ?? { x: 0, y: 0, w: image.width, h: image.height }
  const ratio = rect.w / rect.h

  const frameStyle: CSSProperties = {
    width: `min(100cqw, calc(100cqh * ${ratio}))`,
    aspectRatio: `${rect.w} / ${rect.h}`,
  }

  const imageStyle: CSSProperties = image.crop
    ? {
        position: 'absolute',
        maxWidth: 'none',
        width: `${(image.width / rect.w) * 100}%`,
        height: `${(image.height / rect.h) * 100}%`,
        left: `${(-rect.x / rect.w) * 100}%`,
        top: `${(-rect.y / rect.h) * 100}%`,
        objectFit: 'fill',
      }
    : { width: '100%', height: '100%', objectFit: 'contain' }

  return (
    <div className={cn('grid size-full place-items-center', className)} style={{ containerType: 'size' }}>
      <div className="relative overflow-hidden" style={frameStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={decorative ? '' : image.alt}
          width={image.width}
          height={image.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={imageStyle}
          className={cn(image.blend && 'mix-blend-multiply')}
        />
      </div>
    </div>
  )
}
