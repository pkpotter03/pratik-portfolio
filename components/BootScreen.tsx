'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BOOT_LINES } from '@/lib/data'
import type { BootLine } from '@/types'

interface BootScreenProps {
  onComplete: () => void
}

const lineColor: Record<BootLine['type'], string> = {
  ok: '#00ff41',
  warn: '#ffb000',
  err: '#ff2244',
  blank: '#00ff41',
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const onCompleteRef = useRef(onComplete)
  const [hiding, setHiding] = useState(false)

  // Keep ref in sync without re-running the animation effect
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title glitch-in
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -30, skewX: -5 },
        { opacity: 1, x: 0, skewX: 0, duration: 0.5, ease: 'power3.out' }
      )

      // Progress bar
      const lastDelay = BOOT_LINES[BOOT_LINES.length - 1].delay
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: lastDelay / 1000, ease: 'power1.inOut' }
      )

      // Stagger boot lines in with GSAP
      BOOT_LINES.forEach((line, i) => {
        const el = linesRef.current[i]
        if (!el) return

        gsap.set(el, { opacity: 0, x: -10 })

        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.2,
          delay: line.delay / 1000,
          ease: 'power2.out',
          onStart: () => {
            // Flash effect for warn lines
            if (line.type === 'warn') {
              gsap.fromTo(
                el,
                { backgroundColor: 'rgba(255,176,0,0.15)' },
                { backgroundColor: 'transparent', duration: 0.5 }
              )
            }
          },
        })
      })

      // Dismiss sequence
      const dismissAt = (lastDelay + 800) / 1000

      gsap.delayedCall(dismissAt, () => {
        setHiding(true)
        // Cinematic fade-out: lines scatter
        const allLines = linesRef.current.filter(Boolean)
        gsap.to(allLines, {
          opacity: 0,
          x: () => gsap.utils.random(-40, 40),
          y: () => gsap.utils.random(-20, 20),
          duration: 0.4,
          stagger: 0.02,
          ease: 'power2.in',
        })

        gsap.to(titleRef.current, {
          opacity: 0,
          scale: 1.1,
          duration: 0.5,
          ease: 'power2.in',
        })

        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          delay: 0.4,
          onComplete: () => onCompleteRef.current(),
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, []) // stable — onComplete accessed via ref

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-[9999] flex flex-col justify-center items-start px-5 sm:px-16 py-12"
    >
      {/* CRT vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <div
        ref={titleRef}
        className="font-vt text-2xl sm:text-4xl text-green mb-6 relative z-10"
        style={{ textShadow: '0 0 20px #00ff41' }}
      >
        PRATIK.SYS v3.0 — INITIALIZING
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md h-px mb-6 relative z-10" style={{ background: '#003d0d' }}>
        <div
          ref={progressRef}
          className="h-full bg-green"
          style={{ boxShadow: '0 0 8px #00ff41', transformOrigin: 'left' }}
        />
      </div>

      <div className="flex flex-col gap-0 relative z-10">
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            ref={(el) => { linesRef.current[i] = el }}
            className="font-mono text-xs sm:text-sm leading-relaxed whitespace-normal sm:whitespace-nowrap"
            style={{ color: lineColor[line.type] }}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  )
}
