import SectionHeader from './SectionHeader'
import ProjectCard from './ProjectCard'
import { PROJECTS } from '@/lib/data'

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 min-h-screen pt-24 pb-16 px-10 max-w-[1200px] mx-auto"
    >
      <SectionHeader tag="builds" title="PROJECTS" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.num} project={project} />
        ))}
      </div>
    </section>
  )
}
