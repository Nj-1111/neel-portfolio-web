import { getList, ExperienceItem } from '@/lib/api'

export const metadata = { title: 'Experience — Neel Bose' }

export default async function ExperiencePage() {
  const items = await getList<ExperienceItem>('/api/experience/')

  return (
    <main className="max-w-[1160px] mx-auto px-6 py-16">
      <div className="text-xs font-bold text-accent mb-3 tracking-wide">
        $ cat experience.json
        <span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink ml-1" />
      </div>
      <h1 className="font-extrabold text-3xl uppercase tracking-tight mb-10">Experience</h1>

      {items.length === 0 ? (
        <p className="text-dim">No experience entries yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {items.map((item) => (
            <article key={item.id} className="border-2 border-fg p-6">
              <div className="flex flex-wrap justify-between gap-2 mb-1">
                <div>
                  <span className="font-extrabold text-xl">{item.role}</span>
                  <span className="text-dim ml-2">@ {item.company}</span>
                </div>
                <span className="text-dim text-sm font-bold">{item.period}</span>
              </div>
              {item.location && (
                <div className="text-dim text-sm mb-4">{item.location}</div>
              )}

              {item.highlights?.length > 0 && (
                <div className="flex flex-col gap-5 mt-4">
                  {item.highlights.map((hl, i) => (
                    <div key={i} className="border-l-[3px] border-subtle pl-4">
                      {hl.title && (
                        <div className="font-bold text-sm mb-1.5">{hl.title}</div>
                      )}
                      {hl.desc && (
                        <p className="text-sm text-dim leading-relaxed mb-3">{hl.desc}</p>
                      )}
                      {hl.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {hl.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs font-bold border border-subtle px-2 py-1 text-dim"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
