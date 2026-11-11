'use client'

import { SITE } from '@/lib/site'

export function FooterLegal() {
  const year = new Date().getFullYear()
  return (
    <p className="text-sm text-[#D9D0C2]" suppressHydrationWarning>
      {`© ${year} ${SITE.legalName} All rights reserved.`}
    </p>
  )
}
