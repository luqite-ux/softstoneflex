'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeroBackdropProps {
  src: string
  alt: string
  /** "load" reveals with CSS on first paint; "view" reveals once when scrolled into view. */
  reveal: 'load' | 'view'
  priority?: boolean
  objectPosition?: string
}

export function HeroBackdrop({ src, alt, reveal, priority = false, objectPosition = 'center' }: HeroBackdropProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reveal !== 'view') return
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.animate(
          [{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0 0)' }],
          { duration: 700, easing: 'cubic-bezier(0.22, 0.7, 0.2, 1)', fill: 'backwards' },
        )
        observer.disconnect()
      },
      { threshold: 0.2 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [reveal])

  return (
    <div ref={ref} className={cn('absolute inset-0', reveal === 'load' && 'hero-clip-load')}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  )
}
