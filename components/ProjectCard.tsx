'use client'

import { useState } from 'react'
import type { Project } from '@/types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-hidden border border-green-dark p-7 transition-all duration-300 reveal-on-scroll"
      style={{
        background: 'rgba(0,20,0,0.3)',
        borderColor: hovered ? '#00ff41' : undefined,
        transform: hovered ? 'translateY(-4px)' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor-hover
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(0,255,65,0.03), transparent)' }}
      />

      {/* Hover radial glow */}
      <div
        className="absolute pointer-events-none transition-all duration-500"
        style={{
          width: '300%',
          height: '300%',
          background: 'radial-gradient(circle, rgba(0,255,65,0.06) 0%, transparent 60%)',
          bottom: hovered ? '-50%' : '-100%',
          left: hovered ? '-50%' : '-100%',
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
