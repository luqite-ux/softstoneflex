'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/site'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-plaster">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" aria-label="CESELAVE, go to Home" className="flex shrink-0 items-center">
          <Image
            src="/images/ceselave-logo.jpg"
            alt="CESELAVE logo"
            width={1024}
            height={493}
            priority
            className="h-14 w-auto object-contain mix-blend-multiply"
          />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative block px-3.5 py-2 text-[0.9375rem] font-medium text-ink transition-colors hover:text-oak-deep',
                      'after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:bg-oak after:transition-transform after:duration-200 after:origin-left',
                      active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact#quote" className="btn btn-primary hidden h-11 sm:inline-flex">
            Request a quote
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-ink text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn('border-t border-line bg-plaster lg:hidden', open ? 'block' : 'hidden')}
      >
        <ul className="mx-auto max-w-7xl px-5 py-3 sm:px-8">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href)
            return (
              <li key={link.href} className="border-b border-line last:border-b-0">
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn('flex h-12 items-center text-base font-medium', active ? 'text-oak-deep' : 'text-ink')}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
          <li className="py-3">
            <Link href="/contact#quote" className="btn btn-primary w-full">
              Request a quote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
