'use client'

import { useEffect, useState } from 'react'

/**
 * The "scroll" hint at the bottom of the hero.
 *
 * It is only useful before the reader has worked out that the page scrolls, so
 * it fades out on the first scroll rather than riding along until the hero
 * happens to leave the viewport — on a short laptop screen that meant it bobbed
 * through most of the page.
 */
export function ScrollCue() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // already scrolled on load (refresh part-way down) — never show it
    if (window.scrollY > 24) {
      setHidden(true)
      return
    }
    const onScroll = () => {
      if (window.scrollY > 24) setHidden(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href="#navigate"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      className={`absolute left-1/2 bottom-5 -translate-x-1/2 flex flex-col items-center gap-2
                  font-extrabold text-[11px] tracking-[.2em] text-dim uppercase
                  hover:text-accent transition-[opacity,transform,color] duration-300
                  motion-safe:animate-bob
                  ${hidden ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100'}`}
    >
      <span>scroll</span>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-4 h-4">
        <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      </svg>
    </a>
  )
}
