# PRATIK.SYS — Portfolio v2.0

Hacker-themed personal portfolio built with **Next.js 14 + TypeScript + Tailwind CSS**.

## 🗂 Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles, keyframes, Tailwind base
│   ├── layout.tsx           # Root layout with metadata & font imports
│   └── page.tsx             # Root page — orchestrates all sections
│
├── components/
│   ├── BootScreen.tsx       # Animated Linux-style boot sequence
│   ├── CustomCursor.tsx     # Lagging ring + instant dot cursor
│   ├── MatrixBackground.tsx # Canvas Matrix rain background
│   ├── Navbar.tsx           # Fixed nav with active section tracking
│   ├── SectionHeader.tsx    # Reusable section title component
│   ├── HeroSection.tsx      # Hero with glitch name + animated stats
│   ├── ExperienceSection.tsx # Timeline-style work history
│   ├── SkillsSection.tsx    # htop-style skill matrix
│   ├── SkillBar.tsx         # Individual animated skill bar
│   ├── ProjectsSection.tsx  # Grid of project cards
│   ├── ProjectCard.tsx      # Individual project card with hover FX
│   ├── TerminalWindow.tsx   # Reusable macOS-style terminal chrome
│   ├── TypingIndicator.tsx  # Animated 3-dot typing indicator
│   ├── InteractiveTerminal.tsx  # ⭐ Interactive command terminal
│   ├── TerminalSection.tsx  # Section wrapper for terminal
│   ├── ContactSection.tsx   # Contact links + bio
│   └── Footer.tsx           # Footer with live date
│
├── hooks/
│   ├── useCustomCursor.ts   # Cursor animation logic
│   ├── useMatrixRain.ts     # Canvas Matrix rain animation
│   ├── useScrollReveal.ts   # IntersectionObserver scroll reveals
│   ├── useUptime.ts         # Live clock + session uptime
│   └── useClickSparks.ts   # Click particle effect
│
├── lib/
│   ├── data.ts              # All static portfolio data (edit this!)
│   └── commands.ts          # Terminal command definitions
│
├── types/
│   └── index.ts             # TypeScript interfaces
│
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

## 🚀 Setup

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open http://localhost:3000
```

## ✏️ Customization

All content lives in **`lib/data.ts`** — edit it to update:
- Your name, title, description
- Work experience
- Skills and percentages
- Projects
- Contact info

Terminal commands are in **`lib/commands.ts`**.

## ⭐ Unique Features

| Feature | File |
|---|---|
| Linux boot sequence | `BootScreen.tsx` |
| Interactive terminal with 13 commands | `InteractiveTerminal.tsx` |
| Tab-completion + command history | `InteractiveTerminal.tsx` |
| htop-style animated skill bars | `SkillBar.tsx` |
| Click code-particle sparks | `useClickSparks.ts` |
| Matrix rain toggle via terminal | `page.tsx` + `MatrixBackground.tsx` |
| Live uptime counter | `useUptime.ts` |
| CRT scanlines + noise overlay | `globals.css` |
| Glitch effect on hero name | `HeroSection.tsx` |
| Custom lagging cursor | `useCustomCursor.ts` |

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (available, use for extra animations)
- **Google Fonts** — Orbitron, VT323, Share Tech Mono
