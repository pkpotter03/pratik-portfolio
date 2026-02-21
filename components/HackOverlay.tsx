'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { STOLEN_DATA, REVEAL_LINES } from '@/lib/data'

interface HackOverlayProps {
  onDismiss: () => void
}

export default function HackOverlay({ onDismiss }: HackOverlayProps) {
  const [phase, setPhase] = useState<'flooding' | 'redscreen' | 'reveal' | 'done'>('flooding')
  const [floodLines, setFloodLines] = useState<string[]>([])
  const [revealLines, setRevealLines] = useState<string[]>([])
  const [glitchActive, setGlitchActive] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const floodRef = useRef<HTMLDivElement>(null)
  const floodIdx = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Phase 1: flood lines rapidly
  useEffect(() => {
    // Start screen shaking immediately
    setGlitchActive(true)

    intervalRef.current = setInterval(() => {
      if (floodIdx.current >= STOLEN_DATA.length) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        // Brief pause then red screen
        setTimeout(() => setPhase('redscreen'), 300)
        return
      }
      const line = STOLEN_DATA[floodIdx.current]
      setFloodLines((prev) => [...prev, line])
      floodIdx.current++
    }, 80)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Auto-scroll flood
  useEffect(() => {
    if (floodRef.current) {
      floodRef.current.scrollTop = floodRef.current.scrollHeight
    }
  }, [floodLines])

  // Phase 2: red screen flash
  useEffect(() => {
    if (phase !== 'redscreen') return

    // Flash red 3 times then go to reveal
    let flashes = 0
    const flashInterval = setInterval(() => {
      setGlitchActive((v) => !v)
      flashes++
      if (flashes >= 6) {
        clearInterval(flashInterval)
        setGlitchActive(false)
        setTimeout(() => setPhase('reveal'), 400)
      }
    }, 150)

    return () => clearInterval(flashInterval)
  }, [phase])

  // Phase 3: reveal lines one by one
  useEffect(() => {
    if (phase !== 'reveal') return

    let i = 0
    const id = setInterval(() => {
      if (i >= REVEAL_LINES.length) {
        clearInterval(id)
        // Start dismiss countdown
        setCountdown(5)
        return
      }
      setRevealLines((prev) => [...prev, REVEAL_LINES[i]])
      i++
    }, 180)

    return () => clearInterval(id)
  }, [phase])

  // Countdown to auto-dismiss
  useEffect(() => {
    if (countdown === null) return
    if (countdown <= 0) { onDismiss(); return }
    const t = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, onDismiss])

  const bg = phase === 'redscreen' && glitchActive
    ? 'rgba(80,0,0,0.98)'
    : 'rgba(0,4,0,0.98)'

  return (
    <div
      className="fixed inset-0 z-[9990] flex flex-col overflow-hidden transition-colors duration-100"
      style={{
        background: bg,
        fontFamily: "'Share Tech Mono', monospace",
        animation: glitchActive && phase === 'flooding' ? 'hackShake 0.1s infinite' : 'none',
      }}
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.25) 0px, rgba(0,0,0,0.25) 1px, transparent 1px, transparent 3px)',
        }}
      />

      {/* SKULL header */}
      <div
        className="relative z-20 flex items-center justify-center gap-4 py-4 border-b-2"
        style={{ borderColor: phase === 'redscreen' ? '#ff2244' : '#ff2244', background: 'rgba(255,34,68,0.08)' }}
      >
        <span className="text-3xl">💀</span>
        <span
          className="font-mono font-bold tracking-[6px] text-lg"
          style={{
            color: '#ff2244',
            textShadow: '0 0 20px #ff2244, 0 0 40px #ff2244',
            animation: 'hackBlink 0.5s step-end infinite',
          }}
        >
          SYSTEM COMPROMISED
        </span>
        <span className="text-3xl">💀</span>
      </div>

      {/* Main content area */}
      <div className="relative z-20 flex-1 overflow-hidden flex flex-col">
        {(phase === 'flooding' || (phase === 'redscreen')) && (
          <div
            ref={floodRef}
            className="flex-1 overflow-y-auto p-4 md:p-6"
            style={{ scrollbarWidth: 'none' }}
          >
            {floodLines.map((line, i) => (
              <div
                key={i}
                className="text-xs md:text-sm leading-6"
                style={{
                  color: line.includes('VULNERABLE') || line.includes('ROOT') || line.includes('BACKDOOR')
                    ? '#ff2244'
                    : line.includes('✓') || line.includes('CAPTURED') || line.includes('GRANTED')
                    ? '#ffb000'
                    : line.includes('...') || line.includes('SCANNING') || line.includes('DUMP')
                    ? '#00ffff'
                    : '#00ff41',
                  textShadow: '0 0 4px currentColor',
                }}
              >
                {line.startsWith('PORT') || line.startsWith('eth') || line.startsWith('wlan') || line.startsWith('lo')
                  ? `  ${line}`
                  : line}
              </div>
            ))}

            {/* Blinking cursor at end */}
            {phase === 'flooding' && (
              <span
                className="inline-block w-2 h-4 bg-green align-bottom"
                style={{ animation: 'hackBlink 0.5s step-end infinite' }}
              />
            )}
          </div>
        )}

        {phase === 'reveal' && (
          <div className="flex-1 flex flex-col justify-center items-start p-8 md:p-16">
            {revealLines.map((line, i) => (
              <div
                key={i}
                className="font-mono text-sm md:text-base leading-8"
                style={{
                  color: line?.includes('pratik') ? '#00ffff'
                    : line?.includes('jk') ? '#ffb000'
                    : '#00ff41',
                  textShadow: '0 0 8px currentColor',
                }}
              >
                {line || '\u00A0'}
              </div>
            ))}

            {/* Countdown + dismiss */}
            {countdown !== null && (
              <div className="mt-10 flex flex-col gap-4">
                <div className="font-mono text-xs text-green-dim">
                  auto-dismissing in{' '}
                  <span style={{ color: '#ffb000' }}>{countdown}s</span>
                  ...
                </div>
                <button
                  onClick={onDismiss}
                  className="font-mono text-sm px-6 py-2 border border-green text-green hover:bg-green hover:text-black transition-all duration-200"
                  style={{ cursor: 'none' }}
                >
                  {'> ESCAPE [press to dismiss]'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom status bar */}
      <div
        className="relative z-20 flex justify-between items-center px-4 py-2 border-t font-mono text-xs"
        style={{ borderColor: '#ff2244', background: 'rgba(255,34,68,0.06)', color: '#ff2244' }}
      >
        <span style={{ animation: 'hackBlink 1s step-end infinite' }}>
          ● ROOT ACCESS ACTIVE
        </span>
        <span>PID: {Math.floor(Math.random() * 9000 + 1000)}</span>
        <span>PRATIK.SYS v2.0</span>
      </div>

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes hackBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes hackShake {
          0%   { transform: translate(0, 0) skewX(0deg); }
          20%  { transform: translate(-3px, 1px) skewX(-1deg); }
          40%  { transform: translate(3px, -1px) skewX(1deg); }
          60%  { transform: translate(-2px, 2px) skewX(0.5deg); }
          80%  { transform: translate(2px, -2px) skewX(-0.5deg); }
          100% { transform: translate(0, 0) skewX(0deg); }
        }
      `}</style>
    </div>
  )
}