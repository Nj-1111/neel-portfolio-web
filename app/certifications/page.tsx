import { getList, Certification } from '@/lib/api'

export const metadata = { title: 'Certifications — Neel Bose' }

export default async function CertificationsPage() {
  const items = await getList<Certification>('/api/certifications/')

  return (
    <main className="max-w-[1160px] mx-auto px-6 py-16">
      <div className="text-xs font-bold text-accent mb-3 tracking-wide">
        $ certs --list
        <span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink ml-1" />
      </div>
      <h1 className="font-extrabold text-3xl uppercase tracking-tight mb-10">Certifications</h1>

      {items.length === 0 ? (
        <p className="text-dim">No certifications yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <article key={item.id} className="border-2 border-fg p-6 shadow-[4px_4px_0_#D7FF00]">
              {item.badge && (
                <div className="inline-block text-[11px] font-extrabold uppercase tracking-wide
                                bg-accent text-bg px-2 py-0.5 mb-3">
                  {item.badge}
                </div>
              )}
              <div className="font-extrabold text-lg mb-1">{item.name}</div>
              {item.credential_id && (
                <div className="text-xs text-dim break-all">
                  Credential ID: <span className="text-fg">{item.credential_id}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
