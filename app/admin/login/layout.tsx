export const metadata = { title: 'Admin login', robots: { index: false, follow: false } }

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-plaster px-5 py-16 text-ink">
      <style>{`
        .hq-login { max-width: 28rem; margin: 0 auto; border: 1px solid #d6cbbb; background: #f3eee6; padding: 2rem; }
        .hq-login h1 { font-family: var(--font-newsreader), Georgia, serif; font-size: 2.25rem; }
        .hq-login label { display: grid; gap: 0.35rem; margin-top: 1rem; font-size: 0.875rem; font-weight: 600; }
        .hq-login input { height: 2.75rem; border: 1px solid #d6cbbb; background: white; padding: 0 0.75rem; font-weight: 400; }
        .hq-login button { margin-top: 1.25rem; height: 2.75rem; width: 100%; background: #1c1916; color: #f3eee6; font-weight: 600; }
        .hq-form-err { margin-top: 1rem; color: #8A2E24; font-size: 0.875rem; }
      `}</style>
      {children}
    </div>
  )
}
