import type { TermLine } from '@/types'
import { DEV_JOKES } from './data'

export type CommandName =
  | 'help' | 'about' | 'skills' | 'experience' | 'projects'
  | 'contact' | 'education' | 'goals' | 'jokes' | 'matrix'
  | 'secret' | 'hire me' | 'clear'

export const COMMAND_LIST: CommandName[] = [
  'help', 'about', 'skills', 'experience', 'projects',
  'contact', 'education', 'goals', 'jokes', 'matrix',
  'secret', 'hire me', 'clear',
]

type CommandResult = TermLine[] | { type: 'clear' } | { type: 'matrix' }

export const COMMANDS: Record<string, () => CommandResult> = {
  help: () => [
    { cls: 'info', txt: '╔══════════════════════════════════════╗' },
    { cls: 'info', txt: '║        AVAILABLE COMMANDS             ║' },
    { cls: 'info', txt: '╚══════════════════════════════════════╝' },
    { cls: 'response', txt: 'about       — Who is Pratik?' },
    { cls: 'response', txt: 'skills      — Technical skill stack' },
    { cls: 'response', txt: 'experience  — Work history' },
    { cls: 'response', txt: 'projects    — What I\'ve built' },
    { cls: 'response', txt: 'contact     — How to reach me' },
    { cls: 'response', txt: 'education   — Academic background' },
    { cls: 'response', txt: 'goals       — What am I after?' },
    { cls: 'response', txt: 'jokes       — A dev joke' },
    { cls: 'response', txt: 'matrix      — Toggle matrix rain' },
    { cls: 'response', txt: 'secret      — 🔐 Find the easter egg' },
    { cls: 'response', txt: 'clear       — Clear terminal' },
    { cls: 'response', txt: 'hire me     — 👀' },
  ],

  about: () => [
    { cls: 'info', txt: '> LOADING PROFILE...' },
    { cls: 'response', txt: 'NAME    : Pratik Kumbhar' },
    { cls: 'response', txt: 'ROLE    : Full Stack Developer (Intern @ Rivedix)' },
    { cls: 'response', txt: 'ORIGIN  : Ichalkaranji, Maharashtra, India' },
    { cls: 'response', txt: 'STACK   : React + NestJS + PostgreSQL + AWS' },
    { cls: 'response', txt: 'PASSION : Building things that matter.' },
    { cls: 'response', txt: 'STATUS  : Open to full-time opportunities 🟢' },
  ],

  skills: () => [
    { cls: 'info', txt: '> SCANNING SKILL TREE...' },
    { cls: 'response', txt: '  React / Next.js   ████████░░  88%' },
    { cls: 'response', txt: '  NestJS            ████████░░  85%' },
    { cls: 'response', txt: '  TypeScript        ████████░░  80%' },
    { cls: 'response', txt: '  PostgreSQL+Prisma ████████░░  80%' },
    { cls: 'response', txt: '  AWS / Docker      ███████░░░  70%' },
    { cls: 'response', txt: '  Redis             ███████░░░  70%' },
    { cls: 'response', txt: '  C# / .NET         ██████░░░░  62%' },
  ],

  experience: () => [
    { cls: 'info', txt: '> LOADING WORK HISTORY...' },
    { cls: 'response', txt: '[2025-Oct → Now]  Rivedix Technology Solutions' },
    { cls: 'response', txt: '  Role: App & Product Development Intern' },
    { cls: 'response', txt: '  Stack: Next.js, NestJS, Prisma, PostgreSQL, AWS' },
    { cls: 'response', txt: '  Achievements: REST APIs, RBAC, CI/CD, Cloud deploys' },
  ],

  projects: () => [
    { cls: 'info', txt: '> FETCHING PROJECT MANIFEST...' },
    { cls: 'response', txt: '[1] CYKRUIT — Cybersecurity Job Portal' },
    { cls: 'response', txt: '    Live: cykruit.com' },
    { cls: 'response', txt: '    Stack: Next.js, NestJS, Redis, Docker, Gemini AI' },
    { cls: 'response', txt: '    Impact: ↓30% latency, ↑40% recruiter efficiency' },
    { cls: 'response', txt: '' },
    { cls: 'response', txt: '[2] CMA Platform — Cyber Maturity Assessment' },
    { cls: 'response', txt: '    Stack: Next.js, NestJS, Prisma, PostgreSQL' },
    { cls: 'response', txt: '    Status: Phase 1 complete, Phase 2 in progress' },
  ],

  contact: () => [
    { cls: 'info', txt: '> OPENING CONTACT PROTOCOLS...' },
    { cls: 'response', txt: 'EMAIL   : pratikkumbhar2003@gmail.com' },
    { cls: 'response', txt: 'PHONE   : +91 8956236764' },
    { cls: 'response', txt: 'GITHUB  : github.com/pkpotter03' },
    { cls: 'response', txt: 'LINKEDIN: linkedin.com/in/pkpotter03' },
  ],

  education: () => [
    { cls: 'info', txt: '> LOADING ACADEMIC RECORDS...' },
    { cls: 'response', txt: "[2021-2025] B.Tech CSE — D.K.T.E. Society's Institute" },
    { cls: 'response', txt: '            CGPA: 6.82 / 10' },
    { cls: 'response', txt: '[2019-2021] XII Science — Shraddha Junior College' },
    { cls: 'response', txt: '            Percentage: 90.83%' },
  ],

  goals: () => [
    { cls: 'info', txt: '> QUERYING AMBITION MODULE...' },
    { cls: 'response', txt: 'Short-term : Land a full-time full-stack role' },
    { cls: 'response', txt: 'Mid-term   : Master .NET + Angular enterprise systems' },
    { cls: 'response', txt: 'Long-term  : Build products that reach millions' },
    { cls: 'response', txt: 'Dream      : Start something of my own someday' },
  ],

  jokes: () => {
    let jokeIndex = 0
    const joke = DEV_JOKES[jokeIndex]
    jokeIndex = (jokeIndex + 1) % DEV_JOKES.length
    
    return [
      { cls: 'info', txt: '> LOADING HUMOR.DLL...' },
      { cls: 'response', txt: joke },
    ]
  },

  matrix: () => ({ type: 'matrix' }),

  secret: () => [
    { cls: 'warn', txt: '> ACCESSING CLASSIFIED FILES...' },
    { cls: 'response', txt: '01001000 01100101 01111001 00100001' },
    { cls: 'response', txt: '' },
    { cls: 'info', txt: 'If you decode the binary above, you found the easter egg 🥚' },
    { cls: 'response', txt: 'Hint: ASCII binary → "Hey!"' },
    { cls: 'response', txt: 'You must be a developer too. Pratik would love to meet you.' },
    { cls: 'response', txt: 'Email: pratikkumbhar2003@gmail.com' },
  ],

  'hire me': () => [
    { cls: 'info', txt: '> INITIATING RECRUITMENT PROTOCOL...' },
    { cls: 'response', txt: '██████████████████████████ 100%' },
    { cls: 'response', txt: '' },
    { cls: 'response', txt: 'CANDIDATE SCORE: 9.5/10' },
    { cls: 'response', txt: 'SKILLS: ✓ PASSION: ✓ AVAILABILITY: ✓ COFFEE INTAKE: ✓' },
    { cls: 'response', txt: '' },
    { cls: 'info', txt: '> Shoot an email: pratikkumbhar2003@gmail.com' },
  ],
}
