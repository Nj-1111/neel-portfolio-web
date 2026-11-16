import { api, EducationItem } from '@/lib/api'

export const metadata = { title: 'Education — Neel Bose' }

export default async function EducationPage() {
  let items: EducationItem[] = []
  try { items = await api.get('/api/education') } catch {}

  return (
    <main className="max-w-[1160px] mx-auto px-6 py-16">
      <div className="text-xs font-bold text-accent mb-3 tracking-wide">
        $ cat education.json<span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink ml-1" />
      </div>
      <h1 className="font-extrabold text-3xl uppercase tracking-tight mb-10">Education</h1>

      {items.length === 0 ? (
        <p className="text-dim">No education entries yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <article key={item.id} className="border-2 border-fg p-6">
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <span className="font-extrabold text-xl">{item.degree}</span>
                <span className="text-dim text-sm font-bold">{item.period}</span>
              </div>
              <div className="text-dim font-bold mb-2">{item.school}</div>
              {item.notes && <p className="text-sm text-dim leading-relaxed">{item.notes}</p>}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
