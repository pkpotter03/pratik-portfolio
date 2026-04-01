'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'
import { CONTACT_LINKS } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const links = sectionRef.current!.querySelectorAll<HTMLElement>('.contact-link')
      const bio = sectionRef.current!.querySelector('.contact-bio')

      gsap.set(links, { opacity: 0, x: -20 })
      gsap.set(bio, { opacity: 0, y: 20 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.to(links, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
          })
          gsap.to(bio, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3,
            ease: 'power2.out',
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 min-h-screen pt-24 pb-16 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <SectionHeader tag="reach out" title="CONTACT" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: links */}
        <div>
          <div className="inline-flex items-center gap-2 bg-green-dark text-green font-mono text-[0.75rem] px-3 py-1.5 mb-5">
            <span>◉</span>
            <span>ICHALKARANJI, MAHARASHTRA, IN</span>
          </div>

          <div className="flex flex-col gap-5">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="contact-link flex items-center gap-4 px-5 py-4 border border-green-dark no-underline text-inherit relative overflow-hidden transition-all duration-200 hover:border-green hover:bg-green/[0.04] group"
              >
                {/* Left accent */}
                <span
                  className="absolute left-0 top-0 w-0.5 h-full bg-green"
                />
                <span className="font-mono text-xl text-green w-6 text-center">
                  {link.icon}
                </span>
                <div>
                  <div className="font-mono text-[0.7rem] text-green-dim tracking-widest">
                    {link.label}
                  </div>
                  <div className="font-mono text-sm text-green">{link.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right: bio */}
        <div
          className="contact-bio font-mono text-sm text-green-dim leading-8 border-t-2 lg:border-t-0 lg:border-l-2 border-green-dark pt-6 lg:pt-0 lg:pl-6"
        >
          <p className="mb-4">
            I&apos;m a Full Stack Developer working as a Software Development Engineer at Rivedix Technology Solutions,
            building production-grade web applications with modern tech stacks.
          </p>
          <p className="mb-4">
            My B.Tech in Computer Science from D.K.T.E. Society&apos;s Textile and Engineering
            Institute wrapped up in June 2025. I thrive on crafting secure, scalable applications and am passionate about continuous learning and growth in the tech world. I&apos;m currently interested in learning system design, cloud computing, and DevOps practices to complement my full stack development skills.
          </p>
          <p className="text-green mb-6">
            Available for:{' '}
            <span className="text-amber">Full-time roles</span> &nbsp;|&nbsp; Remote or Onsite
          </p>

          <div>
            <div className="font-mono text-[0.75rem] text-green-dim tracking-widest mb-2">
              // CURRENT STATUS
            </div>
            <div className="flex items-center gap-2.5">
              <span
                className="w-1.5 h-1.5 bg-green rounded-full animate-blink-slow"
                style={{ boxShadow: '0 0 4px #00ff41' }}
              />
              <span className="font-mono text-sm text-green">OPEN TO OPPORTUNITIES</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
