const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Content is admin-driven and expected to appear as soon as it is saved, so
// pages read through without caching rather than sitting behind a revalidate
// window.
/** A wedged backend must never hang a page render, so every read is bounded.
 *  Callers already fall back to defaults or an empty state on throw. */
const READ_TIMEOUT_MS = 10_000

// A static export reads content once at build time; the dev server reads live
// so admin edits show up on reload.
const IS_EXPORT = process.env.STATIC_EXPORT === '1'

async function get(path: string) {
  const res = await fetch(`${API}${path}`, {
    cache: IS_EXPORT ? 'force-cache' : 'no-store',
    signal: AbortSignal.timeout(READ_TIMEOUT_MS),
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

async function post(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

async function put(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

async function del(path: string) {
  const res = await fetch(`${API}${path}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`API error: ${res.status}`)
  return res.json()
}

export const api = { get, post, put, del }

/** Uploaded assets are stored as API-relative paths. */
export const assetUrl = (url: string) => (url?.startsWith('/') ? `${API}${url}` : url)

/** Reads a list endpoint, falling back to [] when the API is unreachable so a
 *  page renders its empty state instead of a 500. */
export async function getList<T>(path: string): Promise<T[]> {
  try {
    const data = await get(path)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export interface Project {
  id: string
  category: string
  title: string
  desc: string
  techs: string
  links: { label: string; url: string }[]
  attachments: { fileName: string; url?: string }[]
  pinned: boolean
  sort_order: number
  created_at: string
}

export interface Highlight {
  title: string
  desc: string
  tags: string[]
}

export interface ExperienceItem {
  id: string
  role: string
  company: string
  location: string
  period: string
  highlights: Highlight[]
  pinned: boolean
  sort_order: number
}

export interface Certification {
  id: string
  badge: string
  name: string
  credential_id: string
  sort_order: number
}

export interface EducationItem {
  id: string
  degree: string
  school: string
  period: string
  notes: string
  sort_order: number
}

export interface ContactMethod {
  id: string
  label: string
  value: string
  url: string
  sort_order: number
}

export interface AboutBlock {
  type: 'paragraph' | 'image'
  text?: string
  url?: string
  caption?: string
}

export interface AboutArticle {
  cover_url: string
  title: string
  tags: string[]
  blocks: AboutBlock[]
}

export interface ResumeData {
  content: string
  file_url: string
}

export interface SocialLink {
  label: string
  url: string
  accent?: boolean
}

export interface TerminalLine {
  cmd: string
  output: string[]
}

export interface LandingContent {
  badge: string
  role: string
  bio: string
  socials: SocialLink[]
  terminal_title: string
  terminal_lines: TerminalLine[]
  footer: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}
