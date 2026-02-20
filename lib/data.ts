import type {
  SkillCategory,
  ExperienceItem,
  Project,
  ContactLink,
  BootLine,
} from '@/types'

// ─── Nav Links ────────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { href: '#hero', label: 'home' },
  { href: '#experience', label: 'exp' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#terminal-section', label: 'terminal' },
  { href: '#contact', label: 'contact' },
]

// ─── Boot Sequence ────────────────────────────────────────────────────────────
export const BOOT_LINES: BootLine[] = [
  { text: 'BIOS v2.0.5 — PRATIK_SYSTEMS', type: 'ok', delay: 0 },

  { text: 'Checking RAM.................... 16384MB OK', type: 'ok', delay: 400 },
  { text: 'Checking CPU.................... 8 cores @ 3.6GHz OK', type: 'ok', delay: 800 },

  { text: 'Loading kernel modules.......... [OK]', type: 'ok', delay: 1300 },
  { text: 'Mounting filesystem /portfolio.. [OK]', type: 'ok', delay: 1700 },

  { text: 'Loading React.js v18............. [OK]', type: 'ok', delay: 2200 },
  { text: 'Loading NestJS v10.............. [OK]', type: 'ok', delay: 2600 },
  { text: 'Loading PostgreSQL driver....... [OK]', type: 'ok', delay: 3000 },

  { text: 'Initializing AWS services....... [OK]', type: 'ok', delay: 3400 },

  { text: 'WARNING: High caffeine levels detected', type: 'warn', delay: 3900 },

  { text: 'Loading skill_matrix.json....... [OK]', type: 'ok', delay: 4400 },
  { text: 'Starting portfolio server....... [OK]', type: 'ok', delay: 4800 },

  { text: '', type: 'blank', delay: 5200 },

  { text: '> SYSTEM READY. Welcome to PRATIK.SYS', type: 'ok', delay: 5600 },
]

// ─── Hero Stats ───────────────────────────────────────────────────────────────
export const HERO_STATS = [
  { value: '3+', label: 'YEARS CODING', count: 3 },
  { value: '2+', label: 'MAJOR PROJECTS', count: 2 },
  { value: '100%', label: 'ENDPOINTS SECURED' },
  { value: '40%↑', label: 'RECRUITER EFFICIENCY' },
]

// ─── Experience ───────────────────────────────────────────────────────────────
export const EXPERIENCE: ExperienceItem[] = [
  {
    dateFrom: 'OCT 2025',
    dateTo: 'PRESENT',
    company: 'RIVEDIX TECHNOLOGY',
    role: 'APPLICATION & PRODUCT DEVELOPMENT INTERN',
    active: true,
    bullets: [
      'Full-stack development using React (Next.js) and backend APIs with NestJS for secure, scalable applications.',
      'Designed and implemented REST APIs, authentication workflows, and role-based access control systems.',
      'PostgreSQL + Prisma ORM — schema design, complex queries, and database migrations.',
      'Enterprise backend architecture: controllers, services, modules — aligned with MVC patterns.',
      'Cloud-based deployments and CI/CD pipelines on AWS ensuring reliable production releases.',
    ],
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: '// FRONTEND',
    skills: [
      { name: 'React.js / Next.js', pct: 88 },
      { name: 'TypeScript', pct: 80 },
      { name: 'Tailwind CSS', pct: 82 },
      { name: 'Angular (basic)', pct: 40 },
    ],
  },
  {
    label: '// BACKEND',
    skills: [
      { name: 'NestJS', pct: 85 },
      { name: 'Node.js', pct: 82 },
      { name: 'REST API Design', pct: 88 },
      { name: 'JWT / RBAC', pct: 83 },
    ],
  },
  {
    label: '// DATABASE & CLOUD',
    skills: [
      { name: 'PostgreSQL / Prisma', pct: 80 },
      { name: 'MySQL', pct: 72 },
      { name: 'MongoDB', pct: 65 },
      { name: 'Redis', pct: 70 },
      { name: 'AWS (EC2/S3/IAM)', pct: 68 },
      { name: 'Docker / CI/CD', pct: 72 },
    ],
  },
  {
    label: '// LANGUAGES',
    skills: [
      { name: 'JavaScript', pct: 88 },
      { name: 'TypeScript', pct: 80 },
      { name: 'C#', pct: 62 },
      { name: 'C/C++', pct: 65 },
      { name: 'Java', pct: 58 },
    ],
  },
]

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  {
    num: '01',
    name: 'CYKRUIT',
    subtitle: 'CYBERSECURITY JOB PORTAL',
    description:
      'Full-stack cybersecurity-focused job portal managing job postings and candidate applications. Features AI-powered candidate–job scoring via Gemini API, Redis-based background processing, and role-based access control securing 100% of protected endpoints.',
    tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Gemini AI'],
    stats: [
      { label: 'Latency', value: '↓30%' },
      { label: 'Shortlisting', value: '↑40%' },
      { label: 'Coverage', value: '100%' },
    ],
    link: 'https://cykruit.com',
    linkLabel: 'cykruit.com',
  },
  {
    num: '02',
    name: 'CMA PLATFORM',
    subtitle: 'CYBER MATURITY ASSESSMENT',
    description:
      'Enterprise platform evaluating organizational security posture using structured assessment workflows. Multi-role system: Admin, Assessor, and Client lanes. Phase 2 will add AI-assisted question dependency, automated scoring, and intelligent report generation.',
    tags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'RBAC'],
    stats: [
      { label: 'Roles', value: '3' },
      { label: 'Phase', value: '1/2' },
      { label: 'Status', value: 'WIP', valueColor: 'amber' },
    ],
    linkLabel: 'PRIVATE PROJECT',
  },
]

// ─── Contact ──────────────────────────────────────────────────────────────────
export const CONTACT_LINKS: ContactLink[] = [
  {
    icon: '@',
    label: 'EMAIL',
    value: 'pratikkumbhar2003@gmail.com',
    href: 'mailto:pratikkumbhar2003@gmail.com',
  },
  {
    icon: '#',
    label: 'PHONE',
    value: '+91 8956236764',
    href: 'tel:+918956236764',
  },
  {
    icon: '⌥',
    label: 'GITHUB',
    value: 'github.com/pkpotter03',
    href: 'https://github.com/pkpotter03',
    external: true,
  },
  {
    icon: '⋮',
    label: 'LINKEDIN',
    value: 'linkedin.com/in/pkpotter03',
    href: 'https://linkedin.com/in/pkpotter03',
    external: true,
  },
]

// ─── Terminal Commands Data ───────────────────────────────────────────────────
export const DEV_JOKES = [
  "Python devs: 'It’s so simple and readable.' Also Python devs: 47 virtual environments later.",
  "Java devs don’t write code. They build ecosystems around a single class.",
  "AI/ML devs: 'The model is almost perfect.' Translation: It works 7 out of 10 times.",
  "Every Python script starts as 20 lines and ends up importing half of PyPI.",
  "Java compilation time is just enforced meditation.",
  "AI engineers spend 3 days tuning hyperparameters and 10 minutes explaining it confidently.",
  "Python indentation error is the most polite way the language says: 'You messed up.'",
  "Java devs: 'It’s strongly typed.' Also Java devs: Writing 200 lines to avoid null.",
  "AI projects: 80% data cleaning, 15% waiting for training, 5% actually working.",
  "Full stack devs judging everyone while debugging their own build error for 2 hours."
]

export const SPARK_CHARS = ['0', '1', '>', '<', '/', '{', '}', '#', '@', '!', '*']
