import type { ReactNode } from 'react'

interface PageIntroProps {
  eyebrow: string
  title: string
  lead: string
  children?: ReactNode
}

export function PageIntro({ eyebrow, title, lead, children }: PageIntroProps) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{lead}</p>
        {children}
      </div>
    </section>
  )
}
