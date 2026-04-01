'use client'

import { useCustomCursor } from '@/hooks/useCustomCursor'

export default function CustomCursor() {
  const { cursorRef, dotRef, isTouchDevice } = useCustomCursor()

  if (isTouchDevice) return null

  return (
    <>
      {/* Lagging ring */}
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 border-2 border-green-dim rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background] duration-200 hidden md:block"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Instant dot */}
      <div
        ref={dotRef}
        className="fixed w-1 h-1 bg-green-dim rounded-full pointer-events-none z-[10001] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ boxShadow: '0 0 6px #00ff41' }}
      />
    </>
  )
}
