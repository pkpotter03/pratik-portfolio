'use client'

import { useEffect, useRef, useState } from 'react'

interface SkillBarProps {
  name: string
  pct: number
}

export default function SkillBar({ name, pct }: SkillBarProps) {
  const [width, setWidth] = useState(0)
  const rowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(pct), 100 + Math.random() * 300)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [pct])

  return (
    <div
      ref={rowRef}
      className="grid gap-2 md:gap-4 items-center py-1 hover:bg-green/5 transition-colors duration-200"
      style={{ gridTemplateColumns: 'minmax(80px, 130px) 1fr 44px' }}
    >
      <span className="font-mono text-sm text-green truncate">{name}</span>

      <div className="h-4 overflow-hidden" style={{ background: '#001a00' }}>
        <div
          className="h-full relative transition-[width] ease-out"
          style={{
            width: `${width}%`,
            transitionDuration: '1.5s',
            background: 'linear-gradient(to right, #003d0d, #00ff41)',
          }}
        >
          {/* Glowing tip */}
          <span
            className="absolute right-0 top-0 w-0.5 h-full bg-green"
            style={{ boxShadow: '0 0 6px #00ff41' }}
          />
        </div>
      </div>

      <span className="font-mono text-xs text-amber text-right">{pct}%</span>
    </div>
  )
}
