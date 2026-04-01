'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'
import { EXPERIENCE } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const expBlocks = sectionRef.current!.querySelectorAll<HTMLElement>('.exp-block')

      expBlocks.forEach((block) => {
        const dateLine = block.querySelector('.date-line')
        const timelineLine = block.querySelector('.timeline-line')
        const company = block.querySelector('.company-name')
        const role = block.querySelector('.role-name')
        const bullets = block.querySelectorAll('.exp-bullet')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 80%',
            once: true,
          },
        })

        if (timelineLine) {
          tl.fromTo(timelineLine, { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 0.6, ease: 'power2.out' })
        }

        if (dateLine) {
          tl.fromTo(dateLine, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4 }, '-=0.3')
        }

        if (company) {
          tl.fromTo(company, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
        }

        if (role) {
          tl.fromTo(role, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 }, '-=0.15')
        }

        if (bullets.length) {
          tl.fromTo(
            bullets,
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' },
            '-=0.1'
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-10 min-h-screen pt-24 pb-16 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <SectionHeader tag="career" title="EXPERIENCE" />

      {EXPERIENCE.map((exp, i) => (
        <div
          key={i}
          className="exp-block grid md:grid-cols-[200px_1fr] gap-10 mb-12 relative"
        >
          {/* Vertical timeline line on md+ */}
          <div
            className="timeline-line hidden md:block absolute left-[199px] top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #00ff41, transparent)' }}
          />

          {/* Date column */}
          <div className="date-line font-mono text-xs text-amber tracking-wide text-left md:text-right pt-1">
            {exp.dateFrom}
            <br />— {exp.dateTo}
            {exp.active && (
              <div className="mt-3 inline-block bg-green-dark text-green text-[0.7rem] px-2 py-1">
                ACTIVE
              </div>
            )}
          </div>

          {/* Content */}
          <div className="md:pl-10">
            <div
              className="company-name font-orbitron text-xl text-green mb-1"
              style={{ fontWeight: 700 }}
            >
              {exp.company}
            </div>
            <div className="role-name font-mono text-sm text-cyan tracking-widest mb-4">
              {exp.role}
            </div>
            <ul className="list-none flex flex-col gap-1.5">
              {exp.bullets.map((b, j) => (
                <li
                  key={j}
                  className="exp-bullet font-mono text-sm text-green-dim leading-7 pl-5 relative"
                >
                  <span className="absolute left-0 text-green">▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  )
}
