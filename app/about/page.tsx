import { api, AboutArticle } from '@/lib/api'
import { Article, hasArticle } from '@/components/Article'

export const metadata = { title: 'About this site — Neel Bose' }

/** Shown until an article is written in the admin portal. */
function DefaultAbout() {
  return (
    <div className="max-w-[60ch] flex flex-col gap-6 text-[15px] leading-relaxed text-dim">
      <p>
        Built with <span className="text-fg font-bold">Next.js 14</span> and{' '}
        <span className="text-fg font-bold">Tailwind CSS</span>, backed by a{' '}
        <span className="text-fg font-bold">FastAPI</span> API and{' '}
        <span className="text-fg font-bold">SQLite</span> database.
      </p>
      <p>
        Content is managed through a private admin portal — a terminal-aesthetic CRUD dashboard
        that lets me add projects, update experience, and manage certifications without touching code.
      </p>
      <p>
        Typography is <span className="text-fg font-bold">JetBrains Mono</span>.
        Design language: dark terminal, neobrutalist borders, accent{' '}
        <span className="text-accent font-bold">#D7FF00</span>.
      </p>
    </div>
  )
}

export default async function AboutPage() {
  let article: Partial<AboutArticle> = {}
  try {
    article = await api.get('/api/about/site')
  } catch {
    /* API unreachable — fall through to the default copy */
  }

  return (
    <main className="max-w-[1160px] mx-auto px-6 py-16">
      <div className="text-xs font-bold text-accent mb-3 tracking-wide">
        $ cat about-site.md
        <span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink ml-1" />
      </div>

      {hasArticle(article) ? (
        <Article article={article} />
      ) : (
        <>
          <h1 className="font-extrabold text-3xl uppercase tracking-tight mb-10">About this site</h1>
          <DefaultAbout />
        </>
      )}
    </main>
  )
}
