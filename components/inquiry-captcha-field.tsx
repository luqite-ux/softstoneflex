'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  createInquiryCaptchaScope,
  createLatestCaptchaRequestController,
} from '@/lib/inquiry-captcha-scope'

type CaptchaResponse = {
  svg: string
  token: string
  expiresAt: number
}

type InquiryCaptchaFieldProps = {
  tokenName?: string
  answerName?: string
  scopeName?: string
  refreshKey?: number
}

export function InquiryCaptchaField({
  tokenName = 'captchaToken',
  answerName = 'captchaAnswer',
  scopeName = 'captchaScope',
  refreshKey = 0,
}: InquiryCaptchaFieldProps) {
  const [scope] = useState(() => createInquiryCaptchaScope())
  const [requests] = useState(() => createLatestCaptchaRequestController())
  const [challenge, setChallenge] = useState<CaptchaResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    const request = requests.begin()
    setLoading(true)
    setError('')
    setChallenge(null)
    try {
      const response = await fetch(`/api/captcha?scope=${encodeURIComponent(scope)}`, {
        cache: 'no-store',
        signal: request.signal,
      })
      if (!response.ok) throw new Error('captcha unavailable')
      const body = (await response.json()) as CaptchaResponse
      if (!body.svg || !body.token) throw new Error('invalid captcha response')
      if (!requests.isCurrent(request)) return
      setChallenge(body)
    } catch {
      if (!requests.isCurrent(request)) return
      setError('The code could not be loaded. Request a new one.')
    } finally {
      if (requests.isCurrent(request)) setLoading(false)
    }
  }, [requests, scope])

  useEffect(() => {
    void refresh()
    return () => requests.abortCurrent()
  }, [refresh, refreshKey, requests])

  return (
    <div>
      <label htmlFor={answerName} className="grid gap-1 text-sm font-semibold">
        Verification code
        <span className="flex flex-wrap items-center gap-3 font-normal">
          <span className="flex h-14 w-40 items-center justify-center overflow-hidden border border-line bg-white">
            {challenge ? (
              // The SVG is generated from a fixed server-side template and rendered as an image, not injected as HTML.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(challenge.svg)}`}
                alt="4-character verification code"
                width={160}
                height={56}
              />
            ) : (
              <span className="px-2 text-center text-xs text-ink-soft">{loading ? 'Loading…' : 'Unavailable'}</span>
            )}
          </span>
          <input type="hidden" name={scopeName} value={scope} />
          <input type="hidden" name={tokenName} value={challenge?.token ?? ''} />
          <input
            key={challenge?.token ?? refreshKey}
            id={answerName}
            name={answerName}
            type="text"
            required
            disabled={!challenge}
            minLength={4}
            maxLength={4}
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            inputMode="text"
            aria-describedby={error ? `${answerName}-error` : undefined}
            className="h-11 w-32 border border-line bg-white px-3 uppercase tracking-[0.25em] disabled:cursor-not-allowed disabled:bg-sand"
            placeholder="Code"
          />
          <button type="button" onClick={() => void refresh()} disabled={loading} className="h-11 border border-line bg-white px-3 text-sm font-semibold disabled:opacity-60">
            New code
          </button>
        </span>
      </label>
      {error ? (
        <p id={`${answerName}-error`} role="alert" className="mt-2 text-sm text-[#8A2E24]">
          {error}
        </p>
      ) : null}
    </div>
  )
}
