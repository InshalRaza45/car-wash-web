import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { animationConfig } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useResponsiveBreakpoints } from '@/hooks/useMediaQuery'

interface DetailingParticlesProps {
  foamFactor: number
  waterFactor: number
  ceramicIridescence: number
}

interface ParticleSystemBuffers {
  positions: Float32Array
  velocities: Float32Array
  colors: Float32Array
  sizes: Float32Array
}

function generateWaterAndFoamBuffers(count: number): ParticleSystemBuffers {
  const positions = new Float32Array(count * 3)
  const velocities = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)

  const colorWhite = new THREE.Color('#FFFFFF')
  const colorCyanWater = new THREE.Color('#7AD7FF')
  const colorDeepBlue = new THREE.Color('#0070F3')

  for (let i = 0; i < count; i++) {
    const isHighPressure = i < count * 0.45 // 45% high-velocity jet spray
    const isFoam = i >= count * 0.45 && i < count * 0.85 // 40% snow foam bubbles
    // remaining 15% are fine ceramic mist

    if (isHighPressure) {
      // High-pressure water jet originating from spray nozzle area
      positions[i * 3] = (Math.random() - 0.5) * 3.6
      positions[i * 3 + 1] = Math.random() * 2.8 + 0.8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.8

      // High downwards & outwards velocity
      velocities[i * 3] = (Math.random() - 0.5) * 0.8
      velocities[i * 3 + 1] = -(Math.random() * 2.2 + 1.8) // Fast drop
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.8

      const mixed = Math.random() > 0.4 ? colorCyanWater : colorWhite
      colors[i * 3] = mixed.r
      colors[i * 3 + 1] = mixed.g
      colors[i * 3 + 2] = mixed.b
      sizes[i] = Math.random() * 0.045 + 0.02
    } else if (isFoam) {
      // Snow foam bubbles (lighter, gentle tumbling)
      positions[i * 3] = (Math.random() - 0.5) * 2.6
      positions[i * 3 + 1] = Math.random() * 2.2 + 0.3
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.4

      velocities[i * 3] = (Math.random() - 0.5) * 0.2
      velocities[i * 3 + 1] = -(Math.random() * 0.5 + 0.2) // Slow float
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2

      colors[i * 3] = colorWhite.r
      colors[i * 3 + 1] = colorWhite.g
      colors[i * 3 + 2] = colorWhite.b
      sizes[i] = Math.random() * 0.065 + 0.035
    } else {
      // Ceramic Iridescence nano-mist sparkles
      positions[i * 3] = (Math.random() - 0.5) * 3.8
      positions[i * 3 + 1] = Math.random() * 2.5 + 0.2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5.0

      velocities[i * 3] = (Math.random() - 0.5) * 0.15
      velocities[i * 3 + 1] = Math.sin(i) * 0.1
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.15

      const c = Math.random() > 0.5 ? colorCyanWater : colorDeepBlue
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
      sizes[i] = Math.random() * 0.03 + 0.015
    }
  }

  return { positions, velocities, colors, sizes }
}

export const DetailingParticles: React.FC<DetailingParticlesProps> = ({
  foamFactor,
  waterFactor,
  ceramicIridescence,
}) => {
  const prefersReducedMotion = useReducedMotion()
  const { deviceTier } = useResponsiveBreakpoints()
  const particlesRef = useRef<THREE.Points>(null)

  const count = useMemo(() => {
    if (prefersReducedMotion) return 0
    const tier = (deviceTier as 'desktop' | 'tablet' | 'mobile') || 'desktop'
    return animationConfig.particles[tier].maxCount
  }, [prefersReducedMotion, deviceTier])

  const buffers = useMemo(() => {
    return generateWaterAndFoamBuffers(count)
  }, [count])

  useFrame((state, delta) => {
    if (!particlesRef.current || count === 0) return

    const posAttr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute
    const posArray = posAttr.array as Float32Array

    const activity = Math.max(foamFactor, waterFactor, ceramicIridescence)
    if (activity < 0.015) {
      particlesRef.current.visible = false
      return
    }
    particlesRef.current.visible = true

    const t = state.clock.getElapsedTime()

    for (let i = 0; i < count; i++) {
      const idx = i * 3
      const isWater = i < count * 0.45
      const isFoam = i >= count * 0.45 && i < count * 0.85

      if (isWater && waterFactor > 0.05) {
        // High-pressure water jet stream with spray turbulence
        posArray[idx] += buffers.velocities[idx] * delta * (1 + waterFactor * 1.5)
        posArray[idx + 1] += buffers.velocities[idx + 1] * delta * (1.2 + waterFactor * 2.0)
        posArray[idx + 2] += buffers.velocities[idx + 2] * delta * (1 + waterFactor * 1.5)

        // Reset with spray spread
        if (posArray[idx + 1] < 0.05) {
          posArray[idx + 1] = 2.8 + Math.random() * 0.5
          posArray[idx] = (Math.random() - 0.5) * 3.4
          posArray[idx + 2] = (Math.random() - 0.5) * 4.6
        }
      } else if (isFoam && foamFactor > 0.05) {
        // Soap lather sliding down the chassis curvature
        posArray[idx] += Math.sin(t * 2.0 + i) * 0.005
        posArray[idx + 1] += buffers.velocities[idx + 1] * delta * (1 + foamFactor)
        posArray[idx + 2] += Math.cos(t * 1.5 + i) * 0.005

        if (posArray[idx + 1] < 0.08) {
          posArray[idx + 1] = 2.4 + ((i * 13) % 40) / 100
          posArray[idx] = (((i * 29) % 30) / 10 - 1.5)
          posArray[idx + 2] = (((i * 43) % 40) / 10 - 2.0)
        }
      } else if (ceramicIridescence > 0.05) {
        // Shimmering ceramic nano-coating crystals floating in orbit
        posArray[idx] += Math.sin(t * 1.5 + i) * 0.008
        posArray[idx + 1] += Math.cos(t * 1.2 + i) * 0.008
        posArray[idx + 2] += Math.sin(t * 1.8 + i) * 0.008
      }
    }

    posAttr.needsUpdate = true
  })

  if (count === 0) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[buffers.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[buffers.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.88}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
