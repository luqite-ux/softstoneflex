import Image from 'next/image'
import Link from 'next/link'
import { CrescentMark } from '@/components/crescent-mark'
import { FooterLegal } from '@/components/footer-legal'
import { getProducts } from '@/lib/products-db'
import { NAV_LINKS, SITE } from '@/lib/site'

export async function SiteFooter() {
  const products = await getProducts()
  return (
    <footer className="on-dark bg-felt text-plaster">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Link
            href="/"
            aria-label="CESELAVE, go to Home"
            className="block w-full max-w-sm bg-plaster p-5"
          >
            <Image
              src="/images/ceselave-logo.jpg"
              alt="CESELAVE logo"
              width={1024}
              height={493}
              className="h-auto max-h-36 w-full object-contain mix-blend-multiply"
            />
          </Link>
          <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-[#D9D0C2]">{SITE.summary}</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#E8C9A6]">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-[0.9375rem] text-plaster hover:text-[#E8C9A6]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#E8C9A6]">Products</h2>
          <ul className="mt-4 space-y-2.5">
            {products.map((product) => (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`} className="text-[0.9375rem] text-plaster hover:text-[#E8C9A6]">
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-[#E8C9A6]">Contact</h2>
          <address className="mt-4 space-y-2.5 text-[0.9375rem] not-italic text-plaster">
            <p>
              <a href={`mailto:${SITE.email}`} className="hover:text-[#E8C9A6]">
                {SITE.email}
              </a>
            </p>
            <p>
              <a href={SITE.phoneHref} className="hover:text-[#E8C9A6]">
                {SITE.phone}
              </a>
            </p>
            <p className="text-[#D9D0C2]">
              {SITE.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-6 sm:px-8">
          <CrescentMark className="size-4 shrink-0" />
          <FooterLegal />
        </div>
      </div>
    </footer>
  )
}
