'use client'

import { useEffect, useRef } from 'react'
import { HERO_STATS } from '@/lib/data'

export default function HeroSection() {
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const counters = document.querySelectorAll<HTMLElement>('[data-count]')
    counters.forEach((el) => {
      const target = parseInt(el.dataset.count ?? '0')
      let current = 0
      const step = target / 40
      const interval = setInterval(() => {
        current = Math.min(current + step, target)
        el.textContent = Math.floor(current) + '+'
        if (current >= target) clearInterval(interval)
      }, 40)
    })
  }, [])

  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center pt-28 pb-16 px-10 max-w-[1200px] mx-auto"
    >
      {/* Prompt line */}
      <div className="font-mono text-sm text-green-dim mb-2 tracking-wide">
        {'$ whoami'}
        <span
          className="inline-block w-2.5 bg-green ml-0.5 animate-blink"
          style={{ height: '1em', verticalAlign: 'text-bottom' }}
        />
      </div>

      {/* Name with glitch */}
      <h1
        className="font-orbitron font-black text-green leading-none mb-4 relative inline-block"
        style={{
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          textShadow: '0 0 30px #00ff41, 0 0 60px rgba(0,255,65,0.3)',
        }}
        data-text="PRATIK KUMBHAR"
      >
        PRATIK KUMBHAR
        {/* Glitch layer */}
        <span
          aria-hidden
          className="absolute left-[3px] top-[3px] text-cyan animate-glitch-name"
          style={{
            clipPath: 'polygon(0 30%, 100% 30%, 100% 50%, 0 50%)',
            content: 'attr(data-text)',
          }}
        >
          PRATIK KUMBHAR
        </span>
      </h1>

      {/* Title */}
      <div
        className="font-vt text-3xl text-amber tracking-[4px] mb-6"
        style={{ textShadow: '0 0 10px #ffb000' }}
      >
        FULL STACK DEVELOPER
      </div>

      {/* Description */}
      <p className="font-mono text-sm text-green-dim max-w-xl leading-7 mb-10">
        Building secure, scalable web applications from the ground up.
        <br />
        Specializing in React ecosystems, backend API architecture, and cloud deployments.
        <br />
        <span className="text-green opacity-60">// currently @ Rivedix Technology Solutions</span>
      </p>

      {/* Stats */}
      <div className="flex gap-10 mb-10 flex-wrap reveal-on-scroll">
        {HERO_STATS.map((stat, i) => (
          <div
            key={i}
            className="border border-green-dark px-5 py-3 relative"
          >
            {/* Left accent bar */}
            <div
              className="absolute left-0 top-0 w-1 h-full bg-green"
              style={{ boxShadow: '0 0 8px #00ff41' }}
            />
            <div
              className="font-orbitron text-green mb-1"
              style={{ fontSize: '1.8rem', textShadow: '0 0 10px #00ff41' }}
              {...(stat.count ? { 'data-count': stat.count } : {})}
            >
              {stat.value}
            </div>
            <div className="font-mono text-[0.7rem] text-green-dim tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex gap-4 flex-wrap">
        <a href="#projects" className="hero-btn-primary">
          VIEW PROJECTS
        </a>
        <a href="#terminal-section" className="hero-btn-secondary">
          OPEN TERMINAL
        </a>
        <a href="mailto:pratikkumbhar2003@gmail.com" className="hero-btn-secondary">
          CONTACT
        </a>
      </div>
    </section>
  )
}
