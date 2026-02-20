import SectionHeader from './SectionHeader'
import InteractiveTerminal from './InteractiveTerminal'

interface TerminalSectionProps {
  onToggleMatrix?: () => void
}

export default function TerminalSection({ onToggleMatrix }: TerminalSectionProps) {
  return (
    <section
      id="terminal-section"
      className="relative z-10 min-h-screen pt-24 pb-16 px-10 max-w-[1200px] mx-auto"
    >
      <SectionHeader tag="interactive" title="QUERY TERMINAL" />

      <p className="reveal-on-scroll font-mono text-sm text-green-dim mb-6 max-w-xl leading-7">
        An interactive terminal to learn about me. Type a command below or press{' '}
        <span className="text-amber">Tab</span> for suggestions.
      </p>

      <div className="reveal-on-scroll max-w-3xl">
        <InteractiveTerminal onToggleMatrix={onToggleMatrix} />
      </div>
    </section>
  )
}
