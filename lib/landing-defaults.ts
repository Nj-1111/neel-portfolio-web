import type { LandingContent } from './api'

/**
 * The landing page as originally written in code. This is the source of truth
 * whenever the API is unreachable or a field has been left blank in the admin,
 * so the front page can never render empty.
 */
export const LANDING_DEFAULTS: LandingContent = {
  badge: 'AVAILABLE FOR AWS · CLOUD · ML INFRA ROLES',
  role: 'AI Cloud Engineer',
  bio:
    'Final year engineer architecting cost-optimized ML workloads and highly available, ' +
    'multi-region infrastructure on AWS. I learn by breaking systems, then rebuilding ' +
    'them with decoupled architecture and pipelines.',
  socials: [
    { label: 'GitHub ↗', url: 'https://github.com/Nj-1111', accent: true },
    { label: 'Hugging Face ↗', url: 'https://huggingface.co/Nj-1111', accent: false },
    { label: 'Medium ↗', url: 'https://medium.com/@neelbosen.jr21', accent: false },
    { label: 'LinkedIn ↗', url: 'https://www.linkedin.com/in/neel-bose-545bb921a/', accent: false },
  ],
  terminal_title: 'neel@kolkata: ~',
  terminal_lines: [
    { cmd: 'whoami', output: ['neel bose — ai cloud engineer'] },
    { cmd: 'cat now.txt', output: ['AWS Cloud Engineer Intern', '@ Workmates Core2Cloud', 'since August 2026'] },
    { cmd: 'cat stack.txt', output: ['AWS · Terraform · Python · Docker', 'PyTorch · LangGraph · Linux'] },
    { cmd: 'certs --list', output: ['AWS Cloud Practitioner', 'AWS AI Practitioner'] },
  ],
  footer: '© 2026 NEEL BOSE · KOLKATA, INDIA',
}

/**
 * Overlays whatever the admin has saved on top of the defaults. A field that is
 * missing, blank, or an empty list keeps its default, so a partially-filled or
 * unreachable API degrades to the original page instead of a blank one.
 */
export function withLandingDefaults(saved: Partial<LandingContent> | null | undefined): LandingContent {
  const d = LANDING_DEFAULTS
  if (!saved) return d
  const text = (v: unknown, fallback: string) =>
    typeof v === 'string' && v.trim() ? v : fallback
  const list = <T,>(v: unknown, fallback: T[]) =>
    Array.isArray(v) && v.length ? (v as T[]) : fallback

  return {
    badge: text(saved.badge, d.badge),
    role: text(saved.role, d.role),
    bio: text(saved.bio, d.bio),
    socials: list(saved.socials, d.socials),
    terminal_title: text(saved.terminal_title, d.terminal_title),
    terminal_lines: list(saved.terminal_lines, d.terminal_lines),
    footer: text(saved.footer, d.footer),
  }
}
