import SectionHeader from './SectionHeader'
import { CONTACT_LINKS } from '@/lib/data'

export default function ContactSection() {
  return (
    <section
      id="contact"
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
                className="reveal-on-scroll flex items-center gap-4 px-5 py-4 border border-green-dark no-underline text-inherit relative overflow-hidden transition-all duration-200 hover:border-green hover:bg-green/[0.04] group"
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
          className="reveal-on-scroll font-mono text-sm text-green-dim leading-8 border-t-2 md:border-t-0 md:border-l-2 border-green-dark pt-6 md:pt-0 md:pl-6"
        >
          <p className="mb-4">
            I&apos;m a Full Stack Developer currently interning at Rivedix Technology Solutions,
            building production-grade web applications with modern tech stacks.
          </p>
          <p className="mb-4">
            My B.Tech in Computer Science from D.K.T.E. Society&apos;s Textile and Engineering
            Institute wrapped up in June 2025. I thrive on crafting secure, scalable applications and am passionate about continuous learning and growth in the tech world. I'm currently intersted in learining system design, cloud computing, and DevOps practices to complement my full stack development skills. Also, Exploring cybersecurity field to enhance my understanding of secure coding practices and application security. I&apos;m eager to connect with like-minded professionals and explore new opportunities in the tech industry.
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
