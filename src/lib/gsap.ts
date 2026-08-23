import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Ensure plugins are registered once in a client-safe manner
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
  
  // Configure GSAP defaults for snappy, cinematic automotive animations
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.8,
  })

  // Prevent lag smoothing delays from throwing off scroll synchronization
  gsap.ticker.lagSmoothing(0)
}

export { gsap, ScrollTrigger, useGSAP }
export default gsap
