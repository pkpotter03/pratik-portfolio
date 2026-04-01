'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SCROLLYTELL_PANELS } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ScrollytellSection() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<(HTMLDivElement | null)[]>([])
  const [activePanel, setActivePanel] = useState(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[]
    const totalPanels = panels.length

    // Main pinned horizontal-scroll-like timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${window.innerHeight * totalPanels}`,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update active panel based on scroll progress
          const idx = Math.min(
            Math.floor(self.progress * totalPanels),
            totalPanels - 1
          )
          setActivePanel(idx)
        },
      },
    })

    panels.forEach((panel, i) => {
      const content = panel.querySelector('.panel-content') as HTMLElement
      const phase = panel.querySelector('.panel-phase') as HTMLElement
      const title = panel.querySelector('.panel-title') as HTMLElement
      const subtitle = panel.querySelector('.panel-subtitle') as HTMLElement
      const body = panel.querySelector('.panel-body') as HTMLElement
      const decorLines = panel.querySelectorAll('.decor-line')
      const bgGrid = panel.querySelector('.panel-bg-grid') as HTMLElement

      if (i === 0) {
        // First panel: already visible, set initial state
        gsap.set(panel, { opacity: 1, zIndex: 10 })
        gsap.set([phase, title, subtitle, body], { opacity: 1, y: 0 })
        gsap.set(decorLines, { scaleX: 1, opacity: 0.4 })
        if (bgGrid) gsap.set(bgGrid, { opacity: 0.08 })
      } else {
        // Other panels: initially hidden
        gsap.set(panel, { opacity: 0, zIndex: 1 })
        if (!prefersReducedMotion) {
          gsap.set(content, { rotateY: 45, rotateX: -10, scale: 0.8, transformOrigin: 'center center' })
        } else {
          gsap.set(content, { scale: 0.95, transformOrigin: 'center center' })
        }
        gsap.set([phase, title, subtitle, body], { opacity: 0, y: prefersReducedMotion ? 10 : 40 })
        gsap.set(decorLines, { scaleX: 0, opacity: 0 })
        if (bgGrid) gsap.set(bgGrid, { opacity: 0 })
      }

      if (i > 0) {
        const pos = (i - 1) / (totalPanels - 1)

        // Fade out previous panel
        tl.to(panels[i - 1], {
          opacity: 0,
          zIndex: 1,
          duration: 0.3,
        }, pos)

        // Fade in + 3D rotate current panel into view
        tl.to(panel, {
          opacity: 1,
          zIndex: 10,
          duration: 0.3,
        }, pos)

        if (!prefersReducedMotion) {
          tl.to(content, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out',
          }, pos)
        } else {
          tl.to(content, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          }, pos)
        }

        // Stagger text elements
        tl.to(phase, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        }, pos + 0.05)

        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        }, pos + 0.1)

        tl.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        }, pos + 0.15)

        tl.to(body, {
          opacity: 1,
          y: 0,
          duration: 0.3,
        }, pos + 0.2)

        // Decorative lines sweep in
        tl.to(decorLines, {
          scaleX: 1,
          opacity: 0.4,
          duration: 0.4,
          stagger: 0.05,
        }, pos + 0.1)

        if (bgGrid) {
          tl.to(bgGrid, {
            opacity: 0.08,
            duration: 0.4,
          }, pos + 0.05)
        }
      }
    })
    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="journey"
      ref={wrapperRef}
      className="relative z-10 w-full overflow-hidden"
      style={{
        height: '100vh',
        perspective: '1200px',
      }}
    >
      {/* Persistent scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[0.65rem] text-green tracking-[6px] uppercase">Scroll</span>
        <div className="w-px h-8 relative overflow-hidden">
          <div
            className="w-full h-full bg-green"
            style={{
              animation: 'scrollPulse 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Progress dots — now reactive */}
      <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-4">
        {SCROLLYTELL_PANELS.map((p, i) => (
          <div
            key={p.id}
            className="w-2 h-2 rounded-full border border-green-dim transition-all duration-300"
            style={{
              background: i <= activePanel ? p.accent : 'transparent',
              boxShadow: i === activePanel ? `0 0 8px ${p.accent}` : 'none',
              transform: i === activePanel ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {SCROLLYTELL_PANELS.map((panel, i) => (
        <div
          key={panel.id}
          ref={(el) => { panelsRef.current[i] = el }}
          className="absolute inset-0 flex items-center justify-center px-6 md:px-16"
          style={{ willChange: 'opacity, transform' }}
        >
          {/* Background grid pattern */}
          <div
            className="panel-bg-grid absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(${panel.accent}11 1px, transparent 1px),
                linear-gradient(90deg, ${panel.accent}11 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Decorative corner brackets */}
          <div className="absolute top-10 left-6 md:left-10 w-12 h-12 border-t border-l opacity-20" style={{ borderColor: panel.accent }} />
          <div className="absolute top-10 right-6 md:right-10 w-12 h-12 border-t border-r opacity-20" style={{ borderColor: panel.accent }} />
          <div className="absolute bottom-10 left-6 md:left-10 w-12 h-12 border-b border-l opacity-20" style={{ borderColor: panel.accent }} />
          <div className="absolute bottom-10 right-6 md:right-10 w-12 h-12 border-b border-r opacity-20" style={{ borderColor: panel.accent }} />

          {/* Panel content with 3D transforms */}
          <div
            className="panel-content relative max-w-3xl w-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Phase number */}
            <div
              className="panel-phase font-orbitron text-[5rem] md:text-[8rem] font-black leading-none mb-2 select-none"
              style={{
                color: 'transparent',
                WebkitTextStroke: `1px ${panel.accent}44`,
                transform: 'translateZ(20px)',
              }}
            >
              {panel.phase}
            </div>

            {/* Title */}
            <h2
              className="panel-title font-orbitron font-black text-3xl md:text-5xl lg:text-6xl mb-3 tracking-wide"
              style={{
                color: panel.accent,
                textShadow: `0 0 40px ${panel.accent}66, 0 0 80px ${panel.accent}22`,
                transform: 'translateZ(40px)',
              }}
            >
              {panel.title}
            </h2>

            {/* Subtitle */}
            <div
              className="panel-subtitle font-mono text-sm md:text-base tracking-[6px] uppercase mb-8 opacity-60"
              style={{
                color: panel.accent,
                transform: 'translateZ(30px)',
              }}
            >
              {panel.subtitle}
            </div>

            {/* Decorative lines */}
            <div
              className="decor-line h-px w-48 mb-8"
              style={{
                background: `linear-gradient(to right, ${panel.accent}, transparent)`,
                transformOrigin: 'left center',
              }}
            />

            {/* Body text */}
            <p
              className="panel-body font-mono text-sm md:text-base text-green-dim leading-8 max-w-xl"
              style={{ transform: 'translateZ(10px)' }}
            >
              {panel.body}
            </p>

            {/* Second decorative line */}
            <div
              className="decor-line h-px w-32 mt-8"
              style={{
                background: `linear-gradient(to right, ${panel.accent}88, transparent)`,
                transformOrigin: 'left center',
              }}
            />
          </div>
        </div>
      ))}
    </section>
  )
}

