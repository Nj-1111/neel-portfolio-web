import { api, getList, ContactMethod } from '@/lib/api'
import { ContactForm } from '@/components/ContactForm'

export const metadata = { title: 'Contact — Neel Bose' }

export default async function ContactPage() {
  const methods = await getList<ContactMethod>('/api/contact/methods')

  let tagline = ''
  try {
    const info = await api.get('/api/contact/info')
    tagline = info?.tagline ?? ''
  } catch {
    /* API unreachable — the form still renders */
  }

  return (
    <main className="max-w-[1160px] mx-auto px-6 py-16">
      <div className="text-xs font-bold text-accent mb-3 tracking-wide">
        $ ./contact --send
        <span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink ml-1" />
      </div>
      <h1 className="font-extrabold text-3xl uppercase tracking-tight mb-6">Contact</h1>

      {tagline && (
        <p className="max-w-[60ch] text-[15px] leading-relaxed text-dim mb-10 whitespace-pre-wrap">
          {tagline}
        </p>
      )}

      {methods.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 max-w-[700px] mb-12">
          {methods.map((m) => (
            <div key={m.id} className="border-2 border-subtle px-4 py-3">
              <div className="text-[11px] font-extrabold uppercase tracking-wide text-dim mb-1">
                {m.label}
              </div>
              {m.url ? (
                <a
                  href={m.url}
                  target={m.url.startsWith('http') ? '_blank' : undefined}
                  rel={m.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-sm font-bold text-accent hover:underline break-all"
                >
                  {m.value}
                </a>
              ) : (
                <div className="text-sm font-bold break-all">{m.value}</div>
              )}
            </div>
          ))}
        </div>
      )}

      <ContactForm />
    </main>
  )
}
