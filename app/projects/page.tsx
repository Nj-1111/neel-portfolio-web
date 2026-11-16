import { getList, assetUrl, Project } from '@/lib/api'

export const metadata = { title: 'Projects — Neel Bose' }

export default async function ProjectsPage() {
  const items = await getList<Project>('/api/projects/')

  return (
    <main className="max-w-[1160px] mx-auto px-6 py-16">
      <div className="text-xs font-bold text-accent mb-3 tracking-wide">
        $ ls ./projects
        <span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink ml-1" />
      </div>
      <h1 className="font-extrabold text-3xl uppercase tracking-tight mb-10">Projects</h1>

      {items.length === 0 ? (
        <p className="text-dim">No projects yet.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {items.map((p) => (
            <article key={p.id} className="border-2 border-fg p-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {p.category && (
                  <span className="text-[11px] font-extrabold uppercase tracking-wide text-accent">
                    {p.category}
                  </span>
                )}
                {p.pinned && (
                  <span className="text-[11px] font-extrabold bg-accent text-bg px-2 py-0.5">
                    PINNED
                  </span>
                )}
              </div>

              <h2 className="font-extrabold text-xl mb-3">{p.title}</h2>

              {p.desc && (
                <p className="text-sm text-dim leading-relaxed mb-4 max-w-[70ch]">{p.desc}</p>
              )}

              {p.techs && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.techs.split(',').map((t) => t.trim()).filter(Boolean).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-bold border border-subtle px-2 py-1 text-dim"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {(p.links?.length > 0 || p.attachments?.length > 0) && (
                <div className="flex flex-wrap gap-3">
                  {p.links?.filter((l) => l.url).map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-accent hover:underline"
                    >
                      {l.label || l.url} ↗
                    </a>
                  ))}
                  {p.attachments?.filter((a) => a.url).map((a) => (
                    <a
                      key={a.url}
                      href={assetUrl(a.url!)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-dim hover:text-accent hover:underline"
                    >
                      {a.fileName} ↗
                    </a>
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
