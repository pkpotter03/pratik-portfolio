'use client'

import { useEffect, useRef } from 'react'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\'.split('')
const FONT_SIZE = 14

export function useMatrixRain(opacity: number = 0.18) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const dropsRef = useRef<number[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      dropsRef.current = new Array(Math.floor(canvas.width / FONT_SIZE)).fill(1)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 9, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff41'
      ctx.font = `${FONT_SIZE}px 'Share Tech Mono', monospace`

      dropsRef.current.forEach((y, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.globalAlpha = Math.random() * 0.5 + 0.1
        ctx.fillText(char, i * FONT_SIZE, y * FONT_SIZE)
        ctx.globalAlpha = 1
        if (y * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          dropsRef.current[i] = 0
        }
        dropsRef.current[i]++
      })
    }

    intervalRef.current = setInterval(draw, 50)

    return () => {
      window.removeEventListener('resize', resize)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  // Update interval speed when opacity changes
  useEffect(() => {
    if (!canvasRef.current) return
    canvasRef.current.style.opacity = String(opacity)
  }, [opacity])

  return canvasRef
}
