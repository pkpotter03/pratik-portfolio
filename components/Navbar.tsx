'use client'

import { useEffect, useState } from 'react'
import { useUptime } from '@/hooks/useUptime'
import { NAV_LINKS } from '@/lib/data'

export default function Navbar() {
  const { uptime, time } = useUptime()
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-10 py-4 border-b border-green-dark"
      style={{ background: 'rgba(0,9,0,0.85)', backdropFilter: 'blur(8px)' }}
    >
      {/* Logo */}
      <div
        className="font-vt text-3xl text-green tracking-widest"
        style={{ textShadow: '0 0 10px #00ff41' }}
      >
        p<span className="text-amber">k</span>.dev
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-8 list-none">
        {NAV_LINKS.map(({ href, label }) => {
          const sectionId = href.replace('#', '')
          const isActive = activeSection === sectionId
          return (
            <li key={href}>
              <a
                href={href}
                className={`font-mono text-xs tracking-widest uppercase transition-all duration-200 no-underline group relative ${
                  isActive ? 'text-green' : 'text-green-dim hover:text-green'
                }`}
                style={isActive ? { textShadow: '0 0 8px #00ff41' } : {}}
              >
                <span
                  className={`transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                >
                  {'> '}
                </span>
                {label}
              </a>
            </li>
          )
        })}
      </ul>

      {/* Status bar */}
      <div className="flex items-center gap-4 font-mono text-[0.7rem] text-green-dim">
        <span
          className="w-1.5 h-1.5 bg-green rounded-full animate-blink-slow"
          style={{ boxShadow: '0 0 4px #00ff41' }}
        />
        <span>{time}</span>
        <span>|</span>
        <span className="hidden sm:inline">UPTIME: {uptime}</span>
      </div>
    </nav>
  )
}
