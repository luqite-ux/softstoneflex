'use client'

import { useState } from 'react'
import { CropImage } from '@/components/crop-image'
import { GRILLE_PHOTO, type CatalogImage } from '@/lib/catalog'
import { cn } from '@/lib/utils'

interface Colourway {
  id: string
  label: string
  swatch: string
  image: CatalogImage
}

const WINDOW = { w: 285, h: 380, y: 300 }

const COLOURWAYS: Colourway[] = [
  { id: 'all', label: 'All four', swatch: 'linear-gradient(90deg,#6b5646 25%,#d9c7a0 25% 50%,#2a2b2e 50% 75%,#c58a3e 75%)', image: GRILLE_PHOTO },
  { id: 'walnut', label: 'Walnut tone', swatch: '#6b5646', image: { ...GRILLE_PHOTO, crop: { x: 0, ...WINDOW } } },
  { id: 'light-oak', label: 'Light oak tone', swatch: '#d9c7a0', image: { ...GRILLE_PHOTO, crop: { x: 165, ...WINDOW } } },
  { id: 'black', label: 'Black', swatch: '#2a2b2e', image: { ...GRILLE_PHOTO, crop: { x: 455, ...WINDOW } } },
  { id: 'honey-oak', label: 'Honey oak tone', swatch: '#c58a3e', image: { ...GRILLE_PHOTO, crop: { x: 745, ...WINDOW } } },
]

export function FinishViewer({ aspect = 'wide' }: { aspect?: 'wide' | 'tall' }) {
  const [active, setActive] = useState('all')

  return (
    <div>
      <div
        className={cn(
          'relative w-full overflow-hidden bg-sand',
          aspect === 'wide' ? 'aspect-[4/3]' : 'aspect-[3/4] max-h-[620px]',
        )}
      >
        {COLOURWAYS.map((colourway) => (
          <div
            key={colourway.id}
            className="finish-layer absolute inset-0"
            data-active={active === colourway.id}
            aria-hidden={active !== colourway.id}
          >
            <CropImage image={colourway.image} className="p-3" decorative={active !== colourway.id} />
          </div>
        ))}
      </div>

      <div role="group" aria-label="Colour tones shown in the catalog photo" className="mt-4 flex flex-wrap gap-2">
        {COLOURWAYS.map((colourway) => (
          <button
            key={colourway.id}
            type="button"
            aria-pressed={active === colourway.id}
            onClick={() => setActive(colourway.id)}
            className={cn(
              'inline-flex h-11 items-center gap-2.5 border px-4 text-sm font-medium transition-colors',
              active === colourway.id
                ? 'border-ink bg-ink text-plaster'
                : 'border-[#9c9183] bg-transparent text-ink hover:border-ink',
            )}
          >
            <span
              aria-hidden="true"
              className="size-3.5 border border-white/40"
              style={{ background: colourway.swatch }}
            />
            {colourway.label}
          </button>
        ))}
      </div>
    </div>
  )
}
