import SectionHeader from './SectionHeader'
import SkillBar from './SkillBar'
import { SKILL_CATEGORIES } from '@/lib/data'
import TerminalWindow from './TerminalWindow'

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-10 min-h-screen pt-24 pb-16 px-5 md:px-10 max-w-[1200px] mx-auto"
    >
      <SectionHeader tag="capabilities" title="SKILL MATRIX" />

      <div className="reveal-on-scroll">
        <TerminalWindow title="htop — skill_monitor — 1 process" statusText="CPU OK | MEM OK">
          {/* Table header */}
          <div
            className="grid gap-2 md:gap-4 font-mono text-xs text-green-dim mb-3 pb-2 border-b border-green-dark"
            style={{ gridTemplateColumns: 'minmax(80px, 130px) 1fr 44px' }}
          >
            <span>TECHNOLOGY</span>
            <span>PROFICIENCY</span>
            <span>LVL%</span>
          </div>

          {SKILL_CATEGORIES.map((cat, i) => (
            <div key={i} className={i > 0 ? 'mt-5' : ''}>
              <div className="font-mono text-xs tracking-widest uppercase text-cyan mb-4">
                {cat.label}
              </div>
              {cat.skills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} pct={skill.pct} />
              ))}
            </div>
          ))}
        </TerminalWindow>
      </div>
    </section>
  )
}
