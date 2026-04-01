'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SectionHeaderProps {
  tag: string
  title: string
}

export default function SectionHeader({ tag, title }: SectionHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return

    const ctx = gsap.context(() => {
      const tagEl = headerRef.current!.querySelector('.sh-tag')
      const titleEl = headerRef.current!.querySelector('.sh-title')
      const line = headerRef.current!.querySelector('.sh-line')

      gsap.set([tagEl, titleEl, line], { opacity: 0 })
      if (tagEl) gsap.set(tagEl, { x: -15 })
      if (titleEl) gsap.set(titleEl, { y: 15 })
      if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'left' })

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const tl = gsap.timeline()
          if (tagEl) tl.to(tagEl, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' })
          if (titleEl) tl.to(titleEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
          if (line) tl.to(line, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        },
      })
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={headerRef} className="mb-5">
      <div className="sh-tag font-mono text-xs tracking-[4px] uppercase text-green-dim mb-2">
        <span className="text-green-dim">// </span>
        {tag}
      </div>
      <h2
        className="sh-title font-orbitron font-bold text-green"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          textShadow: '0 0 20px rgba(0,255,65,0.4)',
        }}
      >
        {title}
      </h2>
      <div
        className="sh-line h-px mt-4 w-72"
        style={{ background: 'linear-gradient(to right, #00ff41, transparent)' }}
      />
    </div>
  )
}
