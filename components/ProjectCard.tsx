'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Project } from '@/types'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Skip 3D tilt on touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    // Scroll-triggered entrance
    gsap.set(card, { opacity: 0, y: 40, rotateX: isTouch ? 0 : -5 })

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          ease: 'power3.out',
        })
      },
    })

    if (isTouch) return // No mouse-tracking on touch devices

    // 3D mouse-tracking tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Move inner glow to follow mouse
      const glow = card.querySelector('.card-glow') as HTMLElement
      if (glow) {
        gsap.to(glow, {
          x: x * 100,
          y: y * 100,
          opacity: 1,
          duration: 0.3,
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        y: 0,
        borderColor: '#003d0d',
        duration: 0.5,
        ease: 'power2.out',
      })
      const glow = card.querySelector('.card-glow') as HTMLElement
      if (glow) {
        gsap.to(glow, { opacity: 0, duration: 0.4 })
      }
    }

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -6,
        borderColor: '#00ff41',
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    card.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
      card.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden border border-green-dark p-7"
      style={{
        background: 'rgba(0,20,0,0.3)',
        perspective: '800px',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
      data-cursor-hover
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(0,255,65,0.03), transparent)' }}
      />

      {/* Mouse-tracking radial glow */}
      <div
        className="card-glow absolute pointer-events-none opacity-0"
        style={{
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0,255,65,0.08) 0%, transparent 65%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Number */}
      <div className="font-orbitron text-5xl font-black text-green-dark leading-none mb-4">
        {project.num}
      </div>

      {/* Name */}
      <div className="font-orbitron text-lg font-bold text-green mb-1">{project.name}</div>

      {/* Subtitle */}
      <div className="font-mono text-[0.75rem] text-green-dim tracking-widest mb-3">
        {project.subtitle}
      </div>

      {/* Description */}
      <p className="font-mono text-[0.82rem] text-green-dim leading-7 mb-5">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[0.7rem] text-green tracking-wide px-2.5 py-0.5 bg-green-dark"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex gap-6 pt-4 mb-5 border-t border-green-dark">
        {project.stats.map((stat) => (
          <div key={stat.label} className="font-mono text-[0.78rem] text-green-dim">
            {stat.label}
            <br />
            <span
              className={`font-orbitron text-sm ${
                stat.valueColor === 'amber' ? 'text-amber' : 'text-green'
              }`}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      {/* Link */}
      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm text-cyan tracking-wide no-underline inline-flex items-center gap-1.5 transition-all duration-200 hover:drop-shadow-[0_0_8px_#00ffff]"
        >
          → {project.linkLabel}
        </a>
      ) : (
        <span className="font-mono text-sm text-green-dim">→ {project.linkLabel}</span>
      )}
    </div>
  )
}
