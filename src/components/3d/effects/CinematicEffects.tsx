import React from 'react'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { animationConfig } from '@/lib/constants'
import { useResponsiveBreakpoints } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface CinematicEffectsProps {
  enabled?: boolean
}

export const CinematicEffects: React.FC<CinematicEffectsProps> = ({ enabled = true }) => {
  const { isMobile } = useResponsiveBreakpoints()
  const prefersReducedMotion = useReducedMotion()

  // On low-power mobile or reduced motion, disable post-processing for maximum 60fps performance
  if (!enabled || isMobile || prefersReducedMotion) {
    return null
  }

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={animationConfig.postprocessing.bloom.intensity}
        luminanceThreshold={animationConfig.postprocessing.bloom.luminanceThreshold}
        luminanceSmoothing={animationConfig.postprocessing.bloom.luminanceSmoothing}
        mipmapBlur
      />
      <Vignette
        offset={animationConfig.postprocessing.vignette.offset}
        darkness={animationConfig.postprocessing.vignette.darkness}
        eskil={false}
      />
    </EffectComposer>
  )
}
