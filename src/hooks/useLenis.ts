import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { animationConfig } from '@/lib/constants'
import { useReducedMotion } from './useReducedMotion'

interface UseLenisOptions {
  autoStart?: boolean
  wheelMultiplier?: number
  touchMultiplier?: number
  onScroll?: (lenis: Lenis) => void
}

/**
 * Reusable smooth scroll hook combining Lenis + GSAP ScrollTrigger
 */
export function useLenis(options: UseLenisOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // If user prefers reduced motion, do not force smooth inertia scrolling
    if (prefersReducedMotion) {
      return
    }

    const lenis = new Lenis({
      duration: animationConfig.lenis.duration,
      easing: animationConfig.lenis.easing,
      orientation: animationConfig.lenis.orientation,
      gestureOrientation: animationConfig.lenis.gestureOrientation,
      smoothWheel: true,
      wheelMultiplier: options.wheelMultiplier ?? animationConfig.lenis.wheelMultiplier,
      touchMultiplier: options.touchMultiplier ?? animationConfig.lenis.touchMultiplier,
      autoRaf: false, // We drive Lenis via GSAP ticker for perfect frame synchronization
    })

    lenisRef.current = lenis

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update()
      if (options.onScroll) {
        options.onScroll(lenis)
      }
    }

    lenis.on('scroll', handleScroll)

    // Synchronize GSAP ticker with Lenis frame loop
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.off('scroll', handleScroll)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [prefersReducedMotion, options])

  return lenisRef
}
