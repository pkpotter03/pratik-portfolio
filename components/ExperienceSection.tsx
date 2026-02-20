import SectionHeader from './SectionHeader'
import { EXPERIENCE } from '@/lib/data'

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative z-10 min-h-screen pt-24 pb-16 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <SectionHeader tag="career" title="EXPERIENCE" />

      {EXPERIENCE.map((exp, i) => (
        <div
          key={i}
          className="grid md:grid-cols-[200px_1fr] gap-10 mb-12 relative reveal-on-scroll"
        >
          {/* Vertical timeline line on md+ */}
          <div
            className="hidden md:block absolute left-[199px] top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, #00ff41, transparent)' }}
          />

          {/* Date column */}
          <div className="font-mono text-xs text-amber tracking-wide text-left md:text-right pt-1">
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
              className="font-orbitron text-xl text-green mb-1"
              style={{ fontWeight: 700 }}
            >
              {exp.company}
            </div>
            <div className="font-mono text-sm text-cyan tracking-widest mb-4">
              {exp.role}
            </div>
            <ul className="list-none flex flex-col gap-1.5">
              {exp.bullets.map((b, j) => (
                <li
                  key={j}
                  className="font-mono text-sm text-green-dim leading-7 pl-5 relative"
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
