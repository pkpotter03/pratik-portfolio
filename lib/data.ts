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
  { href: '#journey', label: 'journey' },
  { href: '#experience', label: 'exp' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#terminal-section', label: 'terminal' },
  { href: '#contact', label: 'contact' },
]

// ─── Boot Sequence ────────────────────────────────────────────────────────────
export const BOOT_LINES: BootLine[] = [
  { text: 'BIOS v3.0.0 — PRATIK_SYSTEMS', type: 'ok', delay: 0 },
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
  { value: '15+', label: 'TECH STACK', count: 15 },
  { value: '2', label: 'ENTERPRISE APPS', count: 2 },
  { value: '100%', label: 'TYPE SECURE' },
]

// ─── Scrollytelling Panels ────────────────────────────────────────────────────
export const SCROLLYTELL_PANELS = [
  {
    id: 'init',
    phase: '01',
    title: 'INITIALIZING',
    subtitle: 'Who I Am',
    body: 'A full-stack developer who turns caffeine into production-grade code. Passionate about building systems that scale — from database schema to cloud deployment.',
    accent: '#00ff41',
  },
  {
    id: 'build',
    phase: '02',
    title: 'BUILDING',
    subtitle: 'What I Craft',
    body: 'Secure REST APIs, role-based access systems, real-time dashboards, and enterprise platforms. Every endpoint tested, every migration planned, every deployment automated.',
    accent: '#00ffff',
  },
  {
    id: 'deploy',
    phase: '03',
    title: 'DEPLOYING',
    subtitle: 'The Stack',
    body: 'React & Next.js on the front. NestJS & PostgreSQL on the back. Docker containers on AWS. Redis for the speed. Prisma for the elegance. TypeScript for the safety.',
    accent: '#ffb000',
  },
  {
    id: 'connect',
    phase: '04',
    title: 'CONNECTING',
    subtitle: 'Let\'s Build Together',
    body: 'Looking for a developer who ships clean code and thinks in systems? Let\'s connect. I\'m open to full-time roles, collaborations, and interesting challenges.',
    accent: '#ff2244',
  },
]

// ─── Experience ───────────────────────────────────────────────────────────────
export const EXPERIENCE: ExperienceItem[] = [
  {
    dateFrom: 'APR 2026',
    dateTo: 'PRESENT',
    company: 'RIVEDIX TECHNOLOGY',
    role: 'SOFTWARE DEVELOPMENT ENGINEER',
    active: true,
    bullets: [
      'Promoted from intern to full-time SDE — owning end-to-end feature development across the stack.',
      'Architecting and shipping production features in React (Next.js) and NestJS for enterprise clients.',
      'Designing scalable REST APIs, authentication workflows, and role-based access control systems.',
      'Leading database schema design, complex queries, and migrations with PostgreSQL + Prisma ORM.',
      'Cloud deployments and CI/CD pipeline management on AWS for reliable production releases.',
    ],
  },
  {
    dateFrom: 'OCT 2025',
    dateTo: 'MAR 2026',
    company: 'RIVEDIX TECHNOLOGY',
    role: 'APPLICATION & PRODUCT DEVELOPMENT INTERN',
    bullets: [
      'Full-stack development using React (Next.js) and backend APIs with NestJS for secure, scalable applications.',
      'Implemented REST APIs, authentication workflows, and role-based access control systems.',
      'PostgreSQL + Prisma ORM — schema design, complex queries, and database migrations.',
      'Enterprise backend architecture: controllers, services, modules — aligned with MVC patterns.',
      'Cloud-based deployments and CI/CD pipelines on AWS ensuring reliable production releases.',
    ],
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    label: 'FRONTEND',
    skills: [
      { name: 'React / Next.js', icon: 'SiReact', desc: 'UI Framework' },
      { name: 'TypeScript', icon: 'SiTypescript', desc: 'Type Safety' },
      { name: 'Tailwind CSS', icon: 'SiTailwindcss', desc: 'Utility CSS' },
      { name: 'Angular', icon: 'SiAngular', desc: 'Enterprise SPA' },
    ],
  },
  {
    label: 'BACKEND',
    skills: [
      { name: 'NestJS', icon: 'SiNestjs', desc: 'Node Framework' },
      { name: 'Node.js', icon: 'SiNodedotjs', desc: 'Runtime' },
      { name: 'REST APIs', icon: 'SiFastapi', desc: 'API Design' },
      { name: 'JWT / RBAC', icon: 'SiJsonwebtokens', desc: 'Auth & Access' },
    ],
  },
  {
    label: 'DATABASE & CLOUD',
    skills: [
      { name: 'PostgreSQL', icon: 'SiPostgresql', desc: 'Relational DB' },
      { name: 'Prisma', icon: 'SiPrisma', desc: 'ORM' },
      { name: 'MongoDB', icon: 'SiMongodb', desc: 'Document DB' },
      { name: 'Redis', icon: 'DiRedis', desc: 'In-Memory Cache' },
      { name: 'AWS', icon: 'FaAws', desc: 'Cloud Platform' },
      { name: 'Docker', icon: 'SiDocker', desc: 'Containers' },
    ],
  },
  {
    label: 'LANGUAGES',
    skills: [
      { name: 'JavaScript', icon: 'SiJavascript', desc: 'Web Native' },
      { name: 'TypeScript', icon: 'SiTypescript', desc: 'Typed JS' },
      { name: 'C#', icon: 'TbBrandCSharp', desc: '.NET Language' },
      { name: 'C / C++', icon: 'TbBrandCpp', desc: 'Systems' },
      { name: 'Java', icon: 'FaJava', desc: 'Enterprise' },
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
  "Python devs: 'It's so simple and readable.' Also Python devs: 47 virtual environments later.",
  "Java devs don't write code. They build ecosystems around a single class.",
  "AI/ML devs: 'The model is almost perfect.' Translation: It works 7 out of 10 times.",
  "Every Python script starts as 20 lines and ends up importing half of PyPI.",
  "Java compilation time is just enforced meditation.",
  "AI engineers spend 3 days tuning hyperparameters and 10 minutes explaining it confidently.",
  "Python indentation error is the most polite way the language says: 'You messed up.'",
  "Java devs: 'It's strongly typed.' Also Java devs: Writing 200 lines to avoid null.",
  "AI projects: 80% data cleaning, 15% waiting for training, 5% actually working.",
  "Full stack devs judging everyone while debugging their own build error for 2 hours."
]

export const SPARK_CHARS = ['0', '1', '>', '<', '/', '{', '}', '#', '@', '!', '*']

// Fake "stolen" data lines that flood the screen
export const STOLEN_DATA = [
  'ENUMERATING NETWORK INTERFACES...',
  'eth0: 192.168.1.42  CONNECTED',
  'wlan0: 10.0.0.7     CONNECTED',
  'lo: 127.0.0.1       LOOPBACK',
  'SCANNING OPEN PORTS...',
  'PORT 22   SSH     OPEN',
  'PORT 80   HTTP    OPEN',
  'PORT 443  HTTPS   OPEN',
  'PORT 3306 MYSQL   OPEN ← VULNERABLE',
  'DUMPING BROWSER COOKIES...',
  'google.com       session_id=a7f3d...  ✓ CAPTURED',
  'github.com       user_token=gh_p...   ✓ CAPTURED',
  'linkedin.com     li_at=AQED...        ✓ CAPTURED',
  'READING CLIPBOARD CONTENTS...',
  'CLIPBOARD: "password123" ← NICE TRY',
  'SCANNING LOCAL STORAGE...',
  'FOUND 47 KEYS IN localStorage',
  'EXFILTRATING TO C2 SERVER...',
  'CONNECTING TO 185.220.101.47:4444...',
  'TUNNEL ESTABLISHED ✓',
  'UPLOADING KEYLOG DATA... [████████░░] 80%',
  'SENDING SCREENSHOT... [██████████] 100% ✓',
  'ESCALATING PRIVILEGES...',
  'sudo: PERMISSION GRANTED (obviously, you typed it)',
  'ROOT ACCESS OBTAINED ✓',
  'INSTALLING BACKDOOR...',
  'BACKDOOR INSTALLED AT /tmp/.hidden_totally_not_malware',
  'ADDING TO CRONTAB...',
  '@reboot /tmp/.hidden_totally_not_malware &',
  'MINING CRYPTO IN BACKGROUND... (just kidding)',
  'SELF-DESTRUCT SEQUENCE INITIATED...',
  '10... 9... 8... 7...',
]

export const REVEAL_LINES = [
  '> jk lol. you\'re fine. 😄',
  '',
  '> but you really just typed "sudo" on',
  '> a stranger\'s portfolio website.',
  '',
  '> that\'s either very brave or very trusting.',
  '> Pratik respects both.',
  '',
  '> you clearly know your unix commands.',
  '> he\'d love to work with you.',
  '',
  '> pratikkumbhar2003@gmail.com',
]
