// ─── Terminal ────────────────────────────────────────────────────────────────
export type TermLineType = 'response' | 'info' | 'error' | 'user' | 'warn'

export interface TermLine {
  cls: TermLineType
  txt: string
}

// ─── Skills ──────────────────────────────────────────────────────────────────
export interface Skill {
  name: string
  pct: number
}

export interface SkillCategory {
  label: string
  skills: Skill[]
}

// ─── Experience ───────────────────────────────────────────────────────────────
export interface ExperienceItem {
  dateFrom: string
  dateTo: string
  company: string
  role: string
  bullets: string[]
  active?: boolean
}

// ─── Projects ─────────────────────────────────────────────────────────────────
export interface ProjectStat {
  label: string
  value: string
  valueColor?: string
}

export interface Project {
  num: string
  name: string
  subtitle: string
  description: string
  tags: string[]
  stats: ProjectStat[]
  link?: string
  linkLabel?: string
}

// ─── Contact ──────────────────────────────────────────────────────────────────
export interface ContactLink {
  icon: string
  label: string
  value: string
  href: string
  external?: boolean
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
export interface BootLine {
  text: string
  type: 'ok' | 'warn' | 'err' | 'blank'
  delay: number
}
