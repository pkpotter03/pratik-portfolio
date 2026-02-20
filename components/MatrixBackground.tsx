'use client'

import { useMatrixRain } from '@/hooks/useMatrixRain'

interface MatrixBackgroundProps {
  opacity?: number
}

export default function MatrixBackground({ opacity = 0.18 }: MatrixBackgroundProps) {
  const canvasRef = useMatrixRain(opacity)

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity }}
    />
  )
}
