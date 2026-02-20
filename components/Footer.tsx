'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [date, setDate] = useState('')

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    )
  }, [])

  return (
    <footer className="relative z-10 flex flex-wrap justify-between items-center gap-4 px-10 py-6 border-t border-green-dark font-mono text-[0.75rem] text-green-dim">
      <div>
        <span className="text-green">PRATIK KUMBHAR</span> — Full Stack Developer
      </div>
      <div>
        Built with <span className="text-green">Next.js + TypeScript</span> · Hacker Edition v2.0
      </div>
      <div>{date}</div>
    </footer>
  )
}
