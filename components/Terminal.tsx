'use client'

import { useState, useEffect, useRef } from 'react'

export interface TerminalLine { cmd: string; output: string[] }

export function Terminal({
  lines: source,
  title = 'neel@kolkata: ~',
}: {
  lines: TerminalLine[]
  title?: string
}) {
  const COMMANDS = source.map((l) => l.cmd)
  const OUTPUTS = source.map((l) => l.output ?? [])
  const [lineIndex, setLineIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [revealed, setRevealed] = useState<boolean[]>(() => COMMANDS.map(() => false))
  const [done, setDone] = useState(false)
  const live = useRef(true)

  useEffect(() => {
    live.current = true
    return () => { live.current = false }
  }, [])

  useEffect(() => {
    if (done || !live.current || COMMANDS.length === 0) return

    const full = COMMANDS[lineIndex] ?? ''
    if (charCount < full.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), 36)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => {
      if (!live.current) return
      setRevealed((r) => { const n = [...r]; n[lineIndex] = true; return n })
      const t2 = setTimeout(() => {
        if (!live.current) return
        if (lineIndex + 1 < COMMANDS.length) {
          setLineIndex((i) => i + 1)
          setCharCount(0)
        } else {
          setDone(true)
        }
      }, 420)
      return () => clearTimeout(t2)
    }, 200)

    return () => clearTimeout(t)
  }, [lineIndex, charCount, done])

  const lines = COMMANDS.map((cmd, i) => ({
    cmd: i < lineIndex ? cmd : i === lineIndex ? cmd.slice(0, charCount) : '',
    showCursor: i === lineIndex && !done,
    output: revealed[i] ? OUTPUTS[i] : [],
  }))

  return (
    <div className="bg-surface border-2 border-fg shadow-[8px_8px_0_#D7FF00] flex-1 min-w-[300px]">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-fg">
        <button tabIndex={-1} aria-hidden="true" className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <button tabIndex={-1} aria-hidden="true" className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <button tabIndex={-1} aria-hidden="true" className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-xs font-bold text-dim">{title}</span>
      </div>
      {/* body */}
      <div className="p-5 text-sm leading-loose min-h-[300px] flex flex-col">
        {lines.map((line, i) => (
          <div key={i} className="mb-2">
            <div>
              <span className="text-accent font-bold">$ </span>
              {line.cmd}
              {line.showCursor && (
                <span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink ml-0.5" />
              )}
            </div>
            {line.output.map((out, j) => (
              <div key={j} className="text-dim">{out}</div>
            ))}
          </div>
        ))}
        {done && (
          <div>
            <span className="text-accent font-bold">$ </span>
            <span className="inline-block w-[9px] h-4 bg-accent align-text-bottom animate-blink" />
          </div>
        )}
      </div>
    </div>
  )
}
