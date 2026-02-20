'use client'

import { useEffect, useState } from 'react'
import { useUptime } from '@/hooks/useUptime'
import { NAV_LINKS } from '@/lib/data'

export default function Navbar() {
  const { uptime, time } = useUptime()
  const [activeSection, setActiveSection] = useState('hero')
  const [menuOpen, setMenuOpen] = useState(false)

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

  const handleLinkClick = () => setMenuOpen(false)

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-5 md:px-10 py-4 border-b border-green-dark"
        style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)' }}
      >
        {/* Logo */}
        <div
          className="font-vt text-3xl text-green tracking-widest"
          style={{ textShadow: '0 0 10px #00ff41' }}
        >
          P<span className="text-amber">K</span>.dev
        </div>

        {/* Desktop links */}
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
                    className={`transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {'> '}
                  </span>
                  {label}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Right: status + hamburger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 font-mono text-[0.7rem] text-green-dim">
            <span
              className="w-1.5 h-1.5 bg-green rounded-full animate-blink-slow"
              style={{ boxShadow: '0 0 4px #00ff41' }}
            />
            <span className="hidden sm:inline">{time}</span>
            <span className="hidden lg:inline">| UPTIME: {uptime}</span>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{ cursor: 'none' }}
          >
            <span
              className={`block w-full h-px bg-green transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[6px]' : ''
              }`}
              style={{ boxShadow: '0 0 4px #00ff41' }}
            />
            <span
              className={`block w-full h-px bg-green transition-all duration-300 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-full h-px bg-green transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[6px]' : ''
              }`}
              style={{ boxShadow: '0 0 4px #00ff41' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen drawer */}
      <div
        className={`fixed inset-0 z-[999] flex flex-col justify-center items-center gap-10 transition-all duration-300 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0,9,0,0.97)' }}
      >
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = activeSection === href.replace('#', '')
          return (
            <a
              key={href}
              href={href}
              onClick={handleLinkClick}
              className={`font-vt text-5xl tracking-widest no-underline transition-all duration-200 ${
                isActive ? 'text-green' : 'text-green-dim'
              }`}
              style={isActive ? { textShadow: '0 0 16px #00ff41' } : {}}
            >
              {isActive ? '> ' : ''}{label.toUpperCase()}
            </a>
          )
        })}

        <div className="font-mono text-[0.7rem] text-green-dim mt-6 text-center leading-6">
          <div>{time}</div>
          <div>UPTIME: {uptime}</div>
        </div>
      </div>
    </>
  )
}
