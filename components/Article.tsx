import { assetUrl, AboutArticle } from '@/lib/api'

/** Renders a Medium-style article authored in the admin portal. */
export function Article({ article }: { article: Partial<AboutArticle> }) {
  const blocks = article.blocks ?? []

  return (
    <article className="max-w-[760px]">
      {article.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={assetUrl(article.cover_url)}
          alt=""
          className="w-full max-h-[320px] object-cover block border-2 border-fg mb-8"
        />
      )}

      {article.title && (
        <h1 className="font-extrabold text-3xl uppercase tracking-tight mb-4">{article.title}</h1>
      )}

      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-bold uppercase tracking-wide border-2 border-fg px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-7">
        {blocks.map((blk, i) =>
          blk.type === 'image' ? (
            <figure key={i} className="flex flex-col gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetUrl(blk.url ?? '')}
                alt={blk.caption || ''}
                className="w-full max-h-[420px] object-contain bg-surface border-2 border-fg"
              />
              {blk.caption && <figcaption className="text-xs text-dim">{blk.caption}</figcaption>}
            </figure>
          ) : (
            <p key={i} className="text-[17px] leading-[1.8] text-dim whitespace-pre-wrap">
              {blk.text}
            </p>
          )
        )}
      </div>
    </article>
  )
}

/** True when there is enough content to show the article instead of a fallback. */
export function hasArticle(a: Partial<AboutArticle>): boolean {
  return Boolean(a.title?.trim()) || (a.blocks?.length ?? 0) > 0
}
