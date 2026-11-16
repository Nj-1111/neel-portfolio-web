import Link from 'next/link'
import { Terminal } from '@/components/Terminal'
import { NavMenu } from '@/components/NavMenu'
import { api, LandingContent } from '@/lib/api'
import { withLandingDefaults } from '@/lib/landing-defaults'

const ASCII = `\
███╗   ██╗███████╗███████╗██╗         ██████╗  ██████╗ ███████╗███████╗
████╗  ██║██╔════╝██╔════╝██║         ██╔══██╗██╔═══██╗██╔════╝██╔════╝
██╔██╗ ██║█████╗  █████╗  ██║         ██████╔╝██║   ██║███████╗█████╗
██║╚██╗██║██╔══╝  ██╔══╝  ██║         ██╔══██╗██║   ██║╚════██║██╔══╝
██║ ╚████║███████╗███████╗███████╗    ██████╔╝╚██████╔╝███████║███████╗
╚═╝  ╚═══╝╚══════╝╚══════╝╚══════╝    ╚═════╝  ╚═════╝ ╚══════╝╚══════╝`

export default async function Home() {
  // The page always renders its coded defaults; saved values only override
  // the fields that have actually been filled in.
  let landing: LandingContent = withLandingDefaults(null)
  try {
    landing = withLandingDefaults(await api.get('/api/landing/'))
  } catch {
    /* API unreachable — the defaults above already stand */
  }

  return (
    <main>
      {/* HERO */}
      <section className="min-h-[calc(100vh-66px)] flex items-center relative" id="top">
        <div className="max-w-[1160px] mx-auto px-6 py-10 flex flex-col gap-9 w-full">

          {/* availability badge + ASCII */}
          <div className="flex flex-col gap-4">
            {landing.badge && (
              <div className="bg-accent text-bg font-extrabold text-[13px] tracking-wider px-3 py-1.5 w-fit uppercase">
                {landing.badge}
              </div>
            )}
            <h1 aria-label="Neel Bose">
              <pre
                aria-hidden="true"
                className="font-mono font-extrabold text-fg whitespace-pre overflow-x-auto
                           text-[clamp(4px,1.95vw,22px)] leading-tight"
              >
                {ASCII}
              </pre>
            </h1>
          </div>

          {/* two-column: bio + terminal */}
          <div className="flex flex-wrap gap-12 items-start">
            <div className="flex-1 min-w-[300px] flex flex-col gap-6">
              <div className="font-extrabold text-2xl text-accent uppercase tracking-wide">
                {landing.role}
              </div>
              <p className="text-[17px] text-fg max-w-[56ch] leading-relaxed whitespace-pre-wrap">
                {landing.bio}
              </p>
              <div className="flex flex-wrap gap-4">
                {landing.socials.map((s) => (
                  <a
                    key={s.url}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${s.accent ? 'btn-accent' : 'text-fg'}`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <Terminal lines={landing.terminal_lines} title={landing.terminal_title} />
          </div>
        </div>

        {/* scroll cue */}
        <a
          href="#navigate"
          className="absolute left-1/2 bottom-5 -translate-x-1/2 flex flex-col items-center gap-2
                     font-extrabold text-[11px] tracking-[.2em] text-dim uppercase
                     animate-bob hover:text-accent transition-colors"
        >
          <span>scroll</span>
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="w-4 h-4">
            <path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
          </svg>
        </a>
      </section>

      {/* NAV MENU */}
      <section id="navigate">
        <NavMenu />
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-6 text-center text-xs font-bold text-dim flex flex-wrap items-center justify-center gap-2">
        <span>{landing.footer}</span>
        <span aria-hidden="true">·</span>
        <Link href="/about" className="underline underline-offset-2 hover:text-accent transition-colors min-h-[32px] inline-flex items-center">
          about this site
        </Link>
      </footer>
    </main>
  )
}
