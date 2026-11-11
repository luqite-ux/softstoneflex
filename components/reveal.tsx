'use client'

import { useEffect, useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Position inside a group; delay is index * 80ms, capped at 480ms. */
  index?: number
}

/**
 * Fades a block up 24px once when it scrolls into view.
 * Content is visible by default; the animation is layered on after hydration,
 * so no-JS and reduced-motion visitors always see everything.
 */
export function Reveal({ children, className, index = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const delay = Math.min(index * 80, 480)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.animate(
          [
            { opacity: 0, transform: 'translateY(24px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 480, delay, easing: 'cubic-bezier(0.22, 0.7, 0.2, 1)', fill: 'backwards' },
        )
        observer.disconnect()
      },
      { threshold: 0.12 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [index])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
