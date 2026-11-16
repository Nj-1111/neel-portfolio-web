'use client'

import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const FIELDS = [
  { id: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { id: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { id: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
] as const

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)
    try {
      const res = await fetch(`${API}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        // surface the API's own validation message rather than a generic retry
        let message = `Request failed (${res.status})`
        try {
          const body = await res.json()
          if (typeof body?.detail === 'string') message = body.detail
          else if (Array.isArray(body?.detail) && body.detail.length) {
            message = body.detail
              .map((d: { loc?: string[]; msg?: string }) =>
                `${d.loc?.slice(1).join('.') ?? 'field'}: ${d.msg ?? 'invalid'}`)
              .join('; ')
          }
        } catch {
          /* non-JSON body — keep the status message */
        }
        throw new Error(message)
      }
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('idle')
      setError(
        err instanceof TypeError
          ? "Couldn't reach the server. Check your connection and try again."
          : (err as Error).message
      )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-[600px] flex flex-col gap-5">
      {FIELDS.map(({ id, label, type, autoComplete }) => (
        <div key={id} className="flex flex-col gap-1.5">
          <label htmlFor={id} className="text-xs font-extrabold uppercase tracking-wide text-dim">
            {label}
            {id !== 'subject' && <span className="text-accent ml-1">*</span>}
          </label>
          <input
            id={id}
            type={type}
            autoComplete={autoComplete}
            value={form[id]}
            onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
            required={id !== 'subject'}
            className="bg-bg border-2 border-fg text-fg px-3 py-2.5 font-mono text-sm
                       focus:outline-none focus:border-accent"
          />
        </div>
      ))}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-extrabold uppercase tracking-wide text-dim">
          Message<span className="text-accent ml-1">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
          className="bg-bg border-2 border-fg text-fg px-3 py-2.5 font-mono text-sm resize-y
                     focus:outline-none focus:border-accent"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn btn-accent w-fit disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>

      <div aria-live="polite">
        {status === 'sent' && (
          <p className="text-accent text-sm font-bold">
            Message sent. I&apos;ll get back to you soon.
          </p>
        )}
        {error && <p className="text-[#FF2E63] text-sm font-bold">{error}</p>}
      </div>
    </form>
  )
}
