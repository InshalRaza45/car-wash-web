import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { animationConfig, type VehicleHotspot } from '@/lib/constants'
import { clamp, lerp } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useResponsiveBreakpoints } from '@/hooks/useMediaQuery'

interface CinematicCameraProps {
  scrollProgress: number
  activeHotspot?: VehicleHotspot | null
}

interface Waypoint {
  progress: number
  pos: readonly [number, number, number] | [number, number, number]
  target: readonly [number, number, number] | [number, number, number]
}

export const CinematicCamera: React.FC<CinematicCameraProps> = ({
  scrollProgress,
  activeHotspot = null,
}) => {
  const { camera, viewport } = useThree()
  const prefersReducedMotion = useReducedMotion()
  const { isMobile, isTouch } = useResponsiveBreakpoints()
  const currentPos = useRef(new THREE.Vector3(...animationConfig.camera.waypoints[0].pos))
  const currentTarget = useRef(new THREE.Vector3(...animationConfig.camera.waypoints[0].target))
  const targetPos = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    // Dynamic aspect-ratio adaptation for portrait mobile screens
    const aspect = viewport.aspect
    const isPortrait = aspect < 1.0
    const mobileDistanceScale = isPortrait ? Math.min(1.45, 1.05 / Math.max(0.55, aspect)) : 1.0
    const mobileHeightOffset = isPortrait ? 0.35 : 0.0

    if (prefersReducedMotion) {
      camera.position.set(
        animationConfig.reducedMotion.cameraPos[0] * mobileDistanceScale,
        animationConfig.reducedMotion.cameraPos[1] + mobileHeightOffset,
        animationConfig.reducedMotion.cameraPos[2] * mobileDistanceScale
      )
      camera.lookAt(...animationConfig.reducedMotion.cameraTarget)
      return
    }

    // Subtle luxury mouse parallax on desktop only
    const mouseX = (!isTouch && !isMobile) ? state.pointer.x * 0.35 : 0
    const mouseY = (!isTouch && !isMobile) ? state.pointer.y * 0.2 : 0

    // 1. If an active 3D hotspot is selected, prioritize zooming to its camera waypoint
    if (activeHotspot) {
      targetPos.current.set(
        (activeHotspot.cameraPos[0] + mouseX * 0.2) * (isPortrait ? 1.2 : 1.0),
        activeHotspot.cameraPos[1] + mouseY * 0.15 + mobileHeightOffset,
        activeHotspot.cameraPos[2] * (isPortrait ? 1.2 : 1.0)
      )
      targetLookAt.current.set(...activeHotspot.cameraTarget)
    } else {
      // 2. Otherwise smoothly interpolate along the master scroll waypoints
      const p = clamp(scrollProgress, 0, 1)
      const waypoints = animationConfig.camera.waypoints as readonly Waypoint[]

      let p0: Waypoint = waypoints[0]
      let p1: Waypoint = waypoints[waypoints.length - 1]

      for (let i = 0; i < waypoints.length - 1; i++) {
        if (p >= waypoints[i].progress && p <= waypoints[i + 1].progress) {
          p0 = waypoints[i]
          p1 = waypoints[i + 1]
          break
        }
      }

      const segmentLength = p1.progress - p0.progress
      const t = segmentLength === 0 ? 0 : (p - p0.progress) / segmentLength

      targetPos.current.set(
        (lerp(p0.pos[0], p1.pos[0], t) + mouseX) * mobileDistanceScale,
        lerp(p0.pos[1], p1.pos[1], t) + mouseY + mobileHeightOffset,
        (lerp(p0.pos[2], p1.pos[2], t)) * mobileDistanceScale
      )

      targetLookAt.current.set(
        lerp(p0.target[0], p1.target[0], t),
        lerp(p0.target[1], p1.target[1], t) + (isPortrait ? 0.1 : 0),
        lerp(p0.target[2], p1.target[2], t)
      )
    }

    // Smooth inertia dampening (60 FPS fluid trajectory)
    const dampSpeed = Math.min(delta * 4.5, 1)
    currentPos.current.lerp(targetPos.current, dampSpeed)
    currentTarget.current.lerp(targetLookAt.current, dampSpeed)

    camera.position.copy(currentPos.current)
    camera.lookAt(currentTarget.current)
  })

  return null
}
