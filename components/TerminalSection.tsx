'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'
import InteractiveTerminal from './InteractiveTerminal'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface TerminalSectionProps {
  onToggleMatrix?: () => void
}

export default function TerminalSection({ onToggleMatrix }: TerminalSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const desc = sectionRef.current!.querySelector('.term-desc')
      const termWrap = sectionRef.current!.querySelector('.term-wrap')

      if (desc) {
        gsap.set(desc, { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: desc,
          start: 'top 85%',
          once: true,
          onEnter: () => gsap.to(desc, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
        })
      }

      if (termWrap) {
        gsap.set(termWrap, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: termWrap,
          start: 'top 85%',
          once: true,
          onEnter: () => gsap.to(termWrap, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="terminal-section"
      ref={sectionRef}
      className="relative z-10 min-h-screen pt-24 pb-16 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <SectionHeader tag="interactive" title="QUERY TERMINAL" />

      <p className="term-desc font-mono text-sm text-green-dim mb-6 max-w-xl leading-7">
        An interactive terminal to learn about me. Type a command below or press{' '}
        <span className="text-amber">Tab</span> for suggestions.
      </p>

      <div className="term-wrap max-w-3xl">
        <InteractiveTerminal onToggleMatrix={onToggleMatrix} />
      </div>
    </section>
  )
}
