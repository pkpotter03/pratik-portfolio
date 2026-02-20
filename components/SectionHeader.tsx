interface SectionHeaderProps {
  tag: string
  title: string
}

export default function SectionHeader({ tag, title }: SectionHeaderProps) {
  return (
    <div className="mb-14 reveal-on-scroll">
      <div className="font-mono text-xs tracking-[4px] uppercase text-green-dim mb-2">
        <span className="text-green-dim">// </span>
        {tag}
      </div>
      <h2
        className="font-orbitron font-bold text-green"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          textShadow: '0 0 20px rgba(0,255,65,0.4)',
        }}
      >
        {title}
      </h2>
      <div
        className="h-px mt-4 w-72"
        style={{ background: 'linear-gradient(to right, #00ff41, transparent)' }}
      />
    </div>
  )
}
