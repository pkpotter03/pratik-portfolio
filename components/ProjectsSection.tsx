'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Section header reveal is handled by SectionHeader itself or inline
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 min-h-screen pt-24 pb-16 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <SectionHeader tag="builds" title="PROJECTS" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.num} project={project} />
        ))}
      </div>
    </section>
  )
}
