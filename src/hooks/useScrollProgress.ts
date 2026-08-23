import { useState, useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { VEHICLE_STATE_MILESTONES, type VehicleStateMilestone } from '@/lib/constants'
import { lerp, clamp } from '@/lib/utils'

export interface InterpolatedVehicleFactors {
  dirtFactor: number
  foamFactor: number
  waterFactor: number
  clearcoatRoughness: number
  clearcoatStrength: number
  ceramicIridescence: number
}

/**
 * Calculates linearly interpolated factors based on normalized progress (0 -> 1)
 */
export function calculateVehicleFactors(progress: number): InterpolatedVehicleFactors {
  const p = clamp(progress, 0, 1)
  const milestones = VEHICLE_STATE_MILESTONES

  // Find surrounding milestones
  let prev = milestones[0]
  let next = milestones[milestones.length - 1]

  for (let i = 0; i < milestones.length - 1; i++) {
    if (p >= milestones[i].progress && p <= milestones[i + 1].progress) {
      prev = milestones[i]
      next = milestones[i + 1]
      break
    }
  }

  const range = next.progress - prev.progress
  const factor = range === 0 ? 0 : (p - prev.progress) / range

  return {
    dirtFactor: lerp(prev.dirtFactor, next.dirtFactor, factor),
    foamFactor: lerp(prev.foamFactor, next.foamFactor, factor),
    waterFactor: lerp(prev.waterFactor, next.waterFactor, factor),
    clearcoatRoughness: lerp(prev.clearcoatRoughness, next.clearcoatRoughness, factor),
    clearcoatStrength: lerp(prev.clearcoatStrength, next.clearcoatStrength, factor),
    ceramicIridescence: lerp(prev.ceramicIridescence, next.ceramicIridescence, factor),
  }
}

/**
 * Get the closest milestone for a given progress
 */
export function getActiveMilestone(progress: number): VehicleStateMilestone {
  const p = clamp(progress, 0, 1)
  let closest = VEHICLE_STATE_MILESTONES[0]
  let minDiff = Math.abs(p - closest.progress)

  for (const milestone of VEHICLE_STATE_MILESTONES) {
    const diff = Math.abs(p - milestone.progress)
    if (diff < minDiff) {
      minDiff = diff
      closest = milestone
    }
  }

  return closest
}

export function useScrollProgress() {
  const [progress, setProgress] = useState<number>(0)
  const [velocity, setVelocity] = useState<number>(0)
  const [direction, setDirection] = useState<number>(1)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = maxScroll > 0 ? clamp(scrollY / maxScroll, 0, 1) : 0
      
      setProgress(currentProgress)
    }

    // Bind with ScrollTrigger for sub-pixel accuracy
    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        setProgress(self.progress)
        setVelocity(self.getVelocity())
        setDirection(self.direction)
      },
    })

    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    return () => {
      window.removeEventListener('scroll', updateScroll)
      trigger.kill()
    }
  }, [])

  const activeMilestone = getActiveMilestone(progress)
  const factors = calculateVehicleFactors(progress)

  return {
    progress,
    velocity,
    direction,
    activeMilestone,
    factors,
  }
}
