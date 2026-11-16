import Link from 'next/link'

const ITEMS = [
  { idx: '01', label: 'about me', href: '/about-me' },
  { idx: '02', label: 'projects', href: '/projects' },
  { idx: '03', label: 'experience', href: '/experience' },
  { idx: '04', label: 'certifications', href: '/certifications' },
  { idx: '05', label: 'education', href: '/education' },
  { idx: '06', label: 'resume', href: '/resume' },
]

export function NavMenu() {
  return (
    <div className="max-w-[1160px] mx-auto px-6 pt-16 pb-10">
      <div className="text-xs font-bold text-accent mb-5 tracking-wide">
        $ ./navigate --select
        <span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink ml-1.5" />
      </div>
      <nav aria-label="Browse sections" className="border-t-2 border-fg">
        {ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-4 px-5 py-7 border-b-2 border-fg min-h-[44px]
                       group transition-colors duration-75 hover:bg-accent"
          >
            <span className="text-sm font-extrabold text-dim group-hover:text-bg transition-colors duration-75">
              {item.idx}
            </span>
            <span
              className="font-extrabold text-[clamp(26px,4.6vw,46px)] uppercase tracking-tight
                         text-fg flex-1 group-hover:text-bg transition-colors duration-75"
            >
              {item.label}
            </span>
            <span className="font-extrabold text-2xl text-bg opacity-0 -translate-x-2.5
                             group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-100">
              →
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
