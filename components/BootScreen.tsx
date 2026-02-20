'use client'

import { useEffect, useState } from 'react'
import { BOOT_LINES } from '@/lib/data'
import type { BootLine } from '@/types'

interface BootScreenProps {
  onComplete: () => void
}

const lineColor: Record<BootLine['type'], string> = {
  ok: 'text-green',
  warn: 'text-amber',
  err: 'text-hacker-red',
  blank: 'text-green',
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visible, setVisible] = useState<boolean[]>([])
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisible((prev) => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, line.delay + 50)
    })

    // Dismiss after all lines + small pause
    const lastDelay = BOOT_LINES[BOOT_LINES.length - 1].delay
    const dismissAt = lastDelay + 800

    setTimeout(() => setHiding(true), dismissAt)
    setTimeout(() => onComplete(), dismissAt + 800)
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 bg-black z-[9999] flex flex-col justify-center items-start px-16 py-12 transition-opacity duration-700 ${
        hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="font-vt text-4xl text-green mb-6" style={{ textShadow: '0 0 20px #00ff41' }}>
        PRATIK.SYS v2.0 — INITIALIZING
      </div>

      <div className="flex flex-col gap-0">
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            className={`font-mono text-sm leading-relaxed whitespace-nowrap transition-opacity duration-150 ${
              lineColor[line.type]
            } ${visible[i] ? 'opacity-100' : 'opacity-0'}`}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  )
}
