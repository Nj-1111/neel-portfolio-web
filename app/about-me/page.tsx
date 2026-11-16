import { api, AboutArticle } from '@/lib/api'
import { Article, hasArticle } from '@/components/Article'

export const metadata = { title: 'About Me — Neel Bose' }

export default async function AboutMePage() {
  let article: Partial<AboutArticle> = {}
  try {
    article = await api.get('/api/about/me')
  } catch {
    /* API unreachable — fall through to the empty state */
  }

  return (
    <main className="max-w-[1160px] mx-auto px-6 py-16">
      <div className="text-xs font-bold text-accent mb-3 tracking-wide">
        $ cat about-me.md
        <span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink ml-1" />
      </div>

      {hasArticle(article) ? (
        <Article article={article} />
      ) : (
        <>
          <h1 className="font-extrabold text-3xl uppercase tracking-tight mb-6">About Me</h1>
          <p className="text-dim max-w-[60ch]">
            Nothing here yet. Write this page in the admin portal under About Me.
          </p>
        </>
      )}
    </main>
  )
}
