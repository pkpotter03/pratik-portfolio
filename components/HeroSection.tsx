'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HERO_STATS } from '@/lib/data'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const promptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Prompt line types in
      tl.fromTo(
        promptRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      )

      // Name slams in with glitch
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.1'
      )

      // Title slides in
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20, letterSpacing: '12px' },
        { opacity: 1, y: 0, letterSpacing: '4px', duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      )

      // Description fades in
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      )

      // Stats stagger in
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll('.stat-card')
        tl.fromTo(
          statCards,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.5)' },
          '-=0.2'
        )
      }

      // CTA buttons
      if (ctaRef.current) {
        const btns = ctaRef.current.querySelectorAll('a')
        tl.fromTo(
          btns,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' },
          '-=0.1'
        )
      }

      // Animate counters with GSAP
      const counters = document.querySelectorAll<HTMLElement>('[data-count]')
      counters.forEach((el) => {
        const target = parseInt(el.dataset.count ?? '0')
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.8,
          onUpdate: () => {
            el.textContent = Math.floor(obj.val) + '+'
          },
        })
      })

      // Parallax drift on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.set(nameRef.current, { y: progress * 60 })
          gsap.set(titleRef.current, { y: progress * 40 })
          gsap.set(descRef.current, { y: progress * 25 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 min-h-screen flex flex-col justify-center pt-28 pb-16 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      {/* Prompt line */}
      <div ref={promptRef} className="font-mono text-sm text-green-dim mb-2 tracking-wide">
        {'$ whoami'}
        <span
          className="inline-block w-2.5 bg-green ml-0.5 animate-blink"
          style={{ height: '1em', verticalAlign: 'text-bottom' }}
        />
      </div>

      {/* Name with glitch */}
      <h1
        ref={nameRef}
        className="font-orbitron font-black text-green leading-none mb-4 relative inline-block"
        style={{
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          textShadow: '0 0 30px #00ff41, 0 0 60px rgba(0,255,65,0.3)',
        }}
        data-text="PRATIK KUMBHAR"
      >
        PRATIK KUMBHAR
        {/* Glitch layer */}
        <span
          aria-hidden
          className="absolute left-[3px] top-[3px] text-cyan animate-glitch-name"
          style={{
            clipPath: 'polygon(0 30%, 100% 30%, 100% 50%, 0 50%)',
          }}
        >
          PRATIK KUMBHAR
        </span>
      </h1>

      {/* Title */}
      <div
        ref={titleRef}
        className="font-vt text-3xl text-amber tracking-[4px] mb-6"
        style={{ textShadow: '0 0 10px #ffb000' }}
      >
        FULL STACK DEVELOPER
      </div>

      {/* Description */}
      <p ref={descRef} className="font-mono text-sm text-green-dim max-w-xl leading-7 mb-10">
        Building secure, scalable web applications from the ground up.
        <br />
        Specializing in React ecosystems, backend API architecture, and cloud deployments.
        <br />
        <span className="text-green opacity-60">// SDE @ Rivedix Technology Solutions</span>
      </p>

      {/* Stats */}
      <div ref={statsRef} className="flex gap-3 md:gap-10 mb-10 flex-wrap">
        {HERO_STATS.map((stat, i) => (
          <div
            key={i}
            className="stat-card border border-green-dark px-5 py-3 relative group hover:border-green transition-colors duration-300"
          >
            {/* Left accent bar */}
            <div
              className="absolute left-0 top-0 w-1 h-full bg-green transition-shadow duration-300 group-hover:shadow-[0_0_12px_#00ff41]"
              style={{ boxShadow: '0 0 8px #00ff41' }}
            />
            <div
              className="font-orbitron text-green mb-1"
              style={{ fontSize: '1.8rem', textShadow: '0 0 10px #00ff41' }}
              {...(stat.count ? { 'data-count': stat.count } : {})}
            >
              {stat.value}
            </div>
            <div className="font-mono text-[0.7rem] text-green-dim tracking-widest">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div ref={ctaRef} className="flex gap-4 flex-wrap">
        <a href="#projects" className="hero-btn-primary">
          VIEW PROJECTS
        </a>
        <a href="#terminal-section" className="hero-btn-secondary">
          OPEN TERMINAL
        </a>
        <a href="mailto:pratikkumbhar2003@gmail.com" className="hero-btn-secondary">
          CONTACT
        </a>
      </div>
    </section>
  )
}
