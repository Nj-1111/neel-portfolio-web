import Link from 'next/link'

const NAV_LINKS = [
  { href: '/about-me', label: 'about me' },
  { href: '/projects', label: 'projects' },
  { href: '/experience', label: 'experience' },
  { href: '/certifications', label: 'certifications' },
  { href: '/education', label: 'education' },
  { href: '/resume', label: 'resume' },
  { href: '/contact', label: 'contact' },
]

export function Navbar() {
  return (
    <header className="border-b-2 border-fg bg-bg sticky top-0 z-50">
      <div className="max-w-[1160px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="font-extrabold text-base min-h-[44px] flex items-center">
          <span className="text-accent">~/</span>neel-bose
        </Link>
        <nav aria-label="Sections" className="flex flex-wrap gap-1">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="navl">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
