import { PRODUCTS, type CatalogImage, type Product, type Spec } from '@/lib/catalog'
import { getSupabase, tenantId } from '@/lib/supabase'

type ProductRow = {
  slug: string
  name: string | null
  name_i18n: Record<string, string> | null
  description: string | null
  description_i18n: Record<string, string> | null
  features_i18n: { en?: string[] } | null
  applications_i18n: { en?: string[] } | null
  specs: Spec[] | Record<string, string> | null
  image_url: string | null
  category_slug: string | null
  is_active: boolean
  sort_order: number | null
  extra_data: { group?: Product['group']; metaTitle?: string; metaDescription?: string } | null
}

function textOf(i18n: Record<string, string> | null | undefined, plain: string | null) {
  return i18n?.en || plain || ''
}

function paragraphs(value: string, fallback: string[]) {
  const parts = value.split(/\n+/).map((part) => part.trim()).filter(Boolean)
  return parts.length ? parts : fallback
}

function specList(value: ProductRow['specs'], fallback: Spec[]): Spec[] {
  if (Array.isArray(value) && value.length && value.every((item) => item && item.label && item.value)) return value
  if (value && !Array.isArray(value)) {
    const entries = Object.entries(value).filter(([, item]) => item)
    if (entries.length) return entries.map(([label, item]) => ({ label, value: String(item) }))
  }
  return fallback
}

function withRemoteImage(image: CatalogImage | undefined, imageUrl: string | null) {
  if (!imageUrl?.startsWith('https://')) return image
  if (!image) return { src: imageUrl, alt: '', width: 1200, height: 900 }
  return { src: imageUrl, alt: image.alt, width: image.width, height: image.height }
}

function overlay(local: Product, row: ProductRow): Product {
  const name = textOf(row.name_i18n, row.name) || local.name
  const description = paragraphs(textOf(row.description_i18n, row.description), local.description)
  const highlights = row.features_i18n?.en?.length ? row.features_i18n.en : local.highlights
  const applications = row.applications_i18n?.en?.length ? row.applications_i18n.en : local.applications
  return {
    ...local,
    name,
    summary: description[0] || local.summary,
    description,
    highlights,
    applications,
    specs: specList(row.specs, local.specs),
    image: local.image ?? withRemoteImage(undefined, row.image_url),
    metaTitle: row.extra_data?.metaTitle || local.metaTitle,
    metaDescription: row.extra_data?.metaDescription || local.metaDescription,
    group: row.extra_data?.group || local.group,
  }
}

function fromRow(row: ProductRow): Product {
  const description = paragraphs(textOf(row.description_i18n, row.description), ['Details are confirmed with the quotation.'])
  const image = row.image_url?.startsWith('https://')
    ? { src: row.image_url, alt: textOf(row.name_i18n, row.name), width: 1200, height: 900 }
    : undefined
  return {
    slug: row.slug,
    locale: 'en',
    group: row.extra_data?.group || (row.category_slug === 'acoustic-panels' ? 'acoustic' : 'surface'),
    name: textOf(row.name_i18n, row.name) || row.slug,
    summary: description[0],
    description,
    highlights: row.features_i18n?.en || [],
    specs: specList(row.specs, []),
    applications: row.applications_i18n?.en || [],
    image,
    metaTitle: row.extra_data?.metaTitle || textOf(row.name_i18n, row.name) || row.slug,
    metaDescription: row.extra_data?.metaDescription || description[0],
  }
}

export async function getProducts(): Promise<Product[]> {
  const supabase = getSupabase()
  const id = tenantId()
  if (!supabase || !id) return PRODUCTS
  const { data, error } = await supabase
    .from('products')
    .select('slug, name, name_i18n, description, description_i18n, features_i18n, applications_i18n, specs, image_url, category_slug, is_active, sort_order, extra_data')
    .eq('tenant_id', id)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
  if (error || !data?.length) return PRODUCTS
  const rows = data as ProductRow[]
  const bySlug = new Map(rows.map((row) => [row.slug, row]))
  const merged = PRODUCTS.map((product) => (bySlug.has(product.slug) ? overlay(product, bySlug.get(product.slug)!) : product))
  for (const row of rows) {
    if (!PRODUCTS.some((product) => product.slug === row.slug)) merged.push(fromRow(row))
  }
  return merged
}

export async function getProduct(slug: string) {
  const products = await getProducts()
  return products.find((product) => product.slug === slug) ?? null
}
