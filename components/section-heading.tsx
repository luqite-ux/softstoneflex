import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  lead?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, lead, className }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>
      {lead ? <p className="mt-4 text-lg leading-relaxed text-ink-soft">{lead}</p> : null}
    </div>
  )
}
