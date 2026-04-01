'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SKILL_CATEGORIES } from '@/lib/data'
import SectionHeader from './SectionHeader'
import {
  SiReact, SiTypescript, SiTailwindcss, SiAngular,
  SiNestjs, SiNodedotjs, SiFastapi, SiJsonwebtokens,
  SiPostgresql, SiPrisma, SiMongodb,
  SiDocker,
  SiJavascript
} from 'react-icons/si'
import type { IconType } from 'react-icons'
import { FaAws, FaJava } from 'react-icons/fa'
import { TbBrandCSharp, TbBrandCpp } from 'react-icons/tb'
import { DiRedis } from "react-icons/di"

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ICON_MAP: Record<string, IconType> = {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiAngular,
  SiNestjs,
  SiNodedotjs,
  SiFastapi,
  SiJsonwebtokens,
  SiPostgresql,
  SiPrisma,
  SiMongodb,
  DiRedis,
  FaAws,
  SiDocker,
  SiJavascript,
  TbBrandCSharp,
  TbBrandCpp,
  FaJava,
}

export default function SkillsGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const cleanups: (() => void)[] = []

    const ctx = gsap.context(() => {
      const cards = gridRef.current!.querySelectorAll<HTMLElement>('.skill-hex')
      const catLabels = gridRef.current!.querySelectorAll<HTMLElement>('.cat-label')

      gsap.set(cards, { opacity: 0, scale: 0.7, y: 30 })
      gsap.set(catLabels, { opacity: 0, x: -20 })

      ScrollTrigger.create({
        trigger: gridRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(catLabels, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: 'power2.out',
          })
          gsap.to(cards, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.04,
            ease: 'back.out(1.4)',
          })
        },
      })

      // Hover 3D tilt effect
      cards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = (e.clientX - rect.left) / rect.width - 0.5
          const y = (e.clientY - rect.top) / rect.height - 0.5

          gsap.to(card, {
            rotateY: x * 15,
            rotateX: -y * 15,
            duration: 0.3,
            ease: 'power2.out',
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          })
        }

        card.addEventListener('mousemove', handleMouseMove)
        card.addEventListener('mouseleave', handleMouseLeave)
        cleanups.push(() => {
          card.removeEventListener('mousemove', handleMouseMove)
          card.removeEventListener('mouseleave', handleMouseLeave)
        })
      })
    }, gridRef)

    return () => {
      cleanups.forEach((fn) => fn())
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="skills"
      className="relative z-10 min-h-screen pt-24 pb-16 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <SectionHeader tag="arsenal" title="SKILL MATRIX" />

      <div ref={gridRef} className="mt-10 space-y-12">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.label}>
            {/* Category label */}
            <div className="cat-label font-mono text-xs tracking-[6px] uppercase text-cyan mb-6 flex items-center gap-3">
              <span className="text-green-dim">//</span>
              {cat.label}
              <div className="flex-1 h-px bg-green-dark max-w-[200px]" />
            </div>

            {/* Skill cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cat.skills.map((skill) => {
                const Icon = ICON_MAP[skill.icon]
                return (
                  <div
                    key={skill.name}
                    className="skill-hex group relative"
                    style={{
                      perspective: '600px',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div
                      className="relative flex flex-col items-center justify-center gap-3 px-4 py-6 border border-green-dark transition-all duration-300 overflow-hidden cursor-default"
                      style={{
                        background: 'rgba(0, 20, 0, 0.4)',
                        clipPath: 'polygon(12% 0%, 88% 0%, 100% 25%, 100% 75%, 88% 100%, 12% 100%, 0% 75%, 0% 25%)',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Glow overlay on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at center, rgba(0,255,65,0.12) 0%, transparent 70%)',
                        }}
                      />

                      {/* Border glow on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          clipPath: 'polygon(12% 0%, 88% 0%, 100% 25%, 100% 75%, 88% 100%, 12% 100%, 0% 75%, 0% 25%)',
                          boxShadow: 'inset 0 0 20px rgba(0,255,65,0.15), 0 0 30px rgba(0,255,65,0.1)',
                        }}
                      />

                      {/* Scan line effect */}
                      <div
                        className="absolute left-0 w-full h-px bg-green/20 pointer-events-none opacity-0 group-hover:opacity-100"
                        style={{
                          animation: 'hexScan 2s linear infinite',
                          animationPlayState: 'paused',
                          top: '0%',
                        }}
                      />

                      {/* Icon */}
                      <div className="relative z-10 text-2xl md:text-3xl text-green-dim group-hover:text-green transition-colors duration-300"
                        style={{ filter: 'drop-shadow(0 0 0px transparent)', transition: 'filter 0.3s' }}
                      >
                        {Icon && <Icon style={{ filter: 'inherit' }} className="group-hover:drop-shadow-[0_0_8px_#00ff41]" />}
                      </div>

                      {/* Name */}
                      <span className="relative z-10 font-mono text-[0.7rem] md:text-xs text-green-dim group-hover:text-green text-center leading-tight transition-colors duration-300">
                        {skill.name}
                      </span>

                      {/* Descriptor */}
                      <span className="relative z-10 font-mono text-[0.6rem] text-green-dark group-hover:text-green-dim tracking-wider uppercase text-center transition-colors duration-300">
                        {skill.desc}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
