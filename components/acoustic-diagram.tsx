'use client'

import { useEffect, useRef } from 'react'

const SLAT_TOPS = [28, 98, 168, 238]

export function AcousticDiagram() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const path = pathRef.current
    const svg = path?.ownerSVGElement
    if (!path || !svg) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const length = path.getTotalLength()
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        path.animate([{ strokeDashoffset: length }, { strokeDashoffset: 0 }], {
          duration: 1600,
          easing: 'ease-out',
          fill: 'backwards',
        })
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    path.style.strokeDasharray = `${length}`
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  return (
    <figure>
      <svg
        viewBox="0 0 480 300"
        role="img"
        aria-labelledby="acoustic-diagram-title acoustic-diagram-desc"
        className="h-auto w-full"
      >
        <title id="acoustic-diagram-title">Sound path through an acoustic grille panel</title>
        <desc id="acoustic-diagram-desc">
          Sound travels from a source in the room, passes through a gap between two wood slats and is absorbed by the
          polyester felt base behind them.
        </desc>

        <rect width="480" height="300" fill="#e9e1d4" />
        <rect x="380" y="0" width="100" height="300" fill="#cfc3b0" />
        <rect x="320" y="0" width="60" height="300" fill="#171717" />
        {SLAT_TOPS.map((top) => (
          <rect key={top} x="268" y={top} width="52" height="44" fill="#a56b3c" />
        ))}

        <circle cx="56" cy="153" r="9" fill="#1c1916" />
        <g fill="none" stroke="#1c1916" strokeWidth="1.5" opacity="0.4">
          <path d="M76 140 Q 86 153 76 166" />
          <path d="M92 128 Q 108 153 92 178" />
        </g>

        <path
          ref={pathRef}
          d="M72 153 L 360 153"
          fill="none"
          stroke="#86512a"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <g fontFamily="var(--font-hanken), sans-serif" fontSize="13" fontWeight="600" fill="#1c1916">
          <text x="30" y="202">Sound source</text>
          <text x="138" y="137" fill="#86512a">Gap between slats</text>
          <text x="294" y="20" textAnchor="middle" fill="#1c1916">Slats</text>
        </g>
        <g fontFamily="var(--font-hanken), sans-serif" fontSize="13" fontWeight="600">
          <text x="350" y="20" textAnchor="middle" fill="#f3eee6">Felt</text>
          <text x="430" y="20" textAnchor="middle" fill="#1c1916">Wall</text>
        </g>
      </svg>
      <figcaption className="mt-3 text-sm text-ink-soft">
        Sound passes through the slat gap and is absorbed by the polyester felt base.
      </figcaption>
    </figure>
  )
}
