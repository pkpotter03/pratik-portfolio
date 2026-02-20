'use client'

import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
    }

    const animate = () => {
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.15
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.15
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPos.current.x}px`
        cursorRef.current.style.top = `${cursorPos.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    // Expand cursor on interactive elements
    const expand = () => {
      if (!cursorRef.current) return
      cursorRef.current.style.width = '40px'
      cursorRef.current.style.height = '40px'
      cursorRef.current.style.background = 'rgba(0,255,65,0.1)'
    }
    const shrink = () => {
      if (!cursorRef.current) return
      cursorRef.current.style.width = '20px'
      cursorRef.current.style.height = '20px'
      cursorRef.current.style.background = 'transparent'
    }

    const interactives = document.querySelectorAll('a, button, input, [data-cursor-hover]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', expand)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', expand)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [])

  return { cursorRef, dotRef }
}
