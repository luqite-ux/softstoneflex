import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { HeroBackdrop } from '@/components/hero-backdrop'
import { cn } from '@/lib/utils'

interface HeroPanelProps {
  image: { src: string; alt: string; objectPosition?: string }
  eyebrow: string
  headline: string
  sentence: string
  headingLevel: 'h1' | 'h2'
  textSide: 'left' | 'right'
  reveal: 'load' | 'view'
  tall?: boolean
  priority?: boolean
}

export function HeroPanel({
  image,
  eyebrow,
  headline,
  sentence,
  headingLevel: Heading,
  textSide,
  reveal,
  tall = false,
  priority = false,
}: HeroPanelProps) {
  return (
    <section
      className={cn(
        'on-dark relative isolate flex items-center overflow-hidden bg-felt text-plaster',
        tall ? 'min-h-[560px] h-[calc(100svh-4.5rem)] max-h-[840px]' : 'min-h-[460px] h-[68svh] max-h-[620px]',
      )}
    >
      <HeroBackdrop
        src={image.src}
        alt={image.alt}
        reveal={reveal}
        priority={priority}
        objectPosition={image.objectPosition}
      />
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-0',
          textSide === 'left'
            ? 'bg-gradient-to-r from-felt/85 via-felt/55 to-felt/0 sm:via-felt/40 sm:to-felt/0'
            : 'bg-gradient-to-l from-felt/85 via-felt/55 to-felt/0 sm:via-felt/40 sm:to-felt/0',
        )}
      />
      <div
        className={cn(
          'relative mx-auto flex w-full max-w-7xl px-5 py-16 sm:px-8',
          textSide === 'right' && 'justify-end',
        )}
      >
        <div className="max-w-xl">
          <p className="eyebrow">{eyebrow}</p>
          <Heading className="mt-4 text-balance text-4xl text-white sm:text-5xl lg:text-[3.5rem]">{headline}</Heading>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#EDE6DA]">{sentence}</p>
          <Link href="/contact#quote" className="btn btn-primary mt-8 ring-1 ring-white/25">
            Request a quote
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
