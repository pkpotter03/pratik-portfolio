'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Initialise GSAP scroll-triggered reveal animations
 * for all `.gsap-reveal` elements on the page.
 */
export function useGSAPReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll<HTMLElement>('.gsap-reveal')

      elements.forEach((el) => {
        gsap.set(el, { opacity: 0, y: 30 })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
            })
          },
        })
      })
    })

    return () => ctx.revert()
  }, [enabled])
}

/**
 * Hook that returns a ref-callback attaching a GSAP entry animation
 * to individual elements with staggered delay.
 */
export function useGSAPStagger() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current) return

    const ctx = gsap.context(() => {
      const children = container.current!.querySelectorAll<HTMLElement>('.gsap-stagger-child')

      gsap.set(children, { opacity: 0, y: 24 })

      ScrollTrigger.create({
        trigger: container.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(children, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
          })
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return container
}
