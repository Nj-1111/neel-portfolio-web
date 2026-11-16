import { api, assetUrl, ResumeData } from '@/lib/api'

export const metadata = { title: 'Resume — Neel Bose' }

export default async function ResumePage() {
  let resume: Partial<ResumeData> = {}
  try {
    resume = await api.get('/api/resume/')
  } catch {
    /* API unreachable — fall through to the empty state */
  }

  const pdf = resume.file_url ? assetUrl(resume.file_url) : ''
  const hasContent = Boolean(resume.content?.trim())

  return (
    <main className="max-w-[1160px] mx-auto px-6 py-16">
      <div className="text-xs font-bold text-accent mb-3 tracking-wide">
        $ open resume.pdf
        <span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink ml-1" />
      </div>
      <h1 className="font-extrabold text-3xl uppercase tracking-tight mb-10">Resume</h1>

      {!pdf && !hasContent ? (
        <p className="text-dim">Resume not uploaded yet.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {pdf && (
            <a href={pdf} target="_blank" rel="noopener noreferrer" className="btn btn-accent w-fit">
              Download Resume ↗
            </a>
          )}

          {hasContent && (
            <div className="max-w-[80ch] text-[15px] leading-relaxed text-dim whitespace-pre-wrap
                            border-2 border-fg p-6">
              {resume.content}
            </div>
          )}

          {pdf && (
            <iframe
              src={pdf}
              className="w-full border-2 border-fg"
              style={{ height: '80vh' }}
              title="Resume PDF"
            />
          )}
        </div>
      )}
    </main>
  )
}
