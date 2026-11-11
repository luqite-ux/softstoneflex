import { useId } from 'react'

export function CrescentMark({ className = 'size-4' }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <defs>
        <mask id={id}>
          <rect width="100" height="100" fill="#000" />
          <circle cx="46" cy="50" r="44" fill="#fff" />
          <circle cx="90" cy="50" r="32" fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${id})`}>
        <rect width="100" height="50" fill="#ff3a1e" />
        <rect y="50" width="100" height="50" fill="#3a2bff" />
      </g>
    </svg>
  )
}
