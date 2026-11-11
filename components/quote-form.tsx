'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { InquiryCaptchaField } from '@/components/inquiry-captcha-field'
import { PRODUCTS } from '@/lib/catalog'

export function QuoteForm() {
  const params = useSearchParams()
  const initialProduct = params.get('product') ?? ''
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const products = useMemo(() => PRODUCTS, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const required = ['name', 'email', 'message', 'captchaAnswer']
    if (required.some((key) => !String(data.get(key) ?? '').trim())) {
      setError('Add your name, email, project note and the 4-character code.')
      setSent(false)
      return
    }
    setPending(true)
    setError('')
    setSent(false)
    try {
      const response = await fetch('/api/inquiry', { method: 'POST', body: data })
      const body = (await response.json().catch(() => ({}))) as { error?: string }
      if (!response.ok) {
        setError(body.error || 'Could not send the request.')
        setRefreshKey((value) => value + 1)
        return
      }
      form.reset()
      setSent(true)
      setRefreshKey((value) => value + 1)
    } catch {
      setError('Could not send the request.')
      setRefreshKey((value) => value + 1)
    } finally {
      setPending(false)
    }
  }

  return (
    <form id="quote" onSubmit={onSubmit} className="grid gap-4 border border-line bg-plaster p-6" noValidate>
      <label className="grid gap-1 text-sm font-semibold">
        Name
        <input name="name" className="h-11 border border-line px-3 font-normal" autoComplete="name" />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Company
        <input name="company" className="h-11 border border-line px-3 font-normal" autoComplete="organization" />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Email
        <input name="email" type="email" className="h-11 border border-line px-3 font-normal" autoComplete="email" />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Phone
        <input name="phone" className="h-11 border border-line px-3 font-normal" autoComplete="tel" />
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Product
        <select name="product" defaultValue={initialProduct} className="h-11 border border-line px-3 font-normal">
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.slug} value={product.slug}>
              {product.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm font-semibold">
        Project note
        <textarea name="message" rows={5} className="border border-line px-3 py-2 font-normal" />
      </label>
      <InquiryCaptchaField refreshKey={refreshKey} />
      {error ? <p className="text-sm text-[#8A2E24]">{error}</p> : null}
      {sent ? <p className="text-sm text-[#1F6B3A]">Your request has been sent. We will reply by email.</p> : null}
      <button type="submit" className="btn btn-primary" disabled={pending}>
        {pending ? 'Sending…' : 'Send quote request'}
      </button>
    </form>
  )
}
