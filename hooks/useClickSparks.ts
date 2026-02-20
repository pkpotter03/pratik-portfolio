'use client'

import { useEffect } from 'react'
import { SPARK_CHARS } from '@/lib/data'

export function useClickSparks(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

      for (let i = 0; i < 6; i++) {
        const spark = document.createElement('div')
        spark.style.cssText = `
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          color: #00ff41;
          font-family: 'Share Tech Mono', monospace;
          animation: sparkFloatUp 0.8s ease-out forwards;
          left: ${e.clientX + (Math.random() - 0.5) * 40}px;
          top: ${e.clientY + (Math.random() - 0.5) * 20}px;
          font-size: ${0.6 + Math.random() * 0.5}rem;
          animation-duration: ${0.5 + Math.random() * 0.5}s;
        `
        spark.textContent = SPARK_CHARS[Math.floor(Math.random() * SPARK_CHARS.length)]
        document.body.appendChild(spark)
        setTimeout(() => spark.remove(), 800)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [enabled])
}
