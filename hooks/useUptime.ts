'use client'

import { useEffect, useState } from 'react'

export function useUptime() {
  const [uptime, setUptime] = useState('00:00:00')
  const [time, setTime] = useState('--:--:--')

  useEffect(() => {
    const start = Date.now()

    const tick = () => {
      const now = new Date()
      setTime(now.toTimeString().slice(0, 8))

      const elapsed = Math.floor((Date.now() - start) / 1000)
      const h = String(Math.floor(elapsed / 3600)).padStart(2, '0')
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0')
      const s = String(elapsed % 60).padStart(2, '0')
      setUptime(`${h}:${m}:${s}`)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return { uptime, time }
}
