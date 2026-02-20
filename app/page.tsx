'use client'

import { useState, useCallback } from 'react'
import BootScreen from '@/components/BootScreen'
import CustomCursor from '@/components/CustomCursor'
import MatrixBackground from '@/components/MatrixBackground'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ExperienceSection from '@/components/ExperienceSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import TerminalSection from '@/components/TerminalSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useClickSparks } from '@/hooks/useClickSparks'

export default function Home() {
  const [booted, setBooted] = useState(false)
  const [matrixOpacity, setMatrixOpacity] = useState(0.18)

  const toggleMatrix = useCallback(() => {
    setMatrixOpacity((prev) => (prev > 0.05 ? 0.02 : 0.18))
  }, [])

  // Hooks that need DOM ready
  useScrollReveal(booted)
  useClickSparks(booted)

  return (
    <>
      {/* ── Custom cursor ─────────────────────────────── */}
      <CustomCursor />

      {/* ── Ambient scan line ─────────────────────────── */}
      <div className="scan-line-anim" />

      {/* ── Matrix canvas background ──────────────────── */}
      <MatrixBackground opacity={matrixOpacity} />

      {/* ── Boot sequence (shown once) ────────────────── */}
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}

      {/* ── Main portfolio content ────────────────────── */}
      <div
        className="transition-opacity duration-1000"
        style={{ opacity: booted ? 1 : 0, pointerEvents: booted ? 'auto' : 'none' }}
      >
        <Navbar />

        <main>
          <HeroSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <TerminalSection onToggleMatrix={toggleMatrix} />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  )
}
