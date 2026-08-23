/**
 * WashScene Architecture
 * Visual State: WASHING -> CLEAN (progress: 0.20 -> 0.40)
 * Focus: Active snow foam cannon overlay, water spray mist particles, dirt encapsulation and runoff.
 */

export interface WashSceneConfig {
  foamParticleDensity: number
  waterFlowRate: number
  washparkUnderglow: string
}

export const washSceneConfig: WashSceneConfig = {
  foamParticleDensity: 0.9,
  waterFlowRate: 0.8,
  washparkUnderglow: '#0070F3',
}
