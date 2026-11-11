import bcrypt from 'bcryptjs'
import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE } from '@/lib/admin-session'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
const SESSION_DAYS = 14

function loginError(request: NextRequest, message: string) {
  const url = new URL('/admin/login', request.url)
  url.searchParams.set('error', message)
  return NextResponse.redirect(url, 303)
}

export async function POST(request: NextRequest) {
  let email = ''
  let password = ''
  try {
    const form = await request.formData()
    email = String(form.get('email') || '').trim().toLowerCase()
    password = String(form.get('password') || '')
  } catch {
    return loginError(request, 'The request could not be read.')
  }
  if (!email || !password) return loginError(request, 'Enter the email and password.')

  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!tenantId) return loginError(request, 'This site has no tenant configured.')
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()) return loginError(request, 'Sign-in is not configured.')

  const supabase = createAdminClient()
  const { data: user, error } = await supabase
    .from('admin_users')
    .select('id, email, password_hash, is_active, tenant_id')
    .eq('email', email)
    .eq('tenant_id', tenantId)
    .single()

  if (error || !user?.is_active) return loginError(request, 'The email or password is incorrect.')
  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) return loginError(request, 'The email or password is incorrect.')

  const token = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000)
  const { error: insertErr } = await supabase.from('admin_user_sessions').insert({
    admin_user_id: user.id,
    token,
    expires_at: expiresAt.toISOString(),
    ip: request.headers.get('x-forwarded-for') || '',
    user_agent: request.headers.get('user-agent') || '',
  })
  if (insertErr) return loginError(request, 'Sign-in failed. Try again.')

  await supabase.from('admin_users').update({ last_login_at: new Date().toISOString() }).eq('id', user.id)

  const response = NextResponse.redirect(new URL('/admin', request.url), 303)
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    expires: expiresAt,
    path: '/',
  }
  response.cookies.set(SESSION_COOKIE, token, cookieOptions)
  response.cookies.set('hq_tenant_id', tenantId, cookieOptions)
  return response
}
